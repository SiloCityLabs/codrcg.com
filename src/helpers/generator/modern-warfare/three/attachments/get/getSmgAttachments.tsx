// --- Data ---
import superi46 from '@/data/modern-warfare/three/attachments/smg/superi46.json';
import statichv from '@/data/modern-warfare/three/attachments/smg/staticHv.json';
import fjxhorus from '@/data/modern-warfare/three/attachments/smg/fjxHorus.json';
import ram9 from '@/data/modern-warfare/three/attachments/smg/ram9.json';
import amr9 from '@/data/modern-warfare/three/attachments/smg/amr9.json';
import rival9 from '@/data/modern-warfare/three/attachments/smg/rival9.json';
import hrm9 from '@/data/modern-warfare/three/attachments/smg/hrm9.json';
import striker9 from '@/data/modern-warfare/three/attachments/smg/striker9.json';
import striker from '@/data/modern-warfare/three/attachments/smg/striker.json';
import wsp9 from '@/data/modern-warfare/three/attachments/smg/wsp9.json';
import wspswarm from '@/data/modern-warfare/three/attachments/smg/wspSwarm.json';
// --- Helpers ---
import { randomizeAttachments } from '@/helpers/randomizeAttachments';

const attachmentsList: Record<string, Record<string, string[]>> = {
  superi46,
  statichv,
  fjxhorus,
  ram9,
  amr9,
  rival9,
  hrm9,
  striker9,
  striker,
  wsp9,
  wspswarm,
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
