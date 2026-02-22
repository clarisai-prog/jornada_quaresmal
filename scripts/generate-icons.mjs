/**
 * Script para redimensionar o ícone base para todos os tamanhos PWA necessários
 * Uso: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const SOURCE = process.argv[2]; // caminho da imagem base
const OUT_DIR = "client/public/icons";

if (!SOURCE || !fs.existsSync(SOURCE)) {
    console.error("❌ Informe o caminho da imagem base como argumento.");
    console.error("   Uso: node scripts/generate-icons.mjs /caminho/para/icone.png");
    process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ICONS = [
    { name: "icon-72.png", size: 72 },
    { name: "icon-96.png", size: 96 },
    { name: "icon-128.png", size: 128 },
    { name: "icon-144.png", size: 144 },
    { name: "icon-152.png", size: 152 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-384.png", size: 384 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "favicon-32.png", size: 32 },
    { name: "favicon-16.png", size: 16 },
    { name: "og-image.png", size: 1200, height: 630 }, // Open Graph
];

async function run() {
    console.log(`\n📐 Gerando ícones a partir de: ${SOURCE}\n`);
    for (const icon of ICONS) {
        const dest = path.join(OUT_DIR, icon.name);
        await sharp(SOURCE)
            .resize(icon.size, icon.height ?? icon.size, { fit: "cover" })
            .png()
            .toFile(dest);
        console.log(`  ✓ ${icon.name.padEnd(25)} ${icon.size}x${icon.height ?? icon.size}`);
    }
    console.log(`\n✅ ${ICONS.length} ícones gerados em ${OUT_DIR}/\n`);
}

run().catch(console.error);
