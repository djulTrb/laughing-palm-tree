from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/resources/",   include("apps.resources.urls")),
    path("api/recruitment/", include("apps.recruitment.urls")),
    path("api/contact/",     include("apps.contact.urls")),
    path("api/gallery/",     include("apps.gallery.urls")),
    path("api/events/",      include("apps.events.urls")),
    path("api/team/",        include("apps.team.urls")),
    path("api/website/",     include("apps.website.urls")),
    path("api/accounts/",    include("apps.accounts.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
