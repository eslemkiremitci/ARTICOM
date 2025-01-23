import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";


const clerkWebhooks = async (req, res) => {
    try {
   
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);


        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });


        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                    creditBalance: 50 
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
                res.json({});
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


const userKredi = async (req, res) => {
    try {
        const { clerkId } = req.body;
        if (!clerkId) return res.json({ success: false, message: "No clerkId provided" });


        const userData = await userModel.findOne({ clerkId });
        if (!userData) return res.json({ success: false, message: "User not found" });

        res.json({ success: true, Kredi: userData.creditBalance });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


const paymentTest = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        if (!clerkId) return res.json({ success: false, message: "No clerkId provided" });


        const user = await userModel.findOne({ clerkId });
        if (!user) return res.json({ success: false, message: 'User not found' });

        const credits = 100; 
        const amount = 50;   

        const newCreditBalance = user.creditBalance + credits;
        await userModel.findByIdAndUpdate(user._id, { creditBalance: newCreditBalance });

   
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
