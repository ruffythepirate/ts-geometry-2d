[2d-geometry](../README.md) › [Globals](../globals.md) › [Line](line.md)

# Class: Line

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

*Defined in [Line.ts:4](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Point](point.md) |
`v` | [Vector](vector.md) |

**Returns:** *[Line](line.md)*

## Properties

###  p

• **p**: *[Point](point.md)*

*Defined in [Line.ts:5](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L5)*

___

###  v

• **v**: *[Vector](vector.md)*

*Defined in [Line.ts:5](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L5)*

## Methods

###  project

▸ **project**(`p2`: [Point](point.md)): *[Point](point.md)*

*Defined in [Line.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](point.md) |

**Returns:** *[Point](point.md)*

___

###  projectDistance

▸ **projectDistance**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:23](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](point.md) |

**Returns:** *number*

___

###  projectDistanceSquare

▸ **projectDistanceSquare**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:18](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](point.md) |

**Returns:** *number*

___

###  projectFactor

▸ **projectFactor**(`p2`: [Point](point.md)): *number*

*Defined in [Line.ts:13](https://github.com/ruffythepirate/ts-geometry-2d/blob/73fa52f/src/Line.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](point.md) |

**Returns:** *number*
