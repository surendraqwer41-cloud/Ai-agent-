import React, { useState, useRef } from "react";
import { AppProject } from "../types";
import { 
  Palette, 
  Download, 
  Smartphone, 
  Sparkles, 
  Monitor, 
  Layers, 
  Eye, 
  Maximize, 
  Rocket, 
  Heart, 
  Flame, 
  Compass, 
  Gamepad, 
  Music, 
  Check 
} from "lucide-react";

interface AssetsGeneratorProps {
  activeProject: AppProject | null;
  onUpdateProject: (p: AppProject) => void;
}

export default function AssetsGenerator({
  activeProject,
  onUpdateProject
}: AssetsGeneratorProps) {
  const [selectedAsset, setSelectedAsset] = useState<"icon" | "feature" | "screenshot">("icon");
  const [gradientStart, setGradientStart] = useState("#3b82f6");
  const [gradientEnd, setGradientEnd] = useState("#8b5cf6");
  const [titleText, setTitleText] = useState(activeProject?.name || "Awesome App");
  const [tagline, setTagline] = useState("Simple • Compliant • Interactive");
  const [iconType, setIconType] = useState<"rocket" | "heart" | "flame" | "compass" | "gamepad" | "music">("rocket");
  const [badgeText, setBadgeText] = useState("Pro Edition");
  const [copied, setCopied] = useState(false);

  // Sync title text if active project updates
  React.useEffect(() => {
    if (activeProject) {
      setTitleText(activeProject.name);
    }
  }, [activeProject]);

  const handleExportAsset = () => {
    alert(`Exporting ${selectedAsset.toUpperCase()} package directly to browser downloads.`);
  };

  const iconsSet = {
    rocket: Rocket,
    heart: Heart,
    flame: Flame,
    compass: Compass,
    gamepad: Gamepad,
    music: Music,
  };

  const SelectedIconComponent = iconsSet[iconType];

  return (
    <div className="space-y-6" id="assets-generator">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Palette className="w-6 h-6 text-purple-400" />
          AI Brand Asset Designer Studio
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Produce gorgeous modern Android store graphics, brand icons, feature banners, and contextual screenshots dynamically.
        </p>
      </div>

      {activeProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Design customizer panel */}
          <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl p-5 border border-slate-800 backdrop-blur-md h-fit space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3 mb-1 text-sm uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Brand Identity Elements
            </h3>

            {/* Asset Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Select Target Asset</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "icon", label: "App Icon", desc: "512 x 512 px" },
                  { id: "feature", label: "Feature Banner", desc: "1024 x 500 px" },
                  { id: "screenshot", label: "Phone Screen", desc: "1242 x 2208 px" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAsset(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center ${
                      selectedAsset === item.id 
                        ? "border-purple-500 bg-purple-500/10 text-purple-300 font-bold" 
                        : "border-slate-800/80 bg-slate-950/40 text-slate-400 hover:bg-slate-900"
                    }`}
                  >
                    <span className="text-xs">{item.label}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color controls */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase font-mono">Gradient Start</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={gradientStart}
                    onChange={(e) => setGradientStart(e.target.value)}
                    className="w-10 h-8 rounded border border-slate-800 bg-slate-900 cursor-pointer" 
                  />
                  <input 
                    type="text" 
                    value={gradientStart} 
                    onChange={(e) => setGradientStart(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase font-mono">Gradient End</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={gradientEnd}
                    onChange={(e) => setGradientEnd(e.target.value)}
                    className="w-10 h-8 rounded border border-slate-800 bg-slate-900 cursor-pointer" 
                  />
                  <input 
                    type="text" 
                    value={gradientEnd} 
                    onChange={(e) => setGradientEnd(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Glyph symbol selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Logo Emblem Glyph</label>
              <div className="grid grid-cols-6 gap-2">
                {Object.entries(iconsSet).map(([key, Icon]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setIconType(key as any)}
                    className={`p-2.5 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
                      iconType === key 
                        ? "bg-purple-950/40 border-purple-500 text-purple-300"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Display texts */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase font-mono">Headline Title Text</label>
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase font-mono">Sub-tagline Text</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase font-mono">Emblem Badge Info</label>
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 font-medium"
                />
              </div>
            </div>

            <button
              onClick={handleExportAsset}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              <Download className="w-4 h-4" />
              Download {selectedAsset.toUpperCase()} Spec Pack
            </button>
          </div>

          {/* Graphic Design Studio Board */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden min-h-[450px]">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-400" />
                Active Graphic Render Preview
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Live Device simulation</span>
            </div>

            {/* Design stage outer padding container */}
            <div className="flex-1 p-6 flex items-center justify-center bg-slate-900/40">
              
              {/* Conditional viewport render depending on selected tab */}
              {selectedAsset === "icon" && (
                <div 
                  className="w-48 h-48 rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-6 relative select-none transition-all duration-300 border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
                  }}
                >
                  <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md text-[8px] font-bold text-white uppercase px-1.5 py-0.5 rounded-full font-mono">
                    {badgeText}
                  </div>
                  <SelectedIconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                  <span className="text-white font-bold text-center text-sm truncate max-w-[140px] tracking-wide mt-2 drop-shadow-md">
                    {titleText}
                  </span>
                </div>
              )}

              {selectedAsset === "feature" && (
                <div 
                  className="w-full max-w-xl h-64 rounded-2xl shadow-2xl flex flex-col justify-between p-6 relative select-none border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
                  }}
                >
                  {/* Highlight circles for depth */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 blur-xl" />

                  <div className="flex justify-between items-start z-10">
                    <span className="text-[10px] font-mono font-bold bg-white/15 backdrop-blur-md px-2 py-0.5 rounded text-white tracking-widest uppercase">
                      Android Feature Graphic
                    </span>
                    <span className="text-[9px] font-mono text-white/70">1024 x 500 px</span>
                  </div>

                  <div className="text-center sm:text-left z-10">
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <SelectedIconComponent className="w-12 h-12 text-white drop-shadow-lg shrink-0" />
                      <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight leading-none drop-shadow">{titleText}</h1>
                        <p className="text-[10px] text-white/80 font-medium font-mono mt-1">{badgeText}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/90 font-medium tracking-wide mt-3 truncate max-w-md drop-shadow">
                      {tagline}
                    </p>
                  </div>

                  <div className="text-[9px] text-white/60 font-mono z-10 text-right">
                    Prepared automatically by AI Brand Studio
                  </div>
                </div>
              )}

              {selectedAsset === "screenshot" && (
                <div className="relative w-56 h-[340px] bg-slate-900 border-[6px] border-slate-750 rounded-[32px] overflow-hidden shadow-2xl shrink-0">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-slate-750 rounded-b-xl z-20" />
                  
                  {/* Phone Screen content matching theme */}
                  <div 
                    className="w-full h-full p-4 flex flex-col justify-between relative"
                    style={{
                      background: `linear-gradient(145deg, #090714, #120e2a)`
                    }}
                  >
                    {/* Tiny header */}
                    <div className="flex justify-between text-[8px] font-semibold text-slate-500 font-mono pt-1">
                      <span>9:41 AM</span>
                      <span className="text-emerald-400">⚡ 100%</span>
                    </div>

                    {/* App screen mockup display */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center px-2 space-y-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5"
                        style={{
                          background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
                        }}
                      >
                        <SelectedIconComponent className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-slate-200 tracking-tight">{titleText}</h4>
                        <p className="text-[8px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Mock UI list items */}
                      <div className="w-full space-y-1">
                        <div className="bg-slate-950/60 border border-slate-900 p-1.5 rounded-lg text-left">
                          <div className="w-1/2 h-1 bg-slate-800 rounded" />
                          <div className="w-3/4 h-1 bg-slate-800/40 rounded mt-1" />
                        </div>
                        <div className="bg-slate-950/60 border border-slate-900 p-1.5 rounded-lg text-left">
                          <div className="w-1/3 h-1 bg-slate-800 rounded" />
                          <div className="w-5/6 h-1 bg-slate-800/40 rounded mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom promotion strip */}
                    <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/60 border border-white/10 p-1.5 rounded-xl text-center">
                      <p className="text-[7px] text-white font-semibold uppercase font-mono tracking-widest">{badgeText}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Stage bottom info banner */}
            <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-3 flex text-[10px] text-slate-500 justify-between items-center shrink-0">
              <span>Aspect ratio optimized for submission standards.</span>
              <span className="font-mono text-purple-400">Emblem: {iconType.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center h-48 flex items-center justify-center">
          <p className="text-slate-400 text-sm">Please generate your Android code spec in App Generator space first.</p>
        </div>
      )}
    </div>
  );
}
