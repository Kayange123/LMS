"use client";

import { useConfettiStore } from "@/hooks/useConfettiStore";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = () => {
  const confettiStore = useConfettiStore();
  if (!confettiStore.isOpen) {
    return null;
  }
  return (
    <ReactConfetti
      className="cursor-none pointer-events-none z-50"
      numberOfPieces={800}
      recycle={false}
      onConfettiComplete={() => confettiStore.onClose()}
    />
  );
};
