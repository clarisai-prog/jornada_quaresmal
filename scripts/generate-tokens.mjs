#!/usr/bin/env node
/**
 * Gerador de tokens para Kiwify PWA
 *
 * USO:
 *   node scripts/generate-tokens.mjs [quantidade]
 *
 * EXEMPLOS:
 *   node scripts/generate-tokens.mjs          → gera 100 tokens
 *   node scripts/generate-tokens.mjs 50       → gera 50 tokens
 *
 * OUTPUT:
 *   tokens-kiwify-YYYY-MM-DD.csv  → importe na Kiwify
 *   hashes-YYYY-MM-DD.txt         → copie para access.ts
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const QTD = parseInt(process.argv[2] || "100", 10);
const REPO_NAME = "jornada-quaresmal-pwa-v5"; // ✅ nome real do repositório
const BASE_URL = `https://santa.github.io/${REPO_NAME}/?t=`; // ✅ ajuste "santa" para seu usuário GitHub

const date = new Date().toISOString().slice(0, 10);
const tokens = [];

for (let i = 1; i <= QTD; i++) {
  const token = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
    .slice(0, 32);
  tokens.push({ id: i, token, hash, url: BASE_URL + token });
}

// CSV para Kiwify
const csvPath = `tokens-kiwify-${date}.csv`;
const csvContent =
  "id,token,url_completa\n" +
  tokens.map((t) => `${t.id},${t.token},${t.url}`).join("\n");
fs.writeFileSync(csvPath, csvContent, "utf8");

// Hashes para colar no access.ts
const hashesPath = `hashes-${date}.txt`;
const hashesContent = tokens.map((t) => `  "${t.hash}",`).join("\n");
fs.writeFileSync(hashesPath, hashesContent, "utf8");

console.log(`\n✅ ${QTD} tokens gerados!\n`);
console.log(`📄 CSV para Kiwify: ${csvPath}`);
console.log(`🔑 Hashes para access.ts: ${hashesPath}`);
console.log(`\n📋 Próximos passos:`);
console.log(`  1. Importe ${csvPath} na Kiwify (área de membros / entrega digital)`);
console.log(`  2. Abra ${hashesPath} e copie os hashes`);
console.log(`  3. Cole dentro do new Set([...]) em client/src/lib/access.ts`);
console.log(`  4. Faça commit e push → deploy automático via GitHub Actions\n`);

// Preview
console.log("Exemplo de URL:", tokens[0].url);
