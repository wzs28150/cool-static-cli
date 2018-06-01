import '../debouncedresize/jquery.debouncedresize'

/**
 * 回到顶部
 * @return {[type]} [description]
 */
const backtotop = () => {
  // console.log(1);
  var min_height = 500;
  $(window).scroll(function() {
    //获取窗口的滚动条的垂直位置
    var s = $(window).scrollTop();
    //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
    if (s > min_height) {
      $(".backtotop").fadeIn(100);
    } else {
      $(".backtotop").fadeOut(200);
    };
  });
  $('.backtotop a.totop').on('click', function(event) {
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0,
    }, 700);
  });
};
/**
 * 导航选中状态
 * @param  {[type]} i [description]
 * @return {[type]}   [description]
 */
var navactive = (i) => {
  $('nav ul li').find('a').removeClass('on');
  $('nav ul li').eq(i).find('a').addClass('on');
  if ($(window).width() < 980) {
    $('nav a').click(function() {
      $('#myInput').attr('checked', false);
    });
  }
  $(window).on('debouncedresize', function() {
    if ($(window).width() < 980) {
      $('nav a').click(function() {
        $('#myInput').attr('checked', false);
      });
    }
  });

};
/**
 * 二级导航
 * @return {[type]} [description]
 */
const sub_nav = (i) => {
  $('.er-bar .er-nav a').removeClass('on');
  $('.er-bar .er-nav a').eq(i).addClass('on');

  if ($(window).width() < 980) {
    $('.er-bar .er-nav a').click(function() {
      $('#ermenu').attr('checked', false);
    });
  }
  $(window).on('debouncedresize', function() {
    if ($(window).width() < 980) {
      $('.er-bar .er-nav a').click(function() {
        $('#ermenu').attr('checked', false);
      });
    }
  });

  if ($(".er-bar-targat").length > 0 && $(window).width() > 980) {
    $(window).scroll(function() {
      var navH = $(".er-bar-targat").offset().top;
      //获取滚动条的滑动距离
      var scroH = $(this).scrollTop();
      //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
      if (scroH >= navH) {
        $(".er-bar").addClass('on');
      } else if (scroH < navH) {
        $(".er-bar").removeClass('on');
      }
    })
  }

}
/**
 * 路由设置
 * @return {[type]} [description]
 */
const routerset = (article, state) => {
  const actionName = $(article).attr('data-main');
  const eractionName = $('.eractionName').attr('data-fun');
  // console.log(actionName);
  // console.log(eractionName);
  // 判断主actionName
  if (actionName) {
    //判断主二级actionName
    if (eractionName) {
      //判断是否无刷新
      if (state && localStorage.mainactionName && localStorage.mainactionName == actionName) {
        const action = require(`../../page/${actionName}`)
        var str = "action.default." + eractionName + "(function(a){navactive(a);sub_nav(a);})";
        eval(str);
      } else {
        localStorage.mainactionName = actionName;
        const action = require(`../../page/${actionName}`)
        action.default.init(function(a) {
          navactive(a);
        });
        var str = "action.default." + eractionName + "(function(a){sub_nav(a);})";
        eval(str);
      }
    } else {
      localStorage.mainactionName = actionName;
      const action = require(`../../page/${actionName}`)
      action.default.init(function(a) {
        navactive(a);
        // sub_nav();
      });
    }

  }
};
const init = function(article, state) {
  routerset(article, state);
};
const router = {
  init: init
}
export default router;
