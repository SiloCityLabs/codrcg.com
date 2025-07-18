// --- Data ---
import bo6List from '@/data/black-ops/six/streaks.json';
import mw3List from '@/data/modern-warfare/three/streaks.json';
import vanguardList from '@/data/vanguard/streaks.json';
import bo3List from '@/data/black-ops/three/streaks.json';
import bo4List from '@/data/black-ops/four/streaks.json';
import coldWarList from '@/data/black-ops/cold-war/streaks.json';
import ww2List from '@/data/world-war-two/streaks.json';
import mw2List from '@/data/modern-warfare/two/streaks.json';
import iwList from '@/data/infinite-warfare/streaks.json';
// --- Types ---
import { Streak } from '@/types/Generator';

type ItemList = Streak[] | Record<string, Streak>;

const streaks: Record<string, ItemList> = {
  'black-ops-six': bo6List,
  'modern-warfare-three': mw3List,
  vanguard: vanguardList,
  'black-ops-three': bo3List,
  'black-ops-four': bo4List,
  'cold-war': coldWarList,
  'world-war-two': ww2List,
  'modern-warfare-two': mw2List,
  'infinite-warfare': iwList,
};

export function getStreakList(game: string): ItemList {
  return streaks[game] || {};
}
