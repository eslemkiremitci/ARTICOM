// server/routes/aiRoutes.js

import express from 'express';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

// Yeni importlar
import authUser from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

/**
 * 1) SCENARIO ROUTE
 *    Ürün açıklaması, opsiyonel arka plan açıklaması ve resmi alıp
 *    senaryoyu ayırt etmek, resmi geçici olarak `temp` klasörüne kaydetmek vb.
 */
router.post('/scenario', authUser, upload.single('image'), async (req, res) => {
  try {
    const { productDescription, backgroundDescription } = req.body;

    // Basit bir validation
    if (!productDescription || productDescription.trim().split(/\s+/).length < 3) {
      return res.json({
        success: false,
        message: 'Ürün açıklaması en az 3 kelime olmalıdır.'
      });
    }

    if (!req.file) {
      return res.json({ success: false, message: 'Resim yüklenmedi.' });
    }

    // Arka plan açıklaması var mı yok mu -> senaryo tespiti
    let scenarioType;
    if (!backgroundDescription || !backgroundDescription.trim()) {
      scenarioType = 1; // Sadece ürün açıklamasıyla
    } else {
      scenarioType = 2; // + backgroundDescription
    }

    console.log('Senaryo tespit edildi:', scenarioType);
    console.log('Kaydedilen resim path:', req.file.path);

    // Burada henüz ChatGPT veya stableDiff yok. Sadece test amaçlı dönüyoruz.
    return res.json({
      success: true,
      message: 'Senaryo işlendi, resim temp’e kaydedildi.',
      scenarioType: scenarioType,
      filePath: req.file.path
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 2) INPAINT ROUTE
 *    Python tarafına giden örnek route, proje kodunuzda zaten mevcuttu.
 *    Bunda değişiklik yapmıyoruz; olduğu gibi koruyacağız.
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
