function tgl1() {
    var t = document.getElementById("g1");
    if (t.value == "ON") {
        t.addEventListener("click", function () {
            t.className += " inactive";
            console.log(t.value)
        })
        t.value = "OFF";
        
        //console.log("unutra sam")
    }
    else if (t.value == "OFF"); {
        t.addEventListener("click", function (){
            t.className += " active";
            console.log(t.value)
        })
        t.value = "ON";
       // console.log("prvi sam")

    }
}

function tgl2() {
    var t = document.getElementById("g2");
    if (t.value == "ON") {
        t.addEventListener("click", function () {
            t.className += " inactive";
            console.log("ufunkciji")
        })
        t.value = "OFF";
        console.log("unutra sam")
    }
    else if (t.value == "OFF"); {
        t.addEventListener("click", function () {
            t.className += " active";
            console.log("ufunkciji")
        })
        t.value = "ON";
       // console.log("prvi sam")

    }
}

function tgl3() {
    var t = document.getElementById("g3");
    if (t.value == "ON") {
        t.addEventListener("click", function () {
            t.className += " inactive";
            console.log("ufunkciji")
        })
        t.value = "OFF";
        console.log("unutra sam")
    }
    else if (t.value == "OFF"); {
        t.addEventListener("click", function () {
            t.className += " active";
            console.log("ufunkciji")
        })
        t.value = "ON";
        console.log("prvi sam")

    }
}