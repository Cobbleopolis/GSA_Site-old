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
            sexualities.find({}, { sort: 'identification'}, function (err, flags) {
                if (err)
                    throw err;
                $("#sexualitiesSection").html(flagToHTML(flags));

                romantic.find({}, { sort: 'identification'}, function (err, flags) {
                    if (err)
                        throw err;
                    $("#romanticSection").html(flagToHTML(flags));

                    genders.find({}, { sort: 'identification'}, function (err, flags) {
                        if (err)
                            throw err;
                        $("#gendersSection").html(flagToHTML(flags));

                        other_terms.find({}, { sort: 'identification'}, function (err, flags) {
                            if (err)
                                throw err;
                            $("#otherTermsSection").html(flagToHTML(flags));
                            res.send($.html());
                        });
                    });
                });
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

    module.exports.fishbowlHandle = function (url, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            res.send($.html());
        });
    };

    module.exports.adminHandle = function (url, res) {
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
            sexualities.find({}, { sort: 'identification'}, function (err, flags) {
                if (err)
                    throw err;
                $("#sectionSexualityDropdown").html(flagToSelect(flags));
                romantic.find({}, { sort: 'identification'}, function (err, flags) {
                    if (err)
                        throw err;
                    $("#sectionRomanticDropdown").html(flagToSelect(flags));
                    genders.find({}, { sort: 'identification'}, function (err, flags) {
                        if (err)
                            throw err;
                        $("#sectionGenderDropdown").html(flagToSelect(flags));
                        other_terms.find({}, { sort: 'identification'}, function (err, flags) {
                            if (err)
                                throw err;
                            $("#sectionOtherDropdown").html(flagToSelect(flags));
                            fs.readdir(__dirname + '/html/images/flags/', function (err, files) {
                                var html = '<option selected="selected" value="">Flag Image</option>';
                                if (err)
                                    throw err;
                                for (var i = 0; i < files.length; i++) {
                                    html += '<option value= "images/flags/' + files[i] + '">' + files[i] + '</option>';
                                }
                                $('#flagImage').html(html);
                                res.send($.html());
                            });
                        });
                    });
                });
            });
        });
    };

    module.exports.adminChangeSubmit = function (req, res) {
        var data = req.body;

        //console.log(req.body);
        var database = db.collection(getDBName(data));

        if (data.page === "flags") {
            database.update({identification: data.group}, {$set: { identification: data.entryName, image_link: data.flagImage, description: data.editor, warning: data.warning}}, res.send(data.editor));
        } else if (data.page === "home") {
            database.update({section: data.section}, {$set: {content: data.editor}}, res.send(data.editor));
        }
    };

    module.exports.adminEditSubmit = function (req, res) {
        var data = req.body;

        var database = db.collection(getDBName(data));

        if (data.page === "flags") {
            database.findOne({identification: data.group}, function (err, document) {
                res.send(document);
            });
        } else if (data.page === "home") {
            database.findOne({section: data.section}, function (err, document) {
                res.send(document);
            });
        }
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

    function flagToSelect(array) {
        var html = '<option selected="selected" value="">Entry</option>';
        for (var i = 0; i < array.length; i++) {
            html += '<option value="' + array[i].identification + '">' + array[i].identification + '</option>';
        }
        return html;
    }

    function getDBName(data) {
        if (data.page === "home") {
            return "homePage";
        } else if (data.page === "flags") {
            return data.section;
        }
    }
}());

