chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
  try {
    await chrome.storage.local.set({ questions: [] });
    const responce = await chrome.tabs.sendMessage(tabId, { type: 'newTab' });
  } catch (error) {
    console.log(error.message);
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(request);
//   console.log(API_KEY);
// });
