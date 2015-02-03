var page = "";
var section = "";
var group = "";

function loadAdminPage() {
    $('#editor').ckeditor(); // Use CKEDITOR.replace() if element is <textarea>.
    $('#editable').ckeditor(); // Use CKEDITOR.inline().
    $('select.ui.dropdown').dropdown();
    $("#sectionHomeDropdown").hide();
    $("#sectionFlagsDropdown").hide();
    $("#sectionSexualityDropdown").hide();
    $("#sectionRomanticDropdown").hide();
    $("#sectionGenderDropdown").hide();
    $("#sectionOtherDropdown").hide();
    $("#result").hide();
}

function submitEdit() {
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
                    $('#editor').val(data);
                });
        }
    } else {
        $("#result").addClass("red");
        $("#result").html("Please select a page, section and a group (if available).");
        $("#result").show();
    }
}

function submitChange() {
    $.post("/admin", {page: page, section: section, group: group, editor: $('#editor').val()})
        .done(function (data) {
            $("#result").removeClass("red").addClass("green");
            $("#result").html("Changes Saved.");
            $("#result").show();
        });
}

function setValue() {
    $('#preview').html($('#editor').val());
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
    console.log(val);
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