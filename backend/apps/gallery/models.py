from django.db import models


class Album(models.Model):
    uuid = models.CharField(max_length=100, blank=True, null=True, unique=True)
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    album = models.ForeignKey(Album, related_name="images", on_delete=models.CASCADE)
    image_url = models.URLField(max_length=500)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"Image for {self.album.title}"
