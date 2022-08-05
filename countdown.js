
const maxFileNumber = 159

let countDownDate = new Date("October 17, 2022 09:00:00")
let countDownTime = countDownDate.getTime();

let apiKey = "4ce4cf62a72d099319391003cfaed376"

let api = `https://api.openweathermap.org/data/2.5/weather?q=?id=524901&appid=${apiKey}`


function getRandomFile(max) {
    // Return a random image every time the page is reloaded
    let fileNumber = Math.floor(Math.random() * max + 1);
    let path = "url(images/perth" + fileNumber + ".jpg)";
    return path;
}


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

    var timeString;
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("debug").innerHTML = "We made it!"
    } else {
        document.getElementById("mon").innerHTML = months + " months"
        document.getElementById("day").innerHTML = days + " days"
        document.getElementById("hrs").innerHTML = hours + " hours"
        document.getElementById("min").innerHTML = minutes + " minutes"
        document.getElementById("sec").innerHTML = seconds + " seconds"
        
    }
    //document.getElementById("debug").innerHTML = "Let's fucken go gang"

}


function getMonths(date) {
    currentMonth = date.getMonth()
    countDownMonth = countDownDate.getMonth()
    return countDownDate.getMonth() - currentDate.getMonth()


    //return months
}

let file = getRandomFile(maxFileNumber)

document.getElementById("main").style.backgroundImage= file


var x = setInterval(updateTime, 1000);

