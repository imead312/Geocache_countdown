const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok)
        throw new Error(response.statusText);
    
    return await response.json();
}

const displayWeather = async data => {
    console.log(JSON.stringify(data, null, 8));
    let temp = data["main"]["temp"];
    let weather = data["weather"][0];
    let main = weather['main'];
    let description = weather['description'];
    let iconID = weather['icon']
    let iconUrl = getIconUrl(iconID);

    constructIconID(iconID);

    document.getElementById("temp").innerHTML = Math.floor(temp - 273) + " \u00B0C";
    document.getElementById("weather").innerHTML = description;
    
    getIconUrl(weather['icon']).then(
        (iconURL) => {
            document.getElementById("weatherIcon").setAttribute('src', iconURL);
    }).catch(error => {console.error(error)})
        
}

function constructIconID (iconID) {
    
    const splitID = iconID.match(/[a-zA-Z]+|[0-9]+/g)

    // if (true) {
    //     var splitID = ['d', '1'];
    // } else {
    //     var splitID = ['0', 'n'];
    // }
    
    let codeIndex = (1 * isNaN((splitID[0])));
    let dayIndex = 1 - codeIndex;

}


const getIconUrl = async iconID => {
    return `https://openweathermap.org/img/wn/${iconID}@2x.png` 
}

const updateIconStyle = async => {
    
}

let apiKey = "4ce4cf62a72d099319391003cfaed376"
let city = "Perth"
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
getJSON(url).then((data) => displayWeather(data)).catch(error => {console.error(error)});
