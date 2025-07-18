// --- Data ---
import armaguerra43 from '@/data/vanguard/attachments/smg/armaguerra43.json';
import h4blixen from '@/data/vanguard/attachments/smg/h4blixen.json';
import m1928 from '@/data/vanguard/attachments/smg/m1928.json';
import marco5 from '@/data/vanguard/attachments/smg/marco5.json';
import mp40 from '@/data/vanguard/attachments/smg/mp40.json';
import owenGun from '@/data/vanguard/attachments/smg/owenGun.json';
import ppsh41 from '@/data/vanguard/attachments/smg/ppsh41.json';
import ra225 from '@/data/vanguard/attachments/smg/ra225.json';
import sten from '@/data/vanguard/attachments/smg/sten.json';
import type100 from '@/data/vanguard/attachments/smg/type100.json';
import welgun from '@/data/vanguard/attachments/smg/welgun.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  armaguerra43,
  h4blixen,
  m1928,
  marco5,
  mp40,
  owengun: owenGun,
  ppsh41,
  ra225,
  sten,
  type100,
  welgun,
};

export function getSmgAttachments(
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
