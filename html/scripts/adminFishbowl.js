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

            htmlRight += '<div class="ui header">Fishbowl Question</div>';
            htmlRight += data.content;
            $("#fishbowlDisplayContentRight").html(htmlRight);
            $("#fishbowlDisplay").modal("show");
        });
}

function showRandFishbowl(){
    showFishbowl(ids[Math.floor(Math.random()*((ids.length - 1) +1 ))]);
}

//$.widget("ui.dialog", $.ui.dialog, {
//    options: {
//        clickOutside: false, // Determine if clicking outside the dialog shall close it
//        clickOutsideTrigger: "" // Element (id or class) that triggers the dialog opening
//    },
//
//    open: function () {
//        var clickOutsideTriggerEl = $(this.options.clickOutsideTrigger);
//        var that = this;
//
//        if (this.options.clickOutside) {
//            // Add document wide click handler for the current dialog namespace
//            $(document).on("click.ui.dialogClickOutside" + that.eventNamespace, function (event) {
//                if ($(event.target).closest($(clickOutsideTriggerEl)).length == 0 && $(event.target).closest($(that.uiDialog)).length == 0) {
//                    that.close();
//                }
//            });
//        }
//
//        this._super(); // Invoke parent open method
//    },
//
//    close: function () {
//        var that = this;
//
//        // Remove document wide click handler for the current dialog
//        $(document).off("click.ui.dialogClickOutside" + that.eventNamespace);
//
//        this._super(); // Invoke parent close method
//    }
//
//});