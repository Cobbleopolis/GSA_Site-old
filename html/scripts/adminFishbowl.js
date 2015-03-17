var ids;
var returnEmails;

var currId;

function makeAdminFishbowl() {
    $("#answer").ckeditor();
    $("#ansDesc").hide();
    $.post("/admin/fishbowl/getIds")
        .done(function (data) {
            ids = data;
        });

    $("#fishbowlList").tablesort();
    $("#fishbowlDisplay").modal({
        onApprove: function () {
            $.post("/admin/fishbowl/mark", {
                id: currId,
                ans: $("#answer").val().replace(/&nbsp;/g, ' ')
            }).done(function (data) {
                if (data === false)
                    alert("You need to fill out the Answer field before you can submit this fishbowl.");
                else {
                    $("#fishbowls").html(data);
                    $("#answer").val("");
                    $("#ansDesc").html("").hide();
                }
            });
        }
    });

}

function showFishbowl(entryId) {
    $("#ansDesc").html("").hide();
    var htmlLeft = '';
    var htmlRight = '';
    $.post("/admin/fishbowl", {id: entryId})
        .done(function (data) {
            if (data) {
                htmlLeft += '<p><b>Name:</b>&nbsp;&nbsp;' + data.name + '</p>';
                htmlLeft += '<p><b>Submitted on:</b>&nbsp;&nbsp;' + data.date + '</p>';
                htmlLeft += '<p><b>Urgency:</b>&nbsp;&nbsp;' + data.urgency + '</p>';
                htmlLeft += '<p><b>Triggers:</b>&nbsp;&nbsp;' + data.triggers + '</p>';
                htmlLeft += '<p><b>Answered:</b>&nbsp;&nbsp;';

                if (data.isAnswered)
                    htmlLeft += "Yes";
                else
                    htmlLeft += "No";

                htmlLeft += '</p>';
                $("#fishbowlDisplayContentLeft").html(htmlLeft);

                htmlRight += '<div class="ui top attached segment"><b>Fishbowl Question:</b></div><div class="ui bottom attached segment">';
                htmlRight += data.content;
                htmlRight += '</div>';
                currId = entryId;
                $("#answer").val("");
                if (data.returnEmail && data.isAnswered) {
                    $("#ansDesc").html("This fishbowl has already been answered.");
                    $("#ansDesc").show();
                    $("#answer").ckeditorGet().setReadOnly(true);
                } else if (!data.returnEmail) {
                    $("#ansDesc").html("No email was provided.");
                    $("#ansDesc").show();
                    $("#answer").ckeditorGet().setReadOnly(true);
                    $("#ansButton").html('Mark as answered<i class="checkmark icon">');
                } else {
                    $("#ansButton").html('Answer<i class="checkmark icon">');
                    $("#answer").ckeditorGet().setReadOnly(false);
                }
                $("#fishbowlDisplayContentRightQuestion").html(htmlRight);
                $("#fishbowlDisplay").modal("show");
            } else {
                alert("There was a problem loading the fishbowl.");
            }
        });
}

function showRandFishbowl() {
    showFishbowl(ids[Math.floor(Math.random() * ((ids.length - 1) + 1 ))]);
}