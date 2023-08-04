// import { printLine } from './modules/print';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request.type === 'newTab') return;
  const inputElements = document.querySelectorAll('input[type="text"]');
  if (inputElements) {
    updateUi(inputElements);
  }
});

const getPageQuestions = (inputElements) => {
  const questions = [];

  inputElements.forEach((inputElement) => {
    const label = document.querySelector(`label[for="${inputElement.id}"]`);
    questions.push(label.textContent);
  });
  return questions;
};

const updateUi = (inputElements) => {
  inputElements.forEach((inputElement) => {
    const label = document.querySelector(`label[for="${inputElement.id}"]`);
    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+';
    plusIcon.classList.add('extension-icon');
    label.appendChild(plusIcon);
    plusIcon.addEventListener('click', addQuestionHandler.bind(null, label));
  });
};

const addQuestionHandler = async (label) => {
  const question = label.textContent;
  const newQuestion = {
    id: label.getAttribute('for'),
    text: question.substring(0, question.length - 1),
  };
  const { questions: oldQuestions } = await chrome.storage.local.get(
    'questions'
  );

  const updatedQuestions = oldQuestions.length
    ? [newQuestion, ...oldQuestions]
    : [newQuestion];
  await chrome.storage.local.set({ questions: updatedQuestions });
};
