/**
 * Loads the file format into the in-memory format for the Code Grid.
 */
export function loadCodeFile(codeGrid) {
  return codeGrid.map((row) => row.map((cell) => {
    const [symbol, color = 'FFF'] = cell.trim().split('#');
    return {
      symbol,
      color: `#${color}`,
    };
  }));
}
