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
}

function submitEdit() {
    $.post("/admin/edit", { page: page, section: section, group: group});
}

function setValue() {
    $('#preview').html($('#editor').val());
}

function handlePageDropdownChange(sel) {
    var val = sel.value;
    page = val;
    if (val === "home") {
        section = $("#sectionHomeDropdown").val();
        $("#sectionHomeDropdown").show();
        $("#sectionFlagsDropdown").hide();
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "flags") {
        section = $("#sectionFlagsDropdown").val();
        $("#sectionHomeDropdown").hide();
        $("#sectionFlagsDropdown").show();
        if (section === "sexuality") {
            $("#sectionSexualityDropdown").show();
        } else if (section === "romantic") {
            $("#sectionRomanticDropdown").show();
        } else if (section === "gender"){
            $("#sectionGenderDropdown").show();
        } else if (section === "other"){
            $("#sectionOtherDropdown").show();
        }
    }
}

//$("#sectionFlagsDropdown").parent().css("visibility", "hidden");
//$("#sectionFlagsDropdown").css("height", "0");
//$("#sectionFlagsDropdown").parent().css("height", "0");
//$("#sectionHomeDropdown").parent().css("visibility", "visible");

//$("#sectionHomeDropdown").parent().css("visibility", "hidden");
//$("#sectionHomeDropdown").css("height", "0");
//$("#sectionHomeDropdown").parent().css("height", "0");
//$("#sectionFlagsDropdown").css("visibility", "visible");

function handleHomeSectionDropdownChange(sel) {
    var val = sel.value;
    section = val;
}

function handleFlagSectionDropdownChange(sel) {
    var val = sel.value;
    section = val;
    if (val === "sexuality") {
        section = "sexuality";
        $("#sectionSexualityDropdown").show();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "romantic") {
        section = "romantic";
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").show();
        $("#sectionGenderDropdown").hide();
        $("#sectionOtherDropdown").hide();
    } else if (val === "gender") {
        section = "gender";
        $("#sectionSexualityDropdown").hide();
        $("#sectionRomanticDropdown").hide();
        $("#sectionGenderDropdown").show();
        $("#sectionOtherDropdown").hide();
    } else if (val === "other") {
        section = "other";
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