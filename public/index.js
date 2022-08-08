"use strict"

let file, countDownDate, countDownTime;

countDownDate = new Date("October 17, 2022 09:00:00")
countDownTime = countDownDate.getTime();

function updateTime () {

    var currentDate = new Date();
    var now = currentDate.getTime();
    var distance = countDownTime - now;
    var months = countDownDate.getMonth() - currentDate.getMonth()
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // This is jank as hell, but it'll work for the 2 months leading up to the countdown finishing. 
    // Needs to be reimplemented before reusing
    if (months === 2) {
        days -= 61;
    } else if (months === 1) {
        days -= 30;
    }
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("debug").innerHTML = "We made it!"
    } else {
        document.getElementById("mon").innerHTML = months + " months"
        document.getElementById("day").innerHTML = days + " days"
        document.getElementById("hrs").innerHTML = hours + " hours"
        document.getElementById("min").innerHTML = minutes + " minutes"
        document.getElementById("sec").innerHTML = seconds + " seconds"
        // let rotate = "hue-rotate(" + seconds * 6 + "deg)"
        // document.getElementById("bday").innerHTML = rotate
        // document.getElementById("bdaydiv").setAttribute("filter", rotate)
    }
}


function getMonths(date) {
    currentMonth = date.getMonth()
    countDownMonth = countDownDate.getMonth()
    return countDownDate.getMonth() - currentDate.getMonth()
}

updateTime()
var x = setInterval(updateTime, 1000);
