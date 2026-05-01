import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calcularEstimativa } from "@/lib/estimativas";
import type { Estimativa } from "@/lib/estimativas";
import { salvarFormulario, carregarFormulario } from "@/lib/form-storage";
import { submitCheckEligibility } from "./actions";
import type { Option } from "./types";

export function useFormState() {
  const router = useRouter();

  // Step state
  const [stepIndex, setStepIndex] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<Option>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Form fields
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

  // Fluxo 2 — "Sim, tomei um medicamento diferente"
  const [fluxoAtual, setFluxoAtual] = useState<"glp1" | "diferente" | "nao" | null>(null);
  const [descricaoDiferente, setDescricaoDiferente] = useState("");
  const [pesoInicialDiferente, setPesoInicialDiferente] = useState("");
  const [concordaDiferente, setConcordaDiferente] = useState<string | null>(null);

  const alturaRef = useRef<HTMLInputElement>(null);
  const pesoRef = useRef<HTMLInputElement>(null);
  const pesoIdealRef = useRef<HTMLInputElement>(null);

  // Restore saved state
  useEffect(() => {
    const saved = carregarFormulario();
    if (saved) {
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
      if (typeof saved.descricaoDiferente === "string") setDescricaoDiferente(saved.descricaoDiferente);
      if (typeof saved.pesoInicialDiferente === "string") setPesoInicialDiferente(saved.pesoInicialDiferente);
      if (typeof saved.concordaDiferente === "string" || saved.concordaDiferente === null) setConcordaDiferente(saved.concordaDiferente);
      if (saved.fluxoAtual === "glp1" || saved.fluxoAtual === "diferente" || saved.fluxoAtual === "nao") setFluxoAtual(saved.fluxoAtual);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    salvarFormulario({
      sexo, situacaoGravida, situacaoAmamentacao,
      diabetesTipo2Insulina, diabetesTipo1, anticoagulanteVarfarina,
      pancreatiteAtual, alergicoMedicamento, hiv,
      analgesicos, cirurgias, medicamentos, pressao, frequencia,
      interesseOptions, infoAdicional, infoAdicionalTexto,
      nome, sobrenome, estado, email, telefone,
      dataDia, dataMes, dataAno, descricaoGlp1, ultimaDose, concordaPrograma, nenhumProblemaAcima,
      selectedOption, estimativa, alturaSalva, pesoSalvo, pesoIdealSalvo,
      descricaoDiferente, pesoInicialDiferente, concordaDiferente, fluxoAtual,
    });
  }, [
    sexo, situacaoGravida, situacaoAmamentacao,
    diabetesTipo2Insulina, diabetesTipo1, anticoagulanteVarfarina,
    pancreatiteAtual, alergicoMedicamento, hiv,
    analgesicos, cirurgias, medicamentos, pressao, frequencia,
    interesseOptions, infoAdicional, infoAdicionalTexto,
    nome, sobrenome, estado, email, telefone,
    dataDia, dataMes, dataAno, descricaoGlp1, ultimaDose, concordaPrograma, nenhumProblemaAcima,
    selectedOption, estimativa, alturaSalva, pesoSalvo, pesoIdealSalvo,
    descricaoDiferente, pesoInicialDiferente, concordaDiferente, fluxoAtual,
  ]);

  // Navigation
  function goBack() {
    setStepIndex(prev => Math.max(0, prev - 1));
  }

  function goForward() {
    setStepIndex(prev => Math.min(maxStep, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Step handlers
  function handleOptionSelect(value: string) {
    setSelectedOption(value as Option);
    setStepIndex(1);
    setMaxStep(prev => Math.max(prev, 1));
    setEstimativa(calcularEstimativa(pesoSalvo, pesoIdealSalvo, value as "normal" | "rapido" | "acelerado"));
    scrollToTop();
  }

  function handleContinue() {
    setStepIndex(2);
    setMaxStep(prev => Math.max(prev, 2));
    scrollToTop();
  }

  function handleFinalOption(value: string) {
    if (value === "glp1") {
      setFluxoAtual("glp1");
      setStepIndex(3);
      setMaxStep(prev => Math.max(prev, 3));
      scrollToTop();
    } else if (value === "diferente") {
      setFluxoAtual("diferente");
      setStepIndex(8);
      setMaxStep(prev => Math.max(prev, 8));
      scrollToTop();
    } else if (value === "nao") {
      setFluxoAtual("nao");
      router.push("#");
    }
  }

  function handleGlp1Continue() {
    setStepIndex(4);
    setMaxStep(prev => Math.max(prev, 4));
    scrollToTop();
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
      const qt5 = document.getElementById("qt-5");
      if (qt5) {
        const checkboxes = qt5.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"]:not([id="nenhum-problema-acima"])'
        );
        checkboxes.forEach((cb) => { cb.checked = false; });
      }
    }
  }

  // Validation
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

  // Submit
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
      scrollToTop();
    } else {
      if (!nome || !sobrenome) { setErroValidacao("Preencha seu nome e sobrenome."); return; }
      if (!estado) { setErroValidacao("Selecione seu estado."); return; }
      if (!email) { setErroValidacao("Informe seu e-mail."); return; }
      if (!telefone) { setErroValidacao("Informe seu telefone."); return; }
      setErroValidacao(null);
      const payload = coletarTodosDados();
      submitCheckEligibility(payload);
    }
  }

  // Payload builder
  function coletarTodosDados(): Record<string, unknown> {
    const dataNascimento = `${dataAno}-${String(dataMes).padStart(2, "0")}-${String(dataDia).padStart(2, "0")}`;
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
        nome, sobrenome, email, telefone,
        data_nascimento: dataNascimento, sexo, estado,
      },
      biometria: {
        altura: alturaSalva, peso_atual: pesoSalvo, peso_ideal: pesoIdealSalvo,
        imc: alturaSalva > 0 && pesoSalvo > 0
          ? Number((pesoSalvo / ((alturaSalva / 100) ** 2)).toFixed(1)) : null,
        objetivo_perda_kg: estimativa?.kgAPerder ?? 0,
      },
      estimativas_tratamento: {
        semanas_estimadas: estimativa?.semanasEstimadas ?? 0,
        perda_semanal_estimada_kg: estimativa?.kgPorSemana ?? 0,
        ritmo: selectedOption, fluxo: "glp1",
      },
      historico_clinico: {
        situacao_atual: {
          gravida: situacaoGravida, amamentando: situacaoAmamentacao,
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
          diabetes_tipo_1: diabetesTipo1, diabetes_tipo_2_insulina: diabetesTipo2Insulina,
          hipotireoidismo_nao_tratado: getCheckbox("hipotireoidismo-nao-tratado"),
          doenca_vesicula_biliar: getCheckbox("doenca-vesicula-biliar"),
          hipertensao: getCheckbox("hipertensao-pressao-alta"),
          convulsoes: getCheckbox("convulsoes"), glaucoma: getCheckbox("glaucoma"),
          apneia_sono: getCheckbox("apneia-sono"),
          historico_tireoide: getCheckbox("historico-tireoide"), gota: getCheckbox("gota"),
          colesterol_triglicerideos: getCheckbox("colesterol-triglicerideos"),
          depressao: getCheckbox("depressao"),
          tumor_infeccao_cerebro_medula: getCheckbox("tumor-infeccao-cerebro-medula"),
          figado_gorduroso: getCheckbox("doenca-hepatica-gorduroso"),
          doenca_renal: getCheckbox("doenca-renal"), taquicardia: getCheckbox("taquicardia"),
          doenca_coronariana_avc: getCheckbox("doenca-coronariana-avc"),
          intervalo_qt: getCheckbox("intervalo-qt"), refluxo_acido: getCheckbox("refluxo-acido"),
          asma: getCheckbox("asma"),
          incontinencia_urinaria: getCheckbox("incontinencia-urinaria"),
          sop_ovario_policistico: getCheckbox("sop"),
          baixa_testosterona: getCheckbox("baixa-testosterona"),
          osteoartrite: getCheckbox("osteoartrite"), constipacao: getCheckbox("constipacao"),
          pancreatite: pancreatiteAtual, hiv,
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
          pressao_arterial: pressao, frequencia_cardiaca: frequencia,
        },
      },
      experiencia_glp1: {
        ja_usou_glp1: descricaoGlp1, ultima_dose: ultimaDose,
        peso_inicial_glp1: pesoInicial ? Number(pesoInicial) : null,
        concorda_nao_empilhar: concordaPrograma,
        interesses_personalizacao: interesseOptions,
        interesse_consulta_ao_vivo: interesseConsultaAoVivo,
        info_adicional: infoAdicional === "sim" ? infoAdicionalTexto : null,
      },
    };
  }

  return {
    // State
    stepIndex, setStepIndex, maxStep, setMaxStep,
    selectedOption, formSubmitted, files, setFiles,
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
    estimativa, setEstimativa,
    alturaSalva, pesoSalvo, pesoIdealSalvo,
    interesseOptions, setInteresseOptions,
    infoAdicional, setInfoAdicional,
    infoAdicionalTexto, setInfoAdicionalTexto,
    nome, setNome,
    sobrenome, setSobrenome,
    estado, setEstado,
    email, setEmail,
    telefone, setTelefone,
    dataDia, setDataDia,
    dataMes, setDataMes,
    dataAno, setDataAno,
    descricaoGlp1, setDescricaoGlp1,
    ultimaDose, setUltimaDose,
    concordaPrograma, setConcordaPrograma,
    nenhumProblemaAcima, setNenhumProblemaAcima,
    erroValidacao, setErroValidacao,
    erroStep, setErroStep,
    fluxoAtual, setFluxoAtual,
    descricaoDiferente, setDescricaoDiferente,
    pesoInicialDiferente, setPesoInicialDiferente,
    concordaDiferente, setConcordaDiferente,
    // Refs
    alturaRef, pesoRef, pesoIdealRef,
    // Handlers
    goBack, goForward, handleOptionSelect, handleContinue,
    handleFinalOption, handleGlp1Continue, toggleInteresse,
    handleQt5ConditionClick, handleNenhumProblemaToggle,
    handleFormSubmit, scrollToTop,
  };
}
