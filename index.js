import 'dotenv/config'
import OpenAI from "openai";
const openai = new OpenAI();

const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    messages: [
    {    
        role: 'system',
        content: 'You are an AI assistant. Answer questions to the best of your ability.'
    },
    {
        role: 'user',
        content: 'Hi! Can you tell me what is the best way to learn to do maths?'
    }
    ],
    })

    console.log(results.choices[0].message.content); 