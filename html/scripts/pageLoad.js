
function loadPageIndex(){
    //navMake();
    makeHomePage();
}

function loadPageEvents(){
    navMake();
}

function loadPageFlag(){
    navMake();
    showFlags();
    $(document).ready(function(){
        $('.demo.menu .item').tab({history:false});
    });
}

function loadPageChat(){
    navMake();
}

function loadPageTest(){
    navMake();
    $(document).ready(function(){
        $('.demo.menu .item').tab({history:false});
    });
}