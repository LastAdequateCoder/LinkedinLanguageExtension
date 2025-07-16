// Content script to filter LinkedIn job vacancies by language

// Load franc-min for language detection
// Assumes franc.min.js is loaded as a content script in manifest.json

// Map franc codes to extension language codes
const francToLang = {
  'eng': 'en',
  'rus': 'ru',
  'nld': 'nl',
  'deu': 'de',
  'fra': 'fr'
};

// Map eld codes to extension language codes
const eldToLang = {
  'en': 'en',
  'ru': 'ru',
  'nl': 'nl',
  'de': 'de',
  'fr': 'fr'
};

function detectLanguage(text) {
  if (typeof franc === 'function') {
    const francCode = franc(text || '');
    return francToLang[francCode] || 'unknown';
  }
  if (typeof eld !== 'undefined' && eld.detect) {
    const result = eld.detect(text || '');
    if (result && result.language) {
      return eldToLang[result.language] || 'unknown';
    }
  }
  return 'unknown';
}

function injectHideClass() {
  if (document.getElementById('lang-filter-hide-style')) return;
  const style = document.createElement('style');
  style.id = 'lang-filter-hide-style';
  style.textContent = `
    .lang-filter-hidden {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function hideJobCard(card) {
  injectHideClass();
  card.classList.add('lang-filter-hidden');
  card.setAttribute('data-hidden-by-lang-filter', 'true');
}

function showJobCard(card) {
  card.classList.remove('lang-filter-hidden');
  card.removeAttribute('data-hidden-by-lang-filter');
}

function filterJobs(languages) {
  injectHideClass();
  let jobCards = document.querySelectorAll('[data-job-id]');
  if (jobCards.length === 0) {
    jobCards = document.querySelectorAll('.job-card-container, .jobs-search-results__list-item');
  }
  jobCards.forEach(card => {
    const titleEl = card.querySelector('.job-card-list__title--link');
    const title = titleEl ? titleEl.innerText : '';
    const lang = detectLanguage(title);
    if (!languages.includes(lang)) {
      hideJobCard(card);
    } else {
      showJobCard(card);
    }
  });
}

function runFilter() {
  chrome.storage.sync.get(['languages', 'selectedLanguages'], (result) => {
    let languages = result.languages || result.selectedLanguages || ['en'];
    filterJobs(languages);
  });
}

function observeJobListChanges() {
  let jobList = document.querySelector('.jobs-search-results-list');
  if (!jobList) {
    jobList = document.querySelector('.jobs-search__results-list');
  }
  if (!jobList) return;
  const observer = new MutationObserver(runFilter);
  observer.observe(jobList, { childList: true, subtree: true });
}

injectHideClass();
runFilter();
observeJobListChanges();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'refilter') {
    runFilter();
    try {
      sendResponse({ status: 'filtered' });
    } catch (e) {
      // Context invalidated, ignore
    }
  }
}); 