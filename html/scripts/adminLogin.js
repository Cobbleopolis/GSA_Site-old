function loadAdminPage() {
    $(function () {
        $("#dialog-form").dialog({
            dialogClass: "ui raised segment",
            autoOpen: true,
            modal: true
            //buttons: {
            //    "Login": function () {
            //
            //        //Do your code here
            //    }
            //}
        });

    });
}

function submitLogin(){
    $.post("/admin/login", {user: $("#username").val(), pass: $("#password").val()})
        .done(function(data){
            window.location.replace("/admin/dash");
        });
    $(this).dialog("close");
}