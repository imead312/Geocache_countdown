const messageFlag = true
const styleOverride = true

const message = "Sorry about the covid.<br>I love you!"
const fontSize = "6vw"

if (messageFlag) {
    document.getElementById("message").innerHTML = message
    if (styleOverride) {
        document.getElementById("message").style.fontSize = fontSize
    }
}