import { ApiInfo } from "./ApiInfo.js";

//api요청 객체 생성
const setRequestAPI = (url) => {
  const settings = {
    async: true,
    crossDomain: true,
    url: `${url}`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `${ApiInfo.key}`,
    },
  };
  return settings;
};

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

  const settings = setRequestAPI(ApiInfo.url.getNowPlayingMovie);

  $.ajax(settings).done(function (response) {
    //얻은 데이터를 바탕으로 배경화면 사진 설정
    const base_url = ApiInfo.images.base_url;
    const file_size = ApiInfo.images.backdrop_sizes.original;
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

const setTrendMovie = () => {
  const settings = setRequestAPI(ApiInfo.url.getTrendMovie);

  $.ajax(settings).done(function (response) {
    //얻은 데이터를 바탕으로 배경화면 사진 설정
    const datas = response.results;
    const base_url = ApiInfo.images.base_url;
    const file_size = ApiInfo.images.backdrop_sizes.original;
    $(document).ready(function () {
      for (let i = 0; i < datas.length; i++) {
        const img_url = base_url + file_size + datas[i].poster_path;
        const title = datas[i].title;
        const release_date = datas[i].release_date;
        const newItem = trendMovieComponent(title, release_date, img_url);
        $(".trend-movie-list").append(newItem);
      }
    });
  });
};

const trendMovieComponent = (title, release_date, img_url) => {
  return `<div class="item">
            <div class="image">
              <a href="#">
                <img loading="lazy" src="${img_url}" alt="${title}" />
              </a>
            </div>
            <div class="content">
              <h2>
              <a href="#" title="${title}">${title}</a></h2>
              <p>${release_date}</p>
            </div>
          </div>`;
};

export { controlHeader, setSearchBackground, setTrendMovie };
