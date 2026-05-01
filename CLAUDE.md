@AGENTS.md

# Overview do projeto

- Formulário interativo de qualificação para uso de GLP-1 (emagrecimento)
- O lead preenche informações para emissão ou não de receitas para medicamentos aprovados: monjauro, wegovy, orlistato e mysimba
- Fluxo dividido em duas partes: (1) perguntas de saúde, (2) ritmo + fechamento com steps numerados

# Stack

- **Next.js** (versão mais recente — consultar `node_modules/next/dist/docs/` antes de codificar)
- **React** com `"use client"` components
- **TypeScript**
- **Tailwind CSS** (v4, com `@import "tailwindcss"`)
- **shadcn/ui** (Radix UI primitives: Checkbox, RadioGroup, Select, Field, etc.)
- **@shadcnblocks/file-upload** (FileUpload, FileUploadDropzone, FileUploadTrigger, etc.)
- **Lucide React** (ícones: CloudUpload, X, TriangleAlert, ChevronLeft, ChevronRight)
- **next/image** (otimização de imagens)

# Convenções

## Tools (flags de desenvolvimento)

Flags visuais em vermelho (`<span className="text-red-500 text-sm ml-2 font-normal">`) para identificar cada seção:

- **`qt-N`** — Pergunta do formulário
- **`sq-{valor}`** — Sub-seção ou tela intermediária
- **`sc-{nome}`** — Seção de conteúdo

Essas flags não têm efeito no comportamento — são apenas para navegação visual no fluxo.

### Lista completa de flags

| Flag | Onde | Descrição |
|------|------|-----------|
| qt-1 | primeira parte | Altura, peso e peso ideal |
| qt-2 | primeira parte | Sexo (homem/mulher) |
| qt-3 | primeira parte | Data de nascimento (dia/mês/ano) |
| qt-condicional-1 | primeira parte | Situações (grávida, amamentação) — só se mulher |
| qt-4 | primeira parte | Questões de Saúde 1 (renal, hepática, etc.) |
| qt-5 | primeira parte | Questões de Saúde 2 (~30 condições) — "Nenhum problema acima" começa marcado |
| qt-6 | primeira parte | Uso de analgésicos opiáceos (3 meses) |
| qt-7 | primeira parte | Cirurgias de perda de peso anteriores |
| qt-8 | primeira parte | Medicamentos com receita atualmente |
| qt-9 | primeira parte | Faixa de pressão arterial |
| qt-10 | primeira parte | Frequência cardíaca média |
| qt-11 | step 0 | Escolha de ritmo (normal/rápido/acelerado) |
| sq-{normal,rapido,acelerado} | step 1 | Confirmação do ritmo |
| qt-12 | step 2 | Medicação anterior (4 semanas) |
| sq-glp1 | step 3 | Tela intermediária "Ótimo! Você tem experiência com GLP-1" |
| qt-13 | step 4 | Descrição do medicamento GLP-1 (textarea) |
| qt-14 | step 4 | Última dose (RadioGroup) |
| qt-15 | step 4 | Peso inicial (input) |
| qt-16 | step 4 | Foto do medicamento (FileUpload) |
| qt-17 | step 4 | Concordância de não "empilhar" medicamentos |
| sc-atendimento-unico | step 5 | Checkboxes de interesses (9 opções) — última opção mostra notificação €50 |
| sc-mais-informacoes | step 6 | Radio Sim/Não + textarea condicional |
| sc-checkpoint | step 7 | Resumo final com IMC, peso, semanas, formulário de dados |

## Estilização

Classes CSS customizadas em `globals.css`:
- `.input-default` — container de input com borda e sombra
- `.radio-card` — cartão de seleção (radio)
- `.checked-border` — destaca borda azul quando selecionado
- `.submit` — botão de envio verde arredondado

Sempre que possível, usar a skill `.agents/skills/shadcn` para criação de frontend.

# Fluxo do formulário

Arquivo principal: `app/formulario/page.tsx`

Usa sistema de **duas partes** controlado por `formSubmitted` (boolean) + `stepIndex` (0 a 7).

## Navegação entre steps

- `goBack()` / `goForward()` — setas "Voltar"/"Avançar" no topo da segunda parte
- `maxStep` controla quais steps podem ser acessados (não pula steps não visitados)
- `window.scrollTo({ top: 0, behavior: 'smooth' })` em toda mudança de step
- Labels na navegação: Ritmo → Confirmação → Medicação anterior → Experiência GLP-1 → Detalhes GLP-1 → Atendimento único → Mais informações → Revisão final

