function loadAdminPage() {
    $(function () {
        $("#dialog-form").dialog({
            autoOpen: true,
            modal: true,
            buttons: {
                "Login": function () {
                    var username = $("#username");
                    var password = $("#password");

                    //Do your code here
                    $.post("/admin/login", {user: $("#username").val(), pass: $("#password").val()})
                        .done(function(data){

                        });
                    $(this).dialog("close");
                }
            }
        });

    });
}