import { describe, expect, it } from 'vitest';
import { parseFormPayload } from './validation';

describe('parseFormPayload', () => {
  it('accepts a valid volunteer submission', () => {
    const result = parseFormPayload({
      formType: 'volunteer',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      interest: 'Design',
      message: 'I would like to volunteer.',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('jane@example.com');
      if (result.data.formType === 'volunteer') {
  expect(result.data.interest).toBe('Design');
} else {
  throw new Error('Expected volunteer form data');
}
    }
  });

  it('rejects invalid email addresses', () => {
    const result = parseFormPayload({
      formType: 'subscribe',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'not-an-email',
      subject: 'Newsletter',
      message: 'Hi there',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toContain('email');
    }
  });
});
