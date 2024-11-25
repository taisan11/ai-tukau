import { BlackboxAI } from '@evex/blackbox-ai'
import { history } from "./hostory.ts";
import { modelAisatu } from "./hostory.ts";
import {consola} from "consola"

const selectedModel = await consola.prompt("Select a model", { type: "select", options: ["gpt-4o", "claude-sonnet-3.5", "gemini-pro", "blackboxai"] }) as 'gpt-4o' | 'claude-sonnet-3.5' | 'gemini-pro' | 'blackboxai';

const blackbox = new BlackboxAI({modelName:selectedModel})

const chat = blackbox.startChat({"history":[{"role":"user","content":history},{"role":"assistant","content":modelAisatu}]})
const encoder = new TextEncoder()
while (true) {
    const input = prompt("User>") as string

    if (input === "exit") {
        break
    }

    for await (const response of chat.generateWithStream({"role":"user","content":input})) {
        Deno.stdout.write(encoder.encode(response));
    }
    console.log()
}