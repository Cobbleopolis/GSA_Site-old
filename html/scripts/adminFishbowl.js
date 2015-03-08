var ids;

var currId;

function makeAdminFishbowl() {
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

                htmlRight += '<div class="ui header">Fishbowl Question:</div>';
                htmlRight += data.content;
                currId = entryId;
                $("#fishbowlDisplayContentRight").html(htmlRight);
                $("#fishbowlDisplay").modal("show");
            } else {
                alert("There was a problem loading the fishbowl.");
            }
        });
}

function showRandFishbowl(){
    showFishbowl(ids[Math.floor(Math.random()*((ids.length - 1) +1 ))]);
}