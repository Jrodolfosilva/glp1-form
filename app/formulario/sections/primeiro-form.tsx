import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  sexo: string | null;
  setSexo: (v: string | null) => void;
  situacaoGravida: boolean;
  setSituacaoGravida: (v: boolean) => void;
  situacaoAmamentacao: boolean;
  setSituacaoAmamentacao: (v: boolean) => void;
  diabetesTipo2Insulina: boolean;
  setDiabetesTipo2Insulina: (v: boolean) => void;
  diabetesTipo1: boolean;
  setDiabetesTipo1: (v: boolean) => void;
  anticoagulanteVarfarina: boolean;
  setAnticoagulanteVarfarina: (v: boolean) => void;
  pancreatiteAtual: boolean;
  setPancreatiteAtual: (v: boolean) => void;
  alergicoMedicamento: boolean;
  setAlergicoMedicamento: (v: boolean) => void;
  hiv: boolean;
  setHiv: (v: boolean) => void;
  analgesicos: string | null;
  setAnalgesicos: (v: string | null) => void;
  cirurgias: string | null;
  setCirurgias: (v: string | null) => void;
  medicamentos: string | null;
  setMedicamentos: (v: string | null) => void;
  pressao: string | null;
  setPressao: (v: string | null) => void;
  frequencia: string | null;
  setFrequencia: (v: string | null) => void;
  dataDia: string;
  setDataDia: (v: string) => void;
  dataMes: string;
  setDataMes: (v: string) => void;
  dataAno: string;
  setDataAno: (v: string) => void;
  nenhumProblemaAcima: boolean;
  handleQt5ConditionClick: () => void;
  handleNenhumProblemaToggle: (checked: boolean) => void;
  alturaRef: React.RefObject<HTMLInputElement | null>;
  pesoRef: React.RefObject<HTMLInputElement | null>;
  pesoIdealRef: React.RefObject<HTMLInputElement | null>;
  erroValidacao: string | null;
};

