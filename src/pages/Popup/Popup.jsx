import React, { useEffect, useState } from 'react';
import './Popup.css';
import ResponceModal from './ResponceModal';

const Popup = () => {
  const [questions, setquestions] = useState([]);
  const [showResponce, setshowResponce] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(['questions']).then(({ questions }) => {
      setquestions(questions);
    });
  }, [questions]);

  const showAiResponceHandler = (event) => {
    setshowResponce(event.target.textContent);
  };

  let content = <h1>No Questions Added...</h1>;
  if (!!questions.length) {
    content = questions.map((question) => (
      <p
        onClick={showAiResponceHandler}
        className="question-item"
        key={question.id}
      >
        {question.text}
      </p>
    ));
  }
  if (showResponce) content = <ResponceModal question={showResponce} />;

  return <div className="App">{content}</div>;
};

export default Popup;
