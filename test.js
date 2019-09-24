import test from 'ava'
import { internalChance } from './internal'

const probability = 0.2

test('chance: true if less', (t) => {
  const fakeRandom = 0.1
  const result = internalChance(probability, fakeRandom)

  t.is(result, true)
})

test('chance: true if equal', (t) => {
  const fakeRandom = 0.2
  const result = internalChance(probability, fakeRandom)

  t.is(result, true)
})

test('chance: false if more', (t) => {
  const fakeRandom = 0.3
  const result = internalChance(probability, fakeRandom)

  t.is(result, false)
})
