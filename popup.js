const passwordDisplay = document.getElementById('passwordDisplay');
const generatePasswordBtn = document.getElementById('generatePassword');
const copyPasswordBtn = document.getElementById('copyPassword');
const iconContainer = document.getElementById('iconContainer');
const collapseBtn = document.getElementById('collapseBtn');
const body = document.body;

// Expand/collapse functionality
if (iconContainer) {
  iconContainer.addEventListener('click', () => {
    body.classList.add('expanded');
  });
}

if (collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    body.classList.remove('expanded');
  });
}

// Collapse when clicking outside the expanded content
const expandedContent = document.getElementById('expandedContent');
if (expandedContent) {
  // Collapse when clicking outside the expandedContent area
  body.addEventListener('click', (e) => {
    if (body.classList.contains('expanded')) {
      // Collapse if clicking outside expandedContent (e.g., on body padding area)
      // Don't collapse if clicking on interactive elements inside expandedContent
      if (!expandedContent.contains(e.target)) {
        body.classList.remove('expanded');
      }
    }
  });
}

// Source - https://stackoverflow.com/a
// Posted by Jeff Gran, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-06, License - CC BY-SA 4.0

// Modern clipboard API using navigator.clipboard
async function copyTextToClipboard(text) {
  try {
    // Use modern Clipboard API (preferred method)
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers or if clipboard API is unavailable
    // This fallback is only used in popup context, which should have clipboard access
    console.warn('Clipboard API failed, using fallback:', err);
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    copyFrom.style.position = 'fixed';
    copyFrom.style.opacity = '0';
    document.body.appendChild(copyFrom);
    copyFrom.select();
    try {
      document.execCommand('copy');
    } catch (fallbackErr) {
      console.error('Fallback copy method also failed:', fallbackErr);
    }
    copyFrom.blur();
    document.body.removeChild(copyFrom);
  }
}

// Generate a random password using cryptographically secure random number generator
function generatePassword() {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const charsetLength = charset.length;
  
  // Use crypto.getRandomValues for cryptographically secure randomness
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  let password = '';
  for (let i = 0; i < length; i++) {
    // Use modulo to map random value to charset index
    password += charset[randomValues[i] % charsetLength];
  }
  return password;
}

// Generate password button click handler
if (generatePasswordBtn && passwordDisplay && copyPasswordBtn) {
  generatePasswordBtn.addEventListener('click', () => {
    const password = generatePassword();
    passwordDisplay.textContent = 'Generated Password: ' + password;
    passwordDisplay.style.display = 'block';
    copyPasswordBtn.style.display = 'inline-block';
    // Store password for clipboard button
    copyPasswordBtn.dataset.password = password;
  });
}

// Copy password button click handler
if (copyPasswordBtn) {
  copyPasswordBtn.addEventListener('click', async () => {
    const password = copyPasswordBtn.dataset.password;
    if (password) {
      await copyTextToClipboard(password);
      // Visual feedback
      const originalText = copyPasswordBtn.textContent;
      copyPasswordBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        copyPasswordBtn.textContent = originalText;
      }, 2000);
    }
  });
}
  
