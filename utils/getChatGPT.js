var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer sk-None-fTyil75x6P5rheW79R1vT3BlbkFJtO9WSo0ZQ1rSWRU7b8J6");

export const getChat = async (messages) => {
  const raw = JSON.stringify({
    "model": "gpt-3.5-turbo-0125",
    "messages": messages,
    "temperature": 1,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "max_tokens": 250,
    "presence_penalty": 0,
    "frequency_penalty": 0
  });
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }; 
  
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions", requestOptions
  );
  
  return await response.json();
}