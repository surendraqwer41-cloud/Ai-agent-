import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ThemeChanger(ThemeMode.dark),
      child: const AutoPublisherApp(),
    ),
  );
}

class ThemeChanger with ChangeNotifier {
  ThemeMode _themeMode;
  ThemeChanger(this._themeMode);

  ThemeMode get themeMode => _themeMode;

  void toggleTheme() {
    _themeMode = _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    notifyListeners();
  }
}

class AutoPublisherApp extends StatelessWidget {
  const AutoPublisherApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeChanger = Provider.of<ThemeChanger>(context);

    // Dark Theme Palette - Royal Purple & Indigo Space theme
    final darkTheme = ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Colors.deepPurple,
        brightness: Brightness.dark,
        primary: const Color(0xFF9F7AEA),
        secondary: const Color(0xFF319795),
        tertiary: const Color(0xFFED8936),
        surface: const Color(0xFF120E25),
        background: const Color(0xFF080612),
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        titleLarge: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        headlineMedium: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
        bodyMedium: GoogleFonts.inter(color: const Color(0xFFA0AEC0)),
      ),
      cardTheme: CardTheme(
        color: const Color(0xFF1E1639),
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0xFF2D2354), width: 1),
        ),
      ),
    );

    // Light Theme Palette - Elegant minimalist Slate theme
    final lightTheme = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: Colors.teal,
        brightness: Brightness.light,
        primary: const Color(0xFF4A5568),
        secondary: const Color(0xFF319795),
        tertiary: const Color(0xFFED8936),
        surface: Colors.white,
        background: const Color(0xFFF7FAFC),
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme).copyWith(
        titleLarge: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: const Color(0xFF2D3748),
        ),
        headlineMedium: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: const Color(0xFF1A202C),
        ),
        bodyMedium: GoogleFonts.inter(color: const Color(0xFF4A5568)),
      ),
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 2,
        shadowColor: const Color(0xFFE2E8F0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0xFFEDF2F7), width: 1),
        ),
      ),
    );

    return MaterialApp(
      title: 'Auto App Publisher AI',
      debugShowCheckedModeBanner: false,
      theme: lightTheme,
      darkTheme: darkTheme,
      themeMode: themeChanger.themeMode,
      home: const MainGatekeeper(),
    );
  }
}

class MainGatekeeper extends StatefulWidget {
  const MainGatekeeper({super.key});

  @override
  State<MainGatekeeper> createState() => _MainGatekeeperState();
}

class _MainGatekeeperState extends State<MainGatekeeper> {
  bool _showingSplash = true;

  @override
  void initState() {
    super.initState();
    _dismissSplashAfterDelay();
  }

