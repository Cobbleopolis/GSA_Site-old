function loadAdminPage() {
    //$(function () {
    //    $("#dialog-form").dialog({
    //        dialogClass: "ui raised segment",
    //        autoOpen: true,
    //        modal: true
    //    });
    //
    //});

    $("#dialog-form").modal({
        onApprove : function() {
            submitLogin();
        }
    }).modal('show');
}

function submitLogin(){
    $.post("/admin/login", {user: $("#username").val(), pass: $("#password").val()})
        .done(function(data){
            window.location.replace("/admin/dash");
        });
    $(this).dialog("close");
}