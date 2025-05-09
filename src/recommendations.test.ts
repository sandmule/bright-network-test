import { describe, it, expect } from 'vitest';
import { scoreMatch } from './recommendations';

describe('scoreMatch', () => {
  const job = {
    title: 'Software Engineer',
    location: 'London',
  };

  it('gives high score for matching keywords and location', () => {
    const member = {
      name: 'Alice',
      bio: 'I am a software developer based in London.',
    };

    const score = scoreMatch(member, job);
    expect(score).toBeGreaterThanOrEqual(3); // 2 for keyword, 1 for location
  });

  it('gives lower score when only keywords match', () => {
    const member = {
      name: 'Bob',
      bio: 'Looking for a software or engineering position.',
    };

    const score = scoreMatch(member, job);
    expect(score).toBe(2); // keywords only
  });

  it('gives 0 score when no match', () => {
    const member = {
      name: 'Charlie',
      bio: 'Passionate about farming and agriculture.',
    };

    const score = scoreMatch(member, job);
    expect(score).toBe(0);
  });
});
