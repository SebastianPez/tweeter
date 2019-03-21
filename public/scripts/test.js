const $tweet = {
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
  }

  const createTweetElement = function(tweetObj) {
    let user = tweetObj.user;
        $('section.posted-tweets').append($(`
        <header>
            <img class='user-img' src='${user.avatars.small}' style="width: 70px;height: 60px"></img>
            <h2 class='tweet'>${user.name}</h2>
            <h4 class="tweet">${user.handle}</h4>
        </header>
        <article>
            ${tweetObj.content.text}
        </article>
        <footer>
            ${tweetObj.created_at}
    </footer>
    `))
}

console.log(createTweetElement($tweet));