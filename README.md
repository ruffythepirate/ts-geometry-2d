![Node.js CI](https://github.com/ruffythepirate/ts-geometry-2d/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/ruffythepirate/ts-geometry-2d/branch/master/graph/badge.svg)](https://codecov.io/gh/ruffythepirate/ts-geometry-2d)


# 2D Geometry

This repository contains basic classes to perform Geometry operations in 2 dimensions.

It is not an optimized repository, but rather aims at containing most operations necessary to assist with layouting logic.

It can be used by anyone that want to add simple geometry operations to a `typescript` or `javascript` project.

There are many other geometry repositories already, why create another one? Because I couldn't find any repository that contained the operations on polygons that I needed to perform layouting when visualizing graphs.

## Features

* The library contains some basic 2d geometry concepts:
  - Point
  - Vector
  - Line
  - LineSegment
  - Polygon
* Transformations of the given shapes can be performed by using the `Transformation` class. This uses matrices to transform coordinates. 
* The classes are immutable which fits working with Functional Programming.
* Focus on easy accessibility. The library tries to use simple functions to make writing code using the library fast.


For full information, please refer to the [API documentation](https://ruffythepirate.github.io/ts-geometry-2d/globals.html) to see available classes and their functions.

## Details

The library assumes a coordinate system where positive `x` goes to the right, and positive `y` goes upwards. Most often one doesn't need to consider this, but for example with rotation or the cross product of vectors this is good to know.

## Requirements

* Node and npm
* To build or develop you will benefit from having `npx` https://github.com/npm/npx. This allows invoking of the other global npm requirements in the repository (Typescript, Jest) without having to install them.

## Pages

* [NPM](https://www.npmjs.com/package/ts-2d-geometry)
* [Github](https://github.com/ruffythepirate/ts-geometry-2d)

## Usage

You can install the package using. NOTE: The github name and the npm install names are different.

```bash
npm i -S ts-2d-geometry
```

All main classes are exported from `index.js`

## Contributing

Contributions, if they are in line with expanding functionality that can help with layout logic are welcome. Requirements for pull requests are:
* All code is tested
* Naming is consistent with project naming
* Commits are squashed and contain a clear commit message describing what functionality is added.

## License

[MIT](./LICENSE)
