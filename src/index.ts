type Point = {
  readonly x: number
  readonly y: number
}

type Vector = {
  readonly x: number
  readonly y: number
}

type GridOptions = {
  readonly x: number
  readonly y: number
  readonly marginX: number
  readonly marginY: number
  readonly itemsPerRow: number
}

type Rectangle = {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

/**
 * Get the angle in radians between two points
 */
export const getAngle = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point,
): number => {
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
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point,
): number => Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1))

type getCell = (index: number) => Point

/**
 * Generate a grid
 */
export const grid = ({
  x,
  y,
  marginX,
  marginY,
  itemsPerRow,
}: GridOptions): getCell => (index) => {
  const row = Math.floor(index / itemsPerRow)
  const column = index % itemsPerRow
  return {
    x: x + column * marginX,
    y: y + row * marginY,
  }
}

type getValue = (t: number) => number

/**
 * Normalize range
 */
export const normalizeRange = (min: number, max: number): getValue => {
  const delta = max - min
  return (t) => (t - min) / delta
}

/**
 * Normalize vector
 */
export const normalizeVector = ({ x, y }: Vector): Vector => {
  const magnitude = Math.sqrt(x ** 2 + y ** 2)
  return {
    // * Magnitude can be 0, can't divide with that
    x: x / magnitude || 0,
    y: y / magnitude || 0,
  }
}

/**
 * Convert degrees to radians
 */
export const toRadians = (degrees: number): number => degrees * (Math.PI / 180)

/**
 * Convert radians to degrees
 */
export const toDegrees = (radians: number): number => radians * (180 / Math.PI)

/**
 * Check if two rectangles are overlapping.
 */
export const isColliding = (
  rectangle1: Rectangle,
  rectangle2: Rectangle,
): boolean => {
  return (
    rectangle1.x + rectangle1.width >= rectangle2.x &&
    rectangle2.x + rectangle2.width >= rectangle1.x &&
    rectangle1.y + rectangle1.height >= rectangle2.x &&
    rectangle2.y + rectangle2.height >= rectangle1.y
  )
}

/**
 * Check how much two rectangles are overlapping
 */
export const getOverlappingArea = (
  rectangle1: Rectangle,
  rectangle2: Rectangle,
): number => {
  if (!isColliding(rectangle1, rectangle2)) {
    return 0
  }

  const minX = Math.max(rectangle1.x, rectangle2.x)
  const maxX = Math.min(
    rectangle1.x + rectangle1.width,
    rectangle2.x + rectangle2.width,
  )
  const dX = maxX - minX

  const minY = Math.max(rectangle1.y, rectangle2.y)
  const maxY = Math.min(
    rectangle1.y + rectangle1.height,
    rectangle2.y + rectangle2.height,
  )
  const dY = maxY - minY

  return dX * dY
}

export const getAverage = (list: readonly number[]): number => {
  if (list.length === 0) {
    return 0
  }

  // eslint-disable-next-line unicorn/no-reduce
  return list.reduce((total, number) => total + number, 0) / list.length
}
