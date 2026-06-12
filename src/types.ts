export interface StoreListing {
  title: string;
  shortDescription: string;
  longDescription: string;
  keywords: string[];
  ageRating: string;
  privacyPolicy: string;
}

export interface BuildAsset {
  id: string;
  type: "APK" | "AAB";
  fileName: string;
  size: string;
  createdAt: string;
  version: string;
}

export interface AppFolderStructure {
  overview: string;
  files: {
    path: string;
    language: string;
  }[];
}

export interface AppProject {
  id: string;
  name: string;
  description: string;
  theme: string;
  platform: "Flutter" | "Android Native Kotlin" | "React Native" | "Kotlin" | "Java";
  status: "Draft" | "Generated" | "Building" | "Failed" | "Succeeded" | "Error" | "Built";
  assets?: any;
  codeStructure?: AppFolderStructure;
  codeSnippets?: Record<string, string>;
  buildLogs?: string[];
  builds?: BuildAsset[];
  storeListings?: Record<string, StoreListing>;
  githubRepo?: {
    owner: string;
    repoName: string;
    pushedAt: string;
    url: string;
    releases: string[];
  };
}
