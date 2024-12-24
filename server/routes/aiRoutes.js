// server/routes/aiRoutes.js

import express from 'express';
import axios from 'axios';
import authUser from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { generateChatGPTOutput } from '../controllers/openaiController.js';

const router = express.Router();

/**
 *  1) SCENARIO ROUTE
 *     - Ürün açıklaması (productDescription)
 *     - Opsiyonel arka plan açıklaması (backgroundDescription)
 *     - Yüklenen resim (multer)
 *     - ChatGPT'den title, description, stablePrompt, negativePrompt alıp dönüyoruz.
 *       (Şimdilik Python'a resim göndermiyoruz; sadece ChatGPT çıktısı.)
 */
router.post('/scenario', authUser, upload.single('image'), async (req, res) => {
  try {
    const { productDescription, backgroundDescription } = req.body;

    // Basit validation
    if (!productDescription || productDescription.trim().split(/\s+/).length < 3) {
      return res.json({
        success: false,
        message: 'Ürün açıklaması en az 3 kelime olmalıdır.'
      });
    }
    if (!req.file) {
      return res.json({ success: false, message: 'Resim yüklenmedi.' });
    }

    // ChatGPT fonksiyonunu çağırıp title, description, stablePrompt, negativePrompt elde edelim.
    const gptResult = await generateChatGPTOutput(productDescription, backgroundDescription);
    // Bu gptResult bir JSON obje: { title, description, stablePrompt, negativePrompt }

    // Senaryo türü (backgroundDescription varsa 2, yoksa 1)
    const scenarioType = backgroundDescription?.trim() ? 2 : 1;

    // Şimdilik sadece ChatGPT çıktısını dönüyoruz.
    // Sonraki adımlarda Python'a da istek atabilirsiniz.
    return res.json({
      success: true,
      message: 'ChatGPT promptları oluşturuldu, resim temp’e kaydedildi.',
      scenarioType,
      filePath: req.file.path,
      gptResult
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

/**
 *  2) INPAINT ROUTE
 *     - Python tarafındaki /generateImages endpoint’ine istek atar.
 *     - prompt, negative_prompt, image_base64, num_images gönderir.
 */
router.post('/inpaint', async (req, res) => {
  try {
    // 1) Body'den verileri çek
    const { prompt, negative_prompt, image_base64, num_images } = req.body;

    // 2) Python API'ye istek at
    const pyResponse = await axios.post('http://localhost:5000/generateImages', {
      prompt,
      negative_prompt,
      image_base64,
      num_images
    });

    // 3) Python’dan gelen yanıt
    const data = pyResponse.data; // { images: [...]} veya { error: "..."}
    if (data.images) {
      // başarılı
      return res.json({ success: true, images: data.images });
    } else if (data.error) {
      // python’dan hata dönmüş
      return res.status(400).json({ success: false, error: data.error });
    } else {
      // beklenmeyen bir durum
      return res.status(500).json({ success: false, error: 'Unknown error from Python' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
