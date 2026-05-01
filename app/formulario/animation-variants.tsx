"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, type HTMLMotionProps } from "motion/react";

const STEP = 0.065;

// ─── Context ──────────────────────────────────────────────────────────────

type CtxValue = { register: () => number; visible: boolean };
const StaggerCtx = createContext<CtxValue | null>(null);

function useStaggerIndex() {
  const ctx = useContext(StaggerCtx);
  const idxRef = useRef<number | null>(null);
  // Saves index once per component mount — survives re-renders
  if (idxRef.current === null) {
    idxRef.current = ctx ? ctx.register() : 0;
  }
  return { index: idxRef.current, visible: ctx?.visible ?? true };
}

// ─── Animated Section ─────────────────────────────────────────────────────

/**
 * Container que detecta viewport e coordena o stagger dos filhos.
 * A própria seção faz fadeIn + slideUp ao entrar na tela.
 */
export function AnimatedSection({ children, ...props }: HTMLMotionProps<"div">) {
  const [visible, setVisible] = useState(false);
  const countRef = useRef(0);
  const register = useCallback(() => countRef.current++, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onViewportEnter={() => setVisible(true)}
      {...props}
    >
      <StaggerCtx.Provider value={{ register, visible }}>
        {children as ReactNode}
      </StaggerCtx.Provider>
    </motion.div>
  );
}

// ─── Base animated wrapper ────────────────────────────────────────────────

function AnimatedBase({ children, ...props }: HTMLMotionProps<"div">) {
  const { index, visible } = useStaggerIndex();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.4,
        delay: index * STEP,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Named exports ────────────────────────────────────────────────────────

/** Título da pergunta (h2/h3) */
export function AnimatedTitle(props: HTMLMotionProps<"div">) {
  return <AnimatedBase {...props} />;
}

/** Subtítulo / descrição / parágrafo */
export function AnimatedText(props: HTMLMotionProps<"div">) {
  return <AnimatedBase {...props} />;
}

/** Cada opção de resposta (radio, checkbox, select, input, textarea, botão) */
export function AnimatedOption(props: HTMLMotionProps<"div">) {
  return <AnimatedBase {...props} />;
}
