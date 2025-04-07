# ARTICOM: Yapay Zeka Destekli Ürün Görsel Optimizasyonu ve İçerik Yönetimi

ARTICOM, **e-ticaret dünyasında ürün görsellerini optimize etmek** ve **daha etkili içerikler** üretmek amacıyla geliştirilmiş, yapay zeka destekli bir platformdur. Özellikle **Stable Diffusion**, **ControlNet** ve **MERN Stack** (MongoDB, Express.js, React.js, Node.js) gibi teknolojileri bir araya getirerek; kullanıcıların görsel kalitesi yüksek, dikkat çekici ürün sunumları hazırlamasına yardımcı olur.

---

## 🎥 Demo Videosu


[![ARTICOM Demo Video](http://img.youtube.com/vi/kfcDh89I4D8/0.jpg)](https://youtu.be/kfcDh89I4D8)

*(Videoyu izlemek için yukarıdaki görsele veya bağlantıya tıklayabilirsiniz.)*

---

## 🚀 Proje Hakkında

ARTICOM, e-ticaret platformlarında ürün görsellerinizi **otomatik olarak** düzenler, arka planları temizler ve derinlik haritaları oluşturarak **yüksek kaliteli** sahneler üretir. Ayrıca yapay zekâ destekli **metin oluşturma** özelliğiyle, SEO uyumlu açıklamalar ve başlıklar hazırlamanıza imkan tanır.

Bu sayede rekabetin yoğun olduğu çevrimiçi alışveriş ortamında, ürünlerinizi **estetik ve profesyonel** bir biçimde sunabilirsiniz.

---

## 🌟 Öne Çıkan Özellikler

1. **📸 Görsel Optimizasyon**  
   - Ürün görsellerinin arka planını yapay zeka ile otomatik kaldırma.  
   - **Stable Diffusion** ve **ControlNet** ile yüksek çözünürlükte, gerçekçi arka plan oluşturma.

2. **📝 İçerik Yönetimi**  
   - GPT-3.5 API ile **SEO uyumlu** başlık ve açıklamalar üretme.  
   - Ürün/tema bilgisine göre kısa sürede zengin metin hazırlama.

3. **⚡ Kullanıcı Dostu Deneyim**  
   - Modern ve responsive arayüz sayesinde her cihazdan kolay kullanım.
   - 
4. **🔗 Paylaşım ve Dışa Aktarım**  
   - Oluşturulan görselleri indirip çeşitli platformlarda paylaşma.  

---

## 🛠️ Teknolojiler

| Alan               | Teknoloji                                 |
|--------------------|-------------------------------------------|
| **Client (UI)**    | React, TailwindCSS, Swiper.js             |
| **Server (API)**   | Express.js, Mongoose                      |
| **Python Modülü**  | FastAPI, **Stable Diffusion**, ControlNet |
| **Veritabanı**     | MongoDB                                   |

---

## 📖 Kurulum

1. **Projeyi Klonlayın**  
   ```bash
   https://github.com/eslemkiremitci/ARTICOM.git
   cd ARTICOM
   ```

2. **Bağımlılıkları Yükleyin**  
   ```bash
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install

   # Python Modülü
   cd ../pyapi_module
   ```

3. **.env Dosyalarını Düzenleyin**  
   - **Client**: `VITE_BACKEND_URL`, `VITE_CLERK_PUBLISHABLE_KEY` vb.
   - **Server**: `MONGODB_URI`, `OPENAI_API_KEY`, `HUGGINGFACE_TOKEN` vb.
   - **pyapi_module**: Ortam değişkeni olarak `HUGGINGFACE_TOKEN` vb.

4. **Uygulamayı Başlatın**  
   ```bash
   # Client
   cd client
   npm run dev

   # Server
   cd ../server
   npm run server

   # Python Modülü
   cd ../pyapi_module
   uvicorn main:app --host 0.0.0.0 --port 5000 --reload
   ```

5. **Tarayıcıdan Erişim**  
   - React Client: [http://localhost:5173](http://localhost:5173)  
   - Node.js Server: [http://localhost:3000](http://localhost:3000)  
   - FastAPI (Python): [http://localhost:5000/docs](http://localhost:5000/docs)

---

## 📜 API Belgeleri (Örnek)

- **/api/ai/scenario (POST)**  
  - **Açıklama**: Ürün açıklaması ve görseli alarak arka plan temizleme, inpainting ve metin oluşturma süreçlerini yönetir.  
  - **Girdi**: Form-Data (image, productDescription, backgroundDescription)  
  - **Çıktı**: `{ "images": [...], "title": "...", "description": "..." }`

- **/generateImages (POST)**  *(Python tarafı)*  
  - **Açıklama**: Görseli base64 formatında alır, ControlNet ile işleyerek yeni görseller üretir.  
  - **Girdi**:
    ```json
    {
      "prompt": "English prompt text",
      "negative_prompt": "things to avoid",
      "image_base64": "base64-encoded image",
      "num_images": 2
    }
    ```
  - **Çıktı**:
    ```json
    {
      "images": ["Base64 encoded result1", "Base64 encoded result2"]
    }
    ```

---

## 🤝 Katkıda Bulunma
Projenin gelişimi için **pull request** veya **issue** açabilirsiniz. Düzenlemeler ve öneriler her zaman memnuniyetle karşılanır.




---

*Teşekkürler ve iyi çalışmalar!*
