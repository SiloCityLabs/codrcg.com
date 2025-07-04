// --- Data ---
import lachmannshroud from '@/data/modern-warfare/two/attachments/smg/lachmannShroud.json';
import iso45 from '@/data/modern-warfare/two/attachments/smg/iso45.json';
import iso9mm from '@/data/modern-warfare/two/attachments/smg/iso9mm.json';
import pdsw528 from '@/data/modern-warfare/two/attachments/smg/pdsw528.json';
import vel46 from '@/data/modern-warfare/two/attachments/smg/vel46.json';
import fennec45 from '@/data/modern-warfare/two/attachments/smg/fennec45.json';
import basp from '@/data/modern-warfare/two/attachments/smg/basp.json';
import lachmannsub from '@/data/modern-warfare/two/attachments/smg/lachmannSub.json';
import fsshurricane from '@/data/modern-warfare/two/attachments/smg/fssHurricane.json';
import mx9 from '@/data/modern-warfare/two/attachments/smg/mx9.json';
import minibak from '@/data/modern-warfare/two/attachments/smg/minibak.json';
import vaznev9k from '@/data/modern-warfare/two/attachments/smg/vaznev9k.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  lachmannshroud,
  iso45,
  iso9mm,
  pdsw528,
  vel46,
  fennec45,
  basp,
  lachmannsub,
  fsshurricane,
  mx9,
  minibak,
  vaznev9k,
};

export function getSmgAttachments(gun: string, count: number) {
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
