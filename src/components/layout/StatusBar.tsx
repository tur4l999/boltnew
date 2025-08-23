import React, { useEffect, useMemo, useState } from "react";

function BatteryIcon({ level = 76, charging = false, theme = "dark" as Theme }) {
const stroke = theme === "dark" ? "stroke-white" : "stroke-black";
const strokeDim = theme === "dark" ? "stroke-white/30" : "stroke-black/30";
const fill = theme === "dark" ? "bg-white" : "bg-black";
const bodyW = 24; // inner fill width cap
const pct = Math.round(Math.max(0, Math.min(100, level)));
const inner = Math.round((pct / 100) * bodyW);
return (
<div className="relative ml-1" aria-label={`Battery ${pct}%${charging ? ", charging" : ""}`}>
<div className="relative w-[30px] h-[14px] flex items-center">
{/* Outline */}
<div className={cx("w-[26px] h-[12px] rounded-[3px] border", stroke)} />
{/* Nub */}
<div className={cx("absolute right-0.5 w-[3px] h-[6px] rounded-[1px] border", strokeDim)} />
{/* Level fill */}
<div className={cx("absolute left-[2px] top-[3px] h-[6px] rounded-[2px]", fill)} style={{ width: `${inner}px` }} />
{/* Lightning if charging */}
{charging && (
<svg className="absolute left-1/2 -translate-x-1/2" width="10" height="10" viewBox="0 0 24 24">
<path d="M13 2 3 14h7l-1 8 10-12h-7z" className={cx(theme === "dark" ? "fill-black" : "fill-white")} />
</svg>
)}
</div>
</div>
);
}


/* ======================== Demo Preview ======================== */


export function StatusBar() {
const [theme, setTheme] = useState<Theme>("dark");
const [battery, setBattery] = useState(83);
const [charging, setCharging] = useState(false);
const [signal, setSignal] = useState<0 | 1 | 2 | 3 | 4>(4);
const [wifi, setWifi] = useState<0 | 1 | 2 | 3>(3);
const [network, setNetwork] = useState("5G");


return (
<div className="min-h-[260px] w-full grid place-items-center p-6 bg-gradient-to-b from-neutral-900 to-neutral-800">
<div className="w-[393px] rounded-[28px] border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 p-2 shadow-2xl">
<StatusBar15Pro
theme={theme}
battery={battery}
charging={charging}
signal={signal}
wifi={wifi}
network={network}
demo
/>
{/* Controls */}
<div className="mt-3 grid grid-cols-2 gap-2 text-white/90 text-sm">
<div className="flex items-center gap-2">
<span>Theme</span>
<button onClick={() => setTheme("dark")} className={cx("px-2 py-1 rounded", theme === "dark" ? "bg-white/20" : "bg-white/10")}>Dark</button>
<button onClick={() => setTheme("light")} className={cx("px-2 py-1 rounded", theme === "light" ? "bg-white/20" : "bg-white/10")}>Light</button>
</div>
<div className="flex items-center gap-2">
<span>Battery</span>
<input type="range" min={0} max={100} value={battery} onChange={(e) => setBattery(parseInt(e.target.value, 10))} />
<button onClick={() => setCharging((v) => !v)} className="px-2 py-1 rounded bg-white/10">⚡</button>
</div>
<div className="flex items-center gap-2">
<span>Signal</span>
{[0,1,2,3,4].map((n) => (
<button key={n} onClick={() => setSignal(n as any)} className={cx("px-2 py-1 rounded", signal===n?"bg-white/20":"bg-white/10")}>{n}</button>
))}
</div>
<div className="flex items-center gap-2">
<span>Wi‑Fi</span>
{[0,1,2,3].map((n) => (
<button key={n} onClick={() => setWifi(n as any)} className={cx("px-2 py-1 rounded", wifi===n?"bg-white/20":"bg-white/10")}>{n}</button>
))}
</div>
<div className="col-span-2 flex items-center gap-2">
<span>Network</span>
{(["LTE","4G","5G","5G+","XR"] as const).map((s) => (
<button key={s} onClick={() => setNetwork(s)} className={cx("px-2 py-1 rounded", network===s?"bg-white/20":"bg-white/10")}>{s}</button>
))}
</div>
</div>
</div>
</div>
);
}