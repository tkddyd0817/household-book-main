import React from "react";

export default function MoneyChargeBar({
  chargeLevel,
}: {
  chargeLevel: number;
}) {
  // 바 색상 동적 변경
  let barBg = "linear-gradient(90deg, #FFD700 0%, #16a34a 100%)";
  if (chargeLevel >= 100) {
    barBg = "#FFD700";
  } else if (chargeLevel > 60) {
    // 60~100% 사이에서 점점 금색으로
    const goldRatio = (chargeLevel - 60) / 40; // 0~1
    barBg = `linear-gradient(90deg, #FFD700 ${goldRatio * 100}%, #16a34a 100%)`;
  }

  const barStyle = {
    width: `${chargeLevel}%`,
    height: "100%",
    background: barBg,
    borderRadius: "8px",
    transition: "width 0.2s, background 0.4s",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 24,
    color: "#fff",
    overflow: "hidden",
    position: "relative" as const,
  };

  // 동전 위치 계산 (왼쪽에서 오른쪽으로)
  const coinX = (chargeLevel / 100) * 240 - 24; // 240은 바의 width, 24는 동전 크기 보정
  const coinStyle = {
    position: "absolute" as const,
    left: Math.max(0, Math.min(coinX, 240 - 24)),
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 28,
    transition: "left 0.2s",
    filter: "drop-shadow(0 2px 4px #0006)",
  };

  // chargeLevel에 따라 동전 이모지 결정
  // const coinEmoji = chargeLevel > 60 ? "💵" : "🪙";

  const bills = ["💵", "💶", "💴", "💷"];
  const coinEmoji =
    chargeLevel > 60 ? bills[Math.floor(Math.random() * bills.length)] : "🪙";

  return (
    <div
      style={{
        width: 240,
        height: 32,
        background: "#222",
        borderRadius: "8px",
        overflow: "hidden",
        border: "2px solid #FFD700",
        marginBottom: 24,
        boxShadow: "0 2px 8px #0008",
        position: "relative",
      }}
    >
      <div style={barStyle}>
        {/* 동전 이모지 */}
        <span style={coinStyle}>{coinEmoji}</span>
      </div>
    </div>
  );
}

// import React from "react";

// export default function MoneyChargeBar({ chargeLevel }: { chargeLevel: number }) {
//   const barStyle = {
//     width: `${chargeLevel}%`,
//     height: "100%",
//     background: "linear-gradient(90deg, #FFD700 0%, #16a34a 100%)",
//     borderRadius: "8px",
//     transition: "width 0.2s",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     fontSize: 24,
//     color: "#fff",
//     overflow: "hidden"
//   };

//   const emojiCount = Math.floor(chargeLevel / 10);
//   const emojis = Array(emojiCount).fill("🪙").join("");

//   return (
//     <div style={{
//       width: 240,
//       height: 32,
//       background: "#222",
//       borderRadius: "8px",
//       overflow: "hidden",
//       border: "2px solid #FFD700",
//       marginBottom: 24,
//       boxShadow: "0 2px 8px #0008"
//     }}>
//       <div style={barStyle}>
//         <span style={{ marginRight: 8 }}>{emojis}</span>
//       </div>
//     </div>
//   );
// }
