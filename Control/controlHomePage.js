//스크롤에 따라 상단 네비바 숨김 보임처리.
const controlHeader = () => {
  $(document).ready(function () {
    var lastScrollTop = 0;
    var headerHeight = $(".header").outerHeight();

    $(window).on("scroll", function () {
      var currentScrollTop = $(this).scrollTop();

      if (currentScrollTop > lastScrollTop) {
        // 휠을 아래로 내릴 때
        $(".header").css("top", "-" + headerHeight + "px");
      } else {
        // 휠을 위로 올릴 때
        $(".header").css("top", "0");
      }

      lastScrollTop = currentScrollTop;
    });
  });
};

// 검색 영역의 background 이미지 불러오고 검색 영역의 배경이미지로 지정.
const setSearchBackground = () => {};

controlHeader();
