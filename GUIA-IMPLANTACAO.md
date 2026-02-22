# 🚀 PWA Kiwify — Guia Completo de Implantação

## Como funciona o sistema

```
Comprador paga na Kiwify
        ↓
Kiwify envia e-mail automático com o link:
  https://seuuser.github.io/jornada-quaresmal/?t=abc123def456
        ↓
PWA verifica o token (SHA-256 hash na lista)
        ↓
✅ Válido → salva no localStorage → acesso liberado
❌ Inválido → tela de bloqueio
        ↓
Próximas visitas do mesmo celular → localStorage → acesso direto
```

---

## 📁 Arquivos gerados para você

| Arquivo | Para quê |
|---------|---------|
| `tokens-kiwify.csv` | **Importe na Kiwify** — contém os 100 links únicos |
| `client/src/lib/access.ts` | Lógica de validação de token |
| `client/src/components/TokenGate.tsx` | Componente de gate (tela de bloqueio) |
| `vite.config.ts` | Configuração com PWA + base URL GitHub Pages |
| `.github/workflows/deploy.yml` | Deploy automático no push |
| `client/public/404.html` | Fix para roteamento no GitHub Pages |
| `client/index.html` | HTML base com meta tags PWA |
| `scripts/generate-tokens.mjs` | Gera mais tokens no futuro |

---

## 🔧 Passo a Passo

### 1. Instalar dependência PWA
```bash
pnpm add -D vite-plugin-pwa
```

### 2. Configurar nome do repositório
Substitua `nome-do-seu-repo` pelo nome real do seu repo nos arquivos:
- `vite.config.ts` → variável `REPO_NAME`
- `client/public/404.html` → variável `repo`
- `client/index.html` → link do apple-touch-icon

### 3. Adicionar o TokenGate ao seu App
```tsx
// client/src/App.tsx
import { TokenGate } from './components/TokenGate'

function App() {
  return (
    <TokenGate>
      {/* Seu conteúdo protegido aqui */}
      <SeuConteudoPrincipal />
    </TokenGate>
  )
}
```

### 4. Criar ícones PWA
Coloque em `client/public/icons/`:
- `icon-192x192.png` — ícone do app
- `icon-512x512.png` — ícone grande (splash screen)

Gere em: https://favicon.io ou https://realfavicongenerator.net

### 5. Configurar GitHub Pages
1. Vá em **Settings → Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Salve

### 6. Fazer o primeiro deploy
```bash
git add .
git commit -m "feat: add PWA with token gate"
git push origin main
```
O GitHub Actions vai fazer o build e deploy automaticamente.

### 7. Configurar a Kiwify
1. Abra `tokens-kiwify.csv`
2. Na Kiwify: **Produto → Entrega → Conteúdo Digital**
3. Configure o e-mail pós-compra para incluir a coluna `url_completa`
4. Ou use a integração de webhook para enviar o link automaticamente

---

## 🔄 Gerar mais tokens (quando os 100 acabarem)

```bash
node scripts/generate-tokens.mjs 100
```

Isso gera um novo CSV + arquivo de hashes.
Copie os hashes novos para dentro do `new Set([...])` em `access.ts`, faça push e pronto.

---

## ⚠️ Limitações honestas

| Proteção | Status |
|----------|--------|
| Comprador sem token não acessa | ✅ Total |
| Cada comprador tem link único | ✅ Rastreável |
| Token compartilhado com 2ª pessoa | ⚠️ A 2ª pessoa consegue acessar |
| Token compartilhado em grupos | ❌ Todos que clicarem acessam |

**Para proteção total contra compartilhamento**, seria necessário um backend
(Firebase, Supabase, etc.) para marcar tokens como "usados" de forma global.

### Mitigação prática:
- O token é removido da URL após o 1º acesso (evita compartilhamento acidental)
- Cada token é vinculado a um comprador → você sabe quem compartilhou
- A Kiwify pode desativar o produto de quem abusar

---

## 🛠️ Desenvolvimento local

```bash
pnpm install
pnpm dev
# Acesse: http://localhost:3000/nome-do-seu-repo/?t=SEU_TOKEN
```

Para testar sem token (ver tela de bloqueio):
```
http://localhost:3000/nome-do-seu-repo/
```

---

## 📱 Instalar como PWA (para usuários)

1. Abra o link no Chrome (Android) ou Safari (iOS)
2. Android: menu → "Adicionar à tela inicial"
3. iOS: botão compartilhar → "Adicionar à Tela de Início"

Após instalar, o app funciona **offline** com os dados em cache.
