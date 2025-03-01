function headerUI() {
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  const section = header.nextElementSibling;
  const visual = document.querySelector(".visual");

  if (section && section.tagName === "SECTION") {
    // section.style.marginTop = headerHeight / 2 + "px";

    if (window.innerWidth < 768) {
      section.style.marginTop = headerHeight + "px";
    }
  } else {
    console.log("header 바로 뒤에 div 요소가 없습니다.");
  }

  // visual.style.height = `calc(100vh - ${parseInt(headerHeight)}px)`;
}

function navUI() {
  const header = document.querySelector("header");
  const contact = header.querySelector(".contact-button");
  const menu = header.querySelector(".menu-button");

  // 초기 상태 설정
  updateContactButtonVisibility();

  // 메뉴 버튼 클릭 이벤트 리스너
  menu.addEventListener("click", function () {
    updateContactButtonVisibility();
  });

  // w--open 클래스 변경 감지 (MutationObserver 사용)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "class") {
        updateContactButtonVisibility();
      }
    });
  });

  observer.observe(menu, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // 연락처 버튼 표시/숨김 함수
  function updateContactButtonVisibility() {
    if (menu.classList.contains("w--open")) {
      contact.style.display = "none";
    } else {
      contact.style.display = "flex";
    }
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
              $(content)
                .stop()
                .slideDown(300, function () {
                  // slideDown 완료 후 포커스 이동
                  accordionBox.focus();
                  window.scrollTo(0, $(accordionBox).offset().top - 92);
                });
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
                .slideDown(300, function () {
                  // slideDown 완료 후 포커스 이동
                  accordionBox.focus();
                  window.scrollTo(0, $(accordionBox).offset().top - 92);
                });
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

function swiperUI() {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 8,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    a11y: true,
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: false,
        allowTouchMove: false,
      },
    },
  });

  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 0,
    thumbs: {
      swiper: swiper,
    },
  });

  const thumbnails = document.querySelectorAll(
    ".mySwiper .swiper-slide button"
  );

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      swiper2.slideTo(index);
    });
  });

  function swiperVideo() {
    const videoContainers = document.querySelectorAll(
      ".swiper .video-container"
    ); // .kv 제외

    videoContainers.forEach((container) => {
      const video = container.querySelector("video");

      function createPlayPauseButton(container) {
        const button = document.createElement("button");
        button.classList.add("playPause", "play");
        button.setAttribute("aria-label", "재생");
        container.insertAdjacentElement("beforeend", button);
        return button;
      }

      const playPauseButton = createPlayPauseButton(container);

      playPauseButton.style.transition = "opacity 0.5s ease-in-out";

      if (video.autoplay) {
        playPauseButton.classList.remove("play");
        playPauseButton.classList.add("pause");
        playPauseButton.style.opacity = 1;
        playPauseButton.setAttribute("aria-label", "일시정지");
      }

      playPauseButton.addEventListener("click", () => {
        toggleVideoPlayback(video, playPauseButton);
      });

      video.addEventListener("click", () => {
        if (!container.classList.contains("kv")) {
          if (playPauseButton.style.opacity === "1") {
            playPauseButton.style.opacity = 0;
          } else if (
            playPauseButton.style.opacity === "0" ||
            playPauseButton.style.opacity === ""
          ) {
            playPauseButton.style.opacity = 1;
          }
        }
      });

      video.addEventListener("ended", () => {
        playPauseButton.classList.remove("pause");
        playPauseButton.classList.add("play");
        playPauseButton.style.opacity = 1;
      });

      function toggleVideoPlayback(video, playPauseButton) {
        if (video.paused) {
          video.play();
          playPauseButton.classList.remove("play");
          playPauseButton.classList.add("pause");
          playPauseButton.setAttribute("aria-label", "일시정지");
          setTimeout(() => {
            playPauseButton.style.opacity = 0;
          }, 3000);
        } else {
          video.pause();
          playPauseButton.classList.remove("pause");
          playPauseButton.classList.add("play");
          playPauseButton.setAttribute("aria-label", "재생");
          playPauseButton.style.opacity = 1;
        }
      }
    });

    // 메인 슬라이더 변경 이벤트 리스너
    swiper2.on("slideChange", () => {
      pauseOtherVideos(swiper2.activeIndex);
    });

    // 썸네일 슬라이드 클릭 이벤트 리스너
    swiper.on("click", (swiper, event) => {
      swiper2.slideTo(swiper.clickedIndex);
      pauseOtherVideos(swiper.clickedIndex);
    });

    // 다른 비디오 일시 정지 함수
    function pauseOtherVideos(activeIndex) {
      videoContainers.forEach((container, index) => {
        const video = container.querySelector("video");
        if (video && index !== activeIndex) {
          video.pause();
          const playPauseButton = container.querySelector(".playPause");
          if (playPauseButton) {
            playPauseButton.classList.remove("pause");
            playPauseButton.classList.add("play");
            playPauseButton.style.opacity = 1;
          }
        }
      });
    }
  }

  function kvVideo() {
    // .kv 비디오 로직 분리
    const kvContainers = document.querySelectorAll(".kv .video-container");

    kvContainers.forEach((container) => {
      const video = container.querySelector("video");

      // 플레이 버튼 동적 생성
      const playPauseButton = document.createElement("button");
      playPauseButton.classList.add("playPause", "play");
      playPauseButton.setAttribute("aria-label", "재생");
      container.insertAdjacentElement("beforeend", playPauseButton);

      // CSS 트랜지션 추가
      playPauseButton.style.transition = "opacity 0.5s ease-in-out";

      // 자동 재생 설정 확인 및 버튼 상태 설정
      if (video.autoplay) {
        playPauseButton.classList.remove("play");
        playPauseButton.classList.add("pause");
        playPauseButton.style.opacity = 1;
        playPauseButton.setAttribute("aria-label", "일시정지");
      }

      playPauseButton.addEventListener("click", () => {
        toggleVideoPlayback(video, playPauseButton);
      });

      video.addEventListener("ended", () => {
        playPauseButton.classList.remove("pause");
        playPauseButton.classList.add("play");
      });

      function toggleVideoPlayback(video, playPauseButton) {
        if (video.paused) {
          video.play();
          playPauseButton.classList.remove("play");
          playPauseButton.classList.add("pause");
          playPauseButton.setAttribute("aria-label", "일시정지");
        } else {
          video.pause();
          playPauseButton.classList.remove("pause");
          playPauseButton.classList.add("play");
          playPauseButton.setAttribute("aria-label", "재생");
        }
      }
    });
  }

  swiperVideo();
  kvVideo();
}

