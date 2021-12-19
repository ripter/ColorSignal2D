
export function colorFromCell(cell) {
  const R = padValue(cell.R);
  const G = padValue(cell.G);
  const B = padValue(cell.B);
  return `#${R}${G}${B}`.toUpperCase();
}

function padValue(val) {
  return (val < 0x0F ? '0' : '') + (val === 0 ? '0' : val.toString(16));
}
