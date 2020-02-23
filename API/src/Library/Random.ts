// src/Library/Random.ts

export function camelCase(string: string): string {
  return string.replace(/^[A-Z]/g, (g) => g.toLowerCase());
}
