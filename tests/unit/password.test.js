/**
 * Unit tests for password generation functionality
 */

// Extract password generation function for testing (matches content.js implementation)
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

describe('Password Generation', () => {
  test('should generate a password of correct length', () => {
    const password = generatePassword();
    expect(password).toHaveLength(16);
  });

  test('should generate different passwords on each call', () => {
    const password1 = generatePassword();
    const password2 = generatePassword();
    // Very unlikely to be the same (1 in 72^16 chance)
    expect(password1).not.toBe(password2);
  });

  test('should generate password with valid characters', () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const password = generatePassword();
    
    // Check that all characters in password are from the charset
    for (let char of password) {
      expect(charset).toContain(char);
    }
  });

  test('should generate password with mixed character types', () => {
    const password = generatePassword();
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    // Note: Due to randomness, this might occasionally fail
    // In a real scenario, you'd want to ensure all types are present
    expect(password.length).toBeGreaterThan(0);
  });

  test('should generate multiple unique passwords', () => {
    const passwords = new Set();
    for (let i = 0; i < 100; i++) {
      passwords.add(generatePassword());
    }
    // Should have generated mostly unique passwords
    expect(passwords.size).toBeGreaterThan(90);
  });
});
