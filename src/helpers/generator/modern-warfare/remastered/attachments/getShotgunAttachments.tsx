// --- Data ---
import default1 from '@/data/modern-warfare/remastered/attachments/shotgun/default1.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, string[]> = { w1200: default1, m1014: default1 };

export function getShotgunAttachments(gun: string, count: number): string[] {
  const attachments: string[] = [];
  const data = attachmentsList[gun];

  if (data) {
    if (count === -1) {
      return data;
    }

    randomizeAttachments(attachments, data, count);
  }

  return attachments;
}
