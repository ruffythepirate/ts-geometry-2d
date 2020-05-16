[2d-geometry](../README.md) › [Globals](../globals.md) › [Line](line.md)

# Class: Line

A line is represented by a point and a vector, it is of infinite length.

## Hierarchy

* **Line**

## Index

### Constructors

* [constructor](line.md#constructor)

### Properties

* [p](line.md#p)
* [v](line.md#v)

### Methods

* [project](line.md#project)
* [projectDistance](line.md#projectdistance)
* [projectDistanceSquare](line.md#projectdistancesquare)
* [projectFactor](line.md#projectfactor)

## Constructors

###  constructor

\+ **new Line**(`p`: [Point](point.md), `v`: [Vector](vector.md)): *[Line](line.md)*

*Defined in [Line.ts:7](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Point](point.md) |
`v` | [Vector](vector.md) |

**Returns:** *[Line](line.md)*

## Properties

###  p

• **p**: *[Point](point.md)*

*Defined in [Line.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L8)*

___

###  v

• **v**: *[Vector](vector.md)*

*Defined in [Line.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L8)*

## Methods

###  project

▸ **project**(`p2`: [Point](point.md)): *[Point](point.md)*

*Defined in [Line.ts:16](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L16)*

Finds what point on this line is closest to the input point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p2` | [Point](point.md) |  Point that we want to find closest point for.  |

**Returns:** *[Point](point.md)*

___

###  projectDistance

▸ **projectDistance**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:46](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L46)*

Gives the minimum distance from p2 to the line.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p2` | [Point](point.md) |  Point to get minimum distance for.  |

**Returns:** *number*

___

###  projectDistanceSquare

▸ **projectDistanceSquare**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:36](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L36)*

Gives the minimum distance squared from p2 to the line. This function exists because it doesn't require any Math.sqrt, and is hence a more efficient way if one want to compare distances between many points.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p2` | [Point](point.md) |  Point to get minimum distance for.  |

**Returns:** *number*

___

###  projectFactor

▸ **projectFactor**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:26](https://github.com/ruffythepirate/ts-geometry-2d/blob/ea6ac3b/src/Line.ts#L26)*

Returns what number you would have to multiply the lines vector with to reach the point returned by project when starting from the line's point.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p2` | [Point](point.md) |  Point whose projection we get the factor for.  |

**Returns:** *number*
