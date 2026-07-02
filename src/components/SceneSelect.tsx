import type { Scene } from "../data/scenes";

interface SceneSelectProps {
  scenes: Scene[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SceneSelect({ scenes, activeIndex, onSelect }: SceneSelectProps) {
  return (
    <div className="scene-select">
      <label className="scene-select__label" htmlFor="scene-picker">
        快速跳到場景
      </label>
      <div className="scene-select__field">
        <select
          id="scene-picker"
          value={activeIndex}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          {scenes.map((scene, i) => (
            <option key={scene.id} value={i}>
              {scene.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
