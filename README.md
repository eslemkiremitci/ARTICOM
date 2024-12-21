# ARTICOM - E-Ticaret İçin Yapay Zeka Destekli Çözümler

ARTICOM, e-ticaret platformlarında ürünlerin görünürlüğünü artırmak ve satışları desteklemek için yapay zeka destekli yenilikçi bir çözüm sunar. Bu platform, **ControlNet** ve **Stable Diffusion** gibi modern yapay zeka teknolojilerini kullanarak görsel iyileştirme ve dinamik arka plan düzenleme hizmetleri sağlar. Ayrıca, SEO uyumlu ürün başlıkları ve açıklamaları otomatik olarak oluşturarak kullanıcıların içerik üretimini kolaylaştırır.

---

## 🌟 Özellikler

- **Görsel İyileştirme**: Ürün görsellerinin kalitesini artırır, dinamik arka plan ekler.
- **Metin Üretimi**: OpenAI dil modeli ile SEO uyumlu, kişiselleştirilmiş ürün başlıkları ve açıklamaları oluşturur.
- **Kullanıcı Dostu Arayüz**: React tabanlı modern bir kullanıcı arayüzü sunar.
- **Türkçe Dil Desteği**: Yerel pazarlara yönelik kullanıcı dostu çözümler sunar.

---

## 🛠️ Teknik Detaylar

### Teknolojiler
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, FastAPI
- **Veritabanı**: MongoDB
- **Yapay Zeka Modelleri**: Segment Anything Model (SAM), Stable Diffusion, OpenAI API

### Özelleştirme Süreci
ARTICOM, kullanıcıların yüklediği görselleri işleyerek, şu adımları gerçekleştirir:
1. Arka plan temizleme.
2. Görüntü kalitesini artırma.
3. Dinamik arka plan ekleme.
4. Otomatik başlık ve açıklama oluşturma.

---

## 📂 Proje Yapısı

```plaintext
ARTICOM/
├── client/         # React tabanlı frontend
├── server/         # FastAPI ve Node.js tabanlı backend
├── README.md       # Proje açıklamaları
```

---

## 📋 Kurulum

1. **Depoyu klonlayın**:
   ```bash
   git clone https://github.com/eslemkiremitci/ARTICOM.git
   ```

2. **Client ve server bağımlılıklarını yükleyin**:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Backend için çevresel değişkenlerinizi ayarlayın**:
   `.env` dosyasını oluşturun ve gerekli API anahtarlarını ekleyin.

4. **Uygulamayı başlatın**:
   ```bash
   # Client
   cd client
   npm run dev

   # Server
   cd server
   npm run server
   ```

---

## 💡 Geliştirme Yol Haritası

- Daha fazla yapay zeka modeli entegrasyonu.
- Mobil platform uyumluluğu.
- Çok dilli destek.

---

## 🤝 Katkıda Bulunun

Katkıda bulunmak isterseniz, lütfen bir **pull request** gönderin veya bir **issue** oluşturun.

---

