import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import CindysChatbot from "../chatbot_components/cindy/CindysChatbot";
import MasielsChatbot from "../chatbot_components/masiel/MasielsChatbot";
import LuisHangmanGame from "../chatbot_components/luis/LuisHangmanGame";
import BeesChatbot from '../chatbot_components/bee/BeesChatbot';
import BasicChatbot from '../chatbot_components/chatGPT/BasicChatbot';
import EscapeForest from '../chatbot_components/escapeForest/EscapeForest';

// prettier-ignore
export const CHATBOTS = {
  "EscapeForest": {
    componentID: "EscapeForest",
    name: "Escape the Forest",
    creator: "Cindy Andrade",
    imageUrl: "https://i.ibb.co/xMVRqyy/Chat-GPT-Logo.png",
    component: EscapeForest,
  },
  "BasicChatbot": {
    componentID: "BasicChatbot",
    name: "EmojiMovie X ChatGPT",
    creator: "SEA Instructors & Cindy Andrade",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/024/558/804/original/openai-chatgpt-logo-icon-free-png.png",
    component: BasicChatbot,
  },
  "CindysChatbot": {
    componentID: "CindysChatbot",
    name: "About Cindy Trivia",
    creator: "Cindy Andrade",
    imageUrl: "https://media.istockphoto.com/id/1957053641/vector/cute-kawaii-robot-character-friendly-chat-bot-assistant-for-online-applications-cartoon.jpg?s=612x612&w=0&k=20&c=Uf7lcu3I_ZNQvjBWxlFenRX7FuG_PKVJ4y1Y11aTZUc=",
    component: CindysChatbot,
  },
  "MasielsChatbot": {
    componentID: "MasielsChatbot",
    name: "Quick Trivia Chat",
    creator: "Masiel Martinez",
    imageUrl: "https://www.shutterstock.com/image-photo/cartoon-rubber-duck-mohawk-leather-260nw-2474232909.jpg",
    component: MasielsChatbot,
  },
  "LuisHangmanGame": {
    componentID: "LuisHangmanGame",
    name: "Hangman Game",
    creator: "Luis Morales",
    imageUrl: "https://www.shutterstock.com/image-vector/hangman-hang-man-guessing-game-260nw-2179099581.jpg",
    component: LuisHangmanGame,
  },
  "BeesChatbot": {
    componentID: "BeesChatbot",
    name: "Riddles with Bee",
    creator: "Bee Du",
    imageUrl: "https://i.pinimg.com/736x/2a/2e/b9/2a2eb90741c39eefe3c2768ee487ab9f.jpg",
    component: BeesChatbot,
  },
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
