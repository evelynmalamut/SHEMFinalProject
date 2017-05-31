
function clearInput() {
    document.getElementById("basic").value = "";
    location.reload();
}

$(document).ready(function() {

    $(document).keyup(function(e) {
        if(e.which == 13) {
            $("#myButton").click();
        }
    });

    $("#myButton").click(function () {
        var word = document.getElementById("basic").value;
        var configProfile = {
            "profile": {"screenName": word},
            "domId": 'example1',
            /*
            this is the number of tweets that it'll get
             */
            "maxTweets": 5,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": false,
            "lang": 'en'
        };

        $("body").pagecontainer("change", "#page2", { transition: "fade"});

        twitterFetcher.fetch(configProfile);
        console.log(allTweetText);
        function getRandomColor() {
            var back = ["#ff0000","blue","gray"];
            var rand = back[Math.floor(Math.random() * back.length)];
            return rand
        }
        var loadingScreenInterval = setInterval(function() {
            var loadingNumber = Math.random().toFixed(3);
            document.getElementById("loadingScreen").innerHTML = loadingNumber;

            $("#loadingScreen").css("color", getRandomColor()).show();
        }, 50);
        setTimeout(function() {clearInterval(loadingScreenInterval); $("#loadingScreen").hide()}, 1500);
        setTimeout(function(){ToneAnalizer(allTweetText)}, 1500);
        console.log(texts)

    });
});


$(document).ready( function() {
    $("#hideButton").hide();
    $("#tweetView").click(function () {

        $("body").pagecontainer("change", "#page3", {transition: "slide"})

    })
    /*
    goes back to page 1 with the back button
     */
    $("#myButton2").click(function () {
        $("body").pagecontainer("change", "#page1", {transition: "slide"});

    });
});


var arrayOfSentTweets = [];
function ToneAnalizer(tweetListArray) {
    for (var i = 0; i < tweetListArray.length; i = i + 1) {
        console.log(tweetListArray[i])
        var tempVartoHoldTweet = tweetListArray[i].replace(/[^a-zA-Z0-9 ]/g, '');
        $.ajax({
            url: "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=" + tempVartoHoldTweet + "&features=sentiment&return_analyzed_text=true&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result) {
                console.log( result.sentiment.document.score)
                $("#example2").append(" <li class='ui-li-has-alt ui-first-child' ><a href='' class='ui-btn'><h3>" + result.sentiment.document.score.toFixed(3) + "</h3><p >" + result.analyzed_text + "</p></a></li>")
                arraypush(result.sentiment.document.score);

            },
            error: function () {
                console.log('Failed!');
            }
        });



    }
    console.log(arrayOfSentTweets);
    setTimeout(function(){Averager(arrayOfSentTweets); $("#hideButton").show()}, 1000)

}

function arraypush(score){
    arrayOfSentTweets.push(score)
    console.log(arrayOfSentTweets)
}

function Averager (tweetScores){
    var sentimentAverage= 0
    var posOrNeg= ""
    for (i = 0; i < tweetScores.length; i++) {
        sentimentAverage = sentimentAverage +tweetScores[i];
    }
    sentimentAverage = sentimentAverage / tweetScores.length;
    if (sentimentAverage > 0) {
        posOrNeg = "Positive"
    } else {
        posOrNeg = "Negative"
    }
    $("#values").text(posOrNeg + " " + sentimentAverage.toFixed(3))


}









