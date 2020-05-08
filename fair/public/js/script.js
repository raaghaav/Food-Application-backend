const spandetector = document.getElementById('span-detector');
window.addEventListener('load', function () {
  const client = ['EVERYONE', 'FITNESS FREAKS', 'DEVELOPERS', 'VEGANS'];
  typewriter(spandetector, client);
});

function typewriter(spandetector, client) {
  let txt = ''; // assuming text is empty in beginning  i.e  text length is 0 in beginning
  let wordindex = 0; // wordindex is from clients
  let isDeleting = false;

  function typer() {
    let wait = 50;
    wordindex = wordindex % client.length;
    let word = client[wordindex]; // word nikal raha hoon clients array se

    if (isDeleting == true) {
      txt = word.substring(0, txt.length - 1);
    } else {
      txt = word.substring(0, txt.length + 1); // suppose "Everyone" main 0 se 1, i.e E (first case)
    }
    if (spandetector) {
      // added this check b/c it is giving null => if features are present then only this will apply, before it was always applying, now only if features are there then
      // this check will be applied to element selected using DOM
      spandetector.textContent = txt;
      const largePause = 2000;

      if (isDeleting == true && txt == '') {
        wordindex++;
        isDeleting = false;
      } else if (isDeleting == false && txt.length == word.length) {
        isDeleting = true;
        wait = largePause;
      }
    }
    setTimeout(function () {
      typer();
    }, wait);
  }

  typer();
}

const nav = document.querySelector('nav');
const features = document.querySelector('.features');

window.addEventListener('scroll', function () {
  if (features) {
    // added this check b/c it is giving null => if features are present then only this will apply, before it was always applying, now only if features are there then
    let pos = features.getBoundingClientRect().top;
    if (pos < 0) {
      nav.setAttribute('class', 'sticky');
    } else {
      nav.removeAttribute('class', 'sticky');
    }
  }
});
