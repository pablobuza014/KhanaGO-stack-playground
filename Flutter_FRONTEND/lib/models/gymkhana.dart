class Gymkhana {
  final int id;
  final String name;
  final String? description;
  final String? location;
  final DateTime? startsAt;
  final DateTime? endsAt;
  final DateTime createdAt;
  final DateTime updatedAt;

  Gymkhana({
    required this.id,
    required this.name,
    this.description,
    this.location,
    this.startsAt,
    this.endsAt,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Gymkhana.fromJson(Map<String, dynamic> j) => Gymkhana(
        id: j['id'],
        name: j['name'],
        description: j['description'],
        location: j['location'],
        startsAt: j['starts_at'] != null ? DateTime.parse(j['starts_at']) : null,
        endsAt: j['ends_at'] != null ? DateTime.parse(j['ends_at']) : null,
        createdAt: DateTime.parse(j['created_at']),
        updatedAt: DateTime.parse(j['updated_at']),
      );
}
