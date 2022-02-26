# :wrench: Tiny Toolkit <!-- omit in toc -->

> A collection of useful tiny JavaScript functions

<div align="center">
  <img src="https://badgen.net/npm/v/tiny-toolkit?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/tiny-toolkit" />
  <img src="https://badgen.net/github/last-commit/sajmoni/tiny-toolkit?icon=github" />
</div>

## Index <!-- omit in toc -->

- [:sparkles: Features](#sparkles-features)
  - [:straight_ruler: Measure](#straight_ruler-measure)
    - [getAngle](#getangle)
    - [getDistance](#getdistance)
    - [getDirection](#getdirection)
    - [getDirectionFromAngle](#getdirectionfromangle)
    - [getBorderingPoints](#getborderingpoints)
  - [:heavy_division_sign::heavy_multiplication_x: Math](#heavy_division_signheavy_multiplication_x-math)
    - [normalizeRange](#normalizerange)
    - [toRadians](#toradians)
    - [toDegrees](#todegrees)
  - [:iphone: Layout](#iphone-layout)
    - [grid](#grid)
    - [line](#line)
  - [:star: Collisions](#star-collisions)
    - [isColliding](#iscolliding)
    - [getOverlappingArea](#getoverlappingarea)
  - [:star: Misc](#star-misc)
    - [treeToList](#treetolist)
    - [capitalize](#capitalize)
    - [getNextItem](#getnextitem)
    - [getPreviousItem](#getpreviousitem)
    - [times2d](#times2d)
    - [getSurroundingRectangle](#getsurroundingrectangle)
    - [treeToList](#treetolist-1)
    - [useIndex](#useindex)
    - [create2dArrayWithDistanceToCenter](#create2darraywithdistancetocenter)
- [:computer: Install](#computer-install)

## :sparkles: Features

### :straight_ruler: Measure

#### getAngle

```ts
getAngle(origin: Point, target: Point) => number
```

Get the angle (in radians) between two points

---

#### getDistance

```ts
getDistance(origin: Point, target: Point) => number
```

Get the distance between two points

---

#### getDirection

```ts
getDirection(origin: Point, target: Point) => Vector
```

Get the direction vector from one point to another

---

#### getDirectionFromAngle

```ts
getDirectionFromAngle(angle: number) => Vector
```

Get the direction vector from an angle (in radians)

---

#### getBorderingPoints

```ts
getBorderingPoints(point: Point) => Point[]
```

The numbers below represent the indexes of points in the array

```
[4][0][5]

[3][x][1]

[7][2][6]
```

---

### :heavy_division_sign::heavy_multiplication_x: Math

#### normalizeRange

```ts
normalizeRange(minimum: number, maximum: number) => (value: number) => number
```

Turn a number range into a `0 - 1` number range.

Returns a function to transform a number between `minimum` and `maximum`

#### Example <!-- omit in toc -->

```ts
const min = 200
const max = 300

const getOpacity = normalizeRange(min, max)

getOpacity(250)
// 0.5
```

#### Normalize to other than 0-1 <!-- omit in toc -->

Multiply the output of `normalizeRange` with `intended max - min`

Add to the output of `normalizeRange` with `intended min`

##### Example with 5 - 15 <!-- omit in toc -->

```ts
import * as tool from 'tiny-toolkit'

const min = 200
const max = 300

const getOpacity = normalize(min, max)

5 + getOpacity(250) * 10
// 10
```

---

#### toRadians

```ts
toRadians(angle)
```

Convert an angle from `degrees` to `radians`

---

#### toDegrees

```ts
toDegrees(angle)
```

Convert an angle from `radians` to `degrees`

---

### :iphone: Layout

#### grid

```ts
grid(options)
```

Generate a function to position objects on a grid.

Returns a function to get coordinates. Signature: `(index: number) => { x, y }`

#### Options <!-- omit in toc -->

| Option       | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| **x**        | The `x` coordinate of the top left corner                                             |
| **y**        | The `y` coordinate of the top left corner                                             |
| **marginX**  | The space between each cell on the `x` axis                                           |
| **marginY**  | The space between each cell on the `y` axis                                           |
| **breakAt**  | The amount of cells on a `row` (`column` if `vertical` is `true`) before a line break |
| **vertical** | If the grid should be layed out vertically instead (Default `false`)                  |

#### Example <!-- omit in toc -->

```ts
import * as tool from 'tiny-toolkit'

const numbers = [1, 2, 3]

const getCell = grid({
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

#### line

```ts
line(options)
```

Generate a function to position objects on a line.

Returns a function to get a coordinate. Signature: `(index: number) => number`

#### Options <!-- omit in toc -->

| Option     | Description                      |
| ---------- | -------------------------------- |
| **start**  | The position of the first object |
| **margin** | The space between each object    |

#### Example <!-- omit in toc -->

```ts
import * as tool from 'tiny-toolkit'

const numbers = [1, 2, 3]

const getX = line({
  start: 10,
  margin: 20,
})

numbers.map(getX)
// [10, 30, 50]
```

---

### :star: Collisions

#### isColliding

```ts
isColliding(rectangle1, rectangle2)
```

Check if two rectangles are colliding.

---

#### getOverlappingArea

```ts
getOverlappingArea(rectangle1, rectangle2)
```

Check how much two rectangles are overlapping

---

### :star: Misc

#### treeToList

```ts
treeToList(rootNode: Node, childrenField?: string = 'children') => Node[]
```

Convert a tree structure into a flat list

#### Example <!-- omit in toc -->

```ts

```

---

#### capitalize

```ts
capitalize(text: string)
```

Make the first letter in a string uppercase.

#### Example <!-- omit in toc -->

```ts

```

---

#### getNextItem

```ts
getNextItem(currentItem, list)
```

Get the next item in a list. Loops back to the first item after the last one.

#### Example <!-- omit in toc -->

```ts

```

---

#### getPreviousItem

```ts
getPreviousItem(currentItem, list)
```

Get the previous item in a list. Loops back to the last item after the first one.

#### Example <!-- omit in toc -->

```ts

```

---

#### times2d

```ts
times2d(xTimes: number, yTimes: number, callback: (x: number, y: number, index: number) => T) => T[]
```

> Two dimensional loop. Like lodash `times` but 2d.

---

#### getSurroundingRectangle

```ts
getSurroundingRectangle(point: Point, width: number, height: number) => Rectangle
```

> Get the rectangle surrounding a point

---

#### treeToList

#### useIndex

#### create2dArrayWithDistanceToCenter

---

## :computer: Install

**yarn**

`yarn add tiny-toolkit`

**npm**

`npm install tiny-toolkit`
