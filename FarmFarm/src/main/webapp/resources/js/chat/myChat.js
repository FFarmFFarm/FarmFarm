/* 채팅방 정보(roomLabel) */
const chattingBoxList = document.getElementsByClassName("chatting-box")
const postTitle = document.getElementById("postTitle");
const spreadBtn = document.getElementById("spreadBtn");
const roomLabel = document.getElementById("roomLabel");

/* 드롭다운 */
const roomEditBtn = document.getElementById("roomEditBtn");
const roomEditDropdown = document.getElementById("roomEditDropdown");

/* 채팅방 스크롤 하단 */
const readingArea = document.getElementById('readingArea');
let initialScrollHeight = document.getElementById("readingArea").scrollHeight;
let bottomScrollHeight = 0;
const bottomBtn = document.getElementById("bottomBtn");

window.addEventListener('DOMContentLoaded', ()=>{
    roomEditDropdown.classList.add('dropdown-fold');
    readingArea.scrollTo(0,initialScrollHeight);
    bottomScrollHeight = document.getElementById('readingArea').scrollTop;
})

/* 로딩 후 */
window.addEventListener("load", ()=>{
    if(postTitle.scrollHeight > 67) {
        postTitle.classList.add("label-fold");
        postTitle.classList.remove("label-flex");
        spreadBtn.style.display="block";
    } else{
        postTitle.classList.remove("label-fold");
        postTitle.classList.add("label-flex");
        spreadBtn.style.display="none";
    }
})


/* 버튼을 눌렀을 떄! */
for(box of chattingBoxList) {
    box.addEventListener("click", ()=> {
        if(postTitle.scrollHeight > 67) {
            postTitle.classList.add("label-fold");
            postTitle.classList.remove("label-flex");
            postTitle.classList.remove("label-spread");
            spreadBtn.style.display="block";
        } else{
            postTitle.classList.add("label-flex");
            postTitle.classList.remove("label-spread");
            postTitle.classList.remove("label-fold");
            spreadBtn.style.display="none";
        }
    })
}

/* 펼치기 기능 */
spreadBtn.addEventListener("click", ()=>{
    if(postTitle.classList.contains("label-fold")) {
        postTitle.classList.remove("label-fold");
        postTitle.classList.add("label-spread");
        spreadBtn.classList.add("spreadBtn-rotate");
        return;
    }

    if(postTitle.classList.contains("label-spread")) {
        postTitle.classList.remove("label-spread")
        postTitle.classList.add("label-fold")
        spreadBtn.classList.remove("spreadBtn-rotate");
        return;
    }
})

spreadBtn.addEventListener("click", ()=>{
    if(postTitle.classList.contains("label-spread")) {
        // roomLabel.style.alignItems='flex-start';
        return;
    }
    if(!postTitle.classList.contains("label-spread")) {
        // roomLabel.style.alignItems='center';
        return;
    }
})


/* 드롭다운 열기 */
roomEditBtn.addEventListener("click", ()=>{
    roomEditDropdown.classList.toggle('dropdown-spread');
    roomEditDropdown.classList.toggle('dropdown-fold');
})


/* reading-area */
readingArea.addEventListener("scroll", ()=>{
    let nowScrollHeight = document.getElementById("readingArea").scrollTop;
    if(nowScrollHeight <bottomScrollHeight - 300) {
        bottomBtn.style.display='flex';
    } else {
        bottomBtn.style.display='none';
    }
})

/* 하단 버튼 이동 */

bottomBtn.addEventListener('click', ()=>{
    readingArea.scrollTo(0, initialScrollHeight);
})