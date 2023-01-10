// var Contextmenu = !function () {
//     var id = 'contextmenu';
//     {
//         var div = document.createElement('div');
//         div.id = id;
//         div.style = 'display:none;position:fixed;width:150px; height:200px; background: #fff;box-shadow:1px 1px 5px 0 rgba(0, 0, 0, 0.54)';
//         document.body.appendChild(div);
//     }
//     var div = document.getElementById(id);
//     document.addEventListener("contextmenu", function (e) {

//         e.preventDefault();

//         var x = e.pageX + 'px';
//         var y = e.pageY + 'px';
//         div.style.display = 'block';
//         div.style.left = x;
//         div.style.top = y;
//     })
//     document.addEventListener("click", function (e) { div.style.display = 'none' })
// }()

let selectedChatNo = 0;


// 보낸 채팅 우클릭 이벤트
document.addEventListener('contextmenu', (e) => {

    // 챗의 id를 가져오고, 우클릭 이벤트를 막음
    if( (e.target.classList.contains('sent-bubble')) || (e.target.parentElement.classList.contains('sent-bubble')) ) {
        // 우클릭한게 sent-bubble이면
        e.preventDefault(); 

        // id를 변수에 저장하고
        if(e.target.classList.contains('sent-bubble')) {
            selectedChatNo=e.target.id;
        }
        if(e.target.parentElement.classList.contains('sent-bubble')) {
            selectedChatNo=e.target.parentElement.id;
        }
        // 준비된 context 메뉴를 노출
        let x = e.pageX + 'px';
        let y = e.pageY + 'px';

        // sent 메세지용 context 메뉴를 선택
        let contextMenu = document.getElementById('sentBubbleContextMenu');
        contextMenu.style.display='block';
        contextMenu.style.left=x;
        contextMenu.style.top=y;

        // 각 칸에 이벤트를 부여함
        document.getElementById('deleteChat').addEventListener('click',()=>{
            // 모달 그림자
            document.getElementById('chatRoomMenuModal').classList.remove('hide');
            // 삭제 모달 보이기
            document.querySelector('.delete-menu').classList.remove('hide');

        })

    } else { // 다른 영역 우클릭 시 닫음
        document.getElementById('sentBubbleContextMenu').style.display='none';
    }
    addEventListener('click',()=>{ // 클릭 시 닫음
        document.getElementById('sentBubbleContextMenu').style.display = 'none';
    })
    document.getElementById('readingArea').addEventListener('scroll', () => {
        document.getElementById('sentBubbleContextMenu').style.display = 'none';
    })


})


