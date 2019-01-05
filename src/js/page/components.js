/* jshint esversion: 6 */
import debug from '../components/debug/debug';
import Headroom from 'headroom';
import lighter from '../components/code-lighter/code-lighter';
import '../components/parallax/jquery.scrolly.js';
import Swiper from 'swiper';
import Cropper from 'cropperjs';
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
const avatar = () => {
  var avatar = document.getElementById('avatar');
  var image = document.getElementById('image');
  var input = document.getElementById('input');
  var $progress = $('.progress');
  var $progressBar = $('.progress-bar');
  var $alert = $('.alert');
  var $modal = $('#modal');
  var $close = $modal.find('.close');
  var cropper;
  input.addEventListener('change', function(e) {
    var files = e.target.files;
    var done = function(url) {
      input.value = '';
      image.src = url;
      $alert.hide();
      $modal.fadeIn('slow', function() {
        cropper = new Cropper(image, {
          aspectRatio: 1,
          viewMode: 3,
        });
      });
    };
    var reader;
    var file;
    var url;

    if (files && files.length > 0) {
      file = files[0];

      if (URL) {
        done(URL.createObjectURL(file));
      } else if (FileReader) {
        reader = new FileReader();
        reader.onload = function(e) {
          done(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  $close.off('click').on('click',function () {
    $modal.fadeOut('show', function() {
      cropper.destroy();
      cropper = null;
    });
  });

  document.getElementById('crop').addEventListener('click', function() {
    var initialAvatarURL;
    var canvas;

    $modal.fadeOut('show', function() {
      cropper.destroy();
      cropper = null;
    });

    if (cropper) {
      canvas = cropper.getCroppedCanvas({
        width: 160,
        height: 160,
      });
      initialAvatarURL = avatar.src;
      avatar.src = canvas.toDataURL();
      $progress.show();
      $alert.removeClass('alert-success alert-warning');
      canvas.toBlob(function(blob) {
        var formData = new FormData();

        formData.append('avatar', blob, 'avatar.jpg');
        $.ajax('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          data: formData,
          processData: false,
          contentType: false,

          xhr: function() {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function(e) {
              var percent = '0';
              var percentage = '0%';

              if (e.lengthComputable) {
                percent = Math.round((e.loaded / e.total) * 100);
                percentage = percent + '%';
                // $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                $progress.css("opacity",percentage/100);
              }
            };

            return xhr;
          },

          success: function() {
            // $alert.show().addClass('alert-success').text('Upload success');
            debug('Upload success');
          },

          error: function() {
            avatar.src = initialAvatarURL;
            // $alert.show().addClass('alert-warning').text('Upload error');
            debug('Upload error');
          },

          complete: function() {
            $progress.hide();
          },
        });
      });
    }
  });
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

  var swiper = new Swiper('.swiper-demo', {
    pagination: '.swiper-demo .swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-demo .swiper-button-next',
    prevButton: '.swiper-demo .swiper-button-prev',
    parallax: true,
    speed: 2000,
    autoplay: 2000
  });

  avatar();
  // 视差背景
  // $('.parallax-window').parallax({zIndex:2});
  // $('.parallax-window').paroller();


};

const start = {
  init: init
};

export default start;
