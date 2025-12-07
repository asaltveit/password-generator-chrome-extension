// Create password generator container on page
const passwordContainer = document.createElement('div');
passwordContainer.style.position = 'fixed';
passwordContainer.style.bottom = '20px';
passwordContainer.style.right = '20px';
passwordContainer.style.backgroundColor = '#4CAF50';
passwordContainer.style.color = 'white';
passwordContainer.style.padding = '6px 10px';
passwordContainer.style.borderRadius = '6px';
passwordContainer.style.fontSize = '16px';
passwordContainer.style.zIndex = '10000';
passwordContainer.style.display = 'flex';
passwordContainer.style.alignItems = 'center';
passwordContainer.style.justifyContent = 'center';
passwordContainer.style.gap = '10px';
passwordContainer.style.flexDirection = 'column';
passwordContainer.style.width = '40px';
passwordContainer.style.height = '32px';
passwordContainer.style.cursor = 'pointer';
document.body.appendChild(passwordContainer);

// Create minimized icon display (key and die)
const minimizedIcons = document.createElement('div');
minimizedIcons.style.display = 'flex';
minimizedIcons.style.alignItems = 'center';
minimizedIcons.style.justifyContent = 'center';
minimizedIcons.style.gap = '2px';
minimizedIcons.style.width = '100%';
minimizedIcons.style.height = '100%';

// Key icon SVG
const keyIcon = document.createElement('div');
keyIcon.innerHTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="3" stroke="white" stroke-width="2" fill="none"/>
    <path d="M11 8l6-6 4 4-6 6-4-4z" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 2l4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>
`;
keyIcon.style.display = 'flex';
keyIcon.style.alignItems = 'center';
keyIcon.style.justifyContent = 'center';

// Die icon SVG
const dieIcon = document.createElement('div');
dieIcon.innerHTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18C6.67 18 6 17.33 6 16.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>
  </svg>
`;
dieIcon.style.display = 'flex';
dieIcon.style.alignItems = 'center';
dieIcon.style.justifyContent = 'center';

minimizedIcons.appendChild(dieIcon);
minimizedIcons.appendChild(keyIcon);
passwordContainer.appendChild(minimizedIcons);

// Create minimize button (initially hidden)
const minimizeBtn = document.createElement('button');
minimizeBtn.textContent = '✕';
minimizeBtn.style.position = 'absolute';
minimizeBtn.style.top = '3px';
minimizeBtn.style.right = '3px';
minimizeBtn.style.padding = '2px 6px';
minimizeBtn.style.fontSize = '10px';
minimizeBtn.style.border = 'none';
minimizeBtn.style.borderRadius = '3px';
minimizeBtn.style.cursor = 'pointer';
minimizeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
minimizeBtn.style.color = 'white';
minimizeBtn.style.fontWeight = 'bold';
minimizeBtn.style.display = 'none';
minimizeBtn.style.lineHeight = '1';
minimizeBtn.title = 'Minimize';
passwordContainer.appendChild(minimizeBtn);

// Create expandable content container (initially hidden)
const expandableContent = document.createElement('div');
expandableContent.id = 'expandableContent';
expandableContent.style.display = 'none';
//expandableContent.style.paddingTop = '25px';
passwordContainer.appendChild(expandableContent);

// Create password display (initially hidden)
const passwordDisplay = document.createElement('div');
passwordDisplay.style.display = 'none';
expandableContent.appendChild(passwordDisplay);

// Create button container for horizontal layout
const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.gap = '10px';
buttonContainer.style.justifyContent = 'center';
expandableContent.appendChild(buttonContainer);

// Create generate button
const generateBtn = document.createElement('button');
generateBtn.textContent = 'Generate Password';
generateBtn.style.padding = '8px 16px';
generateBtn.style.borderRadius = '4px';
generateBtn.style.border = 'none';
generateBtn.style.cursor = 'pointer';
generateBtn.style.fontSize = '14px';
generateBtn.style.backgroundColor = 'white';
generateBtn.style.color = '#4CAF50';
generateBtn.style.fontWeight = 'bold';
buttonContainer.appendChild(generateBtn);

// Create copy button (initially hidden)
const copyBtn = document.createElement('button');
copyBtn.textContent = '📋 Copy';
copyBtn.style.padding = '8px 16px';
copyBtn.style.borderRadius = '4px';
copyBtn.style.border = 'none';
copyBtn.style.cursor = 'pointer';
copyBtn.style.fontSize = '14px';
copyBtn.style.backgroundColor = 'white';
copyBtn.style.color = '#4CAF50';
copyBtn.style.fontWeight = 'bold';
copyBtn.style.display = 'none';
buttonContainer.appendChild(copyBtn);

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

// Copy text to clipboard using modern Clipboard API with fallback
async function copyTextToClipboard(text) {
  try {
    // Use modern Clipboard API (preferred method)
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for content scripts where clipboard API might be restricted
    // Some pages may block clipboard access, so we use the fallback method
    console.warn('Clipboard API failed, using fallback:', err);
    const copyFrom = document.createElement('textarea');
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

// Generate password on button click
generateBtn.addEventListener('click', () => {
  const password = generatePassword();
  passwordDisplay.textContent = 'Generated Password: ' + password;
  passwordDisplay.style.display = 'block';
  copyBtn.style.display = 'inline-block';
  copyBtn.dataset.password = password;
});

// Copy password on copy button click
copyBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  const password = copyBtn.dataset.password;
  if (password) {
    await copyTextToClipboard(password);
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 1000);
  }
});

// Minimize/expand functionality
let isMinimized = true;

function expandContainer() {
  isMinimized = false;
  expandableContent.style.display = 'block';
  minimizedIcons.style.display = 'none';
  minimizeBtn.style.display = 'block';
  passwordContainer.style.padding = '15px 20px';
  passwordContainer.style.width = 'auto';
  passwordContainer.style.height = 'auto';
  passwordContainer.style.cursor = 'default';
}

function minimizeContainer() {
  isMinimized = true;
  expandableContent.style.display = 'none';
  minimizedIcons.style.display = 'flex';
  minimizeBtn.style.display = 'none';
  passwordContainer.style.padding = '6px 10px';
  passwordContainer.style.width = '40px';
  passwordContainer.style.height = '32px';
  passwordContainer.style.cursor = 'pointer';
}

// Click on container to expand when minimized
passwordContainer.addEventListener('click', (e) => {
  if (isMinimized && (e.target === passwordContainer || minimizedIcons.contains(e.target))) {
    expandContainer();
  }
});

// Minimize button click
minimizeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  minimizeContainer();
});

// Minimize when clicking outside the container
document.addEventListener('click', (e) => {
  if (!isMinimized && !passwordContainer.contains(e.target)) {
    minimizeContainer();
  }
});
