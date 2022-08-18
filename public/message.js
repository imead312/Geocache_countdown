const messageFlag = true
const styleOverride = true

const message = `"Daddy put it Emma's black one new Google"`

const fontSize = "6vw"

if (messageFlag) {
    document.getElementById("message").innerHTML = message
    if (styleOverride) {
        document.getElementById("message").style.fontSize = fontSize
    }
}
