import { Separator } from "@/components/ui/separator";
import type { Option } from "../types";
import type { Estimativa } from "@/lib/estimativas";
import { getIntermediateContent } from "@/lib/estimativas";

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
    <div className="mt-5">
      <div className="flex flex-col items-center text-center gap-4 mt-16">
        <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
          {content.title}
          <span className="text-red-500 text-sm ml-2 font-normal">sq-{selectedOption}</span>
        </h2>
        <Separator className="my-2" />
        <p className="text-[17px] text-[#111827] max-w-md">{content.subtitle}</p>
        <button type="button" onClick={handleContinue} className="submit mt-8 cursor-pointer">
          Seguir
        </button>
      </div>
    </div>
  );
}
