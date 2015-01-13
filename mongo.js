(function () {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var databaseUrl = 'gsa-site:gayisok1@99.62.101.62:25566/gsa-site'; // 'username:password@example.com/mydb'
    var collections = ['names', 'homePage'];
    var db = require('mongojs').connect(databaseUrl, collections);

    var navBar = fs.readFileSync(__dirname + '/html/resorcePages/navBar.html');
    var navButton = fs.readFileSync(__dirname + '/html/resorcePages/navButton.html');


    module.exports.indexHandle = function (url, res) {
        //console.log(__dirname);
        fs.readFile(url, function (err, file) {
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            var homePage = db.collection('homePage');
            //var slideshowHTML = '';
            //var files = fs.readdirSync('/html/images/slideshow');
            //for (var i = 0; i < files.length; i++) {
            //    console.log("File:" + files[i]);
            //    if (i === 0) {
            //        slideshowHTML += '<div style="display: block">';
            //    } else {
            //        slideshowHTML += '<div style="display: none">';
            //    }
            //    slideshowHTML += '<img src="' + files[i] + '" width = "' + $('#slideshow').width() + '" height = "' + $('#slideshow').height() + '"></div>';
            //}
            //$('#slideshow').html(slideshowHTML);
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
                        html += '<img src="images/flags/' + files[i] + '"></div>';
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


}());

