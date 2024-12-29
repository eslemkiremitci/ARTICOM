from fastapi import FastAPI, UploadFile, Form, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image

app = FastAPI()

# CORS Middleware Ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm kaynaklara izin ver
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına izin ver
    allow_headers=["*"],  # Tüm başlıklara izin ver
)

# Sahte görsel URL oluşturmak için
FAKE_IMAGE_URL = "https://via.placeholder.com/400"

@app.post("/upload/")
async def upload_file(
    description: str = Form(...),
    image: UploadFile = File(...)
):
    # Görsel verisi kontrolü
    if not image:
        return JSONResponse(content={"error": "No image provided"}, status_code=400)

    # Görselin yüklenip yüklenmediğini kontrol et
    image_data = await image.read()
    try:
        img = Image.open(BytesIO(image_data))
        print(f"Gelen görselin boyutu: {img.size}")
    except Exception as e:
        return JSONResponse(content={"error": f"Invalid image file: {str(e)}"}, status_code=400)

    # Sahte text verisi döndür
    fake_texts = [
        "Ürün adı: Harika Bir Ürün",
        "Ürün açıklaması: Bu ürün kaliteli ve güvenilirdir.",
        "Fiyat: 299 TL",
        "Kargo: Ücretsiz kargo"
    ]

    return {
        "imageUrl": FAKE_IMAGE_URL,
        "texts": fake_texts
    }
