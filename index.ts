import {GoogleGenerativeAI} from '@google/generative-ai'
import 'dotenv/config'
import { history,modelAisatu } from "./hostory.ts";


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.APIKEY!);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
  // const model = genAI.getGenerativeModel({ model: "tunedModels/syunpu2024v1-swt2iudvcveu"});
  const chat = model.startChat({
    history: [{role:'user',parts:[{text:history}]},{role:'model',parts:[{text:modelAisatu}]}],
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