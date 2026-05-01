"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
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

export default function Glp() {
  return (
    <section className="mx-auto max-w-112.5 ">
      <header>
        <Image
          alt="Banner"
          src="/banner.avif"
          width={450}
          height={200}
          className="max-w-112.5 mt-2.5 w-full mx-auto rounded-2xl h-52 object-cover"
        />
        <h1 className="text-4xl">
          Alcance seu peso ideal rapidamente, sem dietas restritivas e
          exercícios físicos.
        </h1>
        <p>
          Por favor, responda às seguintes perguntas para que possamos avaliar
          sua elegibilidade para o programa de emagrecimento com acompanhamento
          médico.
        </p>
        <Separator className="mt-8" />
      </header>
      <form className="mt-5">
        {/* Primeira seção de pergunta: peso e altura */}
        <div id="qt-1" className="">
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua altura e o seu peso?
          </h2>
          <div className="grid gap-4 ">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="altura">Altura</Label>
                <Input
                  id="altura"
                  type="number"
                  placeholder="Ex: 170"
                  className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="altura">Peso</Label>
                <Input
                  id="altura"
                  type="number"
                  placeholder="Ex: 90"
                  className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="pesoIdeal">Qual é o seu peso ideal?</Label>
              <Input
                id="pesoIdeal"
                type="number"
                placeholder="Ex: 60"
                className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
              />
            </div>
          </div>
        </div>

        <Separator className="mt-8" />

        {/* Segunda seção de pergunta, sexo*/}

        <div id="qt-2" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Você é homem ou mulher?</h2>
          <div className="grid gap-4 ">
            <RadioGroup className="flex gap-4">
              <FieldLabel htmlFor="homem" className="radio-card">
                <Field orientation="vertical" className=" h-35">
                  <FieldContent className="flex flex-col items-center gap-2 justify-center ">
                    <Image alt="" src={"/man.svg"} width={80} height={80} />
                    <FieldTitle>Homen</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem value="homem" id="homem" className="hidden" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="mulher" className="radio-card">
                <Field orientation="vertical" className=" h-35 cursor-pointer">
                  <FieldContent className="flex flex-col items-center gap-2 justify-center">
                    <Image alt="" src={"/woman.svg"} width={80} height={80} />
                    <FieldTitle>Mulher</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="mulher"
                    id="mulher"
                    className="hidden"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>
        </div>

        <Separator className="mt-8" />

        {/* Terceira seção de pergunta, idade */}
        <div id="qt-3" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua data de nascimento?
          </h2>
          <div className="grid gap-4 ">
            <div className="flex-1 space-y-2">
              <Label htmlFor="dataNascimento">Data de nascimento</Label>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="dia">Dia</Label>
                  <Select>
                    <SelectTrigger
                      id="dia"
                      className="w-full input-default bg-white p-6 min-h-14"
                    >
                      <SelectValue placeholder="Dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="mes">Mês</Label>
                  <Select>
                    <SelectTrigger
                      id="mes"
                      className="w-full input-default bg-white p-6 min-h-14"
                    >
                      <SelectValue placeholder="Mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "Janeiro",
                          "Fevereiro",
                          "Março",
                          "Abril",
                          "Maio",
                          "Junho",
                          "Julho",
                          "Agosto",
                          "Setembro",
                          "Outubro",
                          "Novembro",
                          "Dezembro",
                        ].map((mes, idx) => (
                          <SelectItem key={idx + 1} value={`${idx + 1}`}>
                            {mes}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 space-y-2 ">
                  <Label htmlFor="ano">Ano</Label>
                  <Input
                    id="ano"
                    type="number"
                    placeholder="Ex: 1990"
                    className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-8" />

        {/* qt-condicional-1 se for mulher qt-2 seção de pergunta */}
        <div id="qt-condicional-1" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">
            Alguma dessas situações se aplica a você?
          </h2>
          <div className="grid gap-4">
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="situacao-gravida" name="situacao-gravida" />
                <FieldContent>
                  <FieldTitle>
                    Atualmente grávida, possivelmente grávida ou tentando
                    engravidar ativamente.
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="situacao-amamentacao"
                  name="situacao-amamentacao"
                />
                <FieldContent>
                  <FieldTitle>
                    Amamentação ou alimentação com mamadeira com leite materno
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="situacao-ultimos-6-meses"
                  name="situacao-ultimos-6-meses"
                />
                <FieldContent>
                  <FieldTitle>
                    Deu à luz um filho nos últimos 6 meses.
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="situacao-nenhuma" name="situacao-nenhuma" />
                <FieldContent>
                  <FieldTitle>Nenhuma das acima</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>
        </div>

        <Separator className="mt-8" />
        {/* qt-4 Questões de Saúde 1 */}
        <div id="qt-4" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Questões de Saúde 1</h2>
          <p className="text-base mb-4">
            Alguma dessas situações se aplica a você?
          </p>
          <div className="grid gap-4">
            <FieldLabel>
              <Field
                orientation="horizontal"
                className="input-default flex items-center"
              >
                <Checkbox
                  id="saude-renal-terminal"
                  name="saude-renal-terminal"
                />
                <FieldContent>
                  <FieldTitle>
                    Doença renal em estágio terminal (em diálise ou prestes a
                    iniciar diálise)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="saude-hepatica-terminal"
                  name="saude-hepatica-terminal"
                />
                <FieldContent>
                  <FieldTitle>
                    Doença hepática em estágio terminal (cirrose)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="pensamentos-suicidas"
                  name="pensamentos-suicidas"
                />
                <FieldContent>
                  <FieldTitle>
                    Pensamentos suicidas atuais e/ou tentativa de suicídio
                    anterior
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="cancer" name="cancer" />
                <FieldContent>
                  <FieldTitle>
                    Câncer (diagnóstico ativo, tratamento ativo ou em remissão
                    ou livre de câncer por menos de 5 anos consecutivos - não se
                    aplica ao câncer de pele não melanoma que foi considerado
                    curado por meio de excisão simples)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="cond-gastrointestinal"
                  name="cond-gastrointestinal"
                />
                <FieldContent>
                  <FieldTitle>
                    Condição gastrointestinal grave (gastroparesia, obstrução,
                    doença inflamatória intestinal)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="transtorno-dependencia"
                  name="transtorno-dependencia"
                />
                <FieldContent>
                  <FieldTitle>
                    Diagnóstico atual ou tratamento para transtorno/dependência
                    por uso de álcool, opioides ou outras substâncias
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>
        </div>
        <Separator className="mt-8" />
        {/* qt-5 Questões de Saúde 2 */}
        <div id="qt-5" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Questões de Saúde 2</h2>
          <p className="text-base mb-4">
            Alguma dessas situações se aplica a você?
          </p>
          <div className="grid gap-4">
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="hipotireoidismo-nao-tratado"
                  name="hipotireoidismo-nao-tratado"
                />
                <FieldContent>
                  <FieldTitle>Hipotireoidismo não tratado</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="doenca-vesicula-biliar"
                  name="doenca-vesicula-biliar"
                />
                <FieldContent>
                  <FieldTitle>Doença da vesícula biliar</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="hipertensao-pressao-alta"
                  name="hipertensao-pressao-alta"
                />
                <FieldContent>
                  <FieldTitle>Hipertensão (pressão alta)</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="convulsoes" name="convulsoes" />
                <FieldContent>
                  <FieldTitle>Convulsões</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="glaucoma" name="glaucoma" />
                <FieldContent>
                  <FieldTitle>Glaucoma</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="apneia-sono" name="apneia-sono" />
                <FieldContent>
                  <FieldTitle>Apneia do sono</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="diabetes-tipo-2-insulina"
                  name="diabetes-tipo-2-insulina"
                />
                <FieldContent>
                  <FieldTitle>Diabetes Tipo 2 (em uso insulina)</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="diabetes-tipo-1" name="diabetes-tipo-1" />
                <FieldContent>
                  <FieldTitle>Diabetes Tipo 1</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="anticoagulante-varfarina"
                  name="anticoagulante-varfarina"
                />
                <FieldContent>
                  <FieldTitle>
                    Uso do anticoagulante varfarina (Coumadin/Jantoven)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="pancreatite-atual" name="pancreatite-atual" />
                <FieldContent>
                  <FieldTitle>
                    Histórico ou presença atual de pancreatite
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="historico-tireoide" name="historico-tireoide" />
                <FieldContent>
                  <FieldTitle>
                    Histórico pessoal ou familiar de cisto/nódulo tireoidiano,
                    câncer de tireoide, carcinoma medular da tireoide ou
                    síndrome de neoplasia endócrina múltipla tipo 2.
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="gota" name="gota" />
                <FieldContent>
                  <FieldTitle>Gota</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="colesterol-triglicerideos"
                  name="colesterol-triglicerideos"
                />
                <FieldContent>
                  <FieldTitle>Colesterol alto ou triglicerídeos</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="depressao" name="depressao" />
                <FieldContent>
                  <FieldTitle>Depressão</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="tumor-infeccao-cerebro-medula"
                  name="tumor-infeccao-cerebro-medula"
                />
                <FieldContent>
                  <FieldTitle>
                    Tumor/infecção no cérebro/medula espinhal
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="doenca-hepatica-gorduroso"
                  name="doenca-hepatica-gorduroso"
                />
                <FieldContent>
                  <FieldTitle>
                    Doença hepática, incluindo fígado gorduroso.
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="doenca-renal" name="doenca-renal" />
                <FieldContent>
                  <FieldTitle>Doença renal</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="taquicardia" name="taquicardia" />
                <FieldContent>
                  <FieldTitle>
                    Frequência cardíaca em repouso elevada (taquicardia)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="doenca-coronariana-avc"
                  name="doenca-coronariana-avc"
                />
                <FieldContent>
                  <FieldTitle>
                    Doença arterial coronariana ou ataque cardíaco/AVC nos
                    últimos 2 anos
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="alergico-medicamento"
                  name="alergico-medicamento"
                />
                <FieldContent>
                  <FieldTitle>Alérgico a qualquer medicamento</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="intervalo-qt" name="intervalo-qt" />
                <FieldContent>
                  <FieldTitle>
                    Prolongamento do intervalo QT ou outro distúrbio do ritmo
                    cardíaco
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="hospitalizacao-ultimo-ano"
                  name="hospitalizacao-ultimo-ano"
                />
                <FieldContent>
                  <FieldTitle>Hospitalização no último ano</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="hiv" name="hiv" />
                <FieldContent>
                  <FieldTitle>
                    Vírus da imunodeficiência humana (HIV)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="refluxo-acido" name="refluxo-acido" />
                <FieldContent>
                  <FieldTitle>Refluxo ácido</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="asma" name="asma" />
                <FieldContent>
                  <FieldTitle>Asma/Doença</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="incontinencia-urinaria"
                  name="incontinencia-urinaria"
                />
                <FieldContent>
                  <FieldTitle>Incontinência urinária</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="sop" name="sop" />
                <FieldContent>
                  <FieldTitle>
                    Síndrome dos ovários policísticos (SOP)
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="baixa-testosterona" name="baixa-testosterona" />
                <FieldContent>
                  <FieldTitle>
                    Baixa testosterona clinicamente comprovada
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="osteoartrite" name="osteoartrite" />
                <FieldContent>
                  <FieldTitle>Osteoartrite</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox id="constipacao" name="constipacao" />
                <FieldContent>
                  <FieldTitle>Constipação</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal" className="input-default">
                <Checkbox
                  id="nenhum-problema-acima"
                  name="nenhum-problema-acima"
                />
                <FieldContent>
                  <FieldTitle>Nenhum problema acima</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </div>
        </div>
        <Separator className="mt-8" />

        {/* qt-6: Nos últimos 3 meses, você utilizou analgésicos opiáceos e/ou drogas
            ilícitas à base de opiáceos? */}
        <div id="qt-6" className="mt-5">
          <h3 className="text-2xl mb-4">
            Nos últimos 3 meses, você utilizou analgésicos opiáceos e/ou drogas
            ilícitas à base de opiáceos?
          </h3>
          <RadioGroup className="flex gap-4" name="analgesicos-ilicitos">
            <FieldLabel htmlFor="analgesicos-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} />
                  <FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="nao"
                  id="analgesicos-nao"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="analgesicos-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="sim"
                  id="analgesicos-sim"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
          <Label htmlFor="informacoes-analgesicos" className="text-base mb-2">
            Por favor, forneça mais informações.
          </Label>
          <Textarea
            id="informacoes-analgesicos"
            name="informacoes-analgesicos"
            placeholder="Escreva aqui..."
            className="input-default w-full h-37.5 bg-white"
          />
        </div>
        <Separator className="mt-8" />
        {/* qt-7 Você já se submeteu a cirurgias para perda de peso anteriormente? */}
        <div id="qt-7" className="mt-5">
          <h3 className="text-2xl mb-4">
            Você já se submeteu a cirurgias para perda de peso anteriormente?
          </h3>
          <RadioGroup className="flex gap-4" name="cirurgias-peso">
            <FieldLabel htmlFor="cirurgias-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} />
                  <FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="nao"
                  id="cirurgias-nao"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="cirurgias-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="sim"
                  id="cirurgias-sim"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
          <Label htmlFor="lista-medicamentos" className="text-base mb-2">
            Por favor, liste os medicamentos que lhe foram prescritos:
          </Label>
          <Textarea
            className="input-default w-full h-37.5 bg-white"
            id="lista-medicamentos"
            name="lista-medicamentos"
            placeholder="Escreva aqui..."
          />
        </div>

        <Separator className="mt-8" />
        {/* qt-8 Você está tomando algum medicamento com receita médica atualmente?*/}

        <div id="qt-7" className="mt-5">
          <h3 className="text-2xl mb-4">
            Você está tomando algum medicamento com receita médica atualmente?
          </h3>
          <RadioGroup className="flex gap-4" name="medicamentos-prescritos">
            <FieldLabel htmlFor="medicamentos-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} />
                  <FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="nao"
                  id="medicamentos-nao"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="medicamentos-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value="sim"
                  id="medicamentos-sim"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
          <Label htmlFor="lista-medicamentos" className="text-base mb-2">
            Por favor, liste os medicamentos que lhe foram prescritos:
          </Label>
          <Textarea
            className="input-default w-full h-37.5 bg-white"
            rows={10}
            cols={60}
            id="lista-medicamentos"
            name="lista-medicamentos"
            placeholder="Escreva aqui..."
          />
        </div>
        <Separator className="mt-8" />
        {/* qt-9 Qual é a sua faixa de pressão arterial? */}
        <div id="qt-9" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua faixa de pressão arterial?
          </h2>
          <RadioGroup className="flex flex-col gap-4">
            <FieldLabel
              htmlFor="faixa-normal"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/normal.svg" width={30} height={30} />
                    <FieldTitle className="m-0">Normal 120/80</FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="normal"
                  id="faixa-normal"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="faixa-elevado"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/elevado.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      Elevado 120/129/&lt;80
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="elevado"
                  id="faixa-elevado"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="faixa-hiper1"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/hiper.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      Hipertensão Estágio 1
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="hiper1"
                  id="faixa-hiper1"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="faixa-hiper2"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/hiper2.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      Hipertensão Estágio 2
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="hiper2"
                  id="faixa-hiper2"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
        <Separator className="mt-8" />

        {/* qt-10 Qual é a sua frequência cardíaca média em repouso? */}
        <div id="qt-10" className="mt-5">
          <h2 className="text-2xl font-bold mb-4">
            Qual é a sua frequência cardíaca média em repouso?
          </h2>
          <RadioGroup className="flex flex-col gap-4">
            <FieldLabel
              htmlFor="freq-lento"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/lento.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      &lt;60 batimentos por minuto - Lento
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="lento"
                  id="freq-lento"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="freq-normal"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/normal.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      60 - 100 batimentos por minuto - Normal
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="normal"
                  id="freq-normal"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="freq-rapido"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/rapido.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      101 - 110 batimentos por minuto - Rápido
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="rapido"
                  id="freq-rapido"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="freq-acelerado"
              className="input-default checked-border cursor-pointer"
            >
              <Field orientation="vertical">
                <FieldContent>
                  <div className="flex flex-row items-center gap-2">
                    <Image alt="" src="/acelerado.svg" width={30} height={30} />
                    <FieldTitle className="m-0">
                      &gt;110 batimentos por minuto - Acelerado
                    </FieldTitle>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  value="acelerado"
                  id="freq-acelerado"
                  className="hidden"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
        <br/>
        <input type="submit" value="Proximo" className="submit" />
      </form>
    </section>
  );
}
