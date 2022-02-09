from django.db import models
from django.contrib import admin
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyAccountManager(BaseUserManager):
  def create_user(self, email, password=None):
    if not email:
      raise ValueError('Users must have an email adress')
    #if not username:
      #raise ValueError('Users must have an username')

    user = self.model(
      email=self.normalize_email(email),
      password=password,
    )
    user.set_password(password)
    user.save(using=self._db)
    return user  
  
  def create_superuser(self, *args, email, password):
    user = self.create_user(
      email=self.normalize_email(email),
      password=password,
    )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    return user

class User(AbstractBaseUser):
  first_name = models.CharField(verbose_name="Nom", max_length=50)
  last_name = models.CharField(verbose_name="Prénom", max_length=50)
  email = models.EmailField(verbose_name="Email", max_length=50, unique=True)
  username = models.CharField(verbose_name="Pseudo", max_length=50, unique=True)
  num_tel = models.IntegerField(verbose_name="N° de Tel", blank=True, null=True)
  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  is_verified = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_superuser = models.BooleanField(default=False)
  created_at = models.DateTimeField(verbose_name='Created At', auto_now_add=True)
  last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
  USERNAME_FIELD = 'email'
  #REQUIRED_FIELDS = ['']

  objects = MyAccountManager()

  def __str__(self):
    return self.email

  def has_perm(self, perm, obj=None):
    return self.is_admin

  def has_module_perms(self, app_label):
    return True
  
  class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'
