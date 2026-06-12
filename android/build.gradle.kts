// Root-level build configuration using Kotlin DSL
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir = layout.buildDirectory.dir("../../build")
rootProject.layout.buildDirectory.set(newBuildDir)

subprojects {
    val subprojectBuildDir = rootProject.layout.buildDirectory.dir(project.name)
    project.layout.buildDirectory.set(subprojectBuildDir)
}

subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
