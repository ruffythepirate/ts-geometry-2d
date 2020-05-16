[2d-geometry](../README.md) › [Globals](../globals.md) › ["Line"](../modules/_line_.md) › [Line](_line_.line.md)

# Class: Line

## Hierarchy

* **Line**

## Index

### Constructors

* [constructor](_line_.line.md#constructor)

### Properties

* [p](_line_.line.md#p)
* [v](_line_.line.md#v)

### Methods

* [project](_line_.line.md#project)
* [projectDistance](_line_.line.md#projectdistance)
* [projectDistanceSquare](_line_.line.md#projectdistancesquare)
* [projectFactor](_line_.line.md#projectfactor)

## Constructors

###  constructor

\+ **new Line**(`p`: [Point](_point_.point.md), `v`: [Vector](_vector_.vector.md)): *[Line](_line_.line.md)*

*Defined in [Line.ts:4](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Point](_point_.point.md) |
`v` | [Vector](_vector_.vector.md) |

**Returns:** *[Line](_line_.line.md)*

## Properties

###  p

• **p**: *[Point](_point_.point.md)*

*Defined in [Line.ts:5](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L5)*

___

###  v

• **v**: *[Vector](_vector_.vector.md)*

*Defined in [Line.ts:5](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L5)*

## Methods

###  project

▸ **project**(`p2`: [Point](_point_.point.md)): *[Point](_point_.point.md)*

*Defined in [Line.ts:8](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](_point_.point.md) |

**Returns:** *[Point](_point_.point.md)*

___

###  projectDistance

▸ **projectDistance**(`p2`: [Point](_point_.point.md)): *number*

*Defined in [Line.ts:23](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](_point_.point.md) |

**Returns:** *number*

___

###  projectDistanceSquare

▸ **projectDistanceSquare**(`p2`: [Point](_point_.point.md)): *number*

*Defined in [Line.ts:18](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](_point_.point.md) |

**Returns:** *number*

___

###  projectFactor

▸ **projectFactor**(`p2`: [Point](_point_.point.md)): *number*

*Defined in [Line.ts:13](https://github.com/ruffythepirate/ts-geometry-2d/blob/217fd37/src/Line.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`p2` | [Point](_point_.point.md) |

**Returns:** *number*
