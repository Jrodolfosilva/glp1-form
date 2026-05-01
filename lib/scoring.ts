export type ScoreInput = {
  gravida?: boolean;
  amamentando?: boolean;
  pensamentos_suicidas?: boolean;
  cancer?: boolean;
  pancreatite?: boolean;
  historico_tireoide?: boolean;

  imc: number | null;

  hipertensao?: boolean;
  apneia_sono?: boolean;
  colesterol_triglicerideos?: boolean;
  diabetes_tipo_2_insulina?: boolean;

  doenca_renal?: boolean;
  doenca_hepatica?: boolean;
  condicao_gastrointestinal?: boolean;
  refluxo_acido?: boolean;
  depressao?: boolean;
  doenca_vesicula_biliar?: boolean;

  frequencia_cardiaca?: string | null;
  usa_anticoagulante_varfarina?: boolean;
};

export type ScoreResult = {
  score: number;
  level: "elegivel" | "atencao" | "inelegivel";
  label: string;
  breakdown: string[];
  blocker?: string;
};

function levelFromScore(score: number): ScoreResult["level"] {
  if (score >= 90) return "elegivel";
  if (score >= 70) return "atencao";
  return "inelegivel";
}

function labelFromLevel(level: ScoreResult["level"]): string {
  switch (level) {
    case "elegivel": return "Elegível";
    case "atencao": return "Atenção";
    case "inelegivel": return "Inelegível";
  }
}

export function calculateScore(input: ScoreInput): ScoreResult {
  const breakdown: string[] = [];

  // --- Blockers (score = 0) ---
  if (input.historico_tireoide) {
    return { score: 0, level: "inelegivel", label: "Inelegível", breakdown: ["Bloqueado: histórico de tireoide (risco de carcinoma medular)"], blocker: "histórico de tireoide" };
  }
  if (input.pancreatite) {
    return { score: 0, level: "inelegivel", label: "Inelegível", breakdown: ["Bloqueado: pancreatite"], blocker: "pancreatite" };
  }
  if (input.gravida || input.amamentando) {
    return { score: 0, level: "inelegivel", label: "Inelegível", breakdown: ["Bloqueado: gestante ou amamentando"], blocker: "gestante/amamentando" };
  }
  if (input.pensamentos_suicidas) {
    return { score: 0, level: "inelegivel", label: "Inelegível", breakdown: ["Bloqueado: pensamentos suicidas"], blocker: "pensamentos suicidas" };
  }
  if (input.cancer) {
    return { score: 0, level: "inelegivel", label: "Inelegível", breakdown: ["Bloqueado: câncer (revisão manual necessária)"], blocker: "câncer" };
  }

  let score = 100;

  // --- A. IMC ---
  const imc = input.imc ?? 0;
  if (imc >= 30) {
    breakdown.push(`IMC ${imc.toFixed(1)}: elegível, sem desconto`);
  } else if (imc >= 27) {
    const temComorbidade = input.hipertensao || input.diabetes_tipo_2_insulina || input.apneia_sono || input.colesterol_triglicerideos;
    if (temComorbidade) {
      breakdown.push(`IMC ${imc.toFixed(1)} com comorbidade: elegível, sem desconto`);
    } else {
      score -= 40;
      breakdown.push(`IMC ${imc.toFixed(1)} sem comorbidade: -40 pontos (risco de uso estético)`);
    }
  } else {
    score -= 70;
    breakdown.push(`IMC ${imc.toFixed(1)} abaixo de 27: -70 pontos (contraindicação relativa)`);
  }

  // --- B. Histórico Clínico ---
  if (input.doenca_renal) {
    score -= 30;
    breakdown.push("Doença renal: -30 pontos");
  }
  if (input.doenca_hepatica) {
    score -= 30;
    breakdown.push("Doença hepática: -30 pontos");
  }
  if (input.diabetes_tipo_2_insulina) {
    score -= 20;
    breakdown.push("Diabetes tipo 2 com insulina: -20 pontos (risco de hipoglicemia)");
  }
  if (input.condicao_gastrointestinal) {
    score -= 15;
    breakdown.push("Condição gastrointestinal: -15 pontos");
  }
  if (input.refluxo_acido) {
    score -= 15;
    breakdown.push("Refluxo ácido: -15 pontos");
  }
  if (input.depressao) {
    score -= 15;
    breakdown.push("Depressão: -15 pontos (exige vigilância de humor)");
  }
  if (input.doenca_vesicula_biliar) {
    score -= 10;
    breakdown.push("Doença vesícula biliar: -10 pontos (risco de colelitíase)");
  }

  // --- C. Medicamentos e Sinais Vitais ---
  if (input.frequencia_cardiaca === "lento" || input.frequencia_cardiaca === "acelerado") {
    score -= 10;
    breakdown.push(`Frequência cardíaca "${input.frequencia_cardiaca}": -10 pontos`);
  }
  if (input.usa_anticoagulante_varfarina) {
    score -= 20;
    breakdown.push("Uso de varfarina: -20 pontos (interação medicamentosa)");
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    level: levelFromScore(score),
    label: labelFromLevel(levelFromScore(score)),
    breakdown,
  };
}
