from rest_framework.routers import DefaultRouter
from .views import GymkhanaViewSet

router = DefaultRouter()
router.register(r"gymkhanas", GymkhanaViewSet, basename="gymkhana")

urlpatterns = router.urls
