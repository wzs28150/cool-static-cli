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
import NProgress from 'nprogress';
import AOS from 'aos';


const niceScroll = require('./nicescroll/jquery.nicescroll.js');
// 不使用滚动条时开启
// import SmoothScroll from 'smoothscroll-for-websites';
/**
 * 判断dom是否存在
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */
const exists = selector => ($(selector).length > 0);


/**
 * [回到顶部]
 * @return {[type]} [description]
 */
const backtotop = () => {
  $('#backtotop').on('click', () => {
    $('html,html').animate({
      scrollTop: '0' + 'px'
    }, 500);
    return false;
  });
};
/**
 * 设置最小高度
 * @return {[type]} [description]
 */
const minHeight = () => {
  const hh = $('header').height();
  const fh = $('footer').height();
  const wh = $(window).height();
  const nh = $('nav').height();
  let mh;
  if (nh > wh) {
    mh = nh - fh - hh;
  } else {
    mh = $(window).height() - fh - hh;
  }
  $('article').css('min-height', `${mh}px`);
};

/**
 * 设置导航选中状态
 */
const navActive = (i) => {
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

const no_refresh = (main, callback) => {
  let url = '';
  let target = null;
  let container = main;
  let fragment = main;
  let scrollTo = 0;
  $(document).off('click', 'a[data-nopjax!=no]').on('click', 'a[data-nopjax!=no]', function (event) {
    event.preventDefault();

    url = $(this).attr('href');
    target = $(this).data('target');
    if ($(this).data('main')) {
      container = $(this).data('main');
      fragment = $(this).data('main');
    }

    if (!container) {
      container = 'main';
    }
    if (target) {

      if (exists('.page-animate')) {
        $('.page-animate').addClass('page-animate-pause');
      }
      if (url == window.location.pathname) {
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
      if (exists('.page-animate')) {
        $('.page-animate').removeClass('page-animate-pause');
      }
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
    if (exists('.page-animate')) {
      $('.page-animate').removeClass('page-animate-end').addClass('page-animate-start');
    }
  });

  $(document).off('pjax:end').on('ready pjax:end', (data, options) => {
    // $('.page-animate').removeClass('page-animate-start').addClass('page-animate-end');
    const target = $(data.target).children();
    const controller = target.data('controller');
    const action = target.data('action');
    if (controller) {
      if (action) {
        callback(controller, action);
      } else {
        callback(controller, 'init');
      }
    } else {
      callback();
    }
    if (exists('.page-animate')) {
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
      $('#navshow').removeAttr("checked");
    }
    $('html').getNiceScroll(0).doScrollTop(scrollTo);
    setTimeout(() => {
      $('html').getNiceScroll(0).resize();
    }, 1000);
    // 页面加载进度条结束
    NProgress.done();
  });

};
/**
 * 路由加载对应 控制器及方法
 * controller 控制器
 * action     方法     默认init  string
 * state      判断是否为无刷新加载  bool
 */
const router = (controller, action, state) => {
  if (controller) {
    if (controller && localStorage.controller && localStorage.controller == controller && state) {

    } else {
      const controllerjs = require(`../page/${controller}`);
      const str = `controllerjs.default.${action}(function(a){navActive(a);})`;
      eval(str);
      localStorage.controller = controller;
    }
  }
};



const init = () => {
  console.log('%c meUi by wzs %c QQ:1003418012 %c github: %c https://github.com/wzs28150/cool-static-cli ', 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #35495e; padding:5px 0;', 'color: #fff; background:#41b883; padding:5px 0;', 'color: #fff; background: #fff; border:1px solid #35495e; padding:4px 0;');
  debug('页面监测开始:');
  $(() => {
    // 不使用滚动条时开启
    // SmoothScroll({
    //   // stepSize: 50
    // })
    // 绑定滚动条到 main
    $('html').niceScroll({
      cursorcolor: '#065fe3',
      zindex: 10
    });
    $('html').getNiceScroll(0).resize();
    $('html').getNiceScroll(0).doScrollTop(0);
    AOS.init();
    if (exists('.page-animate')) {
      setTimeout(() => {
        $('.page-animate').removeClass('page-animate-start').addClass('page-animate-end');
      }, 1000);
    }
    router($('main').children().data('controller'), $('main').children().data('action') ? $('main').children().data('action') : 'init', false);

    no_refresh('main', (controller, action) => {
      router(controller, action, true);
      AOS.refresh();
      AOS.init();


    });
  });
};

const main = {
  init
};

export default main;
