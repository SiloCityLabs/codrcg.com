import perk1 from "@/json/infinite-warfare/perk/perk1.json";
import perk2 from "@/json/infinite-warfare/perk/perk2.json";
import perk3 from "@/json/infinite-warfare/perk/perk3.json";
import { randomListItem } from "@/helpers/_silabs/randomListItem";

const perks: Record<string, any> = {
  perk1: perk1,
  perk2: perk2,
  perk3: perk3,
};

export function fetchPerk(perk: string, currentPerk: string = ""): string {
  let randPerk: string;
  do {
    randPerk = randomListItem(perks[perk]).name;
  } while (currentPerk === randPerk);

  return randPerk;
}
