import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Design system: dark editorial portfolio (purple-toned)
 * - Pairs with `.reveal` / `.reveal.in` utilities defined in index.css
 * - Uses IntersectionObserver to stage entrance animations as content scrolls in
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = As as React.ElementType;
  return (
    <Comp ref={ref as never} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </Comp>
  );
}
