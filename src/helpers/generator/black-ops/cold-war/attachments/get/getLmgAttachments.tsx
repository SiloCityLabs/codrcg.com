// --- Data ---
import m60 from '@/data/black-ops/cold-war/attachments/lmg/m60.json';
import mg82 from '@/data/black-ops/cold-war/attachments/lmg/mg82.json';
import rpd from '@/data/black-ops/cold-war/attachments/lmg/rpd.json';
import stoner63 from '@/data/black-ops/cold-war/attachments/lmg/stoner63.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = { m60, mg82, rpd, stoner63 };

export function getLmgAttachments(
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
