export function getKey(x, y) {
  return `[${x},${y}]`;
}

export function fromKey(key) {
  return JSON.parse(key);
}
