import { Separator } from "@/components/ui/separator";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  handleGlp1Continue: () => void;
};

export default function StepGlp1Intermediate({ handleGlp1Continue }: Props) {
  return (
    <AnimatedSection className="mt-5">
      <div className="flex flex-col items-center text-center gap-4 mt-16 w-full">
        <AnimatedTitle>
          <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
            Ótimo! Você tem experiência com GLP-1.
            <span className="text-red-500 text-sm ml-2 font-normal">sq-glp1</span>
          </h2>
        </AnimatedTitle>
        <Separator className="my-2" />
        <AnimatedText>
          <p className="text-[17px] text-[#111827] max-w-md">
            Sua experiência prévia com medicação GLP-1 nos ajuda a personalizar
            seu tratamento. Vamos coletar mais alguns detalhes.
          </p>
        </AnimatedText>
        <AnimatedOption className="w-full">
          <button type="button" onClick={handleGlp1Continue} className="submit mt-8 cursor-pointer w-full">
            Seguir
          </button>
        </AnimatedOption>
      </div>
    </AnimatedSection>
  );
}
