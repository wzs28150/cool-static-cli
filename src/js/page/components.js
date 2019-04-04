/* jshint esversion: 6 */
/*!
 * Components 组件页模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */
import debug from '../components/debug/debug'; // 控制台调试
import fixed from '../components/fixed/fixed'; // 右侧导航 滚动固定位置
import Avatar from '../components/avatar/avatar'; // 头像类
import lighter from '../components/code-lighter/code-lighter'; // 高亮插件
import '../components/parallax/jquery.scrolly.js'; // 视差插件


export default class Components {
  constructor(setNavActive) {
    // 设置导航第几个选中
    setNavActive(2);
    // 控制台输出信息 方便调试页面是否加载
    debug('components controller is load');
    // 右侧导航 滚动固定
    fixed();
  }
  // 主方法
  index() {
    // 代码高亮
    this.gaoliang();
    // 头像方法
    this.avatarDemo();
    // swiper
    this.swiperDemo();
    // 视差
    this.parallaxDemo();
  }
  // 代码高亮
  gaoliang() {
    const option = {
      tabSpace: 0,
      style: 'light'
    };
    lighter.auto(option);
  }
  // 头像
  avatarDemo() {
    const avatar = new Avatar();
    avatar.index();
  }
  // swiper
  swiperDemo() {
    const swiper = new Swiper('.swiper-demo', {
      pagination: '.swiper-demo .swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-demo .swiper-button-next',
      prevButton: '.swiper-demo .swiper-button-prev',
      parallax: true,
      speed: 2000,
      autoplay: 2000
    });
  }
  // 视差
  parallaxDemo() {
    $('.parallax').scrolly({
      bgParallax: true
    });
  }
}
