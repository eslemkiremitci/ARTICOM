# pyapi_module/main.py

import base64
from io import BytesIO
from typing import Optional
import torch

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

# stable diffusion fonksiyonları:
from sd_controlnet import process_image_for_controlnet

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str
    negative_prompt: Optional[str] = None
    image_base64: str
    num_images: int = 2

@app.post("/generateImages")
def generate_images(req: GenerateRequest):
    """Arka plan kaldır + depth + inpainting ile 
    num_images adet varyasyon üret."""
    try:
        # 1) base64 -> PIL
        image_data = base64.b64decode(req.image_base64.split(",")[-1])  
        input_img = Image.open(BytesIO(image_data)).convert("RGB")

        result_images_base64 = []
        for i in range(req.num_images):
            result_img = process_image_for_controlnet(
                input_img,
                prompt=req.prompt,
                negative_prompt=req.negative_prompt or "ugly, low quality"
            )
            # PIL -> base64
            buffered = BytesIO()
            result_img.save(buffered, format="PNG")
            encoded = base64.b64encode(buffered.getvalue()).decode("utf-8")
            data_url = f"data:image/png;base64,{encoded}"
            result_images_base64.append(data_url)

        return {"images": result_images_base64}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
