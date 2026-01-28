function interpolateColor(
  startColor: string,
  endColor: string,
  percentage: number,
): string {
  const clamp = (value: number) => Math.min(100, Math.max(0, value));
  const t = clamp(percentage) / 100;

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")}`;

  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  const r = start.r + (end.r - start.r) * t;
  const g = start.g + (end.g - start.g) * t;
  const b = start.b + (end.b - start.b) * t;

  return rgbToHex(r, g, b);
}

export function getUrgencyColor(percentage: number): string {
  const RED_500 = "#ef4444";
  const GREEN = "#00ff88";

  return interpolateColor(RED_500, GREEN, percentage);
}
