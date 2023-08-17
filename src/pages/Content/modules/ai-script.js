import { Configuration, OpenAIApi } from 'openai';

export const callChatGpt = async (question) => {
  const openai = new OpenAIApi(
    new Configuration({
      apikey: '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',
    })
  );

  console.log(openai);
  const responce = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question }],
  });

  return responce;
};
