pluginManagement {
    val flutterSdkPath = providers.gradleProperty("flutter.sdk").orElse("").get()
    
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

plugins {
    id("dev.flutter.flutter-gradle-plugin") version "1.0.0" apply false
    id("com.android.application") version "8.2.1" apply false
    id("org.jetbrains.kotlin.android") version "1.9.22" apply false
}

include(":app")

val flutterSdkPath = providers.gradleProperty("flutter.sdk").getOrNull()
if (flutterSdkPath != null) {
    apply(from = "$flutterSdkPath/packages/flutter_tools/gradle/app_plugin_loader.gradle")
}
