// Jest setup file for Chrome extension testing

// Mock Chrome APIs
global.chrome = {
  storage: {
    local: {
      get: jest.fn((keys, callback) => {
        if (callback) callback({});
      }),
      set: jest.fn((items, callback) => {
        if (callback) callback();
      }),
      remove: jest.fn((keys, callback) => {
        if (callback) callback();
      })
    },
    sync: {
      get: jest.fn((keys, callback) => {
        if (callback) callback({});
      }),
      set: jest.fn((items, callback) => {
        if (callback) callback();
      })
    }
  },
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    }
  }
};

// Mock document.execCommand for clipboard operations
document.execCommand = jest.fn(() => true);

// Mock clipboard API if available
if (navigator.clipboard) {
  navigator.clipboard.writeText = jest.fn(() => Promise.resolve());
}
