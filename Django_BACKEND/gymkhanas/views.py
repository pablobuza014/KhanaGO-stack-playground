# gymkhanas/views.py

from rest_framework import viewsets
from .models import Gymkhana
from .serializers import GymkhanaSerializer

class GymkhanaViewSet(viewsets.ModelViewSet):
    queryset = Gymkhana.objects.all()
    serializer_class = GymkhanaSerializer