## Primeira parte (`!formSubmitted`) — Perguntas de saúde

| Flag | Pergunta | Tipo | Observações |
|------|----------|------|-------------|
| qt-1 | Altura, peso e peso ideal | 3x Input number (uncontrolled via useRef) | Valores lidos no submit, salvos em estado |
| qt-2 | Sexo | RadioGroup com imagens | Determina se qt-condicional-1 aparece |
| qt-3 | Data de nascimento | Select (dia/mês) + Input (ano) | States: `dataDia`, `dataMes`, `dataAno` |
| qt-condicional-1 | Situações (grávida, amamentação) | Checkboxes com alertas | Só se qt-2 = "mulher" |
| qt-4 | Questões de Saúde 1 | Checkboxes (6 condições) | — |
| qt-5 | Questões de Saúde 2 | ~20 checkboxes | "Nenhum problema acima" começa checked; desmarca ao marcar qualquer condição |
| qt-6 | Analgésicos opiáceos | RadioGroup sim/não | Textarea condicional se "sim" |
| qt-7 | Cirurgias perda de peso | RadioGroup sim/não | Textarea condicional se "sim" |
| qt-8 | Medicamentos com receita | RadioGroup sim/não | Textarea condicional se "sim" |
| qt-9 | Pressão arterial | RadioGroup 4 opções | Alerta se Hipertensão Estágio 2 |
| qt-10 | Frequência cardíaca | RadioGroup 4 opções | Alerta se >110 bpm |

**Validação**: Todos os campos acima são obrigatórios. Mensagem de erro exibida se tentar enviar sem preencher.

## Segunda parte (`formSubmitted`) — Steps 0-7

| stepIndex | Label | Conteúdo | Ação ao avançar |
|-----------|-------|----------|-----------------|
| 0 | Ritmo | qt-11: Escolha de ritmo (RadioGroup) | `handleOptionSelect` → step 1 |
| 1 | Confirmação | sq-{normal,rapido,acelerado}: mensagem + botão "Seguir" | `handleContinue` → step 2 |
| 2 | Medicação anterior | qt-12: Tomou medicação nas últimas 4 semanas? | `handleFinalOption` → step 3 (glp1) |
| 3 | Experiência GLP-1 | sq-glp1: "Ótimo! Você tem experiência com GLP-1" + "Seguir" | `handleGlp1Continue` → step 4 |
| 4 | Detalhes GLP-1 | qt-13 a qt-17: textarea + RadioGroup + input + upload + RadioGroup | Valida campos → step 5 |
| 5 | Atendimento único | sc-atendimento-unico: 9 checkboxes de interesse | Se última opção marcada → notificação €50. → step 6 |
| 6 | Mais informações | sc-mais-informacoes: Radio + textarea condicional | Valida radio → step 7 |
| 7 | Revisão final | sc-checkpoint: IMC, peso, semanas + formulário (nome, estado, email, telefone) | Valida campos → POST |

### Validações por step

- **Step 4**: `descricaoGlp1` (textarea), `ultimaDose` (RadioGroup), `concordaPrograma` (RadioGroup) — todos obrigatórios
- **Step 6**: `infoAdicional` (radio Sim/Não) — obrigatório
- **Step 7 (checkpoint)**: nome, sobrenome, estado, email, telefone — todos obrigatórios

### Notificação sc-atendimento-unico (step 5)

Quando a última opção é marcada ("Não tenho certeza — gostaria de discutir as opções de formulação com um profissional clínico por meio de uma consulta virtual ao vivo"), exibe:

> Será adicionado o valor correspondente a consulta de €50. A HD Clinica entrará em contato para agendar o melhor horário.

## Lógica do qt-5 ("Nenhum problema acima")

- State `nenhumProblemaAcima` começa como `true`
- Ao clicar em qualquer condição: `nenhumProblemaAcima = false`
- Ao marcar "Nenhum problema acima": desmarca todas as outras checkboxes do qt-5 via DOM
- Implementado com `onClick` no container e `handleNenhumProblemaToggle`

## Estados e persistência (localStorage)

Arquivo: `lib/form-storage.ts`

