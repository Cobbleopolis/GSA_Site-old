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
                            window.location.replace("/admin/dash");
                        });
                    $(this).dialog("close");
                }
            }
        });

    });
}