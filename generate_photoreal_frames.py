import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

# Paths to generated photorealistic images
assembled_path = "/home/user/public/images/hero-assembled.jpg"
exploded_path = "/home/user/public/images/hero-exploded.jpg"

if os.path.exists(assembled_path) and os.path.exists(exploded_path):
    img_a = Image.open(assembled_path).convert("RGB")
    img_b = Image.open(exploded_path).convert("RGB")
    
    # Target uniform dimensions (1200x800)
    TARGET_W, TARGET_H = 1200, 800
    
    # Resize / Crop maintaining aspect ratio
    def fit_image(im, w, h):
        im_ratio = im.width / im.height
        target_ratio = w / h
        if target_ratio > im_ratio:
            new_w = w
            new_h = int(w / im_ratio)
        else:
            new_h = h
            new_w = int(h * im_ratio)
        im_resized = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Center crop
        left = (new_w - w) // 2
        top = (new_h - h) // 2
        return im_resized.crop((left, top, left + w, top + h))

    img_a_fit = fit_image(img_a, TARGET_W, TARGET_H)
    img_b_fit = fit_image(img_b, TARGET_W, TARGET_H)

    # Save fitted hero assets
    img_a_fit.save(assembled_path, "JPEG", quality=96)
    img_b_fit.save(exploded_path, "JPEG", quality=96)

    NUM_FRAMES = 40
    print("Generating 40 photorealistic transition frames...")

    def ease_in_out(t):
        return t * t * (3 - 2 * t)

    for i in range(NUM_FRAMES):
        t = i / (NUM_FRAMES - 1)
        smooth_t = ease_in_out(t)
        
        # High quality alpha blend
        frame = Image.blend(img_a_fit, img_b_fit, smooth_t)
        
        # Subtle dynamic contrast & sharpness boost during explosion
        if 0.1 < smooth_t < 0.9:
            enhancer = ImageEnhance.Contrast(frame)
            frame = enhancer.enhance(1.0 + 0.05 * math.sin(smooth_t * math.pi))
            
        frame_path = f"/home/user/public/frames/frame_{i+1:04d}.jpg"
        frame.save(frame_path, "JPEG", quality=94, optimize=True)

    print("Photorealistic animation sequence generated successfully!")

# Also generate lifestyle UGC cards using the photorealistic product renders
ugc_configs = [
    ("ugc-1.jpg", "/home/user/public/images/products/glazed-donut-chrome.jpg", "Almond Hailey Glaze • 12 Days Wear"),
    ("ugc-2.jpg", "/home/user/public/images/products/bridal-silk-pearl.jpg", "Bridal Silk Set • Zero salon stress"),
    ("ugc-3.jpg", "/home/user/public/images/products/rose-quartz-ombre.jpg", "Rose Quartz Coffin • Reused 4 times"),
    ("ugc-4.jpg", "/home/user/public/images/products/french-noir-couture.jpg", "Noir French • Compliments non-stop"),
    ("ugc-5.jpg", "/home/user/public/images/products/champagne-dew-drop.jpg", "Champagne Almond • Perfect C-curve"),
    ("ugc-6.jpg", "/home/user/public/images/products/minimalist-vanilla-glaze.jpg", "Minimalist Vanilla • 8-minute application")
]

for ugc_name, prod_path, caption in ugc_configs:
    if os.path.exists(prod_path):
        p_img = Image.open(prod_path).convert("RGB")
        # Crop editorial square/portrait card
        card_w, card_h = 600, 750
        card = fit_image(p_img, card_w, card_h)
        
        # Add subtle warm editorial vignette
        vignette = Image.new("RGBA", (card_w, card_h), (0,0,0,0))
        vd = ImageDraw.Draw(vignette)
        vd.rectangle([0, card_h - 180, card_w, card_h], fill=(18, 15, 14, 140))
        vignette = vignette.filter(ImageFilter.GaussianBlur(20))
        card.paste(vignette, (0,0), vignette)
        
        card.save(f"/home/user/public/images/ugc/{ugc_name}", "JPEG", quality=92)
        print(f"Generated UGC photoreal card: {ugc_name}")

print("All photorealistic assets finalized!")
