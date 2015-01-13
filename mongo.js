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
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            var homePage = db.collection('homePage');
            fs.readdir('html/images/slideshow', function (err, files) {
                var html = '';
                if (!err)
                    for (var i = 0; i < files.length; i++) {
                        //console.log("File:" + files[i]);
                        if (i === 0) {
                            html += '<div style="display: block">';
                        } else {
                            html += '<div style="display: none">';
                        }
                        html += '<img class="slideshow_img" src="images/flags/' + files[i] + '"></div>';
                    }
                $('#slideshow').html(html);
            });
            homePage.find(function (err, docs) {
                if (!err)
                    for (var i = 0; i < docs.length; i++) {
                        switch (docs[i].section) {
                            case 'summary':
                                $('#summary_content').html(docs[i].content);
                                //$('#slideshow').height($('#summery_entry').outerHeight());
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
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            var sexualities = db.collection('sexualities');
            var romantic = db.collection('romantic');
            var genders = db.collection('genders');
            var other_terms = db.collection('other_terms');
            sexualities.find(function (err, flag) {
                if (!err)
                    for (var i = 0; i < flag.length; i++) {
                        //TODO Insert the flags
                    }
                res.send($.html());
            });
        });
    };

}());

