[2d-geometry](README.md) › [Globals](globals.md)

# 2d-geometry

# 2D Geometry

This repository contains basic classes to perform Geometry operations in 2 dimensions.

It is not an optimized repository, but rather aims at containing most operations necessary to assist with layouting logic.

It can be used by anyone that want to add simple geometry operations to a `typescript` or `javascript` project.

There are many other geometry repositories already, why create another one? Because I couldn't find any repository that contained the operations on polygons that I needed to perform layouting when visualizing graphs.

## Requirements

* To build or develop you need `npx` https://github.com/npm/npx. This allows invoking of the other global npm requirements in the repository (Typescript, Jest) without having to install them.

## Usage

The project is not yet published as a npm package, but this is the aim. When this happens, you just install it using 
```bash
npm i -S <name>
```

For now you would have to clone the repository locally and either use the `.ts` files if you are developing in typscript, or build the project using `npm run build` and then use the input from `/dist` folder in your `javascript` project.

For commands to `test`, `lint`, `compile` etc. please refer to the `scripts` section in the `package.json` file.

## Contributing

Contributions, if they are in line with expanding functionality that can help with layout logic are welcome. Requirements for pull requests are:
* All code is tested
* Naming is consistent with project naming
* Commits are squashed and contain a clear commit message describing what functionality is added.

## License

[MIT](./LICENSE)
