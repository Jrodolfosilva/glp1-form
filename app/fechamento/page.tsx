"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Option = "normal" | "rapido" | "acelerado" | null;

const intermediateContent: Record<
  Exclude<Option, null>,
  { title: string; subtitle: string }
> = {
  normal: {
    title: "Perfeito!",
    subtitle:
      "Perder 0 kg é mais fácil do que você imagina - e não envolve dietas restritivas.",
  },
  rapido: {
    title: "Sem problema, podemos ir mais rápido.",
    subtitle:
      "Vai exigir algum esforço, mas com a medicação GLP-1, seu objetivo de perder 0 kg pode ser alcançado em cerca de 0 semanas - e não envolve dietas restritivas.",
  },
  acelerado: {
    title: "Vamos respeitar o seu ritmo.",
    subtitle:
      "Com a medicação GLP-1, atingir seu objetivo de perder 0 kg é mais fácil do que você imagina - e não envolve dietas restritivas.",
  },
};

const diasOptions = [
  { value: "0-5", label: "0 a 5 dias" },
  { value: "6-10", label: "6 a 10 dias" },
  { value: "11-14", label: "11 a 14 dias" },
  {
    value: "mais-2-semanas",
    label: "Há mais de duas semanas, mas nas últimas quatro semanas",
  },
  { value: "mais-4-semanas", label: "Há mais de 4 semanas" },
];

