function setBackground() {
  // Return a random image every time the page is reloaded
  let maxFileNumber = 135;
  let fileNumber = Math.floor(Math.random() * maxFileNumber);
  let path = "url(images/perth" + fileNumber + ".jpg)";
  document.getElementById("main").style.backgroundImage = path;
}

setBackground();
