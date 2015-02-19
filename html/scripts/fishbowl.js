function loadFishbowlPage() {
    $("#content").ckeditor(); // Use CKEDITOR.replace() if element is <textarea>.
    $("#result").hide();
}

function submitFishbowl() {
    var name = $("#name").val();
    var content = $("#content").val();
    var triggers = $("#triggers").val();
    var urgency = $("#urgency").val();
    if (name === "") {
        name = "Anonymous";
    }
    if (content !== "") {
        $.post("/fishbowl/submit", {name: name, content: content, triggers: triggers,  urgency: urgency})
            .done(function (data) {
                if (data) {
                    $("#result").removeClass("red").addClass("green");
                    $("#result").html("Fishbowl Submitted.");
                    $("#result").show();
                    $("#name").val("");
                    $("#content").val("");
                    $("#triggers").val("");
                    $("#urgency").val("Not Very Urgent");
                }
            });
    } else {
        $("#result").removeClass("green").addClass("red");
        $("#result").html("Please fill out at least the Fishbowl field.");
        $("#result").show();
    }
    //}
}