  void _dismissSplashAfterDelay() async {
    await Future.delayed(const Duration(seconds: 3));
    if (mounted) {
      setState(() {
        _showingSplash = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 600),
      transitionBuilder: (child, animation) {
        return FadeTransition(opacity: animation, child: child);
      },
      child: _showingSplash
          ? const AppSplashScreen()
          : const WorkspaceShell(),
    );
  }
}

class AppSplashScreen extends StatelessWidget {
  const AppSplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF090714) : Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Splash Logo with Ripple Gradient Border simulation
            Container(
              width: 84,
              height: 84,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: const LinearGradient(
                  colors: [Colors.blue, Colors.purple],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.purple.withOpacity(0.3),
                    spreadRadius: 4,
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  )
                ],
              ),
              child: const Icon(
                Icons.rocket_launch_rounded,
                color: Colors.white,
                size: 42,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Auto App Publisher AI',
              style: GoogleFonts.spaceGrotesk(
                fontSize: 26,
                fontWeight: FontWeight.extrabold,
                letterSpacing: -0.5,
                color: isDark ? Colors.white : const Color(0xFF1A202C),
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Compiler & Android Assembler Systems',
              style: GoogleFonts.inter(
                fontSize: 12,
                color: colors.primary.withOpacity(0.8),
                letterSpacing: 1.5,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 48),
            SizedBox(
              width: 140,
              height: 3,
              child: LinearProgressIndicator(
                backgroundColor: colors.primary.withOpacity(0.12),
                color: colors.primary,
                borderRadius: BorderRadius.circular(5),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WorkspaceShell extends StatefulWidget {
  const WorkspaceShell({super.key});

  @override
  State<WorkspaceShell> createState() => _WorkspaceShellState();
}

class _WorkspaceShellState extends State<WorkspaceShell> {
  int _selectedIdx = 0;

  final List<String> _titles = [
    'Workspace Dashboard',
    'AI App Scaffolder',
    'APK Compile Assistant',
    'Publishing Store Listings',
  ];

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final themeChanger = Provider.of<ThemeChanger>(context, listen: false);

    // Responsive split screen configuration for layouts
    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF090714) : const Color(0xFFF7FAFC),
      appBar: AppBar(
        backgroundColor: isDark ? const Color(0xFF0F0C24).withOpacity(0.8) : Colors.white.withOpacity(0.8),
        scrolledUnderElevation: 1,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: colors.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(Icons.webhook_rounded, color: colors.primary, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Auto Publisher AI',
                    style: GoogleFonts.spaceGrotesk(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: isDark ? Colors.white : const Color(0xFF2D3748),
                    ),
                  ),
                  Text(
                    'surendraqwer41@gmail.com',
                    style: GoogleFonts.jetBrainsMono(
                      fontSize: 9,
                      color: colors.secondary,
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              size: 20,
            ),
            tooltip: 'Toggle Theme Mode',
            onPressed: () {
              themeChanger.toggleTheme();
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final isLargeScreen = constraints.maxWidth > 780;

          if (isLargeScreen) {
            return Row(
              children: [
                // Horizontal navigation rail for desktop layout
                NavigationRail(
                  backgroundColor: isDark ? const Color(0xFF0B081C) : Colors.white,
                  selectedIndex: _selectedIdx,
                  labelType: NavigationRailLabelType.none,
                  extended: true,
                  onDestinationSelected: (value) => setState(() => _selectedIdx = value),
                  destinations: const [
                    NavigationRailDestination(
                      icon: Icon(Icons.dashboard_outlined),
                      selectedIcon: Icon(Icons.dashboard_rounded),
                      label: Text('Dashboard'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.auto_awesome_outlined),
                      selectedIcon: Icon(Icons.auto_awesome_rounded),
                      label: Text('App Scaffolder'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.terminal_outlined),
                      selectedIcon: Icon(Icons.terminal_rounded),
                      label: Text('APK Builder'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.storefront_outlined),
                      selectedIcon: Icon(Icons.storefront_rounded),
                      label: Text('Store Assistant'),
                    ),
                  ],
                ),
                VerticalDivider(thickness: 1, width: 1, color: colors.outlineVariant.withOpacity(0.2)),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: _getActiveView(_selectedIdx),
                  ),
                ),
              ],
            );
          } else {
            // Adaptive Viewport with Bottom Navigation for phones
            return AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: _getActiveView(_selectedIdx),
              ),
            );
          }
        },
      ),
      bottomNavigationBar: LayoutBuilder(
        builder: (context, constraints) {
          final isLargeScreen = constraints.maxWidth > 780;
          if (isLargeScreen) return const SizedBox.shrink();
          return NavigationBar(
            backgroundColor: isDark ? const Color(0xFF0F0C24) : Colors.white,
            indicatorColor: colors.primary.withOpacity(0.15),
            selectedIndex: _selectedIdx,
            onDestinationSelected: (value) => setState(() => _selectedIdx = value),
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.dashboard_outlined),
                selectedIcon: Icon(Icons.dashboard_rounded),
                label: 'Dashboard',
              ),
              NavigationDestination(
                icon: Icon(Icons.auto_awesome_outlined),
                selectedIcon: Icon(Icons.auto_awesome_rounded),
                label: 'Scaffolder',
              ),
              NavigationDestination(
                icon: Icon(Icons.terminal_outlined),
                selectedIcon: Icon(Icons.terminal_rounded),
                label: 'Builder',
              ),
              NavigationDestination(
                icon: Icon(Icons.storefront_outlined),
                selectedIcon: Icon(Icons.storefront_rounded),
                label: 'Assistant',
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _getActiveView(int index) {
    switch (index) {
      case 0:
        return const DashboardView();
      case 1:
        return const ScaffolderView();
      case 2:
        return const BuilderLogsView();
      case 3:
        return const PlayStoreAssistantView();
      default:
        return const DashboardView();
    }
  }
}

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final styles = Theme.of(context).textTheme;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Welcome to Publisher Hub',
                      style: styles.headlineMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Target Project Sandbox: com.surendra.autopublisherai',
                      style: GoogleFonts.jetBrainsMono(fontSize: 11, color: colors.secondary),
                    ),
                  ],
                ),
              ),
              CircleAvatar(
                backgroundColor: colors.secondary.withOpacity(0.1),
                child: Icon(Icons.offline_bolt_rounded, color: colors.secondary),
              )
            ],
          ),
          const SizedBox(height: 24),

          // Bento-grid metric boxes
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 1.5,
            children: [
              _buildMetricsCard(
                context,
                title: 'Scaffolds',
                value: '04',
                icon: Icons.code,
                accentColor: Colors.violetAccent,
              ),
              _buildMetricsCard(
                context,
                title: 'Sim Builds',
                value: '18',
                icon: Icons.cloud_done_rounded,
                accentColor: Colors.tealAccent,
              ),
              _buildMetricsCard(
                context,
                title: 'Sync Pipelines',
                value: '01',
                icon: Icons.sync,
                accentColor: Colors.orangeAccent,
              ),
              _buildMetricsCard(
                context,
                title: 'Healed Bugs',
                value: '07',
                icon: Icons.bug_report,
                accentColor: Colors.deepOrangeAccent,
              ),
            ],
          ),

          const SizedBox(height: 24),
          Text(
            'Active Compiler Task status',
            style: styles.titleLarge,
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.green.withOpacity(0.12),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.check_circle_rounded, color: Colors.green),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'APK Compiler Node: Online',
                              style: styles.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                            ),
                            Text(
                              'Standard wrapper setup completed using official Gradle 8.7 resources.',
                              style: styles.bodySmall,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: Color(0xFF2D2354)),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.between,
                    children: [
                      Text(
                        'Last Sync: Today, 03:00 AM',
                        style: GoogleFonts.inter(fontSize: 11, color: Colors.grey),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Text('Refresh Node'),
                      ),
                    ],
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMetricsCard(
    BuildContext context, {
    required String title,
    required String value,
    required IconData icon,
    required Color accentColor,
  }) {
    final styles = Theme.of(context).textTheme;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.between,
              children: [
                Text(
                  title,
                  style: styles.bodySmall?.copyWith(fontSize: 12, fontWeight: FontWeight.w600),
                ),
                Icon(icon, size: 18, color: accentColor),
              ],
            ),
            Text(
              value,
              style: styles.headlineMedium?.copyWith(
                fontSize: 28,
                fontWeight: FontWeight.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ScaffolderView extends StatefulWidget {
  const ScaffolderView({super.key});

  @override
  State<ScaffolderView> createState() => _ScaffolderViewState();
}

class _ScaffolderViewState extends State<ScaffolderView> {
  final _nameController = TextEditingController(text: 'My Ultimate Utility');
  final _descController = TextEditingController(text: 'An exceptional custom helper matching user guidelines.');
  String _techStack = 'Flutter';

  @override
  void dispose() {
    _nameController.dispose();
    _descController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final styles = Theme.of(context).textTheme;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Scaffold Codebase Generator',
            style: styles.headlineMedium,
          ),
          const SizedBox(height: 6),
          Text(
            'Generate clean multiplatform code templates according to strict specifications.',
            style: styles.bodyMedium,
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Application Meta Configuration',
                    style: styles.titleLarge?.copyWith(fontSize: 18),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'App Display Name',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _descController,
                    maxLines: 2,
                    decoration: InputDecoration(
                      labelText: 'App Purpose Description',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text('Core Target Platform', style: styles.labelMedium),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      ChoiceChip(
                        label: const Text('Flutter (Latest)'),
                        selected: _techStack == 'Flutter',
                        onSelected: (val) {
                          if (val) setState(() => _techStack = 'Flutter');
                        },
                      ),
                      const SizedBox(width: 8),
                      ChoiceChip(
                        label: const Text('Kotlin Compose'),
                        selected: _techStack == 'Kotlin',
                        onSelected: (val) {
                          if (val) setState(() => _techStack = 'Kotlin');
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: colors.primary,
                        foregroundColor: colors.onPrimary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Scaffolding generated successfully for ${_nameController.text}!'),
                            backgroundColor: Colors.teal,
                          ),
                        );
                      },
                      icon: const Icon(Icons.flash_on_rounded),
                      label: const Text('Generate Source Templates'),
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}

class BuilderLogsView extends StatefulWidget {
  const BuilderLogsView({super.key});

  @override
  State<BuilderLogsView> createState() => _BuilderLogsViewState();
}

class _BuilderLogsViewState extends State<BuilderLogsView> {
  bool _isBuilding = false;
  double _progress = 0.0;
  final List<String> _logs = [];

  void _runBuildSim() async {
    if (_isBuilding) return;
    setState(() {
      _isBuilding = true;
      _progress = 0.0;
      _logs.clear();
      _logs.add('[BUILD] Starting Gradle release pipeline...');
    });

    final steps = [
      '[COMPILE] Verifying Gradle Wrapper Jar signature: Match.',
      '[COMPILE] Using distribution: URL pointing to Gradle 8.7 bin wrapper.',
      '[COMPILE] Running lint inspections... Pass.',
      '[COMPILE] :app:preBuild OK',
      '[COMPILE] :app:mergeReleaseResources - Completed successfully',
      '[COMPILE] :app:compileReleaseJavaWithJavac - Optimized JVM configurations',
      '[COMPILE] Assemble debug release artifacts...',
      '[SUCCESS] Created APK asset: auto-app-publisher-ai-release.apk',
      '[SUCCESS] Compiler pipeline terminated successfully with exit code 0.'
    ];

    for (int i = 0; i < steps.length; i++) {
      await Future.delayed(const Duration(milliseconds: 600));
      if (!mounted) return;
      setState(() {
        _progress = (i + 1) / steps.length;
        _logs.add(steps[i]);
      });
    }

    if (mounted) {
      setState(() {
        _isBuilding = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final styles = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.between,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'APK Compile Assistant',
                    style: styles.headlineMedium,
                  ),
                  Text(
                    'Simulate local SDK and JDK execution commands.',
                    style: styles.bodyMedium,
                  ),
                ],
              ),
            ),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: colors.secondary,
                foregroundColor: colors.onSecondary,
              ),
              onPressed: _isBuilding ? null : _runBuildSim,
              icon: const Icon(Icons.play_arrow_rounded),
              label: const Text('Start Build'),
            )
          ],
        ),
        const SizedBox(height: 16),
        if (_isBuilding) ...[
          LinearProgressIndicator(value: _progress, color: colors.secondary),
          const SizedBox(height: 12),
        ],
        Expanded(
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF07040E),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF221A3D)),
            ),
            child: _logs.isEmpty
                ? Center(
                    child: Text(
                      'Ready to run builder pipeline. Click "Start Build".',
                      style: GoogleFonts.jetBrainsMono(color: Colors.grey, fontSize: 13),
                    ),
                  )
                : ListView.builder(
                    itemCount: _logs.length,
                    itemBuilder: (context, i) {
                      final isSuccess = _logs[i].contains('[SUCCESS]');
                      final isError = _logs[i].contains('[ERROR]');
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 2.0),
                        child: Text(
                          _logs[i],
                          style: GoogleFonts.jetBrainsMono(
                            fontSize: 12,
                            color: isSuccess
                                ? Colors.greenAccent
                                : isError
                                    ? Colors.redAccent
                                    : Colors.blueGrey[100],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        )
      ],
    );
  }
}

