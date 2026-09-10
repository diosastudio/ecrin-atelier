import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

os.makedirs("/home/user/public/images/products", exist_ok=True)
os.makedirs("/home/user/public/images/ugc", exist_ok=True)
os.makedirs("/home/user/public/images/customizer", exist_ok=True)

WIDTH, HEIGHT = 800, 960

def draw_nail_set(bg_color, base_gradient, tip_type, embellishments, filename):
    img = Image.new("RGB", (WIDTH, HEIGHT), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Ambient background soft spotlight
    cx, cy = WIDTH // 2, HEIGHT // 2 - 20
    for r in range(WIDTH, 0, -20):
        factor = (1 - r / WIDTH)
        col = (
            min(255, int(bg_color[0] + factor * 22)),
            min(255, int(bg_color[1] + factor * 18)),
            min(255, int(bg_color[2] + factor * 16))
        )
        draw.ellipse([cx - r, cy - r*0.9, cx + r, cy + r*0.9], outline=col, width=20)
        
    # Luxury linen / stone pedestal shadow
    pedestal_y = cy + 280
    shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0,0,0,0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([cx - 280, pedestal_y - 40, cx + 280, pedestal_y + 40], fill=(130, 115, 105, 75))
    s_draw.ellipse([cx - 220, pedestal_y - 20, cx + 220, pedestal_y + 20], fill=(100, 85, 75, 95))
    shadow = shadow.filter(ImageFilter.GaussianBlur(30))
    img.paste(shadow, (0,0), shadow)
    
    # 5 Nails in an elegant arched editorial display (Thumb to Pinky)
    nail_configs = [
        (-220, 70, 0.72, -18),  # Thumb
        (-115, -15, 0.88, -8),  # Index
        (0, -50, 1.0, 0),       # Middle (hero)
        (115, -15, 0.88, 8),    # Ring
        (220, 70, 0.72, 18)     # Pinky
    ]
    
    for nx_off, ny_off, scale, rot_deg in nail_configs:
        nail_x = cx + nx_off
        nail_y = cy + ny_off
        
        # Draw individual nail
        nail_img = Image.new("RGBA", (360, 480), (0,0,0,0))
        nd = ImageDraw.Draw(nail_img)
        
        ncx, ncy = 180, 240
        w = int(75 * scale)
        h = int(120 * scale)
        
        # Points for almond nail
        pts = []
        for i in range(80):
            th = 2 * math.pi * i / 80
            u = math.sin(th)
            v = -math.cos(th)
            mod = 1.0 - 0.38 * (1.0 - v)
            if v < -0.3:
                mod -= ((-0.3 - v)/0.7) * 0.45
            pts.append((ncx + u * w * mod, ncy + v * h))
            
        # Nail base shadow
        n_shadow = Image.new("RGBA", (360, 480), (0,0,0,0))
        ImageDraw.Draw(n_shadow).polygon([(p[0]+8, p[1]+15) for p in pts], fill=(90, 75, 70, 70))
        n_shadow = n_shadow.filter(ImageFilter.GaussianBlur(10))
        nail_img.paste(n_shadow, (0,0), n_shadow)
        
        # Base color
        nd.polygon(pts, fill=base_gradient[0], outline=base_gradient[1])
        
        # Ombre / tip
        if tip_type == "french":
            tip_img = Image.new("RGBA", (360, 480), (0,0,0,0))
            td = ImageDraw.Draw(tip_img)
            td.ellipse([ncx - w, ncy - h - 20, ncx + w, ncy - h//3], fill=(255, 252, 248, 230))
            nail_img.paste(tip_img, (0,0), tip_img)
        elif tip_type == "chrome":
            # Chrome sheen aura
            c_img = Image.new("RGBA", (360, 480), (0,0,0,0))
            cd = ImageDraw.Draw(c_img)
            cd.ellipse([ncx - w//2, ncy - h + 10, ncx + w//2, ncy + h//2], fill=(255, 240, 245, 120))
            c_img = c_img.filter(ImageFilter.GaussianBlur(14))
            nail_img.paste(c_img, (0,0), c_img)
        elif tip_type == "noir":
            tip_img = Image.new("RGBA", (360, 480), (0,0,0,0))
            td = ImageDraw.Draw(tip_img)
            td.ellipse([ncx - w, ncy - h - 10, ncx + w, ncy - h//2], fill=(35, 30, 32, 240))
            nail_img.paste(tip_img, (0,0), tip_img)
            
        # Embellishments
        if "gold" in embellishments:
            # Gold leaf specs
            for _ in range(6):
                gx = ncx + random.randint(int(-w*0.5), int(w*0.5))
                gy = ncy + random.randint(int(-h*0.6), int(h*0.6))
                nd.ellipse([gx-3, gy-2, gx+4, gy+3], fill=(235, 190, 90, 240))
        if "pearl" in embellishments:
            nd.ellipse([ncx - 7, ncy - 10, ncx + 7, ncy + 4], fill=(255, 255, 255, 255), outline=(220, 200, 190, 255))
            nd.ellipse([ncx - 2, ncy - 7, ncx + 2, ncy - 3], fill=(255, 255, 255, 255))
        if "crystals" in embellishments:
            for cx_o in [-12, 0, 12]:
                nd.ellipse([ncx + cx_o - 3, ncy + 25 - 3, ncx + cx_o + 3, ncy + 25 + 3], fill=(255, 255, 255, 240), outline=(230, 210, 160, 255))
                
        # Gloss reflection highlight streak
        nd.line([(ncx - int(w*0.4), ncy - int(h*0.7)), (ncx - int(w*0.25), ncy + int(h*0.4))], fill=(255, 255, 255, 180), width=4)
        nd.line([(ncx - int(w*0.38), ncy - int(h*0.68)), (ncx - int(w*0.27), ncy + int(h*0.38))], fill=(255, 255, 255, 240), width=2)
        
        # Rotate and paste
        rot_img = nail_img.rotate(rot_deg, resample=Image.BICUBIC, expand=True)
        img.paste(rot_img, (int(nail_x - rot_img.width // 2), int(nail_y - rot_img.height // 2)), rot_img)
        
    img.save(filename, "JPEG", quality=92, optimize=True)

# Generate 8 products
products = [
    {
        "name": "glazed-donut-chrome.jpg",
        "bg": (248, 245, 242),
        "base": ((245, 230, 232), (225, 200, 205)),
        "tip": "chrome",
        "emb": ["pearl"]
    },
    {
        "name": "rose-quartz-ombre.jpg",
        "bg": (250, 246, 244),
        "base": ((240, 205, 205), (220, 175, 175)),
        "tip": "french",
        "emb": ["gold"]
    },
    {
        "name": "french-noir-couture.jpg",
        "bg": (245, 242, 238),
        "base": ((235, 215, 205), (210, 185, 175)),
        "tip": "noir",
        "emb": ["gold"]
    },
    {
        "name": "champagne-dew-drop.jpg",
        "bg": (248, 246, 240),
        "base": ((240, 225, 210), (215, 195, 175)),
        "tip": "chrome",
        "emb": ["pearl", "crystals", "gold"]
    },
    {
        "name": "celestial-silver-aura.jpg",
        "bg": (244, 245, 247),
        "base": ((218, 225, 235), (190, 200, 215)),
        "tip": "chrome",
        "emb": ["crystals"]
    },
    {
        "name": "bridal-silk-pearl.jpg",
        "bg": (252, 250, 248),
        "base": ((255, 245, 245), (235, 220, 220)),
        "tip": "french",
        "emb": ["pearl", "crystals"]
    },
    {
        "name": "velvet-burgundy-gold.jpg",
        "bg": (245, 240, 238),
        "base": ((145, 45, 60), (105, 25, 40)),
        "tip": "none",
        "emb": ["gold"]
    },
    {
        "name": "minimalist-vanilla-glaze.jpg",
        "bg": (249, 247, 244),
        "base": ((248, 240, 228), (228, 215, 200)),
        "tip": "chrome",
        "emb": []
    }
]

for p in products:
    draw_nail_set(p["bg"], p["base"], p["tip"], p["emb"], f"/home/user/public/images/products/{p['name']}")
    print(f"Generated product image: {p['name']}")

# Generate UGC Lifestyle Photos (Editorial aesthetic portrait / hand on silk / coffee / ring)
def generate_ugc_card(idx, mood_color, title_text, filename):
    u_img = Image.new("RGB", (600, 750), mood_color)
    ud = ImageDraw.Draw(u_img)
    
    # Soft draped fabric texture & studio lighting
    cx, cy = 300, 375
    for r in range(400, 0, -25):
        alpha_f = (1 - r / 400.0)
        c = (
            min(255, int(mood_color[0] + alpha_f * 35)),
            min(255, int(mood_color[1] + alpha_f * 25)),
            min(255, int(mood_color[2] + alpha_f * 20))
        )
        ud.ellipse([cx - r, cy - r, cx + r, cy + r], outline=c, width=25)
        
    # Draw an elegant hand holding silk / champagne glass / jewelry
    hand_shadow = Image.new("RGBA", (600, 750), (0,0,0,0))
    hsd = ImageDraw.Draw(hand_shadow)
    hsd.ellipse([150, 250, 450, 520], fill=(80, 60, 55, 60))
    hand_shadow = hand_shadow.filter(ImageFilter.GaussianBlur(35))
    u_img.paste(hand_shadow, (0,0), hand_shadow)
    
    # Render mini manicure on hands
    for i in range(5):
        fx = 200 + i * 45
        fy = 320 + int(math.sin(i * 0.8) * 30)
        # Nail tip
        ud.ellipse([fx - 14, fy - 28, fx + 14, fy + 12], fill=(245, 220, 215), outline=(220, 185, 175))
        # Top gloss
        ud.line([(fx - 4, fy - 20), (fx - 2, fy)], fill=(255, 255, 255), width=2)
        
    u_img.save(filename, "JPEG", quality=90)
    print(f"Generated UGC image: {filename}")

ugc_list = [
    (1, (244, 236, 230), "Almond Hailey Glaze • 12 Days Wear"),
    (2, (238, 230, 224), "Bridal Silk Set • Zero salon stress"),
    (3, (242, 235, 232), "Rose Quartz Coffin • Reused 4 times"),
    (4, (240, 232, 228), "Noir French • Compliments non-stop"),
    (5, (246, 238, 235), "Champagne Almond • Perfect C-curve"),
    (6, (243, 237, 231), "Minimalist Vanilla • 8-minute application")
]

for idx, col, caption in ugc_list:
    generate_ugc_card(idx, col, caption, f"/home/user/public/images/ugc/ugc-{idx}.jpg")

print("All product & UGC assets created successfully!")
