/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
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
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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
            $('section.tweet-container').append(newTweet);
        }
    }

    renderTweets(tweets);

    $('main.container article.posted-tweets').hover(function () {
        $('.tweet-header').toggleClass('hover-changed');
        $('article.posted-tweets').toggleClass('hover-background');
        $('.tweet-icon').toggleClass('disappear');
    })

});