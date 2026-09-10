import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

os.makedirs("/home/user/public/frames", exist_ok=True)
os.makedirs("/home/user/public/images", exist_ok=True)

WIDTH = 1200
HEIGHT = 800
NUM_FRAMES = 40

def ease_in_out_cubic(t):
    if t < 0.5:
        return 4 * t * t * t
    else:
        f = (2 * t) - 2
        return 0.5 * f * f * f + 1

def ease_out_quad(t):
    return t * (2 - t)

def draw_almond_nail_path(cx, cy, scale_x, scale_y, rotation_rad=0):
    """Generate polygon points for a luxury almond nail shape with 3D curve."""
    points = []
    steps = 90
    for i in range(steps):
        theta = 2 * math.pi * i / steps
        # Parametric almond shape
        # x is symmetric, y is elongated with tapered tip at top (theta = -pi/2) and rounded cuticle at bottom (theta = pi/2)
        u = math.sin(theta)
        v = math.cos(theta)
        
        # Tapering equation: tip is narrower, cuticle is wider
        y_norm = -v  # -1 at tip, +1 at cuticle
        width_mod = 1.0 - 0.35 * (1.0 - y_norm) # narrower at tip
        if y_norm < -0.3:
            # pointier almond tip
            taper = (-0.3 - y_norm) / 0.7
            width_mod -= taper * 0.45
            
        px = u * scale_x * width_mod
        py = y_norm * scale_y
        
        # Apply slight 3D rotation
        rx = px * math.cos(rotation_rad) - py * math.sin(rotation_rad)
        ry = px * math.sin(rotation_rad) + py * math.cos(rotation_rad)
        
        points.append((cx + rx, cy + ry))
    return points