Funções: `salvarFormulario(dados)`, `carregarFormulario()`, `limparFormulario()`

**Persistido**: sexo, situacaoGravida, situacaoAmamentacao, diabetesTipo2Insulina, diabetesTipo1, anticoagulanteVarfarina, pancreatiteAtual, alergicoMedicamento, hiv, analgesicos, cirurgias, medicamentos, pressao, frequencia, interesseOptions, infoAdicional, infoAdicionalTexto, nome, sobrenome, estado, email, telefone, dataDia, dataMes, dataAno, descricaoGlp1, ultimaDose, concordaPrograma, nenhumProblemaAcima, selectedOption, estimativa, alturaSalva, pesoSalvo, pesoIdealSalvo

**Não persistido** (sempre começa do início): stepIndex, maxStep, formSubmitted

## Submit

**Primeiro submit** (botão "Próximo" na primeira parte):
1. `validarPrimeiroForm()` checa todos os campos obrigatórios
2. Lê `alturaRef/pesoRef/pesoIdealRef` (uncontrolled), salva em estado
3. Calcula `estimativa` com ritmo "normal"
4. `formSubmitted = true`, scroll ao topo

**Submit final** (botão "CHECK Eligibility" no checkpoint):
1. Valida nome, sobrenome, estado, email, telefone
2. Monta payload completo com todos os states
3. `console.log("CHECK Eligibility payload:", payload)` — placeholder para POST real

# Funções de utilidade

Arquivo: `lib/estimativas.ts`

## `calcularEstimativa(pesoAtual, pesoIdeal, ritmo)`

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| pesoAtual | number | Peso atual (kg) |
| pesoIdeal | number | Peso desejado (kg) |
| ritmo | "normal" \| "rapido" \| "acelerado" | Ritmo (default: "normal") |

**Retorno:** `Estimativa | null`

```ts
interface Estimativa {
  kgAPerder: number;        // pesoAtual - pesoIdeal
  semanasEstimadas: number; // Math.ceil(kgAPerder / kgPorSemana)
  kgPorSemana: number;      // 2 (normal), 3 (rapido), 1 (acelerado)
}
```

## `getIntermediateContent(ritmo, estimativa)`

Gera título/subtítulo dinâmicos para telas `sq-{normal,rapido,acelerado}`.

## Ciclo de vida do cálculo

1. **Primeiro submit**: lê refs, calcula com ritmo "normal", salva em `estimativa`
2. **handleOptionSelect** (step 0): recalcula com ritmo escolhido usando `pesoSalvo`/`pesoIdealSalvo` (state, não refs — porque os inputs uncontrolled já foram desmontados)
3. Exibição no checkpoint: `estimativa?.semanasEstimadas ?? 0`

# Importante

- Sempre usar `.agents/skills/shadcn` para criação de frontend
- Estamos em desenvolvimento — nunca dar build
- Não criar funções de backend ou API endpoints por enquanto

# Scoring System

Arquivo: `lib/scoring.ts` — cálculo de elegibilidade para GLP-1.

## Blockers (score = 0 imediatamente)

| Condição | Motivo |
|----------|--------|
| `historico_tireoide` | Risco de carcinoma medular |
| `pancreatite` | Risco de pancreatite aguda |
| `gravida` ou `amamentando` | Segurança fetal/neonatal |
| `pensamentos_suicidas` | Risco psiquiátrico |
| `cancer` | Revisão manual obrigatória |

## Pontuação (início em 100)

### A. IMC
- **>= 30**: 0 desconto (elegível)
- **27-29.9 com comorbidade** (hipertensão, diabetes, apneia, dislipidemia): 0 desconto
- **27-29.9 sem comorbidade**: -40
- **< 27**: -70

### B. Histórico Clínico
- Doença renal/ hepática: -30 cada
- Diabetes tipo 2 com insulina: -20
- Condição gastrointestinal / refluxo: -15 cada
- Depressão: -15
- Vesícula biliar: -10

### C. Sinais Vitais / Medicações
- Frequência cardíaca "lento" ou "acelerado": -10
- Uso de varfarina: -20

## Classificação final
- **90%+ (Verde)**: Elegível — pode seguir para prescrição padrão
- **70-89% (Amarelo)**: Atenção — requer revisão médica detalhada
- **<70% ou Blocker (Vermelho)**: Inelegível ou requer consulta presencial obrigatória
