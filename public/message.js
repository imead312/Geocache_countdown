const messageFlag = true
const styleOverride = true

const message = 'Rain, rain, go away.'

const fontSize = "6vw"

if (messageFlag) {
    document.getElementById("message").innerHTML = message
    if (styleOverride) {
        document.getElementById("message").style.fontSize = fontSize
    }
}
