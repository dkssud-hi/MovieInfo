import { ApiInfo } from "./ApiInfo.js";

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
const setSearchBackground = () => {
  const random = Math.floor(Math.random() * 20);

  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.themoviedb.org/3/movie/now_playing?language=ko",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${ApiInfo.key}`,
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    //얻은 데이터를 바탕으로 배경화면 사진 설정
    const base_url = ApiInfo.images.base_url;
    const file_size = ApiInfo.images.backdrop_sizes.w780;
    const img_url = response.results[random].backdrop_path;
    $(document).ready(function () {
      console.log(base_url + img_url);
      $(".search-box").css({
        "background-image": `url(${base_url + file_size + img_url})`,
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
      });
    });
  });
};

export { controlHeader, setSearchBackground };
