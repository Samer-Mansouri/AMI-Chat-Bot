import React from "react";


const Options = (props) => {
   
  const options = [
    {
      text: "Suivre votre contrat",
      handler: props.actionProvider.suivreContrat,
      id: 1,
    },
    {
      text: "Suivre votre contrat automobile",
      handler: props.actionProvider.suivreContratVoiture,
      id: 2,
    },
    { text: "Demander un devis", handler: props.actionProvider.dermanderDevis, id: 3 },

  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;