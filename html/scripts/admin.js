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
}

function submitEdit() {
    $("#editSection").parent().removeClass("disabled").addClass("loading");
    $("#result").removeClass("red").addClass("green");
    $("#result").html("");
    $("#result").hide();
    if (page !== '' && section !== '' && group !== ''){
        if(page === 'flags' && group === 'none'){
            $("#result").addClass("red");
            $("#result").html("Please select a page, section and a group (if available).");
            $("#result").show();
        } else {
            $.post("/admin/edit", {page: page, section: section, group: group})
                .done(function (data) {
                    $("#editSection").parent().removeClass("loading");
                    if(page === "flags"){
                        $(".pageToggle").show();
                        $("#entryName").val(data.identification);
                        $("#content").val(data.description);
                        $("#flagImage").val(data.image_link);
                        $("#previewImg").attr("src", data.image_link);
                        $("#warning").val(data.warning);
                    } else if (page === "home"){
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

function submitChange() {
    $.post("/admin", {page: page, section: section, group: group, entryName: $("#entryName").val(), flagImage: $("#flagImage").val(), editor: $('#content').val(), warning: $("warning").val()})
        .done(function (data) {
            $("#result").removeClass("red").addClass("green");
            $("#result").html("Changes Saved.");
            $("#result").show();
            $('body').scrollTop(0);
        });
}

function setValue() {
    $("#preview").html($("#content").val());
    $("#preview").show();
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

function hideShowFlagGroup(val){
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

function updateFlagImg(sel){
    $("#previewImg").attr("src", sel.value);
}