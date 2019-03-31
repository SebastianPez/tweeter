
// Takes in an array of tweets, implements them into the proper DOM node with appopriate tags for each element. Needs to be called by renderTweets to append the new tweet to the main page.

const createTweetElement = function (tweetData) {
  // Creates the date/time of each tweet when they're posted.
  let convertDate = new Date(tweetData.created_at);
  let dateString = convertDate.toISOString();
 
  
  let $tweet = $('<article>').addClass('posted-tweets');
  let $header = $('<header>').addClass('tweet-header');
  let $p = $('<p>').addClass('tweet-body').text(tweetData.content.text);
  let $footer = $('<footer>').addClass('tweet-footer').text(moment(dateString).fromNow());
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

// Takes the properly formatted and styled tweet and appends it to the main page.
const renderTweets = function (tweets) {
  for (let i = 0; i < tweets.length; i ++) {
    let newTweet = createTweetElement(tweets[i]);
    $('section.tweet-container').prepend(newTweet);
  }
}

// Retrieves tweets from remote database and uses the renderTweets function to load them into the page.

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

      // Before a tweet is posted it checks to make sure there is user input and that it is also within the character limit (<140 chars). 
      
      if (this.firstElementChild.value === "") {
        $('div.tweet-error').text('A tweet must have text in order to be posted');
        $('div.tweet-error').slideDown('fast', function () {
        });
        return;
      }

      if (this.firstElementChild.value.length > 140) {
        $('div.tweet-error').text('Over character limit of 140');
        $('div.tweet-error').slideDown('fast', function () {
        });
        return;
      }
      $('div.tweet-error').slideUp('fast', function () {
      });

      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: { text: this.firstElementChild.value }
      })

      .done(function (res) {
        renderTweets([res])
      });

      $('#tweet-textbox').val("");
    })
  })

  $('#compose-button').hover(function () {
    $('#compose-button').toggleClass('button-hover');
  })

  $('#compose-button').click(function () {
    // if ($('section.new-tweet')[0].style.display === "block") {
    $('section.new-tweet').slideToggle(400, function () {
    });
    $('#tweet-textbox').focus();
  })
  // Tweet visual toggling attempt before using just CSS
  // $('section.tweet-container').hover(function () {
  //     $('.tweet-header').toggleClass('hover-changed');
  //     $('article.posted-tweets').toggleClass('hover-background');
  //     $('.tweet-icon').toggleClass('disappear');
  // })

});