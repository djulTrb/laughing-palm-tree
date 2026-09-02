from datetime import date
from rest_framework import serializers
from .models import Candidature, RecruitmentSettings


class RecruitmentSettingsSerializer(serializers.ModelSerializer):
    phase = serializers.SerializerMethodField()

    class Meta:
        model = RecruitmentSettings
        fields = ["recrutements_ouverts", "date_ouverture_candidatures",
                  "date_limite_candidatures", "phase", "updated_at"]
        read_only_fields = ["phase", "updated_at"]

    def get_phase(self, obj):
        if not obj.recrutements_ouverts:
            return "ferme"
        today = date.today()
        if obj.date_ouverture_candidatures and today < obj.date_ouverture_candidatures:
            return "non_demarre"
        if obj.date_limite_candidatures and today > obj.date_limite_candidatures:
            return "ferme"
        return "ouvert"


class CandidaturePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidature
        fields = ["id", "type_candidature", "prenom", "nom", "email", "telephone",
                  "niveau_etude", "departement", "motivation", 
                  "github_url", "linkedin_url", "portfolio_url", "competences", "experience",
                  "date_candidature"]
        read_only_fields = ["id", "date_candidature"]

    def validate_email(self, value):
        if Candidature.objects.filter(email=value).exists():
            raise serializers.ValidationError("Une candidature existe déjà avec cet email.")
        return value


class CandidatureAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidature
        fields = ["id", "type_candidature", "prenom", "nom", "email", "telephone", "niveau_etude",
                  "departement", "motivation", "github_url", "linkedin_url", "portfolio_url", "competences", "experience", "statut", "date_candidature", "updated_at"]
        read_only_fields = ["id", "date_candidature", "updated_at"]
