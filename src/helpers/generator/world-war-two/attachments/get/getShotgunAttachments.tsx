// --- Data ---
import default1 from '@/data/world-war-two/attachments/shotgun/default1.json';
import m30LuftwaffeDrilling from '@/data/world-war-two/attachments/shotgun/m30LuftwaffeDrilling.json';
import sawedoffShotgun from '@/data/world-war-two/attachments/shotgun/sawedoffShotgun.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, string[]> = {
  combatshotgun: default1,
  toggleaction: default1,
  m30luftwaffedrilling: m30LuftwaffeDrilling,
  sawedoffshotgun: sawedoffShotgun,
};

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
