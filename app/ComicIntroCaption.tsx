"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Gochi_Hand } from "next/font/google";

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const phrases = [
  "This is me",
  "My name is Trung-Nguyen",
  "I am a Product Enthusiast",
  "I have a unique international background",
  "5 countries lived, 24 countries travelled",
  "Proficient in English, French, and Vietnamese",
];

export default function ComicIntroCaption() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, 4800);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const phrase = phrases[phraseIndex];

  return (
    <div className="comic-caption" aria-live="polite">
      <div className="comic-caption-arrow-wrap" aria-hidden="true">
        <Image
          src="/portfolio-assets/arrow-up.svg"
          alt=""
          width={129}
          height={164}
          className="comic-caption-arrow"
          priority
        />
      </div>
      <p
        key={phraseIndex}
        className={`comic-caption-text ${gochiHand.className}`}
      >
        {phrase}
      </p>
    </div>
  );
}
