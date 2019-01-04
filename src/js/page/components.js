/* jshint esversion: 6 */
import debug from '../components/debug/debug';
import Headroom from 'headroom';
import lighter from '../components/code-lighter/code-lighter';
import '../components/parallax/jquery.scrolly.js';

// import parallax from '../components/parallax/parallax.min.js';
// import paroller from '../components/parallax/paroller.js';
// import Parlx from 'parlx.js';
// 右侧导航 滚动定位
const fixed = () => {
  var myElement = document.querySelector(".page-right");
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement, {
    "tolerance": 5,
    "offset": $('.page-right ul').offset().top,
    "classes": {
      initial: "",
      // when scrolling up
      pinned: "",
      // when scrolling down
      unpinned: "",
      // when above offset
      top: "",
      // when below offset
      notTop: "fixed",
      // when at bottom of scoll area
      bottom: "fixed",
      // when not at bottom of scroll area
      notBottom: ""
    }
  });
  // initialise
  headroom.init();
};
const init = (callback) => {
  callback(2);
  debug('components controller is load');
  fixed();
  // 代码高亮
  var option = {
    tabSpace: 0,
    style: 'light'
  };
  lighter.auto(option);

  $('.parallax').scrolly({
    bgParallax: true
  });

  // 视差背景
  // $('.parallax-window').parallax({zIndex:2});
  // $('.parallax-window').paroller();

};

const start = {
  init: init
};

export default start;
