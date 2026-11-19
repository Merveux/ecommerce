
from django.urls import path
from store.views import get_products, get_categories

urlpatterns = [
    path('products/', get_products, name='products'),
    path('categories/', get_categories, name='categories'),
]
