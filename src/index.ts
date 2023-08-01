import './styles.css';
import * as _ from 'lodash';
import Anthropic from '@anthropic-ai/sdk';

import { ChatAnthropic } from 'langchain/chat_models/anthropic';
import { HumanMessage } from 'langchain/schema';
import { getResponse, promptWrapper } from './api';

// const chat = new ChatAnthropic({
//   temperature: 0.9,
//   anthropicApiKey:
//     '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', // In Node.js defaults to process.env.ANTHROPIC_API_KEY
// });

// const response = await chat.call([
//   new HumanMessage({
//     text: 'Hello, how',
//   }),
// ]);

// console.log(response)

// console.log('logging response');
// console.log()
// fetch('/.netlify/functions/getResponse.js')
//   .then(response => response.json())
//   .then(data => console.log(data));
// console.log('still logging...')

const globalAIObject = {
  name: 'AI',
};

const localErrorLog =
  JSON.parse(localStorage.getItem('errorLog')) || 'localErrorLog';
const localMessageHistory =
  JSON.parse(localStorage.getItem('messageHistory')) || 'localMessageHistory';

if (localErrorLog === 'localErrorLog') {
  localStorage.setItem('errorLog', JSON.stringify([]));
}
if (localMessageHistory === 'localMessageHistory') {
  localStorage.setItem('messageHistory', JSON.stringify([]));
}
console.log({ localErrorLog, localMessageHistory });

if (window.location.pathname === '/dist/') {
  console.log('main page');
} else if (window.location.pathname === '/dist/mainQuests.html') {
  console.log('only log on quests page');
  const classes: [string[]] =
    'transition-opacity ease-in duration-700 opacity-0'.split(' ');

  document.querySelectorAll('.lets-go-btn').forEach((element) => {
    console.log(element);
    element.addEventListener('click', async () => {
      const response = await fetch('/.netlify/functions/getData').then(
        (response) => response.json()
      );
      console.log({ response });

      document.location.href = '/dist/itinerary.html';
      console.log(classes);
      document.body.classList.add(...classes);
    });
  });
  // Fade out animation!
  // document.body.classList.add(...classes);
} else {
}

// const prompt = 'Why is the sky blue?';
// getResponse(promptWrapper(prompt));

// const data = {
//   model: 'claude-2',
//   max_tokens_to_sample: 2000,
//   prompt: 'Hello, how',
// };

// const anthropic = new Anthropic({
//   apiKey: 'my api key', // defaults to process.env["ANTHROPIC_API_KEY"]
// });

// async function main() {
//   const completion = await anthropic.completions.create({
//     model: 'claude-2',
//     max_tokens_to_sample: 300,
//     prompt: `${Anthropic.HUMAN_PROMPT} how does a court case get to the Supreme Court? ${Anthropic.AI_PROMPT}`,
//   });
// }

// main();
