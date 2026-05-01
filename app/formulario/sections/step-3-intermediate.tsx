import { Separator } from "@/components/ui/separator";

type Props = {
  handleGlp1Continue: () => void;
};

export default function StepGlp1Intermediate({ handleGlp1Continue }: Props) {
  return (
    <div className="mt-5">
      <div className="flex flex-col items-center text-center gap-4 mt-16">
        <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
          Ótimo! Você tem experiência com GLP-1.
          <span className="text-red-500 text-sm ml-2 font-normal">sq-glp1</span>
        </h2>
        <Separator className="my-2" />
        <p className="text-[17px] text-[#111827] max-w-md">
          Sua experiência prévia com medicação GLP-1 nos ajuda a personalizar
          seu tratamento. Vamos coletar mais alguns detalhes.
        </p>
        <button type="button" onClick={handleGlp1Continue} className="submit mt-8 cursor-pointer">
          Seguir
        </button>
      </div>
    </div>
  );
}
