// --- Data ---
import dm56 from '@/data/modern-warfare/three/attachments/marksman_rifle/dm56.json';
import kar98k from '@/data/modern-warfare/three/attachments/marksman_rifle/kar98k.json';
import kvdEnforcer from '@/data/modern-warfare/three/attachments/marksman_rifle/kvdEnforcer.json';
import mcw68 from '@/data/modern-warfare/three/attachments/marksman_rifle/mcw68.json';
import mtzInterceptor from '@/data/modern-warfare/three/attachments/marksman_rifle/mtzInterceptor.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  dm56,
  kar98k,
  kvdenforcer: kvdEnforcer,
  mcw68,
  mtzinterceptor: mtzInterceptor,
};

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
