from rest_framework import serializers
from .models import Gymkhana

class GymkhanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gymkhana
        fields = [
            "id",
            "name",
            "description",
            "location",
            "created_at",
            "updated_at",
        ]
