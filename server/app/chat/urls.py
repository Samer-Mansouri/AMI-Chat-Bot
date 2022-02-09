from django.urls import path
from .chat import message
from .chat import check_contract
from .chat import declare_problem
from .chat import generate_devis





app_name = "chat"

urlpatterns = [
  path('message', check_contract, name="message"),
  path('normal_message', message, name="normal_message"),
  path('problem', declare_problem, name="declare_problem"),
  path('devis', generate_devis, name="generate_devis"),
]

