window.addEventListener("load", function () {
  // data.json 을 로딩, 연결
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (e) {
    // console.log(req);
    const req = e.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      //글자로 온 데이터를 객체로 변환
      //글자가 json 규칙대로 만들어진 문자열
      //json 의 글자를 객체로 변환해서 사용
      let obj = JSON.parse(str);
      // console.log(obj);
      VISUAL_ARR = obj.visual;
      TODAY_GOOD = obj.todaygood;
      SALE_GOOD = obj.salegood;
      NEW_GOOD = obj.newgood;
      RECOMMEND_GOOD = obj.recommendgood;
      POPULAR_ICON = obj.popularicon;
      POPULAR_GOOD = obj.populargood;

      //visual을 화면에 배치
      showVisual();
      //today goods 화면에 배치
      showTodayGoods();
      //sale goods 화면에 배치
      showSaleGoods();
      //new goods 화면에 배치
      showNewGoods();
      //recomand goods 화면에 배치
      showRecommendGoods();
      //popularicon 화면에 배치
      showPopularIcon();
      //populargood 화면에 배치
      showPopularGood();
    }
  };
  //자료 호출
  xhttp.open("GET", "data.json");
  //웹브라우저 기능 실행 요청
  xhttp.send();
  //visual slide
  let VISUAL_ARR;
  let visualTag = this.document.getElementById("data-visual");
  //visual 화면 출력
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach((item) => {
      const tag = `
        <div class="swiper-slide">
        <div class="visual-slide-pg">
          <a href="${item.link}">
            <img src="images/${item.pic}" alt="${item.name}">
          </a>
        </div>
      </div>
        `;
      //json 변수 가져와서 item 선언
      html += tag;
    });
    visualTag.innerHTML = html;

    //swiper fnc
    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      autoplay: true,
      speed: 1000,
      //   disableOnInteraction: false,
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      pagination: {
        // 하나하나 넘어가는 것.
        el: ".visual-pg",
        type: "fraction", //pagination count
      },
    });
    //slide pause
    const swVisualPause = document.querySelector(".visual-play");
    swVisualPause.addEventListener("click", function () {
      //current active class exist check, fnc
      // if classList contains active,
      if (swVisualPause.classList.contains("active")) {
        swVisualPause.classList.remove("active");
        swVisual.autoplay.start();
      } else {
        swVisualPause.classList.add("active");
        swVisual.autoplay.stop();
      }
    });
  }
  //====visual area end=====
  //today section
  let TODAY_GOOD;
  let today_tag = this.document.getElementById("data-today");
  let today_tag_2 = this.document.getElementById("data-today2");
  // 가격 표시 함수 정의
  function priceToString(price) {
    // 숫자를 문자열로 변환
    let priceString = price.toString();
    // 정규 표현식을 사용하여 세 자리마다 쉼표 추가
    return priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function showTodayGoods() {
    let htmlTop = "";
    let htmlbt = "";
    const topArr = TODAY_GOOD.filter(function (item, idx) {
      // console.log(idx);
      if (idx < 4) {
        return item;
      }
    });
    topArr.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
          <img src="images/${item.pic}" alt="${item.name}">
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
          <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
      ${priceToString(item.price)}<em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>
      </div>
      `;
      htmlTop += tag;
    });
    //bt today goods
    const btArr = TODAY_GOOD.filter(function (item, idx) {
      if (idx > 3) {
        return item;
      }
    });
    btArr.forEach(function (item) {
      // console.log(item);
      let tag = `
      <div class="good-box">
      <!-- 제품이미지 -->
      <a href="${item.link}" class="good-img">
          <img src="images/${item.pic}" alt="${item.name}">
      </a>
      <!-- 제품정보 -->
      <a href="${item.link}" class="good-info">
          <em>${item.name}</em>(<em>${item.unit}</em>)
      </a>
      <!-- 제품가격 -->
      <a href="${item.link}" class="good-info-price">
      ${priceToString(item.price)}<em>원</em>
      </a>
      <!-- 장바구니 이미지 -->
      <button class="good-add-cart"></button>
      </div>
      `;
      htmlbt += tag;
    });
    today_tag.innerHTML = htmlTop;
    today_tag_2.innerHTML = htmlbt;
  }
  // ======= today section end =======
  // dc grocery
  let SALE_GOOD;
  let saleTag = this.document.getElementById("data-sale");
  function showSaleGoods() {
    let html = `
    <div class="swiper sw-sale">
    <div class="swiper-wrapper">
    `;
    SALE_GOOD.forEach(function (item) {
      let tag = `
      <div class = "swiper-slide">
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
              <img src="images/${item.pic}" alt="${item.name}">
              <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
              <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">
              ${priceToString(item.price)}<em>원</em>
          </a>
          <!-- 장바구니 이미지 -->
          <button class="good-add-cart"></button>
        </div>
      </div>
      `;
      html += tag;
    });
    html += `
    </div>
    </div>
    `;
    saleTag.innerHTML = html;
    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".sale .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  // ========== dc grocery end ==========
  // what's new
  let NEW_GOOD;
  let newTag = this.document.querySelector("#data-new");
  let newTagList = this.document.querySelector("#data-new-list");
  function showNewGoods() {
    // 첫번째 화면 출력 (left)
    let obj = NEW_GOOD[0]; //obj라는 변수를 0번째로 선언, 불러오기
    let newGoodFirst = `
    <a href="${obj.link}" class="new-img">
    <img src="images/${obj.pic}" alt="${obj.title}"/>
    </a>
    <a href="${obj.link}" class="new-title">
    ${obj.title}
    </a>
    <a href="${obj.link}" class="new-txt">
    ${obj.txt}
    </a>
    `;
    newTag.innerHTML = newGoodFirst;
    // 두번째 화면 출력 (right)
    let html = "";
    NEW_GOOD.forEach(function (item, idx) {
      let tag = "";
      if (idx !== 0) {
        // console.log(item);
        let newGoodSecond = `
        <div class="new-box">
        <a href="${item.link}" class="new-box-img">
            <img src="images/${item.pic}" alt="${item.title}"/>
        </a>
        <a href="${item.link}" class="new-box-title">
            ${item.title}
        </a>
        </div>
        `;
        newTagList.innerHTML += newGoodSecond;
      }
    });
  }
  // ==========  what's new end ==========
  // recommend section
  let RECOMMEND_GOOD;
  let recTag = this.document.querySelector("#data-recommend");
  function showRecommendGoods() {
    let html = `
    <div class="swiper sw-reco">
    <div class="swiper-wrapper">
  `;
    RECOMMEND_GOOD.forEach(function (item) {
      let tag = `
    <div class = "swiper-slide">
        <div class="good-box">
          <!-- 제품이미지 -->
          <a href="${item.link}" class="good-img">
              <img src="images/${item.pic}" alt="${item.name}">
              <span class="good-type">${item.tag}</span>
          </a>
          <!-- 제품정보 -->
          <a href="${item.link}" class="good-info">
              <em>${item.name}</em>(<em>${item.unit}</em>)
          </a>
          <!-- 제품가격 -->
          <a href="${item.link}" class="good-info-price">
              ${priceToString(item.price)}<em>원</em>
          </a>
          <!-- 장바구니 이미지 -->
          <button class="good-add-cart"></button>
        </div>
      </div>
    `;
      html += tag;
    });
    html += `
  </div>
  </div>
  `;
    recTag.innerHTML = html;
    const swReco = new Swiper(".sw-reco", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".recommend .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  //========= recommend section end ==========
  // popular section
  let POPULAR_ICON;
  let pITag = this.document.querySelector("#data-popular-icon");
  let POPULAR_GOOD;
  //인기물품 목록 중 인덱스 리스트
  let popularShow = 1;
  let pGTag = this.document.querySelector("#data-popular");
  //인기 물품 아이콘 로드
  function showPopularIcon() {
    let html = `
    <div class = "swiper sw-icon">
    <div class = "swiper-wrapper">
    `;
    POPULAR_ICON.forEach(function (item) {
      const tag = `
      <div class = "swiper-slide">
        <a href = "${item.link}">
            <span class = "popular-cate-icon"
            style = "
            background : url('images/${item.icon}') no-repeat;
            background-position : 0px 0px;">
            </span>
            <span class = "popular-cate-name">${item.txt}</span>
        </a>
      </div>
      `; // 호버시 변경위한 베이직 스타일 지정된 상태
      html += tag;
    });

    html += `
    </div>
    </div>
    `;
    pITag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7, // 보여지는 슬라이드 개수
      spaceBetween: 10, // 슬라이드 간의 간격
      slidesPerGroup: 7, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".popular-cate .popular-slide-prev",
        nextEl: ".popular-cate .popular-slide-next",
      },
    });
    const tag = document.querySelectorAll(".popular-slide a");
    tag.forEach(function (item, idx) {
      // 호버했을 때 아이콘 이미지 변경
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "-64px";
      });
      item.addEventListener("mouseleave", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "0";
      });
      item.addEventListener("click", function (event) {
        event.preventDefault();
        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        // console.log(title);
        bt.innerHTML = `${title.innerHTML} 물품 더보기`;
        // 클릭된 아이콘에
      });
    });
  }
  // 인기물품 목록 화면출력
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + (popularShow + 0); //인덱스 번호에 계속 +1을 함
    // console.log(POPULAR_GOOD[popCate]);
    POPULAR_GOOD[popCate].forEach(function (item) {
      // 여러개이므로 foreach
      let tag = `
          <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
                <img src="images/${item.pic}" alt="${item.name}" />
                <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">${priceToString(item.price)}<em>원</em></a>
            <!-- 장바구니 -->
            <button class="good-add-cart"></button>
          </div>
      `;
      html += tag;
      pGTag.innerHTML = html;
    });
  }
});
