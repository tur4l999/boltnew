import React, { useEffect, useState } from "react";

type Theme = "dark" | "light";

function BatteryIcon({ level = 76, charging = false, theme = "dark" }: { level?: number; charging?: boolean; theme?: Theme }) {
  const stroke = theme === "dark" ? "stroke-white" : "stroke-black";
  const strokeDim = theme === "dark" ? "stroke-white/30" : "stroke-black/30";
  const fill = theme === "dark" ? "bg-white" : "bg-black";
  const bodyW = 25; // inner fill width cap
  const pct = Math.round(Math.max(0, Math.min(100, level)));
  const inner = Math.round((pct / 100) * bodyW);
  
  return (
    <div className="relative ml-1" aria-label={`Battery ${pct}%${charging ? ", charging" : ""}`}>
      <div className="relative w-[30px] h-[14px] flex items-center">
        {/* Outline */}
        <div className={`w-[26px] h-[12px] rounded-[3px] border ${stroke}`} />
        {/* Nub */}
        <div className={`absolute right-0.5 w-[3px] h-[6px] rounded-[1px] border ${strokeDim}`} />
        {/* Level fill */}
        <div className={`absolute left-[2px] top-[3px] h-[6px] rounded-[2px] ${fill}`} style={{ width: `${inner}px` }} />
        {/* Lightning if charging */}
        {charging && (
          <svg className="absolute left-1/2 -translate-x-1/2" width="10" height="10" viewBox="0 0 24 24">
            <path d="M13 2 3 14h7l-1 8 10-12h-7z" className={theme === "dark" ? "fill-black" : "fill-white"} />
          </svg>
        )}
      </div>
    </div>
  );
}

function SignalIcon({ strength = 4, theme = "dark" }: { strength?: 0 | 1 | 2 | 3 | 4; theme?: Theme }) {
  const fill = theme === "dark" ? "bg-white" : "bg-black";
  const fillDim = theme === "dark" ? "bg-white/30" : "bg-black/30";
  
  return (
    <div className="flex items-end gap-[1px] w-4 h-3">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[2px] rounded-[0.5px] ${strength >= bar ? fill : fillDim}`}
          style={{ height: `${bar * 2 + 2}px` }}
        />
      ))}
    </div>
  );
}

function WifiIcon({ strength = 3, theme = "dark" }: { strength?: 0 | 1 | 2 | 3; theme?: Theme }) {
  const stroke = theme === "dark" ? "stroke-white" : "stroke-black";
  
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" className={stroke}>
      <path
        d="M7.5 10.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5z"
        fill="currentColor"
        className={strength >= 1 ? "opacity-100" : "opacity-30"}
      />
      <path
        d="M7.5 7.5c1.1 0 2 .9 2 2"
        fill="none"
        strokeWidth="1"
        className={strength >= 2 ? "opacity-100" : "opacity-30"}
      />
      <path
        d="M7.5 4.5c2.2 0 4 1.8 4 4"
        fill="none"
        strokeWidth="1"
        className={strength >= 3 ? "opacity-100" : "opacity-30"}
      />
    </svg>
  );
}

function StatusBar15Pro({
  theme = "dark",
  battery = 83,
  charging = false,
  signal = 4,
  wifi = 3,
  network = "5G",
  demo = false
}: {
  theme?: Theme;
  battery?: number;
  charging?: boolean;
  signal?: 0 | 1 | 2 | 3 | 4;
  wifi?: 0 | 1 | 2 | 3;
  network?: string;
  demo?: boolean;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const textClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`relative w-full h-11 ${bgClass} ${textClass} flex items-center justify-between px-6 text-sm font-medium`}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[118px] h-7 bg-black rounded-b-[18px]" />
      
      {/* Left side - Time */}
      <div className="flex items-center">
        <span className="font-semibold">{time}</span>
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center gap-1">
        <SignalIcon strength={signal} theme={theme} />
        <span className="text-xs font-semibold ml-1">{network}</span>
        <WifiIcon strength={wifi} theme={theme} />
        <BatteryIcon level={battery} charging={charging} theme={theme} />
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <StatusBar15Pro
      theme="dark"
      battery={83}
      charging={false}
      signal={4}
      wifi={3}
      network="5G"
    />
  );
}