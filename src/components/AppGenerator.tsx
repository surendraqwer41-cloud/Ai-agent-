import React, { useState } from "react";
import { AppProject } from "../types";
import { 
  Sparkles, 
  Smartphone, 
  Layers, 
  Check, 
  Copy, 
  CornerDownRight, 
  Code, 
  Loader2, 
  Flame, 
  Sun, 
  Compass, 
  Laptop
} from "lucide-react";

interface AppGeneratorProps {
  activeProject: AppProject | null;
  onUpdateProject: (p: AppProject) => void;
  onSaveNewProject: (p: AppProject) => void;
}

export default function AppGenerator({
  activeProject,
  onUpdateProject,
  onSaveNewProject,
}: AppGeneratorProps) {
  const [appName, setAppName] = useState(activeProject?.name || "");
  const [appDesc, setAppDesc] = useState(activeProject?.description || "");
  const [appTheme, setAppTheme] = useState(activeProject?.theme || "Ocean Blue");
  const [platform, setPlatform] = useState<any>(
    activeProject?.platform || "Flutter"
  );
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync if active project changes
  React.useEffect(() => {
    if (activeProject) {
      setAppName(activeProject.name);
      setAppDesc(activeProject.description);
      setAppTheme(activeProject.theme);
      setPlatform(activeProject.platform);
      if (activeProject.codeSnippets) {
        setSelectedFileName(Object.keys(activeProject.codeSnippets)[0]);
      } else {
        setSelectedFileName(null);
      }
    } else {
      setAppName("");
      setAppDesc("");
      setAppTheme("Ocean Blue");
      setPlatform("Flutter");
      setSelectedFileName(null);
    }
  }, [activeProject]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim() || !appDesc.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName,
          appDescription: appDesc,
          appTheme,
          platform,
        }),
      });

      const resData = await response.json();
      
      const newProject: AppProject = {
        id: activeProject?.id || "proj_" + Math.random().toString(36).substr(2, 9),
        name: appName,
        description: appDesc,
        theme: appTheme,
        platform,
        status: "Generated",
        codeStructure: resData.appStructure,
        codeSnippets: resData.codeSnippets,
        buildLogs: ["[INIT] App structure initialized with customized parameters.", "[GEN] Source code folders resolved correctly via server AI agent."],
        builds: activeProject?.builds || [],
        githubRepo: activeProject?.githubRepo,
        assets: activeProject?.assets
      };

      if (activeProject) {
        onUpdateProject(newProject);
      } else {
        onSaveNewProject(newProject);
      }

      if (resData.codeSnippets) {
        setSelectedFileName(Object.keys(resData.codeSnippets)[0]);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during app draft synthesis. Verify connections and retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  const currentCode = selectedFileName && activeProject?.codeSnippets
    ? activeProject.codeSnippets[selectedFileName]
    : "";

  const handleCopyCode = () => {
    if (!currentCode) return;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Premixed UI styles/themes for choices
  const themePresets = [
    { name: "Ocean Blue", class: "from-blue-600 to-indigo-800", icon: Compass, color: "blue" },
    { name: "Dark Cyber", class: "from-slate-800 to-purple-950 border-purple-500/20", icon: Flame, color: "purple" },
    { name: "Warm Elegant", class: "from-amber-600 to-amber-900", icon: Sun, color: "amber" },
    { name: "Material Emerald", class: "from-emerald-600 to-teal-800", icon: Laptop, color: "emerald" },
  ];

  return (
    <div className="space-y-6" id="app-generator">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          AI App Generator & Draft Compiler
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Synthesize professional Boilerplates, View Controllers, Layout resources, and Package scripts matching developer rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Specification form card */}
        <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl p-5 border border-slate-800 backdrop-blur-md h-fit">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
            <Smartphone className="w-4 h-4 text-blue-400" />
            Android Architecture Specs
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">App Brand Title</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. FitTrack Pro, Calming Daily"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Describe app core features & purpose</label>
              <textarea
                value={appDesc}
                onChange={(e) => setAppDesc(e.target.value)}
                placeholder="Describe your app. Tell the AI what screens, state management logic, or utility controllers you need. (e.g. A meditation app with custom breathing rhythm timer, static logs of session history, and rich volume modifiers)"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all h-32 resize-none custom-scrollbar font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Design Theme Accent</label>
              <div className="grid grid-cols-2 gap-2">
                {themePresets.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = appTheme === preset.name;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setAppTheme(preset.name)}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex items-center gap-2 bg-slate-950/60 cursor-pointer ${
                        isSelected 
                          ? "border-purple-500/60 ring-1 ring-purple-500/35" 
                          : "border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-purple-400" : "text-slate-500"}`} />
                      <span className="text-xs font-semibold text-slate-200">{preset.name}</span>
                      <div className={`absolute bottom-0 right-0 w-8 h-1 bg-gradient-to-r ${preset.class}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">Workspace Framework Target</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform("Flutter")}
                  className={`p-3 rounded-xl border font-bold text-xs text-center transition-all cursor-pointer ${
                    platform === "Flutter"
                      ? "bg-blue-600/10 border-blue-500 text-blue-300"
                      : "bg-slate-950/40 border-slate-850 hover:bg-slate-900 text-slate-400"
                  }`}
                >
                  Flutter SDK
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform("Android Native Kotlin")}
                  className={`p-3 rounded-xl border font-bold text-xs text-center transition-all cursor-pointer ${
                    platform === "Android Native Kotlin"
                      ? "bg-purple-600/10 border-purple-500 text-purple-300"
                      : "bg-slate-950/40 border-slate-850 hover:bg-slate-900 text-slate-400"
                  }`}
                >
                  Kotlin (Jetpack Compose)
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !appName.trim() || !appDesc.trim()}
              className="mt-4 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 text-slate-100 disabled:text-slate-500 font-bold text-sm tracking-wide shadow-md hover:shadow-purple-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              id="btn-generate-app-code"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                  Synthesizing codebase patterns...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {activeProject ? "Re-Synthesize Code" : "Synthesize Starter App"}
                </>
              )}
            </button>
          </form>
        </div>

        {/* IDE Viewer of Generated Code */}
        <div className="lg:col-span-7 flex flex-col h-[520px]">
          {activeProject?.codeStructure && activeProject?.codeSnippets ? (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden h-full">
              
              {/* Fake IDE Header / Tabs */}
              <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span>Interactive App Source IDE</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-slate-100 transition-all cursor-pointer font-bold border border-slate-700"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Lower split view: Left files list, Right IDE text */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left File Tree Column */}
                <div className="w-48 bg-slate-900/50 border-r border-slate-800/60 p-2.5 overflow-y-auto shrink-0 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono px-2 py-1">Project Files</p>
                    {activeProject.codeStructure.files.map((fileObj) => {
                      const isActive = selectedFileName === fileObj.path;
                      return (
                        <button
                          key={fileObj.path}
                          onClick={() => setSelectedFileName(fileObj.path)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                            isActive 
                              ? "bg-slate-800 text-purple-300 font-semibold"
                              : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                          }`}
                        >
                          <span className="truncate">{fileObj.path}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-2 bg-slate-900/60 border border-slate-800/50 rounded-lg">
                    <p className="text-[9px] font-bold text-slate-500 uppercase font-mono mb-1">Architecture</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Material 3 UI, modern MVVM patterns, direct exportable.</p>
                  </div>
                </div>

                {/* Right Code view Column */}
                <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs leading-relaxed custom-scrollbar">
                  {currentCode ? (
                    <pre className="text-slate-300 whitespace-pre">
                      <code>{currentCode}</code>
                    </pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 font-sans">
                      Select a file from the list to view draft code.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Output Overview footer */}
              <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-3">
                <p className="text-[11px] text-slate-400 italic leading-tight">
                  💡 <strong>Overview:</strong> {activeProject.codeStructure.overview}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full backdrop-blur-md">
              <Layers className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-md font-bold text-slate-300">Boilerplate IDE Workspace Stale</h4>
              <p className="text-sm text-slate-400 mt-1 max-w-sm leading-relaxed">
                Provide specifications in the config panel and click the synthesis launch to trigger the AI code engine.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
