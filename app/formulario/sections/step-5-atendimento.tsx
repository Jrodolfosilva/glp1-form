import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { TriangleAlert } from "lucide-react";
import { interesseOpcoes } from "../data";

type Props = {
  interesseOptions: string[];
  toggleInteresse: (option: string) => void;
  erroStep: string | null;
  onNext: () => void;
};

export default function StepAtendimentoUnico({
  interesseOptions,
  toggleInteresse,
  erroStep,
  onNext,
}: Props) {
  const consultaAoVivo = "Não tenho certeza — gostaria de discutir as opções de formulação com um profissional clínico por meio de uma consulta virtual ao vivo";

  return (
    <div className="mt-5">
      <div id="sc-atendimento-unico" className="mt-5">
        <h2 className="text-2xl font-bold mb-4">
          Suas necessidades são únicas, e seus medicamentos também devem ser!
          <span className="text-red-500 text-sm ml-2 font-normal">sc-atendimento-unico</span>
        </h2>
        <p className="text-base mb-2">
          Seu medicamento GLP-1 é personalizado para atender às suas necessidades específicas.
        </p>
        <p className="text-base mb-6">
          Por favor, selecione as opções abaixo nas quais você tem interesse.
        </p>

        <div className="grid gap-4">
          {interesseOpcoes.map((option) => (
            <FieldLabel key={option}>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  checked={interesseOptions.includes(option)}
                  onCheckedChange={() => toggleInteresse(option)}
                />
                <FieldContent><FieldTitle>{option}</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </div>
      </div>

      <Separator className="mt-8" />
      {interesseOptions.includes(consultaAoVivo) && (
        <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-amber-600" />
          <span>Será adicionado o valor correspondente a consulta de €50. A HD Clinica entrará em contato para agendar o melhor horário.</span>
        </div>
      )}

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
