import React, { useState } from "react";
import { AppProject } from "../types";
import { 
  Wrench, 
  Sparkles, 
  Loader2, 
  CheckCircle, 
  ArrowRight, 
  Code, 
  AlertCircle, 
  Info 
} from "lucide-react";

interface AiFixSystemProps {
  activeProject: AppProject | null;
  onUpdateProject: (p: AppProject) => void;
  diagnosticsData: any;
  setDiagnosticsData: (data: any) => void;
}

export default function AiFixSystem({
  activeProject,
  onUpdateProject,
  diagnosticsData,
  setDiagnosticsData
}: AiFixSystemProps) {
  const [isFixing, setIsFixing] = useState(false);
  const [fixSuccess, setFixSuccess] = useState(false);

  const handleApplyFix = async () => {
    if (!activeProject || !diagnosticsData) return;

    setIsFixing(true);
    try {
      // Simulate applying code patch on client
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const targetFile = diagnosticsData.targetFile || "android/build.gradle";
      
      // Patch original code block
      const updatedSnippets = { ...(activeProject.codeSnippets || {}) };
      if (updatedSnippets[targetFile]) {
        // Mock simple substitution
        updatedSnippets[targetFile] = `// [AI AUTO-PATCH APPLIED FOR GRADLE/DEPENDENCY LOCK]\n` + updatedSnippets[targetFile] + `\n\n// Added correction: \n${diagnosticsData.generatedCode}`;
      } else {
        // Create custom repair config
        updatedSnippets[targetFile] = diagnosticsData.generatedCode;
      }

      onUpdateProject({
        ...activeProject,
        status: "Generated", // Reset status so they can compile error-free now!
        codeSnippets: updatedSnippets,
        buildLogs: [
          ...(activeProject.buildLogs || []),
          `[AI-DOCTOR] Applied diagnostic patch on: ${targetFile}`,
          `[AI-DOCTOR] Modified codebase dependency lock definitions. Workspace state reset to Draft/Generated successfully.`
        ]
      });

      setFixSuccess(true);
      setDiagnosticsData(null); // Clear active diagnostic trigger on success
    } catch (e) {
      console.error(e);
      alert("Diagnostic repair failed. Verify patch bounds.");
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="space-y-6" id="ai-fix-tab">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-indigo-400 animate-pulse" />
          AI Diagnostic Repair Center
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Automatically diagnose build issues, resolving Android dependency lock bounds, Gradle mismatches, or CocoaPods compilation conflicts.
        </p>
      </div>

      {activeProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Diagnostic Status Panel */}
          <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl p-5 border border-slate-800 backdrop-blur-md h-fit space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3 mb-1 text-sm uppercase tracking-wide flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-400" />
              Doctor Diagnostic Status
            </h3>

            {diagnosticsData ? (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-red-300">Active Build Error Tracked</h5>
                    <p className="text-[11px] text-slate-350 mt-1">{diagnosticsData.summary}</p>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2">
                  <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Proposed Repair Steps</h6>
                  <ul className="space-y-1.5 list-none pl-0">
                    {diagnosticsData.fixingSteps?.map((step: string, idx: number) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-purple-400 shrink-0">✔</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleApplyFix}
                  disabled={isFixing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  {isFixing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                      Applying patch on local codebase...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4 text-indigo-300 animate-spin" />
                      Apply AI Recommended Correction
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {fixSuccess ? (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                    <h5 className="text-sm font-bold text-green-300">Diagnostic Repair Complete!</h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Codebase dependency bounds successfully patched. Head back to the <strong>APK Builder</strong> compiler to trigger build checks again.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-500 py-10">
                    <CheckCircle className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                    <p className="text-xs">No compiled project build faults detected layout in this current turn.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Code Patch Diff layout column */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between overflow-hidden h-[450px]">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-purple-400" />
                Target File Code Diff Patch Preview
              </span>
              {diagnosticsData && (
                <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  {diagnosticsData.targetFile}
                </span>
              )}
            </div>

            {/* Displaying proposed patch diff visualizers */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3 custom-scrollbar bg-black text-slate-300 selection:bg-indigo-950">
              {diagnosticsData ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-red-500/10 overflow-hidden bg-red-950/5">
                    <div className="bg-red-950/20 text-red-400 px-3 py-1 font-bold text-[10px] font-mono border-b border-red-500/10">ORIGINAL LOCK DEFINITIONS</div>
                    <pre className="p-3 text-red-200/70 line-through select-none text-[11px] leading-relaxed">
                      {`ext.kotlin_version = '1.8.0'\ndependencies {\n    implementation "org.jetbrains.kotlin:kotlin-stdlib:1.8.0"\n}`}
                    </pre>
                  </div>

                  <div className="flex items-center justify-center text-slate-600">
                    <ArrowRight className="w-5 h-5 text-indigo-400" />
                  </div>

                  <div className="rounded-lg border border-green-500/20 overflow-hidden bg-green-950/5">
                    <div className="bg-green-950/20 text-green-400 px-3 py-1 font-bold text-[10px] font-mono border-b border-green-500/10">AI PROPOSED REPLACEMENT</div>
                    <pre className="p-3 text-green-300 font-semibold text-[11px] leading-relaxed whitespace-pre-wrap">
                      {diagnosticsData.generatedCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-650 font-sans text-center">
                  <Code className="w-8 h-8 mb-2 text-slate-800" />
                  <p className="text-xs">No code changes drafted at this workspace interval.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border-t border-slate-800/80 px-4 py-3 flex text-[10px] text-slate-500 justify-between items-center shrink-0">
              <span>Automatic Gradle wrapper resolution rules.</span>
              <span className="font-mono text-indigo-400">Doctor Mode Online</span>
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
