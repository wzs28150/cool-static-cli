# cool-static-cli(Webpack 4 for multipage static websites)
* HTML (lodash template)
* Modern JavaScript
* SCSS
* PostCSS

## Installation
> npm i
## Development
> npm run dev

## Build
> npm run  build

##
### SVG Sprites
* Put svg files in src/img/svg
* In HTML, use `<svg><use xlink:href="#svg-file-name"></use></svg>`

##Dir
```
.
+-- dist(Publish directory)
|
+-- src(Development Directory)
|   +-- favicon
|   +-- fonts
|   +-- html
|   +-- img
|   +-- js
|   +-- media
|   +-- scss
+-- webpack.config.js
+-- postcss.config.js
+-- package.json

```
