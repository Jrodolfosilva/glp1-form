@AGENTS.md

# Overview do projeto

- Trata-se de uma formulário interativo de qualificação para uso do GLP1
- O objetivo é oferecer uma interface simples, bonita e principalmente dinamica para que o lead preencha as informações necessário para emissão ou não de receitas para remédios: 4 medicações obra emagrecer e aprovados pelo informado monjauro, wegovy, orlistato e mysimba

# Stack

- **Next.js** (versão mais recente — consultar `node_modules/next/dist/docs/` antes de codificar)
- **React** com `"use client"` components
- **TypeScript**
- **Tailwind CSS** (v4, com `@import "tailwindcss"`)
- **shadcn/ui** (Radix UI primitives: Checkbox, RadioGroup, Select, etc.)
- **@shadcnblocks/file-upload** (FileUpload, FileUploadDropzone, FileUploadTrigger, etc.)
- **Lucide React** (ícones: CloudUpload, X, TriangleAlert)
- **next/image** (otimização de imagens)


# Convenções

## Tools (flags de desenvolvimento)

Criamos **tools** — flags visuais em vermelho (`<span className="text-red-500 text-sm ml-2 font-normal">`) — para identificar cada seção do formulário durante o desenvolvimento. Elas seguem o padrão:

- **`qt-N`** — Pergunta do formulário (ex: `qt-1`, `qt-2`, `qt-condicional-1`, `qt-10`)
- **`sq-{valor}`** — Sub-seção ou resposta intermediária (ex: `sq-normal`, `sq-rapido`, `sq-acelerado`, `sq-glp1`)
- **`sc-{nome}`** — Seção de conteúdo (ex: `sc-atendimento-unico`, `sc-mais-informacoes`, `sc-checkpoint`)

Essas flags não têm efeito no comportamento — são apenas para navegação visual no fluxo.

### Lista completa de flags

| Flag | Onde | Descrição |
|------|------|-----------|
| qt-1 | primeira parte | Altura, peso e peso ideal |
| qt-2 | primeira parte | Sexo (homem/mulher) |
| qt-3 | primeira parte | Data de nascimento |
| qt-condicional-1 | primeira parte | Situações (grávida, amamentação) — só se mulher |
| qt-4 | primeira parte | Questões de Saúde 1 |
| qt-5 | primeira parte | Questões de Saúde 2 |
| qt-6 | primeira parte | Uso de analgésicos opiáceos |
| qt-7 | primeira parte | Cirurgias de perda de peso |
| qt-8 | primeira parte | Medicamentos com receita |
| qt-9 | primeira parte | Faixa de pressão arterial |
| qt-10 | primeira parte | Frequência cardíaca |
| qt-11 | step 0 | Escolha de ritmo |
| sq-{normal,rapido,acelerado} | step 1 | Confirmação do ritmo |
| qt-12 | step 2 | Medicação anterior (4 semanas) |
| sq-glp1 | step 3 | Tela intermediária "Ótimo! Você tem experiência com GLP-1" |
| qt-13 | step 4 | Descrição do medicamento GLP-1 |
| qt-14 | step 4 | Última dose |
| qt-15 | step 4 | Peso inicial |
| qt-16 | step 4 | Foto do medicamento |
| qt-17 | step 4 | Concordância de não "empilhar" medicamentos |
| sc-atendimento-unico | step 5 | Checkboxes de interesses |
| sc-mais-informacoes | step 6 | Radio + textarea condicional |
| sc-checkpoint | step 7 | Resumo final com avaliação médica |

## Estilização

Classes CSS customizadas definidas em `globals.css`:
- `.input-default` — container de input com borda e sombra
- `.radio-card` — cartão de seleção (radio)
- `.checked-border` — destaca borda azul quando selecionado
- `.submit` — botão de envio verde arredondado

Sempre que possível, usar a skill `.agents/skills/shadcn` para criação de frontend.

# Fluxo do formulário (em desenvolvimento)

O formulário está em `app/formulario/page.tsx` e usa um sistema de duas etapas controlado por `formSubmitted` + `step`.

## Primeira parte (`!formSubmitted`) — Perguntas de saúde

