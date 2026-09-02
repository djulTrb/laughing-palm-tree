from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ["id", "prenom", "nom", "poste", "uuid", "skills",
                  "linkedin", "github", "photo_url", "ordre_affichage",
                  "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
