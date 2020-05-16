[2d-geometry](../README.md) › [Globals](../globals.md) › [LineSegment](linesegment.md)

# Class: LineSegment

A LineSegment is defined by two points, it represents the line between these points.

## Hierarchy

* **LineSegment**

## Index

### Constructors

* [constructor](linesegment.md#constructor)

### Properties

* [p1](linesegment.md#p1)
* [p2](linesegment.md#p2)

### Methods

* [closestPoint](linesegment.md#closestpoint)

## Constructors

###  constructor

\+ **new LineSegment**(`p1`: [Point](point.md), `p2`: [Point](point.md)): *[LineSegment](linesegment.md)*

*Defined in [LineSegment.ts:7](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/LineSegment.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`p1` | [Point](point.md) |
`p2` | [Point](point.md) |

**Returns:** *[LineSegment](linesegment.md)*

## Properties

###  p1

• **p1**: *[Point](point.md)*

*Defined in [LineSegment.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/LineSegment.ts#L8)*

___

###  p2

• **p2**: *[Point](point.md)*

*Defined in [LineSegment.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/LineSegment.ts#L8)*

## Methods

###  closestPoint

▸ **closestPoint**(`p2`: [Point](point.md)): *[Point](point.md)‹›*

*Defined in [LineSegment.ts:16](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/LineSegment.ts#L16)*

Gets the closest point on the line segment to the given point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p2` | [Point](point.md) |  Point to get closest point for.  |

**Returns:** *[Point](point.md)‹›*
