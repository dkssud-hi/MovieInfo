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

controlHeader();
