//Components
import { SclPlaceholder } from '@silocitypages/ui-core';
import { PerkGreedGeneratorViewProps } from '@/types/GeneratorView';

function PerkGreedGeneratorView({
  isGenerating,
  title,
  titleClassName,
  perk,
  perkGreed,
  perkClassName,
}: PerkGreedGeneratorViewProps) {
  return (
    <>
      <span className={`${titleClassName} fw-bolder fs-5`}> {title}:</span> <br />
      <span className={`${perkClassName} text-muted fs-6`}>
        <SclPlaceholder isLoading={isGenerating} value={perk ? perk : 'None'} />
        {perkGreed ? (
          <>
            <br />
            <SclPlaceholder isLoading={isGenerating} value={perkGreed} />
          </>
        ) : null}
      </span>
    </>
  );
}

export default PerkGreedGeneratorView;
