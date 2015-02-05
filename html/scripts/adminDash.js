function loadAdminPage() {
    $.post("/admin/dash", {user: $("#username").val(), pass: $("#password").val()})
        .done(function(data){

        });
}