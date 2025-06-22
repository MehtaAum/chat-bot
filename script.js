let search = document.querySelector(".search")

function autoResize() {
  search.style.height = "auto";
  search.style.height = (search.scrollHeight) + "px";
}