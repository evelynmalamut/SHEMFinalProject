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
            "maxTweets": 4,
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
        $("body").pagecontainer("change", "#page1", {transition: "fade"});
    });
});



function ToneAnalizer(array){
  //  console.log("hi",array)
    //https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=X%2C%20Y%2C%20Z&features=sentiment&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true&sentiment.targets=X%2CY%2CZ
    var textdext = "";
    var textdext2= "";
    varx = [];
    /*
     this for loop goes through the array, removing any links,
     removing any spaces and replacing them with '%20' (That's what watson wants).
     It puts the complete text of all the tweets into textdext. TextDext2 has the
     same thing exept all the tweets are separated by '%2C'.
     */

    for(var i = 0; i<array.length; i++) {
        var tempHolder = "";
        console.log(array[i].replace(",",""));

        array[i].replace(/[^a-zA-Z0-9]/g, '');
        console.log(array[i].replace(",",""));

        for (var j = 0; j < array[i].length; j++) {

            if (hasHTML(array[i])) {

                if (array[i].charAt(j) !== " ") {
                    tempHolder = tempHolder + array[i].charAt(j);
                } else if (array[i].charAt(j) == " ") {
                    tempHolder = tempHolder + "%20";
                }
            }
            varx[i] = tempHolder.replace(",","");
        }

        for (var i = 0; i < varx.length; i++) {
            textdext = textdext + varx[i];
        }

        for (var i = 0; i < varx.length; i++) {
            textdext2 = textdext2 + varx[i] + "%2C";
        }
        textdext.replace('undefined','');
        textdext2.replace('undefined','');
    }

    textdext2 = textdext2.substr(0, textdext2.length -3)

    textdext2.replace(/[^\w\s!?]/g,'');
    textdext.replace(/[^\w\s!?]/g,'');
    /*
    this removes all the text with only the 26 alphabet charictars
    Watson gets confused with all that stuff.
     */

    textdext2.replace(",","");
    textdext.replace(",","");
    /*
    this removes all the commas
    Watson gets confused with commas
     */
console.log(textdext)
    console.log(textdext2)

    var searchQuery = "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text="+textdext+"&features=sentiment&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true&sentiment.targets="+textdext2;
/*
This watson link is supposed to return sentiments for a list of different
phrases. 'TextDext' is supposed to be a string that hold all the tweets that
should be evaluated. There should be no punctuation or separations (commas and stuff).
Indavidual words are separated by '%20'. 'TextDext2' Should hold the same content
as textdext but it should have all of the tweets separated by '%2C'. That's how watson
knows to evaluate each set of text in between the %2C as a separate comment.


Right now the function WORKS but only evaluates 1 tweet. Twice.. It would be great
if somebody would figure out why that's happening and fix it.


*/
    console.log(searchQuery)
    }

function hasHTML(text){
    for(var x =0; x<text.length; x=x+1){
        if(text.substr(x,x+4)== 'html'){
        return false}
    }
    return true
};

