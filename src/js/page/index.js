import debug from '../package/debug/debug'
import Swiper from 'swiper';
const videoCtrl = () => {
  $(".video_fm").click(function() {
    $(".video_fm").addClass('hide');
    $('video').trigger("play");
    $('video').removeClass('pause');
    $('video').addClass('play');
  });
  $("video").addClass('pause'); //for check pause or play add a class
  $('video').click(function() {
    if ($(this).hasClass('pause')) {

    } else {
      $("video").trigger("pause");
      $(this).removeClass('play');
      $(".video_fm").removeClass('hide');
      $(this).addClass('pause');
    }
  })
}
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
  videoCtrl();
  banner();
};

const index = {
  init: init
};

export default index;
