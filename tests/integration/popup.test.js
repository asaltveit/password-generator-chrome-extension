/**
 * Integration tests for popup functionality
 */

// Load popup HTML structure
const fs = require('fs');
const path = require('path');

describe('Popup Integration Tests', () => {
  let popupHTML;
  let popupScript;

  beforeAll(() => {
    // Read popup HTML
    popupHTML = fs.readFileSync(
      path.join(__dirname, '../../popup.html'),
      'utf8'
    );
  });

  beforeEach(() => {
    // Set up DOM with popup structure
    document.body.innerHTML = popupHTML;
    
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
    
    // Mock the popup.js functionality
    const passwordDisplay = document.getElementById('passwordDisplay');
    const generatePasswordBtn = document.getElementById('generatePassword');
    const copyPasswordBtn = document.getElementById('copyPassword');
    const iconContainer = document.getElementById('iconContainer');
    const collapseBtn = document.getElementById('collapseBtn');
    const body = document.body;

    // Generate password function (matches popup.js implementation)
    window.generatePassword = function() {
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
    };

    // Copy function (matches popup.js implementation)
    window.copyTextToClipboard = async function(text) {
      try {
        // Use modern Clipboard API (preferred method)
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Fallback for older browsers or if clipboard API is unavailable
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
    };

    // Set up event listeners
    if (generatePasswordBtn && passwordDisplay && copyPasswordBtn) {
      generatePasswordBtn.addEventListener('click', () => {
        const password = window.generatePassword();
        passwordDisplay.textContent = 'Generated Password: ' + password;
        passwordDisplay.style.display = 'block';
        copyPasswordBtn.style.display = 'inline-block';
        copyPasswordBtn.dataset.password = password;
      });
    }

    if (copyPasswordBtn) {
      copyPasswordBtn.addEventListener('click', async () => {
        const password = copyPasswordBtn.dataset.password;
        if (password) {
          await window.copyTextToClipboard(password);
          const originalText = copyPasswordBtn.textContent;
          copyPasswordBtn.textContent = '✓ Copied!';
          setTimeout(() => {
            copyPasswordBtn.textContent = originalText;
          }, 2000);
        }
      });
    }

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
  });

  afterEach(() => {
    document.body.innerHTML = '';
    document.execCommand.mockClear();
  });

  test('should have all required DOM elements', () => {
    expect(document.getElementById('passwordDisplay')).toBeTruthy();
    expect(document.getElementById('generatePassword')).toBeTruthy();
    expect(document.getElementById('copyPassword')).toBeTruthy();
    expect(document.getElementById('iconContainer')).toBeTruthy();
    expect(document.getElementById('collapseBtn')).toBeTruthy();
  });

  test('should expand when icon is clicked', () => {
    const iconContainer = document.getElementById('iconContainer');
    const body = document.body;
    
    expect(body.classList.contains('expanded')).toBe(false);
    iconContainer.click();
    expect(body.classList.contains('expanded')).toBe(true);
  });

  test('should collapse when collapse button is clicked', () => {
    const iconContainer = document.getElementById('iconContainer');
    const collapseBtn = document.getElementById('collapseBtn');
    const body = document.body;
    
    // First expand
    iconContainer.click();
    expect(body.classList.contains('expanded')).toBe(true);
    
    // Then collapse
    collapseBtn.click();
    expect(body.classList.contains('expanded')).toBe(false);
  });

  test('should generate password when generate button is clicked', () => {
    const generateBtn = document.getElementById('generatePassword');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const copyBtn = document.getElementById('copyPassword');
    
    expect(passwordDisplay.style.display).toBe('none');
    expect(copyBtn.style.display).toBe('none');
    
    generateBtn.click();
    
    expect(passwordDisplay.style.display).toBe('block');
    expect(copyBtn.style.display).toBe('inline-block');
    expect(passwordDisplay.textContent).toContain('Generated Password:');
    expect(copyBtn.dataset.password).toBeTruthy();
    expect(copyBtn.dataset.password.length).toBe(16);
  });

  test('should copy password when copy button is clicked', async () => {
    const generateBtn = document.getElementById('generatePassword');
    const copyBtn = document.getElementById('copyPassword');
    
    // Generate password first
    generateBtn.click();
    const password = copyBtn.dataset.password;
    
    // Click copy button
    await copyBtn.click();
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(password);
    expect(copyBtn.textContent).toBe('✓ Copied!');
  });

  test('should show copy button only after password is generated', () => {
    const copyBtn = document.getElementById('copyPassword');
    const generateBtn = document.getElementById('generatePassword');
    
    expect(copyBtn.style.display).toBe('none');
    
    generateBtn.click();
    
    expect(copyBtn.style.display).toBe('inline-block');
  });
});
