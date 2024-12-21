import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

// Bu dosyada önceden Stripe ve Razorpay vardı, ancak bunlar tamamen kaldırıldı.
// Onların yerine test amaçlı basit bir ödeme fonksiyonu (paymentTest) eklendi.

// Yeni kullanıcı oluşturulduğunda creditBalance alanını 50 olarak set ediyoruz.
// Böylece üye olan her kullanıcıya otomatik 50 kredi veriyoruz.

// API Controller Function to Manage Clerk User with database
const clerkWebhooks = async (req, res) => {
    try {
        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        // Getting Data from request body
        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                // Kullanıcı oluşturulurken creditBalance 50 olarak set ediliyor.
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                    creditBalance: 50 // Üye olur olmaz 50 kredi veriyoruz.
                };
                await userModel.create(userData);
                res.json({});
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                };
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({});
                break;
            }

            case 'user.deleted': {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({});
                break;
            }

            default:
                // Unhandled event
                res.json({});
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API Controller function to get user available Kredi data
const userKredi = async (req, res) => {
    try {
        const { clerkId } = req.body;
        if (!clerkId) return res.json({ success: false, message: "No clerkId provided" });

        // Fetching userdata using ClerkId
        const userData = await userModel.findOne({ clerkId });
        if (!userData) return res.json({ success: false, message: "User not found" });

        res.json({ success: true, Kredi: userData.creditBalance });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Test ödeme fonksiyonu: gerçek bir ödeme gateway'ine bağlanmak yerine
// başarıyı simüle ederek kullanıcıya kredi ekler.
const paymentTest = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        if (!clerkId) return res.json({ success: false, message: "No clerkId provided" });

        // Kullanıcıyı bul
        const user = await userModel.findOne({ clerkId });
        if (!user) return res.json({ success: false, message: 'User not found' });

        // Test amaçlı sabit değerler:
        const credits = 100; // test amaçlı eklenen kredi miktarı
        const amount = 50;   // test amaçlı sabit tutar (TL)

        // Kullanıcının kredi bakiyesini artır
        const newCreditBalance = user.creditBalance + credits;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: newCreditBalance });

        // İşlemi transaction modeline kaydet
        await transactionModel.create({
            clerkId: clerkId,
            plan: planId || 'test_plan',
            amount: amount,
            credits: credits,
            payment: true,
            date: Date.now()
        });

        res.json({ success: true, message: 'Test Payment Successful', creditBalance: newCreditBalance });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export { clerkWebhooks, userKredi, paymentTest };
