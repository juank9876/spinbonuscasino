export function capitalize(text: string | undefined): string {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}