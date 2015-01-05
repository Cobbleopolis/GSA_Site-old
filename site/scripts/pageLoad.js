function loadPageIndex(){
    navMake();
}

function loadPageEvents(){
    navMake();
    document.getElementById("cal").height = window.innerHeight*0.95;
    document.getElementById("cal").width = window.innerWidth*0.9;
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