import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { Themes } from "../assets/Themes";
import ChatList from "../components/ChatList";
import { CHATBOTS } from "./ChatScreen";

export default function HomeScreen({ navigation }) {
  // use the custom ChatList component instead of songList
  const contentDisplayed = <ChatList chats={Object.values(CHATBOTS)} />;

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
