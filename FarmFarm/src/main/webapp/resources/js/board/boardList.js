


// 게시글 목록을 ajax로 불러와봅시다!
// 불러오는 부분을 만들어서 appen 시켜주기

// board-list-title의 원래 모양을 저장을 위한 변수선언
let beforeBoardListTitle;

const showBoardList = ()=>{

    // board-list-title의 원래 모양을 저장
    const boardListTitle = document.querySelector(".board-List-title");
    // beforeBoardListTitle = boardListTitle.innerHTML;

    $.ajax({
        url : "/board/list/"+boardTypeNo,
        data : {"boardTypeNo" : boardTypeNo,
                "cp" : cp,
                "query" : query,
                "sort" : sort
                },
        dataType : "JSON",
        success : boardMap=>{

            const boardList = boardMap.boardList;
            const pagination = boardMap.pagination;
            const query = boardMap.query;
            const sort = boardMap.sort;

            console.log(query);
            console.log("ok");

            let sURL;
            if(query != ""){
                sURL = "&query="+query;
            }else{
                sURL = "";
            }

            let soURL;
            if(sort != ""){
                soURL = "&sort="+sort;
            }else{
                soURL = "";
            }

            // 리스트들을 감싸고 있는거 없애주기
            const boardListTop = document.querySelector(".board-list-top");
            boardListTop.innerHTML = "";

            // ul태그 부분을 만들어봅시당~
            const boardListArea = document.createElement("ul");
            boardListArea.classList.add("board-list-area")
        
            if(boardList.length == 0){
                const emptyList = document.createElement("div");
                emptyList.classList.add("empty-list");
                emptyList.innerText="등록된 게시글이 없습니다. 첫 게시물의 주인공이 되어보세요!";
                boardListArea.append(emptyList);
            }else{
                for(let board of boardList){
                    const li = document.createElement("li");

                    const boardNo = document.createElement("span");
                    boardNo.classList.add("board-no");
                    boardNo.innerText = board.boardNo;

                    const boardTitle = document.createElement("span");
                    boardTitle.classList.add("board-title");
                    const goBoard = document.createElement("a");
                    goBoard.classList.add("goBoard");
                    goBoard.setAttribute("href", "/board/"+boardTypeNo+"/"+board.boardNo+"?cp="+pagination.currentPage+sURL+soURL);
                    goBoard.innerHTML = board.boardTitle+"&nbsp;("+board.commentCount+")";
                    boardTitle.append(goBoard);

                    const boardWriter = document.createElement("span");
                    boardWriter.classList.add("board-writer");
                    boardWriter.setAttribute("id", board.memberNo);
                    boardWriter.innerText = board.memberNickname;
                    
                    const boardDate = document.createElement("span");
                    boardDate.classList.add("board-date");
                    boardDate.innerText = board.boardDate;
                    
                    const boardView = document.createElement("span");
                    boardView.classList.add("board-view");
                    boardView.innerText = board.boardView;

                    boardListArea.append(li);
                    li.append(boardNo, boardTitle, boardWriter, boardDate, boardView);
                }
            }

            // 페이지네이션 부분임돵
            const boardWriteBottom = document.createElement("div");
            boardWriteBottom.classList.add("board-write-bottom");

            const boardPagination = document.createElement("ul");
            boardPagination.classList.add("board-pagination");

            // 첫 페이지
            const firstLi = document.createElement("li");
            const firstA = document.createElement("a");
            firstA.setAttribute("href", "/board/"+boardTypeNo+"?cp=1"+sURL+soURL);
            firstA.innerHTML = "&lt;&lt;";
            firstLi.append(firstA);

            // 이전 목록 마지막 번호이동
            const prevLi = document.createElement("li");
            const prevA = document.createElement("a");
            prevA.setAttribute("href", "/board/"+boardTypeNo+"?cp="+pagination.prevPage+sURL+soURL);
            prevA.innerHTML = "&lt;";
            prevLi.append(prevA);
            
            // 다음 시작 페이지 이동동
            const nextLi = document.createElement("li");
            const nextA = document.createElement("a");
            nextA.setAttribute("href", "/board/"+boardTypeNo+"?cp="+pagination.nextPage+sURL+soURL);
            nextA.innerHTML = "&gt;";
            nextLi.append(nextA);
            
            // 끝 페이지로 이동동동
            const maxLi = document.createElement("li");
            const maxA = document.createElement("a");
            maxA.setAttribute("href", "/board/"+boardTypeNo+"?cp="+pagination.maxPage+sURL+soURL);
            maxA.innerHTML = "&gt;&gt;";
            maxLi.append(maxA);
            
            // 숫자가 나올 부분들임돵
            const tempLi = document.createElement("li");
            tempLi.classList.add("tempLi");
            
            boardPagination.append(firstLi, prevLi, nextLi, maxLi);
            
            for(let i = pagination.startPage; i<=pagination.endPage; i++){
                const pageNumLi = document.createElement("li");
                const pageNumA = document.createElement("a");
                if(i == pagination.currentPage){
                    pageNumA.classList.add("current");
                    pageNumA.innerText=i;
                    pageNumLi.append(pageNumA);
                    
                }else{
                    pageNumA.setAttribute("href", "/board/"+boardTypeNo+"?cp="+i+sURL+soURL)
                    pageNumA.innerText=i;
                    pageNumLi.append(pageNumA);
                }
                nextLi.before(pageNumLi);
            }
            
            if(loginYN != ""){
                const writeA = document.createElement("a");
                writeA.classList.add("board-write");
                writeA.setAttribute("href", "/board/write/"+boardTypeNo);
                writeA.innerText="글쓰기";
                boardWriteBottom.append(boardPagination, writeA);
                
                // boardListTop.append(boardListTitle, boardListArea, boardWriteBottom, writeA);
            }else{
                boardWriteBottom.append(boardPagination);

            }
            boardListTop.append(boardListTitle, boardListArea, boardWriteBottom);
            console.log("통신 성공");
        },
        error : ()=>{
            alert("리스트 조회 ajax 통신 시류ㅐㅠㅜㅠㅜ");
        }
    })

}


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
    // const boardSearch = document.querySelector(".board-search");
    const inputQuery = document.getElementById("inputQuery");
    
    if(inputQuery != null){
    // if(boardSearch != null){
        const params = new URL(location.href).searchParams
        
        const query = params.get("query");

        inputQuery.value = query;
    }
})();


// 이건.... value값 확인해본건데 spring으로 넘어가려나....
// 최신순, 조회수, 좋아요
// const boardSelect = document.getElementById("boardSelect");
// (()=>{boardSelect.addEventListener("change",()=>{
//     const value = boardSelect.options[boardSelect.selectedIndex].value;
//     console.log(value);
//     boardSelect.setAttribute("value", value);
// });})()


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
boardSelectSort.addEventListener("click", ()=>{
    boardSelectSort.classList.toggle("toggle");
})



// 정렬 선택 시 

const boardSort = document.querySelector(".board-sort");

document.getElementById("new").addEventListener("click", ()=>{
    sort = "new";
    boardSort.innerHTML = "최신순 &nbsp;";
    showBoardList();
})
document.getElementById("view").addEventListener("click", ()=>{
    sort = "view";
    boardSort.innerHTML = "조회수 &nbsp;";
    showBoardList();
})
document.getElementById("like").addEventListener("click", ()=>{
    sort = "like";
    boardSort.innerHTML = "좋아요 &nbsp;";
    showBoardList();
})