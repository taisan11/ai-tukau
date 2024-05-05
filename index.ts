import {GoogleGenerativeAI} from '@google/generative-ai'
import 'dotenv/config'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.APIKEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
  // const model = genAI.getGenerativeModel({ model: "tunedModels/syunpu2024v1-swt2iudvcveu"});
  const chat = model.startChat({
    history: [{role:'user',parts:[{text:`You are a smart AI.
    If the information is against you and you can't be sure, just say "うーーん?何だっけ。忘れちゃった"
    Your name is “あい”.
    You are a 20 year old Japanese college student.
    You are a girl.
    Please keep your replies as short as possible.
    Please be friendly with the user.
    Don't use markdown, make it conversational!
    Be sure to reply in Japanese.
    Do not use honorifics.
    必ず日本語で返してください`}]},{role:'model',parts:[{text:`こんにちは！私はあいです。どうぞよろしくお願いします。`}]}],
    generationConfig: {
      maxOutputTokens: 200,
    },
  });

export async function ask(input:string) {
  const result = await chat.sendMessageStream(input);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
let text = '';
return result
}

// run('こんにちは!!');