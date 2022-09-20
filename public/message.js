const messageFlag = true
const styleOverride = true

const messages = [
    `"Daddy talk to mummy. I want say 'excuse me daddy'"`,
    `"I want push Daddy over in the snow. We could do that."`,
    `"Daddy put it Emma's black one new Google"`,
]

const message = messages[0]

const fontSize = "6vw"

if (messageFlag) {
    document.getElementById("message").innerHTML = message
    if (styleOverride) {
        document.getElementById("message").style.fontSize = fontSize
    }
}
