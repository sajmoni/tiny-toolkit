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

```js
tool.getDirectionFromAngle(angle)
```

Get the direction vector from an angle (in degrees).

---

```js
tool.getBorderingPoints(point)
```

[4][0][5]

[3][x][1]

[7][2][6]

---

### :heavy_division_sign::heavy_multiplication_x: Math

```js
tool.getAverage(list)
```

Get the average of a list of numbers.

---

```js
tool.floorPoint(string)
```

Apply Math.floor to both x and y in a point.

#### Example

```js

```

---

```js
tool.normalizeRange(min, max)
```

Turn a number range into a `0 - 1` number range.

Returns a function to transform a number between `min` and `max`

#### Example

```js
const min = 200
const max = 300

const getOpacity = normalizeRange(min, max)

getOpacity(250)
// 0.5
```

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

---

```js
tool.toDegrees(angle)
```

Convert an angle from `radians` to `degrees`

---

```js
tool.roundTo(number, precision)
```

```js
tool.roundUp(number, precision)
```

```js
tool.roundDown(number, precision)
```

[Docs](https://github.com/sindresorhus/round-to)

---

### :iphone: Layout

```js
tool.grid(options)
```

Generate a function to position objects on a grid.

Returns a function to get coordinates. Signature: `(index: number) => { x, y }`

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

```js
tool.line(options)
```

Generate a function to position objects on a line.

Returns a function to get a coordinate. Signature: `(index: number) => number`

#### Options

| Option     | Description                      |
| ---------- | -------------------------------- |
| **start**  | The position of the first object |
| **margin** | The space between each object    |

#### Example

```js
import * as tool from 'tiny-toolkit'

const numbers = [1, 2, 3]

const getX = tool.line({
  start: 10,
  margin: 20,
})

numbers.map(getX)
// [10, 30, 50]
```

---

### :star: Collisions

```js
tool.isColliding(rectangle1, rectangle2)
```

Check if two rectangles are colliding.

---

```js
tool.getOverlappingArea(rectangle1, rectangle2)
```

Check how much two rectangles are overlapping

---

### :star: Misc

```js
tool.treeToList(rootNode, childrenField)
```

Convert a tree structure into a flat list

#### Example

```js

```

---

```js
tool.capitalize(string)
```

Make the first letter in a string uppercase.

#### Example

```js

```

---

```js
tool.getNextItem(currentItem, list)
```

Get the next item in a list. Loops back to the first item after the last one.

#### Example

```js

```

---

## :computer: Install

**yarn**

`yarn add tiny-toolkit`

**npm**

`npm install tiny-toolkit`

---

## :book: Recipes
