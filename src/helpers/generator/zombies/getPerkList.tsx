// --- Utils ---
import { mergeObjectsWithRekey } from '@silocitypages/utils';
// --- Black Ops 4 Zombies ---
import bo4List from '@/data/black-ops/four/zombies/perks.json';
// --- World War 2 ---
import ww2CamouflageList from '@/data/world-war-two/zombies/mods/camouflage.json';
import ww2FreefireList from '@/data/world-war-two/zombies/mods/freefire.json';
import ww2FrontlineList from '@/data/world-war-two/zombies/mods/frontline.json';
import ww2ShellshockList from '@/data/world-war-two/zombies/mods/shellshock.json';
import ww2UniversalList from '@/data/world-war-two/zombies/mods/universal.json';
// --- Types ---
import { ItemList } from '@/types/Generator';

const list: Record<string, ItemList> = {
  'black-ops-four-zombies': bo4List,
  'world-war-two-zombies': mergeObjectsWithRekey(
    ww2UniversalList,
    ww2CamouflageList,
    ww2FreefireList,
    ww2FrontlineList,
    ww2ShellshockList
  ),
  'world-war-two-zombies-camouflage': mergeObjectsWithRekey(ww2UniversalList, ww2CamouflageList),
  'world-war-two-zombies-freefire': mergeObjectsWithRekey(ww2UniversalList, ww2FreefireList),
  'world-war-two-zombies-frontline': mergeObjectsWithRekey(ww2UniversalList, ww2FrontlineList),
  'world-war-two-zombies-shellshock': mergeObjectsWithRekey(ww2UniversalList, ww2ShellshockList),
};

export function getPerkList(game: string): ItemList {
  return list[game] || {};
}
