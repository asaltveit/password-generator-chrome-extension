/**
 * Test helper utilities
 */

/**
 * Creates a mock DOM element with specified attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Object with attribute key-value pairs
 * @param {string} textContent - Text content for the element
 * @returns {HTMLElement}
 */
function createMockElement(tag, attributes = {}, textContent = '') {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(key => {
    if (key === 'style' && typeof attributes[key] === 'object') {
      Object.assign(element.style, attributes[key]);
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

/**
 * Simulates a click event on an element
 * @param {HTMLElement} element - Element to click
 */
function simulateClick(element) {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  element.dispatchEvent(event);
}

/**
 * Waits for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a mock password generator function
 * @param {number} length - Password length
 * @param {string} charset - Character set to use
 * @returns {Function}
 */
function createMockPasswordGenerator(length = 16, charset = null) {
  const defaultCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  return function() {
    const chars = charset || defaultCharset;
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
}

/**
 * Resets the DOM to a clean state
 */
function resetDOM() {
  document.body.innerHTML = '';
  if (document.execCommand && document.execCommand.mockClear) {
    document.execCommand.mockClear();
  }
}

module.exports = {
  createMockElement,
  simulateClick,
  wait,
  createMockPasswordGenerator,
  resetDOM
};
