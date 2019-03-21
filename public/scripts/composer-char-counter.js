

$(document).ready(function() {
    // let countedChars = document.querySelector('main.container textarea');

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