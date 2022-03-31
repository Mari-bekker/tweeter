/*
 * Client-side JS logic
 * jQuery is already loaded
 */
$( document ).ready(function() {
  console.log( "ready!" );
  $('.error').hide();


  const createTweetElement = function (tweetData) {
    const $tweet = `<article>
    <div class="tweet-header">
      <div class="user-name"> 
        <img class ="avatar" src=${tweetData.user.avatars} alt="">
        <h4>${tweetData.user.name}</h4>
      </div>
  
      <div>${tweetData.user.handle}</div>
  
    </div>
    ${escape(tweetData.content.text)}
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
    $("#tweet-container").empty();

    for (let tweet of tweets) {
     const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }

    //add an event listener for submit
    $("#postingTweet").submit(function( event ) {

      //prevent the default form submission behaviour (prevent page refresh)
      event.preventDefault();

      let textLength = $("#tweet-text").val().length;
      if (textLength > 140) {
        $('.error').slideDown("slow");
        $('#error-message').text("Your tweet is over 140 characters, please be more succinct!")
      } else if (textLength === 0) {
        $('.error').slideDown("slow");
        $('#error-message').text("You forgot to enter the tweet!")
      } else {
        $('.error').slideUp("fast");
              
        let textdata = $("#postingTweet").serialize(); //serialize the data inside the form


        //use jQuery library to submit a POST request that sends the serialized data to the server
        $.ajax({
          type: "POST",
          url: "/tweets/",
          data: textdata,
          })
          .done(function() {
            loadTweets();
        })      

      }
    });

    const loadTweets = function () {
      // fetch tweets from the http://localhost:8080/tweets page.
      // use jQuery to make a request to /tweets and receive the array of tweets as JSON.

      $.ajax({
        type: 'GET',
        url: "/tweets",
        dataType: 'JSON'
      })
      .done(function(data) {      
          renderTweets(data)
      })
  
    }
    loadTweets();  

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

});