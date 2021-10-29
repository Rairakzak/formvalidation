// banner
$(document).ready(function () {
  TweenMax.set(".project-preview", { width: 0 });

  var tl = new TimelineLite();

  $(document)
    .on("mouseover", ".navigation-item", function (evt) {
      tl = new TimelineLite();
      tl.to($(".project-preview"), 1, {
        width: "600px",
        ease: Expo.easeInOut,
      });
    })
    .on("mouseout", ".navigation-item", function (evt) {
      tl = new TimelineLite();
      tl.to($(".project-preview"), 0.5, {
        width: 0,
        ease: Expo.easeInOut,
      });
    });
});

$(".navigation-link-1").hover(function () {
  $(".project-preview").css({
    "background-image": "url(/images/contact/cv.png)",
  });
});

$(".navigation-link-2").hover(function () {
  $(".project-preview").css({
    "background-image": "url(/images/contact/linkedInn.png)",
  });
});

$(".navigation-link-3").hover(function () {
  $(".project-preview").css({
    "background-image": "url(/images/contact/github.png)",
  });
});

$(".navigation-link-4").hover(function () {
  $(".project-preview").css({
    "background-image":
      "url(https://media.giphy.com/media/xLhloTgdu7i92/giphy.gif)",
  });
});

$(".navigation-link-5").hover(function () {
  $(".project-preview").css({
    "background-image":
      "url(https://media.giphy.com/media/HUZIZRlBnxExjC3W79/giphy.gif)",
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height();
  scrollPercent = (scroll / (dh - wh)) * 100;
  $(".progressbar").css("height", scrollPercent + "%");
});
//scroll animation
var swiper = new Swiper(".swiper-container", {
  loopedSlides: 8,
  loop: true,
  speed: 1300,
  centeredSlides: true,

  slidesPerView: "auto",
  freeMode: false,
  mousewheel: {
    releaseOnEdges: true,
  },
});

var thumb = document.querySelectorAll(".thumbContainer");

thumb.forEach(function (image, index) {
  var delay = index * 90;
  image.classList.add("fadeInSlide");
  image.style.animationDelay = delay + "ms";
});

swiper.on("slideChange", function () {
  var colors = [
    "#362d26",
    "#4d233d",
    "#4e5552",
    "#363737",
    "#25342b",
    "#110044",
  ];

  document.body.style.background =
    colors[Math.floor(Math.random() * colors.length)];
});

// cursor
var cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  cursor: cursor.style.top = y + "px";
  cursor: cursor.style.left = x + "px";
  cursor.style.display = "block";
});
document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});
const slide = document.querySelector(".swiper-wrapper");
if (slide !== null) {
  slide.addEventListener("mouseover", () => {
    console.log("in");
    cursor.classList.add("curser-active");
  });
  slide.addEventListener("mouseleave", () => {
    console.log("in");
    cursor.classList.remove("curser-active");
  });
}
const btn = document.querySelector(".nav-btn");
btn.addEventListener("mousemove", () => {
  cursor.style.visibility = "hidden";
});
btn.addEventListener("mouseout", () => {
  cursor.style.visibility = "visible";
});
//  open side-menu
const x = document.querySelector("#contact");
x.addEventListener("click", () => {
  document.querySelector(".Contact").classList.add("Contact-active");
});
// close side-menu
const close = document.querySelector(".return");
close.addEventListener("click", () => {
  if ((document.querySelector(".project-preview").style.width = "600")) {
    document.querySelector(".project-preview").style.width = "0";
  }
  document.querySelector(".Contact").classList.remove("Contact-active");
});
////////////////////////////

// text

// {{{{{{{{{{{{{{{{{{{{{{{{{{{ photo }}}}}}}}}}}}}}}}}}}}}}}}}}
// options
var options = {
  imgSrc: "../images/pic.jpg",
  containerName: "tileContainer",
  grid: false,
  tileWidth: 80,
  tileHeight: 80,
  mouseTrail: true,
};

// ----------------------------------------------------------
var tileWidth, tileHeight, numTiles, tileHolder, tileContainer;
var directionX, directionY;
var imgOriginalWidth, imgOriginalHeight;
var imgCoverWidth, imgCoverHeight;
var imageLoaded = false;

numTiles = 0;
tileWidth = options.tileWidth;
tileHeight = options.tileHeight;

tileContainer = document.getElementsByClassName(options.containerName)[0];

function init() {
  if (options.grid == false) tileContainer.className += " noGrid";

  //preload image and get original image size, then create tiles
  var image = new Image();
  image.src = options.imgSrc;
  image.onload = function (e) {
    imageLoaded = true;
    imgOriginalWidth = e.currentTarget.width;
    imgOriginalHeight = e.currentTarget.height;

    createTileHolder();
    checkTileNumber();
    positionImage();
    addListeners();
  };
}

function resizeHandler() {
  if (imageLoaded == false) return;

  //not working yet

  checkTileNumber();
  positionImage();
}

