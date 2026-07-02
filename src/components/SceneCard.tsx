import type { Scene } from "../data/scenes";
import { CameraIcon } from "./icons";

interface SceneCardProps {
  scene: Scene;
  /** 目前是第幾張 / 總共幾張，顯示在頁首 */
  position: { current: number; total: number };
  /** 點擊右上角相機 button */
  onOpenImages: () => void;
}

function Section({ label, items }: { label: string; items: string[] }) {
  return (
    <section className="card__section">
      <h3 className="card__label">{label}</h3>
      <ul className="card__list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function SceneCard({ scene, position, onOpenImages }: SceneCardProps) {
  const hasImages = scene.images.length > 0;

  return (
    <article className="card">
      <header className="card__head">
        <div className="card__head-text">
          <div className="card__meta">
            <span className="card__chip">{scene.tag}</span>
            <span className="card__count">
              {position.current} / {position.total}
            </span>
          </div>
          <h2 className="card__title">{scene.title}</h2>
        </div>

        <button
          className="card__camera"
          onClick={onOpenImages}
          disabled={!hasImages}
          aria-label={hasImages ? "查看示意圖" : "沒有示意圖"}
        >
          <CameraIcon className="icon" />
          {hasImages && <span className="card__camera-badge">{scene.images.length}</span>}
        </button>
      </header>

      <div className="card__body">
        <Section label="登場角色與站位" items={scene.cast} />
        <Section label="動作與故事感" items={scene.action} />
        <Section label="攝影師手法 / 畫面要求" items={scene.camera} />
      </div>
    </article>
  );
}
