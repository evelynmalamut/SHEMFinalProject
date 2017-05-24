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
            "maxTweets": 1,
            "enableLinks": true,
            "showUser": true,
            "showTime": true,
            "showImages": false,
            "lang": 'en'
        };
        $("body").pagecontainer("change", "#page2", { transition: "fade"});
        twitterFetcher.fetch(configProfile);


        console.log(allTweetText);

        setTimeout(function(){ToneAnalizer(allTweetText)}, 500);





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
    for(var i = 0; i<array.length; i++){
        var tempHolder="";
        console.log(array[i])
        array[i].replace(/[^a-zA-Z0-9]/g, '')
        console.log(array[i])
        for(var j = 0; j<array[i].length; j++){

            if(array[i].charAt(j)!==" "){
                tempHolder = tempHolder+ array[i].charAt(j);
            }else if(array[i].charAt(j)==" ") {
                tempHolder = tempHolder+ "%20";
            }
            }
        varx[i] = tempHolder;
        }

        for(var i =0; i<varx.length; i++){
            textdext = textdext + varx[i];
        }

        for(var i = 0; i<varx.length; i++){
            textdext2 = textdext2 + varx[i] +"%2C";
        }
//console.log(textdext)
   // console.log(textdext2)

var searchQuery = "https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text="+textdext+"&features=sentiment&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true&sentiment.targets="+textdext2;

    searchQuery.replace(/[^a-zA-Z ]/g, "")
    console.log(searchQuery)
    }



