(function () {
  document.querySelector(".prev-button").disabled = true;
})();

const slides = document.querySelector("ul");
console.log(slides);
const slidesCount = slides.childElementCount;
const maxLeft = (slidesCount - 3) * 413 * -1;
console.log(maxLeft);
let current = 0;

function changeSlide(next = true) {
  if (next) {
    current += current > maxLeft ? -413 : current * -1;

    console.log(current);
  } else {
    current = current < 0 ? current + 413 : maxLeft;

    console.log(current);
  }
  slides.children[0].style.marginLeft = current + "px";
}

function next() {
  let max = maxLeft.toString() + "px";
  console.log(max);
  if (slides.children[0].style.marginLeft === max) {
    document.querySelector(".next-button").disabled = true;
  }else {
    document.querySelector(".prev-button").disabled = false;
    changeSlide();
  }
}
document.querySelector(".next-button").addEventListener("click", function () {
  next();
});

function prev() {
  if (slides.children[0].style.marginLeft === "0px") {
    document.querySelector(".prev-button").disabled = true;
  }else{
    document.querySelector(".next-button").disabled = false;
    changeSlide(false);
  }
}
document.querySelector(".prev-button").addEventListener("click", function () {
  prev();
});

$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      prev();
      break;

    case 39:
      next();
      break;

    default:
      return;
  }
  e.preventDefault();
});
