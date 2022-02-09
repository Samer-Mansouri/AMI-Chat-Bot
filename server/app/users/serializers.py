from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'num_tel', 'password', 'password2']
        extract_kwargs = {
          'password': {'write_only': True}
        }
    
    def save(self):
      user = User(
        email=self.validated_data["email"],
        username = self.validated_data["username"],
        first_name=self.validated_data["first_name"],
        last_name=self.validated_data["last_name"],
        num_tel = self.validated_data["num_tel"],        
      )
      password = self.validated_data["password"]
      password2 = self.validated_data["password2"]

      if password != password2:
        raise serializers.ValidationError({'password': 'Password Must Match'})
      if password == user.username:
        raise serializers.ValidationError({'password': 'Password must be different of username'})
      if password == user.email:
        raise serializers.ValidationError({'password': 'Password must be different of email'})
      if len(password) < 8:
        raise serializers.ValidationError({'password': 'Password length must be over 8 charachters'})
      user.set_password(password)
      user.save()
      return user
