from django.db import models


class Resource(models.Model):
    CATEGORY_CHOICES = [
        ("pdf",           "PDF"),
        ("support_cours", "Support de cours"),
        ("tutoriel",      "Tutoriel"),
        ("presentation",  "Présentation"),
        ("lien_utile",    "Lien utile"),
    ]

    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)
    titre       = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    categorie   = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="pdf")
    fichier_url = models.URLField(max_length=500, blank=True)
    evenement   = models.PositiveIntegerField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.titre