export default function PrimeiroForm({
  sexo, setSexo,
  situacaoGravida, setSituacaoGravida,
  situacaoAmamentacao, setSituacaoAmamentacao,
  diabetesTipo2Insulina, setDiabetesTipo2Insulina,
  diabetesTipo1, setDiabetesTipo1,
  anticoagulanteVarfarina, setAnticoagulanteVarfarina,
  pancreatiteAtual, setPancreatiteAtual,
  alergicoMedicamento, setAlergicoMedicamento,
  hiv, setHiv,
  analgesicos, setAnalgesicos,
  cirurgias, setCirurgias,
  medicamentos, setMedicamentos,
  pressao, setPressao,
  frequencia, setFrequencia,
  dataDia, setDataDia,
  dataMes, setDataMes,
  dataAno, setDataAno,
  nenhumProblemaAcima,
  handleQt5ConditionClick,
  handleNenhumProblemaToggle,
  alturaRef, pesoRef, pesoIdealRef,
  erroValidacao,
}: Props) {
  return (
    <>
      {/* qt-1 Peso e altura */}
      <AnimatedSection id="qt-1">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua altura e o seu peso?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-1</span>
          </h2>
        </AnimatedTitle>
        <div className="grid gap-4">
          <AnimatedOption>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input id="altura" ref={alturaRef} type="number" placeholder="Ex: 170" className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]" />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input id="peso" ref={pesoRef} type="number" placeholder="Ex: 90" className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]" />
              </div>
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <div className="flex-1 space-y-2">
              <Label htmlFor="pesoIdeal">Qual é o seu peso ideal?</Label>
              <Input id="pesoIdeal" ref={pesoIdealRef} type="number" placeholder="Ex: 60" className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]" />
            </div>
          </AnimatedOption>
        </div>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-2 Sexo */}
      <AnimatedSection id="qt-2" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Você é homem ou mulher?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-2</span>
          </h2>
        </AnimatedTitle>
        <AnimatedOption>
          <RadioGroup className="flex gap-4" value={sexo} onValueChange={setSexo}>
            <FieldLabel htmlFor="homem" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/man.svg" width={80} height={80} />
                  <FieldTitle>Homen</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="homem" id="homem" className="hidden" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="mulher" className="radio-card">
              <Field orientation="vertical" className="h-35 cursor-pointer">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/woman.svg" width={80} height={80} />
                  <FieldTitle>Mulher</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="mulher" id="mulher" className="hidden" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </AnimatedOption>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-3 Data de nascimento */}
      <AnimatedSection id="qt-3" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua data de nascimento?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-3</span>
          </h2>
        </AnimatedTitle>
        <AnimatedOption>
          <div className="flex-1 space-y-2">
            <Label>Data de nascimento</Label>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="dia">Dia</Label>
                <Select value={dataDia} onValueChange={setDataDia}>
                  <SelectTrigger id="dia" className="w-full input-default bg-white p-6 min-h-14">
                    <SelectValue placeholder="Dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="mes">Mês</Label>
                <Select value={dataMes} onValueChange={setDataMes}>
                  <SelectTrigger id="mes" className="w-full input-default bg-white p-6 min-h-14">
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].map((mes, idx) => (
                        <SelectItem key={idx + 1} value={`${idx + 1}`}>{mes}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="ano">Ano</Label>
                <Input id="ano" type="number" value={dataAno} onChange={(e) => setDataAno(e.target.value)} placeholder="Ex: 1990" className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]" />
              </div>
            </div>
          </div>
        </AnimatedOption>
      </AnimatedSection>

      {/* qt-condicional-1 Situações (só para mulher) */}
      {sexo === "mulher" && (
        <>
          <Separator className="mt-8" />
          <AnimatedSection id="qt-condicional-1" className="mt-5">
            <AnimatedTitle>
              <h2 className="text-2xl font-bold mb-4">
                Alguma dessas situações se aplica a você?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-condicional-1</span>
              </h2>
            </AnimatedTitle>
            <div className="grid gap-4">
              <AnimatedOption>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox id="situacao-gravida" checked={situacaoGravida} onCheckedChange={(c) => setSituacaoGravida(c === true)} />
                      <FieldContent><FieldTitle>Atualmente grávida, possivelmente grávida ou tentando engravidar ativamente.</FieldTitle></FieldContent>
                    </Field>
                  </FieldLabel>
                  {situacaoGravida && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
              </AnimatedOption>
              <AnimatedOption>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox id="situacao-amamentacao" checked={situacaoAmamentacao} onCheckedChange={(c) => setSituacaoAmamentacao(c === true)} />
                      <FieldContent><FieldTitle>Amamentação ou alimentação com mamadeira com leite materno</FieldTitle></FieldContent>
                    </Field>
                  </FieldLabel>
                  {situacaoAmamentacao && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
              </AnimatedOption>
              <AnimatedOption>
                <FieldLabel>
                  <Field orientation="horizontal" className="input-default">
                    <Checkbox id="situacao-ultimos-6-meses" />
                    <FieldContent><FieldTitle>Deu à luz um filho nos últimos 6 meses.</FieldTitle></FieldContent>
                  </Field>
                </FieldLabel>
              </AnimatedOption>
              <AnimatedOption>
                <FieldLabel>
                  <Field orientation="horizontal" className="input-default">
                    <Checkbox id="situacao-nenhuma" />
                    <FieldContent><FieldTitle>Nenhuma das acima</FieldTitle></FieldContent>
                  </Field>
                </FieldLabel>
              </AnimatedOption>
            </div>
          </AnimatedSection>
          <Separator className="mt-8" />
        </>
      )}

      {/* qt-4 Questões de Saúde 1 */}
      <AnimatedSection id="qt-4" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Questões de Saúde 1
            <span className="text-red-500 text-sm ml-2 font-normal">qt-4</span>
          </h2>
        </AnimatedTitle>
        <AnimatedText>
          <p className="text-base mb-4">Alguma dessas situações se aplica a você?</p>
        </AnimatedText>
        <div className="grid gap-4">
          {[
            { id: "saude-renal-terminal", label: "Doença renal em estágio terminal (em diálise ou prestes a iniciar diálise)" },
            { id: "saude-hepatica-terminal", label: "Doença hepática em estágio terminal (cirrose)" },
            { id: "pensamentos-suicidas", label: "Pensamentos suicidas atuais e/ou tentativa de suicídio anterior" },
            { id: "cancer", label: "Câncer (diagnóstico ativo, tratamento ativo ou em remissão ou livre de câncer por menos de 5 anos consecutivos)" },
            { id: "cond-gastrointestinal", label: "Condição gastrointestinal grave (gastroparesia, obstrução, doença inflamatória intestinal)" },
            { id: "transtorno-dependencia", label: "Diagnóstico atual ou tratamento para transtorno/dependência por uso de álcool, opioides ou outras substâncias" },
          ].map(({ id, label }) => (
            <AnimatedOption key={id}>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id={id} />
                  <FieldContent><FieldTitle>{label}</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
            </AnimatedOption>
          ))}
        </div>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-5 Questões de Saúde 2 */}
      <AnimatedSection id="qt-5" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Questões de Saúde 2
            <span className="text-red-500 text-sm ml-2 font-normal">qt-5</span>
          </h2>
        </AnimatedTitle>
        <AnimatedText>
          <p className="text-base mb-4">Alguma dessas situações se aplica a você?</p>
        </AnimatedText>
        <div className="grid gap-4" onClick={(e) => {
          const target = e.target as HTMLElement;
          const checkboxEl = target.closest('[role="checkbox"]');
          if (checkboxEl && checkboxEl.id !== "nenhum-problema-acima") {
            if (nenhumProblemaAcima) handleQt5ConditionClick();
          }
        }}>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="hipotireoidismo-nao-tratado" />
                <FieldContent><FieldTitle>Hipotireoidismo não tratado</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="doenca-vesicula-biliar" />
                <FieldContent><FieldTitle>Doença da vesícula biliar</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="hipertensao-pressao-alta" />
                <FieldContent><FieldTitle>Hipertensão (pressão alta)</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="convulsoes" />
                <FieldContent><FieldTitle>Convulsões</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="glaucoma" />
                <FieldContent><FieldTitle>Glaucoma</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="apneia-sono" />
                <FieldContent><FieldTitle>Apneia do sono</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="diabetes-tipo-2-insulina" checked={diabetesTipo2Insulina} onCheckedChange={(c) => setDiabetesTipo2Insulina(c === true)} />
                  <FieldContent><FieldTitle>Diabetes Tipo 2 (em uso insulina)</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {diabetesTipo2Insulina && (
                <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="diabetes-tipo-1" checked={diabetesTipo1} onCheckedChange={(c) => setDiabetesTipo1(c === true)} />
                  <FieldContent><FieldTitle>Diabetes Tipo 1</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {diabetesTipo1 && (
                <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="anticoagulante-varfarina" checked={anticoagulanteVarfarina} onCheckedChange={(c) => setAnticoagulanteVarfarina(c === true)} />
                  <FieldContent><FieldTitle>Uso do anticoagulante varfarina (Coumadin/Jantoven)</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {anticoagulanteVarfarina && (
                <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="pancreatite-atual" checked={pancreatiteAtual} onCheckedChange={(c) => setPancreatiteAtual(c === true)} />
                  <FieldContent><FieldTitle>Histórico ou presença atual de pancreatite</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {pancreatiteAtual && (
                <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="historico-tireoide" />
                <FieldContent><FieldTitle>Histórico pessoal ou familiar de cisto/nódulo tireoidiano, câncer de tireoide, carcinoma medular da tireoide ou síndrome de neoplasia endócrina múltipla tipo 2.</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="gota" />
                <FieldContent><FieldTitle>Gota</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="colesterol-triglicerideos" />
                <FieldContent><FieldTitle>Colesterol alto ou triglicerídeos</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="depressao" />
                <FieldContent><FieldTitle>Depressão</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="tumor-infeccao-cerebro-medula" />
                <FieldContent><FieldTitle>Tumor/infecção no cérebro/medula espinhal</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="doenca-hepatica-gorduroso" />
                <FieldContent><FieldTitle>Doença hepática, incluindo fígado gorduroso.</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="doenca-renal" />
                <FieldContent><FieldTitle>Doença renal</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="taquicardia" />
                <FieldContent><FieldTitle>Frequência cardíaca em repouso elevada (taquicardia)</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="doenca-coronariana-avc" />
                <FieldContent><FieldTitle>Doença arterial coronariana ou ataque cardíaco/AVC nos últimos 2 anos</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="alergico-medicamento" checked={alergicoMedicamento} onCheckedChange={(c) => setAlergicoMedicamento(c === true)} />
                  <FieldContent><FieldTitle>Alérgico a qualquer medicamento</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {alergicoMedicamento && (
                <div className="mt-2 space-y-1">
                  <Label htmlFor="info-alergia" className="text-sm">Por favor, forneça mais informações sobre sua alergia a medicamentos:</Label>
                  <Textarea id="info-alergia" placeholder="Escreva aqui..." className="input-default w-full h-30 bg-white" />
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="intervalo-qt" />
                <FieldContent><FieldTitle>Prolongamento do intervalo QT ou outro distúrbio do ritmo cardíaco</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="hospitalizacao-ultimo-ano" />
                <FieldContent><FieldTitle>Hospitalização no último ano</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <div>
              <FieldLabel>
                <Field orientation="horizontal" className="input-default">
                  <Checkbox id="hiv" checked={hiv} onCheckedChange={(c) => setHiv(c === true)} />
                  <FieldContent><FieldTitle>Vírus da imunodeficiência humana (HIV)</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
              {hiv && (
                <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="refluxo-acido" />
                <FieldContent><FieldTitle>Refluxo ácido</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="asma" />
                <FieldContent><FieldTitle>Asma/Doença</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="incontinencia-urinaria" />
                <FieldContent><FieldTitle>Incontinência urinária</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="sop" />
                <FieldContent><FieldTitle>Síndrome dos ovários policísticos (SOP)</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="baixa-testosterona" />
                <FieldContent><FieldTitle>Baixa testosterona clinicamente comprovada</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="osteoartrite" />
                <FieldContent><FieldTitle>Osteoartrite</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="constipacao" />
                <FieldContent><FieldTitle>Constipação</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="nenhum-problema-acima" checked={nenhumProblemaAcima} onCheckedChange={(c) => handleNenhumProblemaToggle(c === true)} />
                <FieldContent><FieldTitle>Nenhum problema acima</FieldTitle></FieldContent>
              </Field>
            </FieldLabel>
          </AnimatedOption>
        </div>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-6 Analgésicos opiáceos */}
      <AnimatedSection id="qt-6" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl mb-4">Nos últimos 3 meses, você utilizou analgésicos opiáceos e/ou drogas ilícitas à base de opiáceos?<span className="text-red-500 text-sm ml-2 font-normal">qt-6</span></h3>
        </AnimatedTitle>
        <AnimatedOption>
          <RadioGroup className="flex gap-4" value={analgesicos} onValueChange={setAnalgesicos}>
            <FieldLabel htmlFor="analgesicos-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} /><FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="nao" id="analgesicos-nao" className="hidden" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="analgesicos-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} /><FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="sim" id="analgesicos-sim" className="hidden" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </AnimatedOption>
        {analgesicos === "sim" && (
          <>
            <Label htmlFor="informacoes-analgesicos" className="text-base mb-2">Por favor, forneça mais informações.</Label>
            <Textarea id="informacoes-analgesicos" placeholder="Escreva aqui..." className="input-default w-full h-37.5 bg-white" />
          </>
        )}
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-7 Cirurgias perda de peso */}
      <AnimatedSection id="qt-7" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl mb-4">Você já se submeteu a cirurgias para perda de peso anteriormente?<span className="text-red-500 text-sm ml-2 font-normal">qt-7</span></h3>
        </AnimatedTitle>
        <AnimatedOption>
          <RadioGroup className="flex gap-4" value={cirurgias} onValueChange={setCirurgias}>
            <FieldLabel htmlFor="cirurgias-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} /><FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="nao" id="cirurgias-nao" className="hidden" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="cirurgias-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} /><FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="sim" id="cirurgias-sim" className="hidden" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </AnimatedOption>
        {cirurgias === "sim" && (
          <>
            <Label htmlFor="lista-medicamentos-cirurgias" className="text-base mb-2">Por favor, liste os medicamentos que lhe foram prescritos:</Label>
            <Textarea id="lista-medicamentos-cirurgias" placeholder="Escreva aqui..." className="input-default w-full h-37.5 bg-white" />
          </>
        )}
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-8 Medicamentos prescritos */}
      <AnimatedSection id="qt-8" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl mb-4">Você está tomando algum medicamento com receita médica atualmente?<span className="text-red-500 text-sm ml-2 font-normal">qt-8</span></h3>
        </AnimatedTitle>
        <AnimatedOption>
          <RadioGroup className="flex gap-4" value={medicamentos} onValueChange={setMedicamentos}>
            <FieldLabel htmlFor="medicamentos-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} /><FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="nao" id="medicamentos-nao" className="hidden" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="medicamentos-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} /><FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="sim" id="medicamentos-sim" className="hidden" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </AnimatedOption>
        {medicamentos === "sim" && (
          <>
            <Label htmlFor="lista-medicamentos-qt8" className="text-base mb-2">Por favor, liste os medicamentos que lhe foram prescritos:</Label>
            <Textarea id="lista-medicamentos-qt8" placeholder="Escreva aqui..." className="input-default w-full h-37.5 bg-white" rows={10} cols={60} />
          </>
        )}
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-9 Pressão arterial */}
      <AnimatedSection id="qt-9" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">Qual é a sua faixa de pressão arterial?<span className="text-red-500 text-sm ml-2 font-normal">qt-9</span></h2>
        </AnimatedTitle>
        <RadioGroup className="flex flex-col gap-4" value={pressao} onValueChange={setPressao}>
          {[
            { value: "normal", label: "Normal 120/80", img: "/normal.svg" },
            { value: "elevado", label: "Elevado 120/129/<80", img: "/elevado.svg" },
            { value: "hiper1", label: "Hipertensão Estágio 1", img: "/hiper.svg" },
            { value: "hiper2", label: "Hipertensão Estágio 2", img: "/hiper2.svg" },
          ].map(({ value, label, img }) => (
            <AnimatedOption key={value}>
              <FieldLabel htmlFor={`faixa-${value}`} className="input-default checked-border cursor-pointer">
                <Field orientation="vertical">
                  <FieldContent>
                    <div className="flex flex-row items-center gap-2">
                      <Image alt="" src={img} width={30} height={30} />
                      <FieldTitle className="m-0">{label}</FieldTitle>
                    </div>
                  </FieldContent>
                  <RadioGroupItem value={value} id={`faixa-${value}`} className="hidden" />
                </Field>
              </FieldLabel>
            </AnimatedOption>
          ))}
        </RadioGroup>
        {pressao === "hiper2" && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
            <TriangleAlert className="size-5 shrink-0 text-amber-600" />
            <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
          </div>
        )}
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-10 Frequência cardíaca */}
      <AnimatedSection id="qt-10" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">Qual é a sua frequência cardíaca média em repouso?<span className="text-red-500 text-sm ml-2 font-normal">qt-10</span></h2>
        </AnimatedTitle>
        <RadioGroup className="flex flex-col gap-4" value={frequencia} onValueChange={setFrequencia}>
          {[
            { value: "lento", label: "<60 batimentos por minuto - Lento", img: "/lento.svg" },
            { value: "normal", label: "60 - 100 batimentos por minuto - Normal", img: "/normal.svg" },
            { value: "rapido", label: "101 - 110 batimentos por minuto - Rápido", img: "/rapido.svg" },
            { value: "acelerado", label: ">110 batimentos por minuto - Acelerado", img: "/acelerado.svg" },
          ].map(({ value, label, img }) => (
            <AnimatedOption key={value}>
              <FieldLabel htmlFor={`freq-${value}`} className="input-default checked-border cursor-pointer">
                <Field orientation="vertical">
                  <FieldContent>
                    <div className="flex flex-row items-center gap-2">
                      <Image alt="" src={img} width={30} height={30} />
                      <FieldTitle className="m-0">{label}</FieldTitle>
                    </div>
                  </FieldContent>
                  <RadioGroupItem value={value} id={`freq-${value}`} className="hidden" />
                </Field>
              </FieldLabel>
            </AnimatedOption>
          ))}
        </RadioGroup>
        {frequencia === "acelerado" && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
            <TriangleAlert className="size-5 shrink-0 text-amber-600" />
            <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
          </div>
        )}
      </AnimatedSection>

      <br />
      {erroValidacao && (
        <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-red-600" />
          <span>{erroValidacao}</span>
        </div>
      )}
      <input type="submit" value="Próximo" className="submit" />
    </>
  );
}