class PlayStoreAssistantView extends StatefulWidget {
  const PlayStoreAssistantView({super.key});

  @override
  State<PlayStoreAssistantView> createState() => _PlayStoreAssistantViewState();
}

class _PlayStoreAssistantViewState extends State<PlayStoreAssistantView> {
  final _titleController = TextEditingController(text: 'Auto App Publisher AI');
  final _shortController = TextEditingController(text: 'Deploy, Sync, and compile Android releases dynamically.');
  final _keywordsController = TextEditingController(text: 'android, flutter, gradle, compile, compiler, play store');

  @override
  Widget build(BuildContext context) {
    final styles = Theme.of(context).textTheme;
    final colors = Theme.of(context).colorScheme;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Play Store Listing Optimizer',
            style: styles.headlineMedium,
          ),
          const SizedBox(height: 6),
          Text(
            'Draft production-compliant store metadata assets optimized for search indices.',
            style: styles.bodyMedium,
          ),
          const SizedBox(height: 20),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Listing Metadata', style: styles.titleLarge),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _titleController,
                    decoration: InputDecoration(
                      labelText: 'App Store Title',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _shortController,
                    decoration: InputDecoration(
                      labelText: 'Short Description',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _keywordsController,
                    decoration: InputDecoration(
                      labelText: 'Index Keywords (Comma separated)',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: colors.primary,
                        foregroundColor: colors.onPrimary,
                      ),
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Store listings metadata configured & persisted!'),
                            backgroundColor: Colors.teal,
                          ),
                        );
                      },
                      child: const Text('Save Listing Information'),
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
