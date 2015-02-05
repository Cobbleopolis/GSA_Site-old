var page = "";
var section = "";
var group = "";

function loadAdminPage() {
    $("#content").ckeditor(); // Use CKEDITOR.replace() if element is <textarea>.
    $("select.ui.dropdown").dropdown();
    $("#sectionHomeDropdown").hide();
    $("#sectionFlagsDropdown").hide();
    $("#sectionSexualityDropdown").hide();
    $("#sectionRomanticDropdown").hide();
    $("#sectionGenderDropdown").hide();
    $("#sectionOtherDropdown").hide();
    $("#result").hide();
    $(".pageToggle").hide();
    $("#contentLabel").show();
    $("#preview").hide();
    $("#previewDiv").hide();
}

function submitEdit() {
    $("#result").removeClass("red").addClass("green");
    $("#result").html("");
    $("#result").hide();
    if (page !== '' && section !== '' && group !== '') {
        if (page === 'flags' && group === 'none') {
            $("#result").addClass("red");
            $("#result").html("Please select a page, section and a group (if available).");
            $("#result").show();
        } else {
            $("#editSection").parent().removeClass("disabled").addClass("loading");
            $.post("/adminEdit/edit", {page: page, section: section, group: group})
                .done(function (data) {
                    $("#editSection").parent().removeClass("loading");
                    $("#preview").hide();
                    $("#previewDiv").hide();
                    if (page === "flags") {
                        $(".pageToggle").show();
                        $("#entryName").val(data.identification);
                        $("#content").val(data.description);
                        $("#flagImage").val(data.image_link);
                        if ($("#flagImage").val() === "") {
                            $("#previewImg").hide();
                        } else {
                            $("#previewImg").show();
                        }
                        $("#previewImg").attr("src", data.image_link);
                        $("#warning").val(data.warning);
                    } else if (page === "home") {
                        $(".pageToggle").hide();
                        $("#content").val(data.content);
                    }
                });
        }
    } else {
        $("#result").addClass("red");
        $("#result").html("Please select a page, section and a group (if available).");
        $("#result").show();
    }
}

function submitRemove() {
    if (page === "home") {
        $("#result").addClass("red");
        $("#result").html("Home page elements can not be removed.");
        $("#result").show();
    } else {
        var c = window.confirm("Are you sure you want to remove this entry?\nThis can not be undone.");
        if (c == true) {
            $("#result").removeClass("red").addClass("green");
            $("#result").html("");
            $("#result").hide();
            if (page !== '' && section !== '' && group !== '') {
                if (page === 'flags' && group === 'none') {
                    $("#result").addClass("red");
                    $("#result").html("Please select a page, section and a group (if available).");
                    $("#result").show();
                } else {
                    $.post("/adminEdit/remove", {page: page, section: section, group: group})
                        .done(function (data) {
                            group = "";
                            $("#sectionSexualityDropdown").html(data[0]);
                            $("#sectionRomanticDropdown").html(data[1]);
                            $("#sectionGenderDropdown").html(data[2]);
                            $("#sectionOtherDropdown").html(data[3]);
                            $("#result").removeClass("red").addClass("green");
                            $("#result").html("Changes Saved.");
                            $("#result").show();
                            $(".pageToggle").hide();
                            $("#preview").hide();
                            $("#editSection").parent().addClass("disabled");
                            $('body').scrollTop(0);
                        });
                }
            } else {
                $("#result").addClass("red");
                $("#result").html("Please select a page, section and a group (if available).");
                $("#result").show();
            }
        }
    }
}

function submitChange() {
    $.post("/adminEdit/change", {
        page: page,
        section: section,
        group: group,
        entryName: $("#entryName").val(),
        flagImage: $("#flagImage").val(),
        editor: $('#content').val(),
        warning: $("warning").val()
    })
        .done(function (data) {
            if (group === "ADD_ENTRY") {
                $("#sectionSexualityDropdown").html(data[0]);
                $("#sectionRomanticDropdown").html(data[1]);
                $("#sectionGenderDropdown").html(data[2]);
                $("#sectionOtherDropdown").html(data[3]);
            }
            $("#result").removeClass("red").addClass("green");
            $("#result").html("Changes Saved.");
            $("#result").show();
            $(".pageToggle").hide();
            $("#preview").hide();
            $("#editSection").parent().addClass("disabled");
            $('body').scrollTop(0);
        });
}

