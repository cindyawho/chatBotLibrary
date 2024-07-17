import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../../utils/getChatGPT";
import prompt from './promptData'

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "ChatGPT 3.5",
  avatar: "https://static.vecteezy.com/system/resources/previews/024/558/804/original/openai-chatgpt-logo-icon-free-png.png",
};

async function fetchInitialMessage(addBotMessage) {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    // console.log("message: ", message);
    const content = response.choices[0].message.content;
    // console.log("content: ", content);
    addBotMessage(content);
}

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    fetchInitialMessage(addBotMessage);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
    //   console.log("PREVIOUS MESSAGES:", previousMessages);
    //   console.log("NEW MESSAGE:", newMessages);
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

  const respondToUser = (newMessages) => {
    const reverseMessages = messages.reverse();
    const allMessages = [...reverseMessages, newMessages[0]];
    // console.log("all messages: ", allMessages);
    let formattedMessages = allMessages.map((element) => {
        // console.log("Each Element:", element);
        let userName = element.user.name;
        let messageContent = element.text;
        // console.log(element.user.name, "******", element.text);
        if(userName == "ChatGPT 3.5"){
            return{role: "assistant", content: messageContent};
        } else {
            return{role: "user", content: messageContent};
        }
    })
    formattedMessages = [prompt[0], ...formattedMessages]
    // console.log("FORMATTED MESSAGES: ", formattedMessages);
    fetchChatGPTMessage(formattedMessages);
  };

  async function fetchChatGPTMessage(formattedMessages) {
    const gptResponse = await getChat(formattedMessages);
    const content = gptResponse.choices[0].message.content;
    // console.log("GPT content: ", content);
    addBotMessage(content);
}

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
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