import { useState } from "react";
import { scenes } from "./data/scenes";
import { CardDeck } from "./components/CardDeck";
import { SceneSelect } from "./components/SceneSelect";
import { Lightbox } from "./components/Lightbox";

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = scenes[activeIndex];

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">Cosplay 團拍腳本規劃表</p>
        <h1 className="app__title">戀上換裝娃娃・海夢宇宙</h1>
      </header>

      <main className="app__main">
        <CardDeck
          scenes={scenes}
          activeIndex={activeIndex}
          onChange={(nextIndex) => setActiveIndex(nextIndex)}
          onOpenImages={() => setLightboxOpen(true)}
        />
      </main>

      <footer className="app__footer">
        <SceneSelect scenes={scenes} activeIndex={activeIndex} onSelect={setActiveIndex} />
        <p className="app__hint">← 左右滑動切換場景 →</p>
      </footer>

      {lightboxOpen && active.images.length > 0 && (
        <Lightbox
          images={active.images}
          startIndex={0}
          title={active.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
