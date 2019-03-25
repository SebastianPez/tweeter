
// Counts the character's within the user's text input box. If the user inputs too many chars, it will change the color 
// to red to inform the user they're over limit.

$(document).ready(function() {

    $("#tweet-textbox").on("keyup", function() {
        let $counter = $(this).parent().find(`.counter`);
        $counter.text(140 - this.value.length);
        if (this.value.length > 140) {
            $('span.counter').addClass(`over-length`);
        } else {
            $(`span.counter`).removeClass(`over-length`);
        }
    })

  });