"use strict"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXZ3dMFPq0ns3ksi-6Q-Ycw_SLILvyj1g",
  authDomain: "imead-dev.firebaseapp.com",
  projectId: "imead-dev",
  storageBucket: "imead-dev.appspot.com",
  messagingSenderId: "171107527972",
  appId: "1:171107527972:web:06f7a98204280cf4b717b1",
  measurementId: "G-KHESD9MTLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let file, countDownDate, countDownTime;

function setBackground() {
    // Return a random image every time the page is reloaded
    let maxFileNumber = 135
    let fileNumber = Math.floor(Math.random() * maxFileNumber);
    let path = "url(images/perth" + fileNumber + ".jpg)";
    document.getElementById("main").style.backgroundImage = path;
}

setBackground()

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

