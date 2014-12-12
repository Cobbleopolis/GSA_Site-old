
function showNav(){
    $('.left.demo.sidebar').sidebar('toggle');
}

function readTextFile(file){
    var allText = '';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status === 0){
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

// function replaceContentInContainer(matchID, content) {
//     document.getElementById(matchID).innerHTML = content;
// }

function navMake(){
    // var navBarHTML = readTextFile("resourcePages/navBar.html");
    document.getElementById("navBar").innerHTML = readTextFile("resorcePages/navBar.html");
    // var navButtonHTML = readTextFile("resourcePages/navButton.html");
    document.getElementById("navButton").innerHTML = readTextFile("resorcePages/navButton.html");
    
}