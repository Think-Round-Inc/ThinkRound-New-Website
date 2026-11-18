import { describe, expect, it } from 'vitest';
import { isRateLimited, submitContactForm } from './lib';

function post(body: string, ip: string) {
  return new Request('http://localhost/api/forms/contact', {
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body,
  });
}

describe('submitContactForm', () => {
  it('returns 400 for malformed JSON', async () => {
    const res = await submitContactForm(post('{not json', '10.0.0.1'), 'contact');
    expect(res.status).toBe(400);
  });

  it('returns 400 for a JSON body that is not an object', async () => {
    const res = await submitContactForm(post('null', '10.0.0.2'), 'contact');
    expect(res.status).toBe(400);
  });

  it('returns 429 after too many submissions from one IP', async () => {
    for (let i = 0; i < 5; i++) {
      const res = await submitContactForm(post('{', '10.0.0.3'), 'contact');
      expect(res.status).toBe(400);
    }
    const res = await submitContactForm(post('{', '10.0.0.3'), 'contact');
    expect(res.status).toBe(429);

    const otherIp = await submitContactForm(post('{', '10.0.0.4'), 'contact');
    expect(otherIp.status).toBe(400);
  });
});

describe('isRateLimited', () => {
  it('resets after the window passes', () => {
    const start = 1_000_000;
    for (let i = 0; i < 5; i++) expect(isRateLimited('k', start)).toBe(false);
    expect(isRateLimited('k', start)).toBe(true);
    expect(isRateLimited('k', start + 10 * 60 * 1000)).toBe(false);
  });
});
