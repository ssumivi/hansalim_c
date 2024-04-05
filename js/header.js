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
  this.document.addEventListener("click", function () {
    tgListArr.forEach(function (item) {
      item.style.display = "none";
    });
    //bnt reset
    tgBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });
  //same fn 반복
  function listTg(bt, list) {
    //first, dont list show
    list.style.display = "none";
    //click event! fnc
    bt.addEventListener("click", function (e) {
      e.preventDefault();
      tgBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      const nowList = list.getAttribute("id");
    });
  }
  listToggle(menuBt, menuList);
  // toggleListArr[0] = menuList
  listToggle(joinBt, joinList);
  // toggleListArr[1] = joinList
  listToggle(centerBt, centerList);
  // toggleListArr[2] = centerList
});
