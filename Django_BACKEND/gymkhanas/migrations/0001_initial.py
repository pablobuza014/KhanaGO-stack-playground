from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Gymkhana",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name="ID")),
                ("name", models.CharField(max_length=120, unique=True)),
                ("description", models.TextField(null=True, blank=True)),
                ("location", models.CharField(max_length=120, null=True, blank=True)),
                ("starts_at", models.DateTimeField(null=True, blank=True)),
                ("ends_at", models.DateTimeField(null=True, blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
