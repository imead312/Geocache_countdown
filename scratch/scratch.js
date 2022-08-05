function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
asyncCall();

const data = {a: 1, b: 2, c:3}

function getData() {
    return new Promise((resolve) => data)
}

function display(data) {
    weather = data['weather'][0]['description']
    document.getElementById("test").innerHTML = weather
}

