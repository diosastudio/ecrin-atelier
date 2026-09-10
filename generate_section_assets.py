import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

os.makedirs("/home/user/public/images/layers", exist_ok=True)
os.makedirs("/home/user/public/images/steps", exist_ok=True)

# Helper crop/fit function
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
    left = (new_w - w) // 2
    top = (new_h - h) // 2
    return im_resized.crop((left, top, left + w, top + h))

# 1. Create Layer Card Macro Images from Hero Images
if os.path.exists("/home/user/public/images/hero-assembled.jpg") and os.path.exists("/home/user/public/images/hero-exploded.jpg"):
    hero_a = Image.open("/home/user/public/images/hero-assembled.jpg")
    hero_e = Image.open("/home/user/public/images/hero-exploded.jpg")
    
    # Layer 4 (Top Coat): Upper top reflection macro
    w, h = hero_a.width, hero_a.height
    l4_crop = hero_a.crop((int(w * 0.3), int(h * 0.1), int(w * 0.7), int(h * 0.55)))
    l4_fit = fit_image(l4_crop, 600, 400)
    l4_fit.save("/home/user/public/images/layers/layer-topcoat.jpg", "JPEG", quality=95)
    
    # Layer 3 (Art & Gold): Center pearl and gold flake macro
    l3_crop = hero_a.crop((int(w * 0.25), int(h * 0.25), int(w * 0.75), int(h * 0.75)))
    l3_fit = fit_image(l3_crop, 600, 400)
    l3_fit.save("/home/user/public/images/layers/layer-art.jpg", "JPEG", quality=95)
    
    # Layer 2 (Polymer Core): Exploded middle polymer slice
    we, he = hero_e.width, hero_e.height
    l2_crop = hero_e.crop((int(we * 0.25), int(he * 0.3), int(we * 0.75), int(he * 0.7)))
    l2_fit = fit_image(l2_crop, 600, 400)
    l2_fit.save("/home/user/public/images/layers/layer-core.jpg", "JPEG", quality=95)
    
    # Layer 1 (Adhesive Base): Bottom base matrix macro
    l1_crop = hero_e.crop((int(we * 0.25), int(he * 0.55), int(we * 0.75), int(he * 0.95)))
    l1_fit = fit_image(l1_crop, 600, 400)
    l1_fit.save("/home/user/public/images/layers/layer-adhesive.jpg", "JPEG", quality=95)
    
    print("Generated 4 layer macro images successfully!")

# 2. Generate 3 Step Visual Cards
step_sources = [
    ("/home/user/public/images/products/minimalist-vanilla-glaze.jpg", "/home/user/public/images/steps/step-1.jpg", "Step 1: Prep & Measure"),
    ("/home/user/public/images/products/glazed-donut-chrome.jpg", "/home/user/public/images/steps/step-2.jpg", "Step 2: 60s Bond"),
    ("/home/user/public/images/products/rose-quartz-ombre.jpg", "/home/user/public/images/steps/step-3.jpg", "Step 3: Wear & Infinite Reuse")
]

for src_path, dst_path, title in step_sources:
    if os.path.exists(src_path):
        src_img = Image.open(src_path)
        step_card = fit_image(src_img, 700, 480)
        
        # Add subtle warm contrast
        enhancer = ImageEnhance.Color(step_card)
        step_card = enhancer.enhance(1.05)
        
        step_card.save(dst_path, "JPEG", quality=94)
        print(f"Generated step image: {dst_path}")

print("All card assets processed successfully!")
