import random
import json
from rest_framework.permissions import AllowAny
import torch
from .models import Contrat
from .serializers import ContratSerializer, DevitalSerializer, ProblemSerializer
from .model import NeuralNet
from .nltk_utils import bag_of_words, tokenize
from django.core.mail import send_mail
from django.conf import settings
       
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

with open('./static/intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "./static/data.pth"
data = torch.load(FILE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"

json_data.close()

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return "I do not understand..."

@api_view(['POST', ])
@permission_classes((AllowAny,))
def message(request):

  if request.method == "POST":
    msg=request.data.get('message')
    if msg == '':
        return Response("Je ne vous comprends pas")
    else:
        resp = get_response(msg)
        return Response(resp)

@api_view(['POST', ])
@permission_classes((AllowAny,))
def check_contract(request):

  if request.method == "POST":
    msg=request.data.get('message')
    if msg == '':
        return Response("Cannot Understand")

    else:
        
        if msg:
            trash, cin, arg = msg.split()
            print(msg)
            try:
                if arg.isnumeric():
                    contrat = Contrat.objects.get(cin_client=int(cin), numContrat=int(arg))
                else:
                    contrat = Contrat.objects.get(cin_client=int(cin), serie_voiture=arg)
            except Contrat.DoesNotExist:
                return Response("Contrat invalide veuillez réssayer")

            serializer = ContratSerializer(contrat)
            data = serializer.data
            print(data)
            return Response(data)

        else:
            resp = get_response(msg)
            return Response(resp)

@api_view(['POST', ])
@permission_classes((AllowAny,))
def declare_problem(request):

  if request.method == "POST":
    
    serializer = ProblemSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
      serializer.save()
      data["response"] = "Votre probléme a été signalé !"

      #token = Token.objects.get(user=user).key
      #data['token'] = token
    else:
      data = serializer.errors
    return Response(data)

@api_view(['POST', ])
@permission_classes((AllowAny,))
def generate_devis(request):

  if request.method == "POST":
    
    serializer = DevitalSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
       serializer.save()
       fname = request.data.get("fname")
       lname = request.data.get("lname")
       subject = "Demande de devis " + fname + " " + lname  
       msg     = "Hello from AMI ASSURANCES"  
       to      = request.data.get("email") 
       res     = send_mail(subject, msg, settings.EMAIL_HOST_USER, [to])  
       if(res == 1):  
           msg = "Mail Sent Successfully."  
       else:  
           msg = "Mail Sending Failed."  
       print(msg)
       data["response"] = "Votre devis a été pris en compte, vous allez recevoir un email de notre part contenant plus de détails, en cas ou vous n'avez pas reçu notre mail avant 48h vous pouvez contacter notre équipe technique ou réssayer!"

      #token = Token.objects.get(user=user).key
      #data['token'] = token
    else:
      data = serializer.errors
    return Response(data)
