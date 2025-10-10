from django.db import models

class Gymkhana(models.Model):
    name = models.CharField(max_length=120, unique=True, db_index=True)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=120, blank=True, null=True)
    starts_at = models.DateTimeField(blank=True, null=True)
    ends_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # = func.now()
    updated_at = models.DateTimeField(auto_now=True)      # = onupdate

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
