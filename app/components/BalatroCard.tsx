import React, { useRef, useEffect } from "react";
import "../styles/balatro-card.css";

interface BalatroCardProps {
  children: React.ReactNode;
  className?: string; // Allow passing extra classes
}

const BalatroCard = ({ children, className = "" }: BalatroCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Helper functions
    const clamp = (x: number) => Math.min(1, Math.max(-1, x));
    const setCss = (key: string, value: string | number) => {
      card.style.setProperty(key, String(value));
    };

    // Initialize
    card.dataset.state = "outside";
    setCss("--x", "0");
    setCss("--y", "0");
    setCss("--angle", "0.25turn");
    setCss("--r", "0.5");

    const handlePointerMove = (event: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      const cx = clamp(2 * (x / w) - 1);
      const cy = clamp(2 * (y / h) - 1);

      // Calculate angle and radius for gradients
      const angle = Math.atan2(cy, cx) + Math.PI / 2;
      const radius = Math.sqrt(cx ** 2 + cy ** 2);

      setCss("--x", cx);
      setCss("--y", cy);
      setCss("--angle", `${angle}rad`);
      setCss("--r", radius);
    };

    const handlePointerEnter = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      card.dataset.state = "inside";
    };

    const handlePointerLeave = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      card.dataset.state = "outside";
      // Reset position on leave if desired, or let CSS transition handle it returning to transform 0
      setCss("--x", 0);
      setCss("--y", 0);
    };

    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`balatro-card ${className}`}>
      <div
        data-element="background"
        className="rounded-xl shadow-md bg-white dark:bg-gray-800"
      ></div>
      <div data-element="rainbow"></div>
      <div data-element="shine"></div>
      <div data-element="content" className="p-4 relative h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BalatroCard;
