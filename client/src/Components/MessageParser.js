class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    this.state ={
      data: "",
    }
  }

  

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if(lowercase.includes("voiture") || lowercase.includes("tun") || lowercase.includes("contrat") || lowercase.includes("devis") ) {
  
      if(lowercase.includes('contrat')){
        this.actionProvider.checkContrat(lowercase);
      }
  
      else if(lowercase.includes('voiture') && lowercase.includes('tun')){
        this.actionProvider.checkContratVoiture(lowercase);
      }

      else if(lowercase.includes('devis')){
        this.actionProvider.askDevis(lowercase)
      }

     
    } else {
      this.actionProvider.normalMsg(lowercase);      
    }
   

  }
}

export default MessageParser;