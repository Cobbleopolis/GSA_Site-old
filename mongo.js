(function () {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var databaseUrl = 'gsa-site:gayisok1@99.62.101.62:25566/gsa-site'; // 'username:password@example.com/mydb'
    var collections = ['homePage', 'sexualities', 'romantic', 'genders', 'other_terms'];
    var db = require('mongojs').connect(databaseUrl, collections);

    var navBar = fs.readFileSync(__dirname + '/html/resorcePages/navBar.html');
    var navButton = fs.readFileSync(__dirname + '/html/resorcePages/navButton.html');


    module.exports.indexHandle = function (url, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            var homePage = db.collection('homePage');
            fs.readdir(__dirname + '/html/images/slideshow/', function (err, files) {
                var html = '';
                if (err)
                    throw err;
                for (var i = 0; i < files.length; i++) {
                    html += '<div align="center" class="slideshow_div"><img class="slideshow_img" src="images/slideshow/' + files[i] + '"></div>';
                }
                $('#slideshow_entry').html(html);
            });
            homePage.find(function (err, docs) {
                if (err)
                    throw err;
                for (var i = 0; i < docs.length; i++) {
                    switch (docs[i].section) {
                        case 'summary':
                            $('#summary_content').html(docs[i].content);
                            break;
                        case 'about':
                            $('#about_content').html(docs[i].content);
                            break;
                        case 'meetings':
                            $('#meeting_content').html(docs[i].content);
                            break;
                        case 'fishbowl':
                            $('#fishbowl_content').html(docs[i].content);
                    }
                }
                res.send($.html());
            });
        });
    };

    module.exports.flagHandle = function (url, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            var sexualities = db.collection('sexualities');
            var romantic = db.collection('romantic');
            var genders = db.collection('gender');
            var other_terms = db.collection('other_terms');
            sexualities.find(function (err, flags) {
                if (err)
                    throw err;
                $("#sexualitiesSection").html(flagToHTML(flags));
            });
            romantic.find(function (err, flags) {
                if (err)
                    throw err;
                $("#romanticSection").html(flagToHTML(flags));
            });
            genders.find(function (err, flags) {
                if (err)
                    throw err;
                $("#gendersSection").html(flagToHTML(flags));
            });
            other_terms.find(function (err, flags) {
                if (err)
                    throw err;
                $("#otherTermsSection").html(flagToHTML(flags));
                res.send($.html());
            });

        });
    };

    module.exports.eventsHandle = function (url, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            res.send($.html());
        });
    };

    module.exports.chatHandle = function (url, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            res.send($.html());
        });
    };

    function flagToHTML(array) {
        var html = '';
        for (var i = 0; i < array.length; i++) {
            html += '<div class="flagEntry">' +
            '<div class="ui top attached header">' +
            '<p class="flagTitle">' + array[i].identification + '</p>' +
            '</div>';
            if (array[i].image_link) {
                html += '<div class="ui attached segment">' +
                '<img class="flagImg" src = "' + array[i].image_link + '">' +
                '</div>';
            }
            html += '<div class="ui attached segment">' +
            '<p class="flagDesc">' + array[i].description + '</p>' +
            '</div>';
            if (array[i].warning) {
                html += '<div class="ui bottom attached warning message">' +
                '<i class="warning sign icon"></i>' + array[i].warning +
                '</div>';
            }
            html += '</div>';
        }
        return html;
    }
}());

