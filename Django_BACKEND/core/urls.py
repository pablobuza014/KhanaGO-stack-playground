from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import GymkhanaViewSet, hello_world, gymkhana_create_mock, read_item

router = DefaultRouter()
router.register(r"gymkhanas", GymkhanaViewSet, basename="gymkhana")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", hello_world, name="root"),
    path("gymkhana/create", gymkhana_create_mock, name="gymkhana_create"),
    path("items/<int:item_id>", read_item, name="read_item"),
    path("api/", include(router.urls)),
]
