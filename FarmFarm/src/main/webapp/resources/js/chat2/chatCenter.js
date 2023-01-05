/* 채팅방 정보(roomLabel) */
const chattingBoxList = document.getElementsByClassName("chatting-box")
const roomThumbnailImg = document.getElementById("roomThumbnailImg");
const spreadBtn = document.getElementById("spreadBtn");
const roomLabel = document.getElementById("roomLabel");

/* 드롭다운 */
const roomEditBtn = document.getElementById("roomEditBtn");
const roomEditDropdown = document.getElementById("roomEditDropdown");

/* 채팅방 스크롤 하단 */
// const readingArea = document.getElementById('readingArea');
// let initialScrollHeight = document.getElementById("readingArea").scrollHeight;
// let bottomScrollHeight = 0;
// const bottomBtn = document.getElementById("bottomBtn");

window.addEventListener('DOMContentLoaded', ()=>{
    roomEditDropdown.classList.add('dropdown-fold');
    // readingArea.scrollTo(0,initialScrollHeight);
    // bottomScrollHeight = document.getElementById('readingArea').scrollTop;
})

/* 로딩 후 */
window.addEventListener("load", ()=>{
    if (roomThumbnailImg.scrollHeight > 67) {
        roomThumbnailImg.classList.add("label-fold");
        roomThumbnailImg.classList.remove("label-flex");
        spreadBtn.style.display="block";
    } else{
        roomThumbnailImg.classList.remove("label-fold");
        roomThumbnailImg.classList.add("label-flex");
        spreadBtn.style.display="none";
    }
})


/* 버튼을 눌렀을 떄! */
for(box of chattingBoxList) {
    box.addEventListener("click", ()=> {
        if(roomThumbnailImg.scrollHeight > 67) {
            roomThumbnailImg.classList.add("label-fold");
            roomThumbnailImg.classList.remove("label-flex");
            roomThumbnailImg.classList.remove("label-spread");
            spreadBtn.style.display="block";
        } else{
            roomThumbnailImg.classList.add("label-flex");
            roomThumbnailImg.classList.remove("label-spread");
            roomThumbnailImg.classList.remove("label-fold");
            spreadBtn.style.display="none";
        }
    })
}

/* 펼치기 기능 */
spreadBtn.addEventListener("click", ()=>{
    if(roomThumbnailImg.classList.contains("label-fold")) {
        roomThumbnailImg.classList.remove("label-fold");
        roomThumbnailImg.classList.add("label-spread");
        spreadBtn.classList.add("spreadBtn-rotate");
        return;
    }

    if(roomThumbnailImg.classList.contains("label-spread")) {
        roomThumbnailImg.classList.remove("label-spread")
        roomThumbnailImg.classList.add("label-fold")
        spreadBtn.classList.remove("spreadBtn-rotate");
        return;
    }
})

spreadBtn.addEventListener("click", ()=>{
    if(roomThumbnailImg.classList.contains("label-spread")) {
        // roomLabel.style.alignItems='flex-start';
        return;
    }
    if(!roomThumbnailImg.classList.contains("label-spread")) {
        // roomLabel.style.alignItems='center';
        return;
    }
})


/* 드롭다운 열기 */
roomEditBtn.addEventListener("click", ()=>{
    roomEditDropdown.classList.toggle('dropdown-spread');
    roomEditDropdown.classList.toggle('dropdown-fold');
})


// /* reading-area */
// readingArea.addEventListener("scroll", ()=>{
//     let nowScrollHeight = document.getElementById("readingArea").scrollTop;
//     if(nowScrollHeight < bottomScrollHeight - 300) {
//         bottomBtn.style.display='flex';
//     } else {
//         bottomBtn.style.display='none';
//     }
// })

// /* 하단 버튼 이동 */

// bottomBtn.addEventListener('click', ()=>{
//     readingArea.scrollTo(0, initialScrollHeight);
// })

/* 검색창 만들기 이벤트 */
document.getElementById('searchBtn').addEventListener('click', () => {
    let input = document.getElementById('searchBar');

    if (input.value.trim().length == 0) {
        input.focus();
    } else {

        console.log('검색중이에요.........')

        // 버튼 보여주세요
        document.getElementById('resetRoomSearch').style.display = 'block';

        let roomList = document.getElementsByClassName('chat-preview-box');

        for (room of roomList) {
            
            room.style.display = 'flex';
            let roomTitle = room.children[1].innerText;

            if (!roomTitle.includes(input.value)) {
                room.style.display = 'none';
            }
        }

    }

})


/* 채팅방 유형 선택 이벤트 */
const roomTypeList = document.querySelectorAll("input[name='roomType']");

for(let roomType of roomTypeList) {

    roomType.addEventListener("click", ()=>{

        if(roomType.checked) {
            let roomList = document.getElementsByClassName('chat-preview-box');

            if(roomType.id==='all') {
                 for(room of roomList){
                    room.style.display = 'flex';
                 }
            } else {
                for (room of roomList) {
                    room.style.display = 'flex';
                    if(!room.classList.contains(roomType.id)) {
                        room.style.display = 'none';
                    }
                }

            }
        }
    })
}

