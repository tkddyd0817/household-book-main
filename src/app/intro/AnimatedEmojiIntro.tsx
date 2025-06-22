import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface AnimatedEmojiIntroProps {
  density?: number; // 이모지 밀도
  emojis: string[]; // 떨어뜨릴 이모지 배열
}

function AnimatedEmojiIntro({ density = 1, emojis }: AnimatedEmojiIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedElements = useRef(new Set<HTMLDivElement>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.error("AnimatedEmojiIntro 컨테이너가 준비되지 않았어요! 🥲");
      return;
    }

    // 배경 스타일 유지
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.overflow = "hidden";
    container.style.pointerEvents = "none";

    // 컨테이너 크기 계산 함수 (리사이즈 대응)
    const getContainerSize = () => ({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });

    // 이모지 스노우 생성 함수
    const createEmojiSnow = () => {
      const { width, height } = getContainerSize();

      // 랜덤 이모지 선택
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      // div 생성
      const element = document.createElement("div");
      element.style.position = "absolute";
      element.style.pointerEvents = "none";
      element.style.userSelect = "none";
      element.style.fontFamily =
        "Apple Color Emoji,Segoe UI Emoji,NotoColorEmoji,Segoe UI Symbol,Android Emoji,EmojiSymbols,sans-serif";

      // 랜덤 크기/투명도/회전
      const size = gsap.utils.random(24, 48); // px
      const startOpacity = gsap.utils.random(0.7, 1);
      const endOpacity = 0;
      const rotation = gsap.utils.random(-30, 30);
      const sway = gsap.utils.random(20, 80); // 좌우 흔들림 폭

      // 시작 위치 (좌우 랜덤, 위쪽)
      const startX = gsap.utils.random(0, width - size);
      const startY = -size;

      // 끝 위치 (아래쪽, 좌우 살짝 흔들림)
      const endX = startX + gsap.utils.random(-sway, sway);
      const endY = height + size;

      // 속도(떨어지는 시간)
      const duration = gsap.utils.random(2.5, 5);

      // 스타일 적용
      element.textContent = emoji;
      element.style.fontSize = `${size}px`;
      element.style.opacity = `${startOpacity}`;
      element.style.left = `0px`;
      element.style.top = `0px`;
      element.style.filter = "drop-shadow(0 0 10px #fff8)";

      // 초기 위치/회전
      gsap.set(element, {
        x: startX,
        y: startY,
        rotation: rotation,
        scale: 1,
        opacity: startOpacity,
      });

      container.appendChild(element);
      animatedElements.current.add(element);

      // 애니메이션 타임라인 (아래로 떨어지며 흔들림/회전/페이드아웃)
      gsap
        .timeline({
          onComplete: () => {
            if (container.contains(element)) {
              container.removeChild(element);
              animatedElements.current.delete(element);
            }
          },
        })
        .to(element, {
          x: endX,
          y: endY,
          rotation: rotation + gsap.utils.random(-20, 20),
          opacity: endOpacity,
          duration: duration,
          ease: "linear",
        });
    };

    // 초기 이모지 스노우 생성
    const initialElements = 40 * density; // 기본 40, density만큼 곱
    for (let i = 0; i < initialElements; i++) {
      gsap.delayedCall(gsap.utils.random(0, 2), createEmojiSnow);
    }

    // 주기적으로 새로운 이모지 스노우 생성
    const elementCreationInterval = setInterval(() => {
      for (let i = 0; i < density; i++) {
        createEmojiSnow();
      }
    }, 300);

    // cleanup
    return () => {
      clearInterval(elementCreationInterval);
      if (container) {
        animatedElements.current.forEach((element) => {
          gsap.killTweensOf(element);
          if (container.contains(element)) {
            container.removeChild(element);
          }
        });
        animatedElements.current.clear();
      }
      gsap.killTweensOf(createEmojiSnow);
    };
  }, [density, emojis]);

  return <div ref={containerRef} />;
}

export default AnimatedEmojiIntro;

