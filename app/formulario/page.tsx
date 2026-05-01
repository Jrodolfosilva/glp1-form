"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

import { useFormState } from "./use-form-state";
import PrimeiroForm from "./sections/primeiro-form";
import StepRitmo from "./sections/step-0-ritmo";
import StepConfirmacao from "./sections/step-1-confirmacao";
import StepQt12 from "./sections/step-2-qt12";
import StepGlp1Intermediate from "./sections/step-3-intermediate";
import StepDetalhesGlp1 from "./sections/step-4-detalhes-glp1";
import StepAtendimentoUnico from "./sections/step-5-atendimento";
import StepMaisInformacoes from "./sections/step-6-mais-informacoes";
import StepCheckpoint from "./sections/step-7-checkpoint";
import StepDiferente from "./sections/step-8-diferente";

export default function Glp() {
  const f = useFormState();

  return (
    <section className="mx-auto max-w-112.5">
      {!f.formSubmitted && (
        <header>
          {/*<Image
            alt="Banner"
            src="/banner.avif"
            width={450}
            height={200}
            className="max-w-112.5 mt-2.5 w-full mx-auto rounded-2xl h-52 object-cover"
          /> */}
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
      <form className="mt-5" onSubmit={f.handleFormSubmit}>
        {!f.formSubmitted && (
          <PrimeiroForm
            sexo={f.sexo} setSexo={f.setSexo}
            situacaoGravida={f.situacaoGravida} setSituacaoGravida={f.setSituacaoGravida}
            situacaoAmamentacao={f.situacaoAmamentacao} setSituacaoAmamentacao={f.setSituacaoAmamentacao}
            diabetesTipo2Insulina={f.diabetesTipo2Insulina} setDiabetesTipo2Insulina={f.setDiabetesTipo2Insulina}
            diabetesTipo1={f.diabetesTipo1} setDiabetesTipo1={f.setDiabetesTipo1}
            anticoagulanteVarfarina={f.anticoagulanteVarfarina} setAnticoagulanteVarfarina={f.setAnticoagulanteVarfarina}
            pancreatiteAtual={f.pancreatiteAtual} setPancreatiteAtual={f.setPancreatiteAtual}
            alergicoMedicamento={f.alergicoMedicamento} setAlergicoMedicamento={f.setAlergicoMedicamento}
            hiv={f.hiv} setHiv={f.setHiv}
            analgesicos={f.analgesicos} setAnalgesicos={f.setAnalgesicos}
            cirurgias={f.cirurgias} setCirurgias={f.setCirurgias}
            medicamentos={f.medicamentos} setMedicamentos={f.setMedicamentos}
            pressao={f.pressao} setPressao={f.setPressao}
            frequencia={f.frequencia} setFrequencia={f.setFrequencia}
            dataDia={f.dataDia} setDataDia={f.setDataDia}
            dataMes={f.dataMes} setDataMes={f.setDataMes}
            dataAno={f.dataAno} setDataAno={f.setDataAno}
            nenhumProblemaAcima={f.nenhumProblemaAcima}
            handleQt5ConditionClick={f.handleQt5ConditionClick}
            handleNenhumProblemaToggle={f.handleNenhumProblemaToggle}
            alturaRef={f.alturaRef}
            pesoRef={f.pesoRef}
            pesoIdealRef={f.pesoIdealRef}
            erroValidacao={f.erroValidacao}
          />
        )}

        {f.formSubmitted && (
          <>
            {/* Navegação entre seções */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={f.goBack}
                disabled={f.stepIndex === 0}
                className="flex items-center gap-1 text-sm font-medium text-[#111827] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="size-5" />
                Voltar
              </button>
              <span className="text-xs text-[#9ca3af] font-medium">
                {f.stepIndex === 0 && "Ritmo"}
                {f.stepIndex === 1 && "Confirmação"}
                {f.stepIndex === 2 && "Medicação anterior"}
                {f.stepIndex === 3 && "Experiência GLP-1"}
                {f.stepIndex === 4 && "Detalhes GLP-1"}
                {f.stepIndex === 5 && "Atendimento único"}
                {f.stepIndex === 6 && "Mais informações"}
                {f.stepIndex === 7 && "Revisão final"}
                {f.stepIndex === 8 && "Medicação anterior"}
              </span>
            </div>
            <Separator />

            {f.stepIndex === 0 && (
              <StepRitmo
                estimativa={f.estimativa}
                handleOptionSelect={f.handleOptionSelect}
              />
            )}

            {f.stepIndex === 1 && f.selectedOption && (
              <StepConfirmacao
                selectedOption={f.selectedOption}
                estimativa={f.estimativa}
                handleContinue={f.handleContinue}
              />
            )}

            {f.stepIndex === 2 && (
              <StepQt12 handleFinalOption={f.handleFinalOption} />
            )}

            {f.stepIndex === 3 && (
              <StepGlp1Intermediate handleGlp1Continue={f.handleGlp1Continue} />
            )}

            {f.stepIndex === 4 && (
              <StepDetalhesGlp1
                descricaoGlp1={f.descricaoGlp1}
                setDescricaoGlp1={f.setDescricaoGlp1}
                ultimaDose={f.ultimaDose}
                setUltimaDose={f.setUltimaDose}
                concordaPrograma={f.concordaPrograma}
                setConcordaPrograma={f.setConcordaPrograma}
                files={f.files}
                setFiles={f.setFiles}
                erroStep={f.erroStep}
                onNext={() => {
                  if (!f.descricaoGlp1) { f.setErroStep("Preencha a descrição do seu medicamento GLP-1."); return; }
                  if (!f.ultimaDose) { f.setErroStep("Informe quando foi sua última dose."); return; }
                  if (!f.concordaPrograma) { f.setErroStep("Você precisa responder se concorda em obter medicamentos somente por este programa."); return; }
                  f.setErroStep(null);
                  f.scrollToTop();
                  f.setStepIndex(5);
                  f.setMaxStep(prev => Math.max(prev, 5));
                }}
              />
            )}

            {f.stepIndex === 5 && (
              <StepAtendimentoUnico
                interesseOptions={f.interesseOptions}
                toggleInteresse={f.toggleInteresse}
                erroStep={f.erroStep}
                onNext={() => {
                  f.setErroStep(null);
                  f.scrollToTop();
                  f.setStepIndex(6);
                  f.setMaxStep(prev => Math.max(prev, 6));
                }}
              />
            )}

            {f.stepIndex === 6 && (
              <StepMaisInformacoes
                infoAdicional={f.infoAdicional}
                setInfoAdicional={f.setInfoAdicional}
                infoAdicionalTexto={f.infoAdicionalTexto}
                setInfoAdicionalTexto={f.setInfoAdicionalTexto}
                erroStep={f.erroStep}
                onNext={() => {
                  if (!f.infoAdicional) { f.setErroStep("Responda se tem informações adicionais para compartilhar."); return; }
                  f.setErroStep(null);
                  f.scrollToTop();
                  f.setStepIndex(7);
                  f.setMaxStep(prev => Math.max(prev, 7));
                }}
              />
            )}

            {f.stepIndex === 7 && (
              <StepCheckpoint
                alturaSalva={f.alturaSalva}
                pesoSalvo={f.pesoSalvo}
                pesoIdealSalvo={f.pesoIdealSalvo}
                estimativa={f.estimativa}
                nome={f.nome} setNome={f.setNome}
                sobrenome={f.sobrenome} setSobrenome={f.setSobrenome}
                estado={f.estado} setEstado={f.setEstado}
                email={f.email} setEmail={f.setEmail}
                telefone={f.telefone} setTelefone={f.setTelefone}
                erroValidacao={f.erroValidacao}
              />
            )}

            {f.stepIndex === 8 && (
              <StepDiferente
                descricaoDiferente={f.descricaoDiferente}
                setDescricaoDiferente={f.setDescricaoDiferente}
                pesoInicialDiferente={f.pesoInicialDiferente}
                setPesoInicialDiferente={f.setPesoInicialDiferente}
                concordaDiferente={f.concordaDiferente}
                setConcordaDiferente={f.setConcordaDiferente}
                erroStep={f.erroStep}
                onNext={() => {
                  if (!f.descricaoDiferente) { f.setErroStep("Preencha a descrição do medicamento."); return; }
                  if (!f.pesoInicialDiferente) { f.setErroStep("Informe seu peso inicial."); return; }
                  if (!f.concordaDiferente) { f.setErroStep("Você precisa responder se concorda em obter medicamentos somente por este programa."); return; }
                  f.setErroStep(null);
                  f.scrollToTop();
                  f.setStepIndex(5);
                  f.setMaxStep(prev => Math.max(prev, 5));
                }}
              />
            )}
          </>
        )}
      </form>
    </section>
  );
}
