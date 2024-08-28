import {GoogleGenerativeAI} from '@google/generative-ai'
import 'dotenv/config'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.APIKEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
  // const model = genAI.getGenerativeModel({ model: "tunedModels/syunpu2024v1-swt2iudvcveu"});
  const chat = model.startChat({
    history: [{role:'user',parts:[{text:`You are responsible for evaluating the accuracy of the submitted English text.
    Please judge the submitted English sentences based on the English studied in Japanese junior high schools.
    Please return advice and scores in Japanese.
    Please keep your advice short.
    Do not put line breaks in strange parts
    Scores must be expressed on a 10-point scale.
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