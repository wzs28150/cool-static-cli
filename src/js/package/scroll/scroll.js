define(['scrollbar'], function(scrollbar) {
  var initModule;

  initModule = function(article) {
    $(article).scrollbar();
  };

  return {
    initModule: initModule
  };
})