function setValue() {
    var html = "";
    if (page === "flags") {
        html = formatFlagPreview();
    } else if (page === "home") {
        html = formatHomePreview();
    }
    $("#preview").html(html);
    $("#previewDiv").show();
    $("#preview").show();
}

function formatFlagPreview() {
    var html = "";
    html += '<div class="flagEntry">' +
    '<div class="ui top attached header">' +
    '<p class="flagTitle">' + $("#entryName").val() + '</p>' +
    '</div>';
    if ($("#flagImage").val()) {
        html += '<div class="ui attached segment">' +
        '<img class="flagImg" src = "' + $("#flagImage").val() + '">' +
        '</div>';
    }
    html += '<div class="ui attached segment">' +
    '<p class="flagDesc">' + $("#content").val() + '</p>' +
    '</div>';
    if ($("#warning").val()) {
        html += '<div class="ui bottom attached warning message">' +
        '<i class="warning sign icon"></i>' + $("#warning").val() +
        '</div>';
    }
    html += '</div>';
    return html;
}

function formatHomePreview() {
    var html = "";
    if (section === "summary") {
        html += '<div id="summery" class="ui red segment"><p class="segment_title">Summary</p>';
    } else if (section === "about") {
        html += '<div id="summery" class="ui orange segment"><p class="segment_title">About Us</p>';
    } else if (section === "meetings") {
        html += '<div id="summery" class="ui green segment"><p class="segment_title">About Our Meetings</p>';
    } else if (section === "fishbowl") {
        html += '<div id="summery" class="ui blue segment"><p class="segment_title">Fishbowl</p>';
    }
    html += '<div class="ui inverted clearing divider"></div><p class="content_paragraph" id="summary_content">' + $("#content").val() + '</p></div>';
    return html;
}

function handlePageDropdownChange(sel) {
    var val = sel.value;
    page = val;
    if (val === "home") {
        section = $("#sectionHomeDropdown").val();
        group = "none";
        $("#sectionHomeDropdown").show();
        $("#sectionFlagsDropdown").hide();
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "flags") {
        section = $("#sectionFlagsDropdown").val();
        //hideShowFlagGroup(val);
        $("#sectionHomeDropdown").hide();
        $("#sectionFlagsDropdown").show();
        if (section === "sexualities") {
            $("#sectionSexualityDropdown").show();
            group = $("#sectionSexualityDropdown").val();
        } else if (section === "romantic") {
            $("#sectionRomanticDropdown").show();
            group = $("#sectionRomanticDropdown").val();
        } else if (section === "gender") {
            $("#sectionGenderDropdown").show();
            group = $("#sectionGenderDropdown").val();
        } else if (section === "other_terms") {
            $("#sectionOtherDropdown").show();
            group = $("#sectionOtherDropdown").val();
        }
    }
}

function handleHomeSectionDropdownChange(sel) {
    var val = sel.value;
    section = val;
    group = "none";
}

function handleFlagSectionDropdownChange(sel) {
    var val = sel.value;
    section = val;
    hideShowFlagGroup(val);
}

function hideShowFlagGroup(val) {
    if (val === "sexualities") {
        $("#sectionSexualityDropdown").show();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "romantic") {
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").show();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "gender") {
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").show();
        $("#sectionOtherDropdown").hide();
    } else if (val === "other_terms") {
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").show();
    }
}

function handleGroupDropdownChange(sel) {
    var val = sel.value;
    group = val;
}

function updateFlagImg(sel) {
    if (sel.value === "") {
        $("#previewImg").hide();
    } else {
        $("#previewImg").show();
    }
    $("#previewImg").attr("src", sel.value);
}