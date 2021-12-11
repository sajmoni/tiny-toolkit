import roundTo from 'round-to'

export type Point = {
  x: number
  y: number
}

export type Vector = {
  x: number
  y: number
}

export type GridOptions = {
  x: number
  y: number
  marginX: number
  marginY: number
  breakAt: number
  vertical?: boolean
}

export type Rectangle = {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Get the angle in radians between two points
 */
export const getAngle = (origin: Point, target: Point): number => {
  const { x: x1, y: y1 } = target
  const { x: x2, y: y2 } = origin
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

type GetCell = (index: number) => Point

/**
 * Generate a grid
 */
export const grid =
  ({
    x,
    y,
    marginX,
    marginY,
    breakAt,
    vertical = false,
  }: GridOptions): GetCell =>
  (index) => {
    const row = Math.floor(index / breakAt)
    const column = index % breakAt
    return {
      x: x + (vertical ? row : column) * marginX,
      y: y + (vertical ? column : row) * marginY,
    }
  }

/**
 * Place items on a line
 */
export const line =
  ({ start, margin }: { start: number; margin: number }) =>
  (index: number): number => {
    return start + margin * index
  }

type GetValue = (inRange: number) => number

/**
 * Normalize range
 */
export const normalizeRange = (minimum: number, maximum: number): GetValue => {
  const delta = maximum - minimum
  return (inRange) => (inRange - minimum) / delta
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
  if (
    rectangle1.x > rectangle2.x + rectangle2.width ||
    rectangle2.x > rectangle1.x + rectangle1.width
  )
    return false

  if (
    rectangle1.y > rectangle2.y + rectangle2.height ||
    rectangle2.y > rectangle1.y + rectangle1.height
  )
    return false

  return true
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

type Node = Record<string, any>

/**
 * Convert a tree structure into a flat list
 * @param childrenField The field on the `node` that contains the child nodes
 */
export const treeToList = (node: Node, childrenField = 'children'): Node[] => {
  if (!node[childrenField]) {
    return [node]
  }

  return node[childrenField]
    .flatMap((childNode: Node) => treeToList(childNode, childrenField))
    .concat(node)
}

/**
 * Make the first letter in a string uppercase.
 *
 * Note: Doesn't handle internationalization
 */
export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Apply Math.floor to both x and y in a point
 * @param point
 * @returns
 */
export const floorPoint = (point: Point): Point => ({
  x: Math.floor(point.x),
  y: Math.floor(point.y),
})

/**
 * Capped at 5 decimal points
 *
 * @param angle - In radians
 */
export const getDirectionFromAngle = (angle: number): Vector => {
  const x = roundTo(Math.cos(angle), 5)
  const y = roundTo(Math.sin(angle), 5)
  return { x, y }
}

/*
const noDiagonals = [
  // { x: x - 1, y: y + 1 },
  { x, y: y + 1 },
  // { x: x + 1, y: y + 1 },
  { x: x - 1, y },
  { x: x + 1, y },
  // { x: x - 1, y: y - 1 },
  { x, y: y - 1 },
  // { x: x + 1, y: y - 1 },
]
*/

/*
  [4][0][5],
  [3][x][1],
  [7][2][6],
*/
export const getBorderingPoints = ({ x, y }: Point): Point[] => [
  { x, y: y - 1 },
  { x: x + 1, y },
  { x, y: y + 1 },
  { x: x - 1, y },
  { x: x - 1, y: y - 1 },
  { x: x + 1, y: y - 1 },
  { x: x + 1, y: y + 1 },
  { x: x - 1, y: y + 1 },
]

/**
 * Get the next item in a list. Loops back to the first item after the last one.
 * @param currentItem - An item in the list
 * @param list
 */
export const getNextItem = <T>(currentItem: T, list: T[]): T => {
  const currentIndex = list.indexOf(currentItem)
  if (currentIndex === -1) {
    throw new Error('getNextItem: Item does not exist in the list!')
  }

  const nextIndex = (currentIndex + 1) % list.length
  return list[nextIndex]
}

export const getPreviousItem = <T>(currentItem: T, list: T[]): T => {
  const currentIndex = list.indexOf(currentItem)
  if (currentIndex === -1) {
    throw new Error('getPreviousItem: Item does not exist in the list!')
  }

  const previousIndex =
    currentIndex - 1 < 0 ? list.length - 1 : currentIndex - 1
  return list[previousIndex]
}

export const useIndex = (maximum: number, options: { loop?: boolean } = {}) => {
  const { loop = true } = options
  const minimum = 0
  return {
    getNext: (index: number): number => {
      if (index + 1 > maximum - 1) {
        return loop ? minimum : index
      }

      return index + 1
    },
    getPrevious: (index: number): number => {
      if (index - 1 < minimum) {
        return loop ? maximum - 1 : index
      }

      return index - 1
    },
  }
}

type Coordinate = {
  x: number
  y: number
  distanceToCenter: number
}

export const create2DArrayWithDistanceToCenter = (
  width: number,
  height: number,
): Coordinate[] => {
  const halfWidth = width / 2
  const halfHeight = height / 2

  const coordinates = []

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      const xDistance = Math.abs(x - halfWidth)
      const yDistance = Math.abs(y - halfHeight)
      const distanceToCenter = Math.sqrt(xDistance ** 2 + yDistance ** 2)
      coordinates.push({ distanceToCenter, x, y })
    }
  }

  return coordinates
}

/**
 * Remove an item from a list by mutating the list
 *
 * @param item
 * @param list
 */
export const removeFromList = <T>(item: T, list: T[]): void => {
  const index = list.indexOf(item)
  list.splice(index, 1)
}

export const squareLoop = (
  xTimes: number,
  yTimes: number,
  callback: (x: number, y: number, index: number) => void,
) => {
  let index = 0
  for (let x = 0; x < xTimes; x++) {
    for (let y = 0; y < yTimes; y++) {
      callback(x, y, index)
      index += 1
    }
  }
}

/**
 * Based on a point, get a surrounding rectangle with the point in the middle
 */
export const getSurroundingRectangle = ({
  point,
  width,
  height,
}: {
  point: Point
  width: number
  height: number
}): Rectangle => {
  const x = point.x - Math.floor(width / 2)
  const y = point.y - Math.floor(height / 2)

  return {
    x,
    y,
    width,
    height,
  }
}

/**
 * Example:
 * CreateTypeFromObject<typeof anyObject>
 * Use only the keys:
 * CreateTypeFromObject<keyof typeof anyObject>
 * { foo: 'bar', foo2: 'bar2' } => 'foo' | 'foo2'
 */
export type CreateTypeFromObject<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never
}

/**
 * Clamp a value to a target value
 *
 * clampToTarget(63, )
 */
export const clampToTarget = (value: number, target: number): number =>
  Math.floor(value / target)
