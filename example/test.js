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

test('angle', (t) => {
  const angle = tool.angle(point1, point2)
  t.is(angle, 3.9269908169872414)
})

test('distance', (t) => {
  const distance = tool.distance(point1, point2)
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
      x: 10, y: 20,
    },
    {
      x: 20, y: 20,
    },
    {
      x: 30, y: 20,
    },
    {
      x: 10, y: 40,
    },
    {
      x: 20, y: 40,
    },
  ])
})

test('normalizeRange', (t) => {
  const getValue = tool.normalizeRange(200, 300)
  t.is(getValue(250), 0.5)
  t.is(5 + getValue(250) * 10, 10)
})

test('normalizeVector', (t) => {
  const vector = { x: 1, y: 1}
  const result  = tool.normalizeVector(vector)
  t.deepEqual(result, { x: 0.7071067811865475, y: 0.7071067811865475 })
})

test('toRadians', (t) => {
  const radians = tool.toRadians(90)
  t.is(radians, Math.PI / 2)
})
