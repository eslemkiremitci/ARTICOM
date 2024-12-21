import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

// Controller function to remove bg from image
// Üyelik zorunluluğu ve kredi düşme sistemi zaten bu fonksiyonda mevcut.
// Kullanıcının clerkId bilgisini req.body üzerinden alıyoruz.
// Üyeliği olmayan bir kullanıcı zaten clerkId ile bulunamayacağı için hata döneriz.
// Kredi kontrolü yapılır, kredi yoksa işlem iptal edilir.
// Başarılıysa 1 kredi düşülür ve resultImage döndürülür.

const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;

    // Fetching User Details Using ClerkId
    const user = await userModel.findOne({ clerkId });
    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    // Checking User creditBalance
    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
    }

    // Getting Image Path
    const imagePath = req.file.path;

    // Read the image file
    const imageFile = fs.createReadStream(imagePath);

    // Creation of new multi/part formdata
    const formdata = new FormData();
    formdata.append('image_file', imageFile);

    // Calling Clipdrop API (arka plan kaldırma hizmeti)
    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer"
    });

    // Convert arrayBuffer to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Deduction of user credit 
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    // Sending Response
    res.json({ success: true, message: "Background Removed", resultImage, creditBalance: user.creditBalance - 1 });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { removeBgImage };
