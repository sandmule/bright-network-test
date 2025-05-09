import axios from 'axios';
import { Job, Member } from './recommendations.models';

const MEMBERS_URL = 'https://bn-hiring-challenge.fly.dev/members.json';
const JOBS_URL = 'https://bn-hiring-challenge.fly.dev/jobs.json';

export async function fetchData(): Promise<{ members: Member[]; jobs: Job[] }> {
  try {
    const [membersRes, jobsRes] = await Promise.all([
      axios.get(MEMBERS_URL),
      axios.get(JOBS_URL),
    ]);

    const membersRaw = membersRes.data;
    const jobsRaw = jobsRes.data;

    const members = membersRaw.filter(
      (m: any) => typeof m.name === 'string' && typeof m.bio === 'string'
    );
    const jobs = jobsRaw.filter(
      (j: any) => typeof j.title === 'string' && typeof j.location === 'string'
    );

    if (members.length !== membersRaw.length) {
      console.warn(`⚠️ Some members were skipped due to invalid structure.`);
    }

    if (jobs.length !== jobsRaw.length) {
      console.warn(`⚠️ Some jobs were skipped due to invalid structure.`);
    }

    return { members, jobs };
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    process.exit(1);
  }
}