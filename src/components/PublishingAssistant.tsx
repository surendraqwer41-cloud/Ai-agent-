import React, { useState } from "react";
import { AppProject, StoreListing } from "../types";
import { 
  Building, 
  Download, 
  HelpCircle, 
  Loader2, 
  Sparkles, 
  FileText, 
  Smartphone, 
  Copy, 
  Check, 
  Layers 
} from "lucide-react";

interface PublishingAssistantProps {
  activeProject: AppProject | null;
  onUpdateProject: (p: AppProject) => void;
}

export default function PublishingAssistant({
  activeProject,
  onUpdateProject
}: PublishingAssistantProps) {
  const [selectedStore, setSelectedStore] = useState<string>("Google Play Store");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const stores = [
    { name: "Google Play Store", icon: "🤖", limitTitle: 30, limitShort: 80, limitLong: 4000, desc: "Primary target store representing standard compliance guidelines." },
    { name: "Amazon Appstore", icon: "📦", limitTitle: 50, limitShort: 100, limitLong: 6000, desc: "Optimized packaging targeting Kindle Fire tablets and Fire OS devices." },
    { name: "APKPure Listing", icon: "🔋", limitTitle: 50, limitShort: 120, limitLong: 5000, desc: "Extremely popular search-focused global mirror store with broad region footprints." },
    { name: "Uptodown Registry", icon: "🌐", limitTitle: 60, limitShort: 110, limitLong: 4000, desc: "Safety-scanned direct APK hosting engine popular in Europe and South America." },
    { name: "Huawei AppGallery", icon: "📱", limitTitle: 64, limitShort: 80, limitLong: 8000, desc: "Requires custom HMS Core API references for regional submission packs." },
    { name: "AppBrain Network", icon: "🧠", limitTitle: 35, limitShort: 90, limitLong: 3000, desc: "App discovery network focusing on category indexing keywords." },
  ];

  const currentListing = activeProject?.storeListings?.[selectedStore];

  const handleGenerateListing = async () => {
    if (!activeProject) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appName: activeProject.name,
          appDescription: activeProject.description,
          platform: activeProject.platform,
          storeType: selectedStore
        })
      });

      const data = await response.json();
      
      const updatedListings = {
        ...(activeProject.storeListings || {}),
        [selectedStore]: data
      };

      onUpdateProject({
        ...activeProject,
        storeListings: updatedListings
      });
    } catch (e) {
      console.error(e);
      alert("Failed to synthesize marketing copy. Retry shortly.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = (text: string, titleId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(titleId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const currentLimit = stores.find(s => s.name === selectedStore) || stores[0];

  const handleExportZip = () => {
    if (!currentListing) return;
    
    const draftContent = `App Name: ${currentListing.title}
Short Snippet: ${currentListing.shortDescription}
Keywords: ${currentListing.keywords.join(", ")}
Age Rating: ${currentListing.ageRating}

----------------------------------------
STORE LISTING LONG COPY:
----------------------------------------
${currentListing.longDescription}

----------------------------------------
AUTO PRIVACY POLICY:
----------------------------------------
${currentListing.privacyPolicy}
`;

    // Download draft text file
    const element = document.createElement("a");
    const file = new Blob([draftContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeProject?.name.toLowerCase().replace(/\s+/g, '_')}_${selectedStore.toLowerCase().replace(/\s+/g, '_')}_package.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6" id="publishing-tab">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Building className="w-6 h-6 text-emerald-400" />
          Store Publishing Copywriter & Listing Suite
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Instantly formulate compliant SEO descriptions, GDPR policies, and category indices configured for different global marketplaces.
        </p>
      </div>

      {activeProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Target market selection Column */}
          <div className="lg:col-span-4 bg-slate-900/40 rounded-2xl p-5 border border-slate-800 backdrop-blur-md h-fit space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono px-1">Channelling Target Store</p>
            {stores.map((store) => (
              <button
                key={store.name}
                onClick={() => setSelectedStore(store.name)}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 relative ${
                  selectedStore === store.name 
                    ? "bg-slate-950 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20" 
                    : "border-slate-800/80 hover:bg-slate-800/10 hover:border-slate-700"
                }`}
              >
                <span className="text-lg shrink-0">{store.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{store.name}</span>
                    {activeProject?.storeListings?.[store.name] && (
                      <span className="text-[10px] text-green-400">✓ Ready</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{store.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Result view column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main store card listing copy */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-100 flex items-center gap-2">
                    <span>{selectedStore} Meta-Structure</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Compliance boundaries: Title (max {currentLimit.limitTitle} chars) • Short (max {currentLimit.limitShort} chars)
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  {currentListing && (
                    <button
                      onClick={handleExportZip}
                      className="flex items-center gap-1 bg-emerald-600/10 hover:bg-emerald-600/25 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Package
                    </button>
                  )}
                  <button
                    onClick={handleGenerateListing}
                    disabled={isGenerating}
                    className="flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 text-slate-100 disabled:text-slate-500 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    id="btn-generate-comply-listing"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-3 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {currentListing ? "Regenerate Listing" : "Draft Store Copy"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {currentListing ? (
                <div className="space-y-4 mt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* App Title */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">App Brand Title</span>
                          <span className={`text-[10px] ${currentListing.title.length > currentLimit.limitTitle ? 'text-red-400' : 'text-slate-500'}`}>
                            {currentListing.title.length}/{currentLimit.limitTitle}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-100 mt-2">{currentListing.title}</p>
                      </div>
                      <button 
                        onClick={() => handleCopyText(currentListing.title, "title")}
                        className="mt-4 text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1"
                      >
                        {copiedSection === "title" ? <Check className="w-3" /> : <Copy className="w-3" />}
                        Copy Title
                      </button>
                    </div>

                    {/* Short Description */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Short Promotional Text</span>
                          <span className={`text-[10px] ${currentListing.shortDescription.length > currentLimit.limitShort ? 'text-red-400' : 'text-slate-500'}`}>
                            {currentListing.shortDescription.length}/{currentLimit.limitShort}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{currentListing.shortDescription}</p>
                      </div>
                      <button 
                        onClick={() => handleCopyText(currentListing.shortDescription, "short")}
                        className="mt-4 text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1"
                      >
                        {copiedSection === "short" ? <Check className="w-3" /> : <Copy className="w-3" />}
                        Copy Snippet
                      </button>
                    </div>
                  </div>

                  {/* High fidelity full description viewport */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Store Marketing Description Body</span>
                      <span className="text-[10px] text-slate-500">
                        {currentListing.longDescription.length}/{currentLimit.limitLong} chars
                      </span>
                    </div>
                    <pre className="text-xs text-slate-300 overflow-y-auto max-h-48 leading-relaxed whitespace-pre-wrap font-sans">
                      {currentListing.longDescription}
                    </pre>
                    <button 
                      onClick={() => handleCopyText(currentListing.longDescription, "long")}
                      className="text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1 pt-2"
                    >
                      {copiedSection === "long" ? <Check className="w-3" /> : <Copy className="w-3" />}
                      Copy Full Description
                    </button>
                  </div>

                  {/* Metadata labels */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                      <span className="text-[9px] font-bold text-slate-550 block font-mono">AGE CATEGORY</span>
                      <span className="text-xs font-semibold text-slate-300 mt-1 block">{currentListing.ageRating}</span>
                    </div>

                    <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900">
                      <span className="text-[9px] font-bold text-slate-550 block font-mono">EXPORT TYPE</span>
                      <span className="text-xs font-semibold text-slate-300 mt-1 block">Full metadata package</span>
                    </div>

                    <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900 col-span-2">
                      <span className="text-[9px] font-bold text-slate-550 block font-mono">TAG INDEXES</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentListing.keywords.map((k, i) => (
                          <span key={i} className="text-[9px] font-mono font-semibold text-[8px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded border border-slate-800">
                            #{k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct compliance copy layout for privacy framework requirements */}
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        Auto-Generated Privacy Policy Document
                      </span>
                    </div>
                    <pre className="text-[10px] text-slate-400 overflow-y-auto max-h-36 leading-normal whitespace-pre-wrap font-mono custom-scrollbar">
                      {currentListing.privacyPolicy}
                    </pre>
                    <button 
                      onClick={() => handleCopyText(currentListing.privacyPolicy, "policy")}
                      className="text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1 pt-2"
                    >
                      {copiedSection === "policy" ? <Check className="w-3" /> : <Copy className="w-3" />}
                      Copy Privacy Document
                    </button>
                  </div>

                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-slate-950/30 rounded-xl border border-dashed border-slate-800 mt-5">
                  <Smartphone className="w-10 h-10 text-slate-700 mb-2" />
                  <p className="text-xs text-slate-400">Listing details not prepared yet in this workspace.</p>
                  <button
                    onClick={handleGenerateListing}
                    className="mt-3 text-xs bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 px-3.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Generate {selectedStore} Draft Listing
                  </button>
                </div>
              )}
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
