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

        setTimeout(function(){ToneAnalizer(allTweetText)}, 1000);





        console.log(texts)

    });
});


$(document).ready( function() {
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
    for(var i = 0; i<array.length; i++) {
        var tempHolder = "";
        console.log(array[i].replace(",",""))
        array[i].replace(/[^a-zA-Z0-9]/g, '')
        console.log(array[i].replace(",",""))
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


    textdext2.replace(",","");
    textdext.replace(",","");
console.log(textdext)
    console.log(textdext2)

var searchQuery = "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text="+textdext+"&features=sentiment&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true&sentiment.targets="+textdext2;

   // searchQuery//.replace(/[^\w\s!?]/g,'');
    console.log(searchQuery)
    }

function hasHTML(text){
    for(var x =0; x<text.length; x=x+1){
        if(text.substr(x,x+4)== 'html'){
        return false}
    }
    return true
};

