/* jshint esversion: 6 */
/*!
 * meUi cool-static-cli JavaScript Library v1.0.6
 *
 * Copyright wzs
 * Released under the MIT license
 * https://github.com/wzs28150/cool-static-cli
 *
 * Date: 2018-05-20T17:23Z
 */

import debug from './debug/debug';
import 'jquery-pjax/jquery.pjax.js';
import './rightmenu/rightmenu.js';
import NProgress from 'nprogress';
import AOS from 'aos';

export default class Cool {
  constructor() {
    // 调用版权
    this.copyright();
    // 设置右键菜单 防止被查看源代码 (防君子难防小人)
    this.rightMenu();
    // 设置滚动条
    this.scroller();
    // 滚动动画调用
    AOS.init();
    // 页面加载动画
    this.pageAnimate();
    // 加载当前路由
    this.router($('main').children().data('controller'), $('main').children().data('action') ? $('main').children().data('action') : 'index', false);
    // 无刷新设置
    this.no_refresh('main', (controller, action) => {
      // 新页面路由
      this.router(controller, action, true);
      // 滚动动画初始化
      AOS.refresh();
      // 滚动动画调用
      AOS.init();
    });
  }
  // 版权
  copyright() {
    console.log('%c meUi by wzs %c QQ:1003418012 %c github: %c https://github.com/wzs28150/cool-static-cli ', 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #35495e; padding:5px 0;', 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #fff; border:1px solid #35495e; padding:4px 0;');
    debug('页面监测开始:');
  }
  // 右键菜单
  rightMenu() {
    var rcm = window.RMenu;
    rcm.init({
      area: 'body',
      items: {
        "home": {
          name: "返回首页",
          icon: 'home'
        },
        "refresh": {
          name: "刷新页面",
          icon: 'refresh'
        },
        "back": {
          name: "返回前面",
          icon: 'undo'
        },
        "zhichi": {
          name: "技术支持",
          icon: 'copyright'
        },
      },
      callback: function (res) {
        if (res.data == 'refresh') {
          window.location.reload();
        } else if (res.data == 'back') {
          // console.log(document.referrer);
          $.pjax({
            url: document.referrer,
            container: "main",
            fragment: "main",
            timeout: 8000,
            scrollTo: false
          });
          // window.history.back()
        } else if (res.data == 'home') {
          // console.log(document.referrer);
          $.pjax({
            url: './',
            container: "main",
            fragment: "main",
            timeout: 8000,
            scrollTo: false
          });
          // window.history.back()
        } else if (res.data == 'zhichi') {
          // console.log(document.referrer);
          window.open('http://www.hrbkcwl.com')
          // window.history.back()
        }
      }
    })

    // document.oncontextmenu = function () {
    //   return false;
    // };
  }
  // 滚动条
  scroller() {
    $('html').niceScroll({
      cursorcolor: '#065fe3',
      zindex: 10
    });
    $('html').getNiceScroll(0).resize();
    $('html').getNiceScroll(0).doScrollTop(0);
  }
  // 判断dom元素是否存在
  exists(selector) {
    return $(selector).length > 0;
  }
  // 页面加载动画
  pageAnimate() {
    if (this.exists('.page-animate')) {
      setTimeout(() => {
        $('.page-animate').removeClass('page-animate-start').addClass('page-animate-end');
      }, 1000);
    }
  }
  // 设置导航选中状态
  navActive(i) {
    $('nav a').removeClass('on');
    $('nav a').eq(i).addClass('on');
  }
  /**
   * 无刷新控制开始
   *  a 标签 设置 :
   *  data-main   string  default  main  控制页面替换区域
   *  data-target string                 控制页面滚动到指定元素
   *  data-istop  bool    default  true  控制点击后页面是否滚动到顶部
   */
  no_refresh(main, callback) {
    let url = '';
    let target = null;
    let container = main;
    let fragment = main;
    let scrollTo = 0;
    let jump = 'yes';
    const that = this;
    $(document).off('click', 'a[data-nopjax!=no]').on('click', 'a[data-nopjax!=no]', function (event) {
      const href = window.location.href;
      event.preventDefault();
      url = $(this).attr('href');
      target = $(this).data('target');
      jump = $(this).data('jump');
      if ($(this).data('main')) {
        container = $(this).data('main');
        fragment = $(this).data('main');
      }

      if (!container) {
        container = 'main';
      }

      if (target) {
        if (that.exists('.page-animate')) {
          $('.page-animate').addClass('page-animate-pause');
        }
        if (jump == 'no') {
          const scroll_offset = $(target).offset();
          scrollTo = scroll_offset.top - $('header').height();
          setTimeout(() => {
            $('html').getNiceScroll(0).resize();
          }, 1000);
          $('html').getNiceScroll(0).doScrollTop(scrollTo);
        } else {
          $.pjax({
            url,
            container,
            fragment,
            timeout: 8000,
            scrollTo: false
          });
        }
      } else {
        $.pjax({
          url,
          container,
          fragment,
          timeout: 8000,
          scrollTo: false
        });
      }

    });

    $(document).off('pjax:start').on('pjax:start', (xhr, options) => {
      //  页面进度条开始
      NProgress.start();
      // 页面动画
      if (that.exists('.page-animate')) {
        $('.page-animate').removeClass('page-animate-end').addClass('page-animate-start');
      }
    });

    $(document).off('pjax:end').on('ready pjax:end', (data, options) => {
      const target = $(data.target).children();
      const controller = target.data('controller');
      const action = target.data('action');
      if (controller) {
        if (action) {
          callback(controller, action);
        } else {
          callback(controller, 'index');
        }
      } else {
        callback();
      }
      if (that.exists('.page-animate')) {
        setTimeout(() => {
          $('.page-animate').removeClass('page-animate-start').addClass('page-animate-end');
        }, 1000);
      }
    });

    $(document).off('pjax:complete').on('pjax:complete', () => {
      if (target) {
        const scroll_offset = $(target).offset();
        scrollTo = scroll_offset.top - $('header').height();
      } else {
        scrollTo = 0;
      }

      if ($('#navshow').is(':checked')) {
        $('#navshow').removeAttr('checked');
      }
      $('html').getNiceScroll(0).doScrollTop(scrollTo);
      setTimeout(() => {
        $('html').getNiceScroll(0).resize();
      }, 1000);
      // 页面加载进度条结束
      NProgress.done();
    });
  }

  /**
   * 路由加载对应 控制器及方法
   * controller 控制器
   * action     方法     默认init  string
   * state      判断是否为无刷新加载  bool
   */
  router(controller, action, state) {
    if (controller) {
      const controllerjs = require(`../page/${controller}`);
      const index = new controllerjs.default((a) => {
        this.navActive(a);
      });
      const str1 = `index.${action}();`;
      eval(str1);
      localStorage.controller = controller;
    }
  }
}
