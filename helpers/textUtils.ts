export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function productNamePattern(name: string): RegExp {
  return new RegExp(`^\\s*${escapeRegExp(name)}(\\s*-\\s*\\d+%)?\\s*$`);
}
