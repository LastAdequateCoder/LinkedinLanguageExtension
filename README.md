# 📚 LinkedIn Language Extension

A Chrome extension that filters LinkedIn job postings — helping users quickly find posts in their preferred language.

## 🚀 Features

- Detects the language of job titles.
- Improves LinkedIn’s default filtering to make job search easier.

## ⚙️ Motivation

LinkedIn often lacks fine-grained language filters. This extension helps multilingual job seekers efficiently filter job postings by language — saving time and reducing frustration.

## 🛠️ How It Works

- Intercepts LinkedIn’s API responses or observes the DOM.
- Extracts job title and description text.
- Runs a language detection algorithm.
- Hides job posts in languages other than the specified one.

## 🔧 Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle switch at the top right).
4. Click **Load unpacked** and select the project folder.
5. Refresh LinkedIn — language filtering is now active!

## 📚 Dependencies

- A JavaScript language detection library

## 🔧 Usage

Once loaded, the extension works automatically in the background. If you deactivate or unload it, language filtering will stop.

---

Feel free to contribute or suggest improvements!


