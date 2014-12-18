function loadPageIndex(){
    navMake();
}

function loadPageFlag(){
    navMake();
    showFlags();
    // $.getJSON("http://spreadsheets.google.com/feeds/list/12fWXwKd4Ta7scHhuU4o3RSUWNGZinF8pmOjIso3Ee8s/od6/public/values?alt=json", function(data) {
    //     //first row "title" column
    //     console.log(JSON.stringify(data));
    // });
}