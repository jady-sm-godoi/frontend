const aSubtraction = document.getElementById(
  "button_accessibility_subtraction"
);
const aSum = document.getElementById("button_accessibility_sum");

aSubtraction.addEventListener("click", function (e) {
  e.preventDefault();
  resize("decrease");
});

aSum.addEventListener("click", function (e) {
  e.preventDefault();
  resize("increase");
});

function resize(action) {
  const html = document.querySelector("html");
  html.style.fontSize = window.getComputedStyle(
    document.querySelector("html"),
    null
  ).fontSize;
  console.log(html.style.fontSize);

  let size = html.style.fontSize.slice(0, 2);

  if (action == "increase" && size <= 18) {
    html.style.fontSize = +html.style.fontSize.slice(0, 2) + 1 + "px";
  } else if (action == "decrease" && size >= 13) {
    html.style.fontSize = +html.style.fontSize.slice(0, 2) - 1 + "px";
  }
}
