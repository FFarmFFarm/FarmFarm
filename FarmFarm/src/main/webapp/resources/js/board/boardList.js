

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
