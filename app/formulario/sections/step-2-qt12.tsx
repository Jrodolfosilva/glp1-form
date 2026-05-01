import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  handleFinalOption: (value: string) => void;
};

export default function StepQt12({ handleFinalOption }: Props) {
  return (
    <AnimatedSection id="qt-12" className="mt-5">
      <AnimatedTitle>
        <h2 className="text-2xl font-bold mb-4">
          Você tomou algum medicamento para emagrecer nas últimas 4 semanas?
          <span className="text-red-500 text-sm ml-2 font-normal">qt-12</span>
        </h2>
      </AnimatedTitle>
      <Separator className="mt-8" />
      <RadioGroup className="flex flex-col gap-4 mt-5" onValueChange={handleFinalOption}>
        <AnimatedOption>
          <FieldLabel htmlFor="final-glp1" className="input-default checked-border cursor-pointer">
            <Field orientation="vertical" className="!p-0">
              <FieldContent>
                <div className="flex flex-row items-center gap-2">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle className="m-0">Sim, eu tomei medicação GLP-1</FieldTitle>
                </div>
              </FieldContent>
              <RadioGroupItem value="glp1" id="final-glp1" className="hidden" />
            </Field>
          </FieldLabel>
        </AnimatedOption>

        <AnimatedOption>
          <FieldLabel htmlFor="final-diferente" className="input-default checked-border cursor-pointer">
            <Field orientation="vertical" className="!p-0">
              <FieldContent>
                <div className="flex flex-row items-center gap-2">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle className="m-0">Sim, tomei um medicamento diferente para emagrecer</FieldTitle>
                </div>
              </FieldContent>
              <RadioGroupItem value="diferente" id="final-diferente" className="hidden" />
            </Field>
          </FieldLabel>
        </AnimatedOption>

        <AnimatedOption>
          <FieldLabel htmlFor="final-nao" className="input-default checked-border cursor-pointer">
            <Field orientation="vertical" className="!p-0">
              <FieldContent>
                <div className="flex flex-row items-center gap-2">
                  <Image alt="" src="/no.svg" width={30} height={30} />
                  <FieldTitle className="m-0">Não</FieldTitle>
                </div>
              </FieldContent>
              <RadioGroupItem value="nao" id="final-nao" className="hidden" />
            </Field>
          </FieldLabel>
        </AnimatedOption>
      </RadioGroup>
    </AnimatedSection>
  );
}
