from django.contrib import admin
from .models import Gymkhana

@admin.register(Gymkhana)
class GymkhanaAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location", "starts_at", "ends_at", "created_at")
    search_fields = ("name", "location")
    ordering = ("-created_at",)