function downloadUI() {
  function videoDownloadUI() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      video.setAttribute("controlsList", "nodownload");
    });
  }

  function imageDownloadUI() {
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
    });
  }

  videoDownloadUI();
  imageDownloadUI();
}

function uiInit() {
  headerUI();
  handleResize(); // 초기화시 핸들러 실행
  swiperUI();
  downloadUI();

  if (window.innerWidth < 768) {
    navUI();
    accordionUI();
  }
}

function handleResize() {
  const accordionButtons = document.querySelectorAll(".accordionButton");
  if (window.innerWidth < 768) {
    accordionUI();
    accordionButtons.forEach((button) => {
      button.removeAttribute("disabled");
      button.removeAttribute("aria-disabled");
    });
  } else {
    // 768px 이상일 때 아코디언 관련 이벤트 리스너 제거 및 초기화
    const accordions = document.querySelectorAll(
      ".accordionBox, .accordionContainer.single .accordionBox"
    );
    accordions.forEach((accordion) => {
      const toggle = accordion.querySelector(".accordionButton");
      const content = accordion.querySelector(".accordionContent");
      if (toggle) {
        if (toggle.accordionHandler) {
          toggle.removeEventListener("click", toggle.accordionHandler);
          delete toggle.accordionHandler;
        }
        if (toggle.accordionSingleHandler) {
          toggle.removeEventListener("click", toggle.accordionSingleHandler);
          delete toggle.accordionSingleHandler;
        }
        $(content).show(); // 768이상에서는 내용 보이게
        accordion.classList.remove("on"); // on클래스 삭제
        toggle.setAttribute("aria-expanded", "true"); // aria-expanded 초기화
        toggle.setAttribute("disabled", "true");
        toggle.setAttribute("aria-disabled", "true");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", uiInit);
window.addEventListener("resize", handleResize);
