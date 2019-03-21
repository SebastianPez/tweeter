/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetData) {
  let $tweet = $('<article>').addClass('posted-tweets');
  let $header = $('<header>').addClass('tweet-header');
  let $p = $('<p>').addClass('tweet-body').text(tweetData.content.text);
  let $footer = $('<footer>').addClass('tweet-footer').text(tweetData.created_at);
  let $span = $('<span>');

  $header.append($('<img>').addClass('user-img').attr('src', tweetData.user.avatars.small));

  $header.append($('<h2>').addClass('user').text(tweetData.user.name));
  
  $header.append($('<h4>').addClass('handle').text(tweetData.user.handle));

  $footer.append($span);

  $span.append($('<img>').addClass('tweet-icon').attr('src', '/images/flag.png'));
  $span.append($('<img>').addClass('tweet-icon').attr('src', '/images/retweet.png'));
  $span.append($('<img>').addClass('tweet-icon').attr('src', '/images/heart.png'));

  $tweet.append($header, $p, $footer);

  return $tweet;
}


const renderTweets = function (tweets) {
for (let i = 0; i < tweets.length; i ++) {
  let newTweet = createTweetElement(tweets[i]);
  $('section.tweet-container').prepend(newTweet);
}
}

const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
  .done(function (data) {
    renderTweets(data);
  })
}

$(document).ready(function() {
  
  loadTweets();

  $(function() {
    let $submission = $('#new-tweet-post');
    $submission.submit(function(e) {
      e.preventDefault();
      console.log('Prevented default submission');

      if (this.firstElementChild.value === "") {
        alert('Without input, I cannot post');
        return;
      }

      if (this.firstElementChild.value.length > 140) {
        alert('Over character limit of 140');
        return;
      }
      
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: { text: this.firstElementChild.value }
      })
      .done(loadTweets());
    })
  })


  $('main.container article.posted-tweets').hover(function () {
      $('.tweet-header').toggleClass('hover-changed');
      $('article.posted-tweets').toggleClass('hover-background');
      $('.tweet-icon').toggleClass('disappear');
  })

});