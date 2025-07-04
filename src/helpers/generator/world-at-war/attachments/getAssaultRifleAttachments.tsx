// --- Data ---
import default1 from '@/data/world-at-war/attachments/assault_rifle/default.json';
import gewehr43 from '@/data/world-at-war/attachments/assault_rifle/gewehr43.json';
import m1garand from '@/data/world-at-war/attachments/assault_rifle/m1garand.json';
import m1a1carbine from '@/data/world-at-war/attachments/assault_rifle/m1a1carbine.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, string[]> = {
  svt40: default1,
  gewehr43,
  m1garand,
  stg44: default1,
  m1a1carbine,
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
