const tress = require('tress');
const needle = require("needle");
const cheerio = require("cheerio");
const async = require("async");
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

let aUrl = [
    'http://lesdomsad.ru/shop/benzopily-i-elektropily/huskvarna-benzopily-v-kirove-kupit/10719.html',
    'http://lesdomsad.ru/shop/benzopily-i-elektropily/huskvarna-benzopily-v-kirove-kupit/10721.html',
    'http://lesdomsad.ru/shop/benzopily-i-elektropily/huskvarna-benzopily-v-kirove-kupit/10722.html',
    'http://lesdomsad.ru/shop/benzopily-i-elektropily/huskvarna-benzopily-v-kirove-kupit/10723.html',
    'http://lesdomsad.ru/shop/benzopily-i-elektropily/huskvarna-benzopily-v-kirove-kupit/jelektropila/10374.html',
];

const jquery = body => cheerio.load(body);

let products = [];

let parsePage = ($) => {
    let name = $("#shop-production-view > h1").first().text();

    let categories = $(".breadcrumb").text();
    let arrCategories = categories.split(' / ').splice([0]);

    let price = $(".price").text();
    let content = $('.content_item').html();
    let images = $(".image").find("img").attr("src");

    // let $imageLink = $(".shop-production-view .image a"),
    //     img = '';
    // if ($imageLink.length > 0) {
    //     img = $imageLink.attr("href");
    // }


    products.push({
        name,
        // categories,
        arrCategories,
        content,
        price,
        images,
        // img,
    });
};

let q = tress((url, callback) => {
    needle.get(url, {  }, (err, res) => {
        if (err) {
            throw err;
        }

        parsePage(jquery(res.body));

        callback();
    });
}, 5);

q.drain = () => {
    // console.log(products);

    fs.writeFile('data.json', JSON.stringify(products), (err) => {
        if (err) throw err;

        console.log("saved");
    });

};

for (let i = 0; i < aUrl.length; i++) {
    q.push(aUrl[i]);
}




