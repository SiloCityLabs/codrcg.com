// --- Data ---
import perk1 from '@/data/world-at-war/perk/perk1.json';
import perk2 from '@/data/world-at-war/perk/perk2.json';
import perk3 from '@/data/world-at-war/perk/perk3.json';
import vehiclePerk from '@/data/world-at-war/perk/vehicle-perk.json';
// --- Utils ---
import { randomListItem } from '@silocitypages/utils';
// --- Types ---
import { ItemList } from '@/types/Generator';

const data: Record<string, ItemList> = {
  perk1: perk1,
  perk2: perk2,
  perk3: perk3,
  'vehicle-perk': vehiclePerk,
};

export function fetchPerk(perk: string, currentPerk: string = ''): string {
  let randPerk: string;
  do {
    randPerk = randomListItem(data[perk]).name;
  } while (currentPerk === randPerk);

  return randPerk;
}
