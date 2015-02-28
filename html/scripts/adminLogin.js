function loadAdminPage() {
    $("#loginErr").hide();
    $("#dialog-form").modal({
        onApprove : function() {
            submitLogin();
        }
    }).modal('show');
}

function submitLogin(){
    $("#loginErr").hide();
    $.post("/admin/login", {user: $("#username").val(), pass: $("#password").val()})
        .done(function(data){
            if(data !== false)
                window.location.replace("/admin/dash");
            else {
                $("#loginErr").html("Incorrect Login.");
                $("#loginErr").show();
            }
        });
    $(this).dialog("close");
}