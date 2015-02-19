(function () {
    var fs = require('fs');
    var cheerio = require('cheerio');
    var databaseUrl = 'gsa-site:gayisok1@99.62.103.32:25566/gsa-site'; // 'username:password@example.com/mydb'
    var collections = ['homePage', 'sexualities', 'romantic', 'genders', 'other_terms', 'adminUser'];
    var db = require('mongojs').connect(databaseUrl, collections);

    var navBar = fs.readFileSync(__dirname + '/html/resorcePages/navBar.html');
    var navButton = fs.readFileSync(__dirname + '/html/resorcePages/navButton.html');
    //var adminLoginFail = fs.readFileSync(__dirname + '/html/admin/adminLoginFail.html');


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
            sexualities.find().sort({identification: 1}, function (err, flags) {
                if (err)
                    throw err;
                $("#sexualitiesSection").html(flagToHTML(flags));

                romantic.find().sort({identification: 1}, function (err, flags) {
                    if (err)
                        throw err;
                    $("#romanticSection").html(flagToHTML(flags));

                    genders.find().sort({identification: 1}, function (err, flags) {
                        if (err)
                            throw err;
                        $("#gendersSection").html(flagToHTML(flags));

                        other_terms.find().sort({identification: 1}, function (err, flags) {
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

    module.exports.fishbowlSubmit = function (req, res) {
        var data = req.body;
        var fishbowl = db.collection('fishbowl');
        fishbowl.save({name: data.name, content: data.content, triggers: data.triggers, urgency: data.urgency, date: new Date()}, function(err, result){
            res.send(true);
        })
    };

    module.exports.adminDashHandle = function (url, req, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            //console.log(req.cookies);
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            if (req.cookies.hoochgsa) {
                if (req.cookies.hoochgsa.adminLogin) {
                    res.send($.html());
                } else {
                    res.writeHead(302, {
                        'Location': 'login'
                    });
                    res.end();
                }
            } else {
                res.writeHead(302, {
                    'Location': 'login'
                });
                res.end();
            }
        });
    };

    module.exports.adminDashSubmit = function (req, res) {
        var data = req.body;
        //console.log("Cookies: ", req.cookies);
    };

    module.exports.adminEditHandle = function (url, req, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);

            if (req.cookies.hoochgsa) {
                if (req.cookies.hoochgsa.adminLogin) {

                    var sexualities = db.collection('sexualities');
                    var romantic = db.collection('romantic');
                    var genders = db.collection('gender');
                    var other_terms = db.collection('other_terms');
                    sexualities.find().sort({identification: 1}, function (err, flags) {
                        if (err)
                            throw err;
                        $("#sectionSexualityDropdown").html(flagToSelect(flags));
                        romantic.find().sort({identification: 1}, function (err, flags) {
                            if (err)
                                throw err;
                            $("#sectionRomanticDropdown").html(flagToSelect(flags));
                            genders.find().sort({identification: 1}, function (err, flags) {
                                if (err)
                                    throw err;
                                $("#sectionGenderDropdown").html(flagToSelect(flags));
                                other_terms.find().sort({identification: 1}, function (err, flags) {
                                    if (err)
                                        throw err;
                                    $("#sectionOtherDropdown").html(flagToSelect(flags));
                                    fs.readdir(__dirname + '/html/images/flags/', function (err, files) {
                                        var html = '<option selected="selected" value="">None</option>';
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
                } else {
                    res.writeHead(302, {
                        'Location': 'login'
                    });
                    res.end();
                }
            } else {
                res.writeHead(302, {
                    'Location': 'login'
                });
                res.end();
            }
        });
    };

    module.exports.adminChangeSubmit = function (req, res) {
        var data = req.body;

        //console.log(req.body);
        var database = db.collection(getDBName(data));

        if (data.page === "flags") {
            if (data.group === "ADD_ENTRY") {
                database.save({
                    identification: data.entryName,
                    image_link: data.flagImage,
                    description: data.editor,
                    warning: data.warning
                }, function () {
                    var sexualities = db.collection('sexualities');
                    var romantic = db.collection('romantic');
                    var genders = db.collection('gender');
                    var other_terms = db.collection('other_terms');

                    var html = ["", "", "", ""];

                    if (data.page === "flags")
                        database.remove({identification: data.group}, function (err, result) {
                            if (err)
                                throw err;
                            sexualities.find().sort({identification: 1}, function (err, flags) {
                                if (err)
                                    throw err;
                                html[0] += flagToSelect(flags);
                                romantic.find().sort({identification: 1}, function (err, flags) {
                                    if (err)
                                        throw err;
                                    html[1] += flagToSelect(flags);
                                    genders.find().sort({identification: 1}, function (err, flags) {
                                        if (err)
                                            throw err;
                                        html[2] += flagToSelect(flags);
                                        other_terms.find().sort({identification: 1}, function (err, flags) {
                                            if (err)
                                                throw err;
                                            html[3] += flagToSelect(flags);

                                            res.send(html);
                                        });
                                    });
                                });
                            });
                        });
                });
            } else {
                database.update({identification: data.group}, {
                    $set: {
                        identification: data.entryName,
                        image_link: data.flagImage,
                        description: data.editor,
                        warning: data.warning
                    }
                }, res.send(data.editor));
            }
        } else if (data.page === "home") {
            database.update({section: data.section}, {$set: {content: data.editor}}, res.send(data.editor));
        }
    };

    module.exports.adminRemoveSubmit = function (req, res) {
        var data = req.body;

        var database = db.collection(getDBName(data));

        var sexualities = db.collection('sexualities');
        var romantic = db.collection('romantic');
        var genders = db.collection('gender');
        var other_terms = db.collection('other_terms');

        var html = ["", "", "", ""];

        if (data.page === "flags")
            database.remove({identification: data.group}, function (err, result) {
                if (err)
                    throw err;
                sexualities.find().sort({identification: 1}, function (err, flags) {
                    if (err)
                        throw err;
                    html[0] += flagToSelect(flags);
                    romantic.find().sort({identification: 1}, function (err, flags) {
                        if (err)
                            throw err;
                        html[1] += flagToSelect(flags);
                        genders.find().sort({identification: 1}, function (err, flags) {
                            if (err)
                                throw err;
                            html[2] += flagToSelect(flags);
                            other_terms.find().sort({identification: 1}, function (err, flags) {
                                if (err)
                                    throw err;
                                html[3] += flagToSelect(flags);

                                res.send(html);
                            });
                        });
                    });
                });
            });
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

    module.exports.adminFishbowlHandle = function (url, req, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var fishbowl = db.collection('fishbowl');
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            if (req.cookies.hoochgsa) {
                if (req.cookies.hoochgsa.adminLogin) {
                    fishbowl.find(function(err, entries){
                        var html = '<tbody>';
                        for(var i = 0; i < entries.length; i++){

                            if(entries[i].urgency === "Slightly Urgent"){
                                html += '<tr class="warning">';
                            } else if(entries[i].urgency === "Very Urgent"){
                                html += '<tr class="error">';
                            } else {
                                html += '<tr>';
                            }

                            html += '<td>' + entries[i].urgency + '</td>';
                            html += '<td>' + entries[i].date + '</td>';
                            html += '<td>' + entries[i].triggers + '</td>';
                            html += '<td><div class="ui primary button" onclick="showFishbowl(' + i + ')">View</div></td>';
                            html += '</tr>';
                        }
                        html += '</tbody>';
                        $("#fishbowlList").append(html);
                        res.send($.html());
                    });
                } else {
                    res.writeHead(302, {
                        'Location': 'login'
                    });
                    res.end();
                }
            } else {
                res.writeHead(302, {
                    'Location': 'login'
                });
                res.end();
            }
        });
    };

    module.exports.adminFishbowlSubmit = function (req, res) {
        var data = req.body;
        //console.log("Cookies: ", req.cookies);
    };

    module.exports.adminLoginHandle = function (url, req, res) {
        fs.readFile(url, function (err, file) {
            if (err)
                throw err;
            var $ = cheerio.load(file);
            $('#navBar').html(navBar);
            $('#navButton').html(navButton);
            if (req.cookies.hoochgsa) {
                if (req.cookies.hoochgsa.adminLogin) {
                    res.writeHead(302, {
                        'Location': 'dash'
                    });
                    res.end();
                } else {
                    res.send($.html());
                }
            } else {
                res.send($.html());
            }
        });
    };

    module.exports.adminLoginSubmit = function (req, res) {
        var data = req.body;
        var adminUser = db.collection('adminUser');
        adminUser.find(function (err, users) {
            if (err)
                throw err;
            var loginFound = false;
            for (var i = 0; i < users.length; i++) {
                //console.log("User: " + users[i].user);
                //console.log("Pass: " + users[i].pass);
                if (users[i].user === data.user && users[i].pass === data.pass) {
                    loginFound = true;
                }
            }
            if (loginFound) {
                //console.log("Login Found");
                var d = new Date();
                d.setTime(d.getTime() + 30 * 60 * 1000); // in milliseconds
                res.cookie("hoochgsa", {adminLogin: true}, {expires: d}); //7200000
                res.send(true);
            } else {
                console.log("Login Failed");
                //console.log("User: " + data.user);
                //console.log("Pass: " + data.pass);
                res.send(false);
            }
        });
    };

    module.exports.adminLoginFailHandle = function (url, res) {
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
            html += '<div id="flagDesc" class="ui attached segment">' +
            array[i].description +
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
        html += '<option value="ADD_ENTRY">--Add Entry--</option>';
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

