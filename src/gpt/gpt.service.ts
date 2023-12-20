import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { BookConversationPrompt } from 'src/prompt/system';


@Injectable()
export class GptService {

    private readonly openai: OpenAI;

    constructor(
        private readonly configService: ConfigService,
        ){
        this.openai = new OpenAI({apiKey: this.configService.get('OPENAI_API_KEY')})
    }

    async embedding (content: string) {
        try {
            const embedded = await this.openai.embeddings.create({
                input: content,
                model: "text-embedding-ada-002"
            }).then((res)=> res.data)
            return embedded[0].embedding
        } catch (error) {
            console.log('embedding error', error)
        }
    }

    async bookConversation (content: string, context) {
        const system = BookConversationPrompt(context)
        try {
            const bookQA = await this.openai.chat.completions.create({
                messages: [...system,{role: 'user', content: content}],
                model:'gpt-3.5-turbo-16k',
                temperature:0.4,
                top_p:0.6
            })
            return bookQA.choices[0].message.content
        } catch (error) {
            console.log(error)
            throw new Error("GPT ERROR")
        }

    }

    private limitContent (messages: Array<ChatCompletionMessageParam>){
        let length = 0;
        let index = 0;
        messages.forEach((message, i)=> {
            if(index !== 0){
                return;
            }

            length += message.content.length
            if(length > 1000){
                index= i
            }
        })

        return messages.slice(index)
    }


}
