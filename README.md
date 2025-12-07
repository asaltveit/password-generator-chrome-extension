# Hybrid Counter Chrome Extension

This Chrome extension displays a counter both in a popup and directly on any webpage. The counter persists across pages and updates live in all tabs.

## Features

- **Popup Counter**: Click the extension icon to see the counter and increment it.
- **Page Counter**: A counter box appears in the bottom-right corner of every page.
- **Live Sync**: Incrementing in either the popup or on a page updates all counters instantly.
- **Persistent Storage**: Uses Chrome `storage.sync` to save the counter across sessions and tabs.

## How It Works

1. **Popup**  
   - The popup shows the current counter value stored in `chrome.storage.sync`.  
   - Clicking the "Increment" button increases the counter and updates the storage.  

2. **Page Counter**  
   - Injected via a content script (`content.js`) into every page.  
   - Displays a counter box in the bottom-right corner.  
   - Clicking the box increments the counter and updates `chrome.storage.sync`.  
   - Uses `chrome.storage.onChanged` to listen for changes and update the counter live on all pages.

## How to Load the Extension

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select the folder containing this extension.
4. Open any webpage — you should see the counter box in the bottom-right corner.
5. Click the extension icon to open the popup. Both the popup and page counters are synced.
6. Click either the popup button or the on-page counter to increment — the changes appear instantly everywhere.

## File Structure

```
chrome-extension-1/
├── manifest.json          # Extension manifest configuration
├── popup.html             # Popup UI HTML
├── popup.js               # Popup logic and counter handling
├── content.js             # Content script injected into web pages
├── jest.config.js         # Jest test configuration
├── package.json           # Node.js dependencies and scripts
├── assets/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── tests/                 # Test suite
    ├── setup.js           # Jest setup with Chrome API mocks
    ├── unit/              # Unit tests
    │   ├── password.test.js
    │   └── clipboard.test.js
    ├── integration/       # Integration tests
    │   ├── popup.test.js
    │   └── content.test.js
    ├── utils/             # Test utilities
    │   └── test-helpers.js
    └── README.md          # Test documentation
```
