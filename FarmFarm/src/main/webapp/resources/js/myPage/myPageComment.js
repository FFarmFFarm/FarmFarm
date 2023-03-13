// 페이지네이션 박스에 클릭 이벤트 추가
const pageBox = document.getElementsByClassName('page-box');

for(let page of pageBox) {
  page.addEventListener('click', function(e) {

    let cp = page.id;

    selectCommentList(cp);
    changeURL(cp);

  })
}


/* cp를 받아 리뷰 목록 조회해오기 */
const selectCommentList = (cp)=>{
  $.ajax({
    url:"/comments/list", 
    data: {"cp":cp},
    dataType: "json",
    success: (map)=>{
      printCommentList(map.commentList, map.pagination);
    },
    error: ()=>{}
  });
}


/* 조회해오 리뷰 목록을 화면에 출력 */
const printCommentList = (commentList, pagination)=>{

  const commentListContainer = document.getElementById('commentListContainer');
  commentListContainer.innerHTML = '';

  
  for(let comment of commentList) {
    const commentArea = document.createElement('div');
    commentArea.classList.add('comment');

    commentListContainer.append(commentArea);
    
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');

    commentArea.append(commentContainer);

    const commentContent = document.createElement('span');
    commentContent.classList.add('comment-content');
    commentContent.innerHTML = comment.commentContent;

    const boardTitle = document.createElement('a');
    boardTitle.classList.add('comment-title');
    boardTitle.href = '/boards/' + comment.boardTypeNo + '/' + comment.boardNo;
    boardTitle.innerHTML = comment.boardTitle + '[' + comment.commentCount + ']';

    commentContainer.append(commentContent, boardTitle);

    const commentDate = document.createElement('span');
    commentDate.classList.add('comment-reg-date');
    commentDate.innerHTML = comment.commentDate;

    commentArea.append(commentDate);


  }

  const paginationArea = document.createElement('div');
  paginationArea.classList.add('pagination-area');
  
  commentListContainer.append(paginationArea);

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

      selectCommentListEvent(numPage, i);
  }
  
  // 이후 페이지 제작
  const nextPage = document.createElement('div');
  const maxPage = document.createElement('div');
  makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
  makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

  paginationArea.append(nextPage, maxPage);

  selectCommentListEvent(firstPage, 1);
  selectCommentListEvent(prevPage, pagination.prevPage);
  selectCommentListEvent(nextPage, pagination.nextPage);
  selectCommentListEvent(maxPage, pagination.maxPage);

}

/* 페이지네이션 박스에 클릭이벤트 추가 */
const selectCommentListEvent = (element, cp) => {
  
  element.addEventListener('click', () => {
    selectCommentList(cp);
    changeURL(cp);
  });

}
