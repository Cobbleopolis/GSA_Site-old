var ids;

var currId;

function makeAdminFishbowl() {
    $("#answer").ckeditor();
    $.post("/admin/fishbowl/getIds")
        .done(function (data) {
            ids = data;
        });

    $("#fishbowlList").tablesort();
    $("#fishbowlDisplay").modal({
        onApprove : function() {
            $.post("/admin/fishbowl/mark", {id: currId}).done(function(data){
                $("#fishbowls").html(data);
            });
            //$("#fishbowlDisplayContentRight").html('<textarea cols="80" id="answer" rows="10" style="visibility: hidden; display: none;"></textarea>');
        }
    });

}

function showFishbowl(entryId) {
    var htmlLeft = '';
    var htmlRight = '';
    $.post("/admin/fishbowl", {id: entryId})
        .done(function (data) {
            if(data){
                htmlLeft += '<p><b>Name:</b>&nbsp;&nbsp;' + data.name + '</p>';
                htmlLeft += '<p><b>Submitted on:</b>&nbsp;&nbsp;' + data.date + '</p>';
                htmlLeft += '<p><b>Urgency:</b>&nbsp;&nbsp;' + data.urgency + '</p>';
                htmlLeft += '<p><b>Triggers:</b>&nbsp;&nbsp;' + data.triggers + '</p>';
                htmlLeft += '<p><b>Answered:</b>&nbsp;&nbsp;';

                if(data.isAnswered)
                    htmlLeft += "Yes";
                else
                    htmlLeft += "No";

                htmlLeft += '</p>';
                $("#fishbowlDisplayContentLeft").html(htmlLeft);

                //htmlRight += '<div class="ui top attached segment header">Fishbowl Question:</div><div class="ui bottom attached segment">';
                htmlRight += '<div class="ui top attached segment"><b>Fishbowl Question:</b></div><div class="ui bottom attached segment">';
                htmlRight += data.content;
                htmlRight += '</div>';
                currId = entryId;
                $("#fishbowlDisplayContentRightQuestion").html(htmlRight);
                $("#fishbowlDisplay").modal("show");
            } else {
                alert("There was a problem loading the fishbowl.");
            }
        });
}

function showRandFishbowl(){
    showFishbowl(ids[Math.floor(Math.random()*((ids.length - 1) +1 ))]);
}