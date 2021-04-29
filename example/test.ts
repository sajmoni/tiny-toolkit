import * as tool from 'tiny-toolkit'
import test from 'ava'
import _ from 'lodash/fp'

const point1 = {
  x: 10,
  y: 20,
}

const point2 = {
  x: 30,
  y: 40,
}

test('getAngle', (t) => {
  const angle = tool.getAngle(point1, point2)
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

  const result = _.times(getCell, 5)

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

  const result = _.times(getCell, 5)

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
  t.deepEqual(tool.getDirectionFromAngle(0), { x: 1, y: 0 })
  t.deepEqual(tool.getDirectionFromAngle(45), { x: 0.70711, y: 0.70711 })
  t.deepEqual(tool.getDirectionFromAngle(90), { x: 0, y: 1 })
  t.deepEqual(tool.getDirectionFromAngle(180), { x: -1, y: 0 })
  t.deepEqual(tool.getDirectionFromAngle(270), { x: -0, y: -1 })
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

test('roundTo', (t) => {
  t.is(tool.roundTo(1.234, 2), 1.23)
})

test('roundDown', (t) => {
  t.is(tool.roundDown(1.234, 2), 1.23)
})

test('roundUp', (t) => {
  t.is(tool.roundUp(1.234, 2), 1.24)
})
