import requests
import json


def getWeather():
    apiKey="4ce4cf62a72d099319391003cfaed376"
    city="Perth"
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}"
    return requests.get(url)


def getIcon(icon_code):
    url = f"https://openweathermap.org/img/wn/{icon_code}@2x.png"
    print(url)
    return requests.get(url)


def main():
    weather = getWeather()
    weather_json = json.loads(weather.text)
    current_icon = weather_json['weather'][0]['icon']
    print(current_icon)
    icon = getIcon(current_icon)

    
if __name__ == "__main__":
    main()
    

