
document.getElementById('language-select').addEventListener('change', function () {
  const selected = this.options[this.selectedIndex];
  if (selected.value === 'en') {
    window.location.href = 'https://buserthomas.ch';
  } else if (selected.value === 'de') {
    window.location.href = 'https://buserthomas.ch/de/';
  } else if (selected.value === 'es') {
    window.location.href = 'https://buserthomas.ch/es/';
  } else if (selected.dataset.href) {
    window.location.href = selected.dataset.href;
  }
});

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length); 
    }
  }
  return "";
}

function detectLanguageAndRedirect() {
  if (getCookie("langRedirectDone") === "true") {
    return;
  }
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith('es')) {
    setCookie("langRedirectDone", "true", 7);
    window.location.href = 'https://buserthomas.ch/es/';
  } else if (lang.startsWith('de')) {
    setCookie("langRedirectDone", "true", 7);
    window.location.href = 'https://buserthomas.ch/de/';
  }
}
detectLanguageAndRedirect();

