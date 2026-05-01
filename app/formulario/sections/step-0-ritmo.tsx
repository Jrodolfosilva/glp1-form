import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import type { Option } from "../types";
import type { Estimativa } from "@/lib/estimativas";
import { getIntermediateContent } from "@/lib/estimativas";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  estimativa: Estimativa | null;
  handleOptionSelect: (value: string) => void;
};

export default function StepRitmo({ estimativa, handleOptionSelect }: Props) {
  return (
    <AnimatedSection id="qt-11" className="mt-5">
      <AnimatedTitle>
        <h2 className="text-2xl font-bold mb-4">
          Levará cerca de {estimativa?.semanasEstimadas ?? 0} semanas para perder {estimativa?.kgAPerder ?? 0} kg.
          <span className="text-red-500 text-sm ml-2 font-normal">qt-11</span>
        </h2>
      </AnimatedTitle>
      <AnimatedText>
        <p className="text-[15px] text-[#6b7280] mt-1">
          Você perderá aproximadamente {estimativa?.kgPorSemana ?? 0} kg por semana.
        </p>
      </AnimatedText>
      <Separator className="mt-4 mb-4" />
      <AnimatedText>
        <p className="text-[17px] text-[#111827] mb-6">Como está sendo esse ritmo para você?</p>
      </AnimatedText>
      <RadioGroup className="flex flex-col gap-4" onValueChange={handleOptionSelect}>
        {[
          { value: "normal", label: "Isso funciona para mim.", img: "/normal.svg" },
          { value: "rapido", label: "Quero que seja mais rápido.", img: "/rapido.svg" },
          { value: "acelerado", label: "Isso é muito rápido.", img: "/acelerado.svg" },
        ].map(({ value, label, img }) => (
          <AnimatedOption key={value}>
            <FieldLabel htmlFor={`ritmo-${value}`} className="input-default checked-border cursor-pointer">
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex items-center gap-2">
                    <Image alt="" src={img} width={30} height={30} />
                    <FieldTitle className="m-0">{label}</FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem value={value} id={`ritmo-${value}`} className="hidden" />
              </Field>
            </FieldLabel>
          </AnimatedOption>
        ))}
      </RadioGroup>
    </AnimatedSection>
  );
}
