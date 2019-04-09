/* jshint esversion: 6 */
const alertinfo = (info, aurl) => {
  $('.alert_player').fadeIn();
    $('.alert_player .info').html(info);
    if (aurl === undefined) {} else {
      $('.alert_player .queren_btn,.alert_player .bg').click(function() {
        location.href = aurl;
      });
    }
    $('.alert_player .bg,.alert_player .queren_btn').click(function() {
      $('.alert_player').fadeOut();
    });
};
export default alertinfo;
