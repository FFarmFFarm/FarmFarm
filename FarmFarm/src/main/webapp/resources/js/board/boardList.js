
// 와글와글 게시판 이름 바꿔주기
const boardTitle = document.querySelector(".board-top-title");
const boardAdd = location.pathname;
if(boardAdd == '/board/1'){
    boardTitle.innerHTML = "와글와글 물물교환";
}
if(boardAdd == '/board/2'){
    boardTitle.innerHTML="와글와글 팁";
}
if(boardAdd == '/board/3'){
    boardTitle.innerHTML="와글와글 질문";
}

// 이건.... value값 확인해본건데 spring으로 넘어가려나....
const test = document.getElementById("boardSelect");
test.addEventListener("change",()=>{
    const value = test.options[test.selectedIndex].value;
    console.log(value);
    test.setAttribute("value", value);
});