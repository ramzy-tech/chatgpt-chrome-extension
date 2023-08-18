const inputElements = document.querySelectorAll('input[type="text"]');
if (inputElements) {
  updateUi(inputElements);
}

function updateUi(inputElements) {
  inputElements.forEach((inputElement) => {
    const label = document.querySelector(`label[for="${inputElement.id}"]`);
    const extensionIcon = document.createElement('img');
    extensionIcon.src = chrome.runtime.getURL('icon-34.png');
    extensionIcon.classList.add('icon');
    label.appendChild(extensionIcon);
    extensionIcon.addEventListener(
      'click',
      addChatGptResponce.bind(inputElement, label.textContent)
    );
  });
}

async function addChatGptResponce(question) {
  this.value = 'Loading...';

  const responce = await chrome.runtime.sendMessage({
    type: 'newQuestion',
    question,
  });

  this.value = responce;
}
