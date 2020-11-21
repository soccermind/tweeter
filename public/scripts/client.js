/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(document).ready(() => {
  // Prevent XSS with escaping
  const escape =  (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Calculate tweet age and return appropriate string for seconds, minutes, hours, days.
  const calculateTweetAge = (createdAt) => {
    const today = new Date();
    const millisecondsAgo = today - createdAt;
    let plural = 's';

    const secondsAgo = Math.round(millisecondsAgo / 1000);
    if (secondsAgo < 60) {
      plural = (secondsAgo === 1) ? '' : plural;
      return `${secondsAgo} second${plural} ago`;
    }

    const minutesAgo = Math.round(secondsAgo / 60);
    if (minutesAgo < 60) {
      plural = (minutesAgo === 1) ? '' : plural;
      return `${minutesAgo} minute${plural} ago`;
    }

    const hoursAgo = Math.round(minutesAgo / 60);
    if (hoursAgo < 60) {
      plural = (hoursAgo === 1) ? '' : plural;
      return `${hoursAgo} hour${plural} ago`;
    }   
    
    const daysAgo = Math.round(hoursAgo / 24);
    plural = (daysAgo === 1) ? '' : plural;
    return `${daysAgo} day${plural} ago`;
  };

  const createTweetElement = (tweetObj) => {
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
        <p class="small"><small>${calculateTweetAge(tweetObj.created_at)}</small></p>
        <p class="small icons"><small>⚑ &nbsp ⇌ &nbsp ♥</small></p>
      </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = (arrOfTweets) => {
    $('#tweets-container').empty();
    for (const tweet of arrOfTweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then(res => {
      renderTweets(res);
    });
  };

  // Validates that the tweet is not empty and under 140 characters.  
  const validateTweet = (len) => {
    if (!len) {
      $('#error-msg').text("⚠️ Please type your tweet before submitting!");
      $('#error-msg').slideDown();
      return false;
    }
    if (len > 140) {
      $('#error-msg').text("⚠️ Character count limit of 140 has been exceeded and cannot be submitted.");
      $('#error-msg').slideDown();
      return false;
    }
    return true;
  };

  // Fetching tweets with Ajax
  loadTweets();

  // NEW TWEETS - Form submission using jQuery
  $('form').on('submit', event => {
    event.preventDefault();
    const len = $('form textarea').val().length;
    $('#error-msg').text("");
    $('#error-msg').slideUp();

  if (validateTweet(len)) {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $('form').serialize()
    }).then(res => {
      $('form textarea').val(null);
      $('output.counter').val(140);
      loadTweets();
    });
  }; 
  });
});