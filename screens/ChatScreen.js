import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import BakersChatbot from "../components/BakersChatbot";
import CindysChatbot from "../chatbot_components/cindy/CindysChatbot";
import MasielsChatbot from "../chatbot_components/masiel/MasielsChatbot";
import LuisHangmanGame from "../chatbot_components/luis/LuisHangmanGame";

// prettier-ignore
export const CHATBOTS = {
  "CindysChatbot": {
    id: "CindysChatbot",
    name: "About Cindy Trivia",
    imageUrl: "https://media.istockphoto.com/id/1957053641/vector/cute-kawaii-robot-character-friendly-chat-bot-assistant-for-online-applications-cartoon.jpg?s=612x612&w=0&k=20&c=Uf7lcu3I_ZNQvjBWxlFenRX7FuG_PKVJ4y1Y11aTZUc=",
    component: CindysChatbot,
  },
  "MasielsChatbot": {
    id: "MasielsChatbot",
    name: "Masiel's Trivia Chat",
    imageUrl: "https://www.shutterstock.com/image-photo/cartoon-rubber-duck-mohawk-leather-260nw-2474232909.jpg",
    component: MasielsChatbot,
  },
  "LuisHangmanGame": {
    id: "LuisHangmanGame",
    name: "Luis's Hangman Game",
    imageUrl: "https://www.shutterstock.com/image-vector/hangman-hang-man-guessing-game-260nw-2179099581.jpg",
    component: LuisHangmanGame,
  },
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
  "BakersChatbot": {
    id: "BakersChatbot",
    name: "Baker's Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    component: BakersChatbot,
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
