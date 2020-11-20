/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Prevent XSS with escaping
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    // calculate tweet age in days
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const daysAgo = Math.round((today - tweetObj.created_at) / oneDay);

    const $tweet = $(
      `<article class="tweet">
      <header>
        <div>
          <img src=${tweetObj.user.avatars}>
          <p class="display-name">${tweetObj.user.name}</p>
        </div>
        <p class="user-name">${tweetObj.user.handle}</p>
      </header>
      <p class="past-tweet">${escape(tweetObj.content.text)}</p>
      <hr>
      <footer>
        <p class="small"><small>${daysAgo} days ago</small></p>
        <p class="small icons"><small>⚑ &nbsp ⇌ &nbsp ♥</small></p>
      </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function(arrOfTweets) {
    $('#tweets-container').empty();
    for (const tweet of arrOfTweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then(res => {
      renderTweets(res);
    });
  };

  // OLD TWEETS - Fetching tweets with Ajax
  loadTweets();

  // NEW TWEETS - Form submission using jQuery
  $('form').on('submit', event => {
    event.preventDefault();
    const len = $('form textarea').val().length;
    $('#error-msg').text("");
    $('#error-msg').slideUp();
    if (!len) {
      $('#error-msg').text("⚠️ Please type your tweet before submitting!");
      $('#error-msg').slideDown();
    } else if (len > 140) {
      $('#error-msg').text("⚠️ Character count limit of 140 has been exceeded and cannot be submitted.");
      $('#error-msg').slideDown();
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $('form').serialize()
      }).then(res => {
        $('form textarea').val(null);
        $('output.counter').val(140);
        loadTweets();
      });
    }
  });
});