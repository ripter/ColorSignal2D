/**
 * Returns true when the point is inside the box.
 * Box min is inclusive, Box max is exclusive.
 * @param  {[minX, minY, maxX, maxY]} box
 * @param  {[x, y]} point
 * @return {Boolean}
 */
export function inBounds(box, point) {
  const [x, y] = point;
  const [minX, minY, maxX, maxY] = box;

  return (x >= minX) && (x < maxX)
    && (y >= minY) && (y < maxY);
}
