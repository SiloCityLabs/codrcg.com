// --- Data ---
import banshee from '@/data/infinite-warfare/attachments/shotgun/banshee.json';
import dcm8 from '@/data/infinite-warfare/attachments/shotgun/dcm8.json';
import default1 from '@/data/infinite-warfare/attachments/shotgun/default1.json';
import m2187 from '@/data/infinite-warfare/attachments/shotgun/m2187.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  banshee,
  dcm8,
  reaver: default1,
  rack9: default1,
  m2187,
};

export function getShotgunAttachments(
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
