import React from "react";
import { AppProject } from "../types";
import { 
  Rocket, 
  Cpu, 
  Layers, 
  HardDrive, 
  Clock, 
  Play, 
  Eye, 
  FolderIcon, 
  Code2, 
  Terminal, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  ChevronRight, 
  Download,
  Info
} from "lucide-react";

interface DashboardOverviewProps {
  projects: AppProject[];
  activeProject: AppProject | null;
  onSelectProject: (p: AppProject) => void;
  onCreateNewProject: () => void;
  onTriggerBuild: (type: "APK" | "AAB") => void;
}

export default function DashboardOverview({
  projects,
  activeProject,
  onSelectProject,
  onCreateNewProject,
  onTriggerBuild
}: DashboardOverviewProps) {

  return (
    <div className="space-y-6" id="dashboard-overview">
      
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-400" />
            AI Developer Workspace Control Panel
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Build, compile status check, publish, and manage automatic Android application profiles.
          </p>
        </div>
        <button
          onClick={onCreateNewProject}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-purple-900/10 border border-white/10 shrink-0 self-start md:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create New Project
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">WORKSPACE PATHS</span>
            <span className="text-lg font-bold text-slate-100 mt-0.5 block">{projects.length} Workspace{projects.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Cpu className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">SDK TARGET ENVIRONMENT</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">Android API Level 34</span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">COMPILER PIPELINE</span>
            <span className="text-emerald-400 text-sm font-bold mt-0.5 block flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping inline-block" /> Live & Ready
            </span>
          </div>
        </div>

        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <HardDrive className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">INTEGRATION SYNCS</span>
            <span className="text-sm font-bold text-slate-200 mt-0.5 block">GitHub Auth Live</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Project Switcher & Workspace Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Workspace Focus Card */}
          {activeProject ? (
            <div className="bg-gradient-to-r from-slate-900/40 to-slate-950/40 rounded-3xl p-6 border border-slate-800 backdrop-blur-md space-y-5 relative overflow-hidden">
              
              {/* Highlight ribbon representing active task */}
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500/20 via-transparent to-transparent w-36 h-36" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/25">
                      ACTIVE PROJECT
                    </span>
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/25">
                      {activeProject.platform}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-150">{activeProject.name}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                    activeProject.status === "Succeeded" || activeProject.status === "Generated"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : activeProject.status === "Failed"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}>
                    ● {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-350 text-xs leading-relaxed max-w-2xl">
                {activeProject.description}
              </p>

              {/* Action Buttons Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <button
                  onClick={() => onTriggerBuild("APK")}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl flex items-center justify-between text-left group transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">COMPILE PIPELINE A</span>
                    <span className="text-xs font-bold text-slate-200 block group-hover:text-purple-400 transition-colors">Generate standard APK file</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => onTriggerBuild("AAB")}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl flex items-center justify-between text-left group transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">COMPILE PIPELINE B</span>
                    <span className="text-xs font-bold text-slate-200 block group-hover:text-blue-400 transition-colors">Draft App Bundle (.AAB)</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </button>

              </div>

              {/* Project Code Structure summary card if defined */}
              {activeProject.codeStructure && (
                <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5 font-mono">
                      <FolderIcon className="w-3.5 h-3.5 text-blue-400" />
                      Manifest File Tree Structures ({activeProject.codeStructure.files.length} items)
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">Ready to compile</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal italic">
                    {activeProject.codeStructure.overview}
                  </p>
                  
                  {/* Miniature file pill renderer */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProject.codeStructure.files.map((file, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-350 text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-800">
                        📄 {file.path}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Builds of the Active project */}
              {activeProject.builds && activeProject.builds.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide font-mono px-1">Compiled Asset Archive</h4>
                  <div className="space-y-2">
                    {activeProject.builds.map((build) => (
                      <div 
                        key={build.id}
                        className="bg-slate-950/30 border border-slate-900 hover:border-slate-850 p-3.5 rounded-xl flex items-center justify-between text-xs transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                            build.type === "APK" ? "bg-purple-950 text-purple-300 border border-purple-900" : "bg-blue-950 text-blue-300 border border-blue-900"
                          }`}>
                            {build.type}
                          </span>
                          <div>
                            <span className="font-bold text-slate-200 block">{build.fileName}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{build.createdAt} • Size: {build.size} • Version: {build.version}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => alert(`Downloading production package: ${build.fileName}`)}
                          className="bg-slate-900 hover:bg-slate-850 p-2 rounded-lg border border-slate-800 text-purple-300 hover:text-purple-200 transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-slate-90/40 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center backdrop-blur-md">
              <Code2 className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-md font-bold text-slate-300">No active workspace</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">
                Click "Create New Project" or select a workspace application from the panels below to configure APK outputs.
              </p>
            </div>
          )}

          {/* Projects Collection Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide font-mono px-1">Project Workspaces Directory</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => {
                const isActive = activeProject?.id === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => onSelectProject(proj)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isActive 
                        ? "bg-slate-900/60 border-purple-500/50 shadow-md ring-1 ring-purple-500/10" 
                        : "bg-slate-950/40 border-slate-850 hover:bg-slate-900/20 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{proj.platform}</span>
                      <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded font-semibold ${
                        proj.status === "Succeeded" || proj.status === "Generated"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-200 text-sm truncate">{proj.name}</h5>
                    <p className="text-[11px] text-slate-450 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side Info Rail: Logs, System Health, compiler notifications */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Logs Console Panel */}
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-900/80 flex flex-col justify-between h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                Live Build Logs Terminal
              </span>
              <span className="text-[9px] text-slate-600 font-mono select-none">Stream offline</span>
            </div>

            {/* Simulated Live logs stack */}
            <div className="flex-1 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-2.5 py-4 custom-scrollbar select-all">
              {activeProject && activeProject.buildLogs ? (
                activeProject.buildLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed border-l-2 border-purple-500/20 pl-2">
                    <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> {log}
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 italic">
                  No compiler streams connected
                </div>
              )}
            </div>

            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-900 text-[10px] text-slate-500 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Full deployment system synced. APK binary targets valid.</span>
            </div>
          </div>

          {/* System Environment checklist */}
          <div className="bg-slate-900/30 rounded-2xl p-5 border border-slate-850 space-y-4">
            <h5 className="font-bold text-xs text-slate-300 uppercase tracking-wider font-mono">Deployment Readiness</h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center justify-between pb-1 border-b border-slate-950/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Flutter Integration Node
                </span>
                <span className="font-mono text-slate-500 text-[10px]">API Level 34 OK</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-950/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Play Developer Token
                </span>
                <span className="font-mono text-slate-300 text-[10px]">Verified Scope</span>
              </div>
              <div className="flex items-center justify-between pb-1 border-b border-slate-950/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Keystore Certificate
                </span>
                <span className="font-mono text-slate-300 text-[10px]">SHA256 Signed</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
