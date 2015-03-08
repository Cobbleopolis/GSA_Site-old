function makeAdminAccounts() {
    $("#accountErr").hide();
    $("#accounts").tablesort();
    $("#userDisplay").modal({
        onApprove: function () {
            $.post("/admin/accounts/save", {
                id: $("#userContentID").html(),
                user: $("#userContentUsername").html(),
                pass: $("#userContentPassword").val()
            })
                .done(function (data) {
                    $("#userBody").html(data);
                    $("#userDisplay").modal("hide");
                });
        }
    });
    $("#addUserDisplay").modal();
}

function editUser(id) {
    $.post("/admin/accounts", {id: id})
        .done(function (data) {
            $("#userContentUsername").html(data.user);
            $("#userContentPassword").val(data.pass);
            $("#userContentID").html(data.id);
            $("#userDisplay").modal("show");
        });
}

function addUser() {
    $("#accountErr").hide();
    $.post("/admin/accounts/save", {user: $("#addUserContentUsername").val(), pass: $("#addUserContentPassword").val()})
        .done(function (data) {
            if(data !== false){
                $("#userBody").html(data);
                $("#addUserDisplay").modal("show");
            } else {
                $("#accountErr").html("There was a problem creating the account. Please make sure that the username is not the same as any of the other usernames.");
                $("#accountErr").show();
            }
        });
}

function deleteUser() {
    var c = window.confirm("Are you sure you want to delete this account?\nThis can not be undone.");
    if (c)
        $.post("/admin/accounts/delete", {
            id: $("#userContentID").html(),
            user: $("#userContentUsername").html(),
            pass: $("#userContentPassword").val()
        })
            .done(function (data) {
                $("#userBody").html(data);
                $("#userDisplay").modal("hide");
            });
}
