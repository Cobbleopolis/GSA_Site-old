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
                    console.log(username.val());
                    console.log(password.val());
                    $(this).dialog("close");
                }
            }
        });

    });
}