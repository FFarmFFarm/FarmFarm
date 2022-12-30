
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

// const boardSelect = document.getElementById("boardSelect");
// boardSelect.addEventListener("change", ()=>{
//     const value = boardSelect.options[boardSelect.selectedIndex].value;
//     console.log(value);
//     boardSelect.setAttribute("value", value);

//     $.ajax({
//         url: "board/${boardTypeNo}",
//         data : {"query" : query, "NVL" : NVL, "query" : query},
//         dataType : "JSON",
//         success : ()=>{

//             const boardListArea = document.querySelector(".board-list-area");
//             boardListArea.innerHTML="";
//             boardListArea.classList.add(".board-list-area");

//             if(  )


//         },
//         error : ()=>{
//             alert("리스트 불러오기 ajax 통신 오류");
//             console.log("리스트 불러오기 ajax 통신 오류");
//         }
//     })

// })




// 글쓰기를 누르면 그 보드타입넘버가 저장되서 글쓰기에 있었으면 좋겠는데 그게 되려나...?
// (()=>{
//     const boardSubmit = document.querySelector(".board-write");

//     if(boardSubmit != null){
//         boardSubmit.addEventListener("click", ()=>{
//             location.href = "/board/write"+boardTypeNo;
//         })
//     }
// })

