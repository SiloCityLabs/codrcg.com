// --- Data ---
import taq56 from '@/data/modern-warfare/two/attachments/assault_rifle/taq56.json';
import m4 from '@/data/modern-warfare/two/attachments/assault_rifle/m4.json';
import stb556 from '@/data/modern-warfare/two/attachments/assault_rifle/stb556.json';
import kastov762 from '@/data/modern-warfare/two/attachments/assault_rifle/kastov762.json';
import m13b from '@/data/modern-warfare/two/attachments/assault_rifle/m13b.json';
import chimera from '@/data/modern-warfare/two/attachments/assault_rifle/chimera.json';
import isohemlock from '@/data/modern-warfare/two/attachments/assault_rifle/isoHemlock.json';
import tempusrazorback from '@/data/modern-warfare/two/attachments/assault_rifle/tempusRazorback.json';
import fravancer from '@/data/modern-warfare/two/attachments/assault_rifle/frAvancer.json';
import m13c from '@/data/modern-warfare/two/attachments/assault_rifle/m13c.json';
import tr76geist from '@/data/modern-warfare/two/attachments/assault_rifle/tr76geist.json';
import lachmann556 from '@/data/modern-warfare/two/attachments/assault_rifle/lachmann556.json';
import m16 from '@/data/modern-warfare/two/attachments/assault_rifle/m16.json';
import kastov74u from '@/data/modern-warfare/two/attachments/assault_rifle/kastov74u.json';
import kastov545 from '@/data/modern-warfare/two/attachments/assault_rifle/kastov545.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  taq56,
  m4,
  stb556,
  kastov762,
  m13b,
  chimera,
  isohemlock,
  tempusrazorback,
  fravancer,
  m13c,
  tr76geist,
  lachmann556,
  m16,
  kastov74u,
  kastov545,
};

export function getAssaultRifleAttachments(
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
