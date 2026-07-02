// 依檔名前綴（row-index，例如 1-1.png = row1 第1張）將 assets 圖片分組。
// 使用 import.meta.glob 動態載入，避免逐一 import。

const modules = import.meta.glob<string>("../assets/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
});

/** Record<row, url[]>，同組內依 index 由小到大排序。 */
const grouped: Record<number, { index: number; url: string }[]> = {};

for (const [path, url] of Object.entries(modules)) {
  const name = path.split("/").pop() ?? "";
  const match = name.match(/^(\d+)-(\d+)\./);
  if (!match) continue;
  const row = Number(match[1]);
  const index = Number(match[2]);
  (grouped[row] ??= []).push({ index, url });
}

for (const list of Object.values(grouped)) {
  list.sort((a, b) => a.index - b.index);
}

/** 取得某個場景(row) 對應的圖片 url 陣列。 */
export function imagesForScene(row: number): string[] {
  return (grouped[row] ?? []).map((item) => item.url);
}
