import 'package:flutter/material.dart';
import 'services/api.dart';
import 'models/gymkhana.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gymkhanas',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
      home: const HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final api = Api();
  late Future<List<Gymkhana>> _future;
  final _name = TextEditingController();
  final _desc = TextEditingController();
  final _loc  = TextEditingController();

  @override
  void initState() {
    super.initState();
    _future = api.list();
  }

  void _reload() => setState(() => _future = api.list());

  Future<void> _create() async {
    if (_name.text.trim().isEmpty) return;
    await api.create(
      name: _name.text.trim(),
      description: _desc.text.trim().isEmpty ? null : _desc.text.trim(),
      location: _loc.text.trim().isEmpty ? null : _loc.text.trim(),
    );
    _name.clear(); _desc.clear(); _loc.clear();
    _reload();
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Gymkhana creada')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gymkhanas'),
        actions: [IconButton(onPressed: _reload, icon: const Icon(Icons.refresh))],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                TextField(controller: _name, decoration: const InputDecoration(labelText: 'Nombre *')),
                const SizedBox(height: 8),
                TextField(controller: _desc, decoration: const InputDecoration(labelText: 'Descripción')),
                const SizedBox(height: 8),
                TextField(controller: _loc,  decoration: const InputDecoration(labelText: 'Ubicación')),
                const SizedBox(height: 8),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton(onPressed: _create, child: const Text('Crear')),
                ),
              ],
            ),
          ),
          const Divider(),
          Expanded(
            child: FutureBuilder<List<Gymkhana>>(
              future: _future,
              builder: (c, s) {
                if (s.connectionState != ConnectionState.done) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (s.hasError) {
                  return Center(child: Text('Error: ${s.error}'));
                }
                final items = s.data ?? [];
                if (items.isEmpty) return const Center(child: Text('Sin registros'));
                return ListView.builder(
                  itemCount: items.length,
                  itemBuilder: (_, i) {
                    final g = items[i];
                    return Dismissible(
                      key: ValueKey(g.id),
                      background: Container(color: Colors.red),
                      onDismissed: (_) async {
                        await api.delete(g.id);
                        _reload();
                      },
                      child: ListTile(
                        title: Text(g.name),
                        subtitle: Text(g.location ?? g.description ?? '-'),
                        trailing: Text('#${g.id}'),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
