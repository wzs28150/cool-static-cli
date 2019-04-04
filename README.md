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
+-- config
|   +-- webpack.config.js
|   +-- postcss.config.js
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
+-- package.json

```

### 每页js类:

#### 例子:
```
// 调用当前页要用的插件
import debug from '../components/debug/debug'; // 控制台调试
// 定义类
export default class Pages {
  // 构造函数默认自动执行
  constructor(setNavActive) {
    // 设置导航第几个选中
    setNavActive(3);
    // 控制台输出信息 方便调试页面是否加载
    debug('pages controller is load');
  }
  // 主方法
  index() {
    // 调用方法
    this.fangfa();
  }
  // 定义方法
  fangfa() {
    console.log('我是方法');
  }
}
```
