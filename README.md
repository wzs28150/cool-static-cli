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

### 样式class 总结:
#### 文字:
```
  text-hidden : 文字溢出隐藏
  text-center : 文字居中
  text-left   : 文字居左
  text-right  : 文字居右
  font12      : 12号字 (同理包括 14,16,18,20,24,26)
```  
#### 间距,边距,边框,圆角
```
  m_5    : 四周 maigin 为 5 (数值包括 5 10 15 20 ..... 100)
  p_5    : 四周 padding为 5 (数值包括 5 10 15 20 ..... 100)

  m_T5   : 顶部 maigin 为 5 (数值包括 5 10 15 20 ..... 100)
  m_B5   : 底部 maigin 为 5 (数值包括 5 10 15 20 ..... 100)
  m_L5   : 左侧 maigin 为 5 (数值包括 5 10 15 20 ..... 100)
  m_R5   : 右侧 maigin 为 5 (数值包括 5 10 15 20 ..... 100)

  p_T5   : 顶部 padding为 5 (数值包括 5 10 15 20 ..... 100)
  p_B5   : 底部 padding为 5 (数值包括 5 10 15 20 ..... 100)
  p_L5   : 左侧 padding为 5 (数值包括 5 10 15 20 ..... 100)
  p_R5   : 右侧 padding为 5 (数值包括 5 10 15 20 ..... 100)

  mn     : margin: 0;
  mTn    : margin-top: 0;
  mBn    : margin-bottom: 0;
  mLn    : margin-left: 0;
  mRn    : margin-right: 0;

  pn     : padding: 0;
  pTn    : padding-top: 0;
  pBn    : padding-bottom: 0;
  pLn    : padding-left: 0;
  pRn    : padding-right: 0;

  br_1   : 圆角为1 (数值包括1 ~ 5)
  br_50  : 胶囊圆角
  br_100 : 圆形
```
#### 居中
```
  wh-center : 水平垂直居中(写在父级)
  h-center  : 垂直居中(写在父级)
```
#### 浮动
```
  fl       : 浮动居左
  fr       : 浮动居右
  clearfix : 清除浮动(写在浮动元素外层div)
```
#### 容器
##### 宽度默认 大于等于1440px为1200px  1200px到1440px为1100px 手机为 宽度 100% 两部 15px 边距
```
  container        : 默认容器(带居中,溢出隐藏,相对定位)
```
