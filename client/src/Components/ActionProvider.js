import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  

  suivreContrat = () => {
    const message = this.createChatBotMessage(
      `Si vous voulez obtenir des informations sur votre contrat,
      Veuillez Saisir votre cin et votre numéro du contrat comme le suit: xxxxcinxxxx xxxnuméro de contratxxxx`
    );

    this.addMessageToState(message);
  };


  suivreContratVoiture = () => {

    const message = this.createChatBotMessage(
      `Si vous voulez obtenir des informations sur votre contrat Automobile,
      Veuillez Saisir votre cin et veuillez saisir votre série de voiture comme le suit : voiture xxx-cin-xxx xxx-série voiture-xxx (xxxTUNxxxx)`,
      {
        widget: "javascriptQuiz",
      }
    );

    this.addMessageToState(message);

  }

  dermanderDevis = () => {
    const message = this.createChatBotMessage(
      `Si vous demandez un devis veuillez envoyer votre : devis xxvotre-emailxx xxvotre-cinxx xx-nom-xx xx-prénom-xx xxvotre-num-telxx xxtype-assurancexx
        1- Automobile
        2- Incendie & Risques,
        3- Vie,
        4- Santé
        5- Transport
      `,
      {
        widget: "javascriptQuiz",
      }
    );

    this.addMessageToState(message);
  };

  createResponse = (data) => {
    const message =  this.createChatBotMessage(data);
    this.addMessageToState(message);
  } 

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };


  checkContrat(msg){
    const splits = msg.split(' ')
    if(!isNaN(splits[1]) && !isNaN(splits[2])){
      axios.post('http://127.0.0.1:5000/api/msg/message', {
        message: msg,
      })
      .then(response => {
        if(response.data.numContrat && response.data.cin_client){
          console.log(response.data)
          let msg = `${response.data.numContrat} ${response.data.cin_client} ${response.data.type_contrat} ${response.data.date_contract}`
          this.createResponse(msg);

        } else {
          this.createResponse(response.data);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
        this.createResponse("Si vous voulez avoir l'avancement du votre contrat, veuillez saisir votre contrat xxx-cin-xxx xxx-numéro du contrat-xxx");
    }
  }

  checkContratVoiture(msg){
    const splits = msg.split(' ')
    if(!isNaN(splits[1]) && isNaN(splits[2])){
      axios.post('http://127.0.0.1:5000/api/msg/message', {
        message: msg,
      })
      .then(response => {
        if(response.data.numContrat && response.data.cin_client){
          console.log(response.data)
          let msg = `
          Numéro du contrat: ${response.data.numContrat}
          Cin du client: ${response.data.cin_client} 
          Type d'assurance: ${response.data.type_contrat}  
          Date du contrat: ${response.data.date_contract} 
          Statut du contrat: ${response.data.statut_contrat}
          Serie Voiture : ${response.data.serie_voiture}`
          this.createResponse(msg);

        } else {
          this.createResponse(response.data);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
        this.createResponse("Si vous voulez avoir l'avancement du votre contrat de voiture, veuillez saisir votre voiture xxx-cin-xxx xxx-série voiture-xxx (xxxTUNxxxx)");
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } 

  askDevis(msg){
    const splits = msg.split(' ')
    if(this.validateEmail(splits[1])  && !isNaN(splits[2])  && isNaN(splits[3]) && isNaN(splits[4]) && !isNaN(splits[5]) && !isNaN(splits[6]) && splits[6] >= 1 && splits[6] <= 5 && splits[1] !== '' && splits[2] !== '' && splits[3] !== '' && splits[4] !== '' && splits[5] !== '' && splits[6] !== ''){
      axios.post('http://127.0.0.1:5000/api/msg/devis', {
        email: splits[1],
        cin: splits[2],
        fname: splits[3],
        lname: splits[4],
        num_tel: splits[5],
        type_devis: splits[6]
      })
      .then(response => {
        console.log(response.data)
        this.createResponse(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
        this.createResponse("Vérifiez ce que vous avez saisi");
    }
  }

  
  normalMsg(msg){

      axios.post('http://127.0.0.1:5000/api/msg/normal_message', {
        message: msg,
      })
      .then(response => {
          this.createResponse(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }


}

export default ActionProvider;