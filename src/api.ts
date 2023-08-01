const prompt = 'Why is the sky blue?';

function promptWrapper(prompt) {
  return `\n\nHuman: ${prompt}\n\nAssistant:`;
}

getResponse(promptWrapper(prompt))

async function getResponse() {
  fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
      'x-api-key':
        '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',
    },
    body: JSON.stringify({
      max_tokens_to_sample: 3000,
      model: 'claude-2',
      prompt: promptWrapper(prompt),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.completion);

      const localMessageHistory = JSON.parse(
        localStorage.getItem('messageHistory')
      ) || [];
      console.log(localMessageHistory)
      localMessageHistory.push(data.completion);
      localStorage.setItem(
        'messageHistory',
        JSON.stringify(localMessageHistory)
      );

      return data.completion;
    })
    .catch((error) => {
      const localErrorLog = JSON.parse(localStorage.getItem('errorLog')) || [];
      console.log(localErrorLog)
      localErrorLog.push(error);
      localStorage.setItem('errorLog', JSON.stringify(localErrorLog));
      console.error('Error:', error);
    });
}

export { promptWrapper, getResponse}