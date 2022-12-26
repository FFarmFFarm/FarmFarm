
/* 게시글 조회수, 최근 등록순 정렬하기 */
document.getElementById('sortNewest').addEventListener('click', (e) => { 

  if (! e.target.classList.contains('sort-clicked')) {
    sortFl = 'N'; 
    selectBoardListBySoltFl(1, sortFl); 

    e.target.classList.add('sort-clicked');
    document.getElementById('sortView').classList.remove('sort-clicked');
  }
})

document.getElementById('sortView').addEventListener('click', (e) => { 
  if (!e.target.classList.contains('sort-clicked')) { 
    console.log("조회수순")
    
    sortFl = 'V'; 
    selectBoardListBySoltFl(1, sortFl);

    e.target.classList.add('sort-clicked');
    document.getElementById('sortNewest').classList.remove('sort-clicked');
  }

})



// 페이지네이션 박스에 클릭 이벤트 추가
const pageBox = document.getElementsByClassName('page-box');

for(let page of pageBox) {
  page.addEventListener('click', function(e) {

    let cp = page.id;

    selectBoardList(cp);

    changeURL(cp);

  })
}


/* cp를 받아 게시글 목록 조회해오기 */
const selectBoardList = (cp)=>{
  $.ajax({
    url:"/board/list", 
    data: {"cp":cp, "sortFl": sortFl},
    dataType: "json",
    success: (map)=>{
      printBoardList(map.boardList, map.pagination);
    },
    error: ()=>{}
  });
}

/* cp를 받아 게시글 목록 조회해오기 */
const selectBoardListBySoltFl = (cp, sortFl)=>{
  $.ajax({
    url:"/board/list", 
    data: {"cp":cp, "sortFl":sortFl},
    dataType: "json",
    success: (map)=>{
      printBoardList(map.boardList, map.pagination);
    },
    error: ()=>{}
  });
}


/* 조회해온 게시글 목록을 화면에 출력 */
const printBoardList = (boardList, pagination)=>{

  const boardListContainer = document.getElementById('boardListContainer');
  boardListContainer.innerHTML = '';

  
  for(let board of boardList){

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board');

    const boardNo = document.createElement('span');
    boardNo.classList.add('board-no');
    boardNo.innerHTML = board.boardNo;

    boardContainer.append(boardNo);

    const boardTumbnail = document.createElement('div');
    boardTumbnail.classList.add('board-thumbnail');
    

    if(board.thumbnail != undefined){
      const boardThumbnailImg = document.createElement('img');
      boardThumbnailImg.classList.add('board-thumbnail-img');
      boardThumbnailImg.src = board.thumbnail;

      boardTumbnail.append(boardThumbnailImg);
    }

    boardContainer.append(boardTumbnail);

    const boardTitle = document.createElement('a');
    boardTitle.classList.add('board-title', 'title-line');
    boardTitle.href = '/board/' + board.boardTypeNo + '/' + board.boardNo;

    const titleDiv = document.createElement('div');


    if(board.boardTitle.length >= 27) {
      titleDiv.innerHTML = board.boardTitle + "...";
    } else {
      titleDiv.innerHTML = board.boardTitle;
    }

    boardTitle.append(titleDiv);

    const span = document.createElement('span');
    span.innerHTML = '[' + board.commentCount + ']';

    boardTitle.append(span);

    boardContainer.append(boardTitle);

    const boardRegDate = document.createElement('span');
    boardRegDate.classList.add('board-reg-date');
    boardRegDate.innerHTML = board.boardDate;

    const boardReadCount = document.createElement('span');
    boardReadCount.classList.add('board-read-count');
    boardReadCount.innerHTML = board.boardView;

    boardContainer.append(boardRegDate, boardReadCount);

    boardListContainer.append(boardContainer);
    
  }

  const paginationArea = document.createElement('div');
  paginationArea.classList.add('pagination-area');
  
  boardListContainer.append(paginationArea);

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

      selectBoardListEvent(numPage, i);
  }
  
  // 이후 페이지 제작
  const nextPage = document.createElement('div');
  const maxPage = document.createElement('div');
  makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
  makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

  paginationArea.append(nextPage, maxPage);

  selectBoardListEvent(firstPage, 1);
  selectBoardListEvent(prevPage, pagination.prevPage);
  selectBoardListEvent(nextPage, pagination.nextPage);
  selectBoardListEvent(maxPage, pagination.maxPage);

}

/* 페이지네이션 박스에 클릭이벤트 추가 */
const selectBoardListEvent = (element, cp) => {
  
  element.addEventListener('click', () => {
    selectBoardList(cp);
    changeURL(cp);
  });

}
