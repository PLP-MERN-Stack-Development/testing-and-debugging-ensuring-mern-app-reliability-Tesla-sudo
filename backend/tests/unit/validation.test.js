import { validateBugInput } from '../../controllers/bugController.js';

describe('Bug Validation', () => {
  test('should return isValid: true for valid input', () => {
    const result = validateBugInput({
      title: 'Login fails',
      description: 'Cannot log in with valid credentials',
      reportedBy: 'John Doe'
    });
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should catch short title', () => {
    const result = validateBugInput({
      title: 'Hi',
      description: 'Test',
      reportedBy: 'Jane'
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Title must be at least 3 characters');
  });
});