def create_frame(frame_idx, total_frames):
    t = frame_idx / (total_frames - 1)
    progress = ease_in_out_cubic(t)
    
    # Background: Luxury studio warm cream / champagne radial gradient
    bg = Image.new("RGB", (WIDTH, HEIGHT), (250, 248, 245))
    draw_bg = ImageDraw.Draw(bg)
    
    # Soft background studio vignette & subtle pedestal gradient
    center_x, center_y = WIDTH // 2, HEIGHT // 2
    for r in range(WIDTH, 0, -15):
        alpha = int(18 * (1 - r / WIDTH))
        col = (242 - alpha, 238 - alpha, 232 - alpha)
        draw_bg.ellipse([center_x - r, center_y - r * 0.7, center_x + r, center_y + r * 0.7], outline=col, width=15)
    
    # Draw soft studio floor shadow
    shadow_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_layer)
    shadow_y = center_y + 240 + int(progress * 40)
    shadow_w = 260 + int((1 - progress) * 80)
    shadow_h = 35 - int(progress * 10)
    shadow_alpha = int(70 - progress * 35)
    s_draw.ellipse([center_x - shadow_w, shadow_y - shadow_h, center_x + shadow_w, shadow_y + shadow_h], 
                   fill=(140, 120, 110, shadow_alpha))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(28))
    bg.paste(shadow_layer, (0, 0), shadow_layer)
    
    # Layer positions (vertical explosion separation)
    # Layer 4 (Top): Diamond Gel Top Coat
    # Layer 3: Hand-painted Art & 24k Gold & Pearls
    # Layer 2: 9-Ply Flex-Polymer Core
    # Layer 1 (Bottom): Micro-Adhesive Matrix
    
    max_sep = 150 # max distance separation in pixels
    
    # Calculate Y offsets for each layer
    y_offsets = [
        +max_sep * 1.15 * progress,   # Layer 1: Base Adhesive (moves down)
        +max_sep * 0.35 * progress,   # Layer 2: Polymer Core (slight down/center)
        -max_sep * 0.45 * progress,   # Layer 3: Art Layer (moves up)
        -max_sep * 1.25 * progress    # Layer 4: Diamond Top Coat (moves high up)
    ]
    
    # Slight perspective 3D tilt as it explodes
    tilt_angle = progress * 0.08  # radians
    
    # ----------------------------------------------------
    # Render LAYER 1: Base Adhesive Layer (Bottom)
    # ----------------------------------------------------
    l1_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    l1_draw = ImageDraw.Draw(l1_img)
    l1_cy = center_y + y_offsets[0] + 30
    l1_points = draw_almond_nail_path(center_x, l1_cy, 135, 195, -tilt_angle * 0.5)
    
    # Drop shadow for Layer 1 if separated
    if progress > 0.05:
        l1_shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        ImageDraw.Draw(l1_shadow).polygon([(p[0], p[1] + 15) for p in l1_points], fill=(160, 140, 130, int(45 * progress)))
        l1_shadow = l1_shadow.filter(ImageFilter.GaussianBlur(12))
        bg.paste(l1_shadow, (0, 0), l1_shadow)

    # Adhesive fill: semi-translucent medical-grade silicone with micro-grip grid pattern
    l1_draw.polygon(l1_points, fill=(245, 235, 228, int(200 - 30 * progress)), outline=(220, 195, 180, int(220)))
    
    # Micro adhesive dot grid texture inside
    if progress > 0.1:
        grid_alpha = int(min(255, progress * 240))
        for gx in range(center_x - 100, center_x + 100, 14):
            for gy in range(int(l1_cy - 140), int(l1_cy + 160), 14):
                dx = (gx - center_x) / 100.0
                dy = (gy - l1_cy) / 160.0
                if dx*dx + dy*dy < 0.65:
                    l1_draw.ellipse([gx-2, gy-2, gx+2, gy+2], fill=(205, 175, 160, int(grid_alpha * 0.7)))
    
    # Subtle inner bevel
    l1_draw.polygon(draw_almond_nail_path(center_x, l1_cy, 130, 188, -tilt_angle * 0.5), outline=(255, 255, 255, int(160 * progress)), width=2)
    bg.paste(l1_img, (0, 0), l1_img)

    # ----------------------------------------------------
    # Render LAYER 2: 9-Ply Flex-Polymer Core (Structural)
    # ----------------------------------------------------
    l2_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    l2_draw = ImageDraw.Draw(l2_img)
    l2_cy = center_y + y_offsets[1] + 10
    l2_points = draw_almond_nail_path(center_x, l2_cy, 140, 205, -tilt_angle * 0.2)
    
    # Layer 2 drop shadow on Layer 1
    if progress > 0.08:
        l2_shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        ImageDraw.Draw(l2_shadow).polygon([(p[0], p[1] + 18) for p in l2_points], fill=(150, 125, 115, int(50 * progress)))
        l2_shadow = l2_shadow.filter(ImageFilter.GaussianBlur(15))
        bg.paste(l2_shadow, (0, 0), l2_shadow)
        
    # Polymer core: warm rose quartz / nude translucent gradient
    l2_draw.polygon(l2_points, fill=(238, 208, 198, int(225 + 30 * (1 - progress))), outline=(215, 180, 170, 240))
    
    # Subtle structural apex curve highlight
    l2_draw.ellipse([center_x - 60, l2_cy - 120, center_x + 60, l2_cy + 100], fill=(248, 225, 218, int(110 + 40 * (1 - progress))))
    # Edge rim highlight
    l2_draw.polygon(draw_almond_nail_path(center_x - 3, l2_cy - 3, 136, 199, -tilt_angle * 0.2), outline=(255, 245, 240, 180), width=2)
    bg.paste(l2_img, (0, 0), l2_img)

    # ----------------------------------------------------
    # Render LAYER 3: Artisan Art & Pigment Layer (Color, Gold Leaf, French Tip, Gems)
    # ----------------------------------------------------
    l3_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    l3_draw = ImageDraw.Draw(l3_img)
    l3_cy = center_y + y_offsets[2] - 10
    l3_points = draw_almond_nail_path(center_x, l3_cy, 142, 208, tilt_angle * 0.2)
    
    # Layer 3 shadow
    if progress > 0.08:
        l3_shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        ImageDraw.Draw(l3_shadow).polygon([(p[0], p[1] + 16) for p in l3_points], fill=(140, 110, 105, int(60 * progress)))
        l3_shadow = l3_shadow.filter(ImageFilter.GaussianBlur(14))
        bg.paste(l3_shadow, (0, 0), l3_shadow)

    # Ombre base: Blush pink transitioning to creamy milky white at tip
    l3_draw.polygon(l3_points, fill=(232, 190, 180, 245), outline=(210, 165, 155, 255))
    
    # Modern French Glazed tip (almond tip arc)
    french_points = draw_almond_nail_path(center_x, l3_cy - 70, 110, 120, tilt_angle * 0.2)
    # Clip to tip
    tip_overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(tip_overlay)
    t_draw.polygon(l3_points, fill=(255, 255, 255, 0))
    t_draw.ellipse([center_x - 110, l3_cy - 215, center_x + 110, l3_cy - 40], fill=(255, 248, 242, 210))
    # mask with nail boundary
    l3_img.paste(tip_overlay, (0, 0), tip_overlay)

    # Floating 24K Gold Leaf foil flakes (curated coordinates)
    gold_flakes = [
        (-35, -40, 14, 8, 25),
        (40, -20, 18, 10, -35),
        (-15, 30, 22, 12, 15),
        (25, 60, 16, 9, 45),
        (-45, 50, 12, 7, -20),
        (5, -90, 15, 8, 10),
        (30, -110, 10, 6, -15),
        (-25, -120, 12, 7, 30),
    ]
    for gx, gy, gw, gh, rot in gold_flakes:
        g_img = Image.new("RGBA", (gw*2+10, gh*2+10), (0,0,0,0))
        gd = ImageDraw.Draw(g_img)
        # Gold shimmer polygon
        gd.ellipse([5, 5, gw+5, gh+5], fill=(230, 185, 95, 240), outline=(255, 220, 140, 255))
        gd.ellipse([7, 7, gw+2, gh+2], fill=(255, 235, 170, 220))
        g_rot = g_img.rotate(rot, expand=True)
        l3_img.paste(g_rot, (center_x + gx - g_rot.width//2, int(l3_cy + gy - g_rot.height//2)), g_rot)

    # 3D Centerpiece Pearl / Dew Gem Charm (Apex statement)
    pearl_x = center_x
    pearl_y = int(l3_cy - 10)
    pearl_r = 16
    # Pearl shadow
    l3_draw.ellipse([pearl_x - pearl_r, pearl_y - pearl_r + 4, pearl_x + pearl_r, pearl_y + pearl_r + 4], fill=(160, 130, 120, 140))
    # Pearl base
    l3_draw.ellipse([pearl_x - pearl_r, pearl_y - pearl_r, pearl_x + pearl_r, pearl_y + pearl_r], fill=(255, 250, 246, 255), outline=(225, 205, 195, 255))
    # Iridescent pearl sheen
    l3_draw.ellipse([pearl_x - pearl_r + 3, pearl_y - pearl_r + 2, pearl_x + pearl_r - 5, pearl_y + pearl_r - 6], fill=(255, 238, 230, 200))
    l3_draw.ellipse([pearl_x - 6, pearl_y - 8, pearl_x + 2, pearl_y], fill=(255, 255, 255, 255)) # highlight dot
    # Gold prong setting around pearl
    for deg in range(0, 360, 60):
        rad = math.radians(deg)
        px = pearl_x + (pearl_r + 2) * math.cos(rad)
        py = pearl_y + (pearl_r + 2) * math.sin(rad)
        l3_draw.ellipse([px-3, py-3, px+3, py+3], fill=(225, 180, 80, 255), outline=(255, 225, 140, 255))

    bg.paste(l3_img, (0, 0), l3_img)

    # ----------------------------------------------------
    # Render LAYER 4: Diamond Gel Top Coat (High-Gloss Mirror Finish)
    # ----------------------------------------------------
    l4_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    l4_draw = ImageDraw.Draw(l4_img)
    l4_cy = center_y + y_offsets[3] - 25
    l4_points = draw_almond_nail_path(center_x, l4_cy, 145, 212, tilt_angle * 0.4)
    
    # Layer 4 cast shadow on lower layers
    if progress > 0.08:
        l4_shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        ImageDraw.Draw(l4_shadow).polygon([(p[0], p[1] + 20) for p in l4_points], fill=(130, 100, 95, int(50 * progress)))
        l4_shadow = l4_shadow.filter(ImageFilter.GaussianBlur(16))
        bg.paste(l4_shadow, (0, 0), l4_shadow)

    # Crystal clear dome with subtle refractive glass tint
    glass_alpha = int(45 + 130 * progress) # more distinct as separated
    l4_draw.polygon(l4_points, fill=(255, 255, 255, glass_alpha), outline=(255, 255, 255, int(180 + 75 * progress)), width=2)
    
    # Glossy Curved Specular Light Streaks (Apple Keynote studio lighting signature)
    # Left sweeping soft highlight
    gloss1 = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    g1_draw = ImageDraw.Draw(gloss1)
    g1_draw.ellipse([center_x - 115, l4_cy - 190, center_x - 30, l4_cy + 130], fill=(255, 255, 255, int(160 + 60 * (1 - progress))))
    gloss1 = gloss1.filter(ImageFilter.GaussianBlur(16))
    l4_img.paste(gloss1, (0, 0), gloss1)

    # Crisp mirror highlight streak
    l4_draw.line([(center_x - 55, l4_cy - 140), (center_x - 35, l4_cy + 80)], fill=(255, 255, 255, int(220)), width=7)
    l4_draw.line([(center_x - 53, l4_cy - 138), (center_x - 37, l4_cy + 78)], fill=(255, 255, 255, 255), width=3)
    
    # Apex diamond reflection star
    l4_draw.ellipse([center_x + 35, l4_cy - 80, center_x + 45, l4_cy - 70], fill=(255, 255, 255, 240))
    
    bg.paste(l4_img, (0, 0), l4_img)

    # ----------------------------------------------------
    # Exploded View Annotations & Laser Leader Lines (when progress > 0.45)
    # ----------------------------------------------------
    if progress > 0.45:
        annot_alpha = int(min(255, (progress - 0.45) / 0.55 * 255))
        annot_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        ad = ImageDraw.Draw(annot_layer)
        
        # Color for luxury callout lines
        line_col = (180, 145, 130, int(annot_alpha * 0.85))
        dot_col = (200, 155, 135, annot_alpha)
        
        # 4 Callout lines & anchors:
        callouts = [
            # (Layer Index, anchor_x, anchor_y, elbow_x, end_x, end_y, align_left, Layer Name, Subtitle)
            (4, center_x + 105, l4_cy - 30, center_x + 220, center_x + 380, l4_cy - 50, False, "04. DIAMOND GEL TOP COAT", "Ultra-glossy UV shield • 14-day scratch defense"),
            (3, center_x - 105, l3_cy - 10, center_x - 220, center_x - 380, l3_cy - 20, True, "03. ARTISAN ART & 24K GOLD", "Hand-painted ombré • Real gold leaf & micro-pearls"),
            (2, center_x + 105, l2_cy + 10, center_x + 220, center_x + 380, l2_cy + 10, False, "02. 9-PLY FLEX-POLYMER CORE", "Natural C-curve memory • Salon apex contour"),
            (1, center_x - 105, l1_cy + 20, center_x - 220, center_x - 380, l1_cy + 40, True, "01. MEDICAL ADHESIVE MATRIX", "Zero nail damage • Breathable 0.08mm edge")
        ]
        
        for num, ax, ay, ex, fx, fy, is_left, title, sub in callouts:
            # Anchor dot
            ad.ellipse([ax - 4, ay - 4, ax + 4, ay + 4], fill=dot_col)
            ad.ellipse([ax - 8, ay - 8, ax + 8, ay + 8], outline=(210, 175, 160, int(annot_alpha * 0.5)), width=1)
            # Leader line
            ad.line([(ax, ay), (ex, fy), (fx, fy)], fill=line_col, width=2)
            # End dot
            ad.ellipse([fx - 3, fy - 3, fx + 3, fy + 3], fill=dot_col)
            
        bg.paste(annot_layer, (0, 0), annot_layer)

    # Save frame
    frame_path = f"/home/user/public/frames/frame_{frame_idx+1:04d}.jpg"
    bg.save(frame_path, "JPEG", quality=92, optimize=True)

print("Rendering 40 high-definition animation frames...")
for i in range(NUM_FRAMES):
    create_frame(i, NUM_FRAMES)
    if (i + 1) % 10 == 0:
        print(f"Rendered frame {i+1}/{NUM_FRAMES}")

# Save hero assembled (frame 1) and hero exploded (frame 40) into /public/images/
img_assembled = Image.open("/home/user/public/frames/frame_0001.jpg")
img_assembled.save("/home/user/public/images/hero-assembled.jpg", "JPEG", quality=95)

img_exploded = Image.open(f"/home/user/public/frames/frame_{NUM_FRAMES:04d}.jpg")
img_exploded.save("/home/user/public/images/hero-exploded.jpg", "JPEG", quality=95)

print("Frame generation completed successfully!")
