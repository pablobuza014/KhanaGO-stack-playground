from typing import Optional
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Gymkhana
from .serializers import GymkhanaSerializer

@api_view(["GET"])
def hello_world(request):
    return Response({"Hello": "World"})

@api_view(["GET"])
def gymkhana_create_mock(request):
    return Response({"GymkhanaName": "gymkhana1", "Description": "This is a test gymkhana"})

@api_view(["GET"])
def read_item(request, item_id: int):
    q: Optional[str] = request.query_params.get("q")
    return Response({"item_id": item_id, "q": q})

class GymkhanaViewSet(viewsets.ModelViewSet):
    queryset = Gymkhana.objects.all()
    serializer_class = GymkhanaSerializer

    # GET /api/gymkhanas/?q=texto&skip=0&limit=50
    def list(self, request, *args, **kwargs):
        q = request.query_params.get("q")
        skip = int(request.query_params.get("skip", 0))
        limit = min(int(request.query_params.get("limit", 50)), 100)
        qs = self.get_queryset()
        if q:
            qs = qs.filter(Q(name__icontains=q) | Q(location__icontains=q))
        page = qs[skip: skip + limit]
        serializer = self.get_serializer(page, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
