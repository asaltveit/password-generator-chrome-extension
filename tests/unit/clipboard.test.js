/**
 * Unit tests for clipboard functionality
 */

// Extract clipboard function for testing (matches content.js implementation)
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

describe('Clipboard Operations', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.execCommand.mockClear();
    
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
  });

  test('should use Clipboard API when available', async () => {
    await copyTextToClipboard('test password');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test password');
    expect(document.execCommand).not.toHaveBeenCalled();
  });

  test('should fallback to execCommand when Clipboard API fails', async () => {
    // Mock Clipboard API to fail
    navigator.clipboard.writeText = jest.fn().mockRejectedValue(new Error('Clipboard API failed'));
    
    await copyTextToClipboard('test password');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test password');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('should clean up textarea after fallback copy', async () => {
    // Mock Clipboard API to fail
    navigator.clipboard.writeText = jest.fn().mockRejectedValue(new Error('Clipboard API failed'));
    
    await copyTextToClipboard('test password');
    // Textarea should be removed from DOM
    const textarea = document.querySelector('textarea');
    expect(textarea).toBeNull();
  });

  test('should handle empty string', async () => {
    await copyTextToClipboard('');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });

  test('should handle special characters', async () => {
    const specialText = '!@#$%^&*()';
    await copyTextToClipboard(specialText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(specialText);
  });
});
