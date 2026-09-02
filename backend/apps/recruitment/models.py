from django.db import models


class RecruitmentSettings(models.Model):
    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)
    recrutements_ouverts        = models.BooleanField(default=False)
    date_ouverture_candidatures = models.DateField(null=True, blank=True)
    date_limite_candidatures    = models.DateField(null=True, blank=True)
    updated_at                  = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Paramètres recrutement"
        verbose_name_plural = "Paramètres recrutement"

    def __str__(self):
        return "Paramètres recrutement"

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Candidature(models.Model):
    NIVEAU_CHOICES = [
        ("Licence 1", "Licence 1"),
        ("Licence 2", "Licence 2"),
        ("Licence 3", "Licence 3"),
        ("Master 1",  "Master 1"),
        ("Master 2",  "Master 2"),
        ("Doctorat",  "Doctorat"),
    ]
    STATUT_CHOICES = [
        ("en_attente", "En attente"),
        ("accepte",    "Accepté"),
        ("refuse",     "Refusé"),
    ]

    prenom           = models.CharField(max_length=100)
    nom              = models.CharField(max_length=100)
    email            = models.EmailField()
    telephone        = models.CharField(max_length=20)
    niveau_etude     = models.CharField(max_length=20, choices=NIVEAU_CHOICES)
    departement      = models.CharField(max_length=150)
    motivation       = models.TextField()
    statut           = models.CharField(max_length=20, choices=STATUT_CHOICES, default="en_attente")
    date_candidature = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date_candidature"]

    def __str__(self):
        return f"{self.prenom} {self.nom} — {self.statut}"
