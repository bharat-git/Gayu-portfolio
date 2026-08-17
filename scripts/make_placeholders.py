"""
Generates elegant placeholder images for every /Portfolio-images category so the
site has something to render out of the box. These are NOT real client work —
swap them out with Gayatri's actual images (same filenames, or update
scripts/generate-manifest.js output by just dropping new files in).
"""
import os
import random
from PIL import Image, ImageDraw, ImageFont

random.seed(7)

BASE = os.path.join(os.path.dirname(__file__), "..", "Portfolio-images")

# category -> (count, size, palette of (start_rgb, end_rgb), label)
CATEGORIES = {
    "hero":        [("hero-01", (1920, 1200))],
    "about":       [("about-portrait", (1400, 1750))],
    "fashion":     [("fashion-01", (1400, 1750)), ("fashion-02", (1600, 1200)), ("fashion-03", (1400, 1750))],
    "food":        [("food-01", (1600, 1200)), ("food-02", (1400, 1750)), ("food-03", (1600, 1200))],
    "product":     [("product-01", (1600, 1600)), ("product-02", (1600, 1200))],
    "automobile":  [("auto-01", (1920, 1280)), ("auto-02", (1600, 1200))],
    "hospitality": [("hospitality-01", (1920, 1280)), ("hospitality-02", (1600, 1200))],
    "sports":      [("sports-01", (1600, 1200)), ("sports-02", (1400, 1750))],
    "campaigns":   [("campaign-01", (1920, 1280)), ("campaign-02", (1600, 1200)), ("campaign-03", (1400, 1750))],
    "portraits":   [("portrait-01", (1400, 1750)), ("portrait-02", (1400, 1750))],
}

PALETTES = [
    ((30, 30, 32), (74, 68, 60)),
    ((20, 24, 28), (52, 58, 66)),
    ((36, 28, 26), (92, 70, 56)),
    ((18, 18, 20), (60, 60, 64)),
    ((28, 22, 30), (78, 60, 82)),
    ((22, 26, 24), (58, 82, 68)),
]

def make_gradient(size, start, end):
    w, h = size
    base = Image.new("RGB", (w, h), start)
    top = Image.new("RGB", (w, h), end)
    mask = Image.new("L", (w, h))
    mask_data = []
    for y in range(h):
        for x in range(w):
            # diagonal gradient
            t = (x / w + y / h) / 2
            mask_data.append(int(255 * t))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def add_grain(img, amount=10):
    import numpy as np
    arr = np.array(img).astype(int)
    noise = np.random.randint(-amount, amount, arr.shape)
    arr = np.clip(arr + noise, 0, 255).astype("uint8")
    return Image.fromarray(arr)

def label_image(img, text):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", int(h * 0.035))
    except Exception:
        font = ImageFont.load_default()
    msg = text.upper().replace("-", " ")
    bbox = draw.textbbox((0, 0), msg, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2), msg, font=font, fill=(255, 255, 255, 60))
    return img

idx = 0
for cat, items in CATEGORIES.items():
    folder = os.path.join(BASE, cat)
    os.makedirs(folder, exist_ok=True)
    for name, size in items:
        palette = PALETTES[idx % len(PALETTES)]
        idx += 1
        img = make_gradient(size, *palette)
        img = add_grain(img, amount=6)
        img = label_image(img, name)
        path = os.path.join(folder, f"{name}.jpg")
        img.save(path, quality=87)
        print("wrote", path)

print("done")
