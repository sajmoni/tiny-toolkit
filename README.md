# :wrench: Tiny Toolkit

> A collection of useful tiny javascript functions

<div align="center">
  <img src="https://badgen.net/npm/v/tiny-toolkit?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/tiny-toolkit" />
  <img src="https://badgen.net/github/last-commit/sajmoni/tiny-toolkit?icon=github" />
</div>

## :sparkles: Features

### :straight_ruler: Measure

```js
tool.getAngle(point1, point2)
```

Get the angle (in radians) between two points. Points need to be objects with an `x` and `y` field.

---

```js
tool.getDistance(point1, point2)
```

Get the distance between two points. Points need to be objects with an `x` and `y` field.

---

### :heavy_division_sign::heavy_multiplication_x: Math

```js
tool.normalizeRange(min, max)
```

Turn a number range into a `0 - 1` number range.

Returns a function to transform a number between `min` and `max`

[Normalize to other than 0-1](#normalize-to-other-than-0-1)

#### Example

```js
const min = 200
const max = 300

const getOpacity = normalizeRange(min, max)

getOpacity(250)
// 0.5
```

---

```js
tool.normalizeVector(vector)
```

[Normalize a vector](https://www.youtube.com/watch?v=m7VY1T6f8Ak).

_This is useful for character movement in games_.

#### Example - Character movement

```js
const movement = {
  x: 0,
  y: 0,
}

if (isKeyDown('down')) {
  movement.y += 1
}
if (isKeyDown('up')) {
  movement.y -= 1
}
if (isKeyDown('left')) {
  movement.x -= 1
}
if (isKeyDown('right')) {
  movement.x += 1
}

const normalizedMovement = normalizeVector(movement)
// If DOWN and RIGHT are pressed:
// { x: 0.7071067811865475, y: 0.7071067811865475 }
```

---

```js
tool.toRadians(angle)
```

Convert an angle from `degrees` to `radians`

<!-- ---

```js
tool.toDegrees(angle)
```

Convert an angle from `radians` to `degrees` -->

---

### :iphone: Layout

```js
tool.grid(options)
```

Generate a function to position objects on a grid.

Returns a function to get coordinates. Signature: `(index) => { x, y }`

#### Options

| Option       | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| **x**        | The `x` coordinate of the top left corner                                             |
| **y**        | The `y` coordinate of the top left corner                                             |
| **marginX**  | The space between each cell on the `x` axis                                           |
| **marginY**  | The space between each cell on the `y` axis                                           |
| **breakAt**  | The amount of cells on a `row` (`column` if `vertical` is `true`) before a line break |
| **vertical** | If the grid should be layed out vertically instead (Default `false`)                  |

#### Example

```js
import * as tool from 'tiny-toolkit'

const numbers = [1, 2, 3]

const getCell = tool.grid({
  x: 10,
  y: 10,
  marginX: 10,
  marginY: 10,
  breakAt: 2,
})

numbers.map(getCell)
// [{ x: 10, y: 10}, {x: 20, y: 10}, {x: 10, y: 20}]
```

---

## :computer: Install

**yarn**

`yarn add tiny-toolkit`

**npm**

`npm install tiny-toolkit`

---

## :book: Recipes

#### Normalize to other than 0-1

Multiply the output of `tool.normalizeRange` with `intended max - min`

Add to the output of `tool.normalizeRange` with `intended min`

##### Example with 5 - 15

```js
import * as tool from 'tiny-toolkit'

const min = 200
const max = 300

const getOpacity = tool.normalize(min, max)

5 + getOpacity(250) * 10
// 10
```
