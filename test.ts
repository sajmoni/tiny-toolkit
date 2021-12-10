import * as tool from 'tiny-toolkit'
import test from 'ava'
import * as R from 'remeda'

const point1 = {
  x: 10,
  y: 20,
}

const point2 = {
  x: 30,
  y: 40,
}

test('getAngle', (t) => {
  const angle = tool.getAngle(point2, point1)
  t.is(angle, 3.9269908169872414)
})

test('getDistance', (t) => {
  const distance = tool.getDistance(point1, point2)
  t.is(distance, 28.284271247461902)
})

test('grid', (t) => {
  const getCell = tool.grid({
    x: 10,
    y: 20,
    marginX: 10,
    marginY: 20,
    breakAt: 3,
  })

  const result = R.times(5, getCell)

  t.deepEqual(result, [
    {
      x: 10,
      y: 20,
    },
    {
      x: 20,
      y: 20,
    },
    {
      x: 30,
      y: 20,
    },
    {
      x: 10,
      y: 40,
    },
    {
      x: 20,
      y: 40,
    },
  ])
})

test('grid - vertical', (t) => {
  const getCell = tool.grid({
    x: 10,
    y: 20,
    marginX: 10,
    marginY: 20,
    breakAt: 3,
    vertical: true,
  })

  const result = R.times(5, getCell)

  t.deepEqual(result, [
    {
      x: 10,
      y: 20,
    },
    {
      x: 10,
      y: 40,
    },
    {
      x: 10,
      y: 60,
    },
    {
      x: 20,
      y: 20,
    },
    {
      x: 20,
      y: 40,
    },
  ])
})

test('line', (t) => {
  const getX = tool.line({ start: 10, margin: 20 })

  const result = R.times(3, getX)

  t.deepEqual(result, [10, 30, 50])
})

test('normalizeRange', (t) => {
  const getValue = tool.normalizeRange(200, 300)
  t.is(getValue(250), 0.5)
  t.is(5 + getValue(250) * 10, 10)
})

test('normalizeVector', (t) => {
  const vector = { x: 1, y: 1 }
  const result = tool.normalizeVector(vector)
  t.deepEqual(result, { x: 0.7071067811865475, y: 0.7071067811865475 })
})

test('toRadians', (t) => {
  const radians = tool.toRadians(90)
  t.is(radians, Math.PI / 2)
})

test('treeToList', (t) => {
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

  t.deepEqual(tool.treeToList(node1, 'children'), [node2, node4, node3, node1])
})

test('capitalize', (t) => {
  t.is(tool.capitalize('hello'), 'Hello')
})

test('floorPoint', (t) => {
  t.deepEqual(tool.floorPoint({ x: 5.4656, y: 4.999 }), { x: 5, y: 4 })
})

test('getDirectionFromAngle', (t) => {
  t.deepEqual(tool.getDirectionFromAngle(tool.toRadians(0)), { x: 1, y: 0 })
  t.deepEqual(tool.getDirectionFromAngle(tool.toRadians(45)), {
    x: 0.70711,
    y: 0.70711,
  })
  t.deepEqual(tool.getDirectionFromAngle(tool.toRadians(90)), { x: 0, y: 1 })
  t.deepEqual(tool.getDirectionFromAngle(tool.toRadians(180)), { x: -1, y: 0 })
  t.deepEqual(tool.getDirectionFromAngle(tool.toRadians(270)), { x: -0, y: -1 })
})

test('getBorderingPoints', (t) => {
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
  t.deepEqual(tool.getBorderingPoints({ x: 2, y: 2 }), expectedResult)
})

test('getNextItem', (t) => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  t.is(tool.getNextItem(list[0], list), list[1])
  t.is(tool.getNextItem(list[1], list), list[2])
  t.is(tool.getNextItem(list[2], list), list[0])
})

test('getNextItem - item does not exist in list', (t) => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  t.throws(() => tool.getNextItem({ id: 3 }, list))
})

test('getPreviousItem', (t) => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  t.is(tool.getPreviousItem(list[0], list), list[2])
  t.is(tool.getPreviousItem(list[1], list), list[0])
  t.is(tool.getPreviousItem(list[2], list), list[1])
})

test('useIndex', (t) => {
  const { getNext, getPrevious } = tool.useIndex(10)
  t.is(getNext(0), 1)
  t.is(getNext(1), 2)
  t.is(getNext(9), 0)
  t.is(getPrevious(0), 9)
  t.is(getPrevious(1), 0)
  t.is(getPrevious(10), 9)

  // Out of bounds
  t.is(getNext(1000), 0)
  t.is(getPrevious(-1000), 9)
})

test('useIndex - loop === false', (t) => {
  const { getNext, getPrevious } = tool.useIndex(10, { loop: false })
  t.is(getNext(9), 9)
  t.is(getPrevious(0), 0)

  // Out of bounds
  t.is(getNext(1000), 1000)
  t.is(getPrevious(-1000), -1000)
})

test('create2DArrayWithDistanceToCenter', (t) => {
  const coordinates = tool.create2DArrayWithDistanceToCenter(3, 3)

  t.deepEqual(coordinates, [
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

test('removeFromList', (t) => {
  const list = [{ id: 0 }, { id: 1 }, { id: 2 }]
  tool.removeFromList(list[0], list)
  t.deepEqual(list, [{ id: 1 }, { id: 2 }])
})

test('squareLoop', (t) => {
  const results: Array<{ x: number; y: number; index: number }> = []
  tool.squareLoop(2, 3, (x, y, index) => {
    results.push({ x, y, index })
  })
  const expectedResults = [
    { x: 0, y: 0, index: 0 },
    { x: 0, y: 1, index: 1 },
    { x: 0, y: 2, index: 2 },
    { x: 1, y: 0, index: 3 },
    { x: 1, y: 1, index: 4 },
    { x: 1, y: 2, index: 5 },
  ]
  t.deepEqual(results, expectedResults)
})

test('getSurroundingRectangle', (t) => {
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

  t.deepEqual(result, expectedResult)
})

test('isColliding', (t) => {
  const rectangle1 = {
    x: 580.5563491861042,
    y: 523.5563491861042,
    width: 10,
    height: 10,
  }
  const rectangle2 = { x: 575, y: 525, width: 50, height: 50 }

  t.is(tool.isColliding(rectangle1, rectangle2), true)
})
