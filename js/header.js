window.addEventListener("load", function () {
  //스크롤 했을 때 헤더 윗부분 접는 코드
  const wrap = this.document.querySelector(".wrap");
  const header = this.document.querySelector(".header");
  let scy = 0;
  this.window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });
  // 더보기메뉴 펼침 토글
  // 더보기 목록기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  //  조합원센터 목록기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  //배열 순서 번호; 배열 순서 번호 담기(idx)
  const tgListArr = [menuList, joinList, centerList];
  const tgBtArr = [menuBt, joinBt, centerBt];
  //펼침 목록 모두 닫기
  document.addEventListener("click", function () {
    tgListArr.forEach(function (item) {
      item.style.display = "none";
    });
    //bnt reset
    tgBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });
  //목록 전체를 클릭해도 이벤트 전달 막기
  tgListArr.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
  //same fn 반복
  function listTg(bt, list) {
    //first, dont list show
    list.style.display = "none";
    //click event! fnc
    bt.addEventListener("click", function (e) {
      e.stopPropagation();
      // 모든 버튼 클래스 초기화
      tgBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      // 현재 목록 ID 가져오기
      const nowList = list.getAttribute("id");
      // 숨길 목록을 필터링
      const hideArr = tgListArr.filter(function (item) {
        let id = item.getAttribute("id");
        // console.log(id);
        // 현재 목록과 다른 경우만 필터링
        if (id !== nowList) {
          return item;
        }
      });
      //새로 저장된 배열의 목록
      // console.log(hideArr);
      hideArr.forEach(function (item) {
        item.style.display = "none";
      });
      const css = getComputedStyle(list).display;
      if (css === "none") {
        list.style.display = "block";
        bt.classList.add("active");
      } else {
        list.style.display = "none";
        bt.classList.remove("active");
      }
    });
  }
  listTg(menuBt, menuList);
  // toggleListArr[0] = menuList
  listTg(joinBt, joinList);
  // toggleListArr[1] = joinList
  listTg(centerBt, centerList);
  // toggleListArr[2] = centerList

  //전체메뉴 펼침 기능
  const allMenuArea = this.document.querySelector(".all-menu-area");
  const allMenu = this.document.querySelector(".all-menu");
  const cateList = this.document.querySelector(".cate-list");
  //꼬마와땅부터 메뉴창 안 열리게 하기
  const deliList = this.document.querySelector(".deli-menu");
  const themeList = this.document.querySelector(".theme-list");
  let isMenuOpen = false;
  cateList.addEventListener("mouseleave", function () {
    if (!isMenuOpen) {
      allMenu.classList.remove("active");
    }
  });
  // console.log(cateList);
  //ul cate-list
  const cateListWrap = this.document.querySelector(".all-menu-cate-wrap");
  cateList.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  cateListWrap.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  // 해당 카테고리 내용만 보여주기
  const cateLists = this.document.querySelectorAll(".cate-list > li");
  const cateDepth2 = this.document.querySelectorAll(".cate-depth2-list");
  cateLists.forEach(function (item, idx) {
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, idxSub) {
        // console.log(itemSub);
        itemSub.style.display = "none";
        if (idx == idxSub) {
          itemSub.style.display = "block";
        }
      });
    });
  });
});
