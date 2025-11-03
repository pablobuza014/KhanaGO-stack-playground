// lib/models/gymkhana.dart

class Gymkhana {
  final int id;
  final String name;
  final String? description;
  final String? location;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Gymkhana({
    required this.id,
    required this.name,
    this.description,
    this.location,
    this.createdAt,
    this.updatedAt,
  });

  factory Gymkhana.fromJson(Map<String, dynamic> j) => Gymkhana(
        id: j['id'] as int,
        name: (j['name'] ?? '') as String,
        description: j['description'] as String?,
        location: j['location'] as String?,
        createdAt:
            j['created_at'] != null ? DateTime.parse(j['created_at']) : null,
        updatedAt:
            j['updated_at'] != null ? DateTime.parse(j['updated_at']) : null,
      );
}
