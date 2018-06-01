import debug from '../package/debug/debug'
import Swiper from 'swiper';

const init = (callback) => {
  callback(1);
  debug('index2 is load');

};

const index2 = {
  init: init
};

export default index2;
