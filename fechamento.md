# Flags do Formulário

## Primeiro Form (pré-submissão)
| Flag | Descrição |
|------|-----------|
| `qt-1` | Altura, peso, peso ideal |
| `qt-2` | Sexo (masculino/feminino) |
| `qt-3` | Data de nascimento |
| `qt-condicional-1` | Gravidez/amamentação (condicional: só se sexo feminino) |
| `qt-4` | Condições de saúde (renal, hepática, suicidas, câncer, gastrointestinal, dependência, hospitalização) |
| `qt-5` | Condições pré-existentes (30+ checkboxes) |
| `qt-6` | Uso de analgésicos opiáceos |
| `qt-7` | Cirurgias para perda de peso |
| `qt-8` | Medicamentos prescritos |
| `qt-9` | Pressão arterial |
| `qt-10` | Frequência cardíaca |

## Fluxo Compartilhado (após submissão)

### Step 0 — Ritmo
| Flag | Descrição |
|------|-----------|
| `qt-11` | Seleção de ritmo (normal/rápido/acelerado) |

### Step 1 — Confirmação
| Flag | Descrição |
|------|-----------|
| `sc-confirmacao` | Tela intermediária com resumo da escolha |

### Step 2 — Medicação anterior
| Flag | Descrição |
|------|-----------|
| `qt-12` | "Tomou medicamento nas últimas 4 semanas?" — 3 opções |

---

## Fluxo A: "Sim, tomei GLP-1"

### Step 3 — Intermediário GLP-1
| Flag | Descrição |
|------|-----------|
| `sc-intermediate-glp1` | "Ótimo! Você tem experiência com GLP-1" |

### Step 4 — Detalhes GLP-1
| Flag | Descrição |
|------|-----------|
| `qt-13` | Descrição do medicamento GLP-1 (textarea) |
| `qt-14` | Última dose (radio) |
| `qt-15` | Peso inicial (number input) |
| `qt-16` | Upload de foto do medicamento |
| `qt-17` | Concorda em não empilhar medicamentos (sim/não) |

---

## Fluxo B: "Sim, tomei um medicamento diferente"

### Step 8 — Detalhes Diferente
| Flag | Descrição |
|------|-----------|
| `sc-diferente` | Descrição do medicamento diferente (textarea) |
| `sc-diferente-peso` | Peso inicial (number input) |
| `sc-diferente-concorda` | Concorda em não empilhar (sim/não) |

---

## Fluxo C: "Não" → *placeholder (router.push("#"))*

---

## Seções Compartilhadas (checkpoint — unem todos os fluxos)

### Step 5 — Atendimento Único
| Flag | Descrição |
|------|-----------|
| `checkpoint-sc-atendimento-unico` | Interesses de personalização (checkboxes) + consulta ao vivo |

### Step 6 — Mais Informações
| Flag | Descrição |
|------|-----------|
| `checkpoint-sc-mais-informacoes` | Informações adicionais (sim/não + textarea condicional) |

### Step 7 — Revisão Final
| Flag | Descrição |
|------|-----------|
| `checkpoint-sc-checkpoint` | Resumo IMC, dados pessoais, submit |

---

## Mapa de Navegação

```
Primeiro Form (qt-1 a qt-10)
        │
        ▼  [submit]
   Step 0 (qt-11 — Ritmo)
        │
        ▼  [selecionar opção]
   Step 1 (sc-confirmacao)
        │
        ▼  [continuar]
   Step 2 (qt-12)
        │
        ├──▶ "glp1"    → Step 3 → Step 4 → Step 5 → Step 6 → Step 7
        ├──▶ "diferente" → Step 8 → Step 5 → Step 6 → Step 7
        └──▶ "nao"     → placeholder
```
