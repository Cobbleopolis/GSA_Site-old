function loadFishbowlPage() {
    $("#content").ckeditor(); // Use CKEDITOR.replace() if element is <textarea>.
    $("#result").hide();
}

function submitFishbowl() {
    $("#result").hide();
    var name = $("#name").val().replace(/&nbsp;/g,' ');
    var content = $("#content").val().replace(/&nbsp;/g,' ');
    var triggers = $("#triggers").val().replace(/&nbsp;/g,' ');
    var urgency = $("#urgency").val().replace(/&nbsp;/g,' ');
    if (name === "") {
        name = "Anonymous";
    }
    if (triggers === "") {
        triggers = "None";
    }
    if (content !== "") {
        $.post("/fishbowl/submit", {name: name, content: content, triggers: triggers,  urgency: urgency})
            .done(function (data) {
                if (data) {
                    setTimeout(function () {
                        $("#result").removeClass("red").addClass("green");
                        $("#result").html("Fishbowl Submitted.");
                        $("#result").show();
                    }, 250);
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
}