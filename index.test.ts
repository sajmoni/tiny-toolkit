import { test, expect } from 'vitest'
import * as R from 'remeda'

import * as tool from './src'

const point1 = {
  x: 10,
  y: 20,
}

const point2 = {
  x: 10,
  y: 40,
}

test('getAngle', () => {
  const angle = tool.getAngle(point2, point1)
  expect(angle).toBe(1.5707963267948966)
})

test('getDistance', () => {
  const distance = tool.getDistance(point1, point2)
  expect(distance).toBe(20)
})

test('grid', () => {
  const getCell = tool.grid({
    x: 10,
    y: 20,
    marginX: 10,
    marginY: 20,
    breakAt: 3,
  })

  const result = R.times(5, getCell)

  expect(result).toEqual([
    {
      x: 10,
      y: 20,
      isFinalColumn: false,
    },
    {
      x: 20,
      y: 20,
      isFinalColumn: false,
    },
    {
      x: 30,
      y: 20,
      isFinalColumn: true,
    },
    {
      x: 10,
      y: 40,
      isFinalColumn: false,
    },
    {
      x: 20,
      y: 40,
      isFinalColumn: false,
    },
  ])
})

test('grid - vertical', () => {
  const getCell = tool.grid({
    x: 10,
    y: 20,
    marginX: 10,
    marginY: 20,
    breakAt: 3,
    vertical: true,
  })

  const result = R.times(5, getCell)

  expect(result).toEqual([
    {
      x: 10,
      y: 20,
      isFinalColumn: false,
    },
    {
      x: 10,
      y: 40,
      isFinalColumn: false,
    },
    {
      x: 10,
      y: 60,
      isFinalColumn: false,
    },
    {
      x: 20,
      y: 20,
      isFinalColumn: false,
    },
    {
      x: 20,
      y: 40,
      isFinalColumn: false,
    },
  ])
})

test('line', () => {
  const getX = tool.line({ start: 10, margin: 20 })

  const result = R.times(3, getX)

  expect(result).toEqual([10, 30, 50])
})

test('normalizeRange', () => {
  const getValue = tool.normalizeRange(200, 300)
  expect(getValue(250)).toBe(0.5)
  expect(5 + getValue(250) * 10).toBe(10)
})

test('deNormalizeRange', () => {
  const getValue = tool.deNormalizeRange(200, 300)
  expect(getValue(0.5)).toBe(250)
})

test('toRadians', () => {
  const radians = tool.toRadians(90)
  expect(radians).toBe(Math.PI / 2)
})

test('treeToList', () => {
  const node4 = {
    id: '4',
    children: [],
  }
  const node3 = {
    id: '3',
    children: [node4],
  }
  const node2 = { id: '2' }

  const node1 = {
    id: '1',
    children: [node2, node3],
  }

  expect(tool.treeToList(node1, 'children')).toEqual([
    node2,
    node4,
    node3,
    node1,
  ])
})

test('capitalize', () => {
  expect(tool.capitalize('hello')).toBe('Hello')
})

test('getDirectionFromAngle', () => {
  expect(tool.getDirectionFromAngle(tool.toRadians(0))).toEqual({ x: 1, y: 0 })
  expect(tool.getDirectionFromAngle(tool.toRadians(45))).toEqual({
    x: 0.70711,
    y: 0.70711,
  })
  expect(tool.getDirectionFromAngle(tool.toRadians(90))).toEqual({ x: 0, y: 1 })
  expect(tool.getDirectionFromAngle(tool.toRadians(180))).toEqual({
    x: -1,
    y: 0,
  })
  expect(tool.getDirectionFromAngle(tool.toRadians(270))).toEqual({
    x: -0,
    y: -1,
  })
})

test('getBorderingPoints', () => {
  const expectedResult = [
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
    { x: 1, y: 2 },
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
  ]
  expect(tool.getBorderingPoints({ x: 2, y: 2 })).toEqual(expectedResult)
})

test('getNextItem', () => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  expect(tool.getNextItem(list[0], list)).toEqual(list[1])
  expect(tool.getNextItem(list[1], list)).toEqual(list[2])
  expect(tool.getNextItem(list[2], list)).toEqual(list[0])
})

test('getNextItem - item does not exist in list', () => {
  // TODO: Fix this
  // const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  // t.throws(() => tool.getNextItem({ id: 3 }, list))
})

test('getPreviousItem', () => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  expect(tool.getPreviousItem(list[0], list)).toEqual(list[2])
  expect(tool.getPreviousItem(list[1], list)).toEqual(list[0])
  expect(tool.getPreviousItem(list[2], list)).toEqual(list[1])
})

