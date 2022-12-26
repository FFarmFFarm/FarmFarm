// 페이지네이션 박스에 클릭 이벤트 추가
const pageBox = document.getElementsByClassName('page-box');

for(let page of pageBox) {
  page.addEventListener('click', function(e) {

    let cp = page.id;

    selectReviewList(cp);
    changeURL(cp);

  })
}


/* cp를 받아 리뷰 목록 조회해오기 */
const selectReviewList = (cp)=>{
  $.ajax({
    url:"/review/list", 
    data: {"cp":cp},
    dataType: "json",
    success: (map)=>{
      printReviewList(map.reviewList, map.pagination);
    },
    error: ()=>{}
  });
}


/* 조회해오 리뷰 목록을 화면에 출력 */
const printReviewList = (reviewList, pagination)=>{

  const reviewListContainer = document.getElementById('reviewListContainer');
  reviewListContainer.innerHTML = '';

  
  for(let review of reviewList){
    const reviewArea = document.createElement('div');

    reviewArea.classList.add('review');

    const div = document.createElement('div');
    reviewArea.append(div);

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review-container');

    div.append(reviewContainer);

    const reviewTitle = document.createElement('a');
    reviewTitle.classList.add('review-title');
    reviewTitle.href = "/product/" + review.productNo;

    reviewTitle.innerText = review.productName;

    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');

    reviewContainer.append(reviewTitle, reviewContent);
  
    const span = document.createElement('span');

    span.innerText = '내용보기'

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('fa-solid', 'fa-angle-right');

    reviewContent.append(span, button);

    const reviewDate = document.createElement('span');
    reviewDate.classList.add('review-reg-date');
    reviewDate.innerText = review.createDate;

    div.append(reviewDate);
    
    const reviewDetail = document.createElement('div');
    reviewDetail.classList.add('review-detail');

    reviewArea.append(reviewDetail);

    const reviewDetailContent = document.createElement('div');
    reviewDetailContent.classList.add('review-detail-content');

    reviewDetail.append(reviewDetailContent);

    const span1 = document.createElement('span');
    span1.innerText = review.productName;

    const p = document.createElement('p');
    p.innerHTML = review.reviewContent;

    reviewDetailContent.append(span1, p);

    const reivewImg = document.createElement('div');
    if(review.imgList.length > 0) {
      reivewImg.classList.add('review-img');

      for(let img of review.imgList) {
        const image = document.createElement('img');
        image.setAttribute('src', img.reviewImgPath);

        reivewImg.append(image);

      }      
    }

    reviewDetailContent.append(reivewImg);
    
    const reviewCreateDate = document.createElement('div');
    reviewCreateDate.classList.add('review-create-date');
    
    const span2 = document.createElement('span');
    span2.innerText = review.createDate;

    const span3 = document.createElement('span');
    span3.innerText = '도움 ';

    const span4 = document.createElement('span');
    span4.classList.add('review=helped');
    span4.innerHTML = review.likeCount;

    span3.append(span4);

    reviewCreateDate.append(span2, span3);

    reviewDetailContent.append(reviewCreateDate);   

    reviewListContainer.append(reviewArea);

  }

  const paginationArea = document.createElement('div');
  paginationArea.classList.add('pagination-area');
  
  reviewListContainer.append(paginationArea);

  printPagination(paginationArea, pagination);
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
  for(let i=pagination.startPage; i<=pagination.endPage; i++) {
      const numPage = document.createElement('div');
      if(i == pagination.currentPage) {
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
