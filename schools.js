/**
 * Created by h205p2 on 5/23/17.
 */

function clearInput() {
    document.getElementById("basic").value = "";
}

$(document).ready( function() {
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

        setTimeout(function(){ToneAnalizer(allTweetText)}, 1500);
        console.log(texts)

    });
});


$(document).ready( function() {
    /*
    goes back to page 1 with the back button
     */
    $("#myButton2").click(function () {
        $("body").pagecontainer("change", "#page1", {transition: "slide"});
    });
});


var arrayOfSent = [];
function ToneAnalizer(tweetList) {
    for (var i = 0; i < tweetList.length; i = i + 1) {
        console.log(tweetList[i])
        var tempVar = tweetList[i].replace(/[^a-zA-Z0-9 ]/g, '');
        $.ajax({
            url: "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=" + tempVar + "&features=sentiment&return_analyzed_text=true&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true",
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result) {
                console.log( result.sentiment.document.score)
                $("#example2").append(" <li class='ui-li-has-alt ui-first-child' ><a href='' class='ui-btn'><h3>" + result.sentiment.document.score + "</h3><p >" + result.analyzed_text + "</p></a></li>")
                arraypush(result.sentiment.document.score);

            },
            error: function () {
                console.log('Failed!');
            }
        });



    }
    console.log(arrayOfSent);
    setTimeout(function(){Averager(arrayOfSent)}, 1000)

}

function arraypush(score){
    arrayOfSent.push(score)
    console.log(arrayOfSent)
}

function Averager (tweetScores){
    var overalsent= 0
    var overalsenttext= ""
    for (i = 0; i < tweetScores.length; i++) {
        overalsent = overalsent +tweetScores[i];
    }
    overalsent = overalsent / tweetScores.length;
    if (overalsent > 0) {
        overalsenttext = "Positive"
    } else {
        overalsenttext = "Negative"
    }
    $("#values").text(overalsenttext + " " + overalsent)


}







