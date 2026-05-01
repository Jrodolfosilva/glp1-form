import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";

type Props = {
  infoAdicional: string | null;
  setInfoAdicional: (v: string | null) => void;
  infoAdicionalTexto: string;
  setInfoAdicionalTexto: (v: string) => void;
  erroStep: string | null;
  onNext: () => void;
};

export default function StepMaisInformacoes({
  infoAdicional, setInfoAdicional,
  infoAdicionalTexto, setInfoAdicionalTexto,
  erroStep, onNext,
}: Props) {
  return (
    <div className="mt-5">
      <div id="checkpoint-sc-mais-informacoes" className="mt-5">
        <h2 className="text-2xl font-bold mb-4">
          Os profissionais médicos da MEDVi analisam todos os formulários em até 24 horas.
          <span className="text-red-500 text-sm ml-2 font-normal">checkpoint-sc-mais-informacoes</span>
        </h2>
        <p className="text-base mb-6">
          Tem alguma informação adicional que gostaria de compartilhar com nossa equipe médica?
        </p>
        <RadioGroup className="flex gap-4" value={infoAdicional ?? ""} onValueChange={(v) => setInfoAdicional(v)}>
          <FieldLabel htmlFor="info-adicional-nao" className="radio-card">
            <Field orientation="vertical" className="h-35">
              <FieldContent className="flex flex-col items-center gap-2 justify-center">
                <Image alt="" src="/no.svg" width={30} height={30} />
                <FieldTitle>Não</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="nao" id="info-adicional-nao" className="hidden" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="info-adicional-sim" className="radio-card">
            <Field orientation="vertical" className="h-35">
              <FieldContent className="flex flex-col items-center gap-2 justify-center">
                <Image alt="" src="/yes.svg" width={30} height={30} />
                <FieldTitle>Sim</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="sim" id="info-adicional-sim" className="hidden" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        {infoAdicional === "sim" && (
          <>
            <Label htmlFor="info-adicional-texto" className="text-base mt-4 block">
              Compartilhe informações adicionais:
            </Label>
            <Textarea
              id="info-adicional-texto"
              value={infoAdicionalTexto}
              onChange={(e) => setInfoAdicionalTexto(e.target.value)}
              placeholder="Escreva aqui..."
              className="input-default w-full h-37.5 bg-white mt-2"
            />
          </>
        )}
      </div>

      <Separator className="mt-8" />
      <button type="button" onClick={onNext} className="submit cursor-pointer">Próximo</button>
      {erroStep && (
        <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-red-600" />
          <span>{erroStep}</span>
        </div>
      )}
    </div>
  );
}
