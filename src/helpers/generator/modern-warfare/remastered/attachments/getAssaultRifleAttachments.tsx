// --- Data ---
import default1 from '@/data/modern-warfare/remastered/attachments/assault_rifle/default1.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, string[]> = {
  m16a4: default1,
  ak47: default1,
  m4carbine: default1,
  g3: default1,
  g36c: default1,
  m14: default1,
  xmlar: default1,
  bos14: default1,
};

export function getAssaultRifleAttachments(gun: string, count: number): string[] {
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
