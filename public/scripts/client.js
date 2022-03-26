/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

$( document ).ready(function() {
  console.log( "ready!" );
  const createTweetElement = function (tweetData) {
    const $tweet = `<article>
    <div class="tweet-header">
      <div class="user-name"> 
        <img class ="avatar" src=${tweetData.user.avatars} alt="">
        <h4>${tweetData.user.name}</h4>
      </div>
  
      <div>${tweetData.user.handle}</div>
  
    </div>
    ${tweetData.content.text}
    <footer>
      <div>${tweetData.created_at}</div>
      <div id="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
  </article>`
  
  return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (let i of tweets) {
      $tweet = createTweetElement(i);
      $('#tweet-container').append($tweet); // can also use prepend for begining. 
    }
  }

  renderTweets(data);
});

