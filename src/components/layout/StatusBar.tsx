import React, { useEffect, useState } from "react";
import { useApp } from '../../contexts/AppContext';

type Theme = "dark" | "light";

/* ----------------------- Icons ----------------------- */

function BatteryIcon({
	level = 76,
	charging = false,
	theme = "light",
}: {
	level?: number;
	charging?: boolean;
	theme?: Theme;
}) {
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
				<div className={`w-[26px] h-[12px] rounded-[3px] border ${stroke}`} />
				{/* Nub */}
				<div className={`absolute right-0.5 w-[3px] h-[6px] rounded-[1px] border ${strokeDim}`} />
				{/* Level fill */}
				<div
					className={`absolute left-[2px] top-[3px] h-[6px] rounded-[2px] ${fill}`}
					style={{ width: `${inner}px` }}
				/>
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

function SignalIcon({ strength = 4, theme = "light" }: { strength?: 0 | 1 | 2 | 3 | 4; theme?: Theme }) {
	// iOS-vari dar “pill” barlar
	const on = theme === "dark" ? "bg-white" : "bg-black";
	const off = theme === "dark" ? "bg-white/30" : "bg-black/30";
	const heights = [6, 8, 10, 12]; // sol→sağ artan hündürlüklər
	return (
		<div className="flex items-end gap-[2px]">
			{heights.map((h, i) => (
				<div
					key={i}
					className={`w-[3px] rounded-[1px] ${i < strength ? on : off}`}
					style={{ height: `${h}px` }}
				/>
			))}
		</div>
	);
}

function WifiIcon({ strength = 3, theme = "light" }: { strength?: 0 | 1 | 2 | 3; theme?: Theme }) {
	const stroke = theme === "dark" ? "stroke-white" : "stroke-black";
	const dim = theme === "dark" ? "stroke-white/30" : "stroke-black/30";
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" aria-label={`Wi-Fi ${strength}/3`}>
			<g fill="none" strokeLinecap="round" strokeWidth="1.6">
				<path className={strength >= 1 ? stroke : dim} d="M12 18.5c.8 0 1.5.7 1.5 1.5S12.8 21.5 12 21.5 10.5 20.8 10.5 20s.7-1.5 1.5-1.5Z" />
				<path className={strength >= 2 ? stroke : dim} d="M7.5 16c2.8-2.7 6.2-2.7 9 0" />
				<path className={strength >= 3 ? stroke : dim} d="M4 12.5c4.6-4.4 11.4-4.4 16 0" />
			</g>
		</svg>
	);
}

/* ----------------------- Status Bar ----------------------- */

function StatusBar15Pro({
	theme = "light",
	battery = 83,
	charging = false,
	signal = 4,
	wifi = 3,
	network = "5G",
}: {
	theme?: Theme;
	battery?: number;
	charging?: boolean;
	signal?: 0 | 1 | 2 | 3 | 4;
	wifi?: 0 | 1 | 2 | 3;
	network?: string;
}) {
	const [time, setTime] = useState("");

	useEffect(() => {
		const update = () => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
					hour12: true,
				}).replace(" AM", "").replace(" PM", "")
			);
		};
		update();
		const t = setInterval(update, 1000);
		return () => clearInterval(t);
	}, []);

	const isDark = theme === 'dark';
	const textColor = isDark ? "text-white" : "text-black";
	const islandBg = isDark ? "bg-white/90" : "bg-black";

	return (
		<div className={`${isDark ? 'bg-black' : 'bg-white'} w-full`}> 
			<div className={`relative mx-auto max-w-[393px] h-[59px] ${textColor} flex items-center justify-between px-4 text-[15px]`}>
				{/* Dynamic Island (center pill) */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className={`w-[126px] h-[34px] ${islandBg} rounded-[18px]`} />
				</div>

				{/* Left: Time */}
				<div className="font-semibold select-none tabular-nums">{time}</div>

				{/* Right: Signal · 5G · Wi-Fi · Battery */}
				<div className="flex items-center gap-2 select-none">
					<SignalIcon strength={signal} theme={theme} />
					<span className="text-[12px] font-medium -ml-0.5">{network}</span>
					<WifiIcon strength={wifi} theme={theme} />
					<BatteryIcon level={battery} charging={charging} theme={theme} />
				</div>
			</div>
		</div>
	);
}

export function StatusBar() {
	const { isDarkMode } = useApp();
	return (
		<StatusBar15Pro
			theme={isDarkMode ? 'dark' : 'light'}
			battery={83}
			charging={false}
			signal={4}
			wifi={3}
			network="5G"
		/>
	);
}