test('useIndex', () => {
  // Loop
  const getNewIndex = tool.useIndex(10, { loop: true })

  expect(getNewIndex(0, 1)).toBe(1)
  expect(getNewIndex(1, 1)).toBe(2)
  expect(getNewIndex(9, 1)).toBe(0)
  expect(getNewIndex(0, -1)).toBe(9)
  expect(getNewIndex(1, -1)).toBe(0)
  expect(getNewIndex(9, -1)).toBe(8)

  // Out of bounds
  expect(getNewIndex(1000, 1)).toBe(1000)
  expect(getNewIndex(-100, -1)).toBe(-100)

  expect(getNewIndex(0, 5)).toBe(5)
  expect(getNewIndex(5, -5)).toBe(0)
  expect(getNewIndex(9, 5)).toBe(4)
  expect(getNewIndex(0, -5)).toBe(5)
})

test('useIndex - loop === false', () => {
  const getNewIndex = tool.useIndex(10, { loop: false })
  expect(getNewIndex(9, 1)).toBe(9)
  expect(getNewIndex(0, -1)).toBe(0)
  expect(getNewIndex(9, 5)).toBe(9)
  expect(getNewIndex(0, -5)).toBe(0)

  // Out of bounds
  expect(getNewIndex(1000, 1)).toBe(1000)
  expect(getNewIndex(-100, -1)).toBe(-100)
})

test('create2dArrayWithDistanceToCenter', () => {
  const coordinates = tool.create2dArrayWithDistanceToCenter(3, 3)

  expect(coordinates).toEqual([
    { distanceToCenter: 2.1213203435596424, x: 0, y: 0 },
    { distanceToCenter: 1.5811388300841898, x: 0, y: 1 },
    { distanceToCenter: 1.5811388300841898, x: 0, y: 2 },
    { distanceToCenter: 1.5811388300841898, x: 1, y: 0 },
    { distanceToCenter: 0.7071067811865476, x: 1, y: 1 },
    { distanceToCenter: 0.7071067811865476, x: 1, y: 2 },
    { distanceToCenter: 1.5811388300841898, x: 2, y: 0 },
    { distanceToCenter: 0.7071067811865476, x: 2, y: 1 },
    { distanceToCenter: 0.7071067811865476, x: 2, y: 2 },
  ])
})

test('removeFromList', () => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  tool.removeFromList(list[0], list)
  expect(list).toEqual([{ id: 1 }, { id: 2 }])
})

test('times2d', () => {
  const results: Array<{ x: number; y: number; index: number }> = tool.times2d(
    2,
    3,
    (x, y, index) => {
      return { x, y, index }
    },
  )
  const expectedResults = [
    { x: 0, y: 0, index: 0 },
    { x: 0, y: 1, index: 1 },
    { x: 0, y: 2, index: 2 },
    { x: 1, y: 0, index: 3 },
    { x: 1, y: 1, index: 4 },
    { x: 1, y: 2, index: 5 },
  ]
  expect(results).toEqual(expectedResults)
})

test('getSurroundingRectangle', () => {
  const result = tool.getSurroundingRectangle({
    point: { x: 10, y: 12 },
    width: 6,
    height: 8,
  })

  const expectedResult = {
    x: 7,
    y: 8,
    width: 6,
    height: 8,
  }

  expect(result).toEqual(expectedResult)
})

test('isColliding', () => {
  const rectangle1 = {
    x: 580.5563491861042,
    y: 523.5563491861042,
    width: 10,
    height: 10,
  }
  const rectangle2 = { x: 575, y: 525, width: 50, height: 50 }

  expect(tool.isColliding(rectangle1, rectangle2)).toBe(true)
})

test('getDirection - 1', () => {
  const result = tool.getDirection({ x: 10, y: 10 }, { x: 15, y: 20 })
  expect(result).toEqual({ x: 0.44721, y: 0.89443 })
})

test('getDirection - 2', () => {
  const result = tool.getDirection({ x: 10, y: 10 }, { x: 3, y: -7 })
  expect(result).toEqual({ x: -0.38075, y: -0.92468 })
})

test('getAverage', () => {
  expect(tool.getAverage([1, 3])).toBe(2)
})

test('getNameFromFilename', () => {
  expect(tool.getNameFromFilename('thisIsAName.mp3')).toBe('thisIsAName')
})

test('insertString', () => {
  expect(tool.insertString('justAString', 'Simple', 5)).toBe(
    'justASimpleString',
  )
})

test('getRandomInt', () => {
  // TODO: Translate to vitest
  // t.notThrows(tool.getRandomInt)
})

test('findDuplicates', () => {
  expect(tool.findDuplicates(['foo', 'not a duplicate', 'foo'])).toEqual([
    'foo',
  ])
})
