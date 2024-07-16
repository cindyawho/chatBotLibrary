import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://www.shutterstock.com/image-photo/cartoon-rubber-duck-mohawk-leather-260nw-2474232909.jpg",
};

const triviaQuestion = [
  {
    question: "Do you want to start the game? [Y/N]",
    answer: "Y",
  },
  {
    question: "Is that sky blue? [Y/N]",
    answer: "Y",
  },
  {
    question: "Is that ocean blue? [Y/N]",
    answer: "Y",
  },
  {
    question: "Is that blood blue? [Y/N]",
    answer: "N",
  },
];
let currentQuestion = 0;
export default function MasielsChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Y' when you're ready to play!"
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    console.log("Recent user msg:", userMessages[0].text);

    if (currentQuestion > triviaQuestion.length -1 ) {
      addBotMessage("GAME OVER NERD")
      return;
    }
    if (userMessages[0].text === triviaQuestion[currentQuestion].answer) {
      // user got correct answer
      addBotMessage("That's correct");
      console.log("76 that was right");
      currentQuestion += 1;
      if (currentQuestion > triviaQuestion.length -1 ) {
        addBotMessage("GAME OVER NERD")
        return; }
      addBotMessage(triviaQuestion[currentQuestion].question)
    } else {
      addBotMessage("That's not right....");
      addBotMessage(triviaQuestion[currentQuestion].question)
    }
  
    
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        // Wait a sec before responding
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};