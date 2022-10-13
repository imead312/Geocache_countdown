"use strict"

let destination, countdownDate, countdownTime, timeUnits;

destination = {
  location: "Perth",
  Perth: new Date("October 18, 2022 14:05:00"),
  Sydney: new Date("October 11, 2022 14:15:00"),
}

countdownDate = destination.Perth;
countdownTime = countdownDate.getTime();

timeUnits = {
    months: {active: true, factor: null, value: 0, id: "mon", name: " month"},
    weeks: {active: true, factor: (1000 * 60 * 60 * 24 * 7), value: 0, id: "wks", name: " week"},
    days: {active: true, factor: (1000 * 60 * 60 * 24), value: 0, id: "day", name: " day"},
    hours: {active: true, factor: (1000 * 60 * 60), value: 0, id: "hrs", name: " hour"},
    minutes: {active: true, factor: (1000 * 60), value: 0, id: "min", name:  " minute"},
    seconds: {active: true, factor: (1000), value: 0, id: "sec", name: " second"}
}


function getMonths(startDate, endDate) {
    let daysRemaining = Math.floor((endDate.getTime() - startDate.getTime())) / (1000 * 60 * 60 * 24);

    let totalDays = 0;
    let totalMonths = 0;

    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
        for (let month = startDate.getMonth(); month < endDate.getMonth(); month++) {
            if (year == endDate.getFullYear && month == endDate.getMonth()) {
                break
            } else {
                let monthsObj = getMonth(month, year, daysRemaining);
                daysRemaining = monthsObj.daysRemaining;
                if (monthsObj.months == 1) {
                    totalDays += monthsObj.days;
                }
                totalMonths += monthsObj.months;
            }
        }
    }

    return {months: totalMonths, days: totalDays}
}


function getMonth(month, year, daysRemaining) {
    let leapYear = 0;
    let monthCount = 0;
    let days = 0;

    if ((0 == year % 4) && ((0 != year % 100) || (0 == year % 400))) {        
        leapYear = 1;
        }

    if (month == 1) {
        days = 28 + leapYear;
    } else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
        days = 31;
    } else if ([3, 5, 8, 10].includes(month)) {
        days = 30;
    }

    if (days <= daysRemaining) {
        monthCount = 1;
        daysRemaining -= days;
    }

    return {months: monthCount, days: days, daysRemaining: Math.floor(daysRemaining)};
}


function updateTime () {

    let currentDate = new Date();
    let now = currentDate.getTime();

    let distance = countdownTime - now;
    
    if (distance < 0) {
      if (destination.location == "Perth") {
        clearInterval(x);
      }

        Object.keys(timeUnits).forEach((key, _) => {
          let unit = timeUnits[key];
          document.getElementById(unit.id).innerHTML = "";
        })

        document.getElementById("sec").innerHTML = "We made it!"
    } else {
        Object.keys(timeUnits).forEach((key, _) => {
            let unit = timeUnits[key];
            let monthObj = {};
            if (unit.active) {

                if (unit.id == "mon") {
                    
                    monthObj = getMonths(currentDate, countdownDate);
                    monthObj.days *= (1000 * 60 * 60 * 24);
                    unit.value = monthObj.months;
                    distance -= monthObj.days;
                } else {
                    unit.value = Math.floor(distance / unit.factor);
                    distance -= unit.value * unit.factor;
                }
                


                if (unit.value > 0 || unit.id == "sec") {
                    document.getElementById(unit.id).innerHTML = unit.value + unit.name + (unit.value != 1 ? "s" : "");    
                } else {
                    document.getElementById(unit.id).innerHTML = ""
                }
            } 

            else {
                document.getElementById(unit.id).innerHTML = ""
            }
        })
    }
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

function changeToggleState() {

  // let divID = '#location'
  let state = destination.location
  if (state == "Perth") {
    destination.location = "Sydney"
    countdownDate = destination.Sydney;
  } else {
    destination.location = "Perth"
    countdownDate = destination.Perth;
  }
  countdownTime = countdownDate.getTime();

  document.getElementById('location').innerHTML = destination.location

  updateTime();

}

updateTime();

var x = setInterval(updateTime, 1000);
