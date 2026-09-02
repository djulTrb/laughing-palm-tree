from django.db import models


class Event(models.Model):
    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)
    titre = models.CharField(max_length=200)
    snippet = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    details = models.TextField(blank=True)

    date = models.DateField()
    heure = models.TimeField(null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)

    lieu = models.CharField(max_length=255)

    photo = models.ImageField(blank=True, null=True)
    photo_url = models.URLField(max_length=500, blank=True) # Adding photo_url to match other models
    lien = models.URLField(blank=True)

    def __str__(self):
        return self.titre