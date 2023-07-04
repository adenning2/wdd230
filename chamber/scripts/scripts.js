// Get current year and put it in the footer
document.querySelector("#date1").textContent = new Date().getFullYear();

// Get the last modification date and put it in the footer
document.querySelector("#lastmod").textContent = "Last updated: " + new Date(document.lastModified);

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");

}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;



// select the elements to manipulate (output to)
const datefieldUK = document.querySelector(".todayDate"); // for european/family history format with day first.

// derive the current date using a date object
const now = new Date();
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);
// long, medium, short options ... try them

datefieldUK.innerHTML = fulldateUK;

// display meeting banner if today is Monday or Tuesday
const meetingBanner = document.querySelector('#meetingBanner');
if(now.getDay() == 1 || now.getDay() == 2) {
    meetingBanner.setAttribute('class', 'visible');
}

//Lazyload images
//----------------------------------------------------------------------------
const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }

    img.src = src;
    img.removeAttribute("data-src");
} 

const imgOptions = {
    threshold: 1,
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});
//----------------------------------------------------------------------------

//Local Storage Visit Counter (All credits to Dean: https://codepen.io/josdea/pen/qaZgyJ)

function isLocalStorageSupported(){
    if (typeof Storage !== "undefined")
      //local storage is supported
      return true;
    else{
      //local storage is not supported
      return false;
    }
  }
  
  function doesVariableExist(x){
    if (localStorage[x]) {
      return true;
    }else{
      return false;
    }
  }
  
  function createStorageVariable(x, value){
    localStorage[x] = value
    return localStorage[x]
  }
  // execute functions only if window is discover.html
  if(window.location.pathname == "/discover.html" || window.location.pathname == "/chamber/discover.html") {
  if (isLocalStorageSupported){
    if(doesVariableExist('test')){
      localStorage.test = Number(localStorage.test) + 1
    }else{
      localStorage.test = 1
    }
    console.log(localStorage.test)
  }
  // localStorage.clear()
  if (typeof Storage !== "undefined") {
    //Local storage is supported
    if (localStorage.visitcount) {
      // variable exists for this site they've been here before so do things
      document.getElementById("visitCounter").innerHTML =
        "Hello there, you've been here " +
        localStorage.visitcount +
        " times before.";
      localStorage.visitcount = Number(localStorage.visitcount) + 1; //update variable for existing users
    } else {
      // variable not found they haven't been here before
      localStorage.visitcount = 1; //set initial value of variable for this site and then do things for first time
      document.getElementById("visitCounter").innerHTML =
        "This is your first time here! Welcome to the Discovery page.";
    }
  } else {
    // their browser doesn't support local storage so let them know or just do nothing
    alert(
      "Sorry, your browser does not support web storage.  Changes will not be saved"
    );
    document.getElementById("visitCounter").innerHTML =
      "Sorry, your browser does not support web storage...";
  }
}

// hidden input element stores the date the form in join.html is fully loaded if window is join.html
if(window.location.pathname == "/join.html" || window.location.pathname == "/chamber/join.html") {
  document.querySelector("#now").value = now;
}


// Directory.html card displayer:

const requestURL = 'data.json';
const cards = document.querySelector('.cards');
const table = document.querySelector('.companyList');

function displayCompanies(company) {
  // Create elements to add to the document
  let card = document.createElement('section');
    
  let name = document.createElement('h2');
  let image = document.createElement('img');
  let website = document.createElement('p');
  let phone = document.createElement('p'); 
  let address = document.createElement('p');
  
  // Change the textContent property of the h2 element to contain the prophet's full name
  name.textContent = `${company.name}`;
  website.innerHTML = `<a href="#">${company.website}</a>`;
  phone.innerHTML = `<b>Phone Number:</b> ${company.phone}`;
  address.innerHTML = `<b>Address:</b> ${company.address}`
  
  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
  image.setAttribute('src', company.imageurl);
  image.setAttribute('alt', `Photo of ${company.name}`);
  image.setAttribute('loading', 'lazy');
  
  // Add/append the section(card) with the h2 element
  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(website);
  card.appendChild(phone);
  card.appendChild(address);
  
  // Add/append the existing HTML div with the cards class with the section(card)
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

if(window.location.pathname == "/directory.html" || window.location.pathname == "/chamber/directory.html") {
  fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject);  // temporary checking for valid response and data parsing
    const companies = jsonObject['companies'];
    companies.forEach(displayCompanies);
    companies.forEach(listCompanies);
  });
// Display the directory either in cards or a list
function displayCards() {
  document.querySelector('.cards').style.display = 'grid';
  document.querySelector('.companyList').style.display = 'none';
}
function displayList() {
  document.querySelector('.cards').style.display = 'none';
  document.querySelector('.companyList').style.display = 'flex';
}
}

// Display three gold level companies in index.html spotlights
const spotlightImgs = document.querySelectorAll('img.spotlightImg');
const spotlightHeaders = document.querySelectorAll('h2.spotlightHeader');

function advertiseCompanies(company, header, image) {
  header.innerHTML = `Featured: ${company.name}`;
  image.setAttribute('src', company.imageurl);
  image.setAttribute('alt', `Photo of ${company.name}`);
  image.setAttribute('loading', 'lazy');
}
if(window.location.pathname == "/index.html" || window.location.pathname == "/chamber/index.html") {
fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    //console.table(jsonObject);  // temporary checking for valid response and data parsing
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
