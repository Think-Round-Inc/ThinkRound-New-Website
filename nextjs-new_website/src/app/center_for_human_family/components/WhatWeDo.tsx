"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./WhatWeDo.module.css";

interface WhatWeDoProps {
  heading: string;
  cards: readonly { readonly title: string; readonly body: string }[];
}

/**
 * The three "what we do" cards.
 *
 * All three fit at desktop width, so the arrows are disabled there. They come
 * into play on narrower screens, where the track scrolls one card at a time.
 */
export default function WhatWeDo({ heading, cards }: WhatWeDoProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  /** Advance by a full set of visible cards, as the design's two states do. */
  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: (track.clientWidth + gap) * direction,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section} aria-labelledby="chf-what-we-do">
      <h2 className={styles.heading} id="chf-what-we-do">
        {heading}
      </h2>

      <div className={styles.carousel}>
        <button
          className={styles.arrow}
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 4 7 12l8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <ul className={styles.track} ref={trackRef} onScroll={syncArrows}>
          {cards.map((card) => (
            <li className={styles.card} key={card.title}>
              <span className={styles.cardIcon} aria-hidden="true" />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.body}</p>
            </li>
          ))}
        </ul>

        <button
          className={styles.arrow}
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m9 4 8 8-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
