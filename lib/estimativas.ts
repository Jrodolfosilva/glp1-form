export interface Estimativa {
  kgAPerder: number;
  semanasEstimadas: number;
  kgPorSemana: number;
}

/**
 * Calcula a estimativa de perda de peso com base no peso atual, peso ideal e ritmo escolhido.
 *
 * - ritmo "normal": ~2 kg/semana
 * - ritmo "rapido": ~3 kg/semana
 * - ritmo "acelerado": ~1 kg/semana
 *
 * Retorna null se os valores forem inválidos.
 */
export function calcularEstimativa(
  pesoAtual: number,
  pesoIdeal: number,
  ritmo: "normal" | "rapido" | "acelerado" = "normal"
): Estimativa | null {
  if (!pesoAtual || !pesoIdeal || pesoAtual <= 0 || pesoIdeal <= 0) return null;

  const kgAPerder = Math.max(0, pesoAtual - pesoIdeal);

  if (kgAPerder <= 0) {
    return { kgAPerder: 0, semanasEstimadas: 0, kgPorSemana: 0 };
  }

  const kgPorSemana =
    ritmo === "rapido" ? 3 : ritmo === "acelerado" ? 1 : 2;
  const semanasEstimadas = Math.ceil(kgAPerder / kgPorSemana);

  return { kgAPerder, semanasEstimadas, kgPorSemana };
}

/**
 * Retorna o conteúdo dinâmico das telas intermediárias
 * (sq-normal, sq-rapido, sq-acelerado) com os valores reais
 * calculados a partir da estimativa.
 */
export function getIntermediateContent(
  ritmo: "normal" | "rapido" | "acelerado",
  estimativa: Estimativa
): { title: string; subtitle: string } {
  const { kgAPerder, semanasEstimadas } = estimativa;

  const contents: Record<
    "normal" | "rapido" | "acelerado",
    { title: string; subtitle: string }
  > = {
    normal: {
      title: "Perfeito!",
      subtitle: `Perder ${kgAPerder} kg é mais fácil do que você imagina - e não envolve dietas restritivas.`,
    },
    rapido: {
      title: "Sem problema, podemos ir mais rápido.",
      subtitle: `Vai exigir algum esforço, mas com a medicação GLP-1, seu objetivo de perder ${kgAPerder} kg pode ser alcançado em cerca de ${semanasEstimadas} semanas - e não envolve dietas restritivas.`,
    },
    acelerado: {
      title: "Vamos respeitar o seu ritmo.",
      subtitle: `Com a medicação GLP-1, atingir seu objetivo de perder ${kgAPerder} kg é mais fácil do que você imagina - e não envolve dietas restritivas.`,
    },
  };

  return contents[ritmo];
}
