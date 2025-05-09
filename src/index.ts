import { fetchData } from './fetchData';
import { generateRecommendations } from './recommendations';

(async () => {
  const { members, jobs } = await fetchData();
  generateRecommendations(members, jobs);
})();