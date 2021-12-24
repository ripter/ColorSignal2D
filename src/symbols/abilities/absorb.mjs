

/**
 * Absorbs te color values from cells and adds them to self.
 * Mutates self
 * @param  {Signal} self
 * @param  {[Signal]} cells
 * @return {Signal} self
 */
export function absorb(self, cells) {
  if (cells < 1) { return self; }

  for (const cell of cells) {
    self.R += cell.R;
    self.G += cell.G;
    self.B += cell.B;
  }
  self.A = cells[0].A;
  return self;
}
