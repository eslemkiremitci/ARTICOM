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
    You are a visionary marketing copywriter and an extremely imaginative image prompt creator for Stable Diffusion.

    The user provides a product in Turkish (e.g. termos, ceviz, bisiklet, kupa, elma sirkesi, etc.). 
    You MUST produce a unique environment each time, in line with the product type:

    *** Final JSON format (no extra keys or text): ***
    {
      "title": "...",        // (Turkish) up to ~50 chars
      "description": "...",  // (Turkish) 2-4 sentences, SEO-friendly, persuasive
      "stablePrompt": "...", // (English) environment & photography details
      "negativePrompt": "..."// (English) undesirable details
    }

    *** Detailed Requirements ***
    1) "title" (Turkish):
       - Very short, max ~50 characters
       - Summarize the product with a strong marketing punch
    2) "description" (Turkish):
       - 4 to 6 sentences, marketing-oriented, highlight benefits & usage
       - Encourage purchase, use an enthusiastic tone
       - Must be SEO-friendly (include keywords naturally)
    3) "stablePrompt" (English):
       - Must strictly be in English (no Turkish)
       - Depict a visually appealing environment that suits the product
         (thermos => mountainous campsite, coffee shop, etc.
          ceviz => farmland, orchard, etc.
          bisiklet => park, city street, scenic road, etc.
          elma sirkesi => orchard, rustic kitchen vibe
          if unsure => forest, library, picnic, etc.)
       - Add variety each time: do NOT repeat the same environment or scene from previous calls
       - Emphasize "professional photography, cinematic lighting, hyper-realistic, 8K detail, shallow depth of field"
       - If user gave "backgroundDesc", incorporate it in English (e.g. "with a cozy picnic vibe").
    4) "negativePrompt" (English):
       - Must strictly be in English (no Turkish)
       - Exclude ugly, low quality, boring background, cluttered, blurry, poorly drawn, overexposed, underexposed, messy
       - Possibly mention "repetitive environment" to ensure variety

    *** Additional Notes ***
    - Make sure the environment is logically consistent with the product type (e.g., a thermos does not belong in an orchard).
    - Return EXACT JSON with the keys: "title", "description", "stablePrompt", "negativePrompt"
    - No extra text outside of the JSON structure.
  `;

  // userContent hazırlanıyor
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
    temperature: 1.0,  // en yaratıcı mod
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
    stablePrompt: parsed.stablePrompt || "A highly detailed product photo with cinematic lighting",
    negativePrompt: parsed.negativePrompt || "ugly, low quality, cluttered, blurry"
  };
}
