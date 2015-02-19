function makeAdminFishbowl() {
    $("#fishbowlList").tablesort();

    $("#fishbowlDisplay").dialog({
        //title: "Fishbowl",
        dialogClass: "ui raised segment",
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 150
        },
        hide: {
            effect: "fade",
            duration: 150
        },
        // Add the 2 options below to use click outside feature
        clickOutside: true, // clicking outside the dialog will close it
        clickOutsideTrigger: ".showFishbowl"  // Element (id or class) that triggers the dialog opening
    });

}

function showFishbowl(entryId) {
    //console.log(entryIndex);
    $("#fishbowlDisplay").html('<div class="ui active loader"></div>');
    $("#fishbowlDisplay").dialog('open');
    $.post("/admin/fishbowl", {id: entryId})
        .done(function(data){
            console.log(data);
        });
}

$.widget( "ui.dialog", $.ui.dialog, {
    options: {
        clickOutside: false, // Determine if clicking outside the dialog shall close it
        clickOutsideTrigger: "" // Element (id or class) that triggers the dialog opening
    },

    open: function() {
        var clickOutsideTriggerEl = $( this.options.clickOutsideTrigger );
        var that = this;

        if (this.options.clickOutside){
            // Add document wide click handler for the current dialog namespace
            $(document).on( "click.ui.dialogClickOutside" + that.eventNamespace, function(event){
                if ( $(event.target).closest($(clickOutsideTriggerEl)).length == 0 && $(event.target).closest($(that.uiDialog)).length == 0){
                    that.close();
                }
            });
        }

        this._super(); // Invoke parent open method
    },

    close: function() {
        var that = this;

        // Remove document wide click handler for the current dialog
        $(document).off( "click.ui.dialogClickOutside" + that.eventNamespace );

        this._super(); // Invoke parent close method
    }

});