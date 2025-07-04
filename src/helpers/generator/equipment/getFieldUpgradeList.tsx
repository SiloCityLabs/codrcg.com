// --- Data ---
import bo6List from '@/data/black-ops/six/equipment/field_upgrade.json';
import bo6ZombiesList from '@/data/black-ops/six/zombies/field_upgrade.json';
import mw3List from '@/data/modern-warfare/three/equipment/field_upgrade.json';
import mw3ZombiesList from '@/data/modern-warfare/three/zombies/field_upgrade.json';
import vanguardList from '@/data/vanguard/equipment/field_upgrade.json';
import vanguardZombieList from '@/data/vanguard/zombies/artifacts.json';
import coldWarZombieList from '@/data/black-ops/cold-war/zombies/field_upgrade.json';
import coldWarList from '@/data/black-ops/cold-war/equipment/field_upgrade.json';
import ww2List from '@/data/world-war-two/zombies/special.json';
import mw2List from '@/data/modern-warfare/two/equipment/field_upgrade.json';
// --- Types ---
import { ItemList } from '@/types/Generator';

const equipment: Record<string, ItemList> = {
  'black-ops-six': bo6List,
  'black-ops-six-zombies': bo6ZombiesList,
  'modern-warfare-three': mw3List,
  'modern-warfare-three-zombies': mw3ZombiesList,
  vanguard: vanguardList,
  'vanguard-zombies': vanguardZombieList,
  'cold-war-zombies': coldWarZombieList,
  'cold-war': coldWarList,
  'world-war-two-zombies': ww2List,
  'modern-warfare-two': mw2List,
};

export function getFieldUpgradeList(game: string): ItemList {
  return equipment[game] || {};
}
