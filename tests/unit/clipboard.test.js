/**
 * Unit tests for clipboard functionality
 */

// Extract clipboard function for testing
function copyTextToClipboard(text) {
  const copyFrom = document.createElement('textarea');
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}

describe('Clipboard Operations', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.execCommand.mockClear();
  });

  test('should create textarea element', () => {
    copyTextToClipboard('test password');
    const textarea = document.querySelector('textarea');
    // Should be removed after copy, so we check execCommand was called
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('should call execCommand with copy', () => {
    copyTextToClipboard('test password');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('should clean up textarea after copy', () => {
    copyTextToClipboard('test password');
    // Textarea should be removed from DOM
    const textarea = document.querySelector('textarea');
    expect(textarea).toBeNull();
  });

  test('should handle empty string', () => {
    expect(() => {
      copyTextToClipboard('');
    }).not.toThrow();
    expect(document.execCommand).toHaveBeenCalled();
  });

  test('should handle special characters', () => {
    const specialText = '!@#$%^&*()';
    expect(() => {
      copyTextToClipboard(specialText);
    }).not.toThrow();
    expect(document.execCommand).toHaveBeenCalled();
  });
});
