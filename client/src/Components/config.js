import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
const config = {
  botName: "AmiChatBOT",
  initialMessages: [
    createChatBotMessage(`Bonjour, comment allez vous je suis la pour vous aider`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },

  ],
};

export default config;