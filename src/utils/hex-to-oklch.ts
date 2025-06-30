import { parse, formatHex, oklch } from 'culori';


export function hexToOklch(hex: string, amount: number = 0.1, mode: 'lighter' | 'darker' = 'lighter'): string | null {
  const color = parse(hex);
  if (!color) return null;

  const oklchColor = oklch(color);
  if (!oklchColor) return null;

  const newL = mode === 'lighter'
    ? Math.min(1, oklchColor.l + amount)
    : Math.max(0, oklchColor.l - amount);

  const modified = {
    ...oklchColor,
    l: newL,
  };

  return formatHex(modified);
}