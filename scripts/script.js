const url = 'https://wttr.in/aruba?format=+%c+%t 💧 %p %w';

function getWeather() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.readyState == 4 && req.status == '200') {
        const weather = document.getElementById('weather');
        weather.innerHTML = req.response;
      }
    }
  }
  req.open('GET', url, true);
  req.send();
}

function getArubaTime() {
  let Arubatijd = document.getElementById('ArubaTijd');
  let d = new Date();
  let hours = d.getHours();
  let minutes =  d.getMinutes();
  Arubatijd.innerHTML = "Lokale Tijd: " + (hours-5) + ':' + (minutes>10?minutes:'0'+minutes);
}

function loadJSON(callback) {
  const req = new XMLHttpRequest();
  req.overrideMimeType('application/json');
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.readyState == 4 && req.status == '200') {
        callback(req.responseText);
      }
    }
  }
  req.open('GET', 'quotes.json', true );
  req.send(null);
}

function setGreeting() {
  let element = document.getElementById('title');
  let d = new Date();
  let time = d.getHours();
  let naam = "Aruba liefhebber"


  if (time >= 6 && time < 12) {
    element.innerHTML = 'Good morning ' + naam + '!';
  }
  if (time >= 12 && time < 13) {
    element.innerHTML= 'Go eat lunch ' + naam + '!';
  }
  if (time >= 13 && time < 18) {
    element.innerHTML = 'Good afternoon ' + naam + '!';
  }
    if (time >= 18 && time < 24) {
    element.innerHTML = 'Good evening ' + naam + '!';
  }
  if (time >= 0 && time < 6) {
    element.innerHTML = 'Good night ' + naam + '!';
  }
}

function setImg() {
  let a = Math.floor(Math.random() * 2);
  document.getElementById('pict').src = `gifs/${a}.webp`;
}

setGreeting();
getWeather();
setInterval(getArubaTime, 1000);
setImg();
loadJSON((response) => {
  let quotes = JSON.parse(response);
  let randomElement = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote').innerHTML = randomElement.quote;
  document.getElementById('author').innerHTML = randomElement.author || randomElement.source;
})