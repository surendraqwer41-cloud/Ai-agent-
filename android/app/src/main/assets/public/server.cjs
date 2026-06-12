"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
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
          "build.gradle.kts": `// Root-level grade build configurations
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}`,
          "app/build.gradle.kts": `plugins {
    id("com.android.application")
    id("kotlin-android")
}

android {
    namespace = "com.example.${nameSlug}"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.${nameSlug}"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }
}`,
          "app/src/main/java/com/example/MainActivity.kt": `package com.example.${nameSlug}

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppContent()
                }
            } 
        }
    }
}

@Composable
fun AppContent() {
    var counter by remember { mutableStateOf(0) }
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "${appName}",
            style = MaterialTheme.typography.headlineLarge,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(11.dp))
        Text(
            text = "${appDescription}",
            style = MaterialTheme.typography.bodyMedium,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(onClick = { counter++ }) {
            Text("Action Counter: $counter")
        }
    }
}`,
          "app/src/main/AndroidManifest.xml": `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:label="${appName}"
        android:theme="@style/Theme.AppCompat">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
        }
      });
    } else {
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
          "pubspec.yaml": `name: ${nameSlug}
description: ${appDescription}
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  shared_preferences: ^2.2.2`,
          "lib/main.dart": `import 'package:flutter/material.dart';
import 'home_screen.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp( 
      title: '${appName}',
      theme: ThemeData.dark(useMaterial3: true),
      home: const HomeScreen(),
    );
  }
}`,
          "lib/home_screen.dart": `import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _counter = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('${appName}'), centerTitle: true),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.stars, size: 64, color: Colors.purpleAccent),
              const SizedBox(height: 16),
              Text('${appName}', style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              Text('${appDescription}', textAlign: TextAlign.center, style: const TextStyle(color: Colors.grey)),
              const SizedBox(height: 32),
              ElevatedButton( 
                onPressed: () => setState(() => _counter++),
                child: Text('Action Counter: $_counter'),
              )
            ],
          ),
        ),
      ),
    );
  }
}`,
          "android/app/build.gradle": `plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}

android {
    namespace "com.example.${nameSlug}"
    compileSdk 34
    defaultConfig {
        applicationId "com.example.${nameSlug}"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
}`
        }
      });
    }
  });
  app.post("/api/simulate-build", (req, res) => {
    const { appName, platform, buildType } = req.body;
    const cleanName = (appName || "app").toLowerCase().replace(/[^a-z0-9]/g, "_");
    const ext = buildType === "AAB" ? "aab" : "apk";
    const fileName = `${cleanName}_release_v1_00.${ext}`;
    const size = buildType === "AAB" ? "12.4 MB" : "18.6 MB";
    const buildCompletedAt = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 16);
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
  app.post("/api/generate-listing", (req, res) => {
    const { appName, appDescription, platform, storeType } = req.body;
    const formattedDate = (/* @__PURE__ */ new Date()).toLocaleDateString();
    res.json({
      title: `${appName}: Pro Edition`,
      shortDescription: `Experience the state-of-the-art utility features of ${appName} styled with high-performance logic.`,
      longDescription: `Welcome to ${appName} - a game-changing addition to your digital utility ecosystem, fully built to support active tasks.

Key features:
- Built targeting robust responsiveness.
- Interactive viewports configured for multiple form-factors.
- Optimized for resource saving and low overhead footprint.
- Designed on modern ${platform || "Flutter"} frameworks to ensure speed & versatility.

Elevate your workflow with ${appName} today!`,
      keywords: [
        (appName || "app").toLowerCase().replace(/\s+/g, ""),
        "android",
        "utility",
        "custom",
        "pro"
      ],
      ageRating: "PEGI 3 (Suitable for all ages)",
      privacyPolicy: `PRIVACY POLICY FOR ${appName.toUpperCase()}
Last updated: ${formattedDate}

1. Overview
We value your trust and security. This Application (${appName}) acts fully as an offline-first container.

2. Data Collection
Our utility system does NOT collect, stream, or distribute private user coordinates, background data, or external file indices.

3. Compliance
This framework has been reviewed to comply fully with major developer policies.`
    });
  });
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
        generatedCode: `// AUTOMATIC AI REPAIR PATCH
buildscript {
    ext.kotlin_version = '1.9.10'
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}`
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
        generatedCode: `# AUTOMATIC DEPENDENCY REPAIR PATCH
name: zen_breath
description: A premium elegant breathing timer.

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  shared_preferences: ^2.2.2`
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
