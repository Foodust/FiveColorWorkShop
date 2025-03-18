// 스크롤 및 마우스 위치에 따른 헤더 표시/숨김 기능
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  let isMouseNearTop = false;

  // 스크롤 시 헤더 숨김/표시 함수
  function handleScroll() {
    // 현재 스크롤 위치
    const currentScrollY = window.scrollY;

    // 스크롤 방향 (위로 = true, 아래로 = false)
    const scrollingUp = currentScrollY < lastScrollY;

    // 마우스가 상단 근처에 있거나 위로 스크롤 중이면 헤더 표시
    if (isMouseNearTop || (scrollingUp && currentScrollY > 100)) {
      header.classList.remove("header-hidden");
      header.classList.add("header-visible");
    }
    // 아래로 스크롤 중이고 마우스가 상단에 없으면 헤더 숨김
    else if (currentScrollY > 200 && !isMouseNearTop) {
      header.classList.remove("header-visible");
      header.classList.add("header-hidden");
    }

    // 페이지 최상단이면 항상 헤더 표시
    if (currentScrollY < 50) {
      header.classList.remove("header-hidden");
      header.classList.add("header-visible");
    }

    // 현재 스크롤 위치 저장
    lastScrollY = currentScrollY;
  }

  // 마우스 위치 감지 함수
  function handleMouseMove(e) {
    // 마우스가 화면 상단 100px 이내에 있는지 확인
    isMouseNearTop = e.clientY < 100;

    // 마우스가 상단에 있으면 헤더 표시
    if (isMouseNearTop) {
      header.classList.remove("header-hidden");
      header.classList.add("header-visible");
    }
    // 마우스가 상단에서 벗어나고 스크롤 위치가 충분히 아래면 헤더 숨김
    else if (window.scrollY > 200) {
      header.classList.remove("header-visible");
      header.classList.add("header-hidden");
    }
  }

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", handleScroll);

  // 마우스 이동 이벤트 리스너
  document.addEventListener("mousemove", handleMouseMove);

  // 앵커 링크 클릭 시 스크롤 위치 조정
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // 헤더 높이 + 여유 공간 계산
      const headerHeight = header.offsetHeight;
      const offset = headerHeight + 30; // 추가 여백

      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
});
