import React, { useState } from "react";
import { AppProject } from "../types";
import { 
  Play, 
  Cpu, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Wrench, 
  Terminal, 
  ExternalLink 
} from "lucide-react";

interface ApkBuilderProps {
  activeProject: AppProject | null;
  onUpdateProject: (p: AppProject) => void;
  onTriggerDiagnostics: (errorCode: string, logs: string) => void;
}

export default function ApkBuilder({
  activeProject,
  onUpdateProject,
  onTriggerDiagnostics
}: ApkBuilderProps) {
  const [buildType, setBuildType] = useState<"APK" | "AAB">("APK");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildSuccess, setBuildSuccess] = useState<boolean | null>(null);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  const [customErrorScenario, setCustomErrorScenario] = useState<string>("");

  const handleBuild = async () => {
    if (!activeProject) return;

    setIsBuilding(true);
    setBuildSuccess(null);
    setSimulatedLogs(["[INIT] Connecting to Android Compiler container...", "[INIT] Spinning up sandbox emulator..."]);
    
    // Periodically update mock logs to look extremely technical and satisfying
    const interval = setInterval(() => {
      setSimulatedLogs(prev => {
        const nextLogs = [...prev];
        if (nextLogs.length < 12) {
          nextLogs.push(`[BUILD_STEP] Executing task index #${nextLogs.length + 1} - compiling resources...`);
        }
        return nextLogs;
      });
    }, 450);

    try {
      // If user selected simulated error, we abort with error logs to test the "AI Fix" mechanism
      if (customErrorScenario) {
        await new Promise(resolve => setTimeout(resolve, 2500));
        clearInterval(interval);
        
        let errorLogs: string[] = [];
        if (customErrorScenario === "gradle") {
          errorLogs = [
            "[BUILD] Starting build pipeline...",
            "[COMPILE] Compiling modules :app...",
            "e: /workspace/android/app/build.gradle: (21, 5): Gradle DSL method not found: 'compileSuccessfully()'",
            "e: Could not find method compileSuccessfully() for arguments [buildType: release] on object 'android.buildTypes.release' of type com.android.build.gradle.internal.dsl.BuildType.",
            "FAILURE: Build failed with an exception.",
            "* What went wrong:",
            "A problem occurred configuring project ':app'. > Gradle dependency tree conflict with kotlin-gradle-plugin:1.8.0. Expects >=1.9.0"
          ];
        } else {
          errorLogs = [
            "[BUILD] Initializing Flutter compiler...",
            "pubspec.yaml: Line 18: YAML syntax exception or lock resolution error",
            "Error: CocoaPods or Gradle could not find matching library version definitions for dependency 'provider'.",
            "Target version mismatch: requested 'provider: ^12.0.0' but max index resolved is '6.1.1'",
            "FAILURE: Flutter pub get exited with status code #1"
          ];
        }
        
        setSimulatedLogs(errorLogs);
        setBuildSuccess(false);
        
        // Update Project Status
        const updatedLogs = [...(activeProject.buildLogs || []), ...errorLogs, `[ERROR] Build pipeline aborted due to compilation fault.`];
        onUpdateProject({
          ...activeProject,
          status: "Error",
          buildLogs: updatedLogs
        });
        
        // Autotrigger diagnostic endpoint automatically!
        onTriggerDiagnostics(customErrorScenario, errorLogs.join("\n"));
        
      } else {
        // Run successful simulation
        const response = await fetch("/api/simulate-build", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appName: activeProject.name,
            platform: activeProject.platform,
            buildType
          }),
        });

        const resData = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        clearInterval(interval);

        setSimulatedLogs(resData.logs);
        setBuildSuccess(true);

        const newBuild = {
          id: "build_" + Math.random().toString(36).substr(2, 5),
          type: buildType,
          fileName: resData.fileName,
          size: resData.size,
          createdAt: resData.buildCompletedAt,
          version: "1.0.0 (Build 1)"
        };

        const updatedBuilds = [...(activeProject.builds || []), newBuild];
        
        onUpdateProject({
          ...activeProject,
          status: "Built",
          builds: updatedBuilds,
          buildLogs: [...(activeProject.buildLogs || []), ...resData.logs, `[SUCCESS] Compiled package: ${resData.fileName}`]
        });
      }
    } catch (e) {
      console.error(e);
      clearInterval(interval);
      setBuildSuccess(false);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6" id="apk-builder-tab">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-indigo-400" />
          Cloud APK / AAB Local Compiler
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Perform headless gradle compilation tests to construct standard executable files ready for distribution networks.
        </p>
      </div>

      {activeProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Build triggers */}
          <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl p-5 border border-slate-800 backdrop-blur-md h-fit space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3 mb-2 text-sm uppercase tracking-wide flex items-center justify-between">
              <span>Compiler Profile</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 py-0.5 px-2 rounded font-mono uppercase">{activeProject.platform}</span>
            </h3>

            {/* Build Package selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase font-mono">Build Target Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBuildType("APK")}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    buildType === "APK" 
                      ? "border-blue-500 bg-blue-500/10 text-blue-200" 
                      : "border-slate-850 bg-slate-950/40 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <span className="font-bold text-sm">Universal APK</span>
                  <span className="text-[10px] text-slate-400 mt-1">For direct tester devices</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBuildType("AAB")}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    buildType === "AAB" 
                      ? "border-purple-500 bg-purple-500/10 text-purple-200" 
                      : "border-slate-850 bg-slate-950/40 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <span className="font-bold text-sm">Play App Bundle (AAB)</span>
                  <span className="text-[10px] text-slate-400 mt-1">For Play Console uploads</span>
                </button>
              </div>
            </div>

            {/* Simulated Debug scenarios to showcase Diagnostic auto AI repairs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase font-mono">Simulate Build Scenarios</label>
              <select
                value={customErrorScenario}
                onChange={(e) => setCustomErrorScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50"
              >
                <option value="">🚀 Standard Flawless Build (Simulate success)</option>
                <option value="gradle">❌ Gradle Mismatched Kotlin version error (Forces AI Repair system)</option>
                <option value="dependency">❌ Flutter pubspec.yaml version lock collision error (Forces AI Repair system)</option>
              </select>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                Choose an error scenario to trigger the integrated AI compiler doctor that fixes issues automatically.
              </p>
            </div>

            <button
              onClick={handleBuild}
              disabled={isBuilding || activeProject.status === "Draft"}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 disabled:from-slate-800 disabled:to-slate-800 text-white disabled:text-slate-500 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              id="compiler-button"
            >
              {isBuilding ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-300" />
                  Compiling inside safe Sandbox container...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Compile {buildType} package
                </>
              )}
            </button>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-900">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">Compiled Sign Keystore</h4>
              <p className="text-[10px] text-slate-500 leading-normal">
                An internal development keystore is generated automatically to sign release assemblies to ensure secure installation structures.
              </p>
            </div>
          </div>

          {/* Console / Terminal logs live output */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden h-[450px]">
            <div className="bg-slate-900/80 border-b border-slate-800/60 px-4 py-3 flex items-center justify-between shrink-0">
              <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Live Build Console Output Log
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className={`w-2 h-2 rounded-full ${isBuilding ? "bg-amber-400 animate-ping" : buildSuccess === true ? "bg-green-400" : buildSuccess === false ? "bg-red-400" : "bg-slate-600"}`} />
                <span className="text-slate-400 min-w-[50px] text-right">
                  {isBuilding ? "running..." : buildSuccess === true ? "COMPLETED" : buildSuccess === false ? "ERROR" : "offline"}
                </span>
              </div>
            </div>

            {/* Simulated Live command logs terminal wrapper */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 custom-scrollbar bg-black text-slate-300 selection:bg-purple-900/60 transition-all">
              {simulatedLogs.map((log, idx) => {
                let colorClass = "text-slate-300";
                if (log.startsWith("[ERROR]") || log.startsWith("e:") || log.startsWith("FAILURE:")) {
                  colorClass = "text-red-400 font-semibold";
                } else if (log.startsWith("[SUCCESS]")) {
                  colorClass = "text-green-400 font-bold";
                } else if (log.startsWith("[BUILD]")) {
                  colorClass = "text-indigo-300";
                } else if (log.startsWith("[COMPILE]")) {
                  colorClass = "text-slate-400";
                }
                return (
                  <p key={idx} className={`${colorClass} leading-5 break-all`}>
                    {log}
                  </p>
                );
              })}
              {simulatedLogs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 font-sans text-center">
                  <Terminal className="w-8 h-8 mb-2 text-slate-800" />
                  <p className="text-xs">No build task initiated in this workspace turn yet.</p>
                </div>
              )}
            </div>

            {/* Build Success or Failure notification */}
            {buildSuccess === true && (
              <div className="bg-green-950/20 border-t border-green-500/20 p-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-green-300">Assemble Finished successfully! Release package compiled.</span>
                </div>
                <button
                  onClick={() => alert(`Initiating direct browser proxy download layer...`)}
                  className="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 px-3 py-1 rounded text-xs transition-all font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            )}

            {buildSuccess === false && (
              <div className="bg-red-950/20 border-t border-red-500/20 p-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-bold text-red-300">Compilation failed. Navigate to AI Fix tab to resolve.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 text-sm">Please generate or choose an existing workspace project above first.</p>
        </div>
      )}
    </div>
  );
}
