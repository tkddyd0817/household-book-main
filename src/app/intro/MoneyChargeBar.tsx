import React from "react";

export default function MoneyChargeBar({ chargeLevel }: { chargeLevel: number }) {
  const barStyle = {
    width: `${chargeLevel}%`,
    height: "100%",
    background: "linear-gradient(90deg, #FFD700 0%, #16a34a 100%)",
    borderRadius: "8px",
    transition: "width 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 24,
    color: "#fff",
    overflow: "hidden"
  };

  const emojiCount = Math.floor(chargeLevel / 10);
  const emojis = Array(emojiCount).fill("🪙").join("");

  return (
    <div style={{
      width: 240,
      height: 32,
      background: "#222",
      borderRadius: "8px",
      overflow: "hidden",
      border: "2px solid #FFD700",
      marginBottom: 24,
      boxShadow: "0 2px 8px #0008"
    }}>
      <div style={barStyle}>
        <span style={{ marginRight: 8 }}>{emojis}</span>
      </div>
    </div>
  );
}