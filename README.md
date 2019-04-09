# cool-static-cli(webpack4 + jquery + scss + pjax for multipage static websites)
* HTML (lodash template)
* Modern JavaScript
* Jquery + pjax for SEO
* SCSS
* PostCSS

<!-- ## Demo
> https://wzs28150.github.io/cool-static-cli/dist/ -->
## 安装包
```
npm i(或cnpm i)
```
## 运行开发
```
npm run dev
```
## 运行打包
```
npm run build
```

## 目录结构
```
.
+-- config (项目配置目录)
|   +-- webpack.config.js
|   +-- postcss.config.js
|
+-- dist (打包后发布的所有资源)
|
+-- src (开发目录)
|   +-- favicon (地址栏图标)
|   +-- fonts (网页用到的字体)
|   +-- html (网页html)
|   |   +-- include (包含引用的html碎片)
|   |   |   +-- header.html
|   |   |   +-- footer.html
|   |   +-- views (包含每个页的html)
|   |   |   +-- index.html
|   +-- img (图片文件夹)
|   +-- js (js文件夹)
|   |   +-- components (组件文件夹)
|   |   |   +-- art (模板组件)
|   |   |   +-- avatar (头像组件)
|   |   |   +-- code-lighter (代码高亮组件)
|   |   |   +-- debug (控制台调试组件)
|   |   |   +-- fixed (侧边导航滚动定位组件)
|   |   |   +-- lazeload (懒加载组件)
|   |   |   +-- map (百度地图组件)
|   |   |   +-- parallax (滚动视差组件)
|   |   |   +-- photoswiper (图片放大组件)
|   |   |   +-- promise (promise封装ajax组件)
|   |   |   +-- cool.js (主程序文件,处理无刷新路由,滚动条等)
|   |   +-- lib (不需要打包的大文件第三方库文件夹,如swiper,jquery等)
|   |   +-- page (包含每个页js)
|   |   |   +-- index.js (首页js)
|   |   +-- index.js (入口主文件)
|
|   +-- media (多媒体文件夹,存放视频音乐)
|
|   +-- scss (scss文件夹)
|   |   +-- common (公共组件样式件夹,头部底部)
|   |   +-- components (组件文样式件夹)
|   |   +-- include (一些基础样式文件夹)
|   |   |   +-- color.scss (设置颜色)
|   |   |   +-- fonts.scss (设置字体)
|   |   |   +-- mixins.scss (一些scss函数)
|   |   |   +-- ui.scss (ui样式)
|   |   |   +-- vars.scss (一些scss变量)
|   |   +-- lib (一些不需要打包的公共样式,包括core里的所有)
|   |   +-- core (核心样式已经打包到lib里)
|   |   +-- page (存放每个页样式)
|   |   +-- style.scss (入口样式)
|
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
#### 容器  (宽度默认 大于等于1440px为1200px  1200px到1440px为1100px 手机为 宽度 100% 两部 15px 边距)
```
  container                  : 默认容器 (带居中,溢出隐藏,相对定位)
  container-without-overflow ：容器     (带居中,相对定位)
  container-without-position ：容器     (带居中,溢出隐藏)
  container-without-all      : 容器     (带居中)
```
#### 响应式 (详细样式查看 http://flexboxgrid.com/ 官网)
```
row             : 外层样式
col-xs-12       : 12等分 (根据屏幕尺寸判断 分为xs sm md lg 如果写数值 则按照数值分 如果不写数值 则自动分配)
col-xs-offset-3 : 前面空3等分开始
pc              : 电脑端显示 手机端隐藏
wap             : 电脑端隐藏 手机端显示
```
#### 分页 pagination
```
html结构:
<div class="pagination">
  <ul>
    <a href="">上一页</a>
    <a class="on" href="">1</a>
    <a href="">2</a>
    <a href="">3</a>
    <a href="">4</a>
    <a href="">下一页</a>
  </ul>
</div>
```
#### 上下页 page_up_down
```
html结构:
<div class="page_up_down">
<a href="">上一篇:标题标题标题标题标题标题标题标题标题标题</a>
<a href="">下一篇:标题标题标题标题标题标题标题标题标题标题</a>
</div>
```
