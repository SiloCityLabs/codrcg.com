// --- Data ---
import amp63 from '@/data/black-ops/cold-war/attachments/pistol/amp63.json';
import diamatti from '@/data/black-ops/cold-war/attachments/pistol/diamatti.json';
import magnum from '@/data/black-ops/cold-war/attachments/pistol/magnum.json';
import marshal from '@/data/black-ops/cold-war/attachments/pistol/marshal.json';
import one911 from '@/data/black-ops/cold-war/attachments/pistol/one911.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  amp63,
  diamatti,
  magnum,
  marshal,
  '1911': one911,
};

export function getPistolAttachments(
  gun: string,
  count: number
): Record<string, string> | Record<string, string[]> {
  const attachments: Record<string, string> = {};
  const data = attachmentsList[gun];

  if (data) {
    if (count === -1) {
      return data;
    }

    randomizeAttachments(attachments, data, count);
  }

  return attachments;
}
