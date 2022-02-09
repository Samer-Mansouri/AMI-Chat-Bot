from django.db import models
from django.db.models.base import ModelState
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, IntegerField, TextField
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField
from users.models import User
# Create your models here.
from django.db import models
from datetime import datetime, timedelta


class Post(models.Model):
  author = ForeignKey(User, on_delete=CASCADE)
  title = CharField(verbose_name='Titre', max_length=20, unique=True)
  content = TextField(verbose_name="Contenu", null=False)
  created_at = models.DateTimeField(verbose_name='Created At', auto_now_add=True)

  class Meta:
        verbose_name = 'Publication'
        verbose_name_plural = 'Publications'

class Contrat(models.Model):
  TYPE_ASSURANCE = [
    (1, 'Automobile'),
    (2, 'Incendie & Risques'),
    (3, 'Vie'),
    (4, 'Santé'),
    (5, 'Transport'),
  ] 
  numContrat = models.IntegerField(verbose_name="Numéro Contrat", unique=True)
  type_assurance = models.IntegerField(choices=TYPE_ASSURANCE)
  cin_client = models.IntegerField(verbose_name="Cin du client", unique=True)
  date_contract = models.DateField(verbose_name="Date du contrat", auto_now_add=True)
  serie_voiture = models.CharField(verbose_name="Serie Voiture", max_length=10, unique=True, null=True, blank=True)
  statut_contrat = models.CharField(verbose_name="Statut du contrat", max_length=255, default="En cours du traitement")

class Problem(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  email = models.EmailField(verbose_name="Email")
  problem = TextField(null=False)

class Devis(models.Model):
  TYPE_ASSURANCE = [
    (1, 'Automobile'),
    (2, 'Incendie & Risques'),
    (3, 'Vie'),
    (4, 'Santé'),
    (5, 'Transport'),
  ] 
  email = models.EmailField()
  cin = models.IntegerField()
  fname = models.CharField(max_length=50)
  lname = models.CharField(max_length=50)
  num_tel = models.IntegerField()
  type_devis = models.IntegerField(choices=TYPE_ASSURANCE)
