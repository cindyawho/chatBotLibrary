import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { useNavigation } from "@react-navigation/native";

const Chatbot = ({
  index,
  imageUrl,
  chatbotTitle,
  creator,
  component,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          // this is a "quick and dirty" hack for the moment, we'll want to rename our properties later
          chatbotName: component,
        })
      }
    >
      <View style={styles.chatbot}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.chatbotImage]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.chatCreatorContainer}>
          <Text style={[styles.chatbotTitle]} numberOfLines={1}>
            {chatbotTitle}
          </Text>
          <Text style={styles.creator} numberOfLines={1}>
            {creator}
          </Text>
        </View>
        <Text style={[styles.component]} numberOfLines={1}>
          {component}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatbot: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  chatbotImage: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  chatCreatorContainer: {
    flex: 0.4,
    margin: 5,
  },
  chatbotTitle: {
    color: Themes.colors.white,
    fontSize: 12,
  },
  creator: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  component: {
    color: Themes.colors.white,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
});

export default Chatbot;
