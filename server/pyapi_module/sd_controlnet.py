# pyapi_module/sd_controlnet.py

import os
import torch
import cv2
import numpy as np
from PIL import Image
from rembg import remove
from diffusers import StableDiffusionControlNetInpaintPipeline, ControlNetModel
from diffusers import DPMSolverMultistepScheduler
from huggingface_hub import login
from transformers import DPTForDepthEstimation, DPTFeatureExtractor

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Hugging Face token al, yoksa hata
token = os.environ.get("HUGGINGFACE_TOKEN", None)
if not token:
    raise ValueError("HUGGINGFACE_TOKEN ortam değişkeni ayarlanmadı.")
login(token=token)

SD_INPAINT_MODEL = "runwayml/stable-diffusion-inpainting"
CONTROLNET_DEPTH_MODEL = "lllyasviel/sd-controlnet-depth"

GUIDANCE_SCALE = 10.0
NUM_INFERENCE_STEPS = 50
STRENGTH = 1.0
MAX_WIDTH = 768

def load_and_resize_image_pil(pil_image: Image.Image, max_width: int) -> Image.Image:
    """Elimizde *zaten* PIL image varsa, boyutlandırma uygula."""
    if pil_image.width > max_width:
        ratio = max_width / pil_image.width
        new_width = max_width
        new_height = int(pil_image.height * ratio)
        pil_image = pil_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    return pil_image

def remove_background_and_create_mask(input_image: Image.Image) -> (Image.Image, Image.Image):
    """Arka plan kaldır + inpaint mask oluştur."""
    fg_image = remove(input_image).convert("RGBA")
    alpha = fg_image.split()[-1]  
    # Mask: (255 - alpha) => arka plan
    mask_np = 255 - np.array(alpha)
    mask_np = cv2.GaussianBlur(mask_np, (5,5), 0)
    inpaint_mask = Image.fromarray(mask_np, mode='L')
    combined = fg_image.convert("RGB")
    return combined, inpaint_mask

def create_depth_map(image: Image.Image, model_name="Intel/dpt-large") -> Image.Image:
    """Depth haritası oluştur (ControlNet için)."""
    feature_extractor = DPTFeatureExtractor.from_pretrained(model_name)
    depth_model = DPTForDepthEstimation.from_pretrained(model_name).to(DEVICE)
    depth_input = feature_extractor(images=image, return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        depth_outputs = depth_model(**depth_input)
        predicted_depth = depth_outputs.predicted_depth
        depth = predicted_depth.squeeze().cpu().numpy()
    depth_min, depth_max = depth.min(), depth.max()
    depth = (depth - depth_min) / (depth_max - depth_min)
    depth_img = (depth * 255.0).astype(np.uint8)
    depth_img = cv2.cvtColor(depth_img, cv2.COLOR_GRAY2RGB)
    depth_control_image = Image.fromarray(depth_img).resize(image.size, Image.Resampling.LANCZOS)
    return depth_control_image

def run_inpainting_with_controlnet(
    combined: Image.Image,
    inpaint_mask: Image.Image,
    depth_control_image: Image.Image,
    prompt: str,
    negative_prompt: str,
    guidance_scale: float = GUIDANCE_SCALE,
    num_inference_steps: int = NUM_INFERENCE_STEPS,
    strength: float = STRENGTH
) -> Image.Image:
    """ControlNet Depth tabanlı inpainting yap."""
    # ControlNet modeli
    controlnet = ControlNetModel.from_pretrained(
        CONTROLNET_DEPTH_MODEL,
        torch_dtype=torch.float16
    ).to(DEVICE)

    # Pipeline
    pipe = StableDiffusionControlNetInpaintPipeline.from_pretrained(
        SD_INPAINT_MODEL,
        controlnet=controlnet,
        torch_dtype=torch.float16
    ).to(DEVICE)

    try:
        pipe.enable_xformers_memory_efficient_attention()
    except:
        pass

    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

    with torch.autocast(DEVICE):
        result = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            image=combined,
            mask_image=inpaint_mask,
            control_image=depth_control_image,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
            strength=strength
        )

    return result.images[0]

def process_image_for_controlnet(pil_image: Image.Image, prompt:str, negative_prompt:str) -> Image.Image:
    """Tüm akışı tek fonksiyonda topladık:
    1) boyutlandır,
    2) arka plan kaldır + maske,
    3) depth map,
    4) inpainting
    """
    pil_image = load_and_resize_image_pil(pil_image, MAX_WIDTH)
    combined, inpaint_mask = remove_background_and_create_mask(pil_image)
    depth_control_image = create_depth_map(combined)
    result = run_inpainting_with_controlnet(
        combined=combined,
        inpaint_mask=inpaint_mask,
        depth_control_image=depth_control_image,
        prompt=prompt,
        negative_prompt=negative_prompt
    )
    return result
