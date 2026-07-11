"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const avatarEmotions = {
  mail: "/portfolio-assets/avatar-emotion-mail-v2.png",
  safari: "/portfolio-assets/avatar-emotion-safari.png",
  claude: "/portfolio-assets/avatar-emotion-claude-v2.png",
  notes: "/portfolio-assets/avatar-emotion-notes.png",
  photos: "/portfolio-assets/avatar-emotion-photos.png",
  "app-store": "/portfolio-assets/avatar-emotion-app-store-v2.png",
  trash: "/portfolio-assets/avatar-emotion-trash.png",
} as const;

type AvatarEmotion = keyof typeof avatarEmotions;

const isAvatarEmotion = (value: string | undefined): value is AvatarEmotion =>
  Boolean(value && value in avatarEmotions);

export default function TrackingAvatar() {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [activeEmotion, setActiveEmotion] = useState<AvatarEmotion | null>(null);
  const repulsionRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const currentAvatar = avatarRef.current;

    if (!currentAvatar) {
      return;
    }

    const avatarElement: HTMLDivElement = currentAvatar;

    function animateRepulsion() {
      const state = repulsionRef.current;
      const springStrength = 0.08;
      const damping = 0.85;

      // Spring back to origin
      state.vx += (0 - state.x) * springStrength;
      state.vy += (0 - state.y) * springStrength;
      state.vx *= damping;
      state.vy *= damping;
      state.x += state.vx;
      state.y += state.vy;

      // Magnetic pop: scale up slightly while the avatar is springing around
      const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);
      const scale = 1 + Math.min(speed * 0.01, 0.06);

      avatarElement.style.setProperty("--repulsion-x", `${state.x}px`);
      avatarElement.style.setProperty("--repulsion-y", `${state.y}px`);
      avatarElement.style.setProperty("--repulsion-scale", `${scale}`);

      animationRef.current = requestAnimationFrame(animateRepulsion);
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = avatarElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);
      const xProgress = clamp(deltaX / (rect.width * 0.34), -1, 1);
      const yProgress = clamp(deltaY / (rect.height * 0.42), -1, 1);
      const easedX =
        Math.sign(xProgress) * Math.pow(Math.abs(xProgress), 0.82);
      const easedY =
        Math.sign(yProgress) * Math.pow(Math.abs(yProgress), 0.9);
      const leftTravel = Math.max(9, rect.width * 0.026);
      const rightTravel = Math.max(26, rect.width * 0.078);
      const verticalTravel = Math.max(9, rect.height * 0.032);
      const pupilX =
        easedX < 0 ? easedX * leftTravel : easedX * rightTravel;
      const horizontalBias = Math.max(3, rect.width * 0.01);
      const pupilY = easedY * verticalTravel;

      avatarElement.style.setProperty("--pupil-x", `${pupilX + horizontalBias}px`);
      avatarElement.style.setProperty("--pupil-y", `${pupilY}px`);

      // Repulsion effect when cursor is close
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const repulsionRadius = rect.width * 0.6;
      const repulsionStrength = 42;

      if (distance < repulsionRadius && distance > 0) {
        const force = (1 - distance / repulsionRadius) * repulsionStrength;
        const angle = Math.atan2(-deltaY, -deltaX);
        repulsionRef.current.vx += Math.cos(angle) * force * 0.15;
        repulsionRef.current.vy += Math.sin(angle) * force * 0.15;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationRef.current = requestAnimationFrame(animateRepulsion);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const getDockItem = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return null;
      }

      return target.closest<HTMLElement>("[data-avatar-emotion]");
    };

    const activateEmotion = (target: EventTarget | null) => {
      const emotion = getDockItem(target)?.dataset.avatarEmotion;

      if (isAvatarEmotion(emotion)) {
        setActiveEmotion(emotion);
      }
    };

    const deactivateEmotion = (
      target: EventTarget | null,
      relatedTarget?: EventTarget | null,
    ) => {
      const dockItem = getDockItem(target);
      const relatedNode = relatedTarget instanceof Node ? relatedTarget : null;

      if (!dockItem || dockItem.contains(relatedNode)) {
        return;
      }

      setActiveEmotion(null);
    };

    const handlePointerOver = (event: PointerEvent) => {
      activateEmotion(event.target);
    };
    const handlePointerOut = (event: PointerEvent) => {
      deactivateEmotion(event.target, event.relatedTarget);
    };
    const handleFocusIn = (event: FocusEvent) => {
      activateEmotion(event.target);
    };
    const handleFocusOut = (event: FocusEvent) => {
      deactivateEmotion(event.target, event.relatedTarget);
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <div
      ref={avatarRef}
      className="avatar-frame"
      role="img"
      aria-label="Nguyen avatar illustration"
    >
      <Image
        src="/portfolio-assets/avatar-base-no-pupils.png"
        alt=""
        width={500}
        height={500}
        className={`avatar-layer avatar-base-layer ${
          activeEmotion ? "avatar-layer-hidden" : ""
        }`}
        aria-hidden="true"
        priority
        unoptimized
      />
      <Image
        src="/portfolio-assets/avatar-pupils.png"
        alt=""
        width={500}
        height={500}
        className={`avatar-layer avatar-pupils-layer ${
          activeEmotion ? "avatar-layer-hidden" : ""
        }`}
        aria-hidden="true"
        priority
        unoptimized
      />
      {activeEmotion ? (
        <Image
          src={avatarEmotions[activeEmotion]}
          alt=""
          width={500}
          height={500}
          className={`avatar-layer avatar-emotion-layer avatar-emotion-${activeEmotion}`}
          aria-hidden="true"
          priority
          unoptimized
        />
      ) : null}
    </div>
  );
}
