// 페이지네이션 박스에 클릭 이벤트 추가
const pageBox = document.getElementsByClassName('page-box');

for (let page of pageBox) {
  page.addEventListener('click', function (e) {

    let cp = page.id;

    selectReviewList(cp);
    changeURL(cp);

  })
}




/* 페이지네이션 박스 화면에 출력 */
const printPagination = (paginationArea, pagination) => {

  // 이전 페이지
  const firstPage = document.createElement('div');
  const prevPage = document.createElement('div');
  makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
  makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');

  paginationArea.append(firstPage, prevPage);

  // 번호 페이지 제작
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const numPage = document.createElement('div');
    if (i == pagination.currentPage) {
      makePageBox(numPage, i, i, 'current-page-box');
    } else {
      makePageBox(numPage, i, i, 'page-box');

    }

    paginationArea.append(numPage);

    selectReviewListEvent(numPage, i);
  }

  // 이후 페이지 제작
  const nextPage = document.createElement('div');
  const maxPage = document.createElement('div');
  makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
  makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

  paginationArea.append(nextPage, maxPage);

  selectReviewListEvent(firstPage, 1);
  selectReviewListEvent(prevPage, pagination.prevPage);
  selectReviewListEvent(nextPage, pagination.nextPage);
  selectReviewListEvent(maxPage, pagination.maxPage);

}

/* 페이지네이션 박스에 클릭이벤트 추가 */
const selectReviewListEvent = (element, cp) => {

  element.addEventListener('click', () => {
    selectReviewList(cp);
    changeURL(cp);
  });

}


/* 리뷰 내용보기 버튼 클릭 시 내용 창 표시 */
const showBtn = document.getElementsByClassName('show-btn');
const reviewDetail = document.getElementsByClassName('review-detail');

for (let i = 0; i < showBtn.length; i++) {
  showBtn[i].addEventListener('click', () => {
    console.log('클릭');
    if (reviewDetail[i].classList.contains('hide')) {
      reviewDetail[i].classList.remove('hide');
    } else {
      reviewDetail[i].classList.add('hide');
    }
  })
}


