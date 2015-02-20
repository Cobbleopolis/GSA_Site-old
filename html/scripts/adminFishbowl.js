var ids;

function makeAdminFishbowl() {
    $.post("/admin/fishbowl/getIds")
        .done(function (data) {
            ids = data;
        });
    $("#fishbowlList").tablesort();

    $("#fishbowlDisplay").modal({
        onApprove : function() {

        }
    });

}

function showFishbowl(entryId) {
    var htmlLeft = '';
    var htmlRight = '';
    //$("#fishbowlDisplay").addClass("loading");
    //$("#fishbowlDisplay").dialog('open');
    $.post("/admin/fishbowl", {id: entryId})
        .done(function (data) {
            htmlLeft += '<p><b>Name:</b>&nbsp;&nbsp;' + data.name + '</p>';
            htmlLeft += '<p><b>Submitted on:</b>&nbsp;&nbsp;' + data.date + '</p>';
            htmlLeft += '<p><b>Urgency:</b>&nbsp;&nbsp;' + data.urgency + '</p>';
            htmlLeft += '<p><b>Triggers:</b>&nbsp;&nbsp;' + data.triggers + '</p>';
            $("#fishbowlDisplayContentLeft").html(htmlLeft);

            htmlRight += '<div class="ui header">Fishbowl Question (Ask Heath what should go here)</div>';
            htmlRight += data.content;
            $("#fishbowlDisplayContentRight").html(htmlRight);
            $("#fishbowlDisplay").modal("show");
        });
}

function showRandFishbowl(){
    showFishbowl(ids[Math.floor(Math.random()*((ids.length - 1) +1 ))]);
}