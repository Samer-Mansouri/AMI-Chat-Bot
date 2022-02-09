from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
#from rest_framework.authtoken.models import Token

@api_view(['POST', ])
@permission_classes((AllowAny,))
def registration_view(request):

  if request.method == "POST":
    
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
      user = serializer.save()
      data["response"] = "Successfully registred a new user"
      data["email"] = user.email
      data["username"] = user.username
      #token = Token.objects.get(user=user).key
      #data['token'] = token
    else:
      data = serializer.errors
    return Response(data)

@api_view(['POST', ])
@permission_classes((AllowAny, ))
def check_token(request):

  if request.method == "POST":
    token = request.data.get('token')
    token = RefreshToken(token)
    print(token)
    print(token.check_blacklist())
    if(token.check_blacklist()):
      return Response("blacklisted")
    else:
      return Response("Good")

@api_view(['POST', ])
@permission_classes((AllowAny,))
def token_blacklist(request):
  
  if request.method == "POST":
    token = request.data.get('refresh')
    token = RefreshToken(token)
    token.blacklist()
    return Response("Logged out")
