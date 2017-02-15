# species-in-pieces

这个项目用于一种很有趣的展示方式，这里面的数据和内容我来源于[这个网站](http://species-in-pieces.com/)，我喜欢这类极富创意的展示方式。

## Develop

We use node.js to build our develop environment. Our code depend on following project:

* Node.js(NPM)
* React
* Webpack

Start develop environment with following step.

1. Install dependencies.
```shell
$ npm install
```

2. Build data (MacOS/Linux, If you use Windows, please see command in `utils/work.sh`)
```shell
$ ./utils/work.sh
```

3. Start webpack in develop environment
```shell
$ npm run dev
```

4. Visit in browser at `http://localhost:8080/`.

## Depoly

Deploy static files with following step.

1. Build static files.
```shell
$ npm run deploy
```

2. Find static files in `root/dist/`.

## Version

Version is built in this format: vx.y[.z]

x: API version changed, tech stack changed.  
y: New feature/api introduced, Code architecture changed.  
z: bug fixed, small feature/improvment.

## LICENSE

Copyright 2016 XU XIAOMENG(@sekaiamber)

Released under the MIT and GPL (version 2 or later) Licenses.
