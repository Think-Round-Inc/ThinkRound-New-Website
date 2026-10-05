"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-square w-full overflow-hidden">
      {visible && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full transform object-cover transition-all duration-1000 ease-out ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className ?? ""}`}
        />
      )}
    </div>
  );
}