// 받은 채팅 우클릭 이벤트
addEventListener('contextmenu', (e)=>{
    if(e.target.classList.contains('received-bubble') || e.target.parentElement.classList.contains('received-bubble')){
        // 우클릭한게 received-bubble이면
        e.preventDefault();

        // id를 변수에 저장하고
        if (e.target.classList.contains('received-bubble')) {
            selectedChatNo = e.target.id;
        }
        if (e.target.parentElement.classList.contains('received-bubble')) {
            selectedChatNo = e.target.parentElement.id;
        }
        // 준비된 context 메뉴를 노출
        let x = e.pageX + 'px';
        let y = e.pageY + 'px';

        // sent 메세지용 context 메뉴를 선택
        let contextMenu = document.getElementById('receivedBubbleContextMenu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = x;
        contextMenu.style.top = y;

        // 각 칸에 이벤트를 부여함
        document.querySelector('.report-modal').addEventListener('click', () => {
            // 모달 그림자
            document.getElementById('chatRoomMenuModal').classList.remove('hide');
            // 삭제 모달 보이기
            // document.querySelector('.report-menu').classList.remove('hide');
        })
    } else { // 다른 영역 우클릭 시 닫음
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';
    }
    addEventListener('click', () => { // 클릭 시 닫음
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';
    })
    document.getElementById('readingArea').addEventListener('scroll',()=>{
        document.getElementById('receivedBubbleContextMenu').style.display = 'none';  
    })

})



/* 클립보드에 복사하기 */
// const copy = (text) => {
//     // 임시의 textarea 생성
//     const $textarea = document.createElement("textarea");

//     // body 요소에 존재해야 복사가 진행됨
//     document.body.appendChild($textarea);

//     // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
//     $textarea.value = text;
//     $textarea.select();

//     // 복사 후 textarea 지우기
//     document.execCommand('copy');
//     document.body.removeChild($textarea);
// };

/* 삭제하기 이벤트 */

// 각 버튼 별 이벤트 부여하기
const deleteMenuCalcelBtn = document.getElementById('deleteMenuCalcelBtn');
const deleteMenuConfirmBtn = document.getElementById('deleteMenuConfirmBtn');

// 취소 버튼 누르면 그냥 닫음
deleteMenuCalcelBtn.addEventListener('click', () => {
    document.getElementById('chatRoomMenuModal').classList.add('hide');
    document.querySelector('.delete-menu').classList.add('hide');
})

// 확인 버튼 누르면 삭제 요청함
if (deleteMenuConfirmBtn) {
    deleteMenuConfirmBtn.addEventListener('click', () => {
        let formData = new FormData();
        formData.append("chatNo", selectedChatNo);
        axios.post("/chat/delete", formData
        ).then(function (response) {
            if (response.data > 0) {
                console.log("삭제되었습니다.")

                // 삭제 동기화를 위해서 채팅방을 불러옴
                selectChatList2(selectedRoomNo);

                // 채팅방에 참가중인 다른 이용자의 채팅 동기화를 위해서 빈 메세지를 전달함
                let obj = {
                    "roomNo": selectedRoomNo,
                    "chatType": 'U' // Update하라는 의미입니다.
                };

                chattingSock.send(JSON.stringify(obj));

                // 모달창 닫음
                document.getElementById('chatRoomMenuModal').classList.add('hide');
                document.querySelector('.delete-menu').classList.add('hide');

                // 선택 채팅 초기화
                selectedChatNo = 0;
            }

        }).catch(function (error) {
            console.log("채팅 삭제 중 오류 발생")
            console.log(error)
        })
    })
}

/* 신고하기 이벤트 */

// 각 버튼 별 이벤트 부여하기
const reportMenuCalcelBtn = document.getElementById('reportMenuCalcelBtn');
const reportMenuConfirmBtn = document.getElementById('reportMenuConfirmBtn');

// 취소 버튼 누르면 그냥 닫음
// reportMenuCalcelBtn.addEventListener('click', () => {
//     document.getElementById('chatRoomMenuModal').classList.add('hide');
//     // document.querySelector('.report-menu').classList.add('hide');
// })

// // 확인 버튼 누르면 신고 진행함
// if (reportMenuConfirmBtn) {
//     reportMenuConfirmBtn.addEventListener('click', () => {


//         /* 
        
//         신고 관련 기능은 이곳에 적어주세요!!
        
//         */

//         console.log('신고 기능 준비중입니다.')
//         console.log('선택한 채팅의 작성자 번호는 ' + selectedChatNo + "입니다." );
//     })
// }


const selectChatList2 = (roomNo) => {
    let formData = new FormData();

    formData.append("memberNo", myMemberNo);
    // 채팅 목록 가져오기
    axios.post('/chat/select/' + roomNo, formData)
        .then(function (response) {

            // 선택한 채팅방의 채팅 내역
            const chatRoom = response.data.chatRoom;
            const chatList = response.data.chatList;

            // 채팅 전송을 위해 전역 변수 세팅
            selectedRoomNo = roomNo;
            senderNo = myMemberNo;

            // 채팅방 목록 요청(동기화)
            selectChatRoomList();

            // 채팅방 만들기
            makeChatRoom(chatRoom, chatList);

            // 가림막 치우기
            document.getElementById('roomBodyBlinder').style.display = 'none';

            // 이모티콘 에리어 닫기
            document.querySelector('.emoticon-container').classList.add('emoticon-hide');

            // 사진 영역 제거
            document.getElementById('inputImgPreview').removeAttribute('src');
            document.getElementById('inputImgPreviewBox').style.height = 0;
            document.getElementById('inputImgPreviewBox').style.opacity = 0;

            // UnreadCount를 0으로 만듦
            updateReadCount();
            updateUnreadCount();

        }).catch(function (error) {
            console.log(error);
            // location.href = '/error';
        });
}


/* 채팅방을 만드는 함수2 */
const makeChatRoom2 = (chatRoom, chatList) => {

    // 라벨 영역
    // 드롭다운 숨기기
    document.getElementById('roomEditDropdown').classList.remove('dropdown-spread');
    document.getElementById('roomEditDropdown').classList.add('dropdown-fold');

    const roomThumbnailImg = document.getElementById('roomThumbnailImg');
    const roomTitle = document.getElementById('roomTitle');
    document.querySelector('.chat-room-id').id = chatRoom.roomNo;


    if (chatRoom.roomType > 0) {
        document.getElementById('inviteBtn').style.display = "none";
        document.getElementById('purchaseBtn').style.display = 'flex';
        // 구매하기 버튼에 상세페이지 이벤트 부여
        document.getElementById('purchaseBtn').addEventListener('click', () => {
            goToPostDetail(chatRoom.roomType);
        })
        if (chatRoom.thumbnailImg == undefined) {
            roomThumbnailImg.innerHTML = "<img src='/resources/images/member/user.png'>";
        } else {
            roomThumbnailImg.innerHTML = "<img src=" + chatRoom.thumbnailImg + ">";
        }
        roomTitle.innerHTML = chatRoom.postTitle;
    } else {
        document.getElementById('inviteBtn').style.display = "flex";
        document.getElementById('purchaseBtn').style.display = 'none';
        roomThumbnailImg.innerHTML = "<img src='/resources/images/chat2/default/talking.png'>"
        roomTitle.innerHTML = chatRoom.roomName;
    }

    // 읽기 영역
    const readingArea = document.getElementById('readingArea');

    // 읽기 영역 비우기
    readingArea.innerHTML = '';

    // 날짜 라벨 초기화
    nowDate = '';

    // const chatTime = 2023-01-04 11:26:14

    // 채팅 메세지 넣기
    for (let chat of chatList) {

        const chatDate = chat.chatTime.substring(0, 10);

        // 날짜 라벨 업데이트
        if (nowDate != chatDate) {
            nowDate = chatDate;

            const dateLabel = document.createElement('div');
            const dateLabelLine = document.createElement('div');

            packUpElement(dateLabel, 'date-label', nowDate);
            packUpElement(dateLabelLine, 'date-label-line');

            dateLabelLine.append(dateLabel);
            readingArea.append(dateLabelLine);

        }

        if (chat.chatType === "S") {

            const systemChat = document.createElement('div');
            packUpElement(systemChat, 'system-chat', chat.chatContent);

            const systemChatBox = document.createElement('div');
            packUpElement(systemChatBox, 'system-chat-box', null);

            systemChatBox.append(systemChat);
            readingArea.append(systemChatBox);

        } else {

            // chatTime를 잘라서 원하는 시간으로 만듦
            const newChatTime = makeNewChatTime(chat.chatTime);

            if (chat.memberNo == myMemberNo) { // 보낸 메세지인 경우
                const sentChat = makeSentChat(chat, newChatTime);

                readingArea.append(sentChat)

            } else { // 수신 메세지인 경우
                const receivedChat = makeReceivedChat(chat, newChatTime);

                readingArea.append(receivedChat);
            }
        }
    }

}