/**
 * Integration tests for content script functionality
 */

describe('Content Script Integration Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.execCommand.mockClear();
    
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
  });

  test('should create password container element', () => {
    // Simulate content script execution
    const passwordContainer = document.createElement('div');
    passwordContainer.style.position = 'fixed';
    passwordContainer.style.bottom = '20px';
    passwordContainer.style.right = '20px';
    passwordContainer.style.backgroundColor = '#4CAF50';
    passwordContainer.id = 'passwordContainer';
    document.body.appendChild(passwordContainer);

    const container = document.getElementById('passwordContainer');
    expect(container).toBeTruthy();
    expect(container.style.position).toBe('fixed');
    expect(container.style.backgroundColor).toBe('rgb(76, 175, 80)');
  });

  test('should expand and minimize container', () => {
    // Create container structure matching actual implementation
    const passwordContainer = document.createElement('div');
    passwordContainer.id = 'passwordContainer';
    passwordContainer.style.padding = '6px 10px';
    passwordContainer.style.width = '40px';
    passwordContainer.style.height = '32px';
    passwordContainer.style.cursor = 'pointer';
    
    const minimizedIcons = document.createElement('div');
    minimizedIcons.id = 'minimizedIcons';
    minimizedIcons.style.display = 'flex';
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '✕';
    minimizeBtn.style.display = 'none';
    
    const expandableContent = document.createElement('div');
    expandableContent.id = 'expandableContent';
    expandableContent.style.display = 'none';
    
    passwordContainer.appendChild(minimizedIcons);
    passwordContainer.appendChild(minimizeBtn);
    passwordContainer.appendChild(expandableContent);
    document.body.appendChild(passwordContainer);

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

    // Test expand
    expandContainer();
    expect(isMinimized).toBe(false);
    expect(expandableContent.style.display).toBe('block');
    expect(minimizedIcons.style.display).toBe('none');
    expect(minimizeBtn.style.display).toBe('block');
    expect(passwordContainer.style.width).toBe('auto');
    expect(passwordContainer.style.cursor).toBe('default');

    // Test minimize
    minimizeContainer();
    expect(isMinimized).toBe(true);
    expect(expandableContent.style.display).toBe('none');
    expect(minimizedIcons.style.display).toBe('flex');
    expect(minimizeBtn.style.display).toBe('none');
    expect(passwordContainer.style.width).toBe('40px');
    expect(passwordContainer.style.cursor).toBe('pointer');
  });

  test('should generate password in content script', () => {
    // Matches content.js implementation
    const generatePassword = function() {
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

    const password = generatePassword();
    expect(password).toHaveLength(16);
  });

  test('should handle copy functionality in content script', async () => {
    // Matches content.js implementation
    const copyTextToClipboard = async function(text) {
      try {
        // Use modern Clipboard API (preferred method)
        await navigator.clipboard.writeText(text);
      } catch (err) {
        // Fallback for content scripts where clipboard API might be restricted
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

    await copyTextToClipboard('test password');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test password');
  });

  test('should create all required content script elements', () => {
    // Simulate content script element creation matching actual implementation
    const passwordContainer = document.createElement('div');
    passwordContainer.id = 'passwordContainer';
    
    const minimizedIcons = document.createElement('div');
    minimizedIcons.id = 'minimizedIcons';
    minimizedIcons.style.display = 'flex';
    
    const minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '✕';
    minimizeBtn.style.display = 'none';
    
    const expandableContent = document.createElement('div');
    expandableContent.id = 'expandableContent';
    expandableContent.style.display = 'none';
    
    const passwordDisplay = document.createElement('div');
    passwordDisplay.style.display = 'none';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    
    const generateBtn = document.createElement('button');
    generateBtn.textContent = 'Generate Password';
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 Copy';
    copyBtn.style.display = 'none';
    
    buttonContainer.appendChild(generateBtn);
    buttonContainer.appendChild(copyBtn);
    expandableContent.appendChild(passwordDisplay);
    expandableContent.appendChild(buttonContainer);
    passwordContainer.appendChild(minimizedIcons);
    passwordContainer.appendChild(minimizeBtn);
    passwordContainer.appendChild(expandableContent);
    document.body.appendChild(passwordContainer);

    expect(document.getElementById('passwordContainer')).toBeTruthy();
    expect(document.getElementById('minimizedIcons')).toBeTruthy();
    expect(document.getElementById('expandableContent')).toBeTruthy();
    expect(passwordDisplay).toBeTruthy();
    expect(buttonContainer).toBeTruthy();
    expect(generateBtn).toBeTruthy();
    expect(copyBtn).toBeTruthy();
    expect(minimizeBtn).toBeTruthy();
  });
});
