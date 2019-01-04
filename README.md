# cool-static-cli(webpack4 + jquery + scss + pjax for multipage static websites)
* HTML (lodash template)
* Modern JavaScript
* Jquery + pjax for SEO
* SCSS
* PostCSS

<!-- ## Demo
> https://wzs28150.github.io/cool-static-cli/dist/ -->
## Start
> npm i cool-static-cli -g
## Init
> mkdir project && cd project
> cool-static-cli init
> npm i
## Development
> npm run dev
## Build
> npm run  build
### SVG Sprites
* Put svg files in src/img/svg
* In HTML, use `<svg><use xlink:href="#svg-file-name"></use></svg>`

## Dir
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

### 更新计划:

1.优化pjax + router
2.优化滚动条 使用nicescroll  https://github.com/inuyaksa/jquery.nicescroll
3.优化页面滚动动画 增加 aoc  https://github.com/michalsnik/aos
4.增加 Parallax  Scrolling http://pixelcog.github.io/parallax.js/
