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
                if (data[0]) {
                    setTimeout(function () {
                        $("#result").removeClass("red").addClass("green");
                        $("#result").html("<p>Fishbowl Submitted.</p><p>All fishbowls will be deleted on " + data[1] + ". If your fishbowl has not been answered or has not been cleared up then please resubmit after that date.</p>");
                        $("#result").show();
                    }, 250);
                    $("#name").val("");
                    $("#content").val("");
                    $("#triggers").val("");
                    $("#urgency").val("Not Urgent");
                } else {
                    setTimeout(function () {
                        $("#result").removeClass("green").addClass("red");
                        $("#result").html("<p>There was an error submitting your fishbowl.</p><p>Please try again later and/or inform one of the GSA officials.</p>");
                        $("#result").show();
                    }, 250);
                }
            });
    } else {
        $("#result").removeClass("green").addClass("red");
        $("#result").html("Please fill out at least the Fishbowl field.");
        $("#result").show();
    }
}