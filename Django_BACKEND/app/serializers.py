from rest_framework import serializers
from .models import Gymkhana

class GymkhanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gymkhana
        fields = [
            "id", "name", "description", "location",
            "starts_at", "ends_at", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
