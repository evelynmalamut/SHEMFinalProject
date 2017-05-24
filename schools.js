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
            "maxTweets": 50,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": false,
            "lang": 'en'
        };
        $("body").pagecontainer("change", "#page2", { transition: "fade"});
        twitterFetcher.fetch(configProfile);


        console.log(allTweetText)


    });
});


$(document).ready( function() {
    $("#myButton2").click(function () {
        $("body").pagecontainer("change", "#page1", {transition: "fade"});
    });
});