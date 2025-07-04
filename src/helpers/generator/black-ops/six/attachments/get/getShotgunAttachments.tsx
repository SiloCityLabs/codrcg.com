// --- Data ---
import asg89 from '@/data/black-ops/six/attachments/shotgun/asg89.json';
import marinesp from '@/data/black-ops/six/attachments/shotgun/marineSp.json';
import maelstrom from '@/data/black-ops/six/attachments/shotgun/maelstrom.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = { asg89, marinesp, maelstrom };

export function getShotgunAttachments(
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
