"""Konverterer de originale billeder fra clinic360.dk til optimerede WebP-filer.

Brug: python3 tools/process_images.py <mappe-med-originaler> assets/img
Originalerne hentes fra https://clinic360.dk/wp-content/uploads/ (filnavn = sti med / erstattet af _).
"""
import sys, os
from PIL import Image, ImageOps

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# navn -> (kildefil, bredder, valgfri beskæring (venstre, top, højre, bund) i procent)
PHOTOS = {
    "team-hero": ("2024_10_Design-uden-navn-26.png", [800, 1080], None),
    "team-hero-portrait": ("2025_05_IMG_6226-1.jpg", [700, 1067], None),
    "team-standing": ("2024_10_Design-uden-navn-20.png", [800, 1080], None),
    "team-sofa": ("2024_09_Design-uden-navn-25.png", [800, 1080], None),
    "consultation": ("2024_09_Design-uden-navn-9.png", [800, 1080], None),
    "consultation-mature": ("2024_10_Design-uden-navn-28.png", [800, 1080], None),
    "mette": ("2024_09_MajaWarmingPhotography-130-of-175-scaled.jpg", [600, 1000], None),
    "ditte": ("2026_05_MajaWarmingPhotography-133-of-175-scaled.jpg", [600, 1000], None),
    "kristian": ("2025_08_portraetKA.jpg", [600], None),
    "interior-shelf": ("2024_10_Clinic360.png", [800, 1080], None),
    "interior-anatomy": ("2024_10_Design-uden-navn-30.png", [700], None),
    "interior-lounge": ("2024_09_Design-uden-navn-31.png", [700], None),
    "tray": ("2025_08_Fjord-Forsikring-I-Konkurrence-ads-12.png", [700, 1080], None),
    "zo-set": ("2024_09_Design-uden-navn-2-1.png", [700], None),
    "zo-eye": ("2024_09_Design-uden-navn-5-1.png", [600], None),
    # behandlinger
    "t-filler": ("2025_08_Hud-billede-3.jpg", [700, 1080], None),
    "t-peeling": ("2024_09_Design-uden-navn-1.png", [700, 1080], None),
    "t-skinbooster": ("2025_08_Hud-billede-2.jpg", [700, 1080], None),
    "t-skinpen": ("2024_10_Design-uden-navn-24.png", [700, 1080], None),
    "t-profhilo": ("2024_10_Design-uden-navn-32.png", [700, 1080], None),
    "t-fedtfrysning": ("2024_07_Fedtfrysning.jpg", [800], None),
    "t-hydrafacial": ("2024_09_Design-uden-navn-29.png", [700, 1080], None),
    "t-prf-hud": ("2025_08_Fjord-Forsikring-I-Konkurrence-ads-10.png", [700, 1080], None),
    "t-prf-har": ("2025_08_Har-billede-2-scaled.jpg", [700, 1200], None),
    "t-prf-har-2": ("2025_08_Har-billede-4-scaled.jpg", [700], None),
    "t-hydrafacial-2": ("2024_09_Design-uden-navn-35.png", [700], None),
    "t-skinpen-2": ("2024_09_Design-uden-navn-13.png", [700], None),
}

# Før/efter: kildefil, opdeling ("lr" = venstre/højre, "tb" = top/bund), fokus-y (0-1) for portrætbeskæring
BEFORE_AFTER = {
    "ba-pande-1": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.06-1.jpeg", "tb"),
    "ba-pande-2": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.06-2.jpeg", "tb"),
    "ba-hals": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.06.jpeg", "lr"),
    "ba-ansigt-2": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-2.jpeg", "lr"),
    "ba-ansigt-3": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-3.jpeg", "lr"),
    "ba-ansigt-4": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-4.jpeg", "lr"),
    "ba-laeber-1": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-5.jpeg", "tb"),
    "ba-pande-3": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-6.jpeg", "tb"),
    "ba-pande-4": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07-7.jpeg", "tb"),
    "ba-ansigt-5": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.07.jpeg", "lr"),
    "ba-ansigt-6": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.08-1.jpeg", "lr"),
    "ba-laeber-2": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.08-2.jpeg", "tb"),
    "ba-ansigt-7": ("2024_07_WhatsApp-Image-2024-07-22-at-23.05.08.jpeg", "lr"),
}

LOGOS = {
    "logo-light": "2024_07_Clinic-360-2.png",
    "logo-dark": "2024_07_Transparent-baggrund-e1721669573306.png",
}


def save(im, name, w, q=78):
    im = im.copy()
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, f"{name}-{w}.webp")
    im.save(path, "WEBP", quality=q, method=6)
    return path, im.size


def crop_ratio(im, ratio, focus_y=0.5):
    """Beskær til bredde/højde-forhold `ratio` med lodret fokus."""
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio)
        x = (w - nw) // 2
        return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio)
    y = max(0, min(h - nh, round(focus_y * h - nh / 2)))
    return im.crop((0, y, w, y + nh))


sizes = {}
for name, (src, widths, _) in PHOTOS.items():
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, src))).convert("RGB")
    for w in widths:
        _, sz = save(im, name, w)
    sizes[name] = im.size

for name, (src, mode) in BEFORE_AFTER.items():
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, src))).convert("RGB")
    w, h = im.size
    if mode == "lr":
        halves = [im.crop((0, 0, w // 2, h)), im.crop((w // 2, 0, w, h))]
        halves = [crop_ratio(x, 4 / 5, 0.42) for x in halves]
    else:
        halves = [im.crop((0, 0, w, h // 2)), im.crop((0, h // 2, w, h))]
        halves = [crop_ratio(x, 4 / 5, 0.5) for x in halves]
    for label, half in zip(["foer", "efter"], halves):
        save(half, f"{name}-{label}", 640, q=80)

for name, src in LOGOS.items():
    im = Image.open(os.path.join(SRC, src)).convert("RGBA")
    im = im.crop(im.getbbox())
    im.save(os.path.join(OUT, f"{name}.png"), optimize=True)
    # kun monogrammet (øverste del) til headeren
    mono = im.crop((0, 0, im.width, round(im.height * 0.70)))
    mono = mono.crop(mono.getbbox())
    mono.save(os.path.join(OUT, f"{name}-mono.png"), optimize=True)

print("ok", len(os.listdir(OUT)), "filer")

# manifest med dimensioner (bruges af build.mjs til width/height-attributter)
import json
manifest = {}
for f in sorted(os.listdir(OUT)):
    if f.endswith((".webp", ".png")):
        with Image.open(os.path.join(OUT, f)) as im:
            manifest[f] = list(im.size)
with open(os.path.join(OUT, "manifest.json"), "w") as fh:
    json.dump(manifest, fh, indent=0)
