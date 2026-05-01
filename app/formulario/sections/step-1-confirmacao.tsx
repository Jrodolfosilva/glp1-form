import { Separator } from "@/components/ui/separator";
import type { Option } from "../types";
import type { Estimativa } from "@/lib/estimativas";
import { getIntermediateContent } from "@/lib/estimativas";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  selectedOption: Option;
  estimativa: Estimativa | null;
  handleContinue: () => void;
};

export default function StepConfirmacao({ selectedOption, estimativa, handleContinue }: Props) {
  const content = getIntermediateContent(
    selectedOption!,
    estimativa ?? { kgAPerder: 0, semanasEstimadas: 0, kgPorSemana: 0 }
  );

  return (
    <AnimatedSection className="mt-5">
      <div className="flex flex-col items-center text-center gap-4 mt-16 w-full">
        <AnimatedTitle>
          <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
            {content.title}
            <span className="text-red-500 text-sm ml-2 font-normal">sq-{selectedOption}</span>
          </h2>
        </AnimatedTitle>
        <Separator className="my-2" />
        <AnimatedText>
          <p className="text-[17px] text-[#111827] max-w-md">{content.subtitle}</p>
        </AnimatedText>
        <AnimatedOption className="w-full">
          <button type="button" onClick={handleContinue} className="submit mt-8 cursor-pointer w-full">
            Seguir
          </button>
        </AnimatedOption>
      </div>
    </AnimatedSection>
  );
}
