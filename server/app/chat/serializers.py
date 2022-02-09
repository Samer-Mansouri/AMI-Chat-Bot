from rest_framework import serializers

from .models import Contrat, Problem, Devis



class ContratSerializer(serializers.ModelSerializer):
    
    type_contrat = serializers.SerializerMethodField('type_contrat_func')
   
    class Meta:
        model = Contrat
        fields = ['numContrat', 'cin_client', 'type_contrat', 'date_contract', 'statut_contrat', 'serie_voiture']

    def type_contrat_func(self, obj):
        if obj.type_assurance == 1:
            return "Automobile"
        elif obj.type_assurance == 2:
            return "Incendie & Risques"
        elif obj.type_assurance == 3:
            return "Vie"
        elif obj.type_assurance == 4:
            return "Santé"
        elif obj.type_assurance == 5:
            return "Transport"


class DevitalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Devis
        fields = ['email', 'cin', 'lname', 'fname', 'num_tel', 'type_devis']

    
    def save(self):
      devis = Devis(
        email=self.validated_data["email"],
        cin=self.validated_data["cin"],
        fname = self.validated_data["fname"],
        lname = self.validated_data["lname"],        
        num_tel=self.validated_data["num_tel"],
        type_devis=self.validated_data["type_devis"],
        
      )
      devis.save()

class ProblemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Problem
        fields = ['first_name', 'last_name', 'email', 'problem']

    
    def save(self):
      problem = Problem(
        first_name=self.validated_data["first_name"],
        last_name=self.validated_data["last_name"],
        email=self.validated_data["email"],
        problem = self.validated_data["problem"],
        
      )
      problem.save()
      
