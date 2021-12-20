/**
 * Returns true when the point is inside the box.
 * Box min is inclusive, Box max is exclusive.
 * @param  {[x, y]} point
 * @param  {[minX, minY, maxX, maxY]} box
 * @return {Boolean}
 */
export function inBounds(point, box) {
  const [x, y] = point;
  const [minX, minY, maxX, maxY] = box;

  return (x >= minX) && (x < maxX)
    && (y >= minY) && (y < maxY);
}
