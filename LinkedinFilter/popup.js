document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('languageForm');
  // Load saved languages
  chrome.storage.sync.get(['languages'], (result) => {
    if (result.languages) {
      Array.from(form.elements['language']).forEach(cb => {
        cb.checked = result.languages.includes(cb.value);
      });
    }
  });
  // Save selected languages
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = Array.from(form.elements['language'])
      .filter(cb => cb.checked)
      .map(cb => cb.value);
    chrome.storage.sync.set({ languages: selected }, () => {
      // Notify content script to re-filter jobs
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'refilter' }, (response) => {
            if (chrome.runtime.lastError) {
              console.log('Message error:', chrome.runtime.lastError.message);
            } else {
              console.log('Message sent, response:', response);
            }
          });
        }
      });
    });
  });
}); 