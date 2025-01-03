# ARTICOM: Yapay Zeka Destekli Ürün Görsel Optimizasyonu ve İçerik Yönetimi

ARTICOM, e-ticaret dünyasında ürün görsellerini optimize etmek ve daha etkili içerikler üretmek için geliştirilmiş, yapay zeka destekli bir platformdur. Proje, kullanıcıların görsel estetiği artırılmış ürün sunumları yapmasını sağlayarak rekabet avantajı sunmayı hedefler.

---

## 🚀 Proje Hakkında
ARTICOM, ürün görsellerinizin profesyonel bir şekilde optimize edilmesini ve içerik üretimini yapay zeka teknolojileriyle destekler. Geliştirilen bu platform, görsellerinizin arka planlarını kaldırır, derinlik haritaları oluşturur ve yüksek kaliteli görseller üretir. Ayrıca, kullanıcı dostu arayüzüyle işlem süreçlerini kolayca yönetmenizi sağlar.

---

## 🌟 Öne Çıkan Özellikler

1. **📸 Görsel Optimizasyon**
   - Ürün görsellerinin arka planını yapay zeka ile kaldırır.
   - Derinlik haritası ve inpainting ile arka planları yeniden tasarlar.

2. **📝 İçerik Yönetimi**
   - Ürün açıklamaları ve arka plan bilgilerinden etkileyici içerikler oluşturur.

3. **⚡ Kullanıcı Dostu Deneyim**
   - Modern ve responsive tasarımı ile her cihazda kusursuz çalışma.
   - Gerçek zamanlı görsel önizleme ve sonuç alma.

4. **🔗 Paylaşım ve Dışa Aktarım**
   - Görselleri indirip paylaşabilirsiniz.
   - Görsel çıktıları özelleştirilebilir formatlarda sunar.

---

## 🛠️ Teknolojiler

| Alan            | Teknoloji                              |
|-----------------|---------------------------------------|
| **Client**      | React, TailwindCSS, Swiper.js         |
| **Server**      | Express.js, Mongoose                  |
| **Python Modülü**| FastAPI, Stable Diffusion, ControlNet |
| **Veritabanı**  | MongoDB                               |

---

## 🖼️ Ekran Görüntüleri

### Ana Sayfa
![Ana Sayfa](screenshots/homepage.png)

### Görsel Yükleme
![Görsel Yükleme](screenshots/upload.png)

### İşleme Süreci
![İşleme Süreci](screenshots/loading.png)

### Sonuç Sayfası
![Sonuç Sayfası](screenshots/result.png)

### Kullanıcı Profili
![Kullanıcı Profili](screenshots/profile.png)

---

## 📖 Kurulum

### 1. Gerekli Bağımlılıkları Yükleyin
```bash
# Client için
cd client
npm install

# Server için
cd server
npm install

# Python modülü için
cd pyapi_module
pip install -r requirements.txt
```

### 2. Ortam Değişkenlerini Ayarlayın
`.env` dosyalarını aşağıdaki gibi doldurun:
- **Client**: `VITE_BACKEND_URL`, `VITE_CLERK_PUBLISHABLE_KEY`
- **Server**: `MONGODB_URI`, `OPENAI_API_KEY`, `HUGGINGFACE_TOKEN`

### 3. Uygulamayı Başlatın
```bash
# Client
cd client
npm run dev

# Server
cd server
npm run server

# Python Modülü
cd pyapi_module
uvicorn main:app --reload
```

---

## 🔧 Kullanım

1. **Ana Sayfa**:
   - Proje hakkında temel bilgileri içerir.
   - "Oluşturmaya Başla" butonu ile işleme başlama imkanı sunar.

2. **Ürün Görsellerini Optimize Etme**:
   - Ürün açıklaması ve arka plan bilgisi girilir.
   - Görsel yüklenir ve işleme başlatılır.

3. **Sonuç Sayfası**:
   - İşlenmiş görseller ve üretilen içerikler görüntülenir.
   - Görselleri indir veya paylaş seçenekleri sunar.

4. **Kredi Yönetimi**:
   - Kullanıcılar kredi satın alarak daha fazla işlem yapabilir.

---

## 📜 API Belgeleri

### 1. **/generateImages (POST)**
- **Açıklama**: Görsel işleme ve varyasyon üretme.
- **Girdiler**:
  ```json
  {
      "prompt": "Ürün açıklaması",
      "negative_prompt": "İstenmeyen özellikler",
      "image_base64": "Base64 kodlanmış görsel",
      "num_images": 2
  }
  ```
- **Çıktılar**:
  ```json
  {
      "images": ["Base64 kodlu çıktı görseller"]
  }
  ```

---

## 🎯 Gelecekteki Geliştirmeler
- 🌐 Daha fazla dil desteği.
- 📱 Mobil uygulama entegrasyonu.
- 🔗 Sosyal medya paylaşım özellikleri.

---

## 🤝 Katkıda Bulunun
Katkıda bulunmak için lütfen bir **pull request** gönderin veya bir **issue** oluşturun.

---

## 📜 Lisanslar
- **MIT Lisansı**: React, TailwindCSS, Swiper.js, Express.js, Mongoose, FastAPI, rembg, Multer, Axios
- **Apache 2.0 Lisansı**: ControlNet, Hugging Face Transformers, 
- **CreativeML Open RAIL-M Lisansı**: Stable Diffusion
- **BSD-2-Clause Lisansı**: dotenv


