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

function accordionUI() {
  /* accordion */
  // to-be 아코디언
  // 여러개 동시에 열 수 있는 아코디언
  function accordion() {
    const accordions = document.querySelectorAll(".accordionBox");

    accordions.forEach((accordion) => {
      const toggle = accordion.querySelector(".accordionButton");
      const content = accordion.querySelector(".accordionContent");

      // 초기 세팅
      if (toggle) {
        const toggleId = toggle.getAttribute("id");
        content.setAttribute("aria-labelledby", toggleId);

        if (accordion.classList.contains("on")) {
          toggle.setAttribute("aria-expanded", "true");
        } else {
          toggle.setAttribute("aria-expanded", "false");
        }
      }
      if (content) {
        const contentId = content.getAttribute("id");
        toggle.setAttribute("aria-controls", contentId);

        if (accordion.classList.contains("on")) {
          $(content).show();
        } else {
          $(content).hide();
        }
      }

      // 동작 세팅
      function accordionEvent() {
        if (toggle) {
          toggle.removeEventListener("click", toggle.accordionSingleHandler);

          if (toggle.accordionHandler) {
            toggle.removeEventListener("click", toggle.accordionHandler);
          }

          toggle.accordionHandler = () => {
            const isActive = toggle
              .closest(".accordionBox")
              .classList.contains("on");
            if (isActive) {
              accordion.classList.remove("on");
              toggle.setAttribute("aria-expanded", "false");
              $(content).stop().slideUp(300);
            } else {
              accordion.classList.add("on");
              toggle.setAttribute("aria-expanded", "true");
              $(content).stop().slideDown(300);
            }
          };

          toggle.addEventListener("click", toggle.accordionHandler);
        }
      }

      accordionEvent();
    });
  }

  // 하나만 열리는 아코디언
  function accordionSingle() {
    const accordions = document.querySelectorAll(".accordionContainer.single");
    const accordionContents = document.querySelectorAll(
      ".accordionContainer.single > .accordionBox > .accordionContent"
    );
    const accordionButtons = document.querySelectorAll(
      ".accordionContainer.single > .accordionBox > .accordionTitle > .accordionButton"
    );
    const accordionBoxes = document.querySelectorAll(
      ".accordionContainer.single > .accordionBox"
    );
    accordionBoxes.forEach((accordionBox) => {
      const toggle = accordionBox.querySelector(".accordionButton");
      const content = accordionBox.querySelector(".accordionContent");

      // 초기 세팅
      if (toggle) {
        const toggleId = toggle.getAttribute("id");
        content.setAttribute("aria-labelledby", toggleId);

        if (accordionBox.classList.contains("on")) {
          toggle.setAttribute("aria-expanded", "true");
        } else {
          toggle.setAttribute("aria-expanded", "false");
        }
      }
      if (content) {
        const contentId = content.getAttribute("id");
        toggle.setAttribute("aria-controls", contentId);

        if (accordionBox.classList.contains("on")) {
          $(content).show();
        } else {
          $(content).hide();
        }
      }

      // 동작 세팅
      function accordionSingleEvent() {
        if (toggle) {
          toggle.removeEventListener("click", toggle.accordionHandler);

          if (toggle.accordionSingleHandler) {
            toggle.removeEventListener("click", toggle.accordionSingleHandler);
          }

          toggle.accordionSingleHandler = () => {
            const isActive = toggle
              .closest(".accordionBox")
              .classList.contains("on");

            if (isActive) {
              toggle.closest(".accordionBox").classList.remove("on");
              // accordionBox.classList.remove("on");
              toggle.setAttribute("aria-expanded", "false");
              $(
                toggle
                  .closest(".accordionBox")
                  .querySelector(".accordionContent")
              )
                .stop()
                .slideUp(300);
            } else {
              for (let i = 0; i < accordionBoxes.length; i++) {
                const accordionBox = accordionBoxes[i];
                accordionBox.classList.remove("on");
              }

              for (let i = 0; i < accordionButtons.length; i++) {
                const accordionButton = accordionButtons[i];
                accordionButton.setAttribute("aria-expanded", "false");
              }

              for (let i = 0; i < accordionContents.length; i++) {
                const accordionContent = accordionContents[i];
                $(accordionContent).stop().slideUp(300);
              }

              toggle.closest(".accordionBox").classList.add("on");
              toggle.setAttribute("aria-expanded", "true");
              $(
                toggle
                  .closest(".accordionBox")
                  .querySelector(".accordionContent")
              )
                .stop()
                .slideDown(300);
            }
          };

          toggle.addEventListener("click", toggle.accordionSingleHandler);
        }
      }

      accordionSingleEvent();
    });
  }
  /* accordion */

  // accordionLegacy();
  accordion();
  accordionSingle();
}

function uiInit() {
  headerUI();
  accordionUI();
}

document.addEventListener("DOMContentLoaded", uiInit);
