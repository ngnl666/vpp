import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import type { Scene } from "../data/scenes";
import { SceneCard } from "./SceneCard";

interface CardDeckProps {
  scenes: Scene[];
  activeIndex: number;
  /** direction: +1 = 下一張, -1 = 上一張 */
  onChange: (nextIndex: number, direction: number) => void;
  onOpenImages: () => void;
}

const SWIPE_DISTANCE = 90; // px 門檻
const SWIPE_VELOCITY = 0.4;

export function CardDeck({ scenes, activeIndex, onChange, onOpenImages }: CardDeckProps) {
  const total = scenes.length;
  const active = scenes[activeIndex];
  // 背景墊卡（下一張），營造堆疊層次
  const behind = scenes[(activeIndex + 1) % total];

  const [{ x, rot, scale }, api] = useSpring(() => ({
    x: 0,
    rot: 0,
    scale: 1,
    config: { tension: 320, friction: 32 },
  }));

  // 每次切換卡片後，重置到中心（從側邊滑入的感覺）
  useEffect(() => {
    void api.start({ x: 0, rot: 0, scale: 1, immediate: false });
  }, [activeIndex, api]);

  const bind = useDrag(
    ({ active: dragging, movement: [mx], velocity: [vx], direction: [dx], cancel }) => {
      const trigger = Math.abs(mx) > SWIPE_DISTANCE || vx > SWIPE_VELOCITY;

      if (!dragging && trigger) {
        const dir = dx < 0 ? 1 : -1; // 向左滑 = 下一張
        const flyX = (200 + window.innerWidth) * (dir === 1 ? -1 : 1);
        void api.start({
          x: flyX,
          rot: dir === 1 ? -18 : 18,
          scale: 1,
          config: { tension: 260, friction: 30 },
          onResolve: () => {
            const nextIndex = (activeIndex + dir + total) % total;
            onChange(nextIndex, dir);
          },
        });
        cancel();
        return;
      }

      void api.start({
        x: dragging ? mx : 0,
        rot: dragging ? mx / 18 : 0,
        scale: dragging ? 1.02 : 1,
        immediate: dragging,
      });
    },
    { axis: "x", filterTaps: true, pointer: { touch: true } },
  );

  return (
    <div className="deck">
      {/* 背景墊卡 */}
      <div className="deck__behind" aria-hidden="true">
        <SceneCard scene={behind} position={{ current: 0, total }} onOpenImages={() => {}} />
      </div>

      {/* 前景可拖曳卡 */}
      <animated.div
        {...bind()}
        className="deck__front"
        style={{
          x,
          rotateZ: rot,
          scale,
          touchAction: "pan-y",
        }}
      >
        <SceneCard
          scene={active}
          position={{ current: activeIndex + 1, total }}
          onOpenImages={onOpenImages}
        />
      </animated.div>
    </div>
  );
}
