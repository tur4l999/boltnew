// scripts/toDesign.ts
// AZ: Səhifə yollarını (routes) to.design API-yə göndərən gücləndirilmiş skript
// EN: Hardened script to post your routes to the to.design API

// ─────────────────────── 0) ENV: auto-load .env.local → .env ───────────────────────
try {
  const dotenv = await import('dotenv');
  // First try .env.local, then fallback to .env
  dotenv.config({ path: '.env.local' });
  dotenv.config();
} catch {
  // dotenv not installed; it's optional — but recommended
}

// ───────────────────────────── 1) Constants & helpers ─────────────────────────────
import fs from 'node:fs';
import path from 'node:path';

const API_BASE = (process.env.TO_DESIGN_API_BASE || 'https://api.to.design').replace(/\/+$/,'');
// You can override these via env if docs use different paths
const ROUTES_ENDPOINT = process.env.TO_DESIGN_ROUTES_ENDPOINT || '/v1/routes/import';
const JOB_STATUS_PREFIX = process.env.TO_DESIGN_JOB_STATUS_PREFIX || '/v1/jobs/';

const API_KEY  = process.env.TO_DESIGN_API_KEY || '';
const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:5173';

function fail(msg: string): never {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}
function info(msg: string) {
  console.log(`ℹ️  ${msg}`);
}
function ok(msg: string) {
  console.log(`✅ ${msg}`);
}

// ───────────────────────────── 2) Validate env ─────────────────────────────
if (!API_KEY) fail('TO_DESIGN_API_KEY yoxdur. .env.local/.env faylını yoxla.');
if (!/^https?:\/\//.test(BASE_URL)) fail(`APP_BASE_URL düzgün deyil: "${BASE_URL}" (məs: http://localhost:5173)`);

// ───────────────────────────── 3) Load routes ─────────────────────────────
function loadRoutes(): string[] {
  // Prefer CSV: design/screens.csv (one route per line)
  const csvPath = path.resolve('design/screens.csv');
  if (fs.existsSync(csvPath)) {
    const raw = fs.readFileSync(csvPath, 'utf8');
    const lines = raw
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
    if (lines.length) {
      ok(`design/screens.csv tapıldı (${lines.length} route).`);
      return lines;
    }
  }

  // Fallback: built-in list (edit as needed)
  info('design/screens.csv tapılmadı, daxili siyahı istifadə olunur.');
  return ['/', '/videos', '/topics', '/exam', '/mistakes', '/store', '/more'];
}

const routes = loadRoutes();
if (!routes.length) fail('Göndəriləcək route yoxdur. CSV-ni doldur və ya daxili siyahını dəyiş.');

// ───────────────────────────── 4) Build payload ─────────────────────────────
type RouteItem = { path: string };
const payload = {
  project: process.env.TO_DESIGN_PROJECT_NAME || 'DDA.az (boltnew) auto-import',
  baseUrl: BASE_URL,
  routes: routes.map<RouteItem>((p) => ({ path: p })),
  // options: { viewport: { width: 375, height: 812 } }, // lazım olsa aç
};

// ───────────────────────────── 5) Call API ─────────────────────────────
const url = `${API_BASE}${ROUTES_ENDPOINT}`;
info(`API: ${url}`);
info(`Project: ${payload.project}`);
info(`Base URL: ${BASE_URL}`);
info(`Routes (${payload.routes.length}): ${routes.join(', ')}`);

const res = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(payload),
}).catch((e) => fail(`Şəbəkə xətası: ${(e as Error).message}`));

if (!res.ok) {
  const txt = await res.text().catch(() => '');
  fail(`to.design cavabı XƏTA: ${res.status} ${res.statusText}\n${txt}`);
}

let data: any = null;
try {
  data = await res.json();
} catch {
  fail('JSON cavabı parse edilə bilmədi.');
}

ok('Import işi yaradıldı.');
console.log(data);

// ───────────────────────────── 6) (Optional) Poll job status ─────────────────────
// Əgər cavabda jobId gəlirsə və sən istəsən, statusu yoxlaya bilərik.
// Docs-da fərqli ola bilər; ona görə env ilə söndürülür.
if (process.env.TO_DESIGN_POLL === '1' && data?.jobId) {
  const jobUrl = `${API_BASE}${JOB_STATUS_PREFIX}${data.jobId}`;
  info(`Status izlənir: ${jobUrl}`);
  const start = Date.now();

  while (Date.now() - start < 5 * 60 * 1000) { // max 5 dəq
    await new Promise(r => setTimeout(r, 3000));
    const s = await fetch(jobUrl, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const t = await s.text();
    console.log(`→ ${new Date().toLocaleTimeString()} | ${t}`);
    // Burada istersən “completed/failed” sözlərini yoxlayıb break edə bilərsən.
  }
  info('Polling dayandırıldı (TO_DESIGN_POLL=1 olduqda işləyir).');
}
