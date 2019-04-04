/* jshint esversion: 6 */
/*!
 * Pages 页面页模块  v0.0.1
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 * Date: 2019-04-4
 */
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
