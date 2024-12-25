// server/controllers/openaiController.js
import OpenAI from 'openai';

/**
 * openai nesnesi (v4.x): doğrudan "new OpenAI({...})" ile kullanılır.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // organization: '...'  // kullanmak istersen ekleyebilirsin
});

/**
 * Tek fonksiyon: 
 * productDesc + (opsiyonel) backgroundDesc alır,
 * ChatGPT'den JSON olarak { title, description, stablePrompt, negativePrompt } döndürür.
 */
export async function generateChatGPTOutput(productDesc, backgroundDesc) {
  // System message: Görev tanımı
  const systemPrompt = `
    Sen bir e-ticaret ve pazarlama uzmanısın. Kullanıcının verdiği ürün açıklamasına göre:
    1) "title": Kısa ve dikkat çekici bir ürün başlığı
    2) "description": SEO uyumlu bir pazarlama açıklaması
    3) "stablePrompt": Stable Diffusion'a uygun pozitif prompt
    4) "negativePrompt": kalitesiz, istenmeyen öğeleri dışlayan negatif prompt.
    Eğer backgroundDesc varsa stablePrompt'a bu konsepti de ekle.
    Cevabı mutlaka JSON formatında ver, örnek: 
    { 
      "title": "...", 
      "description": "...", 
      "stablePrompt": "...", 
      "negativePrompt": "..." 
    } 
  `;

  let userContent = `ÜRÜN: ${productDesc}\n`;
  if (backgroundDesc && backgroundDesc.trim()) {
    userContent += `ARKA PLAN: ${backgroundDesc.trim()}`;
  }

  // ChatGPT'ye gönderilecek mesaj listesi
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent }
  ];

  // ChatGPT (3.5-turbo) ile sohbet isteği
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
  });

  // ChatGPT cevabını alalım
  const raw = response.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("ChatGPT'den geçerli bir içerik alınamadı!");
  }

  // JSON parse edelim
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`ChatGPT cevabı JSON formatında değil: ${raw}`);
  }

  // Beklenen alanlar yoksa varsayılan tanımlar
  return {
    title: parsed.title || "Untitled",
    description: parsed.description || "No Description",
    stablePrompt: parsed.stablePrompt || "product photo",
    negativePrompt: parsed.negativePrompt || "low quality, blurry"
  };
}
