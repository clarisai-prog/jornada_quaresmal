# AGENTS.md — Jornada Quaresmal PWA v5

## Visão Geral do Projeto

**Jornada Quaresmal — O Grande Recomeço** é um Progressive Web App (PWA) católico que guia os usuários através de 40 dias de reflexão, oração, jejum e esmola durante a Quaresma de 2026.

- **Quaresma 2026**: 18 de fevereiro (Quarta-feira de Cinzas) → 4 de abril (Sábado Santo)
- **Domingos são excluídos** da contagem dos 40 dias
- **4 Fases temáticas**: Desconstrução do Ego → Atrito no Deserto → Transbordamento da Caridade → Ascensão ao Calvário

## Tecnologia e Arquitetura

### Stack Principal
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | UI library |
| TypeScript | 5.7.3 | Tipagem estática |
| Vite | 6.1.0 | Build tool e dev server |
| Tailwind CSS | 4.0.7 | Estilização |
| wouter | 3.3.5 | Roteamento leve |

### Gerenciamento de Pacotes
- **Package Manager**: pnpm 10.4.1 (obrigatório - definido em `packageManager`)
- **Lock file**: `pnpm-lock.yaml`

### Estrutura de Diretórios
```
jornada-quaresmal-pwa-v5/
├── client/              # Código fonte da aplicação
│   ├── index.html       # Entry point HTML com meta tags PWA
│   ├── public/          # Assets estáticos (ícones, manifest, SW)
│   └── src/
│       ├── App.tsx           # Componente raiz com rotas
│       ├── main.tsx          # Entry point React
│       ├── index.css         # Estilos globais + Tailwind
│       ├── components/       # Componentes reutilizáveis
│       │   ├── TokenGate.tsx     # Gate de acesso por token
│       │   ├── InstallSheet.tsx  # Sheet de instalação PWA
│       │   └── IntroBook.tsx     # Livro de introdução
│       ├── pages/            # Páginas da aplicação
│       │   ├── Home.tsx          # Dashboard principal
│       │   ├── DayView.tsx       # Visualização do dia
│       │   └── Intro.tsx         # Introdução teológica
│       ├── data/
│       │   └── days.ts           # Dados dos 40 dias (conteúdo)
│       └── lib/
│           ├── access.ts         # Lógica de validação de token
│           └── checkin.ts        # Sistema de check-in
├── scripts/             # Scripts utilitários
│   ├── generate-tokens.mjs      # Gera tokens SHA-256
│   ├── generate-icons.mjs       # Gera ícones PWA
│   └── generate-icons-svg.mjs   # Gera ícones SVG
├── dist/public/         # Build output (GitHub Pages)
└── .github/workflows/
    └── deploy.yml        # CI/CD GitHub Actions
```

## Comandos de Build e Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Desenvolvimento local (porta 3000)
pnpm dev

# Build de produção (TypeScript + Vite)
pnpm build

# Preview do build local
pnpm preview
```

### Acesso em Desenvolvimento
- **Sem token**: `http://localhost:3000/jornada_quaresmal/` (mostra tela de bloqueio)
- **Com token**: `http://localhost:3000/jornada_quaresmal/?t=SEU_TOKEN_AQUI`

> **Nota**: Em modo desenvolvimento (`import.meta.env.DEV`), o `TokenGate` **pula** a verificação automaticamente.

## Sistema de Acesso (Token Gate)

O app implementa um sistema de proteção por token único para conteúdo pago:

### Fluxo de Acesso
1. Comprador recebe link da Kiwify: `https://seuuser.github.io/jornada_quaresmal/?t=abc123def456`
2. App calcula SHA-256 do token e verifica contra `VALID_HASHES` em `access.ts`
3. Token válido → salva no localStorage → acesso liberado
4. Token inválido/ausente → tela de bloqueio

### Estrutura do Sistema
```typescript
// client/src/lib/access.ts
const VALID_HASHES = new Set(["69966f46de65d350...", /* 100+ hashes */]);
const LS_KEY = "acesso_produto_v1";  // localStorage key
```

### Arquivos Principais
- **`client/src/lib/access.ts`**: Lógica de validação SHA-256, localStorage
- **`client/src/components/TokenGate.tsx`**: Componente de UI para gate
- **`scripts/generate-tokens.mjs`**: Gera tokens CSV + hashes

### Gerar Novos Tokens
```bash
node scripts/generate-tokens.mjs 100
```
Isso gera `tokens-kiwify.csv` (importar na Kiwify) + hashes para colar em `access.ts`.

## Sistema de Check-in e Progresso

O progresso do usuário é medido por **check-ins manuais** (não por data):

```typescript
// client/src/lib/checkin.ts
const CHECKIN_KEY = "checkins_v1";  // localStorage

getCheckins(): Set<number>     // Retorna dias concluídos
toggleCheckin(dayId: number)    // Alterna estado do dia
```

- Usuário marca manualmente cada dia como "concluído"
- Barra de progresso mostra `%` baseada nos check-ins
- Dados persistem apenas no localStorage do dispositivo

## Persistência de Dados

Tudo é armazenado em **localStorage** (não há backend):

