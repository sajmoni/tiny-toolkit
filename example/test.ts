import * as tool from 'tiny-toolkit'
import test from 'ava'
import _ from 'lodash/fp'

// Measure
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

// Misc

test('grid', (t) => {
  const getCell = tool.grid({
    x: 10,
    y: 20,
    marginX: 10,
    marginY: 20,
    itemsPerRow: 3,
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
  const node2 = { id: '2', children: [] }

  const node1 = {
    id: '1',
    children: [node2, node3],
  }

  t.deepEqual(tool.treeToList(node1, 'children'), [node2, node4, node3, node1])
})
