import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support JSON parsing
  app.use(express.json());

  // API Route: Generate Codebase app scaffolding templates
  app.post("/api/generate-app", (req, res) => {
    const { appName, appDescription, appTheme, platform } = req.body;
    const nameSlug = (appName || "app").toLowerCase().replace(/[^a-z0-9]/g, "_");

    if (platform === "Android Native Kotlin") {
      res.json({
        appStructure: {
          overview: `Kotlin Jetpack Compose Android application optimized for ${appTheme || "Ocean Blue"} theme configurations.`,
          files: [
            { path: "build.gradle.kts", language: "kotlin" },
            { path: "app/build.gradle.kts", language: "kotlin" },
            { path: "app/src/main/java/com/example/MainActivity.kt", language: "kotlin" },
            { path: "app/src/main/AndroidManifest.xml", language: "xml" }
          ]
        },
        codeSnippets: {
          "build.gradle.kts": `// Root-level grade build configurations\nplugins {\n    alias(libs.plugins.android.application) apply false\n    alias(libs.plugins.kotlin.android) apply false\n}`,
          "app/build.gradle.kts": `plugins {\n    id("com.android.application")\n    id("kotlin-android")\n}\n\nandroid {\n    namespace = "com.example.${nameSlug}"\n    compileSdk = 34\n\n    defaultConfig {\n        applicationId = "com.example.${nameSlug}"\n        minSdk = 24\n        targetSdk = 34\n        versionCode = 1\n        versionName = "1.0.0"\n    }\n}`,
          "app/src/main/java/com/example/MainActivity.kt": `package com.example.${nameSlug}\n\nimport android.os.Bundle\nimport androidx.activity.ComponentActivity\nimport androidx.activity.compose.setContent\nimport androidx.compose.foundation.layout.*\nimport androidx.compose.material3.*\nimport androidx.compose.runtime.*\nimport androidx.compose.ui.Alignment\nimport androidx.compose.ui.Modifier\nimport androidx.compose.ui.text.style.TextAlign\nimport androidx.compose.ui.unit.dp\n\nclass MainActivity : ComponentActivity() {\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContent {\n            MaterialTheme {\n                Surface(\n                    modifier = Modifier.fillMaxSize(),\n                    color = MaterialTheme.colorScheme.background\n                ) {\n                    AppContent()\n                }\n            } \n        }\n    }\n}\n\n@Composable\nfun AppContent() {\n    var counter by remember { mutableStateOf(0) }\n    Column(\n        modifier = Modifier.fillMaxSize().padding(24.dp),\n        horizontalAlignment = Alignment.CenterHorizontally,\n        verticalArrangement = Arrangement.Center\n    ) {\n        Text(\n            text = "${appName}",\n            style = MaterialTheme.typography.headlineLarge,\n            textAlign = TextAlign.Center\n        )\n        Spacer(modifier = Modifier.height(11.dp))\n        Text(\n            text = "${appDescription}",\n            style = MaterialTheme.typography.bodyMedium,\n            textAlign = TextAlign.Center\n        )\n        Spacer(modifier = Modifier.height(24.dp))\n        Button(onClick = { counter++ }) {\n            Text("Action Counter: $counter")\n        }\n    }\n}`,
          "app/src/main/AndroidManifest.xml": `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n    <application\n        android:allowBackup="true"\n        android:label="${appName}"\n        android:theme="@style/Theme.AppCompat">\n        <activity\n            android:name=".MainActivity"\n            android:exported="true">\n            <intent-filter>\n                <action android:name="android.intent.action.MAIN" />\n                <category android:name="android.intent.category.LAUNCHER" />\n            </intent-filter>\n        </activity>\n    </application>\n</manifest>`
        }
      });
    } else {
      // Default fallback is Flutter SDK
      res.json({
        appStructure: {
          overview: `Flutter SDK Mobile codebase matching user specification guidelines for design layout with ${appTheme || "Ocean Blue"} visual theme constraints.`,
          files: [
            { path: "pubspec.yaml", language: "yaml" },
            { path: "lib/main.dart", language: "dart" },
            { path: "lib/home_screen.dart", language: "dart" },
            { path: "android/app/build.gradle", language: "gradle" }
          ]
        },
        codeSnippets: {
          "pubspec.yaml": `name: ${nameSlug}\ndescription: ${appDescription}\nversion: 1.0.0+1\n\nenvironment:\n  sdk: ">=3.0.0 <4.0.0"\n\ndependencies:\n  flutter:\n    sdk: flutter\n  provider: ^6.1.1\n  shared_preferences: ^2.2.2`,
          "lib/main.dart": `import 'package:flutter/material.dart';\nimport 'home_screen.dart';\n\nvoid main() => runApp(const MyApp());\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp( \n      title: '${appName}',\n      theme: ThemeData.dark(useMaterial3: true),\n      home: const HomeScreen(),\n    );\n  }\n}`,
          "lib/home_screen.dart": `import 'package:flutter/material.dart';\n\nclass HomeScreen extends StatefulWidget {\n  const HomeScreen({super.key});\n  @override\n  State<HomeScreen> createState() => _HomeScreenState();\n}\n\nclass _HomeScreenState extends State<HomeScreen> {\n  int _counter = 0;\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('${appName}'), centerTitle: true),\n      body: Center(\n        child: Padding(\n          padding: const EdgeInsets.all(24.0),\n          child: Column(\n            mainAxisAlignment: MainAxisAlignment.center,\n            children: [\n              const Icon(Icons.stars, size: 64, color: Colors.purpleAccent),\n              const SizedBox(height: 16),\n              Text('${appName}', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),\n              const SizedBox(height: 12),\n              Text('${appDescription}', textAlign: TextAlign.center, style: const TextStyle(color: Colors.grey)),\n              const SizedBox(height: 32),\n              ElevatedButton( \n                onPressed: () => setState(() => _counter++),\n                child: Text('Action Counter: \$_counter'),\n              )\n            ],\n          ),\n        ),\n      ),\n    );\n  }\n}`,
          "android/app/build.gradle": `plugins {\n    id "com.android.application"\n    id "kotlin-android"\n    id "dev.flutter.flutter-gradle-plugin"\n}\n\nandroid {\n    namespace "com.example.${nameSlug}"\n    compileSdk 34\n    defaultConfig {\n        applicationId "com.example.${nameSlug}"\n        minSdk 21\n        targetSdk 34\n        versionCode 1\n        versionName "1.0.0"\n    }\n}`
        }
      });
    }
  });

  // API Route: Simulate builds
  app.post("/api/simulate-build", (req, res) => {
    const { appName, platform, buildType } = req.body;
    const cleanName = (appName || "app").toLowerCase().replace(/[^a-z0-9]/g, "_");
    const ext = buildType === "AAB" ? "aab" : "apk";
    const fileName = `${cleanName}_release_v1_00.${ext}`;
    
    const size = buildType === "AAB" ? "12.4 MB" : "18.6 MB";
    const buildCompletedAt = new Date().toISOString().replace("T", " ").substring(0, 16);

    const logs = [
      `[BUILD] Starting Android assembler compile pipeline for workspace: ${appName}`,
      `[BUILD] Platform environment configured for ${platform || "Flutter"}`,
      `[COMPILE] Running lint inspections... Pass.`,
      `[COMPILE] Executing gradlew assembleRelease task...`,
      `[COMPILE] :app:preBuild OK`,
      `[COMPILE] :app:mergeReleaseResources - Completed 144 items`,
      `[COMPILE] :app:compileReleaseJavaWithJavac - Optimized JVM instructions`,
      `[COMPILE] :app:bundleReleaseClassesToDex - Compiled Dalvik executable streams`,
      `[BUILD] Compiling code definitions and structural bindings into target binary...`,
      `[BUILD] Applying keystore digital signature: SHA256withRSA certificates verified.`,
      `[SUCCESS] Generated production asset: /build/outputs/${ext}/${fileName}`,
      `[SUCCESS] Compiler pipeline terminated successfully with exit code 0.`
    ];

    res.json({
      logs,
      fileName,
      size,
      buildCompletedAt
    });
  });

  // API Route: Generate compliant store listing content
  app.post("/api/generate-listing", (req, res) => {
    const { appName, appDescription, platform, storeType } = req.body;
    
    const formattedDate = new Date().toLocaleDateString();
    
    res.json({
      title: `${appName}: Pro Edition`,
      shortDescription: `Experience the state-of-the-art utility features of ${appName} styled with high-performance logic.`,
      longDescription: `Welcome to ${appName} - a game-changing addition to your digital utility ecosystem, fully built to support active tasks.\n\nKey features:\n- Built targeting robust responsiveness.\n- Interactive viewports configured for multiple form-factors.\n- Optimized for resource saving and low overhead footprint.\n- Designed on modern ${platform || "Flutter"} frameworks to ensure speed & versatility.\n\nElevate your workflow with ${appName} today!`,
      keywords: [
        (appName || "app").toLowerCase().replace(/\s+/g, ""),
        "android",
        "utility",
        "custom",
        "pro"
      ],
      ageRating: "PEGI 3 (Suitable for all ages)",
      privacyPolicy: `PRIVACY POLICY FOR ${appName.toUpperCase()}\nLast updated: ${formattedDate}\n\n1. Overview\nWe value your trust and security. This Application (${appName}) acts fully as an offline-first container.\n\n2. Data Collection\nOur utility system does NOT collect, stream, or distribute private user coordinates, background data, or external file indices.\n\n3. Compliance\nThis framework has been reviewed to comply fully with major developer policies.`
    });
  });

  // API Route: Diagnose compiler error issues
  app.post("/api/diagnose-error", (req, res) => {
    const { errorCode, platform, logContent } = req.body;

    if (errorCode === "gradle") {
      res.json({
        targetFile: "android/app/build.gradle",
        summary: "The project build.gradle script is referencing 'compileSuccessfully()' which is a non-existent or deprecated Gradle DSL configuration method, alongside a restrictive kotlin-gradle-plugin:1.8.0 boundary.",
        fixingSteps: [
          "Downgrade build.gradle dependency scope to safe compile-level wrappers.",
          "Upgrade root project kotlin-version property definition bounds to '1.9.0' or greater.",
          "Refresh system task configuration memory rules."
        ],
        generatedCode: `// AUTOMATIC AI REPAIR PATCH\nbuildscript {\n    ext.kotlin_version = '1.9.10'\n    dependencies {\n        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"\n    }\n}\n\nallprojects {\n    repositories {\n        google()\n        mavenCentral()\n    }\n}`
      });
    } else {
      res.json({
        targetFile: "pubspec.yaml",
        summary: "A dependency version mismatch was detected. Component 'provider' requested version '^12.0.0' which exceeds current index registries of maximum supported '6.1.1'.",
        fixingSteps: [
          "Reset package declaration bounds down from major index ^12.0.0 to ^6.1.1.",
          "Clear offline resolution cache lock entries.",
          "Execute flutter pub upgrade --offline to align runtime definitions."
        ],
        generatedCode: `# AUTOMATIC DEPENDENCY REPAIR PATCH\nname: zen_breath\ndescription: A premium elegant breathing timer.\n\nenvironment:\n  sdk: ">=3.0.0 <4.0.0"\n\ndependencies:\n  flutter:\n    sdk: flutter\n  provider: ^6.1.1\n  shared_preferences: ^2.2.2`
      });
    }
  });

  // Serve static assets and bind development Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