| Key | Propósito |
|-----|-----------|
| `acesso_produto_v1` | Token de acesso validado |
| `checkins_v1` | Dias marcados como concluídos |
| `notes_dia_${id}` | Anotações do usuário por dia |

## PWA e Service Worker

O Service Worker (`client/public/service-worker.js`) fornece:

### Caches
- **STATIC_CACHE**: Shell do app (index.html, manifest, ícones)
- **DYNAMIC_CACHE**: Navegação SPA (rotas dos dias)
- **FONT_CACHE**: Fontes do Google Fonts

### Estratégias
- **Assets estáticos**: Cache First
- **Navegação**: Stale-While-Revalidate (com fallback SPA)
- **Google Fonts**: Font Cache First

### Versão do Cache
```javascript
const CACHE_VERSION = "quaresma-v8";  // Incrementar em releases
```

> **IMPORTANTE**: Ao modificar o SW, sempre incremente a versão do cache!

## Deploy (GitHub Pages)

### Configuração
- **Base URL**: `/jornada_quaresmal/` (definido em `vite.config.ts`)
- **Branch**: `main` → trigger automático
- **Workflow**: `.github/workflows/deploy.yml`

### Passos do CI/CD
1. Checkout do código
2. Setup pnpm 10.4.1
3. Instalação de dependências (`pnpm install --frozen-lockfile`)
4. Build (`pnpm build`)
5. Deploy para GitHub Pages

### Configurar GitHub Pages
1. Settings → Pages
2. Source: **GitHub Actions**
3. Push na `main` dispara deploy automático

### Roteamento SPA no GitHub Pages
O `client/public/404.html` captura rotas desconhecidas e redireciona para o SPA:
```javascript
// Salva rota no sessionStorage e redireciona
sessionStorage.setItem("__spa_redirect__", JSON.stringify({...}));
```

O `index.html` restaura a rota antes do React montar.

## Convenções de Código

### Estilo
- **TypeScript**: Tipagem estrita obrigatória
- **Componentes**: React functional components
- **CSS**: Tailwind CSS v4 + inline styles para valores dinâmicos
- **Fontes**: Playfair Display (títulos), Lora (corpo), Cinzel (decoração)

### Padrões
```typescript
// Alias de importação: @/ aponta para client/src
import { DAYS } from "@/data/days";

// Estilos inline tipados
const S = {
  page: { minHeight: "100dvh", ... } as React.CSSProperties,
};
```

### Cores do Tema
| Token | Cor | Uso |
|-------|-----|-----|
| `--linen` | `#F5F1E8` | Background principal |
| `#2C2416` | Marrom escuro | Texto principal |
| `#8B7355` | Marrom médio | Destaques, botões |
| `#C4943A` | Dourado | Accent, badges |
| `#FDFAF4` | Creme | Cards |

## Estrutura de Dados

Os 40 dias estão definidos em `client/src/data/days.ts`:

```typescript
export interface DayData {
  id: number;              // 1-40
  tema: string;            // Título do dia
  icone: string;           // Emoji
  fase: string;            // Uma das 4 fases temáticas
  pilar: "Oração" | "Jejum" | "Esmola";
  versiculo: string;       // Referência bíblica
  textoVersiculo: string;  // Texto completo
  reflexao: string;        // Conteúdo teológico
  acaoPratica: string;     // Exercício prático
}
```

### Funções Utilitárias
```typescript
getLentDate(dayId: number): Date        // Data do calendário
getCurrentLentDay(): number | null      // Dia atual da Quaresma
```

## Considerações de Segurança

### Limitações do Token Gate
- **Proteção total**: Compradores sem token não acessam ✅
- **Rastreabilidade**: Cada comprador tem link único ✅
- **Compartilhamento**: Token compartilhado = acesso compartilhado ⚠️

### Mitigações Implementadas
- Token é removido da URL após 1º acesso (`history.replaceState`)
- Hashes SHA-256 (não tokens brutos) no código-fonte
- Tokens vinculados a compradores individuais na Kiwify

> Para proteção total contra compartilhamento, seria necessário backend (Firebase, Supabase, etc.)

### Dados Sensíveis
- `tokens-kiwify.csv` está no `.gitignore` (não commitar!)
- O arquivo contém tokens reais para importação na Kiwify

## Internacionalização

O app é **exclusivamente em Português (Brasil)**:
- Todas as strings estão hardcoded em PT-BR
- Datas formatadas com `toLocaleDateString("pt-BR", ...)`
- Não há sistema de i18n configurado

## Testes

Não há suite de testes configurada. Testes manuais recomendados:

1. **Token Gate**: Acessar sem token, com token inválido, com token válido
2. **Check-in**: Marcar/desmarcar dias, verificar persistência
3. **Anotações**: Escrever, salvar, recarregar página
4. **Offline**: Desligar rede, verificar funcionalidade
5. **PWA**: Instalar no iOS/Android, testar como app standalone

## Recursos Adicionais

- **Guia de Implantação**: `GUIA-IMPLANTACAO.md`
- **Manifesto PWA**: `client/public/manifest.json`
- **Ícones**: `client/public/icons/` (72px a 512px)
- **404 Handler**: `client/public/404.html`

---

*Última atualização: 2026-02-22*
*Versão do projeto: 5.0.0*
