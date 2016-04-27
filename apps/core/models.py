from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    avatar = models.ImageField(upload_to='avatar_img')
