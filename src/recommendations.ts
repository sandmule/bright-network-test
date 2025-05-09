import { Job, Member } from './recommendations.models';

const keywordMap: Record<string, string[]> = {
  design: ['designer', 'ux', 'ui', 'design'],
  marketing: ['marketing'],
  internship: ['internship', 'intern'],
  software: ['software', 'developer', 'engineer'],
  data: ['data', 'scientist'],
  legal: ['legal', 'law'],
  sales: ['sales'],
  project: ['project', 'manager'],
};

const knownLocations = ['london', 'edinburgh', 'york', 'manchester'];

const tokenize = (text: string): string[] =>
  text.toLowerCase().match(/\b\w+\b/g) || [];

function extractRelevantKeywords(tokens: string[]): Set<string> {
  const found = new Set<string>();

  for (const [key, synonyms] of Object.entries(keywordMap)) {
    if (synonyms.some(word => tokens.includes(word))) {
      found.add(key);
    }
  }

  return found;
}

function extractLocations(tokens: string[]): Set<string> {
  return new Set(tokens.filter(token => knownLocations.includes(token)));
}

export function scoreMatch(member: Member, job: Job): number {
  const bioTokens = tokenize(member.bio);
  const jobTokens = tokenize(job.title + ' ' + job.location);

  const bioKeywords = extractRelevantKeywords(bioTokens);
  const jobKeywords = extractRelevantKeywords(jobTokens);

  const keywordScore = [...bioKeywords].filter(k => jobKeywords.has(k)).length;

  const bioLocations = extractLocations(bioTokens);
  const jobLocation = job.location.toLowerCase();
  const locationScore = bioLocations.has(jobLocation) ? 1 : 0;

  return keywordScore * 2 + locationScore; // weights can be tuned
}

export function generateRecommendations(
  members: Member[],
  jobs: Job[],
  topN: number = 3
): void {
  for (const member of members) {
    const scoredJobs = jobs
      .map(job => ({
        job,
        score: scoreMatch(member, job),
      }))
      .filter(({ score }) => score > 0) // only show relevant matches
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);

    console.log(`\n${member.name}:`);
    if (scoredJobs.length === 0) {
      console.log('  No suitable jobs found.');
    } else {
      for (const { job, score } of scoredJobs) {
        console.log(`  - ${job.title} (${job.location}) [score: ${score}]`);
      }
    }
  }
}