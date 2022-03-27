/*
 * Client-side JS logic
 * jQuery is already loaded
 */
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
      <div>${timeago.format(tweetData.created_at)}</div>
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

    //add an event listener for submit
    $("#postingTweet").submit(function( event ) {

      //prevent the default form submission behaviour
      event.preventDefault();

      //serialize the data inside the form
      let textdata = $("#postingTweet").serialize();

      //use jQuery library to submit a POST request that sends the serialized data to the server
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: textdata,
        })
    });

    const loadTweets = function () {
      // fetch tweets from the http://localhost:8080/tweets page.
      // use jQuery to make a request to /tweets and receive the array of tweets as JSON.
      $.ajax({
        type: 'GET',
        url: "/tweets/",
        dataType: 'JSON'
      })
      .done(function(data) {
          renderTweets(data)
      })
  
    }
    loadTweets();  

});

