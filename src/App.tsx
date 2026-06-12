import React, { useState } from "react";
import { AppProject } from "./types";
import DashboardOverview from "./components/DashboardOverview";
import AppGenerator from "./components/AppGenerator";
import ApkBuilder from "./components/ApkBuilder";
import PublishingAssistant from "./components/PublishingAssistant";
import AssetsGenerator from "./components/AssetsGenerator";
import GithubSync from "./components/GithubSync";
import AiFixSystem from "./components/AiFixSystem";
import { 
  Rocket, 
  Sparkles, 
  Cpu, 
  Building, 
  Palette, 
  Github, 
  Wrench, 
  HelpCircle, 
  Layers, 
  User, 
  Menu, 
  X, 
  Compass, 
  AlertCircle 
} from "lucide-react";

export default function App() {
  // Pre-seed an exciting initial mock project so the dashboard is immediately vivid and interactive
  const initialProject: AppProject = {
    id: "proj_buddy_mind",
    name: "ZenBreath: Breathe & Focus",
    description: "An elegant, minimalist meditation application presenting structural breathing rhythm loops, volume controllers, ambient dark cyan themes, and full historical logs.",
    theme: "Dark Cyber",
    platform: "Flutter",
    status: "Generated",
    codeStructure: {
      overview: "Provides a full MaterialApp structure matching Material 3, custom State controllers for breath counting, and a dynamic local list persistent store.",
      files: [
        { path: "pubspec.yaml", language: "yaml" },
        { path: "lib/main.dart", language: "dart" },
        { path: "lib/breath_timer.dart", language: "dart" },
        { path: "android/app/build.gradle", language: "gradle" },
        { path: "android/app/src/main/AndroidManifest.xml", language: "xml" }
      ]
    },
    codeSnippets: {
      "pubspec.yaml": `name: zen_breath\ndescription: A premium elegant breathing timer.\nversion: 1.0.0+1\n\nenvironment:\n  sdk: ">=3.0.0 <4.0.0"\n\ndependencies:\n  flutter:\n    sdk: flutter\n  provider: ^6.1.1\n  shared_preferences: ^2.2.2`,
      "lib/main.dart": `import 'package:flutter/material.dart';\nimport 'breath_timer.dart';\n\nvoid main() => runApp(const ZenBreathApp());\n\nclass ZenBreathApp extends StatelessWidget {\n  const ZenBreathApp({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'ZenBreath',\n      theme: ThemeData.dark(useMaterial3: true),\n      home: const BreathTimerScreen(),\n    );\n  }\n}`,
      "lib/breath_timer.dart": `import 'package:flutter/material.dart';\nimport 'dart:async';\n\nclass BreathTimerScreen extends StatefulWidget {\n  const BreathTimerScreen({super.key});\n  @override\n  State<BreathTimerScreen> createState() => _BreathTimerScreenState();\n}\n\nclass _BreathTimerScreenState extends State<BreathTimerScreen> {\n  bool _isActive = false;\n  int _seconds = 4;\n  String _phase = "Inhale";\n  Timer? _timer;\n\n  void _toggleBreath() {\n    setState(() => _isActive = !_isActive);\n    if (_isActive) {\n      _timer = Timer.periodic(const Duration(seconds: 1), (t) {\n        setState(() {\n          if (_seconds > 1) {\n            _seconds--;\n          } else {\n            _phase = _phase == "Inhale" ? "Hold" : _phase == "Hold" ? "Exhale" : "Inhale";\n            _seconds = _phase == "Hold" ? 4 : 5;\n          }\n        });\n      });\n    } else {\n      _timer?.cancel();\n    }\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      backgroundColor: const Color(0xFF0F0B1E),\n      body: Center(\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            Text(_phase, style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),\n            const SizedBox(height: 20),\n            Text('\$_seconds s', style: const TextStyle(fontSize: 48)),\n            IconButton(icon: Icon(_isActive ? Icons.pause : Icons.play_arrow), onPressed: _toggleBreath),\n          ],\n        ),\n      ),\n    );\n  }\n}`
    },
    buildLogs: ["[INIT] Seed workspace loaded.", "[GEN] Created primary structure for ZenBreath."],
    builds: [
      {
        id: "build_prev_apk",
        type: "APK",
        fileName: "zenbreath_release_v1.apk",
        size: "14.2 MB",
        createdAt: "2026-06-11 10:56",
        version: "1.0.0 (Build 1)"
      }
    ]
  };

  const [projects, setProjects] = useState<AppProject[]>([initialProject]);
  const [activeProject, setActiveProject] = useState<AppProject | null>(initialProject);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [diagnosticsData, setDiagnosticsData] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleUpdateProject = (updated: AppProject) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
    setActiveProject(updated);
  };

  const handleCreateNewProject = () => {
    setActiveProject(null);
    setActiveTab("generator");
  };

  const handleSaveNewProject = (created: AppProject) => {
    setProjects(prev => [created, ...prev]);
    setActiveProject(created);
    setActiveTab("dashboard");
  };

  // Callback from compilation logs indicating simulated failure
  const handleTriggerDiagnostics = async (errorCode: string, logs: string) => {
    if (!activeProject) return;

    try {
      const response = await fetch("/api/diagnose-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          errorCode,
          platform: activeProject.platform,
          logContent: logs
        })
      });

      const data = await response.json();
      setDiagnosticsData(data);
      // Auto redirect tab immediately to AI Compiler Doctor panel so they see the fix recommendation
      setActiveTab("aifix");
    } catch (e) {
      console.error("Failed fetching diagnostic results: ", e);
    }
  };

  // Simulate explicit trigger of build tasks from dashboard
  const handleTriggerBuildFromDashboard = (type: "APK" | "AAB") => {
    setActiveTab("builder");
  };

  const navTabs = [
    { id: "dashboard", label: "Dashboard", icon: Rocket },
    { id: "generator", label: "App Generator", icon: Sparkles },
    { id: "builder", label: "APK Builder", icon: Cpu },
    { id: "listing", label: "Play Store Listing", icon: Building },
    { id: "assets", label: "Brand Asset Studio", icon: Palette },
    { id: "github", label: "GitHub Sync", icon: Github },
    { id: "aifix", label: "AI Compiler Doctor", icon: Wrench, outline: true, badge: diagnosticsData ? "FAULT" : null },
  ];

  return (
    <div className="min-h-screen bg-[#090714] text-slate-100 flex flex-col justify-between selection:bg-purple-900/60 font-sans" id="applet-viewport">
      
      {/* Dynamic Background Glow effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#1e1b4b]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#31115c]/25 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Primary Workspace Header */}
      <header className="bg-slate-900/40 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/10">
              <Rocket className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 via-purple-100 to-white">
                  Auto App Publisher AI
                </span>
                <span className="text-[10px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold border border-purple-500/20">
                  AGENT
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Android Source & Compiler engine</p>
            </div>
          </div>

          {/* Desktop Right items */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Active sync detail */}
            {activeProject && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Workspace Project: <strong>{activeProject.name}</strong>
              </div>
            )}

            {/* Profile email locator */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/40 via-purple-950/20 to-slate-900 border border-purple-500/15">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs text-slate-350 select-none font-mono font-bold">surendraqwer41@gmail.com</span>
            </div>
          </div>

          {/* Mobile responsive drawer burger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1 w-full flex flex-col lg:flex-row gap-6 relative">
        
        {/* Navigation Sidebar Panel */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-2">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-slate-900/40 border-purple-550/40 text-purple-300 shadow-md"
                    : tab.outline 
                      ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300"
                      : "border-transparent text-slate-400 hover:bg-slate-800/20 hover:text-slate-200"
                }`}
                id={`nav-tab-${tab.id}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-inherit"}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold border border-red-500/30 animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="p-4 rounded-xl bg-slate-950/20 border border-slate-850 space-y-2 mt-5">
            <h5 className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Workspace Health Check</h5>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>SDK Server</span>
                <span className="text-emerald-400 font-bold">• ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct Compile Node</span>
                <span className="text-emerald-400 font-bold">• ONLINE</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile menu modal layout drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-[#0c0a1c] border-b border-slate-800/80 p-5 z-40 flex flex-col space-y-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm cursor-pointer ${
                    isActive
                      ? "bg-slate-800 text-purple-300"
                      : "text-slate-400 hover:bg-slate-800/45"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Tab Switchboard wrapper */}
        <div className="flex-1 min-w-0">
          
          {activeTab === "dashboard" && (
            <DashboardOverview
              projects={projects}
              activeProject={activeProject}
              onSelectProject={setActiveProject}
              onCreateNewProject={handleCreateNewProject}
              onTriggerBuild={handleTriggerBuildFromDashboard}
            />
          )}

          {activeTab === "generator" && (
            <AppGenerator
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
              onSaveNewProject={handleSaveNewProject}
            />
          )}

          {activeTab === "builder" && (
            <ApkBuilder
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
              onTriggerDiagnostics={handleTriggerDiagnostics}
            />
          )}

          {activeTab === "listing" && (
            <PublishingAssistant
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === "assets" && (
            <AssetsGenerator
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === "github" && (
            <GithubSync
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
            />
          )}

          {activeTab === "aifix" && (
            <AiFixSystem
              activeProject={activeProject}
              onUpdateProject={handleUpdateProject}
              diagnosticsData={diagnosticsData}
              setDiagnosticsData={setDiagnosticsData}
            />
          )}

        </div>

      </main>

      {/* Brand Footer */}
      <footer className="bg-slate-900/10 border-t border-white/5 py-6 shrink-0 mt-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Auto App Publisher AI. Direct licensing compliant. Built for secure Android compiler networks.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Developer Policy Guidelines</span>
            <span className="hover:text-slate-400 cursor-pointer font-mono text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">v1.2.4 PRO</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
