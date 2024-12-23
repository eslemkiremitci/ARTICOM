// routes/aiRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

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
