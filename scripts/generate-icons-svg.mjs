import sharp from "sharp";
import fs from "fs";
import path from "path";

const OUT_DIR = "client/public/icons";
fs.mkdirSync(OUT_DIR, { recursive: true });

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#3D3020"/>
      <stop offset="100%" stop-color="#2C2416"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="35%">
      <stop offset="0%" stop-color="#C4A46B" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#2C2416" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cross" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4B87A"/>
      <stop offset="50%" stop-color="#C4A46B"/>
      <stop offset="100%" stop-color="#A88B5E"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#bg)"/>
  <circle cx="256" cy="220" r="180" fill="url(#glow)"/>
  <rect x="234" y="90" width="44" height="260" rx="6" fill="url(#cross)"/>
  <rect x="176" y="148" width="160" height="44" rx="6" fill="url(#cross)"/>
  <g transform="translate(256, 410)" fill="none" stroke="#8B7355" stroke-width="2.5" stroke-linecap="round">
    <path d="M0,0 C-15,-12 -30,-8 -40,-15"/>
    <ellipse cx="-18" cy="-10" rx="8" ry="4.5" transform="rotate(-30,-18,-10)" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="-32" cy="-14" rx="7" ry="4" transform="rotate(-20,-32,-14)" fill="#8B7355" opacity="0.5"/>
    <path d="M0,0 C15,-12 30,-8 40,-15"/>
    <ellipse cx="18" cy="-10" rx="8" ry="4.5" transform="rotate(30,18,-10)" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="32" cy="-14" rx="7" ry="4" transform="rotate(20,32,-14)" fill="#8B7355" opacity="0.5"/>
  </g>
  <rect width="512" height="512" rx="80" fill="none" stroke="#8B7355" stroke-width="2" opacity="0.15"/>
</svg>`;

const ICONS = [
    { name: "icon-72.png", size: 72 },
    { name: "icon-96.png", size: 96 },
    { name: "icon-120.png", size: 120 },
    { name: "icon-128.png", size: 128 },
    { name: "icon-144.png", size: 144 },
    { name: "icon-152.png", size: 152 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-384.png", size: 384 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "favicon-32.png", size: 32 },
    { name: "favicon-16.png", size: 16 },
];

async function run() {
    const svgBuffer = Buffer.from(SVG);
    console.log("\n\u{1F3A8} Gerando icones PWA...\n");

    for (const icon of ICONS) {
        const dest = path.join(OUT_DIR, icon.name);
        await sharp(svgBuffer).resize(icon.size, icon.size).png().toFile(dest);
        console.log("  \u2713 " + icon.name.padEnd(25) + " " + icon.size + "x" + icon.size);
    }

    // OG Image
    const ogDest = path.join(OUT_DIR, "og-image.png");
    await sharp(svgBuffer).resize(1200, 630, { fit: "contain", background: { r: 44, g: 36, b: 22 } }).png().toFile(ogDest);
    console.log("  \u2713 og-image.png              1200x630");

    console.log("\n\u2705 " + (ICONS.length + 1) + " icones gerados em " + OUT_DIR + "/\n");
}

run().catch(console.error);
