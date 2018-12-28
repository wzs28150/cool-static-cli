/* jshint esversion: 6 */
import debug from '../components/debug/debug'
import Swiper from 'swiper';
const banner = () => {
  var bannerSwiper = new Swiper('.index .banner', {
    pagination: '.index .banner .swiper-pagination',
    loop: true,
    speed: 3000,
    // autoplay: 4000,
    parallax: true
  });
}
const init = (callback) => {
  callback(0);
  debug('index controller is load');
  banner();
};

const index = {
  init: init
};

export default index;
