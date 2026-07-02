"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FloatingSticker = {
  id: number;
  src: string;
  alt: string;
  width: number;
  baseX: number;
  baseY: number;
  baseRotation: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  bobOffset: number;
  bobSpeed: number;
};

const stickerData: Omit<FloatingSticker, "x" | "y" | "vx" | "vy" | "rotation" | "scale" | "bobOffset" | "bobSpeed">[] = [
  {
    id: 2,
    src: "/stickers/international-v2.png",
    alt: "International Backgrounds",
    width: 140,
    baseX: -246,
    baseY: -156,
    baseRotation: -9,
  },
  {
    id: 5,
    src: "/stickers/languages-v2.png",
    alt: "3 Languages Spoken (+1)",
    width: 135,
    baseX: -307,
    baseY: 56,
    baseRotation: -8,
  },
  {
    id: 1,
    src: "/stickers/countries-lived-v7.png",
    alt: "05 Countries Lived",
    width: 145,
    baseX: 246,
    baseY: -156,
    baseRotation: 9,
  },
  {
    id: 4,
    src: "/stickers/b2b-saas-v2.png",
    alt: "B2B SaaS",
    width: 130,
    baseX: 307,
    baseY: 56,
    baseRotation: 8,
  },
  {
    id: 0,
    src: "/stickers/tech-product-v2.png",
    alt: "Tech & Product Enthusiast",
    width: 145,
    baseX: -136,
    baseY: 225,
    baseRotation: -9,
  },
  {
    id: 3,
    src: "/stickers/building-products-v2.png",
    alt: "Building Products Since 2022",
    width: 136,
    baseX: 0,
    baseY: -250,
    baseRotation: 2,
  },
  {
    id: 6,
    src: "/stickers/consumer-apps-v2.png",
    alt: "Consumer Apps",
    width: 125,
    baseX: 136,
    baseY: 225,
    baseRotation: 9,
  },
];

const stickerSizeScale = 1.2;

const initializeStickers = (): FloatingSticker[] =>
  stickerData.map((sticker) => ({
    ...sticker,
    x: sticker.baseX,
    y: sticker.baseY,
    vx: 0,
    vy: 0,
    rotation: sticker.baseRotation,
    scale: 1,
    bobOffset: Math.random() * Math.PI * 2,
    bobSpeed: 0.5 + Math.random() * 0.25,
  }));

export default function ComicIntroCaption() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<FloatingSticker[]>(() => initializeStickers());
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const containerElement: HTMLDivElement = currentContainer;

    function animate() {
      const rect = containerElement.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const now = Date.now() / 1000;

      setStickers((prevStickers) =>
        prevStickers.map((sticker) => {
          const bobX = Math.sin(now * sticker.bobSpeed + sticker.bobOffset) * 4;
          const bobY = Math.cos(now * sticker.bobSpeed * 0.7 + sticker.bobOffset) * 5;
          const bobRotation = Math.sin(now * sticker.bobSpeed * 0.4 + sticker.bobOffset) * 2;

          let targetX = sticker.baseX + bobX;
          let targetY = sticker.baseY + bobY;
          let targetRotation = sticker.baseRotation + bobRotation;

          if (mouseRef.current.active) {
            const mouseX = mouseRef.current.x - centerX;
            const mouseY = mouseRef.current.y - centerY;

            const dx = sticker.x - mouseX;
            const dy = sticker.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const repulsionRadius = 120;
            const repulsionStrength = 50;

            if (distance < repulsionRadius && distance > 0) {
              const force = (1 - distance / repulsionRadius) * repulsionStrength;
              const angle = Math.atan2(dy, dx);

              targetX += Math.cos(angle) * force;
              targetY += Math.sin(angle) * force;
              targetRotation += Math.cos(angle) * force * 0.1;
            }
          }

          const springStrength = 0.055;
          const damping = 0.8;

          let vx = sticker.vx + (targetX - sticker.x) * springStrength;
          let vy = sticker.vy + (targetY - sticker.y) * springStrength;
          vx *= damping;
          vy *= damping;

          const x = sticker.x + vx;
          const y = sticker.y + vy;

          const rotationSpring = 0.07;
          const rotation = sticker.rotation + (targetRotation - sticker.rotation) * rotationSpring;

          const speed = Math.sqrt(vx * vx + vy * vy);
          const scale = 1 + Math.min(speed * 0.006, 0.04);

          return { ...sticker, x, y, vx, vy, rotation, scale };
        }),
      );

      animationRef.current = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerElement.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    containerElement.addEventListener("mousemove", handleMouseMove);
    containerElement.addEventListener("mouseleave", handleMouseLeave);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      containerElement.removeEventListener("mousemove", handleMouseMove);
      containerElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-stickers-container"
      aria-label="About me stickers"
    >
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="floating-sticker"
          style={{
            transform: `translate(calc(${sticker.x}px * var(--sticker-orbit-scale)), calc(${sticker.y}px * var(--sticker-orbit-scale))) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
          }}
        >
          <Image
            src={sticker.src}
            alt={sticker.alt}
            width={Math.round(sticker.width * stickerSizeScale)}
            height={Math.round(sticker.width * stickerSizeScale)}
            className="sticker-image"
            style={{ width: Math.round(sticker.width * stickerSizeScale), height: "auto" }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
