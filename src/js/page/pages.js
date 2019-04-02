import debug from '../components/debug/debug'
import Headroom from 'headroom';
import lighter from '../components/code-lighter/code-lighter'

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
}
const init = (callback) => {
  callback(3);
  debug('pages controller is load');
  fixed()

  var option = {
    tabSpace: 0,
    style: 'light'
  }
  lighter.auto(option);
};

const pages = {
  init: init
};

export default pages;
