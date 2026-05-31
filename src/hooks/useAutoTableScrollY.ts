import { RefObject, useEffect, useState } from "react";

type Options = {
  enabled?: boolean;
  bottomOffset?: number;
  minScrollY?: number;
  deps?: unknown[];
};

export function useAutoTableScrollY(
  wrapperRef: RefObject<HTMLDivElement | null>,
  {
    enabled = true,
    bottomOffset = 24,
    minScrollY = 240,
    deps = [],
  }: Options = {},
) {
  const [scrollY, setScrollY] = useState(minScrollY);

  useEffect(() => {
    if (!enabled) return;

    const calculate = () => {
      const top = wrapperRef.current?.getBoundingClientRect().top ?? 0;
      const available = window.innerHeight - top - bottomOffset;
      setScrollY(Math.max(minScrollY, Math.floor(available)));
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [enabled, bottomOffset, minScrollY, wrapperRef, ...deps]);

  return scrollY;
}
