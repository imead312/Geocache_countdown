"use strict"

let countDownDate, countDownTime, timeUnits;

countDownDate = new Date("October 17, 2022 09:00:00")
countDownTime = countDownDate.getTime();

timeUnits = {
    months: {active: true, factor: null, value: 0, id: "mon", name: " month"},
    weeks: {active: true, factor: (1000 * 60 * 60 * 24 * 7), value: 0, id: "wks", name: " week"},
    days: {active: true, factor: (1000 * 60 * 60 * 24), value: 0, id: "day", name: " day"},
    hours: {active: true, factor: (1000 * 60 * 60), value: 0, id: "hrs", name: " hour"},
    minutes: {active: true, factor: (1000 * 60), value: 0, id: "min", name:  " minute"},
    seconds: {active: true, factor: (1000), value: 0, id: "sec", name: " second"}
}

function updateTime () {

    let currentDate = new Date();
    let now = currentDate.getTime();
    let distanceRemaining = countDownTime - now;
    // let distance = distanceRemaining;
    
    if (distanceRemaining < 0) {
        clearInterval(x);
        document.getElementById("debug").innerHTML = "We made it!"
    } else {
        Object.keys(timeUnits).forEach((key, _) => {
            let unit = timeUnits[key];
            if (unit.active) {

                if (unit.id == "mon") {
                    
                    let fullMonth;
                    unit.value = currentDate.getMonth()

                    if (currentDate.getDate() < countDownDate.getDate()) {
                        if (currentDate.getDay)
                        fullMonth = true;
                    } else {
                        fullMonth = false;
                    }
                    let months = getDaysInMonths(currentDate, countDownDate, fullMonth);
                    console.log(months, fullMonth);
                    distance -= months[0];
                    unit.value = months[1];

                } else {
                    unit.value = Math.floor(distance / unit.factor);
                    distance -= unit.value * unit.factor;
                }
                
                if (unit.value > 0 || unit.id == "sec") {
                    document.getElementById(unit.id).innerHTML = unit.value + unit.name + (unit.value != 1 ? "s" : "");    
                } else {
                    console.log(unit.name + " value currently " + unit.value + ", hiding value.")
                    document.getElementById(unit.id).innerHTML = ""
                }
            } 

            else {
                document.getElementById(unit.id).innerHTML = ""
            }
        })
    }
}

function getDaysInMonths(startDate, endDate, fullStartMonth=true) {
    // Calculate how many days in a span of months
    // and return the value in milliseconds
    let year = startDate.getFullYear();
    let month = startDate.getMonth();
    let end = endDate.getMonth();
    let totalDays = 0;
    let totalMonths = 0;

    fullStartMonth ? month : month += 1;

    for (month; month < end; month++) {
        totalDays += getDaysInMonth(month, year);
        totalMonths += 1;
    }
    totalDays *= (1000 * 60 * 60 * 24)
    return [totalDays, totalMonths];
}


function getDaysInMonth(month, year) {
    let leapYear = 0;
    var days;

    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {        
        leapYear = 1;
        }

    if (month == 1) {
        days = 28 + leapYear;
    } else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
        days = 31;
    } else if ([3, 5, 8, 10].includes(month)) {
        days = 30;
    }
    return days
}


function changeButtonState(id) {

    let divID = '#' + id + 'Button'
    let state = timeUnits[id].active;
    
    if (state) {
        $(divID).removeClass('on')
        timeUnits[id].active = false
    } else {
        $(divID).addClass('on')
        timeUnits[id].active = true
    }

    updateTime();
}

updateTime();

var x = setInterval(updateTime, 1000);
