import router from './package/router/router'
import pajax from './package/pajax/pajax'
import smoothscroll from './package/scroll/jquery.smooth-scroll.min';
/**
 * 判断dom是否存在
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */
const exists = (selector) => {
  "use strict";
  return ($(selector).length > 0);
};

/**
 * 动画设置
 * @return {[type]} [description]
 */
const animated_contents = () => {
  "use strict";
  if (exists('.animate-element')) {

    $(".animate-element:in-viewport").each(function(i) {

      var $this = $(this);
      if (!$this.hasClass('in-viewport')) {
        setTimeout(function() {
          $this.addClass('in-viewport');
        }, 100 * i);
      }
    });
  }
}
/**
 * 弹窗
 * @param  {[type]} info [description]
 * @param  {[type]} aurl [description]
 * @return {[type]}      [description]
 */
const alertinfo = (info, aurl) => {
  $('.alert_player').fadeIn();
  $('.alert_player .info').html(info);
  if (aurl === undefined) {} else {
    $('.alert_player .queren_btn,.alert_player .bg').click(function() {
      location.href = aurl;
    })
  }
};
/**
 * [回到顶部]
 * @return {[type]} [description]
 */
const backtotop = () => {
  $("#backtotop").on("click", function() {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
}
/**
 * 设置最小高度
 * @return {[type]} [description]
 */
const minheight = () => {
  var hh = $('header').height();
  var fh = $('footer').height();
  var wh = $(window).height();
  var nh = $('nav').height();
  var mh;
  if (nh > wh) {
    mh = nh - fh - hh;
  } else {
    mh = $(window).height() - fh - hh;
  }
  $('article').css('min-height', mh + 'px');
}
/**
 * 留言板
 * @return {[type]} [description]
 */
const msg = () => {
  $('body').undelegate('.msg a', 'click');
  $('body').delegate('.msg a', 'click', function(event) {
    var name = $('#name').val();
    var tel = $('#tel').val();
    var email = $('#email').val();
    var msg = $('#msg').val();
    var url = $('.msg').attr('data-url');
    if (!name) {
      //用户名不能为空
      alertinfo('Имя пользователя  не может быть пустым！');
    }
    if (!tel) {
      //电话号码不能为空
      alertinfo('номер телефона  не может быть пустым ！');
    }
    if (!email) {
      //邮箱不能为空
      alertinfo('почтовый ящик  не может быть пустым！');
    }
    if (!msg) {
      //内容不能为空
      alertinfo('содержание  не может быть пустым ！');
    }
    arrData = {
      'name': name,
      'tel': tel,
      'email': email,
      'msg': msg
    };
    $.post(url, arrData,
      function(data) {
        if ('118' == data.err_code) {
          alertinfo(data.err_info);
        } else {
          alertinfo(data.err_info);
        }
      }, "json"
    );

  });
}

const init = () => {
  router.init('article', false);
  pajax.init('main', function() {}, function(targetelement, state) {
    router.init('article', false);
    if (targetelement) {
      console.log(targetelement);
      setTimeout(function() {
        //console.log($('#' + targetelement).offset().top);
        console.log($('.top').height());
        $.smoothScroll({
          offset: -($('header').outerHeight() + $('.top').outerHeight() + 20),
          speed: 500,
          scrollTarget: '#' + targetelement
        });
      }, 500);
    }
  });
};

const main = {
  init: init,
  exists: exists,
  alertinfo: alertinfo
};

export default main;
