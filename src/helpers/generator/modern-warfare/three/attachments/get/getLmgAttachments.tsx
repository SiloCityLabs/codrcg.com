// --- Data ---
import bruenmk9 from '@/data/modern-warfare/three/attachments/lmg/bruenMk9.json';
import kastovlsw from '@/data/modern-warfare/three/attachments/lmg/kastovLsw.json';
import taqevolvere from '@/data/modern-warfare/three/attachments/lmg/taqEvolvere.json';
import pulemyot762 from '@/data/modern-warfare/three/attachments/lmg/pulemyot762.json';
import dg58lsw from '@/data/modern-warfare/three/attachments/lmg/dg58lsw.json';
import taqeradicator from '@/data/modern-warfare/three/attachments/lmg/taqEradicator.json';
import holger26 from '@/data/modern-warfare/three/attachments/lmg/holger26.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  bruenmk9,
  kastovlsw,
  taqevolvere,
  pulemyot762,
  dg58lsw,
  taqeradicator,
  holger26,
};

export function getLmgAttachments(
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
