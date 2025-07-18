// --- Data ---
import g43 from '@/data/vanguard/attachments/marksman_rifle/g43.json';
import m1garand from '@/data/vanguard/attachments/marksman_rifle/m1garand.json';
import m1916 from '@/data/vanguard/attachments/marksman_rifle/m1916.json';
import svt40 from '@/data/vanguard/attachments/marksman_rifle/svt40.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = { g43, m1garand, m1916, svt40 };

export function getMarksmanRifleAttachments(
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
