function headerUI() {
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  const section = header.nextElementSibling;
  if (section && section.tagName === "SECTION") {
    section.style.marginTop = headerHeight + "px";
  } else {
    console.log("header 바로 뒤에 div 요소가 없습니다.");
  }
}

function uiInit() {
  headerUI();
}

document.addEventListener("DOMContentLoaded", uiInit);
