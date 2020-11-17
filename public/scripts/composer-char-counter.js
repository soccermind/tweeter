$(document).ready(function() {
  console.log("form inside the $(document).ready callback!!!")
  $('#tweet-text').on('input', function(event) {
    let count = 140 - this.value.length;
    console.log(count);
    // $('output.counter').text(count);
    // counter = $(this).parent().find('.counter').text(count);
    counter = $(this).parent().find('.counter');
    counter.text(count);
    console.log(counter);
    if (count < 0) {
      counter.addClass('negative');
      // counter.removeClass('positive');
    } else {
      // counter.addClass('positive');
      counter.removeClass('negative');
    }
    // $(counter).text(count);
  })
});