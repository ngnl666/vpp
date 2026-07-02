import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

interface LightboxProps {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}

export function Lightbox({ images, startIndex, title, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const count = images.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // 鍵盤操作（桌機預覽用）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // 開啟時鎖住背景捲動
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} 示意圖`}>
      <div className="lightbox__backdrop" onClick={onClose} />

      <button className="lightbox__close" onClick={onClose} aria-label="關閉">
        <CloseIcon className="icon" />
      </button>

      <div className="lightbox__stage">
        <img
          className="lightbox__img"
          src={images[index]}
          alt={`${title} 示意圖 ${index + 1}`}
          key={images[index]}
        />
      </div>

      {count > 1 && (
        <>
          <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="上一張">
            <ChevronLeftIcon className="icon" />
          </button>
          <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="下一張">
            <ChevronRightIcon className="icon" />
          </button>

          <div className="lightbox__dots">
            {images.map((src, i) => (
              <button
                key={src}
                className={`dot ${i === index ? "dot--active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`第 ${i + 1} 張`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
