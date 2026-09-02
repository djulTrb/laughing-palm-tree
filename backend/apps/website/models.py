from django.db import models


class WebsiteSettings(models.Model):
    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)
    logo_url        = models.URLField(max_length=500, blank=True)
    slogan          = models.CharField(max_length=255, blank=True)
    description     = models.TextField(blank=True)
    photo_couverture_url = models.URLField(max_length=500, blank=True)
    email           = models.EmailField(blank=True)
    instagram       = models.URLField(max_length=500, blank=True)
    facebook        = models.URLField(max_length=500, blank=True)
    linkedin        = models.URLField(max_length=500, blank=True)
    github          = models.URLField(max_length=500, blank=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Paramètres du site"
        verbose_name_plural = "Paramètres du site"

    def __str__(self):
        return "Paramètres du site"

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
