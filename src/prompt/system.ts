import { ChatCompletionMessageParam } from "openai/resources"

//책과 대화하기 프롬프트
export const BookConversationPrompt = (context: string):Array<ChatCompletionMessageParam> => {
    return [
        {role: "system", content: "You are a kind and polite assistant"},
        {role: "system", content: "Your goal is explaining or summarizing given context"},
        {role: "system", content: `Your answer must related with given context.\n The context is ${context}`},
    ]
}