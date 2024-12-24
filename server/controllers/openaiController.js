// server/controllers/openaiController.js
import OpenAI from 'openai';

/**
 * openai nesnesi: 4.x sürümünde "Configuration" yerine doğrudan
 * "new OpenAI({ apiKey: ... })" yapısı kullanılır.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // organization: '...'  // varsa ekleyebilirsiniz
});

/**
 * ChatGPT fonksiyonu:
 * Prompt’a göre "title, description, stablePrompt, negativePrompt" üretsin.
 */
export async function generateChatGPTOutput(productDesc, backgroundDesc) {
  // Basit bir örnek:
  const systemPrompt = `
Sen bir e-ticaret uzmanısın. Kullanıcıdan gelen ürün bilgisine göre 
1) Kısa bir ürün başlığı (title),
2) SEO uyumlu bir ürün açıklaması (description),
3) Stable Diffusion'a uygun 'pozitif prompt' (stablePrompt),
4) Ve 'negatif prompt' (negativePrompt) oluştur.
Kullanıcının eklediği "backgroundDesc" varsa arka planla ilgili öğeleri stablePrompt'a ekle.
Cevabı JSON formatında döndür:
{ "title":"...", "description":"...", "stablePrompt":"...", "negativePrompt":"..." }
`;

  let userContent = `ÜRÜN AÇIKLAMASI: ${productDesc}\n`;
  if (backgroundDesc?.trim()) {
    userContent += `ARKA PLAN AÇIKLAMASI: ${backgroundDesc}`;
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent }
  ];

  /**
   * openai.chat.completions.create:
   *   - model: 'gpt-3.5-turbo' veya 'gpt-4'
   *   - messages: system ve user mesajlarımız
   */
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
  });

  // ChatGPT cevabını al
  const raw = response.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("ChatGPT'den geçerli bir içerik alınamadı!");
  }

  // JSON parse edelim (ChatGPT cevabını { title, description, ... } formatında bekliyoruz)
  const parsed = JSON.parse(raw);

  // Sonuç:  { title, description, stablePrompt, negativePrompt }
  return parsed;
}
