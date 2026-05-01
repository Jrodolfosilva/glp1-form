import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
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
import { CloudUpload, X, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { diasOptions } from "../data";
import { AnimatedSection, AnimatedTitle, AnimatedText, AnimatedOption } from "../animation-variants";

type Props = {
  descricaoGlp1: string;
  setDescricaoGlp1: (v: string) => void;
  ultimaDose: string;
  setUltimaDose: (v: string) => void;
  concordaPrograma: string | null;
  setConcordaPrograma: (v: string | null) => void;
  files: File[];
  setFiles: (v: File[]) => void;
  erroStep: string | null;
  onNext: () => void;
};

export default function StepDetalhesGlp1({
  descricaoGlp1, setDescricaoGlp1,
  ultimaDose, setUltimaDose,
  concordaPrograma, setConcordaPrograma,
  files, setFiles,
  erroStep,
  onNext,
}: Props) {
  return (
    <div className="mt-5">
      {/* qt-13 */}
      <AnimatedSection id="qt-13" className="mt-5">
        <AnimatedTitle>
          <h2 className="text-2xl font-bold mb-4">
            Conte-nos sobre seu medicamento GLP-1.
            <span className="text-red-500 text-sm ml-2 font-normal">qt-13</span>
          </h2>
        </AnimatedTitle>
        <AnimatedText>
          <p className="text-base mb-4">
            Por favor, informe o nome, a dose e a frequência de uso do seu medicamento GLP-1.
          </p>
        </AnimatedText>
        <AnimatedOption>
          <Textarea
            className="input-default w-full h-37.5 bg-white"
            id="descricao-glp1"
            value={descricaoGlp1}
            onChange={(e) => setDescricaoGlp1(e.target.value)}
            placeholder="Escreva aqui..."
          />
        </AnimatedOption>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-14 */}
      <AnimatedSection id="qt-14" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl font-bold mb-4">
            Quando foi sua última dose de medicação?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-14</span>
          </h3>
        </AnimatedTitle>
        <RadioGroup className="flex flex-col gap-4" value={ultimaDose} onValueChange={setUltimaDose}>
          {diasOptions.map((opt) => (
            <AnimatedOption key={opt.value}>
              <FieldLabel htmlFor={`dose-${opt.value}`}>
                <Field orientation="horizontal" className="input-default">
                  <RadioGroupItem value={opt.value} id={`dose-${opt.value}`} />
                  <FieldContent><FieldTitle>{opt.label}</FieldTitle></FieldContent>
                </Field>
              </FieldLabel>
            </AnimatedOption>
          ))}
        </RadioGroup>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-15 */}
      <AnimatedSection id="qt-15" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl font-bold mb-4">
            Qual era o seu peso inicial?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-15</span>
          </h3>
        </AnimatedTitle>
        <AnimatedOption>
          <div className="flex-1 space-y-2">
            <Label htmlFor="peso-inicial">Peso inicial</Label>
            <Input id="peso-inicial" type="number" placeholder="Ex: 90"
              className="bg-white rounded-md p-4 h-auto border border-[#dde3eb] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#dde3eb]"
            />
          </div>
        </AnimatedOption>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-16 */}
      <AnimatedSection id="qt-16" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl font-bold mb-4">
            Por favor, tire ou envie uma foto do seu medicamento GLP-1.
            <span className="text-red-500 text-sm ml-2 font-normal">qt-16</span>
          </h3>
        </AnimatedTitle>
        <AnimatedText>
          <p className="text-base mb-4">
            Se você estiver solicitando uma receita para sua dose atual ou para uma dose maior, isso é importante. Se você não tiver uma foto disponível, pode pular esta etapa.
          </p>
        </AnimatedText>
        <AnimatedOption>
          <FileUpload maxFiles={1} maxSize={15 * 1024 * 1024} accept="image/*" className="w-full" value={files} onValueChange={setFiles}>
            <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
              <CloudUpload className="size-4" />
              <span className="text-sm">Arraste e solte ou</span>
              <FileUploadTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0">escolha um arquivo</Button>
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
        </AnimatedOption>
        <p className="text-[13px] text-[#9ca3af] mt-1">Máximo de 15MB</p>
      </AnimatedSection>

      <Separator className="mt-8" />

      {/* qt-17 */}
      <AnimatedSection id="qt-17" className="mt-5">
        <AnimatedTitle>
          <h3 className="text-2xl font-bold mb-4">
            Você concorda em obter medicamentos para perda de peso somente por meio deste programa daqui para frente?
            <span className="text-red-500 text-sm ml-2 font-normal">qt-17</span>
          </h3>
        </AnimatedTitle>
        <AnimatedText>
          <p className="text-base mb-4">É importante não &ldquo;empilhar&rdquo; medicamentos para perda de peso.</p>
        </AnimatedText>
        <RadioGroup className="flex gap-4" value={concordaPrograma ?? ""} onValueChange={setConcordaPrograma}>
          <AnimatedOption className="w-1/2">
            <FieldLabel htmlFor="concorda-sim" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/yes.svg" width={30} height={30} />
                  <FieldTitle>Sim</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="sim" id="concorda-sim" className="hidden" />
              </Field>
            </FieldLabel>
          </AnimatedOption>
          <AnimatedOption className="w-1/2">
            <FieldLabel htmlFor="concorda-nao" className="radio-card">
              <Field orientation="vertical" className="h-35">
                <FieldContent className="flex flex-col items-center gap-2 justify-center">
                  <Image alt="" src="/no.svg" width={30} height={30} />
                  <FieldTitle>Não</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="nao" id="concorda-nao" className="hidden" />
              </Field>
            </FieldLabel>
          </AnimatedOption>
        </RadioGroup>
      </AnimatedSection>

      <Separator className="mt-8" />
      <button type="button" onClick={onNext} className="submit cursor-pointer">Próximo</button>
      {erroStep && (
        <div className="flex items-center gap-2 mt-2 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-red-600" />
          <span>{erroStep}</span>
        </div>
      )}
    </div>
  );
}
