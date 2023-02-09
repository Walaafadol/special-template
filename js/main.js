// open setting box
let gearicon = document.querySelector(".fa-gear");
let settingbox = document.querySelector(".setting-box");
gearicon.onclick = function () {
  gearicon.classList.toggle("fa-spin");
  settingbox.classList.toggle("opend");
};
let backgroundoption = true;
let backgroundinterv;
// changing color

// check local strorge
if (localStorage.getItem("colorOption") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("colorOption")
  );
  // check local storage background options
  if (localStorage.getItem("randombackground") != null) {
    if (localStorage.getItem("randombackground") == "yes") {
      backgroundoption = true;
    } else {
      backgroundoption = false;
    }
  }
  // remove active class from all lists
  document.querySelectorAll(".color-lists li").forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color == localStorage.getItem("colorOption")) {
      li.classList.add("active");
    }
  });
}
// remove active class from all span in local storage
document.querySelectorAll(".background-option span").forEach((ele) => {
  ele.classList.remove("active");

  if (localStorage.getItem("randombackground") == "no") {
    document.querySelector(".no").classList.add("active");
  } else {
    document.querySelector(".yes").classList.add("active");
  }
});

let colorList = document.querySelectorAll(".color-lists li");
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // remove active class from all lists
    removeactive(colorList);
    // change color in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // add color to localStorage
    localStorage.setItem("colorOption", e.target.dataset.color);
  });
});

// remove active class from  random background options

let backgroptions = document.querySelectorAll(".background-option span");

backgroptions.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    backgroptions.forEach((even) => {
      even.classList.remove("active");
    });
    e.target.classList.add("active");

    // removeactive(backgroptions);

    // background check
    localStorage.setItem("randombackground", e.target.dataset.background);
    if (e.target.dataset.background == "yes") {
      backgroundoption = true;
      changebackground();
    } else {
      backgroundoption = false;
      clearInterval(backgroundinterv);
    }
  });
});
function removeactive(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      element.forEach((even) => {
        even.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

let landingpage = document.querySelector(".landing-page");
let imagearray = ["background2.jpg", "background3.jpg", "background4.jpg"];
landingpage.style.backgroundImage = 'url("images/background2.jpg")';

if (backgroundoption == true) {
  function changebackground() {
    backgroundinterv = setInterval(function () {
      let random = Math.floor(Math.random() * imagearray.length);
      landingpage.style.backgroundImage = `url("images/${imagearray[random]}")`;
    }, 10000);
  }
}
changebackground();

// start ourskills scroll
let ourskills = document.querySelector(".our-skills");
window.onscroll = function () {
  // skills outer height
  let skillouterheight = ourskills.offsetHeight;
  // skills offset top
  let skilloffsettop = ourskills.offsetTop;
  // window height
  let windowheight = this.innerHeight;
  //   window scroll top
  let windowscrooltop = this.pageYOffset;
  if (windowscrooltop > skilloffsettop + skillouterheight - windowheight) {
    let skills = document.querySelectorAll(".our-skills span");
    skills.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// start image gallery
let image = document.querySelectorAll(".gallery-box img");
image.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    // create popup box
    let popupbox = document.createElement("div");
    popupbox.className = "popupbox";
    // create address for image
    let address = document.createElement("div");
    address.className = "adress";
    if (e.target.alt != "") {
      address.appendChild(document.createTextNode(e.target.alt));
      popupbox.appendChild(address);
    }
    // create popup image
    let popupimg = document.createElement("img");
    popupimg.src = img.src;
    popupbox.appendChild(popupimg);
    document.body.appendChild(popupbox);
    // create close span
    let closespan = document.createElement("span");
    closespan.appendChild(document.createTextNode("x"));
    popupbox.appendChild(closespan);
    closespan.className = "closespan";
    closespan.onclick = function () {
      popupbox.style.display = "none";
      overlay.style.display = "none";
    };
  });
});

// start boulltes
let boulltes = document.querySelectorAll(".points");

let links = document.querySelectorAll(".links li a");

function scroolsection(element) {
  element.forEach((e) => {
    e.addEventListener("click", (ele) => {
      ele.preventDefault();
      document.querySelector(ele.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scroolsection(links);
scroolsection(boulltes);

// start show boulltes options in setting box\
let spanboulltes = document.querySelectorAll(".bulletes-option span");

removeactive(spanboulltes);
let boulltesdiv = document.querySelector(".bulltes");
if (localStorage.getItem("showboulltes") != "") {
  spanboulltes.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("showboulltes") == "no") {
    boulltesdiv.style.display = "none";
    document.querySelector(".bulletes-option .no").classList.add("active");
  } else {
    boulltesdiv.style.display = "block";
    document.querySelector(".bulletes-option .yes").classList.add("active");
  }
}
spanboulltes.forEach((span) => {
  span.addEventListener("click", (e) => {
    localStorage.setItem("showboulltes", e.target.dataset.show);
    if (e.target.dataset.show == "yes") {
      boulltesdiv.style.display = "block";
    } else {
      boulltesdiv.style.display = "none";
    }
  });
});

// reset setting box
document.querySelector(".reset-button").onclick = function () {
  localStorage.removeItem("colorOption");

  localStorage.removeItem("randombackground");
  localStorage.removeItem("showboulltes");
  window.location.reload();
};

// start toogle menu

let togglemenu = document.querySelector(".toogle-menu");
let linkopen = document.querySelector(".links");
linkopen.onclick = function (e) {
  e.stopPropagation();
};
// togglemenu.classList.contains

togglemenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("active");
  linkopen.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target != togglemenu && e.target != linkopen) {
    if (linkopen.classList.contains("open")) {
      togglemenu.classList.remove("active");
      linkopen.classList.remove("open");
    }
  }
});
