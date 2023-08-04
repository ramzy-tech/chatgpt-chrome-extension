import React, { useEffect, useState } from 'react';

import './Popup.css';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({ apikey: 'asdf' }));

const ResponceModal = ({ question }) => {
  const [loading, setloading] = useState(true);
  const [responce, setresponce] = useState(null);
  useEffect(() => {
    openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      })
      .then((res) => {
        setresponce(res.data.choices.messsage.content);
      });
  }, [question]);

  return (
    <div className="responce-container">
      {loading && <h3>Loading...</h3>}

      {responce && <p>{responce}</p>}
    </div>
  );
};

export default ResponceModal;
