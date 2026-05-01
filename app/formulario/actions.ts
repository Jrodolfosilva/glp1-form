"use server";

import { calculateScore } from "@/lib/scoring";
import type { ScoreInput } from "@/lib/scoring";

export type FormDataEntry = {
  name: string;
  value: unknown;
};

export async function submitCheckEligibility(
  dados: Record<string, unknown>
): Promise<{ success: boolean; score?: number; level?: string }> {
  const payload = dados as Record<string, any>

  // Extrair campos para o score
  const scoreInput: ScoreInput = {
    gravida: payload.historico_clinico?.situacao_atual?.gravida ?? false,
    amamentando: payload.historico_clinico?.situacao_atual?.amamentando ?? false,
    pensamentos_suicidas: payload.historico_clinico?.situacao_atual?.pensamentos_suicidas ?? false,
    cancer: payload.historico_clinico?.situacao_atual?.cancer ?? false,
    pancreatite: payload.historico_clinico?.condicoes_preexistentes?.pancreatite ?? false,
    historico_tireoide: payload.historico_clinico?.condicoes_preexistentes?.historico_tireoide ?? false,

    imc: payload.biometria?.imc ?? null,

    hipertensao: payload.historico_clinico?.condicoes_preexistentes?.hipertensao ?? false,
    apneia_sono: payload.historico_clinico?.condicoes_preexistentes?.apneia_sono ?? false,
    colesterol_triglicerideos: payload.historico_clinico?.condicoes_preexistentes?.colesterol_triglicerideos ?? false,
    diabetes_tipo_2_insulina: payload.historico_clinico?.condicoes_preexistentes?.diabetes_tipo_2_insulina ?? false,

    doenca_renal: payload.historico_clinico?.condicoes_preexistentes?.doenca_renal ?? false,
    doenca_hepatica: payload.historico_clinico?.condicoes_preexistentes?.doenca_hepatica ?? false,
    condicao_gastrointestinal: payload.historico_clinico?.situacao_atual?.condicao_gastrointestinal ?? false,
    refluxo_acido: payload.historico_clinico?.condicoes_preexistentes?.refluxo_acido ?? false,
    depressao: payload.historico_clinico?.condicoes_preexistentes?.depressao ?? false,
    doenca_vesicula_biliar: payload.historico_clinico?.condicoes_preexistentes?.doenca_vesicula_biliar ?? false,

    frequencia_cardiaca: payload.historico_clinico?.medicamentos_e_alergias?.frequencia_cardiaca ?? null,
    usa_anticoagulante_varfarina: payload.historico_clinico?.medicamentos_e_alergias?.usa_anticoagulante_varfarina ?? false,
  };

  const result = calculateScore(scoreInput);

  // Organizar em array name:value
  const organizado: FormDataEntry[] = Object.entries(dados).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  console.log("=== CHECK Eligibility - Server Action ===");
  console.log(JSON.stringify(organizado, null, 2));
  console.log("");
  console.log("=== SCORE ===");
  console.log(`Score: ${result.score}% (${result.label})`);
  console.log("Breakdown:");
  result.breakdown.forEach((b) => console.log(`  - ${b}`));
  if (result.blocker) console.log(`  Blocker: ${result.blocker}`);
  console.log("================");

  return { success: true, score: result.score, level: result.label };
}
