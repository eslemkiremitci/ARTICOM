// server/routes/aiRoutes.js

import express from 'express';
import fs from 'fs';
import axios from 'axios';
import authUser from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { generateChatGPTOutput } from '../controllers/openaiController.js';

const router = express.Router();

router.post('/scenario', authUser, upload.single('image'), async (req, res) => {
  try {
    const { productDescription, backgroundDescription } = req.body;

    // 1) Basit Validation
    if (!productDescription || productDescription.trim().split(/\s+/).length < 3) {
      return res.json({
        success: false,
        message: 'Ürün açıklaması en az 3 kelime olmalıdır.'
      });
    }
    if (!req.file) {
      return res.json({ success: false, message: 'Resim yüklenmedi.' });
    }

    const gptResult = await generateChatGPTOutput(productDescription, backgroundDescription);

    const filePath = req.file.path;
    const imageData = fs.readFileSync(filePath);
    const base64Image = `data:${req.file.mimetype};base64,${imageData.toString('base64')}`;

    const pyResponse = await axios.post('http://localhost:5000/generateImages', {
      prompt: gptResult.stablePrompt,
      negative_prompt: gptResult.negativePrompt,
      image_base64: base64Image,
      num_images: 2
    });


    if (!pyResponse.data) {
      throw new Error('Beklenmeyen yanıt: Python servisi boş data döndürdü.');
    }
    if (pyResponse.data.error) {
      throw new Error(`Python hatası: ${pyResponse.data.error}`);
    }
    const generatedImages = pyResponse.data.images; // 2 adet base64 PNG

    // 5) temp klasöründeki dosyayı sil
    fs.unlinkSync(filePath);

    // 6) Arka plan açıklaması varsa senaryo 2, yoksa 1 diyelim
    const scenarioType = backgroundDescription?.trim() ? 2 : 1;


    return res.json({
      success: true,
      message: 'Senaryo + Inpaint tamamlandı',
      scenarioType,
      title: gptResult.title,
      description: gptResult.description,
      stablePrompt: gptResult.stablePrompt,
      negativePrompt: gptResult.negativePrompt,
      images: generatedImages
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
