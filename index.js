import { internalChance } from './internal'

export const angle = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const xDistance = x2 - x1
  const yDistance = y2 - y1
  const a = Math.atan(yDistance / xDistance)
  if (x1 - x2 < 0) {
    return a + Math.PI
  }
  return a
}

export const chance = (probability = 0.5) => internalChance(probability, Math.random())

export const distance = (
  { x: x1, y: y1 },
  { x: x2, y: y2 },
) => Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1))

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

// Convert a number range to a value between 0 and 1
export const normalize = (min, max) => {
  const delta = max - min
  return (t) => (t - min) / delta
}

// from = inclusive, to = exclusive
export const randomInRange = (from, to) => Math.floor((Math.random() * (to - from)) + from)

export const toRadians = (_angle) => _angle * (Math.PI / 180)

// export const weighted = (weights) => {
//   const total = weights.reduce((sum, weight) => sum + weight, 0)
// }
