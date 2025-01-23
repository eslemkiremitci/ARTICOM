// server/controllers/openaiController.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatGPTOutput(productDesc, backgroundDesc) {
  const systemPrompt = `
    You are a visionary marketing copywriter and an extremely imaginative image prompt creator for Stable Diffusion.

    The user provides a product in Turkish (e.g. termos, ceviz, bisiklet, kupa, elma sirkesi, etc.).
    You MUST produce a unique environment each time, in line with the product type.

    *** Final JSON format (no extra keys or text, no explanations): ***
    {
      "title": "...",        // (Turkish) up to ~50 chars
      "description": "...",  // (Turkish) 6-20 sentences, SEO-friendly, persuasive
      "stablePrompt": "...", // (English) environment & photography details
      "negativePrompt": "..."// (English) undesirable details
    }

    *** Detailed Requirements ***
    1) "title" (Turkish):
       - Very short, max ~60 characters
       - Summarize the product with a strong marketing punch

    2) "description" (Turkish):
       - 6 to 20 sentences, marketing-oriented, highlight benefits & usage
       - Encourage purchase, use an enthusiastic tone
       - Must be SEO-friendly (include keywords naturally)

    3) "stablePrompt" (English):
       - Must strictly be in English (no Turkish)
       - Depict a visually appealing, realistic environment that suits the product
         (thermos => mountainous campsite, coffee shop, modern kitchen, etc.
          ceviz => farmland, orchard, rural atmosphere, etc.
          bisiklet => park, city street, scenic road, etc.
          elma sirkesi => orchard, rustic kitchen vibe, etc.
          if unsure => forest, library, picnic, etc.)
       - The product must appear upright (not sideways), at a realistic scale, and centered as the main subject
       - Emphasize "professional photography, cinematic lighting, hyper-realistic, 8K detail, shallow depth of field, correct perspective"
       - If user gave "backgroundDesc", incorporate it in English (e.g. "with a cozy picnic vibe", "in a stylish modern kitchen", etc.)
       - Add variety each time: do NOT repeat the same environment or scene from previous calls

    4) "negativePrompt" (English):
       - Must strictly be in English (no Turkish)
       - Exclude ugly, low quality, boring background, cluttered, blurry, poorly drawn, overexposed, underexposed, messy
       - Also exclude disproportionate scale, giant product, floating objects, sideways orientation, repetitive environment
       - No single-color background, no black background
       - Possibly mention "no text, no watermark" to avoid text artifacts

    *** Additional Notes ***
    - Make sure the environment is logically consistent with the product type (e.g., a thermos in a campsite or kitchen, not an orchard).
    - Return EXACT JSON with the keys: "title", "description", "stablePrompt", "negativePrompt"
    - No extra text outside of the JSON structure (no explanations or disclaimers).
  `;


  let userContent = `Ürün Bilgisi (Türkçe): ${productDesc}\n`;
  if (backgroundDesc && backgroundDesc.trim()) {
    userContent += `Ek Arka Plan İsteği: ${backgroundDesc.trim()}\n`;
  }


  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 1.0,  // en yaratıcı mod
  });

 
  const raw = response.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error("ChatGPT'den geçerli bir içerik alınamadı!");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`ChatGPT cevabı JSON formatında değil: ${raw}`);
  }

  return {
    title: parsed.title || "Untitled",
    description: parsed.description || "No Description",
    stablePrompt: parsed.stablePrompt || "A highly detailed product photo with cinematic lighting, upright, realistic scale",
    negativePrompt: parsed.negativePrompt || "ugly, low quality, cluttered, blurry, no black background, no single-color background, giant product, sideways orientation"
  };
}
