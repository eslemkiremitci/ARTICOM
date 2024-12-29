import openai
import os

# API anahtarınızı çevre değişkenlerinden al
openai.api_key = os.getenv("OPENAI_API_KEY")

# API anahtarını kontrol edin
if not openai.api_key:
    raise ValueError("API anahtarı bulunamadı. Lütfen OPENAI_API_KEY çevre değişkenini ayarlayın.")
else:
    print("API anahtarı başarıyla alındı.")

try:
    # GPT-3.5-turbo modeli üzerinden bir istek gönder
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Sen bir yardımcısın."},
            {"role": "user", "content": "Merhaba, nasılsın?"}
        ],
        max_tokens=100,
        temperature=0.7
    )

    # Yanıtın içeriğini ekrana yazdır
    print("Asistanın cevabı:")
    print(response['choices'][0]['message']['content'])

# Hata sınıflarını doğru şekilde kullanın
except openai.error.AuthenticationError:
    print("Hatalı veya geçersiz API anahtarı!")
except openai.error.APIConnectionError:
    print("API'ye bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.")
except openai.error.RateLimitError:
    print("API hız sınırı aşıldı! Daha sonra tekrar deneyin.")
except openai.error.OpenAIError as e:
    print(f"OpenAI ile ilgili bir hata oluştu: {e}")
except Exception as e:
    print(f"Bilinmeyen bir hata oluştu: {e}")
