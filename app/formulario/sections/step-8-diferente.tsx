import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  descricaoDiferente: string;
  setDescricaoDiferente: (v: string) => void;
  pesoInicialDiferente: string;
  setPesoInicialDiferente: (v: string) => void;
  concordaDiferente: string | null;
  setConcordaDiferente: (v: string | null) => void;
  erroStep: string | null;
  onNext: () => void;
};

export default function StepDiferente({
  descricaoDiferente, setDescricaoDiferente,
  pesoInicialDiferente, setPesoInicialDiferente,
  concordaDiferente, setConcordaDiferente,
  erroStep, onNext,
}: Props) {
  return (
    <div className="mt-5">
      <div id="sc-diferente" className="mt-5">
        <h2 className="text-2xl font-bold mb-4">
          Ótimo! Você tem experiência com medicamentos para perda de peso.
          <span className="text-red-500 text-sm ml-2 font-normal">sc-diferente</span>
        </h2>
        <p className="text-base mb-6">
          Por favor, informe o nome, a dose e a frequência de uso do seu medicamento.
        </p>
        <Textarea
          className="input-default w-full h-37.5 bg-white"
          id="descricao-diferente"
          value={descricaoDiferente}
          onChange={(e) => setDescricaoDiferente(e.target.value)}
          placeholder="Escreva aqui..."
        />
      </div>

      <Separator className="mt-8" />

      <div id="sc-diferente-peso" className="mt-5">
        <h3 className="text-2xl font-bold mb-4">
          Qual era o seu peso inicial?
          <span className="text-red-500 text-sm ml-2 font-normal">sc-diferente-peso</span>
        </h3>
        <div className="flex-1 space-y-2">
          <Label htmlFor="peso-inicial-diferente">Peso inicial</Label>
          <Input id="peso-inicial-diferente" type="number" placeholder="Ex: 90"
            value={pesoInicialDiferente}
            onChange={(e) => setPesoInicialDiferente(e.target.value)}
            className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
          />
        </div>
      </div>

      <Separator className="mt-8" />

      <div id="sc-diferente-concorda" className="mt-5">
        <h3 className="text-2xl font-bold mb-4">
          Você concorda em obter medicamentos para perda de peso somente por meio deste programa daqui para frente?
          <span className="text-red-500 text-sm ml-2 font-normal">sc-diferente-concorda</span>
        </h3>
        <p className="text-base mb-4">É importante não &ldquo;empilhar&rdquo; medicamentos para perda de peso.</p>
        <RadioGroup className="flex gap-4" value={concordaDiferente ?? ""} onValueChange={setConcordaDiferente}>
          <FieldLabel htmlFor="diferente-concorda-sim" className="radio-card">
            <Field orientation="vertical" className="h-35">
              <FieldContent className="flex flex-col items-center gap-2 justify-center">
                <Image alt="" src="/yes.svg" width={30} height={30} />
                <FieldTitle>Sim</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="sim" id="diferente-concorda-sim" className="hidden" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="diferente-concorda-nao" className="radio-card">
            <Field orientation="vertical" className="h-35">
              <FieldContent className="flex flex-col items-center gap-2 justify-center">
                <Image alt="" src="/no.svg" width={30} height={30} />
                <FieldTitle>Não</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="nao" id="diferente-concorda-nao" className="hidden" />
            </Field>
          </FieldLabel>
        </RadioGroup>
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
