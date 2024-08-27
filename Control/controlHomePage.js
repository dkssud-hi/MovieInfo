import { ApiInfo } from "./data.js";

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
  const base_url = ApiInfo.images.base_url;
  const backdrop_size = ApiInfo.images.backdrop_sizes.w780;

  const settings = {
    async: true,
    crossDomain: true,
    url: "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDE2NjBkNjJhMDgyYjE4M2ZkODZiNjI4Y2M2OTAwNSIsIm5iZiI6MTcyMzk2NDg2MC40ODA1OTgsInN1YiI6IjYzNjIyODg1MDdlMjgxMDA3ZGI1YTFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M93uRZZ6ZW_57LcK21DXpznrPRwRixqcALKI-2LGJwY",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    //얻은 데이터를 바탕으로 배경화면 사진 설정
    $(document).ready(function () {
      $(".search-box").css({
        "background-image":
          'url("https://image.tmdb.org/t/p/w780/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg")',
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
      });
    });
  });
};

export { controlHeader, setSearchBackground };
