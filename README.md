LinkedIn Language Extension
A Chrome extension that filters LinkedIn job postings — helping users quickly find posts in their preferred language.

🚀 Features
Detects the language of job titles.

Improves LinkedIn’s default filtering to make job search easier.

⚙️ Motivation
LinkedIn often lacks fine-grained language filters. This extension helps multilingual job seekers efficiently filter job postings by language—saving time and reducing frustration.

🛠️ How It Works
Intercepts LinkedIn’s API responses or observes the DOM.

Extracts job title and description text.

Runs a language detection algorithm.

Hides job posts in other languages other than given.

🔧 Installation
Clone or download the repo.

Open Chrome and go to chrome://extensions.

Enable Developer mode.

Click Load unpacked and select the project folder.

Refresh LinkedIn and watch language tags appear!

📂 File Structure
pgsql
Copy
Edit
├── manifest.json       # Chrome extension metadata
├── scripts/            # Core JS logic (language detection, DOM injection)
├── css/                # Styling for tags
└── views/              # UI components (if any popups/options)
📚 Dependencies
A JavaScript language detection library


🔧 Usage
Once loaded, the extension works automatically. If you deactivate or unload it, the tags disappear.
