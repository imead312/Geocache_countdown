"use strict"

let countDownDate, countDownTime, timeUnits;

countDownDate = new Date("October 17, 2022 09:00:00")
countDownTime = countDownDate.getTime();

timeUnits = {
    months: {active: true, factor: null, value: 0, id: "mon", name: " months"},
    weeks: {active: true, factor: (1000 * 60 * 60 * 24 * 7), value: 0, id: "wks", name: " weeks"},
    days: {active: true, factor: (1000 * 60 * 60 * 24), value: 0, id: "day", name: " days"},
    hours: {active: true, factor: (1000 * 60 * 60), value: 0, id: "hrs", name: " hours"},
    minutes: {active: true, factor: (1000 * 60), value: 0, id: "min", name:  " minutes"},
    seconds: {active: true, factor: (1000), value: 0, id: "sec", name: " seconds"}
}

function updateTime () {

    var currentDate = new Date();
    var now = currentDate.getTime();
    var distance = countDownTime - now;

    console.log(now, distance);
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("debug").innerHTML = "We made it!"
    } else {
        Object.keys(timeUnits).forEach((key, index) => {

            let unit = timeUnits[key];

        
            if (unit.active) {

                
                if (unit.id == "mon") {
                    unit.value = (12 + countDownDate.getMonth() - currentDate.getMonth()) % 12;
                    // timeUnits.months.value = monthVal;
                    distance -= getDaysInMonths(currentDate, unit.value);

                } else {
                    unit.value = Math.floor(distance / unit.factor)
                    distance -= unit.value * unit.factor;
                }
                document.getElementById(unit.id).innerHTML = unit.value + unit.name            
            } 

            else {
                document.getElementById(unit.id).innerHTML = ""
            }
    
        })
    }
}
    



function getDaysInMonths(startDate, numberOfMonths) {
    // Calculate how many days in a span on months
    // and return the value in milliseconds
    console.log("start Get Days In Months (parent)")
    let year = startDate.getFullYear();
    let month = startDate.getMonth();
    let end = month + numberOfMonths
    let totalDays = 0;

    console.log(month);

    for (month; month < end; month++) {
        totalDays += getDaysInMonth(month, year);
    }

    return totalDays * 1000 * 60 * 60 * 24;;
}


function getDaysInMonth(month, year) {
    console.log("start Get Days In Month (child)")
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
    console.log(divID, state);
    
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
