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
import debug from '../components/debug/debug'; // 控制台调试
import fixed from '../components/fixed/fixed'; // 右侧导航 滚动固定位置
import lighter from '../components/code-lighter/code-lighter'; // 高亮插件

export default class Pages {
  constructor(setNavActive) {
    // 设置导航第几个选中
    setNavActive(3);
    // 控制台输出信息 方便调试页面是否加载
    debug('pages controller is load');
    // 右侧导航 滚动固定
    fixed();
  }
  // 主方法
  index() {
    // 调用高亮方法
    this.gaoliang();
  }
  // 代码高亮
  gaoliang() {
    const option = {
      tabSpace: 0,
      style: 'light'
    };
    lighter.auto(option);
  }
}
```
