// --- Data ---
import default1 from '@/data/modern-warfare/remastered/attachments/smg/default1.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, string[]> = {
  mp5: default1,
  skorpion: default1,
  miniuzi: default1,
  ak74u: default1,
  p90: default1,
  mac10: default1,
  fang45: default1,
};

export function getSmgAttachments(gun: string, count: number) {
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
