import React, { useState } from 'react';

// AZ: Sabit ölçülər və tokenlar
// EN: Fixed sizes and tokens
const IOS_TOP_SAFE = 44;
const IOS_BOTTOM_SAFE = 34;
const ANDROID_STATUS = 24;
const ANDROID_NAV = 48;
const ANDROID_GESTURE_INSET = 16;
const GESTURE_PILL_H = 6;
const GESTURE_PILL_W = 120;

// AZ: Cihaz ölçü presetləri
// EN: Device size presets
const PRESETS = {
  iphone_14_15: { w: 390, h: 844, label: 'iPhone 14/15' },
  android_baseline: { w: 360, h: 800, label: 'Android Baseline' },
  large: { w: 430, h: 932, label: 'Large' }
} as const;

type Platform = 'ios' | 'android';
type PresetKey = keyof typeof PRESETS;
type AndroidNavMode = 'gesture' | '3-button';

interface MobileDevicePreviewProps {
  children?: React.ReactNode;
}

export default function MobileDevicePreview({ children }: MobileDevicePreviewProps) {
  // AZ: Komponent vəziyyəti
  // EN: Component state
  const [platform, setPlatform] = useState<Platform>('ios');
  const [preset, setPreset] = useState<PresetKey>('iphone_14_15');
  const [androidNavMode, setAndroidNavMode] = useState<AndroidNavMode>('gesture');
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeAreas, setShowSafeAreas] = useState(true);

  const currentPreset = PRESETS[preset];

  // AZ: Təhlükəsiz sahə hesablamaları
  // EN: Safe area calculations
  const getSafeAreas = () => {
    if (platform === 'ios') {
      return {
        top: IOS_TOP_SAFE,
        bottom: IOS_BOTTOM_SAFE
      };
    } else {
      return {
        top: ANDROID_STATUS,
        bottom: androidNavMode === '3-button' ? ANDROID_NAV : ANDROID_GESTURE_INSET
      };
    }
  };

  const safeAreas = getSafeAreas();

  // AZ: Grid overlay komponent
  // EN: Grid overlay component
  const GridOverlay = () => {
    if (!showGrid) return null;

    const margin = 16;
    const gutter = 8;
    const columnWidth = (currentPreset.w - (margin * 2) - (gutter * 3)) / 4;

    return (
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* AZ: 4 sütunlu grid */}
        {/* EN: 4-column grid */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-blue-500/10 border-x border-blue-500/20"
            style={{
              left: margin + (i * (columnWidth + gutter)),
              width: columnWidth
            }}
          />
        ))}
        {/* AZ: Kənar boşluqlar */}
        {/* EN: Outer margins */}
        <div className="absolute top-0 bottom-0 left-0 bg-red-500/5 border-r border-red-500/20" style={{ width: margin }} />
        <div className="absolute top-0 bottom-0 right-0 bg-red-500/5 border-l border-red-500/20" style={{ width: margin }} />
      </div>
    );
  };

  // AZ: iOS chrome overlay
  // EN: iOS chrome overlay
  const IOSChrome = () => (
    <>
      {/* AZ: Üst təhlükəsiz sahə (notch/status bar) */}
      {/* EN: Top safe area (notch/status bar) */}
      <div 
        className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10"
        style={{ height: IOS_TOP_SAFE }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-xs text-black/60 font-medium">9:41</div>
        </div>
      </div>

      {/* AZ: Alt ev göstəricisi */}
      {/* EN: Bottom home indicator */}
      <div 
        className="absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-black/30 rounded-full pointer-events-none z-10"
        style={{ 
          width: 134, 
          height: 5,
          bottom: IOS_BOTTOM_SAFE / 2 - 2.5
        }}
      />
    </>
  );

  // AZ: Android chrome overlay
  // EN: Android chrome overlay
  const AndroidChrome = () => (
    <>
      {/* AZ: Status bar */}
      {/* EN: Status bar */}
      <div 
        className="absolute left-0 right-0 top-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10"
        style={{ height: ANDROID_STATUS }}
      >
        <div className="flex items-center justify-between px-4 h-full">
          <div className="text-xs text-black/60 font-medium">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-black/20 rounded-sm" />
            <div className="w-3 h-3 bg-black/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* AZ: Alt navigasiya */}
      {/* EN: Bottom navigation */}
      {androidNavMode === '3-button' ? (
        <div 
          className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-10 flex items-center justify-around"
          style={{ height: ANDROID_NAV }}
        >
          <div className="w-6 h-6 bg-black/20 rounded" />
          <div className="w-6 h-6 bg-black/20 rounded-full" />
          <div className="w-6 h-6 bg-black/20 rounded" />
        </div>
      ) : (
        <div 
          className="absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-black/30 rounded-full pointer-events-none z-10"
          style={{ 
            width: GESTURE_PILL_W, 
            height: GESTURE_PILL_H,
            bottom: ANDROID_GESTURE_INSET / 2 - GESTURE_PILL_H / 2
          }}
        />
      )}
    </>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      {/* AZ: İdarəetmə paneli */}
      {/* EN: Control panel */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AZ: Platform seçimi */}
          {/* EN: Platform selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setPlatform('ios')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  platform === 'ios' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                iOS
              </button>
              <button
                onClick={() => setPlatform('android')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  platform === 'android' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Android
              </button>
            </div>
          </div>

          {/* AZ: Ölçü presetləri */}
          {/* EN: Size presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size Preset</label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value as PresetKey)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(PRESETS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label} ({value.w}×{value.h})
                </option>
              ))}
            </select>
          </div>

          {/* AZ: Android navigasiya rejimi */}
          {/* EN: Android navigation mode */}
          {platform === 'android' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Android Nav</label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setAndroidNavMode('gesture')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    androidNavMode === 'gesture' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Gesture
                </button>
                <button
                  onClick={() => setAndroidNavMode('3-button')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    androidNavMode === '3-button' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  3-Button
                </button>
              </div>
            </div>
          )}

          {/* AZ: Keçid düymələri */}
          {/* EN: Toggle buttons */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show Grid</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showSafeAreas}
                onChange={(e) => setShowSafeAreas(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show Safe Areas</span>
            </label>
          </div>
        </div>
      </div>

      {/* AZ: Cihaz artboard */}
      {/* EN: Device artboard */}
      <div className="flex justify-center">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          style={{ 
            width: currentPreset.w, 
            height: currentPreset.h 
          }}
        >
          {/* AZ: Məzmun sahəsi */}
          {/* EN: Content area */}
          <div 
            className="relative h-full overflow-auto"
            style={{
              paddingTop: showSafeAreas ? safeAreas.top : 0,
              paddingBottom: showSafeAreas ? safeAreas.bottom : 0
            }}
          >
            {/* AZ: Demo məzmun və ya istifadəçi məzmunu */}
            {/* EN: Demo content or user content */}
            {children || (
              <div className="flex flex-col space-y-2 p-4">
                {/* AZ: Başlıq bar (tam genişlik) */}
                {/* EN: Header bar (full width stretch) */}
                <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-sm">
                  <h1 className="text-lg font-bold">Mobile Preview</h1>
                  <p className="text-sm opacity-90">Platform: {platform.toUpperCase()}</p>
                </div>

                {/* AZ: Kart nümunələri */}
                {/* EN: Card examples */}
                <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h2 className="font-semibold text-gray-800 mb-2">Card Example 1</h2>
                  <p className="text-sm text-gray-600">This card stretches to full width using w-full class.</p>
                </div>

                <div className="w-full bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h2 className="font-semibold text-emerald-800 mb-2">Card Example 2</h2>
                  <p className="text-sm text-emerald-600">Another full-width card with different styling.</p>
                </div>

                <div className="w-full bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h2 className="font-semibold text-orange-800 mb-2">Card Example 3</h2>
                  <p className="text-sm text-orange-600">All cards use Figma-like Auto Layout with 8px spacing.</p>
                </div>

                {/* AZ: Mətn bloku */}
                {/* EN: Text block */}
                <div className="w-full p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This is a demo content area. Replace this with your own UI components. 
                    The content area respects safe areas when enabled and provides proper 
                    vertical flow with consistent spacing.
                  </p>
                </div>

                {/* AZ: Düymə qrupu */}
                {/* EN: Button group */}
                <div className="w-full flex gap-2 p-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium">
                    Primary
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium">
                    Secondary
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AZ: Cihaz chrome overlay */}
          {/* EN: Device chrome overlay */}
          {platform === 'ios' ? <IOSChrome /> : <AndroidChrome />}

          {/* AZ: Grid overlay */}
          {/* EN: Grid overlay */}
          <GridOverlay />
        </div>
      </div>

      {/* AZ: Məlumat paneli */}
      {/* EN: Info panel */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Current: {PRESETS[preset].label} • {currentPreset.w}×{currentPreset.h}px • 
          Safe Areas: {showSafeAreas ? `${safeAreas.top}px top, ${safeAreas.bottom}px bottom` : 'Disabled'}
        </p>
      </div>
    </div>
  );
}