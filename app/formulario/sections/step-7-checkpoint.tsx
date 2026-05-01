import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import { estadosBrasil } from "../data";
import type { Estimativa } from "@/lib/estimativas";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  alturaSalva: number;
  pesoSalvo: number;
  pesoIdealSalvo: number;
  estimativa: Estimativa | null;
  nome: string;
  setNome: (v: string) => void;
  sobrenome: string;
  setSobrenome: (v: string) => void;
  estado: string;
  setEstado: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  telefone: string;
  setTelefone: (v: string) => void;
  erroValidacao: string | null;
};

export default function StepCheckpoint({
  alturaSalva, pesoSalvo, pesoIdealSalvo, estimativa,
  nome, setNome,
  sobrenome, setSobrenome,
  estado, setEstado,
  email, setEmail,
  telefone, setTelefone,
  erroValidacao,
}: Props) {
  const imc = alturaSalva > 0 && pesoSalvo > 0
    ? (pesoSalvo / ((alturaSalva / 100) ** 2)).toFixed(1)
    : "—";

  return (
    <AnimatedSection className="mt-5">
      <div className="space-y-4">
        <AnimatedOption>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Tratamento com GLP-1</span>
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Avaliação concluída</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">Pronto para revisão</span>
          </div>
        </AnimatedOption>

        <AnimatedTitle>
          <h2 className="text-2xl font-bold text-[#111827]">
            Parabéns! Você é um(a) forte candidato(a) para tratamento médico de perda de peso.
            <span className="text-red-500 text-sm ml-2 font-normal">checkpoint-sc-checkpoint</span>
          </h2>
        </AnimatedTitle>

        <Separator />

        <AnimatedOption>
          <div className="bg-white rounded-xl border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#111827]">Sua avaliação médica</h3>
            <div className="flex items-center justify-between">
              <span className="text-[#111827] font-medium">Probabilidade de sucesso</span>
              <span className="text-2xl font-bold text-green-600">94%</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-[#111827] font-medium">IMC</span>
              <span className="text-[#111827]">{imc}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#111827] font-medium">Peso atual</span>
              <span className="text-[#111827]">{pesoSalvo > 0 ? `${pesoSalvo} kg` : "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#111827] font-medium">Peso alvo</span>
              <span className="text-[#111827]">
                {pesoIdealSalvo > 0 ? `${pesoIdealSalvo} kg em ${estimativa?.semanasEstimadas ?? 0} semanas` : "—"}
              </span>
            </div>
            <Separator />
            <p className="text-green-700 font-medium text-center">Você é um forte candidato para tratamento médico de perda de peso.</p>
          </div>
        </AnimatedOption>

        <AnimatedText>
          <p className="text-[#111827] font-medium">Vamos verificar se você atende aos requisitos.</p>
        </AnimatedText>

        <div className="grid grid-cols-2 gap-4">
          <AnimatedOption>
            <div className="space-y-2">
              <Label htmlFor="primeiro-nome">Primeiro nome</Label>
              <Input id="primeiro-nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome"
                className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
              />
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <div className="space-y-2">
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input id="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} placeholder="Seu sobrenome"
                className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
              />
            </div>
          </AnimatedOption>
        </div>

        <AnimatedOption>
          <div className="space-y-2">
            <Label htmlFor="estado">Para qual estado seu medicamento será enviado?</Label>
            <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}
              className="w-full bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb] text-[#111827]"
            >
              <option value="">Selecione um estado</option>
              {estadosBrasil.map((uf) => (
                <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
              ))}
            </select>
          </div>
        </AnimatedOption>

        <AnimatedOption>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com"
              className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
            />
          </div>
        </AnimatedOption>

        <AnimatedOption>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(11) 99999-9999"
              className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
            />
          </div>
        </AnimatedOption>

        <p className="text-xs text-[#9ca3af] mt-2">Suas informações nunca são compartilhadas e são protegidas pela HIPAA.</p>
      </div>

      <Separator className="mt-8" />
      {erroValidacao && (
        <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-red-600" />
          <span>{erroValidacao}</span>
        </div>
      )}
      <input type="submit" value="CHECK Eligibility" className="submit" />
    </AnimatedSection>
  );
}
