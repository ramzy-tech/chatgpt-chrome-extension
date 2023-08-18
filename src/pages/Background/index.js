chrome.runtime.onMessage.addListener((message, sender, sendResponce) => {
  if (message.type === 'newQuestion') {
    const headers = {
      Authorization:
        'Bearer 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',
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message.question }],
      temperature: 0.7,
    });

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body,
    })
      .then((res) => {
        if (!res.ok) sendResponce('Error during fetching');
        res.json();
      })
      .then((answer) => sendResponce(answer));
  }
  return true;
});