| Seção | Pergunta | Tipo | Condicional |
|-------|----------|------|-------------|
| qt-1 | Altura, peso e peso ideal | 3x Input number | — |
| qt-2 | Sexo (homem/mulher) | RadioGroup com imagens | — |
| qt-3 | Data de nascimento | Select (dia/mês) + Input (ano) | — |
| qt-condicional-1 | Situações (grávida, amamentação, etc.) | Checkboxes com alertas | Só aparece se qt-2 = "mulher" |
| qt-4 | Questões de Saúde 1 (renal, hepática, etc.) | Checkboxes | — |
| qt-5 | Questões de Saúde 2 (~30 condições) | Checkboxes + alertas + textarea condicional | Alertas: diabetes-tipo-2-insulina, diabetes-tipo-1, anticoagulante-varfarina, pancreatite-atual, hiv. Textarea condicional: alergico-medicamento |
| qt-6 | Uso de analgésicos opiáceos (3 meses) | RadioGroup sim/não | Textarea só aparece se "Sim" |
| qt-7 | Cirurgias de perda de peso anteriores | RadioGroup sim/não | Textarea só aparece se "Sim" |
| qt-8 | Medicamentos com receita atualmente | RadioGroup sim/não | Textarea só aparece se "Sim" |
| qt-9 | Faixa de pressão arterial | RadioGroup (4 opções) | Alerta se "hiper2" (Hipertensão Estágio 2) |
| qt-10 | Frequência cardíaca média | RadioGroup (4 opções) | Alerta se "acelerado" (>110 bpm) |

**Submit**: Botão "Próximo" sempre ativo (não desabilita com alertas). Ao clicar, `formSubmitted = true`.

## Segunda parte (`formSubmitted`) — Ritmo e fechamento

A segunda parte usa `step` com valores: `"initial" | "intermediate" | "final" | "glp1"`.

| Step | Seção | Conteúdo |
|------|-------|----------|
| initial | qt-11 | Escolha de ritmo (normal/rápido/acelerado). Ao selecionar → vai para intermediate |
| intermediate | sq-{normal,rapido,acelerado} | Mensagem de confirmação dinâmica + botão "Seguir" |
| final | qt-12 | "Tomou medicamento para emagrecer nas últimas 4 semanas?" — 3 opções: GLP-1, diferente, não |
| glp1 | qt-13 a qt-17 | Sub-fluxo detalhado para quem tomou GLP-1 |

### Sub-fluxo GLP-1 (step = "glp1")

| Seção | Pergunta |
|-------|----------|
| qt-13 | Descrição do medicamento GLP-1 (textarea) |
| qt-14 | Última dose (RadioGroup: 0-5 dias, 6-10, 11-14, +2 semanas, +4 semanas) |
| qt-15 | Peso inicial (Input number) |
| qt-16 | Foto do medicamento (FileUpload dropzone, max 15MB) |
| qt-17 | Concordância em não "empilhar" medicamentos (RadioGroup sim/não) |

**Submit final**: Botão "Finalizar" no fim do sub-fluxo GLP-1.

# Funções de utilidade

Arquivo: `lib/estimativas.ts`

## `calcularEstimativa(pesoAtual, pesoIdeal, ritmo)`

Calcula a estimativa de perda de peso com base nos dados inseridos em **qt-1** e no ritmo escolhido em **qt-11**.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| pesoAtual | number | Peso atual do usuário (kg) |
| pesoIdeal | number | Peso desejado (kg) |
| ritmo | "normal" \| "rapido" \| "acelerado" | Ritmo de perda escolhido (default: "normal") |

**Retorno:** `Estimativa | null`

```ts
interface Estimativa {
  kgAPerder: number;        // pesoAtual - pesoIdeal
  semanasEstimadas: number; // Math.ceil(kgAPerder / kgPorSemana)
  kgPorSemana: number;      // 2 (normal), 3 (rapido), 1 (acelerado)
}
```

Retorna `null` se os valores forem inválidos (<= 0 ou vazios).

## `getIntermediateContent(ritmo, estimativa)`

Gera o título e subtítulo dinâmicos das telas intermediárias (`sq-normal`, `sq-rapido`, `sq-acelerado`) com os valores reais de **kgAPerder** e **semanasEstimadas**.

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| ritmo | "normal" \| "rapido" \| "acelerado" | Ritmo escolhido |
| estimativa | Estimativa | Objeto retornado por `calcularEstimativa` |

**Retorno:** `{ title: string; subtitle: string }`

## Como o cálculo é acionado

Os inputs de **qt-1** (altura, peso, pesoIdeal) são **uncontrolled** (usam `useRef`) para evitar re-renderizações ao digitar.

- **`handleFormSubmit`** (botão "Próximo"): lê `pesoRef` e `pesoIdealRef`, calcula `estimativa` com ritmo "normal", e avança para **qt-11**
- **`handleOptionSelect`** (escolha de ritmo em qt-11): recalcula `estimativa` com o ritmo escolhido e avança para a tela intermediária (`sq-{normal,rapido,acelerado}`)
- O estado `estimativa` é do tipo `Estimativa | null` — os componentes de UI usam fallback seguro (`?? 0`)

# Importante

- Sempre usar `./agents/skills/shadcn` para criação do frontend
- Estamos em desenvolvimento — nunca dar build
- Não criar funções de backend ou API endpoints por enquanto
