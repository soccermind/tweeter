$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    const count = 140 - this.value.length;
    const counter = $(this).parent().find('.counter');
    counter.text(count);
    if (count < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  })
});