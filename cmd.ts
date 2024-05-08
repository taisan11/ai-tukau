// import { ask } from './index';
import { ask } from './eigoHantei';
import * as readline from 'node:readline';
import { marked } from 'marked';

async function main() {
    console.log('AI Chat for Gemini');
    console.log('exitと打つと終了します。');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        const question = await new Promise<string>((resolve) => {
            rl.question('User>', (answer) => {
                resolve(answer);
            });
        });

        if (question === 'exit') {
            break;
        }

        const answer = await ask(question);
        let text = '';
        for await (const chunk of answer.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
        }
        const temp = text;
        // console.log(marked(temp).toString());
    }

    rl.close();
}

main().catch((error) => {
    console.error('エラー!!:', error);
});