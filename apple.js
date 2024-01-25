window.addEventListener("scroll", function () {
  var 높이 = document.querySelector("html").scrollTop;
  var y = (-1 / 250) * 높이 + 28 / 5;
  var z = (-1 / 2500) * 높이 + 65 / 50;
  document.querySelectorAll(".card-box")[0].style.opacity = ("1", y);
  document.querySelectorAll(".card-box")[0].style.transform = ` scale(${z})`;
});
