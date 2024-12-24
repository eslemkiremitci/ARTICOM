// server/middlewares/multer.js

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// __dirname'i elde etmek için:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DiskStorage ayarları:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // temp klasörünün path'ini oluştur
    const uploadPath = path.join(__dirname, '../temp');

    // klasör yoksa oluştur
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    // multer'a yükleme dizinimizi bildir
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Oluşturulacak dosya adı (örneğin zaman damgası + orijinal ad)
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

// Multer örneğini oluştur
const upload = multer({ storage });

export default upload;
