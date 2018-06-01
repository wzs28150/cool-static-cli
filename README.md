# cool-static-cli(Webpack 4 for multipage static websites)
* HTML (lodash template)
* Modern JavaScript
* Jquery + pjax for SEO
* SCSS
* PostCSS

## Demo
> https://wzs28150.github.io/cool-static-cli/dist/
## Installation
> npm i
## Development
> npm run dev
## Build
> npm run  build
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
|   |   +-- include
|   |   |   +-- header.html
|   |   |   +-- footer.html
|   |   +-- views
|   |   |   +-- index.html
|   +-- img
|   +-- js
|   |   +-- package
|   |   +-- page
|   |   +-- index.js
|   |   +-- main.js
|   +-- media
|   +-- scss
+-- webpack.config.js
+-- postcss.config.js
+-- package.json

```
