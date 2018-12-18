/* jshint esversion: 6 */
import debug from '../package/debug/debug'
import Swiper from 'swiper';
const banner = () => {
  var bannerSwiper = new Swiper('.i_ban.swiper-container', {
    pagination: {
      el: '.i_ban .swiper-pagination',
    },
    loop: true,
    speed: 2000,
    autoplay: true
  });
}
const init = (callback) => {
  callback(0);
  debug('index is load');
  banner();
};

const index = {
  init: init
};

export default index;
