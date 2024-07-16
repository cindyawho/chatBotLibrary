import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import words from './words.json'
const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://www.shutterstock.com/image-vector/hangman-hang-man-guessing-game-260nw-2179099581.jpg",
};

function grabLetter()
{
  let index = Math.floor(Math.random() * words.length)
  let letter = words[index];
  return letter;
}


function checkForLetter (wordAnswer, letter, boolArr) //checks which index is false for repeats and first times, returns valid index if word is included, -1 for wrong
{
  let flag = false;
  //console.log(  "start of game: " + wordAnswer + " and " + letter);
  if (letter.length > 1)
    return false;
    // check that it is contained and that the instances for that letter are all false (if all true then no more instances of it)
  if (wordAnswer.includes(letter))
  {
    
    for (let i = 0; i < boolArr.length; i++)
    {
      if (wordAnswer[i] === letter && boolArr[i] === false)
      { 
        boolArr[i] = true;
        //c h e e t o
        //t f t f t t
        flag = true;
      }
    }
  }
  return flag;
}

function replaceChar(origString, replaceChar, index) {
  let firstPart = origString.substr(0, index);
  let lastPart = origString.substr(index + 1);
    
  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

function addSpacesBetweenCharacters(stringToChange) {
  // Create a deep copy of the input string
  let stringCopy = stringToChange.slice(); // or use [...stringToChange] to create an array copy

  // Split the copied string into an array of characters
  let charsArray = stringCopy.split('');
  
  // Join the array with spaces
  let stringWithSpaces = charsArray.join(' ');
  
  return stringWithSpaces;
}

export default function LuisHangmanGame() {
  const [messages, setMessages] = useState([]);
  // let skibidi = "What is a toilet?"; 
  // let ohio = "What does the ohio rizzler have?";
  // let gnome = "Is Ryan shorter than Luis?";
  // let [prompt, setPrompt] = useState();  
  // let [promptNum, setPromptNum] = useState(0);
  // const answer1 = "skibidi";
  // const answer2 = "rizz";
  // const answer3 = "yes";
  
  let [completeWord, setCompleteWord] = useState(grabLetter());
  let [shownWord, setShownWord] = useState('_'.repeat(completeWord.length));
  let [letterBoolArray, setLetterBoolArray] = useState(new Array(completeWord.length).fill(false));
  let [failCounter, setFailCounter] = useState(7); //decrease instead of increase
  let [guessWordArrays, setGuessWordsArrays] = useState([]);



  useEffect(() => {
    
    
    if (messages.length < 1  ) {
      // Add a "starting message" when chat UI first loads
      // addBotMessage(
      //   "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!"
      // );
      addBotMessage("Hello welcome to hangman! Input one letter for your first guess! You have " + failCounter + " attemps remaining!");

      let copyString = addSpacesBetweenCharacters(shownWord);
      addBotMessage("Your current hint: " + copyString);
    }
    else if (failCounter  === 0)
    {
      addBotMessage("Game Over!!");
      addBotMessage("The word was: " + completeWord + ". Refresh page to play again!!");
      
    }
    else if (shownWord === completeWord)
      addBotMessage("You Win! Refresh page to play again!!!")
    else
    {
      //addBotMessage(shownWord);
      // addBotMessage("Your guessed words are: " + guessWordArrays);
    }

    // addBotMessage( );
  }, [shownWord, guessWordArrays, failCounter]);

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
    let guess = userMessages[0].text.toLowerCase();
    console.log("msg ", guess);
    let copyBoolArr = letterBoolArray;
    let boolArrForUpdatingLetter = [...copyBoolArr];
    let flag = checkForLetter(completeWord, guess, copyBoolArr);

    if (guess.length != 1)
      addBotMessage("Please enter 1 letter.")
    else if (flag === true)
    { 
      //make copies, change index of copies, then set new values
      let copyWord = shownWord;
      //console.log("At first copy before changing: " + copyWord);
      for (let i = 0; i < copyWord.length;i++)
      {
        if (copyBoolArr[i] && !boolArrForUpdatingLetter[i])
        {
          copyWord = replaceChar(copyWord, guess, i);
        }
      }

      //console.log("After editing: " + copyWord);
      
      //console.log(copyWord);
      //console.log(copyBoolArr);
      shownWord = copyWord;

      setShownWord(copyWord);
      setLetterBoolArray(copyBoolArr);
      
      let wordsGuessedCopy = guessWordArrays;
      wordsGuessedCopy.push(guess);
      setGuessWordsArrays(wordsGuessedCopy);

      addBotMessage("Correct!");
      let copyString = addSpacesBetweenCharacters(shownWord);
      addBotMessage("Your current hint: " + copyString);
      //addBotMessage("Your guessed words are: " + guessWordArrays);
    }
    else //incorrect guess
    {
      let wordsGuessedCopy = guessWordArrays;
      wordsGuessedCopy.push(guess);
      setGuessWordsArrays(wordsGuessedCopy);
      setFailCounter(failCounter -= 1);
      addBotMessage("Incorrect! You have "+ failCounter+ " guesses left!");
      addBotMessage("Your guessed words are: " + guessWordArrays);
      let copyString = addSpacesBetweenCharacters(shownWord);
      addBotMessage("Your current hint: " + copyString);
    }



      // if (promptNum === 0)
      // {
      //   if (userMessages[0].text.toLowerCase() === "yes")
      //   {
      //     setPromptNum(promptNum +=1);
      //     setPrompt(skibidi);
      //   }
      //   else
      //    addBotMessage("pls type yes bbg")

      // }
      // else if (promptNum ===1)
      // {
      //   if (userMessages[0].text.toLowerCase() === answer1)
      //   {
      //     setPromptNum(promptNum +1);
      //     setPrompt(ohio);
      //   }
      //   else
      //     addBotMessage("wrong");
      // }
      // else if (promptNum === 2)
      // { 
      //   if (userMessages[0].text.toLowerCase() === answer2)
      //   {
      //     setPromptNum(promptNum +1);
      //     setPrompt(gnome);
      //   }
      //   else
      //     addBotMessage("wrong");
      // }
      // else if (promptNum === 3)
      // {
      //   if (userMessages[0].text.toLowerCase() === answer3)
      //   {
      //     setPromptNum(promptNum + 1);
      //     setPrompt("gyatt");
      //   }
      //   else
      //     addBotMessage("ur in denial buddy");
      // }
      // else
      // {
      //   addBotMessage("womp womp its over she took the kids");

      // }

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
