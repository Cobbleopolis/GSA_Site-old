
var page = "";
var section= "";
var group = "";

function loadAdminPage(){
    $('#editor').ckeditor(); // Use CKEDITOR.replace() if element is <textarea>.
    $('#editable').ckeditor(); // Use CKEDITOR.inline().
    $('select.ui.dropdown').dropdown();
    $("#sectionHomeDropdown").parent().hide();
    $("#sectionFlagsDropdown").parent().hide();
    $("#sectionSexualityDropdown").parent().hide();
    $("#sectionRomanticDropdown").parent().hide();
    $("#sectionGenderDropdown").parent().hide();
    $("#sectionOtherDropdown").parent().hide();
}

function setValue() {
    $('#preview').html($('#editor').val());
}

function handlePageDropdownChange(sel){
    console.log(sel.value);
    var val = sel.value;
    page = val;
    if(val === "home"){
        $("#sectionHomeDropdown").parent().show();
        $("#sectionFlagsDropdown").parent().hide();
        $("#sectionSexualityDropdown").parent().hide();
        $("#sectionRomanticDropdown").parent().hide();
        $("#sectionGenderDropdown").parent().hide();
        $("#sectionOtherDropdown").parent().hide();
    }else if(val === "flags"){
        $("#sectionHomeDropdown").parent().hide();
        $("#sectionFlagsDropdown").parent().show();
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

function handleHomeSectionDropdownChange(sel){
    var val = sel.value;
}

function handleFlagSectionDropdownChange(sel){
    var val = sel.value;
    section = val;
    if(val === "sexuality"){
        section = "sexuality";
        $("#sectionSexualityDropdown").parent().show();
        $("#sectionRomanticDropdown").parent().hide();
        $("#sectionGenderDropdown").parent().hide();
        $("#sectionOtherDropdown").parent().hide();
    } else if(val === "romantic"){
        section = "romantic";
        $("#sectionSexualityDropdown").parent().hide();
        $("#sectionRomanticDropdown").parent().show();
        $("#sectionGenderDropdown").parent().hide();
        $("#sectionOtherDropdown").parent().hide();
    } else if(val === "gender"){
        section = "gender";
        $("#sectionSexualityDropdown").parent().hide();
        $("#sectionRomanticDropdown").parent().hide();
        $("#sectionGenderDropdown").parent().show();
        $("#sectionOtherDropdown").parent().hide();
    } else if(val === "other"){
        section = "other";
        $("#sectionSexualityDropdown").parent().hide();
        $("#sectionRomanticDropdown").parent().hide();
        $("#sectionGenderDropdown").parent().hide();
        $("#sectionOtherDropdown").parent().show();
    }
}

