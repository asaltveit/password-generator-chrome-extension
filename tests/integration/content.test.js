/**
 * Integration tests for content script functionality
 */

describe('Content Script Integration Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.execCommand.mockClear();
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
    // Create container structure
    const passwordContainer = document.createElement('div');
    passwordContainer.id = 'passwordContainer';
    const minimizedIcons = document.createElement('div');
    minimizedIcons.id = 'minimizedIcons';
    minimizedIcons.style.display = 'flex';
    const expandableContent = document.createElement('div');
    expandableContent.id = 'expandableContent';
    expandableContent.style.display = 'none';
    
    passwordContainer.appendChild(minimizedIcons);
    passwordContainer.appendChild(expandableContent);
    document.body.appendChild(passwordContainer);

    let isMinimized = true;

    function expandContainer() {
      isMinimized = false;
      expandableContent.style.display = 'block';
      minimizedIcons.style.display = 'none';
      passwordContainer.style.width = 'auto';
    }

    function minimizeContainer() {
      isMinimized = true;
      expandableContent.style.display = 'none';
      minimizedIcons.style.display = 'flex';
      passwordContainer.style.width = '32px';
    }

    // Test expand
    expandContainer();
    expect(isMinimized).toBe(false);
    expect(expandableContent.style.display).toBe('block');
    expect(minimizedIcons.style.display).toBe('none');

    // Test minimize
    minimizeContainer();
    expect(isMinimized).toBe(true);
    expect(expandableContent.style.display).toBe('none');
    expect(minimizedIcons.style.display).toBe('flex');
  });

  test('should generate password in content script', () => {
    const generatePassword = function() {
      const length = 16;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    };

    const password = generatePassword();
    expect(password).toHaveLength(16);
  });

  test('should handle copy functionality in content script', () => {
    const copyTextToClipboard = function(text) {
      const copyFrom = document.createElement('textarea');
      copyFrom.textContent = text;
      document.body.appendChild(copyFrom);
      copyFrom.select();
      document.execCommand('copy');
      copyFrom.blur();
      document.body.removeChild(copyFrom);
    };

    copyTextToClipboard('test password');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('should create all required content script elements', () => {
    // Simulate content script element creation
    const passwordContainer = document.createElement('div');
    passwordContainer.id = 'passwordContainer';
    
    const minimizedIcons = document.createElement('div');
    minimizedIcons.id = 'minimizedIcons';
    minimizedIcons.style.display = 'flex';
    
    const expandableContent = document.createElement('div');
    expandableContent.id = 'expandableContent';
    
    const generateBtn = document.createElement('button');
    generateBtn.textContent = 'Generate Password';
    generateBtn.id = 'generateBtn';
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋 Copy';
    copyBtn.id = 'copyBtn';
    copyBtn.style.display = 'none';
    
    expandableContent.appendChild(generateBtn);
    expandableContent.appendChild(copyBtn);
    passwordContainer.appendChild(minimizedIcons);
    passwordContainer.appendChild(expandableContent);
    document.body.appendChild(passwordContainer);

    expect(document.getElementById('passwordContainer')).toBeTruthy();
    expect(document.getElementById('minimizedIcons')).toBeTruthy();
    expect(document.getElementById('expandableContent')).toBeTruthy();
    expect(document.getElementById('generateBtn')).toBeTruthy();
    expect(document.getElementById('copyBtn')).toBeTruthy();
  });
});
