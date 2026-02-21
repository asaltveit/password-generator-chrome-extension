# Password Generator Chrome Extension

This Chrome extension generates secure random passwords in two places: in a popup (when you click the extension icon) and in a floating widget on any webpage. Passwords are 16 characters, use mixed case, numbers, and symbols, and can be copied to the clipboard with one click.

## Features

- **Popup**: Click the extension icon to open a compact popup. Generate a password and copy it to the clipboard. The popup starts as an icon; click to expand, then use the close button or click outside to collapse.
- **Page widget**: A small floating box (key + die icons) appears in the bottom-right corner of every page. Click it to expand, then use **Generate Password** and **Copy** just like in the popup. Click the ✕ or click outside to minimize.
- **Secure generation**: Uses `crypto.getRandomValues` for cryptographically secure randomness.
- **Clipboard**: Copy via the modern Clipboard API with an `execCommand('copy')` fallback when the API is restricted (e.g. in some content script contexts).

## How It Works

1. **Popup**  
   - Popup UI is in `popup.html`; logic in `popup.js`.  
   - Collapsed by default (icon only). Click the icon to show **Generate Password** and **Copy**.  
   - Generate creates a 16-character password (letters, numbers, `!@#$%^&*`). Copy writes it to the clipboard and shows “✓ Copied!” feedback.

2. **Page widget**  
   - Injected by the content script (`content.js`) on all pages.  
   - Minimized: small green box with key + die icons in the bottom-right.  
   - Expanded: same Generate/Copy controls as the popup, plus a minimize (✕) button.  
   - Minimize by clicking ✕ or clicking outside the widget.  
   - Same password algorithm and clipboard behavior (with fallback) as the popup.

## How to Load the Extension

1. Open Chrome and go to `chrome://extensions/`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the folder that contains the extension (e.g. `chrome-extension-1`).
4. Open any webpage — you should see the floating widget in the bottom-right.
5. Click the extension icon to use the popup, or click the widget on the page to generate and copy passwords from there.

## File Structure

```
chrome-extension-1/
├── manifest.json          # Extension manifest (name, permissions, popup, content script)
├── popup.html             # Popup UI (collapsible icon + generate/copy)
├── popup.js               # Popup logic: generate password, copy, expand/collapse
├── content.js             # Content script: page widget UI and same generate/copy logic
├── jest.config.js         # Jest test configuration
├── package.json           # Node scripts and dependencies
├── assets/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── tests/                 # Test suite
    ├── setup.js           # Jest setup with Chrome API mocks
    ├── unit/              # Unit tests (password generation, clipboard)
    │   ├── password.test.js
    │   └── clipboard.test.js
    ├── integration/       # Integration tests (popup and content script UI)
    │   ├── popup.test.js
    │   └── content.test.js
    ├── utils/             # Test utilities
    │   └── test-helpers.js
    └── README.md          # Test documentation
```
