import { config } from "dotenv";
import { OpenAI } from "openai";
config();

const ai = new OpenAI();

async function chatBot() {
  const res = await ai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "hello",
      },
    ],
    temperature: 0.4,
  });
  console.log(res.choices[0].message.content);
}

chatBot();
