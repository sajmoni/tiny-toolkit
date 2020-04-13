/**
 * Get the angle in radians between two points
 */
export const getAngle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const xDistance = x2 - x1
  const yDistance = y2 - y1
  const angle = Math.atan(yDistance / xDistance)
  if (x1 - x2 < 0) {
    return angle + Math.PI
  }
  return angle
}

/**
 * Get the distance between two points
 */
export const getDistance = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
) => Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1))

/**
 * Generate a grid
 */
export const grid = ({
  x, y, marginX, marginY, itemsPerRow,
}) => (index) => {
  const row = Math.floor(index / itemsPerRow)
  const column = index % itemsPerRow
  return {
    x: x + (column * marginX),
    y: y + (row * marginY),
  }
}

/**
 * Normalize range
 */
export const normalizeRange = (min, max) => {
  const delta = max - min
  return (t) => (t - min) / delta
}

/**
 * Normalize vector
 */
export const normalizeVector = ({ x, y }) => {
  const magnitude = Math.sqrt((x ** 2) + (y ** 2))
  return {
    // * Magnitude can be 0, can't divide with that
    x: (x / magnitude) || 0,
    y: (y / magnitude) || 0,
  }
}

/**
 * Convert degrees to radians
 */
export const toRadians = (degrees) => degrees * (Math.PI / 180)

/**
 * Convert radians to degrees
 */
export const toDegrees = (radians) => radians * (180 / Math.PI)
