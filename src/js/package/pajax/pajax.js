import pjax from './jquery.pjax'

//console.log(alertinfo);
/**
 * pajax 页面无刷新
 * @return {[type]} [description]
 */
 var url = '';
 var container = '';
 var fragment = '';
 var istop = '';
 var targetelement = '';
var pageajax = (article, start, callbak) => {
  if ($.support.pjax) {
    $('body').stop().undelegate('a[data-ajax!=no]', 'click');
    $('body').stop().delegate('a[data-ajax!=no]', 'click', function(event) {
      event.preventDefault();
      url = $(this).attr("href");
      container = $(this).attr("data-container");
      fragment = $(this).attr("data-fragment");
      istop = $(this).attr('data-istop');
      targetelement = $(this).attr('data-target');
      if(!url){
        alertinfo.initModule('网站维护中...')
      }

      if (container) {
        container = '.' + container;
      } else {
        container = article;
      }
      if (fragment) {
        fragment = '.' + fragment;
      } else {
        fragment = article;
      }

      $('.pjaxcontainer').removeClass('pjaxcontainer');
      $(container).addClass('pjaxcontainer');
      $(container).stop().animate({
        opacity: "1"
      }, 0);

      setTimeout(function() {
        $.pjax({
          url: url,
          container: container,
          fragment: fragment,
          timeout: 8000,
          scrollTo: false
        });
        if (istop) {

        } else {
          if (targetelement && $('article').attr('data-main') == localStorage.mainaction) {

          } else {
            $('html,body').stop().animate({
              scrollTop: 0,
            }, 400);
          }

        }
      }, 0);
      return false;
    });
    $(document).on('pjax:send', function(event) { //pjax链接点击后显示加载动画
      $("#progress").removeClass("done"); //完成，隐藏进度条
      $({
        property: 0
      }).animate({
        property: 100
      }, {
        duration: 1000,
        step: function() {
          var percentage = Math.round(this.property);

          $('#progress').css('width', percentage + "%");

          if (percentage == 100) {
            $("#progress").addClass("done"); //完成，隐藏进度条
          }
        }
      });
    });

    //加载完成后替换title
    $(document).on('pjax:success', function(data, status, xhr, options) {
      $(window).unbind('scroll');
    });
    $(document).on('pjax:complete', function() {
      $("#progress").addClass("done"); //完成，隐藏进度条
    });
    $(document).on('pjax:end', function(data, status, xhr, options) {
      //console.log(data);
      $('title').text(data.currentTarget.title);
      $('.pjaxcontainer').stop().animate({
        opacity: "1"
      }, 300);
      if("undefined" != typeof targetelement){
        if (xhr.container != 'main') {
          callbak(targetelement, true);
        } else {
          callbak(targetelement, false);
        }
      }else{
        if (xhr.container != 'main') {
          callbak('', true);
        } else {
          callbak('', false);
        }
      }
      //$('title').text(data.relatedTarget.innerText + ' - 润泰');
    });
    $(document).on('pjax:error', function() {
      console.log("加载失败!");
    });
    $(document).on('pjax:popstate', function(data, status, xhr, options) {});
  }
};

const pajax = {
  init: pageajax
};

export default pajax;
