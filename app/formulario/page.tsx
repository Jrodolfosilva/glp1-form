"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { CloudUpload, X, TriangleAlert, ChevronLeft } from "lucide-react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useState, useRef, useEffect } from "react";
import { calcularEstimativa, getIntermediateContent } from "@/lib/estimativas";
import type { Estimativa } from "@/lib/estimativas";
import { salvarFormulario, carregarFormulario } from "@/lib/form-storage";
import { submitCheckEligibility } from "./actions";
import type { FormDataEntry } from "./actions";

type Option = "normal" | "rapido" | "acelerado" | null;

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

  // Fechamento step state
  const [stepIndex, setStepIndex] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [sexo, setSexo] = useState<string | null>(null);
  const [situacaoGravida, setSituacaoGravida] = useState(false);
  const [situacaoAmamentacao, setSituacaoAmamentacao] = useState(false);
  const [diabetesTipo2Insulina, setDiabetesTipo2Insulina] = useState(false);
  const [diabetesTipo1, setDiabetesTipo1] = useState(false);
  const [anticoagulanteVarfarina, setAnticoagulanteVarfarina] = useState(false);
  const [pancreatiteAtual, setPancreatiteAtual] = useState(false);
  const [alergicoMedicamento, setAlergicoMedicamento] = useState(false);
  const [hiv, setHiv] = useState(false);
  const [analgesicos, setAnalgesicos] = useState<string | null>(null);
  const [cirurgias, setCirurgias] = useState<string | null>(null);
  const [medicamentos, setMedicamentos] = useState<string | null>(null);
  const [pressao, setPressao] = useState<string | null>(null);
  const [frequencia, setFrequencia] = useState<string | null>(null);
  const [estimativa, setEstimativa] = useState<Estimativa | null>(null);
  const [alturaSalva, setAlturaSalva] = useState(0);
  const [pesoSalvo, setPesoSalvo] = useState(0);
  const [pesoIdealSalvo, setPesoIdealSalvo] = useState(0);
  const [interesseOptions, setInteresseOptions] = useState<string[]>([]);
  const [infoAdicional, setInfoAdicional] = useState<string | null>(null);
  const [infoAdicionalTexto, setInfoAdicionalTexto] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataDia, setDataDia] = useState("");
  const [dataMes, setDataMes] = useState("");
  const [dataAno, setDataAno] = useState("");
  const [descricaoGlp1, setDescricaoGlp1] = useState("");
  const [ultimaDose, setUltimaDose] = useState("");
  const [concordaPrograma, setConcordaPrograma] = useState<string | null>(null);
  const [nenhumProblemaAcima, setNenhumProblemaAcima] = useState(true);
  const [erroValidacao, setErroValidacao] = useState<string | null>(null);
  const [erroStep, setErroStep] = useState<string | null>(null);

  const alturaRef = useRef<HTMLInputElement>(null);
  const pesoRef = useRef<HTMLInputElement>(null);
  const pesoIdealRef = useRef<HTMLInputElement>(null);

  // Restaurar estado salvo ao montar
  useEffect(() => {
    const saved = carregarFormulario();
    if (saved) {
      // Não restaura stepIndex, maxStep ou formSubmitted — sempre começa do início
      // Mas pré-preenche os dados do formulário
      if (saved.estimativa) setEstimativa(saved.estimativa as Estimativa);
      if (typeof saved.alturaSalva === "number") setAlturaSalva(saved.alturaSalva);
      if (typeof saved.pesoSalvo === "number") setPesoSalvo(saved.pesoSalvo);
      if (typeof saved.pesoIdealSalvo === "number") setPesoIdealSalvo(saved.pesoIdealSalvo);
      if (typeof saved.sexo === "string") setSexo(saved.sexo);
      if (typeof saved.situacaoGravida === "boolean") setSituacaoGravida(saved.situacaoGravida);
      if (typeof saved.situacaoAmamentacao === "boolean") setSituacaoAmamentacao(saved.situacaoAmamentacao);
      if (typeof saved.diabetesTipo2Insulina === "boolean") setDiabetesTipo2Insulina(saved.diabetesTipo2Insulina);
      if (typeof saved.diabetesTipo1 === "boolean") setDiabetesTipo1(saved.diabetesTipo1);
      if (typeof saved.anticoagulanteVarfarina === "boolean") setAnticoagulanteVarfarina(saved.anticoagulanteVarfarina);
      if (typeof saved.pancreatiteAtual === "boolean") setPancreatiteAtual(saved.pancreatiteAtual);
      if (typeof saved.alergicoMedicamento === "boolean") setAlergicoMedicamento(saved.alergicoMedicamento);
      if (typeof saved.hiv === "boolean") setHiv(saved.hiv);
      if (typeof saved.analgesicos === "string") setAnalgesicos(saved.analgesicos);
      if (typeof saved.cirurgias === "string") setCirurgias(saved.cirurgias);
      if (typeof saved.medicamentos === "string") setMedicamentos(saved.medicamentos);
      if (typeof saved.pressao === "string") setPressao(saved.pressao);
      if (typeof saved.frequencia === "string") setFrequencia(saved.frequencia);
      if (Array.isArray(saved.interesseOptions)) setInteresseOptions(saved.interesseOptions);
      if (typeof saved.infoAdicional === "string" || saved.infoAdicional === null) setInfoAdicional(saved.infoAdicional);
      if (typeof saved.infoAdicionalTexto === "string") setInfoAdicionalTexto(saved.infoAdicionalTexto);
      if (typeof saved.nome === "string") setNome(saved.nome);
      if (typeof saved.sobrenome === "string") setSobrenome(saved.sobrenome);
      if (typeof saved.estado === "string") setEstado(saved.estado);
      if (typeof saved.email === "string") setEmail(saved.email);
      if (typeof saved.telefone === "string") setTelefone(saved.telefone);
      if (typeof saved.dataDia === "string") setDataDia(saved.dataDia);
      if (typeof saved.dataMes === "string") setDataMes(saved.dataMes);
      if (typeof saved.dataAno === "string") setDataAno(saved.dataAno);
      if (typeof saved.descricaoGlp1 === "string") setDescricaoGlp1(saved.descricaoGlp1);
      if (typeof saved.ultimaDose === "string") setUltimaDose(saved.ultimaDose);
      if (typeof saved.concordaPrograma === "string" || saved.concordaPrograma === null) setConcordaPrograma(saved.concordaPrograma);
      if (typeof saved.nenhumProblemaAcima === "boolean") setNenhumProblemaAcima(saved.nenhumProblemaAcima);
    }
  }, []);

  // Salvar estado sempre que mudar
  useEffect(() => {
    salvarFormulario({
      sexo,
      situacaoGravida,
      situacaoAmamentacao,
      diabetesTipo2Insulina,
      diabetesTipo1,
      anticoagulanteVarfarina,
      pancreatiteAtual,
      alergicoMedicamento,
      hiv,
      analgesicos,
      cirurgias,
      medicamentos,
      pressao,
      frequencia,
      interesseOptions,
      infoAdicional,
      infoAdicionalTexto,
      nome,
      sobrenome,
      estado,
      email,
      telefone,
      dataDia,
      dataMes,
      dataAno,
      descricaoGlp1,
      ultimaDose,
      concordaPrograma,
      nenhumProblemaAcima,
      selectedOption,
      estimativa,
      alturaSalva,
      pesoSalvo,
      pesoIdealSalvo,
    });
  }, [
    sexo, situacaoGravida, situacaoAmamentacao,
    diabetesTipo2Insulina, diabetesTipo1, anticoagulanteVarfarina,
    pancreatiteAtual, alergicoMedicamento, hiv,
    analgesicos, cirurgias, medicamentos, pressao, frequencia,
    interesseOptions, infoAdicional, infoAdicionalTexto,
    nome, sobrenome, estado, email, telefone,
    dataDia, dataMes, dataAno, descricaoGlp1, ultimaDose, concordaPrograma, nenhumProblemaAcima,
    selectedOption, estimativa,
    alturaSalva, pesoSalvo, pesoIdealSalvo,
  ]);

  function goBack() {
    setStepIndex(prev => Math.max(0, prev - 1));
  }

  function goForward() {
    setStepIndex(prev => Math.min(maxStep, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleOptionSelect(value: string) {
    setSelectedOption(value as Option);
    setStepIndex(1);
    setMaxStep(prev => Math.max(prev, 1));
    setEstimativa(calcularEstimativa(pesoSalvo, pesoIdealSalvo, value as "normal" | "rapido" | "acelerado"));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleContinue() {
    setStepIndex(2);
    setMaxStep(prev => Math.max(prev, 2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleFinalOption(value: string) {
    if (value === "glp1") {
      setStepIndex(3);
      setMaxStep(prev => Math.max(prev, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (value === "diferente") {
      router.push("#");
    } else if (value === "nao") {
      router.push("#");
    }
  }

  function handleGlp1Continue() {
    setStepIndex(4);
    setMaxStep(prev => Math.max(prev, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleInteresse(option: string) {
    setInteresseOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  }

  function handleQt5ConditionClick() {
    if (nenhumProblemaAcima) setNenhumProblemaAcima(false);
  }

  function handleNenhumProblemaToggle(checked: boolean) {
    setNenhumProblemaAcima(checked);
    if (checked) {
      // Desmarca todas as outras condições do qt-5
      const qt5 = document.getElementById("qt-5");
      if (qt5) {
        const checkboxes = qt5.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"]:not([id="nenhum-problema-acima"])'
        );
        checkboxes.forEach((cb) => { cb.checked = false; });
      }
    }
  }

  function validarPrimeiroForm(): boolean {
    const altura = Number(alturaRef.current?.value);
    const peso = Number(pesoRef.current?.value);
    const pesoIdeal = Number(pesoIdealRef.current?.value);
    if (!altura || !peso || !pesoIdeal) {
      setErroValidacao("Preencha altura, peso e peso ideal.");
      return false;
    }
    if (!sexo) {
      setErroValidacao("Selecione seu sexo.");
      return false;
    }
    if (!dataDia || !dataMes || !dataAno) {
      setErroValidacao("Preencha sua data de nascimento completa.");
      return false;
    }
    if (!analgesicos) {
      setErroValidacao("Responda sobre uso de analgésicos opiáceos.");
      return false;
    }
    if (!cirurgias) {
      setErroValidacao("Responda sobre cirurgias para perda de peso.");
      return false;
    }
    if (!medicamentos) {
      setErroValidacao("Responda sobre medicamentos com receita.");
      return false;
    }
    if (!pressao) {
      setErroValidacao("Selecione sua faixa de pressão arterial.");
      return false;
    }
    if (!frequencia) {
      setErroValidacao("Selecione sua frequência cardíaca.");
      return false;
    }
    setErroValidacao(null);
    return true;
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formSubmitted) {
      if (!validarPrimeiroForm()) return;
      const altura = Number(alturaRef.current?.value);
      const peso = Number(pesoRef.current?.value);
      const pesoIdeal = Number(pesoIdealRef.current?.value);
      setAlturaSalva(altura);
      setPesoSalvo(peso);
      setPesoIdealSalvo(pesoIdeal);
      setEstimativa(calcularEstimativa(peso, pesoIdeal));
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Validar campos do checkpoint
      if (!nome || !sobrenome) { setErroValidacao("Preencha seu nome e sobrenome."); return; }
      if (!estado) { setErroValidacao("Selecione seu estado."); return; }
      if (!email) { setErroValidacao("Informe seu e-mail."); return; }
      if (!telefone) { setErroValidacao("Informe seu telefone."); return; }
      setErroValidacao(null);
      // Submit final — CHECK Eligibility — coletar todos os dados
      const payload = coletarTodosDados();
      submitCheckEligibility(payload);
    }
  }

  /** Coleta todos os campos do formulário — state + DOM (uncontrolled) */
  function coletarTodosDados(): Record<string, unknown> {
    const dataNascimento = `${dataAno}-${String(dataMes).padStart(2, "0")}-${String(dataDia).padStart(2, "0")}`;

    // Textareas condicionais do DOM
    const getTextareaValue = (id: string): string =>
      (document.getElementById(id) as HTMLTextAreaElement)?.value ?? "";

    const getCheckbox = (id: string): boolean => {
      const el = document.getElementById(id);
      return el?.getAttribute("data-state") === "checked";
    };

    const pesoInicial = (document.getElementById("peso-inicial") as HTMLInputElement)?.value ?? "";
    const interesseConsultaAoVivo = (interesseOptions ?? []).includes(
      "Não tenho certeza — gostaria de discutir as opções de formulação com um profissional clínico por meio de uma consulta virtual ao vivo"
    );

    return {
      perfil_usuario: {
        nome,
        sobrenome,
        email,
        telefone,
        data_nascimento: dataNascimento,
        sexo,
        estado,
      },
      biometria: {
        altura: alturaSalva,
        peso_atual: pesoSalvo,
        peso_ideal: pesoIdealSalvo,
        imc:
          alturaSalva > 0 && pesoSalvo > 0
            ? Number((pesoSalvo / ((alturaSalva / 100) ** 2)).toFixed(1))
            : null,
        objetivo_perda_kg: estimativa?.kgAPerder ?? 0,
      },
      estimativas_tratamento: {
        semanas_estimadas: estimativa?.semanasEstimadas ?? 0,
        perda_semanal_estimada_kg: estimativa?.kgPorSemana ?? 0,
        ritmo: selectedOption,
        fluxo: "glp1",
      },
      historico_clinico: {
        situacao_atual: {
          gravida: situacaoGravida,
          amamentando: situacaoAmamentacao,
          deu_a_luz_6_meses: getCheckbox("situacao-ultimos-6-meses"),
          nenhuma_das_acima: getCheckbox("situacao-nenhuma"),
          doenca_renal_terminal: getCheckbox("saude-renal-terminal"),
          doenca_hepatica_terminal: getCheckbox("saude-hepatica-terminal"),
          pensamentos_suicidas: getCheckbox("pensamentos-suicidas"),
          cancer: getCheckbox("cancer"),
          condicao_gastrointestinal: getCheckbox("cond-gastrointestinal"),
          transtorno_dependencia: getCheckbox("transtorno-dependencia"),
          hospitalizacao_ultimo_ano: getCheckbox("hospitalizacao-ultimo-ano"),
        },
        condicoes_preexistentes: {
          diabetes_tipo_1: diabetesTipo1,
          diabetes_tipo_2_insulina: diabetesTipo2Insulina,
          hipotireoidismo_nao_tratado: getCheckbox("hipotireoidismo-nao-tratado"),
          doenca_vesicula_biliar: getCheckbox("doenca-vesicula-biliar"),
          hipertensao: getCheckbox("hipertensao-pressao-alta"),
          convulsoes: getCheckbox("convulsoes"),
          glaucoma: getCheckbox("glaucoma"),
          apneia_sono: getCheckbox("apneia-sono"),
          historico_tireoide: getCheckbox("historico-tireoide"),
          gota: getCheckbox("gota"),
          colesterol_triglicerideos: getCheckbox("colesterol-triglicerideos"),
          depressao: getCheckbox("depressao"),
          tumor_infeccao_cerebro_medula: getCheckbox("tumor-infeccao-cerebro-medula"),
          figado_gorduroso: getCheckbox("doenca-hepatica-gorduroso"),
          doenca_renal: getCheckbox("doenca-renal"),
          taquicardia: getCheckbox("taquicardia"),
          doenca_coronariana_avc: getCheckbox("doenca-coronariana-avc"),
          intervalo_qt: getCheckbox("intervalo-qt"),
          refluxo_acido: getCheckbox("refluxo-acido"),
          asma: getCheckbox("asma"),
          incontinencia_urinaria: getCheckbox("incontinencia-urinaria"),
          sop_ovario_policistico: getCheckbox("sop"),
          baixa_testosterona: getCheckbox("baixa-testosterona"),
          osteoartrite: getCheckbox("osteoartrite"),
          constipacao: getCheckbox("constipacao"),
          pancreatite: pancreatiteAtual,
          hiv,
        },
        medicamentos_e_alergias: {
          usa_medicamentos_prescritos: medicamentos,
          lista_medicamentos_prescritos: getTextareaValue("lista-medicamentos-qt8"),
          lista_medicamentos_cirurgia: getTextareaValue("lista-medicamentos-cirurgias"),
          ja_fez_cirurgia_perda_peso: cirurgias,
          alergico_medicamento: alergicoMedicamento,
          info_alergia: getTextareaValue("info-alergia"),
          usa_anticoagulante_varfarina: anticoagulanteVarfarina,
          usa_analgesicos_opiaceos: analgesicos,
          info_analgesicos: getTextareaValue("informacoes-analgesicos"),
          pressao_arterial: pressao,
          frequencia_cardiaca: frequencia,
        },
      },
      experiencia_glp1: {
        ja_usou_glp1: descricaoGlp1,
        ultima_dose: ultimaDose,
        peso_inicial_glp1: pesoInicial ? Number(pesoInicial) : null,
        concorda_nao_empilhar: concordaPrograma,
        interesses_personalizacao: interesseOptions,
        interesse_consulta_ao_vivo: interesseConsultaAoVivo,
        info_adicional: infoAdicional === "sim" ? infoAdicionalTexto : null,
      },
    };
  }

  return (
    <section className="mx-auto max-w-112.5 ">
      {!formSubmitted && (
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
      )}
      <form className="mt-5" onSubmit={handleFormSubmit}>
        {!formSubmitted && (
          <>
            {/* qt-1 Primeira seção de pergunta: peso e altura */}
            <div id="qt-1" className="">
              <h2 className="text-2xl font-bold mb-4">
                Qual é a sua altura e o seu peso?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-1</span>
              </h2>
              <div className="grid gap-4 ">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="altura">Altura (cm)</Label>
                    <Input
                      id="altura"
                      ref={alturaRef}
                      type="number"
                      placeholder="Ex: 170"
                      className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="peso">Peso (kg)</Label>
                    <Input
                      id="peso"
                      ref={pesoRef}
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
                    ref={pesoIdealRef}
                    type="number"
                    placeholder="Ex: 60"
                    className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                  />
                </div>
              </div>
            </div>

            <Separator className="mt-8" />

            {/* qt-2 Segunda seção de pergunta, sexo*/}
            <div id="qt-2" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">Você é homem ou mulher?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-2</span>
              </h2>
              <div className="grid gap-4 ">
                <RadioGroup className="flex gap-4" value={sexo} onValueChange={setSexo}>
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

            {/* qt-3 Terceira seção de pergunta, idade */}
            <div id="qt-3" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">
                Qual é a sua data de nascimento?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-3</span>
              </h2>
              <div className="grid gap-4 ">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="dataNascimento">Data de nascimento</Label>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="dia">Dia</Label>
                      <Select value={dataDia} onValueChange={setDataDia}>
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
                      <Select value={dataMes} onValueChange={setDataMes}>
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
                        value={dataAno}
                        onChange={(e) => setDataAno(e.target.value)}
                        placeholder="Ex: 1990"
                        className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sexo === "mulher" && (
              <>
            <Separator className="mt-8" />

            {/* qt-condicional-1 se for mulher qt-2 seção de pergunta */}
            <div id="qt-condicional-1" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">
                Alguma dessas situações se aplica a você?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-condicional-1</span>
              </h2>
              <div className="grid gap-4">
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox
                        id="situacao-gravida"
                        name="situacao-gravida"
                        checked={situacaoGravida}
                        onCheckedChange={(c) => setSituacaoGravida(c === true)}
                      />
                      <FieldContent>
                        <FieldTitle>
                          Atualmente grávida, possivelmente grávida ou tentando
                          engravidar ativamente.
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {situacaoGravida && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox
                        id="situacao-amamentacao"
                        name="situacao-amamentacao"
                        checked={situacaoAmamentacao}
                        onCheckedChange={(c) => setSituacaoAmamentacao(c === true)}
                      />
                      <FieldContent>
                        <FieldTitle>
                          Amamentação ou alimentação com mamadeira com leite materno
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {situacaoAmamentacao && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
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
            </>
            )}

            {/* qt-4 Questões de Saúde 1 */}
            <div id="qt-4" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">Questões de Saúde 1
                <span className="text-red-500 text-sm ml-2 font-normal">qt-4</span>
              </h2>
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
              <h2 className="text-2xl font-bold mb-4">Questões de Saúde 2
                <span className="text-red-500 text-sm ml-2 font-normal">qt-5</span>
              </h2>
              <p className="text-base mb-4">
                Alguma dessas situações se aplica a você?
              </p>
              <div className="grid gap-4" onClick={(e) => {
                // Se clicou em qualquer checkbox que não seja "Nenhum problema acima", desmarca ele
                const target = e.target as HTMLElement;
                const checkboxEl = target.closest('[role="checkbox"]');
                if (checkboxEl && checkboxEl.id !== "nenhum-problema-acima") {
                  if (nenhumProblemaAcima) setNenhumProblemaAcima(false);
                }
              }}>
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
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox
                        id="diabetes-tipo-2-insulina"
                        name="diabetes-tipo-2-insulina"
                        checked={diabetesTipo2Insulina}
                        onCheckedChange={(c) => setDiabetesTipo2Insulina(c === true)}
                      />
                      <FieldContent>
                        <FieldTitle>Diabetes Tipo 2 (em uso insulina)</FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {diabetesTipo2Insulina && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox id="diabetes-tipo-1" name="diabetes-tipo-1" checked={diabetesTipo1} onCheckedChange={(c) => setDiabetesTipo1(c === true)} />
                      <FieldContent>
                        <FieldTitle>Diabetes Tipo 1</FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {diabetesTipo1 && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox
                        id="anticoagulante-varfarina"
                        name="anticoagulante-varfarina"
                        checked={anticoagulanteVarfarina}
                        onCheckedChange={(c) => setAnticoagulanteVarfarina(c === true)}
                      />
                      <FieldContent>
                        <FieldTitle>
                          Uso do anticoagulante varfarina (Coumadin/Jantoven)
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {anticoagulanteVarfarina && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox id="pancreatite-atual" name="pancreatite-atual" checked={pancreatiteAtual} onCheckedChange={(c) => setPancreatiteAtual(c === true)} />
                      <FieldContent>
                        <FieldTitle>
                          Histórico ou presença atual de pancreatite
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {pancreatiteAtual && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
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
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox
                        id="alergico-medicamento"
                        name="alergico-medicamento"
                        checked={alergicoMedicamento}
                        onCheckedChange={(c) => setAlergicoMedicamento(c === true)}
                      />
                      <FieldContent>
                        <FieldTitle>Alérgico a qualquer medicamento</FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {alergicoMedicamento && (
                    <div className="mt-2 space-y-1">
                      <Label htmlFor="info-alergia" className="text-sm">Por favor, forneça mais informações sobre sua alergia a medicamentos:</Label>
                      <Textarea
                        id="info-alergia"
                        name="info-alergia"
                        placeholder="Escreva aqui..."
                        className="input-default w-full h-30 bg-white"
                      />
                    </div>
                  )}
                </div>
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
                <div>
                  <FieldLabel>
                    <Field orientation="horizontal" className="input-default">
                      <Checkbox id="hiv" name="hiv" checked={hiv} onCheckedChange={(c) => setHiv(c === true)} />
                      <FieldContent>
                        <FieldTitle>
                          Vírus da imunodeficiência humana (HIV)
                        </FieldTitle>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                  {hiv && (
                    <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                      <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                    </div>
                  )}
                </div>
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
                      checked={nenhumProblemaAcima}
                      onCheckedChange={(c) => handleNenhumProblemaToggle(c === true)}
                    />
                    <FieldContent>
                      <FieldTitle>Nenhum problema acima</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </div>
            </div>
            <Separator className="mt-8" />

            {/* qt-6: Nos últimos 3 meses, você utilizou analgésicos opiáceos e/ou drogas ilícitas à base de opiáceos? */}
            <div id="qt-6" className="mt-5">
              <h3 className="text-2xl mb-4">
                Nos últimos 3 meses, você utilizou analgésicos opiáceos e/ou drogas
                ilícitas à base de opiáceos?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-6</span>
              </h3>
              <RadioGroup className="flex gap-4" name="analgesicos-ilicitos" value={analgesicos} onValueChange={setAnalgesicos}>
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
              {analgesicos === "sim" && (
                <>
              <Label htmlFor="informacoes-analgesicos" className="text-base mb-2">
                Por favor, forneça mais informações.
              </Label>
              <Textarea
                id="informacoes-analgesicos"
                name="informacoes-analgesicos"
                placeholder="Escreva aqui..."
                className="input-default w-full h-37.5 bg-white"
              />
              </>
              )}
            </div>
            <Separator className="mt-8" />

            {/* qt-7 Você já se submeteu a cirurgias para perda de peso anteriormente? */}
            <div id="qt-7" className="mt-5">
              <h3 className="text-2xl mb-4">
                Você já se submeteu a cirurgias para perda de peso anteriormente?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-7</span>
              </h3>
              <RadioGroup className="flex gap-4" name="cirurgias-peso" value={cirurgias} onValueChange={setCirurgias}>
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
              {cirurgias === "sim" && (
                <>
              <Label htmlFor="lista-medicamentos-cirurgias" className="text-base mb-2">
                Por favor, liste os medicamentos que lhe foram prescritos:
              </Label>
              <Textarea
                className="input-default w-full h-37.5 bg-white"
                id="lista-medicamentos-cirurgias"
                name="lista-medicamentos-cirurgias"
                placeholder="Escreva aqui..."
              />
              </>
              )}
            </div>

            <Separator className="mt-8" />

            {/* qt-8 Você está tomando algum medicamento com receita médica atualmente? */}
            <div id="qt-8" className="mt-5">
              <h3 className="text-2xl mb-4">
                Você está tomando algum medicamento com receita médica atualmente?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-8</span>
              </h3>
              <RadioGroup className="flex gap-4" name="medicamentos-prescritos" value={medicamentos} onValueChange={setMedicamentos}>
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
              {medicamentos === "sim" && (
                <>
              <Label htmlFor="lista-medicamentos-qt8" className="text-base mb-2">
                Por favor, liste os medicamentos que lhe foram prescritos:
              </Label>
              <Textarea
                className="input-default w-full h-37.5 bg-white"
                rows={10}
                cols={60}
                id="lista-medicamentos-qt8"
                name="lista-medicamentos-qt8"
                placeholder="Escreva aqui..."
              />
              </>
              )}
            </div>
            <Separator className="mt-8" />

            {/* qt-9 Qual é a sua faixa de pressão arterial? */}
            <div id="qt-9" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">
                Qual é a sua faixa de pressão arterial?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-9</span>
              </h2>
              <RadioGroup className="flex flex-col gap-4" value={pressao} onValueChange={setPressao}>
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
              {pressao === "hiper2" && (
                <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
            <Separator className="mt-8" />

            {/* qt-10 Qual é a sua frequência cardíaca média em repouso? */}
            <div id="qt-10" className="mt-5">
              <h2 className="text-2xl font-bold mb-4">
                Qual é a sua frequência cardíaca média em repouso?
                <span className="text-red-500 text-sm ml-2 font-normal">qt-10</span>
              </h2>
              <RadioGroup className="flex flex-col gap-4" value={frequencia} onValueChange={setFrequencia}>
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
              {frequencia === "acelerado" && (
                <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                  <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                  <span>Para sua segurança, esta resposta pode desqualificá-lo(a) para obter uma receita médica.</span>
                </div>
              )}
            </div>
            <br/>
            {erroValidacao && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
                <TriangleAlert className="size-5 shrink-0 text-red-600" />
                <span>{erroValidacao}</span>
              </div>
            )}
            <input type="submit" value="Próximo" className="submit" />
          </>
        )}

        {formSubmitted && (
          <>
            {/* Navegação entre seções */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="flex items-center gap-1 text-sm font-medium text-[#111827] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="size-5" />
                Voltar
              </button>
              <span className="text-xs text-[#9ca3af] font-medium">
                {stepIndex === 0 && "Ritmo"}
                {stepIndex === 1 && "Confirmação"}
                {stepIndex === 2 && "Medicação anterior"}
                {stepIndex === 3 && "Experiência GLP-1"}
                {stepIndex === 4 && "Detalhes GLP-1"}
                {stepIndex === 5 && "Atendimento único"}
                {stepIndex === 6 && "Mais informações"}
                {stepIndex === 7 && "Revisão final"}
              </span>
            </div>
            <Separator />

            {/* qt-11 Escolha de ritmo */}
            {stepIndex === 0 && (
              <div id="qt-11" className="mt-5">
                <h2 className="text-2xl font-bold mb-4">
                  Levará cerca de {estimativa?.semanasEstimadas ?? 0} semanas para perder {estimativa?.kgAPerder ?? 0} kg.
                  <span className="text-red-500 text-sm ml-2 font-normal">qt-11</span>
                </h2>

                <p className="text-[15px] text-[#6b7280] mt-1">
                  Você perderá aproximadamente {estimativa?.kgPorSemana ?? 0} kg por semana.
                </p>
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
                    className="input-default checked-border cursor-pointer"
                  >
                    <Field orientation="vertical">
                      <FieldContent>
                        <div className="flex items-center gap-2">
                          <Image alt="" src="/normal.svg" width={30} height={30} />
                          <FieldTitle className="m-0">
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
                    className="input-default checked-border cursor-pointer"
                  >
                    <Field orientation="vertical">
                      <FieldContent>
                        <div className="flex items-center gap-2">
                          <Image alt="" src="/rapido.svg" width={30} height={30} />
                          <FieldTitle className="m-0">
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
                    className="input-default checked-border cursor-pointer"
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
                          <FieldTitle className="m-0">
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
            )}

            {/* Etapa intermediária: confirmação */}
            {stepIndex === 1 && selectedOption && (
              <div className="mt-5">
                <div className="flex flex-col items-center text-center gap-4 mt-16">
                  <h2 className="font-bold text-[28px] leading-tight font-['Red_Hat_Text'] text-[#111827]">
                    {getIntermediateContent(selectedOption, estimativa ?? { kgAPerder: 0, semanasEstimadas: 0, kgPorSemana: 0 }).title}
                    <span className="text-red-500 text-sm ml-2 font-normal">sq-{selectedOption}</span>
                  </h2>
                  <Separator className="my-2" />
                  <p className="text-[17px] text-[#111827] max-w-md">
                    {getIntermediateContent(selectedOption, estimativa ?? { kgAPerder: 0, semanasEstimadas: 0, kgPorSemana: 0 }).subtitle}
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

            {/* qt-12 Você tomou algum medicamento para emagrecer nas últimas 4 semanas? */}
            {stepIndex === 2 && (
              <div id="qt-12" className="mt-5">
                <h2 className="text-2xl font-bold mb-4">
                  Você tomou algum medicamento para emagrecer nas últimas 4 semanas?
                  <span className="text-red-500 text-sm ml-2 font-normal">qt-12</span>
                </h2>
                <Separator className="mt-8" />
                <RadioGroup
                  className="flex flex-col gap-4 mt-5"
                  onValueChange={handleFinalOption}
                >
                  <FieldLabel
                    htmlFor="final-glp1"
                    className="input-default checked-border cursor-pointer"
                  >
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

                  <FieldLabel
                    htmlFor="final-diferente"
                    className="input-default checked-border cursor-pointer"
                  >
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

                  <FieldLabel
                    htmlFor="final-nao"
                    className="input-default checked-border cursor-pointer"
                  >
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
                </RadioGroup>
              </div>
            )}

            {/* sq-glp1 — Tela intermediária GLP-1 */}
            {stepIndex === 3 && (
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
                  <button
                    type="button"
                    onClick={handleGlp1Continue}
                    className="submit mt-8 cursor-pointer"
                  >
                    Seguir
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Detalhes GLP-1 (qt-13 a qt-17) */}
            {stepIndex === 4 && (
              <div className="mt-5">
                <div id="qt-13" className="mt-5">
                  <h2 className="text-2xl font-bold mb-4">
                    Conte-nos sobre seu medicamento GLP-1.
                    <span className="text-red-500 text-sm ml-2 font-normal">qt-13</span>
                  </h2>
                  <p className="text-base mb-4">
                    Por favor, informe o nome, a dose e a frequência de uso do seu
                    medicamento GLP-1.
                  </p>
                  <Textarea
                    className="input-default w-full h-37.5 bg-white"
                    id="descricao-glp1"
                    name="descricao-glp1"
                    value={descricaoGlp1}
                    onChange={(e) => setDescricaoGlp1(e.target.value)}
                    placeholder="Escreva aqui..."
                  />
                </div>

                <Separator className="mt-8" />

                {/* qt-14 Quando foi sua última dose de medicação? */}
                <div id="qt-14" className="mt-5">
                  <h3 className="text-2xl font-bold mb-4">
                    Quando foi sua última dose de medicação?
                    <span className="text-red-500 text-sm ml-2 font-normal">qt-14</span>
                  </h3>
                  <RadioGroup className="flex flex-col gap-4" name="ultima-dose" value={ultimaDose} onValueChange={setUltimaDose}>
                    {diasOptions.map((opt) => (
                      <FieldLabel key={opt.value} htmlFor={`dose-${opt.value}`}>
                        <Field orientation="horizontal" className="input-default">
                          <RadioGroupItem
                            value={opt.value}
                            id={`dose-${opt.value}`}
                          />
                          <FieldContent>
                            <FieldTitle>{opt.label}</FieldTitle>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </div>

                <Separator className="mt-8" />

                {/* qt-15 Qual era o seu peso inicial? */}
                <div id="qt-15" className="mt-5">
                  <h3 className="text-2xl font-bold mb-4">
                    Qual era o seu peso inicial?
                    <span className="text-red-500 text-sm ml-2 font-normal">qt-15</span>
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

                {/* qt-16 Foto do medicamento */}
                <div id="qt-16" className="mt-5">
                  <h3 className="text-2xl font-bold mb-4">
                    Por favor, tire ou envie uma foto do seu medicamento GLP-1.
                    <span className="text-red-500 text-sm ml-2 font-normal">qt-16</span>
                  </h3>
                  <p className="text-base mb-4">
                    Se você estiver solicitando uma receita para sua dose atual ou
                    para uma dose maior, isso é importante. Se você não tiver uma foto
                    disponível, pode pular esta etapa.
                  </p>
                  <FileUpload
                    maxFiles={1}
                    maxSize={15 * 1024 * 1024}
                    accept="image/*"
                    className="w-full"
                    value={files}
                    onValueChange={setFiles}
                  >
                    <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                      <CloudUpload className="size-4" />
                      <span className="text-sm">Arraste e solte ou</span>
                      <FileUploadTrigger asChild>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          escolha um arquivo
                        </Button>
                      </FileUploadTrigger>
                      <span className="text-sm">para enviar</span>
                    </FileUploadDropzone>
                    <FileUploadList>
                      {files.map((file, index) => (
                        <FileUploadItem key={index} value={file}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button variant="ghost" size="icon" className="size-7">
                              <X className="size-4" />
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                  <p className="text-[13px] text-[#9ca3af] mt-1">
                    Máximo de 15MB
                  </p>
                </div>

                <Separator className="mt-8" />

                {/* qt-17 Você concorda em obter medicamentos para perda de peso somente por meio deste programa? */}
                <div id="qt-17" className="mt-5">
                  <h3 className="text-2xl font-bold mb-4">
                    Você concorda em obter medicamentos para perda de peso somente por
                    meio deste programa daqui para frente?
                    <span className="text-red-500 text-sm ml-2 font-normal">qt-17</span>
                  </h3>
                  <p className="text-base mb-4">
                    É importante não &ldquo;empilhar&rdquo; medicamentos para perda de
                    peso.
                  </p>
                  <RadioGroup className="flex gap-4" name="concorda-programa" value={concordaPrograma ?? ""} onValueChange={setConcordaPrograma}>
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
                <button
                  type="button"
                  onClick={() => {
                    if (!descricaoGlp1) { setErroStep("Preencha a descrição do seu medicamento GLP-1."); return; }
                    if (!ultimaDose) { setErroStep("Informe quando foi sua última dose."); return; }
                    if (!concordaPrograma) { setErroStep("Você precisa responder se concorda em obter medicamentos somente por este programa."); return; }
                    setErroStep(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setStepIndex(5); setMaxStep(prev => Math.max(prev, 5));
                  }}
                  className="submit cursor-pointer"
                >
                  Próximo
                </button>
                {erroStep && (
                  <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
                    <TriangleAlert className="size-5 shrink-0 text-red-600" />
                    <span>{erroStep}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Atendimento único */}
            {stepIndex === 5 && (
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
                    {[
                      "Manter a massa muscular enquanto perco peso",
                      "Preferiria não injetar",
                      "Gerenciar possíveis efeitos colaterais, como náuseas/vômitos",
                      "Auxiliar no processo de envelhecimento e a promoção da longevidade (danos celulares/ao DNA, disfunções do sistema imunológico, etc)",
                      "Melhora da função cognitiva e da clareza mental",
                      "Melhorar os níveis de energia",
                      "Regulação da menstruação e do estado hormonal",
                      "Melhorar a qualidade do sono",
                      "Não tenho certeza — gostaria de discutir as opções de formulação com um profissional clínico por meio de uma consulta virtual ao vivo",
                    ].map((option) => (
                      <FieldLabel key={option}>
                        <Field orientation="horizontal" className="input-default">
                          <Checkbox
                            checked={interesseOptions.includes(option)}
                            onCheckedChange={() => toggleInteresse(option)}
                          />
                          <FieldContent>
                            <FieldTitle>{option}</FieldTitle>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    ))}
                  </div>
                </div>

                <Separator className="mt-8" />
                {interesseOptions.includes("Não tenho certeza — gostaria de discutir as opções de formulação com um profissional clínico por meio de uma consulta virtual ao vivo") && (
                  <div className="flex items-center gap-2 mt-4 p-3 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-sm">
                    <TriangleAlert className="size-5 shrink-0 text-amber-600" />
                    <span>Será adicionado o valor correspondente a consulta de €50. A HD Clinica entrará em contato para agendar o melhor horário.</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => { setErroStep(null); window.scrollTo({ top: 0, behavior: 'smooth' }); setStepIndex(6); setMaxStep(prev => Math.max(prev, 6)); }}
                  className="submit cursor-pointer"
                >
                  Próximo
                </button>
                {erroStep && (
                  <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
                    <TriangleAlert className="size-5 shrink-0 text-red-600" />
                    <span>{erroStep}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Mais informações */}
            {stepIndex === 6 && (
              <div className="mt-5">
                <div id="sc-mais-informacoes" className="mt-5">
                  <h2 className="text-2xl font-bold mb-4">
                    Os profissionais médicos da MEDVi analisam todos os formulários em até 24 horas.
                    <span className="text-red-500 text-sm ml-2 font-normal">sc-mais-informacoes</span>
                  </h2>
                  <p className="text-base mb-6">
                    Tem alguma informação adicional que gostaria de compartilhar com nossa equipe médica?
                  </p>
                  <RadioGroup
                    className="flex gap-4"
                    name="info-adicional"
                    value={infoAdicional ?? ""}
                    onValueChange={(v) => setInfoAdicional(v)}
                  >
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
                <button
                  type="button"
                  onClick={() => {
                    if (!infoAdicional) { setErroStep("Responda se tem informações adicionais para compartilhar."); return; }
                    setErroStep(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setStepIndex(7); setMaxStep(prev => Math.max(prev, 7));
                  }}
                  className="submit cursor-pointer"
                >
                  Próximo
                </button>
                {erroStep && (
                  <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
                    <TriangleAlert className="size-5 shrink-0 text-red-600" />
                    <span>{erroStep}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 7: Checkpoint */}
            {stepIndex === 7 && (
              <div className="mt-5">
                <div className="space-y-4">
                  {/* Status badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                      Tratamento com GLP-1
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                      Avaliação concluída
                    </span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                      Pronto para revisão
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#111827]">
                    Parabéns! Você é um(a) forte candidato(a) para tratamento médico de perda de peso.
                    <span className="text-red-500 text-sm ml-2 font-normal">sc-checkpoint</span>
                  </h2>

                  <Separator />

                  {/* Medical evaluation card */}
                  <div className="bg-white rounded-xl border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] p-6 space-y-4">
                    <h3 className="text-lg font-bold text-[#111827]">Sua avaliação médica</h3>

                    {/* Success probability */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#111827] font-medium">Probabilidade de sucesso</span>
                      <span className="text-2xl font-bold text-green-600">94%</span>
                    </div>

                    <Separator />

                    {/* IMC */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#111827] font-medium">IMC</span>
                      <span className="text-[#111827]">
                        {alturaSalva > 0 && pesoSalvo > 0
                          ? (pesoSalvo / ((alturaSalva / 100) ** 2)).toFixed(1)
                          : "—"}
                      </span>
                    </div>

                    {/* Peso atual */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#111827] font-medium">Peso atual</span>
                      <span className="text-[#111827]">
                        {pesoSalvo > 0
                          ? `${pesoSalvo} kg`
                          : "—"}
                      </span>
                    </div>

                    {/* Peso alvo */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#111827] font-medium">Peso alvo</span>
                      <span className="text-[#111827]">
                        {pesoIdealSalvo > 0
                          ? `${pesoIdealSalvo} kg em ${estimativa?.semanasEstimadas ?? 0} semanas`
                          : "—"}
                      </span>
                    </div>

                    <Separator />

                    <p className="text-green-700 font-medium text-center">
                      Você é um forte candidato para tratamento médico de perda de peso.
                    </p>
                  </div>

                  {/* User info form */}
                  <div className="space-y-4">
                    <p className="text-[#111827] font-medium">
                      Vamos verificar se você atende aos requisitos.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primeiro-nome">Primeiro nome</Label>
                        <Input
                          id="primeiro-nome"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sobrenome">Sobrenome</Label>
                        <Input
                          id="sobrenome"
                          value={sobrenome}
                          onChange={(e) => setSobrenome(e.target.value)}
                          placeholder="Seu sobrenome"
                          className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estado">Para qual estado seu medicamento será enviado?</Label>
                      <select
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb] text-[#111827]"
                      >
                        <option value="">Selecione um estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
                      />
                    </div>

                    <p className="text-xs text-[#9ca3af] mt-2">
                      Suas informações nunca são compartilhadas e são protegidas pela HIPAA.
                    </p>
                  </div>

                  <Separator className="mt-8" />
                  {erroValidacao && (
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
                      <TriangleAlert className="size-5 shrink-0 text-red-600" />
                      <span>{erroValidacao}</span>
                    </div>
                  )}
                  <input type="submit" value="CHECK Eligibility" className="submit" />
                </div>
              </div>
            )}
          </>
        )}
      </form>
    </section>
  );
}