function createTileHolder() {
  tileHolder = document.createElement("div");
  tileHolder.className = "tileHolder";
  tileHolder.style.position = "absolute";
  tileHolder.style.top = "50%";
  tileHolder.style.left = "40%";
  tileHolder.style.transform = "translate(-50%, -50%)";
  tileContainer.appendChild(tileHolder);
}

function checkTileNumber() {
  tileHolder.style.width =
    Math.ceil(tileContainer.offsetWidth / tileWidth) * 60 + "px";
  tileHolder.style.height =
    Math.ceil(tileContainer.offsetHeight / tileHeight) * tileHeight + "px";

  var tilesFitInWindow =
    Math.ceil(tileContainer.offsetWidth / tileWidth) *
    Math.ceil(tileContainer.offsetHeight / tileHeight);
  if (numTiles < tilesFitInWindow) {
    for (var i = 0, l = tilesFitInWindow - numTiles; i < l; i++) {
      addTiles();
    }
  } else if (numTiles > tilesFitInWindow) {
    for (var i = 0, l = numTiles - tilesFitInWindow; i < l; i++) {
      removeTiles();
    }
  }
}

function addTiles() {
  var tile = document.createElement("div");
  tile.className = "tile";

  //maintain aspect ratio
  imgCoverWidth = tileContainer.offsetWidth;
  imgCoverHeight = tileContainer.offsetHeight;

  if (imgOriginalWidth > imgOriginalHeight) {
    imgCoverHeight = (imgOriginalHeight / imgOriginalWidth) * imgCoverWidth;
  } else {
    imgCoverWidth = (imgOriginalWidth / imgOriginalHeight) * imgCoverHeight;
  }

  tile.style.background = 'url("' + options.imgSrc + '") no-repeat';
  tile.style.backgroundSize = imgCoverWidth + "px " + imgCoverHeight + "px";
  tile.style.width = tileWidth + "px";
  tile.style.height = tileHeight + "px";
  document.querySelectorAll(".tileHolder")[0].appendChild(tile);

  tile.addEventListener("mouseover", moveImage);

  numTiles++;
}

function removeTiles() {
  var tileToRemove = document.querySelectorAll(".tile")[0];
  tileToRemove.removeEventListener("mouseover", moveImage);

  TweenMax.killTweensOf(tileToRemove);
  tileToRemove.parentNode.removeChild(tileToRemove);

  numTiles--;
}

function addListeners() {
  if (options.mouseTrail) {
    document.addEventListener("mousemove", function (event) {
      directionX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      directionY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    });
  }
}

function positionImage() {
  for (var t = 0, l = numTiles; t < l; t++) {
    var nowTile = document.querySelectorAll(".tile")[t];

    var left =
      -nowTile.offsetLeft -
      (tileHolder.offsetLeft - tileHolder.offsetWidth / 2);
    var top =
      -nowTile.offsetTop - (tileHolder.offsetTop - tileHolder.offsetHeight / 2);

    nowTile.style.backgroundPosition = left + "px " + top + "px";
  }
}

function resetImage(nowTile) {
  var left =
    -nowTile.offsetLeft - (tileHolder.offsetLeft - tileHolder.offsetWidth / 2);
  var top =
    -nowTile.offsetTop - (tileHolder.offsetTop - tileHolder.offsetHeight / 2);

  TweenMax.to(nowTile, 1, {
    backgroundPosition: left + "px " + top + "px",
    ease: Power1.easeInOut,
  });
}

function moveImage(e) {
  var nowTile = e.currentTarget;
  var minWidth = -tileContainer.offsetWidth + nowTile.offsetWidth;
  var minHeight = -tileContainer.offsetHeight + nowTile.offsetHeight;
  var nowLeftPos =
    -nowTile.offsetLeft - (tileHolder.offsetLeft - tileHolder.offsetWidth / 2);
  var nowTopPos =
    -nowTile.offsetTop - (tileHolder.offsetTop - tileHolder.offsetHeight / 2);
  var offset = 60;
  var left = nowLeftPos;
  var top = nowTopPos;

  if (options.mouseTrail) {
    //direction-aware movement
    if (directionX > 0) {
      left = nowLeftPos + offset;
    } else if (directionX < 0) {
      left = nowLeftPos - offset;
    }

    if (directionY > 0) {
      top = nowTopPos + offset;
    } else if (directionY < 0) {
      top = nowTopPos - offset;
    }
  } else {
    //random movement
    left = getRandomInt(nowLeftPos - offset, nowLeftPos + offset);
    top = getRandomInt(nowTopPos - offset, nowTopPos + offset);
  }

  // bounds
  if (left < minWidth) left = minWidth;
  if (left > 0) left = 0;
  if (top < minHeight) top = minHeight;
  if (top > 0) top = 0;

  //tween
  TweenMax.to(nowTile, 1.5, {
    backgroundPosition: left + "px " + top + "px",
    ease: Power1.easeOut,
    onComplete: resetImage,
    onCompleteParams: [nowTile],
  });
}

///////////////////////////////////////////////////////////////////

init();
// handle event
//window.addEventListener("optimizedResize", resizeHandler);

////////////////////////UTILS//////////////////////////////////////
//////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();
