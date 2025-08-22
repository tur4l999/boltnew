// scripts/toDesign.ts
// AZ: Səhifə yollarını (routes) to.design-a göndərən minimal skript
// EN: Minimal script that posts your routes to to.design

// Node 18+ üçün fetch daxildir. Əgər fetch tapılmazsa, `npm i node-fetch` edin və import edin.

const API_BASE = process.env.TO_DESIGN_API_BASE || "https://api.to.design";
const API_KEY  = process.env.TO_DESIGN_API_KEY!;
const BASE_URL = process.env.APP_BASE_URL || "http://localhost:5173";

// AZ: İlk mərhələdə manual siyahı — sonradan artıra bilərsən.
// EN: Start with a manual list — expand later.
const routes = ["/", "/videos", "/topics", "/exam", "/mistakes", "/store", "/more"];

if (!API_KEY) {
  console.error("Xəta: TO_DESIGN_API_KEY yoxdur (.env.local faylını yoxla)");
  process.exit(1);
}

async function main() {
  // AZ: to.design-a göndərəcəyimiz məlumat
  // EN: Payload we’ll send to to.design
  const payload = {
    project: "DDA.az (boltnew) auto-import",
    baseUrl: BASE_URL,
    routes: routes.map((p) => ({ path: p })),
    // options: { viewport: { width: 375, height: 812 } } // istəsən mobil ölçü tənzimlə
  };

  // DİQQƏT: Endpoint adını to.design sənədində necədirsə ELƏ yaz.
  // Placeholder nümunə:
  const endpoint = `${API_BASE}/v1/routes/import`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("to.design cavabı XƏTA:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  console.log("Import işi yaradıldı:", data); // adətən jobId/status olur
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
