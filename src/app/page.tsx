"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MoneyChargeBar from "@/app/intro/MoneyChargeBar";
import AnimatedEmojiIntro from "@/app/intro/AnimatedEmojiIntro";

const currencyEmojis: Record<string, string[]> = {
  ko: ["₩", "💴", "💵", "💶", "💸", "💰", "🪙", "🤑", "$", "¥", "€", "£"],
  en: ["$", "💵", "💶", "💴", "💸", "💰", "🪙", "🤑", "€", "£", "¥"],
  ja: ["¥", "💴", "💵", "💶", "💸", "💰", "🪙", "🤑", "$", "€", "£"],
  fr: ["€", "💶", "💵", "💴", "💸", "💰", "🪙", "🤑", "$", "¥", "£"],
  es: ["€", "💶", "💵", "💴", "💸", "💰", "🪙", "🤑", "$", "¥", "£"],
};

export default function HomeRedirect() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [chargeLevel, setChargeLevel] = useState(0);

  useEffect(() => {
    // chargeLevel을 0~100까지 30ms마다 1씩 증가
    if (showIntro && chargeLevel < 100) {
      const interval = setInterval(() => {
        setChargeLevel((prev) => (prev < 100 ? prev + 1 : 100));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [showIntro, chargeLevel]);

  useEffect(() => {
    // chargeLevel이 100이 되면 0.5초 후 /ko로 이동
    if (chargeLevel === 100 && showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        router.replace("/ko");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [chargeLevel, showIntro, router]);

  if (showIntro) {
    const emojis = currencyEmojis["ko"];
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          background: "#f8fafc",
        }}
      >
        <AnimatedEmojiIntro density={2} emojis={emojis} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <MoneyChargeBar chargeLevel={chargeLevel} />
        </div>
      </div>
    );
  }

  return null;
}

