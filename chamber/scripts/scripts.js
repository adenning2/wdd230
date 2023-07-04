// TODAYS DATE
const now = new Date();
const datefield = document.querySelector(".todayDate");
const fulldate = new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(now);
datefield.innerHTML = fulldate;

// MEETING BANNER DISPLAYS M/T
const meetingBanner = document.querySelector('#meetingBanner');
if(now.getDay() == 1 || now.getDay() == 2) {
    meetingBanner.setAttribute('class', 'visible');
}

// NAV SWITCH
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

// FOOTER
document.querySelector("#date1").textContent = new Date().getFullYear();
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);

// LAZYLOAD SCRIPT
const images = document.querySelectorAll("[data-src]");
function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
  img.removeAttribute("data-src");
} 
const imgOptions = {threshold: 1,};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  })
}, imgOptions);
images.forEach(image => {
  imgObserver.observe(image);
});

// AUX PAGE SPECIFIC JS BEGINS

// DEAN'S LOCAL STORAGE VISIT COUNTER https://codepen.io/josdea/pen/qaZgyJ
function isLocalStorageSupported(){
  if (typeof Storage !== "undefined"){
    // SUPPORTED CASE
    return true;
  }
  else {
    // UNSUPPORTED CASE
    return false;
  }
}
function doesVariableExist(x){
  if (localStorage[x]) {
    return true;
  }
  else {
    return false;
  }
}
function createStorageVariable(x, value){
  localStorage[x] = value
  return localStorage[x]
}

// ENTERS IF PAGE IS DISCOVER.HTML
if(window.location.pathname == "/wdd230/chamber/discover.html" || window.location.pathname == "/chamber/discover.html") {
  if (isLocalStorageSupported){
    if(doesVariableExist('test')){
      localStorage.test = Number(localStorage.test) + 1
    }
    else{
      localStorage.test = 1
    }
    console.log(localStorage.test)
  }
  if (typeof Storage !== "undefined") {
    // SUPPORTED CASE
    if (localStorage.visitcount) {
      // EXISTS
      document.getElementById("visitCounter").innerHTML = "Hello there, you've been here " + localStorage.visitcount + " times before.";
      localStorage.visitcount = Number(localStorage.visitcount) + 1;
    }
    else {
      // DOES NOT EXIST
      localStorage.visitcount = 1;
      document.getElementById("visitCounter").innerHTML = "This is your first time here! Welcome to the Discovery page.";
    }
  }
  else {
    // UNSUPPORTED CASE
    alert("Your web browser does not support web storage. Some functions of the website may be disabled.");
    document.getElementById("visitCounter").innerHTML = "Your web browser does not support web storage. Some functions of the website may be disabled.";
  }
}

// ENTERS IF PAGE IS JOIN.HTML
if(window.location.pathname == "/wdd230/chamber/join.html" || window.location.pathname == "/chamber/join.html") {
  document.querySelector("#now").value = now;
}

// DIRECTORY.HTML CARDS
const requestURL = 'data.json';
const cards = document.querySelector('.cards');
const table = document.querySelector('.companyList');
function displayCompanies(company) {
  let card = document.createElement('section');
  let name = document.createElement('h2');
  let image = document.createElement('img');
  let website = document.createElement('p');
  let phone = document.createElement('p'); 
  let address = document.createElement('p');
  // POPULATE DATA
  name.textContent = `${company.name}`;
  website.innerHTML = `<a href="#">${company.website}</a>`;
  phone.innerHTML = `<b>Phone Number:</b> ${company.phone}`;
  address.innerHTML = `<b>Address:</b> ${company.address}`
  image.setAttribute('src', company.imageurl);
  image.setAttribute('alt', `Photo of ${company.name}`);
  image.setAttribute('loading', 'lazy');
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(website);
  card.appendChild(phone);
  card.appendChild(address);
  cards.appendChild(card);
}
function listCompanies(company){
  row = table.insertRow();
  nameCell = row.insertCell();
  websiteCell = row.insertCell();
  phoneCell = row.insertCell();
  addressCell = row.insertCell();
  nameCell.textContent = company.name;
  websiteCell.innerHTML = `<a href="#">${company.website}</a>`;
  phoneCell.textContent = company.phone;
  addressCell.textContent = company.address;
}
// ENTERS IF THE PAGE IS DIRECTORY.HTML
if(window.location.pathname == "/wdd230/chamber/directory.html" || window.location.pathname == "/chamber/directory.html") {
  fetch(requestURL)
  .then(function (response) {return response.json();})
  .then(function (jsonObject) {
    const companies = jsonObject['companies'];
    companies.forEach(displayCompanies);
    companies.forEach(listCompanies);
  });
  // CARDS VS LIST OPTIONS
  function displayCards() {
    document.querySelector('.cards').style.display = 'grid';
    document.querySelector('.companyList').style.display = 'none';
  }
  function displayList() {
    document.querySelector('.cards').style.display = 'none';
    document.querySelector('.companyList').style.display = 'flex';
  }
}

// INDEX PAGE SPOTLIGHTS
const spotlightImgs = document.querySelectorAll('img.spotlightImg');
const spotlightHeaders = document.querySelectorAll('h2.spotlightHeader');
function advertiseCompanies(company, header, image) {
  header.innerHTML = `Featured: ${company.name}`;
  image.setAttribute('src', company.imageurl);
  image.setAttribute('alt', `Photo of ${company.name}`);
  image.setAttribute('loading', 'lazy');
}
// ENTERS IF PAGE IS INDEX.HTML
if(window.location.pathname == "/wdd230/chamber/index.html" || window.location.pathname == "/chamber/index.html") {
  fetch(requestURL)
  .then(function (response) {return response.json();})
  .then(function (jsonObject) {
    const companies = jsonObject['companies'];
    let i = 0;
    for(let j = 0; j < companies.length; j++) {
      if(companies[j].membershipLevel == "gold" && i < 3) {
        advertiseCompanies(companies[j], spotlightHeaders[i], spotlightImgs[i]);
        i++;
      }
    }
  });
}