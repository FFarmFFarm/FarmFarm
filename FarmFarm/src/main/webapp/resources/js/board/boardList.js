

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
const printBoardList=(boardList, pagination)=>{

    const boardListTop = document.querySelector(".board-list-top");
    
    const boardListTitle = document.querySelector(".board-List-title");
    beforeBoardListTitle = boardListTitle.innerHTML;

    boardListTop.innerHTML = "";

    // 게시글 리스트가 나오는 부분입니당~
    const boardListArea = document.createElement("ul");
    boardListArea.classList.add(".board-list-area");


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

