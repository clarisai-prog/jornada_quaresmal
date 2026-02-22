/**
 * Sistema de controle de acesso por token único
 *
 * Fluxo:
 * 1. Kiwify entrega link: seu-site.github.io/produto/?t=TOKEN
 * 2. App verifica se SHA256(TOKEN) está na lista de hashes
 * 3. Se válido → salva no localStorage e limpa a URL
 * 4. Retornos futuros → lê do localStorage, não precisa da URL
 * 5. Token inválido ou ausente → tela de bloqueio
 */

// ─────────────────────────────────────────────────────────────
// HASHES (SHA-256, 32 chars) dos 100 tokens gerados
// Os tokens reais ficam SOMENTE no CSV que você usa na Kiwify
// Aqui ficam só os hashes — seguro ficar no código público
// ─────────────────────────────────────────────────────────────
const VALID_HASHES = new Set([
  "69966f46de65d3501659262f2170a463",
  "d1bf8284abfc8e7eaaa8fd4314d41ad5",
  "dd71c9f0a3ca9d386692ac25f4812e54",
  "7f5d9da816831306f39aff055fe01ffa",
  "e8125dc1c9cc338e17f2964308ea7e6e",
  "33a0c8418bd8c8636310265a66084b94",
  "f395ee008fb39589225d2b9e4012d22f",
  "1953c11d954f90542120f625c2be0839",
  "043a809320c7ce7cbabc56250c37efb7",
  "127b3b976f048828725c2bf851c34b02",
  "44e2bd7cef396e3e257dbc4726da66f5",
  "2173807f6bd62de591f33d4412084bcb",
  "d171784c6647f32bcd553904d370fed9",
  "382b082220cf48be76709d8e9163fd83",
  "cb46371630d98a98709e3e2a67283e5c",
  "f25d0ae50f29293f380c0c8acc26d83e",
  "87598e518fb744dc38d8a6e0461ec540",
  "45438220cf3898014da4aeb627e4b9ea",
  "2eb1ae3547f892c0fa6000c4fba6e2e6",
  "77ccc3f6477c69b3fe66830b2699efec",
  "f473406335c59c29e6c518ae8533ac62",
  "e6d3e68b581aca07193b27b9f0955f5f",
  "8873e468619c3a3c4daaa055075a20f8",
  "21b9a3489d259500ffd2b34d8e1aa99b",
  "41d5c2e8e6282eb8e2d645583f7875a7",
  "7855150b5d6a4757dcb3fe4cd9c8dd45",
  "ff4dbce4d10a77bd2b902427b08562d8",
  "5d291142317b71e22c91fb1378e95870",
  "2710fd45cbf6b707931094975d0681b5",
  "6d652c5c568d4e44683e590dc55384a2",
  "637acdf5472eb681cf48b37fb8ae5d3c",
  "69da09b8016b1de38b3f3db7c4569d8b",
  "2b5bf4fdc155e0a13c683353bf86e627",
  "1344a18d75f5c73a51e2d52e7384c29e",
  "122f8ba389109f09b32fbcbef7fbacd7",
  "55b18c3a354d316d68abad64c61de1ec",
  "866147d02959e74ebfbb99f05583304d",
  "eb09beaf3be81503c7d8cfb59884abea",
  "7e6efdbfe80de6826420c3dcfeb79f6e",
  "bbae1f85ba6c561a7a2033e938d71519",
  "1ddf626d2120ab286c8a3f5dc98bfacc",
  "57b04cdea0408803d0f02ab5ca770666",
  "013231e47ad46fd28f89000833305ac9",
  "179abedafd064e16ffbeb1431991c22d",
  "de4527ef4e68652a56aa9d198e7cd173",
  "9d08ece1343372e549813bd6523f65d0",
  "505e3f93c23947ea6deff8624e86c066",
  "4903df55ddbd36bcfc6c3f38f3026eb2",
  "92dc92938db08789376a846e52934d34",
  "73058a2a4788a344b08ea105540f5c73",
  "5ae92419a2db2a65975b1e559bb7936a",
  "240f0defd43b2108172d48e6d846b988",
  "adaf9eab50d09ebb9673d22670187027",
  "62ed558a7ee1e0a121232066801dcf59",
  "b9dcecfb1b9849ed8bba0647664cf469",
  "21b6016ba427653d2ac6b3681efee3f0",
  "39cbcbdc021b08d9cdad2cfdfee7d5cc",
  "001847fcdbf295b775f78b4de6b76aad",
  "3ea329cbcd1651e471c21dac78dbe3f0",
  "18334f1158e10c58823cbd8c25d6c60e",
  "621deb7fbb6e6cc951405a65accb967d",
  "525305cda7494f12ed0743afdeb426ae",
  "08c927d0ea56a2c57fc49f436f6459a6",
  "459aa2caef65697143ac6827ae14d2e5",
  "318624570253f432a79f7ee01df13979",
  "be77ee84898b13b7c4289f0792a9b21a",
  "9254c3e61594c56c9f8fbd3a300a668f",
  "d59de952454b0ca45581b2e7e4a6c6ce",
  "67c28b2fecad08c2e5e5ed1c237160c5",
  "a3586c825e58170995a23ea5285c2881",
  "60d69bf1ac3dcd7ab2161f61f60cb370",
  "5574e96dbdbbc33e557c25a166b22f3a",
  "cd8a49d68090f22ea5f55e2391c8545d",
  "816ca294e1190ab87396983209cb384b",
  "62f3f360760b9ec5b4ef95f41d3ee1b5",
  "df7486939034e683e4a344b24c8abaea",
  "6bf09760ff40d1b2faf9e0c3508665ba",
  "468e74374b04211af36219d47e8ee341",
  "6dad58974d848adf1d3c8215cd77d1fe",
  "f6b2f2f968e69f0d9f47d622b9286c12",
  "1acc8bf3a36ce043b480fadea855ba7f",
  "4f181835a37acb6a72f44cb17d096b87",
  "d60be0bdf802adf97d59472a91d6bfe4",
  "971a2a9c6b8fc5f5acac9e167c6d8920",
  "943b783d35e1521abbba59e34ffab0dc",
  "a45b61bf589a7e62da1315d2b33a205f",
  "62669cf77da6c14366cb13d9f2146403",
  "bf3abdf6f8090f5c73887403204ca758",
  "8be8f0fcd63a3c14043a510fb0ef9f9e",
  "0c392bc75cf3a7ac53b69cadb8943649",
  "d814897b8606168f67ad5e3d3ec1e11e",
  "4de9630bf3ba45ff09c28229a484fdc6",
  "b32d81c3940adba7df5226e907d49eb8",
  "7f6e75c0e8598b7f571ab5a6c280dc90",
  "e38eab61662b43d3be4f814993a0f642",
  "b3e8528ed0e2709b0f7666d652d240a9",
  "9b17d3eb8f35f7436be4d479f4283853",
  "d8039061788e04f8ba422a5cb81d21f1",
  "4db905c9e78f4b357e7fa67251244c89",
  "5f7ec0d0f6d4f4df9bc1923d73d92a8c",
  // Admin token
  "ec8062d9b69ba2182f70d7963d74c106"
]);

const LS_KEY = "acesso_produto_v1";

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export type AccessStatus =
  | "checking"
  | "granted"
  | "invalid_token"
  | "no_token";

export interface AccessResult {
  status: AccessStatus;
  token?: string;
}

export async function checkAccess(): Promise<AccessResult> {
  // 1. Já tem acesso salvo neste dispositivo?
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const { token } = JSON.parse(saved);
      if (token) return { status: "granted", token };
    }
  } catch { /* localStorage indisponível */ }

  // 2. Tem token na URL?
  const urlToken = new URLSearchParams(window.location.search).get("t");
  if (!urlToken) return { status: "no_token" };

  // 3. Token é válido?
  const hash = await sha256hex(urlToken);
  if (!VALID_HASHES.has(hash)) return { status: "invalid_token" };

  // 4. Salva acesso e limpa URL (evita compartilhamento acidental)
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      token: urlToken,
      hash,
      grantedAt: new Date().toISOString(),
    }));
  } catch { /* sem localStorage — ainda dá acesso na sessão */ }

  window.history.replaceState({}, "", window.location.pathname);
  return { status: "granted", token: urlToken };
}

export function revokeAccess(): void {
  localStorage.removeItem(LS_KEY);
  window.location.reload();
}
