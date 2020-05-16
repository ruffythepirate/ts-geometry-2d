[2d-geometry](../README.md) › [Globals](../globals.md) › [Point](point.md)

# Class: Point

## Hierarchy

* **Point**

## Index

### Constructors

* [constructor](point.md#constructor)

### Properties

* [x](point.md#x)
* [y](point.md#y)

### Methods

* [minus](point.md#minus)
* [plus](point.md#plus)

## Constructors

###  constructor

\+ **new Point**(`x`: number, `y`: number): *[Point](point.md)*

*Defined in [Point.ts:3](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Point.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

**Returns:** *[Point](point.md)*

## Properties

###  x

• **x**: *number*

*Defined in [Point.ts:4](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Point.ts#L4)*

___

###  y

• **y**: *number*

*Defined in [Point.ts:4](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Point.ts#L4)*

## Methods

###  minus

▸ **minus**(`p`: [Point](point.md)): *[Vector](vector.md)*

*Defined in [Point.ts:11](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Point.ts#L11)*

Returns the vector going from the inputted point p, to this point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | [Point](point.md) |   |

**Returns:** *[Vector](vector.md)*

___

###  plus

▸ **plus**(`v`: [Vector](vector.md)): *[Point](point.md)*

*Defined in [Point.ts:19](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Point.ts#L19)*

Returns the point reached when starting at this point and then moving according to vector.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`v` | [Vector](vector.md) |   |

**Returns:** *[Point](point.md)*
