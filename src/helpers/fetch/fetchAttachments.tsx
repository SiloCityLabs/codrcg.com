import { getBO6Attachments } from '../generator/black-ops/six/getBO6Attachments';
import { getMW3Attachments } from '../generator/modern-warfare/three/getMW3Attachments';
import { getMW2Attachments } from '../generator/modern-warfare/two/getMW2Attachments';
import { getMWRAttachments } from '../generator/modern-warfare/remastered/getMWRAttachments';
import { getVanguardAttachments } from '../generator/vanguard/getVanguardAttachments';
import { getColdWarAttachments } from '../generator/black-ops/cold-war/getColdWarAttachments';
import { getWorldWarTwoAttachments } from '../generator/world-war-two/getWorldWarTwoAttachments';
import { getBO4Attachments } from '../generator/black-ops/four/getBO4Attachments';
import { getIwAttachments } from '../generator/infinite-warfare/getIwAttachments';
import { getWAWAttachments } from '../generator/world-at-war/getWAWAttachments';
// --- Helpers ---
import { noAttachInfoLink } from '@/helpers/generator/noAttachInfoLink';
// --- Types ---
import { Weapon } from '@/types/Generator';

// A union of all possible attachment data structures returned by the getters
type AttachmentsType =
  | string[]
  | Record<string, string>
  | Record<string, string[]>
  | Record<string, never>;

// The return type of the noAttachInfoLink helper
interface NoAttachInfo {
  title: string;
  no_attachments_message: string;
}

const attachmentGetters: Record<
  string,
  (type: string, gun: string, count: number) => AttachmentsType
> = {
  'black-ops-six': getBO6Attachments,
  'modern-warfare-three': getMW3Attachments,
  'modern-warfare-two': getMW2Attachments,
  'modern-warfare-remastered': getMWRAttachments,
  vanguard: getVanguardAttachments,
  'cold-war': getColdWarAttachments,
  'world-war-two': getWorldWarTwoAttachments,
  'black-ops-four': getBO4Attachments,
  'infinite-warfare': getIwAttachments,
  'world-at-war': getWAWAttachments,
};

export function fetchAttachments(
  weapon: Weapon,
  count: number = 5
): AttachmentsType | NoAttachInfo {
  if (weapon?.no_attach_info) {
    return noAttachInfoLink(weapon, count);
  }

  const gun = weapon.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const getAttachments = attachmentGetters[weapon.game];

  if (getAttachments) {
    return getAttachments(weapon.type, gun, count);
  } else {
    return {};
  }
}
