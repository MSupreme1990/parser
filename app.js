var needle = require("needle");
var cheerio = require("cheerio");
var async = require("async");

var aUrl = [];
aUrl[0] = "http://lesdomsad.ru/shop/sad/gazonokosilki-kupit-v-kirove/benzinovye/huskvarna/10383.html";
aUrl[1] = "http://lesdomsad.ru/shop/sad/gazonokosilki-kupit-v-kirove/benzinovye/huskvarna/10386.html";
aUrl[2] = "http://lesdomsad.ru/shop/sad/gazonokosilki-kupit-v-kirove/benzinovye/huskvarna/11076.html";


var q = async.queue(function(url){
    needle.get(url,function(err,res){
        if(err) throw(err);

        var $ = cheerio.load(res.body);

        console.log($("#shop-production-view").find("h1").text());

        console.log($(".content_item").find("table").text());

        console.log($(".content_item").find("p").text());

        img = $(".image").find("img");

        img.each(function(i,val){
            console.log($(val).attr("src"));
        });

    });
},10);

var i = 0;
while(aUrl.length > i)
{
    q.push(aUrl[i]);
    i++;
}