function loadPageIndex(){
    navMake();
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

function loadPageTest(){
    navMake();
    $(document).ready(function(){
        $('.demo.menu .item').tab({history:false});
    });
}