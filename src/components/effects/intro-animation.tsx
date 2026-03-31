'use client';

import { createContext, useContext, useState, useMemo, useCallback } from 'react';

interface IntroAnimationContextType {
  /** Current animation phase. -1 = not on animated page (always show everything). */
  phase: number;
  setPhase: (phase: number) => void;
}

const IntroAnimationContext = createContext<IntroAnimationContextType>({
  phase: -1,
  setPhase: () => {},
});

export function IntroAnimationProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhaseRaw] = useState(-1);

  const setPhase = useCallback((p: number) => {
    setPhaseRaw((prev) => (p > prev ? p : prev));
  }, []);

  const value = useMemo(() => ({ phase, setPhase }), [phase, setPhase]);

  return (
    <IntroAnimationContext.Provider value={value}>
      {children}
    </IntroAnimationContext.Provider>
  );
}

export function useIntroAnimation() {
  return useContext(IntroAnimationContext);
}
