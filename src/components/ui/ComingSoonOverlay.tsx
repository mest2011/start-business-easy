import React, { type ReactNode } from "react";

export const ComingSoonOverlay: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative w-full h-full min-h-full">
      <div className="absolute inset-0 z-10 p-4">
        <div className="sticky top-[50vh] -translate-y-1/2 bg-white/95 p-8 rounded-2xl shadow-xl border border-neutral-200 text-center max-w-md mx-auto relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-900 to-neutral-500"></div>

          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            Em Construção
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Este módulo ainda está sendo trabalhado por nossa equipe e estará
            disponível em breve!
          </p>
        </div>
      </div>
      <div className="pointer-events-none select-none opacity-40">
        {children}
      </div>
    </div>
  );
};
