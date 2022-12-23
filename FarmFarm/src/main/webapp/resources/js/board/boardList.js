
// 와글와글 게시판 이름 바꿔주기 + 현재 게시판 알려주기
const boardTitle = document.querySelector(".board-top-title");
const boardAdd = location.pathname;
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const type3 = document.getElementById("type3");
if(boardAdd == '/board/1'){
    boardTitle.innerHTML = "와글와글 물물교환";
    type1.classList.add("nowType");
    type2.classList.remove("nowType");
    type3.classList.remove("nowType");
}
if(boardAdd == '/board/2'){
    boardTitle.innerHTML="와글와글 팁";
    type1.classList.remove("nowType");
    type2.classList.add("nowType");
    type3.classList.remove("nowType");
}
if(boardAdd == '/board/3'){
    boardTitle.innerHTML="와글와글 질문";
    type1.classList.remove("nowType");
    type2.classList.remove("nowType");
    type3.classList.add("nowType");
}


// 검색 시 검색어 유지시키기
(()=>{
    const boardSearch = document.querySelector(".board-search");
    
    if(boardSearch != null){
        const params = new URL(location.href).searchParams
        
        const input = document.getElementById("query");
        const query = params.get("query");

        input.value = query;
    }
})();


// 이건.... value값 확인해본건데 spring으로 넘어가려나....
const test = document.getElementById("boardSelect");
test.addEventListener("change",()=>{
    const value = test.options[test.selectedIndex].value;
    console.log(value);
    test.setAttribute("value", value);
});

// 글쓰기를 누르면 그 보드타입넘버가 저장되서 글쓰기에 있었으면 좋겠는데 그게 되려나...?
// (()=>{
//     const boardSubmit = document.querySelector(".board-write");

//     if(boardSubmit != null){
//         boardSubmit.addEventListener("click", ()=>{
//             location.href = "/board/write"+boardTypeNo;
//         })
//     }
// })