export default function Glp() {
  const router = useRouter();
  const [step, setStep] = useState<
    "initial" | "intermediate" | "final" | "glp1"
  >("initial");
  const [selectedOption, setSelectedOption] = useState<Option>(null);
  function handleOptionSelect(value: string) {
    setSelectedOption(value as Option);
    setStep("intermediate");
  }

  function handleContinue() {
    setStep("final");
  }

  function handleFinalOption(value: string) {
    if (value === "glp1") {
      setStep("glp1");
    } else if (value === "diferente") {
      router.push("#");
    } else if (value === "nao") {
      router.push("#");
    }
  }

  return (
    <section className="mx-auto max-w-112.5 py-16">
      <header>
        <h1 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
          Com a medicação, você perderá de 0 a 0 quilos <b>por semana</b>.
        </h1>
        <Separator className="mt-4" />
      </header>

      {/* Step 1: Escolha de ritmo */}
      {step === "initial" && (
        <form className="mt-5">
          <div id="qt-10" className="mt-5">
            <h2 className="mb-4 text-[20px] font-medium leading-tight font-['Red_Hat_Text'] text-[#111827]">
              Levará cerca de {3} semanas para atingir seu peso ideal.
            </h2>

            <Separator className="mt-4 mb-4" />
            <p className="text-[17px] text-[#111827] mb-6">
              Como está sendo esse ritmo para você?
            </p>
            <RadioGroup
              className="flex flex-col gap-4"
              onValueChange={handleOptionSelect}
            >
              <FieldLabel
                htmlFor="freq-normal"
                className="input-default checked-border cursor-pointer p-0"
              >
                <Field orientation="vertical">
                  <FieldContent>
                    <div className="flex items-center gap-2">
                      <Image alt="" src="/normal.svg" width={30} height={30} />
                      <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                        Isso funciona para mim.
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
                className="input-default checked-border cursor-pointer p-0"
              >
                <Field orientation="vertical">
                  <FieldContent>
                    <div className="flex items-center gap-2">
                      <Image alt="" src="/rapido.svg" width={30} height={30} />
                      <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                        Quero que seja mais rápido.
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
                className="input-default checked-border cursor-pointer p-0"
              >
                <Field orientation="vertical">
                  <FieldContent>
                    <div className="flex items-center gap-2">
                      <Image
                        alt=""
                        src="/acelerado.svg"
                        width={30}
                        height={30}
                      />
                      <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                        Isso é muito rápido.
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
        </form>
      )}

      {/* Step 2: Seção intermediária */}
      {step === "intermediate" && selectedOption && (
        <div className="mt-5">
          <div className="flex flex-col items-center text-center gap-4 mt-16">
            <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
              {intermediateContent[selectedOption].title}
            </h2>
            <Separator className="my-2" />
            <p className="text-[17px] text-[#111827] max-w-md">
              {intermediateContent[selectedOption].subtitle}
            </p>
            <button
              type="button"
              onClick={handleContinue}
              className="submit mt-8 cursor-pointer"
            >
              Seguir
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Seção final - pergunta sobre medicamento */}
      {step === "final" && (
        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">
            Você tomou algum medicamento para emagrecer nas últimas 4 semanas?
          </h2>
          <Separator className="mt-8" />
          <RadioGroup
            className="flex flex-col gap-4 mt-5"
            onValueChange={handleFinalOption}
          >
            <FieldLabel
              htmlFor="final-glp1"
              className="input-default checked-border cursor-pointer p-0 justify-center"
            >
              <Field orientation="horizontal" className="items-center gap-3">
                <RadioGroupItem
                  value="glp1"
                  id="final-glp1"
                />
                <FieldContent>
                  <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                    Sim, eu tomei medicação GLP-1
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>

            <FieldLabel
              htmlFor="final-diferente"
              className="input-default checked-border cursor-pointer p-0 justify-center"
            >
              <Field orientation="horizontal" className="items-center gap-3">
                <RadioGroupItem
                  value="diferente"
                  id="final-diferente"
                />
                <FieldContent>
                  <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                    Sim, tomei um medicamento diferente para emagrecer
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>

            <FieldLabel
              htmlFor="final-nao"
              className="input-default checked-border cursor-pointer p-0 justify-center"
            >
              <Field orientation="horizontal" className="items-center gap-3">
                <RadioGroupItem
                  value="nao"
                  id="final-nao"
                />
                <FieldContent>
                  <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                    Não
                  </FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </div>
      )}

      {/* Step 4: Sub-seção GLP-1 */}
      {step === "glp1" && (
        <div className="mt-5">
          {/* Informação do medicamento */}
          <div id="qt-descricao-glp1" className="mt-5">
            <h2 className="text-2xl font-bold mb-4">
              Ótimo! Você tem experiência com GLP-1.
            </h2>
            <p className="text-base mb-4">
              Por favor, informe o nome, a dose e a frequência de uso do seu
              medicamento GLP-1.
            </p>
            <Textarea
              className="input-default w-full h-37.5 bg-white"
              id="descricao-glp1"
              name="descricao-glp1"
              placeholder="Escreva aqui..."
            />
          </div>

          <Separator className="mt-8" />

          {/* Última dose */}
          <div id="qt-ultima-dose" className="mt-5">
            <h3 className="text-2xl font-bold mb-4">
              Quando foi sua última dose de medicação?
            </h3>
            <RadioGroup className="flex flex-col gap-4" name="ultima-dose">
              {diasOptions.map((opt) => (
                <FieldLabel
                  key={opt.value}
                  htmlFor={`dose-${opt.value}`}
                  className="input-default checked-border cursor-pointer p-0 justify-center"
                >
                  <Field orientation="horizontal" className="items-center gap-3">
                    <RadioGroupItem
                      value={opt.value}
                      id={`dose-${opt.value}`}
                    />
                    <FieldContent>
                      <FieldTitle className="m-0 font-bold text-sm font-['Red_Hat_Text']">
                        {opt.label}
                      </FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </div>

          <Separator className="mt-8" />

          {/* Peso inicial */}
          <div id="qt-peso-inicial" className="mt-5">
            <h3 className="text-2xl font-bold mb-4">
              Qual era o seu peso inicial?
            </h3>
            <div className="flex-1 space-y-2">
              <Label htmlFor="peso-inicial">Peso inicial</Label>
              <Input
                id="peso-inicial"
                type="number"
                placeholder="Ex: 90"
                className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
              />
            </div>
          </div>

          <Separator className="mt-8" />

          {/* Foto do medicamento */}
          <div id="qt-foto-medicamento" className="mt-5">
            <h3 className="text-2xl font-bold mb-4">
              Por favor, tire ou envie uma foto do seu medicamento GLP-1.
            </h3>
            <p className="text-base mb-4">
              Se você estiver solicitando uma receita para sua dose atual ou
              para uma dose maior, isso é importante. Se você não tiver uma foto
              disponível, pode pular esta etapa.
            </p>
            <Input
              id="foto-medicamento"
              type="file"
              accept="image/*"
              className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4671ff] file:text-white hover:file:bg-[#3a5fe0]"
            />
            <p className="text-[13px] text-[#9ca3af] mt-1">
              Máximo de 15MB
            </p>
          </div>

          <Separator className="mt-8" />

          {/* Concordância */}
          <div id="qt-concordancia" className="mt-5">
            <h3 className="text-2xl font-bold mb-4">
              Você concorda em obter medicamentos para perda de peso somente por
              meio deste programa daqui para frente?
            </h3>
            <p className="text-base mb-4">
              É importante não &ldquo;empilhar&rdquo; medicamentos para perda de
              peso.
            </p>
            <RadioGroup className="flex gap-4" name="concorda-programa">
              <FieldLabel htmlFor="concorda-sim" className="radio-card">
                <Field orientation="vertical" className="h-35">
                  <FieldContent className="flex flex-col items-center gap-2 justify-center">
                    <Image alt="" src="/yes.svg" width={30} height={30} />
                    <FieldTitle>Sim</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="sim"
                    id="concorda-sim"
                    className="hidden"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="concorda-nao" className="radio-card">
                <Field orientation="vertical" className="h-35">
                  <FieldContent className="flex flex-col items-center gap-2 justify-center">
                    <Image alt="" src="/no.svg" width={30} height={30} />
                    <FieldTitle>Não</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value="nao"
                    id="concorda-nao"
                    className="hidden"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>

          <Separator className="mt-8" />
          <input type="submit" value="Próximo" className="submit" />
        </div>
      )}
    </section>
  );
}
