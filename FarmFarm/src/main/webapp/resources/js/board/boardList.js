

// 와글와글 게시판 이름 바꿔주기 + 현재 게시판 알려주기
const boardTitle = document.querySelector(".board-top-title");
const boardAdd = location.pathname;
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const type3 = document.getElementById("type3");
const type4 = document.getElementById("type4");
if(boardAdd == '/board/1'){
    boardTitle.innerHTML = "와글와글 물물교환";
    type1.classList.add("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
    type4.classList.remove("nowType");
}
if(boardAdd == '/board/2'){
    boardTitle.innerHTML="와글와글 팁";
    type1.classList.remove("nowType");
    type2.classList.add("nowType");
    type3.classList.remove("nowType");
    type4.classList.remove("nowType");
}
if(boardAdd == '/board/3'){
    boardTitle.innerHTML="와글와글 질문";
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
    type4.classList.remove("nowType");
}
if(boardAdd == '/board/4'){
    boardTitle.innerHTML="CoolCool";
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
    type4.classList.add("nowType");
}
if(boardAdd == '/board/4'){
    boardTitle.innerHTML="아무도 들어오지마 시원이꺼";
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
}


// 검색 시 검색어 유지시키기
(()=>{
    const boardSearch = document.querySelector(".board-search");
    const inputQuery = document.getElementById("inputQuery");
    
    if(boardSearch != null){
        const params = new URL(location.href).searchParams
        
        const query = params.get("query");

        inputQuery.value = query;
    }
})();


// 이건.... value값 확인해본건데 spring으로 넘어가려나....
// 최신순, 조회수, 좋아요
const boardSelect = document.getElementById("boardSelect");
(()=>{boardSelect.addEventListener("change",()=>{
    const value = boardSelect.options[boardSelect.selectedIndex].value;
    console.log(value);
    boardSelect.setAttribute("value", value);
});})()


// 로그인안된 회원은 못가게 막아보자
const goBoard = document.getElementsByClassName("goBoard");
for(let go of goBoard){
    go.addEventListener("click", e=>{
        if(loginYN == ""){
            loginConfirmOpen();
            e.preventDefault();
        }
    })

}


// 정렬을 누르면 밑에 정렬이 뜨게 만들어 볼까~~?
const boardNowSort = document.querySelector(".board-now-sort");
const boardSelectSort = document.querySelector(".board-select-sort");
boardNowSort.addEventListener("click", ()=>{
    boardSelectSort.classList.toggle("toggle");
});



// 게시글 목록을 ajax로 불러와봅시다!
// 불러오는 부분을 만들어서 appen 시켜주기

// board-list-title의 원래 모양을 저장해둬볼까요?
let beforeBoardListTitle;
const printBoardList=(boardMap)=>{

    const boardList = boardMap.boardList;
    const pagination = boardMap.pagination;

    const boardListTop = document.querySelector(".board-list-top");
    
    const boardListTitle = document.querySelector(".board-List-title");
    beforeBoardListTitle = boardListTitle.innerHTML;

    boardListTop.innerHTML = "";

    // 게시글 리스트가 나오는 부분입니당~
    const boardListArea = document.createElement("ul");
    boardListArea.classList.add(".board-list-area");

    // 페이지네이션 영역
    const paginationArea = document.querySelector('.pagination-area');
    paginationArea.innerHTML = "";

    if(boardList.length == 0){
        const emptyList = document.createElement("div");
        emptyList.classList.add("empty-list");
        emptyList.innerHTML = "등록된 게시글이 업습니다.<br>첫 게시물의 주인공이 되어보세요!";
    }else{
        for(let board of boardList){
            const li = document.createElement("li");
            
            // 게시글 번호
            const boardNo = document.createElement("span");
            boardNo.classList.add("board-no");
            boardNo.innerText = board.boardNo;

            // 게시글 제목
            const boardTitle = document.createElement("span");
            boardTitle.classList.add("board-title");
            const boardA = document.createElement("a");
            boardA.classList.add("goBoard");
            boardA.setAttribute("href", "/board/"+boardTypeNo+"/"+board.boardNo+"?cp="+pagination.currentPage+sURL);
            boardA.innerHTML = board.boardTitle+"&nbsp;("+board.commentCount+")";

            // 게시글 작성자 닉네임
            const boardWriter = document.createElement("span");
            boardWriter.classList.add("board-writer");
            boardWriter.innerText = board.memberNickname;

            // 게시글 작성일
            const boardDate = document.createElement("span");
            boardDate.classList.add("board-date");
            boardDate.innerText = board.boardDate;

            // 게시글 조회수
            const boardView = document.createElement("span");
            boardView.classList.add("board-view");
            boardView.innerText = board.boardView;

            // appen 합니당
            li.append(boardNo, boardTitle, boardWriter, boardDate, boardView);
            boardTitle.append(boardA);
        }

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
        }
        
        // 이후 페이지 제작
        const nextPage = document.createElement('div');
        const maxPage = document.createElement('div');
        makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
        makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

        paginationArea.append(nextPage, maxPage);

        // 페이지 이벤트 생성
        makePageBoxEvent();
    }

}


/* 페이지 선택 이벤트 추가 함수 */
const makePageBoxEvent = () => {
    const pageBoxList = document.getElementsByClassName('page-box');

    for (let pageBox of pageBoxList) {
        pageBox.addEventListener('click', () => {
            const url = location.search;
            const isKeyword = url.indexOf('?keyword=', 0);

            if(isKeyword == -1) { // 주소창에 키워드가 없는 경우(키워드 유지X)
                // 카테고리 선택   
                let category = getCheckedCategory();

                // 페이지 선택
                let cp = pageBox.id;
    
                // 선택한 정보로 페이지를 생성
                getCustomList(category, cp);
    
                // history에 저장
                makeHistory1(category, cp);
            } else { // 주소창에 키워드가 있는 경우(키워드 유지)
                // 첫 번째 = 의 위치
                const firstEqualSign = url.indexOf('=', 1);

                // 첫 번째 & 의 위치
                const firstAndSign = url.indexOf('&', firstEqualSign);

                // 주소창에서 검색어를 잘라냄
                let keywordEncoded = url.substring(firstEqualSign + 1, firstAndSign)
        
                // 주소창 인코딩
                let keyword = decodeURIComponent(keywordEncoded);

                // 페이지 생성
                getCustomList2(beforeKeyword, beforeCategoryNo, beforePageNo);

                // history에 저장
                makeHistory2(keyword, category, cp);
            }
        })
    }
}











// 글쓰기를 누르면 그 보드타입넘버가 저장되서 글쓰기에 있었으면 좋겠는데 그게 되려나...?
// (()=>{
//     const boardSubmit = document.querySelector(".board-write");

//     if(boardSubmit != null){
//         boardSubmit.addEventListener("click", ()=>{
//             location.href = "/board/write"+boardTypeNo;
//         })
//     }
// })

