# :wrench: Tiny Toolkit

> A collection of useful javascript game dev tools

## :sparkles: Features :sparkles:

### :straight_ruler: Measure

```js
tool.angle(point1, point2)
```

Get the angle (in radians) between two points. Points need to be objects with an `x` and `y` field.

---

```js
tool.distance(point1, point2)
```

Get the distance between two points. Points need to be objects with an `x` and `y` field.

---

### :game_die: Random

```js
tool.chance(probability = 0.5)
```

Set a probability (between 0 and 1) to return true. 

---

```js
tool.randomInRange(from, to)
``` 

Get a random number in a number range. `from` = inclusive, `to` = exclusive.

---

### :cat: Misc

```js
tool.grid(options)
``` 

Generate a function to position objects on a grid.

Returns a function to get coordinates. Signature: `(index) => { x, y }`

#### Options

Option | Description
-- | -- 
**x** | The x coordinate of the top left corner
**y** | The y coordinate of the top left corner
**marginX** | The space between each cell on the x axis
**marginY** | The space between each cell on the y axis
**itemsPerRow** | The amount of items on a row before a line break

#### Example

```js
  import * as tool from 'tiny-toolkit'

  const numbers = [1, 2, 3]

  const getCell = tool.grid({
    x: 10,
    y: 10,
    marginX: 10,
    marginY: 10,
    itemsPerRow: 2,
  })

  numbers.map(getCell)
  // [{ x: 10, y: 10}, {x: 20, y: 10}, {x: 10, y: 20}]
```

---

```js
tool.normalize(min, max)
``` 

Turn a number range into a `0 - 1` number range.

Returns a function to transform a number between `min` and `max`

[Normalize to other than 0-1](#normalize-to-other-than-0-1)

#### Example

```js
import * as tool from 'tiny-toolkit'

const min = 200
const max = 300

const getOpacity = tool.normalize(min, max)

getOpacity(250)
// 0.5
```

---

```js
tool.toRadians(angle)
``` 

Convert an angle from `degrees` to `radians`

---

## :computer: Install :computer:

`yarn add tiny-toolkit`

`npm install tiny-toolkit`

---

## :book: Recipes :book:

#### Normalize to other than 0-1

Multiply the output of `tool.normalize` with your intended `max`

Add to the output of `tool.normalize` with your intended `min`

##### Example with 5 - 15

```js
import * as tool from 'tiny-toolkit'

const min = 200
const max = 300

const getOpacity = tool.normalize(min, max)

5 + getOpacity(250) * 10
// 10
```
