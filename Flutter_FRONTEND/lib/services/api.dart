import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config.dart';
import '../models/gymkhana.dart';

class Api {
  final _base = Config.baseUrl;

  Uri _u(String path, [Map<String, String>? q]) =>
      Uri.parse("$_base$path").replace(queryParameters: q);

  Future<List<Gymkhana>> list({String? q}) async {
    final resp = await http.get(_u('/gymkhanas', q != null ? {'q': q} : null));
    if (resp.statusCode != 200) throw Exception(resp.body);
    final List data = jsonDecode(resp.body);
    return data.map((e) => Gymkhana.fromJson(e)).toList();
  }

  Future<Gymkhana> create({
    required String name,
    String? description,
    String? location,
  }) async {
    final resp = await http.post(
      _u('/gymkhanas'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'name': name,
        'description': description,
        'location': location,
      }),
    );
    if (resp.statusCode != 201) throw Exception(resp.body);
    return Gymkhana.fromJson(jsonDecode(resp.body));
  }

  Future<void> delete(int id) async {
    final resp = await http.delete(_u('/gymkhanas/$id'));
    if (resp.statusCode != 204) throw Exception(resp.body);
  }
}
