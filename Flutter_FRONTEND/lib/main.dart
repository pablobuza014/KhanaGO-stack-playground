// lib/main.dart

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
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.indigo),
      home: const GymkhanaPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class GymkhanaPage extends StatefulWidget {
  const GymkhanaPage({super.key});
  @override
  State<GymkhanaPage> createState() => _GymkhanaPageState();
}

class _GymkhanaPageState extends State<GymkhanaPage> {
  final api = Api();

  final _name = TextEditingController();
  final _desc = TextEditingController();
  final _loc = TextEditingController();

  bool _loading = false;
  List<Gymkhana> _items = [];

  // si es null → modo crear
  Gymkhana? _editing;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final data = await api.list();
      setState(() => _items = data);
    } finally {
      setState(() => _loading = false);
    }
  }

  void _resetForm() {
    _name.clear();
    _desc.clear();
    _loc.clear();
    setState(() => _editing = null);
  }

  Future<void> _submit() async {
    if (_name.text.trim().isEmpty) return;
    if (_editing == null) {
      // CREATE
      await api.create(
        name: _name.text.trim(),
        description: _desc.text.trim().isEmpty ? null : _desc.text.trim(),
        location: _loc.text.trim().isEmpty ? null : _loc.text.trim(),
      );
    } else {
      // UPDATE
      await api.update(
        _editing!.id,
        name: _name.text.trim(),
        description: _desc.text.trim().isEmpty ? null : _desc.text.trim(),
        location: _loc.text.trim().isEmpty ? null : _loc.text.trim(),
      );
    }
    _resetForm();
    _load();
  }

  // DELETE
  Future<void> _delete(Gymkhana g) async {
    await api.delete(g.id);
    _load();
  }

  void _startEdit(Gymkhana g) {
    _name.text = g.name;
    _desc.text = g.description ?? '';
    _loc.text = g.location ?? '';
    setState(() => _editing = g);
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = _editing != null;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Gymkhanas'),
        actions: [
          IconButton(onPressed: _load, icon: const Icon(Icons.refresh)),
        ],
      ),
      body: Column(
        children: [
          // FORM
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                TextField(
                  controller: _name,
                  decoration: const InputDecoration(labelText: 'Nombre *'),
                ),
                const SizedBox(height: 6),
                TextField(
                  controller: _desc,
                  decoration: const InputDecoration(labelText: 'Descripción'),
                ),
                const SizedBox(height: 6),
                TextField(
                  controller: _loc,
                  decoration: const InputDecoration(labelText: 'Ubicación'),
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: FilledButton(
                        onPressed: _submit,
                        child: Text(isEditing ? 'Guardar cambios' : 'Crear'),
                      ),
                    ),
                    if (isEditing) ...[
                      const SizedBox(width: 8),
                      TextButton(
                        onPressed: _resetForm,
                        child: const Text('Cancelar'),
                      ),
                    ]
                  ],
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          // LIST
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : _items.isEmpty
                    ? const Center(child: Text('Sin registros'))
                    : ListView.separated(
                        itemCount: _items.length,
                        separatorBuilder: (_, __) => const Divider(height: 1),
                        itemBuilder: (ctx, i) {
                          final g = _items[i];
                          return ListTile(
                            leading: Text('#${g.id}'),
                            title: Text(g.name),
                            subtitle: Text(g.location ?? g.description ?? '—'),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  icon: const Icon(Icons.edit),
                                  onPressed: () => _startEdit(g),
                                ),
                                IconButton(
                                  icon: const Icon(Icons.delete,
                                      color: Colors.red),
                                  onPressed: () => _delete(g),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
