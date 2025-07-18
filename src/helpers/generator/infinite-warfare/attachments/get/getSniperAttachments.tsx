// --- Data ---
import default1 from '@/data/infinite-warfare/attachments/sniper/default1.json';
import default2 from '@/data/infinite-warfare/attachments/sniper/default2.json';
import trek50 from '@/data/infinite-warfare/attachments/sniper/trek50.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  kbslongbow: default1,
  widowmaker: default1,
  dmr1: default1,
  proteus: default1,
  ebr800: default2,
  trek50,
};

export function getSniperAttachments(
  type: string,
  gun: string,
  count: number
): string[] | Record<string, string[]> {
  const attachments: string[] = [];
  const data = attachmentsList[gun];
  const dataList = data[type];
  if (count === -1) {
    return data;
  }

  if (data) {
    randomizeAttachments(attachments, dataList, count);
  }

  return attachments;
}
