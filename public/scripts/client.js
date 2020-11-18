/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function (tweetObj) {
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
      <p class="past-tweet">${tweetObj.content.text}</p>
      <hr>
      <footer>
        <p class="small"><small>${daysAgo} days ago</small></p>
        <p class="small"><small>⚑ &nbsp ⇌ &nbsp ♥</small></p>
      </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function (arrOfTweets) {
    for (const tweet of arrOfTweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);


  // NEW TWEETS - Form submission using jQuery
  $('form').on('submit', event => {
    event.preventDefault()
    // console.log(
    //   $('form').val(),
    //   $('form textarea').val(),
    //   $('form').serialize()
    // )
    $
    .ajax({
      url: "/tweets/",
      method: "POST",
      data: $('form').serialize()
    })
    .then(res => console.log(res))
  });

});