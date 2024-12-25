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
    You are a visionary marketing copywriter and a highly imaginative image prompt creator for Stable Diffusion.
    The user may request scenes like a forest, a library, a picnic area, or other creative environments.

    Your output must be EXACT JSON with this structure:
    {
      "title": "...",           // in Turkish, up to 50 chars, punchy
      "description": "...",     // in Turkish, 2-4 sentences, SEO-friendly, persuasive
      "stablePrompt": "...",    // in English, a scenic, detailed environment
      "negativePrompt": "..."   // in English, undesirable details
    }

    *** Requirements ***
    1) "title" (Turkish): 
       - short, max ~50 characters
       - extremely catchy, highlight product
    2) "description" (Turkish):
       - 2 to 4 sentences for SEO, highlight product's style, unique benefits, usage scenario
       - evoke a strong desire to purchase
       - well-structured marketing language
    3) "stablePrompt" (English):
       - depict the product in a visually rich environment
         (forest, library, picnic, coffee shop, or modern interior, etc.)
       - strongly incorporate any "backgroundDesc" the user provides, in English 
         (e.g. "with a cozy picnic vibe" or "surrounded by towering bookshelves in a grand library")
       - mention: professional photography, cinematic/volumetric lighting, hyper-realistic, 8K resolution, shallow depth of field, highly detailed
       - produce an alluring, dynamic scene
    4) "negativePrompt" (English):
       - exclude ugly or unwanted elements 
       - example: "ugly, low quality, boring background, cluttered, blurry, overexposed, underexposed, poorly drawn, distorted, messy"

    Return the JSON *only*, with no extra keys or text outside the JSON.
  `;

  // userContent hazırlama
  let userContent = `Ürün Bilgisi (Türkçe): ${productDesc}\n`;
  if (backgroundDesc && backgroundDesc.trim()) {
    userContent += `Ek Arka Plan İsteği: ${backgroundDesc.trim()}\n`;
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
    temperature: 1.0,  // en yaratıcı ayarlardan biri
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
    stablePrompt: parsed.stablePrompt || "A hyper-realistic product photo with cinematic lighting",
    negativePrompt: parsed.negativePrompt || "ugly, low quality, cluttered, blurry"
  };
}
