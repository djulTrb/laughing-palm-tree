from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Candidature, RecruitmentSettings
from .serializers import (
    CandidaturePublicSerializer,
    CandidatureAdminSerializer,
    RecruitmentSettingsSerializer,
)


class RecruitmentSettingsView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        settings = RecruitmentSettings.get()
        return Response(RecruitmentSettingsSerializer(settings).data)


    def patch(self, request):
        return self.put(request)

    def put(self, request):
        settings = RecruitmentSettings.get()
        serializer = RecruitmentSettingsSerializer(settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CandidatureViewSet(viewsets.ModelViewSet):
    filter_backends  = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["statut", "niveau_etude"]
    search_fields    = ["prenom", "nom", "email", "departement"]
    ordering         = ["-date_candidature"]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Candidature.objects.all()
        return Candidature.objects.none()

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return CandidatureAdminSerializer
        return CandidaturePublicSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        settings = RecruitmentSettings.get()
        phase = RecruitmentSettingsSerializer(settings).data["phase"]
        if phase != "ouvert":
            msg = {
                "ferme":       "Les candidatures sont actuellement fermées.",
                "non_demarre": "Les candidatures ne sont pas encore ouvertes.",
            }
            return Response({"detail": msg.get(phase, "Indisponible.")}, status=status.HTTP_403_FORBIDDEN)

        serializer = CandidaturePublicSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["patch"], url_path="statut")
    def update_statut(self, request, pk=None):
        candidature = self.get_object()
        new_statut = request.data.get("statut")
        
        # update status
        serializer = CandidatureAdminSerializer(candidature, data={"statut": new_statut}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # If accepted and is actif, add to Member table
        if new_statut == 'accepte' and candidature.type_candidature == 'actif':
            from apps.team.models import Member
            import uuid
            # Ensure not already added (basic check on email/github if available, or just add)
            # We'll just create a new Member
            Member.objects.get_or_create(
                nom=candidature.nom,
                prenom=candidature.prenom,
                defaults={
                    'poste': 'Active Member',
                    'skills': candidature.competences or '',
                    'linkedin': candidature.linkedin_url or '',
                    'github': candidature.github_url or '',
                    'uuid': str(uuid.uuid4())
                }
            )

        return Response(serializer.data)
