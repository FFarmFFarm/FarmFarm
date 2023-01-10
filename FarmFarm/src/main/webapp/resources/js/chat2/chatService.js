// 전역변수
let myMemberNo;         // 내 회원 번호
let myMemberNickname;   // 내 닉네임
let myProfileImg;       // 내 사진
let myAuthority;        // 내 권한
let selectedRoomNo;     // 현재 보고 있는 방의 번호
let senderNo;           // 보낸 사람
let partnerNickname;    // 상대방의 닉네임
let partnerProfileImg;  // 상대방의 프로필 이미지
let nowDate;            // 현재 날짜

// 소켓
let chattingSock;


/* 내 채팅방 목록 가져오기 */
window.addEventListener("DOMContentLoaded", ()=>{
    connectToChattingSock();


})


/* 소켓과 연결하는 함수 */
const connectToChattingSock = () => {
    axios.post('/check/myInfo'
    ).then(function (response) {

        myMemberNo = response.data.memberNo;
        myMemberNickname = response.data.memberNickname;
        myProfileImg = response.data.profileImg;
        myAuthority = response.data.authority;

        if (myAuthority != 0) {
            document.querySelector('.chat-sidebar-footer').style.display='none';
        }

        if (myMemberNo != 0) {
            chattingSock = new SockJS('/echo/chat2');

            if (chattingSock != null) {

                console.log('채팅2 서버와 연결되었습니다.')

                // /chat/shortcut 경로를 통해 페이지에 접근한 경우 사용
                if (shortcutNo > 0) {
                    shortcut(shortcutNo);
                }

                chattingSock.onmessage = function (e) {
                    const chat = JSON.parse(e.data);

                    if(chat.chatType == 'U') { // 단순 U일때는 동기화만함
                        selectChatList(selectedRoomNo);
                    } else {
                        onMessage(chat);
                    }
                }

                chattingSock.onclose = function (e) {
                    console.log('채팅2 서버와 재연결을 시도합니다...');
                    console.log(e);

                    setTimeout(function () {
                        connectToChattingSock();
                    }, 3000);
                }
            }

            selectChatRoomList();

        }

    }).catch(function (error) {
        console.log(error);
    })
}

/* 내 채팅방 목록을 요청하는 함수 feat : axios */
const selectChatRoomList = () => {

    console.log('목록을 가져오고 있어요...')

    // 채팅방 리스트가 들어갈 자리
    const chatPreviewArea = document.querySelector('.chat-preview-area');

    // 보낼 값을 저장할 객체 formData
    let formData = new FormData();

    // formData에 check/login을 이용해 받아온 정보 세팅
    formData.append("memberNo", myMemberNo);

    // 내 채팅방 목록 가져오기
    axios.post('/chat/select/room', formData)
        .then(function (response) {
            // 채팅방 목록
            let chatRoomList = response.data.chatRoomList;

            // 검색창에 입력한 값이 없을 때만 채팅방 목록을 가져옵니다.
            if(document.getElementById('searchBar').value.trim().length == 0) {

                // 기존 채팅방 목록을 비우고...
                chatPreviewArea.innerHTML = "";

                // 채팅 프리뷰 영역에 가져온 채팅방 목록을 가공해 채워넣기
                for (let chatRoom of chatRoomList) {
                    chatPreviewArea.append(makeChatPreviewBox(chatRoom));
                }
            }

        }).catch(function (error) {
            console.log(error);
        });
}

/* 채팅방 목록을 불러오는 함수 */
const makeChatPreviewBox = (chatRoom) => {

    // 재료 준비
    const chatPreviewBox = document.createElement('div');   // 채팅방의 정보가 담길 박스
    const thumbnailImg = document.createElement('div');     // 채팅방 대표 이미지
    const roomTitle = document.createElement('div');        // 채팅방 제목
    const boxLabel = document.createElement('div');         // 마지막 대화 내용, 마지막 대화 시간이 들어감
    const lastChatContent = document.createElement('div');  // 마지막 대화 내용
    const lastChatTime = document.createElement('div');     // 마지막 대화 시간
    
    // chatPreviewBox 세팅
    chatPreviewBox.id = chatRoom.roomNo;
    packUpElement(chatPreviewBox, 'chat-preview-box', null);

    // thumbnailImg 세팅 : 채팅방 유형이 상품이 아닌 경우 기본 이미지를 채워넣음
    if(chatRoom.roomType == 0) {
        packUpElement(chatPreviewBox, 'free', null);
        packUpElement(thumbnailImg, 'thumbnail-img', "<img src='/resources/images/chat2/default/talking.png'>");
        packUpElement(roomTitle, 'room-title', chatRoom.roomName);

    // thumbnailImg 세팅 : 채팅방 유형이 상품인 경우 상품 이미지를 채워넣음
    } else { 
        packUpElement(chatPreviewBox, 'post', null);
        packUpElement(roomTitle, 'room-title', chatRoom.postTitle);
        if (chatRoom.thumbnailImg == undefined) { // 이미지가 없는 경우 기본 이미지
            packUpElement(thumbnailImg, 'thumbnail-img', "<img src='/resources/images/member/user.png'>");
        } else {
            packUpElement(thumbnailImg, 'thumbnail-img', "<img src=" + chatRoom.thumbnailImg + ">");
        }
    }
    
    if(chatRoom.enterStatus === 'Y') {
        // box-label, lastChatContent, lastChatTime 세팅
        packUpElement(boxLabel, 'box-label', null);
    
        if(chatRoom.lastChatType == 'I') { // 사진인 경우
            packUpElement(lastChatContent, 'last-chat-content', "(사진)");
        } else if (chatRoom.lastChatType == 'E'){
            packUpElement(lastChatContent, 'last-chat-content', "(이모티콘)");
        } else { // 사진이 아닌 경우
            if(chatRoom.lastChatContent != null) { // 텍스트이고, 내용이 있는 경우
                packUpElement(lastChatContent, 'last-chat-content', chatRoom.lastChatContent);
            } else { // 텍스트이고, 내용이 없는 경우
                packUpElement(lastChatContent, 'last-chat-content', "-");           
            }
        }
        
        if(chatRoom.lastChatTime == undefined) {
            packUpElement(lastChatTime, 'last-chat-time', '');
        } else {
            packUpElement(lastChatTime, 'last-chat-time', chatRoom.lastChatTime);
        }
        
        // 포장하기
        boxLabel.append(lastChatContent, lastChatTime);
        chatPreviewBox.append(thumbnailImg, roomTitle, boxLabel);
    
        // unreadChatCount 세팅(빨강)
        // console.log(chatRoom.roomNo);
        if(chatRoom.roomNo != selectedRoomNo) {
            if (chatRoom.unreadChatCount > 0) { // 읽지 않은 채팅이 있는 경우
                let count = 0;
                if(chatRoom.unreadChatCount > 99) count = '99+';
                else count = chatRoom.unreadChatCount;
    
                const unreadChatCount = document.createElement('div'); // 읽지 않은 채팅 개수
                packUpElement(unreadChatCount, 'unread-chat-count', count);
                chatPreviewBox.append(unreadChatCount);
            } 
        }
    
        // 클릭 이벤트
        chatPreviewBox.addEventListener('click', ()=>{
            chatPreviewBoxEvent(chatPreviewBox);
        })
    } 

    if(chatRoom.enterStatus === 'W') { // 대기상태인 채팅방은 승인 전에는 입장 못하게 만듦
        // 승인 및 거절 버튼 영역
        const inviteBtnArea = document.createElement('div');
        packUpElement(inviteBtnArea, 'invite-btn-area', null);

        // enter 테이블의 pk를 id로 넣어둠
        inviteBtnArea.id = chatRoom.enterNo;

        // 거절 버튼 및 이벤트 작성
        const inviteRejectBtn = document.createElement('div');
        packUpElement(inviteRejectBtn, 'invite-reject-btn', '거절');
        inviteRejectBtn.addEventListener('click', ()=>{
            updateChatEnterReject(inviteBtnArea);
        })
        
        // 승인 버튼 및 이벤트 작성
        const inviteAgreeBtn = document.createElement('div');
        packUpElement(inviteAgreeBtn, 'invite-agree-btn', '승인');
        inviteAgreeBtn.addEventListener('click', () => {
            updateChatEnterAgree(inviteBtnArea);
        })

        // 목록에 추가
        inviteBtnArea.append(inviteRejectBtn, inviteAgreeBtn);
        chatPreviewBox.append(thumbnailImg, roomTitle, inviteBtnArea);

    }

    return chatPreviewBox;
}

/* 채팅방 목록에 이벤트 부여 */
const chatPreviewBoxEvent = (chatPreviewBox) => {
    console.log('가져올게 잠깐만 ~ ')
    // document.getElementById('roomBodyBlinder').style.display='none';

    const roomNo = chatPreviewBox.id;

    selectChatList(roomNo);

}

const selectChatList = (roomNo) => {
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

/* chatTime을 잘라서 시간으로 만들고 반환 */
const makeNewChatTime = (chatTime) => {
    let meridian = '오전';  // 오전 또는 오후
    let hour = '';          // 시간
    let minute = '';        // 분
    
    hour = chatTime.substring(11,13);
    
    if(hour >= 12) meridian = '오후';
    if(hour >= 13) {
        hour = hour - 12;
        if(hour < 10) {
            hour = '0' + hour;
        }
    }

    minute = chatTime.substring(14, 16);
    
    return (meridian + " " + hour + ":" + minute);
}

/* 채팅방을 만드는 함수 */
const makeChatRoom = (chatRoom, chatList) => {

    // 라벨 영역
    // 드롭다운 숨기기
    document.getElementById('roomEditDropdown').classList.remove('dropdown-spread');
    document.getElementById('roomEditDropdown').classList.add('dropdown-fold');

    const roomThumbnailImg = document.getElementById('roomThumbnailImg');
    const roomTitle = document.getElementById('roomTitle');
    document.querySelector('.chat-room-id').id = chatRoom.roomNo;


    if(chatRoom.roomType > 0) {
        document.getElementById('inviteBtn').style.display="none";
        document.getElementById('purchaseBtn').style.display='flex';
        // 구매하기 버튼에 상세페이지 이벤트 부여
        document.getElementById('purchaseBtn').addEventListener('click', ()=>{
            goToPostDetail(chatRoom.roomType);
        })
        if(chatRoom.thumbnailImg == undefined) {
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
    for(let chat of chatList) {

        const chatDate = chat.chatTime.substring(0, 10);

        // 날짜 라벨 업데이트
        if(nowDate != chatDate) {
            nowDate = chatDate;
            
            const dateLabel = document.createElement('div');
            const dateLabelLine = document.createElement('div');

            packUpElement(dateLabel, 'date-label', nowDate);
            packUpElement(dateLabelLine, 'date-label-line');

            dateLabelLine.append(dateLabel);
            readingArea.append(dateLabelLine);

        }

        if(chat.chatType==="S") {

            const systemChat = document.createElement('div');
            packUpElement(systemChat, 'system-chat', chat.chatContent);
            
            const systemChatBox = document.createElement('div');
            packUpElement(systemChatBox, 'system-chat-box', null);
            
            systemChatBox.append(systemChat);
            readingArea.append(systemChatBox);

        } else {

            // chatTime를 잘라서 원하는 시간으로 만듦
            const newChatTime = makeNewChatTime(chat.chatTime);
    
            if(chat.memberNo == myMemberNo) { // 보낸 메세지인 경우
                const sentChat = makeSentChat(chat, newChatTime);
    
                readingArea.append(sentChat)
    
            } else { // 수신 메세지인 경우
                const receivedChat = makeReceivedChat(chat, newChatTime);
    
                readingArea.append(receivedChat);
            }
        }
    }



    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);

    document.getElementById('inputBox').focus();
}


/* 내가 보낸 메세지를 만드는 함수 */
/* sentchat 안에 sentBubbleTime(보낸 시간),  sentBubble(버블:내용이 담기는 곳입니다), sentBubbleTail(말풍선 모양을 만드는 꼬리)를 넣어주세요 */
/* sentBubble에는 채팅의 내용이나 이미지를 넣어주세요! */
const makeSentChat = (chat, newChatTime) => {
    const sentChat = document.createElement('div');
    const sentBubble = document.createElement('div');
    const sentBubbleTail = document.createElement('div');
    const sentBubbleTime = document.createElement('div');

    packUpElement(sentChat, 'sent-chat', null);

    if(chat.chatType === 'T') { // 텍스트인 경우
        packUpElement(sentBubble, 'sent-bubble', chat.chatContent);

    } else if(chat.chatType === 'E'){ // 이모티콘인 경우

        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chat.chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat2/default/no-pictures.png'");

        packUpElement(sentBubble, 'sent-bubble', null);
        sentBubble.append(imgArea);

    } else { // 사진인 경우...
        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chat.chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat2/default/no-pictures.png'");
        
        packUpElement(sentBubble, 'sent-bubble', null);
        sentBubble.append(imgArea);
    }

    packUpElement(sentBubbleTail, 'sent-bubble-tail', null);
    packUpElement(sentBubbleTime, 'sent-bubble-time', newChatTime);
    
    // read-count 보여주기!
    if(chat.readCount >= 0) { // readCount가 0보다 클 때만
        const sentBubbleReadCount = document.createElement('div');
        packUpElement(sentBubbleReadCount, 'sent-bubble-read-count', chat.readCount + '명 읽음');
        sentBubble.append(sentBubbleReadCount);
    }

    sentBubble.append(sentBubbleTime);
    sentBubble.id = chat.chatNo;
    sentChat.append(sentBubble, sentBubbleTail);
    return sentChat;
}

/* 받은 메세지를 만드는 함수 */
/* receivedchat 안에 receivedBubbleTime(받은 시간), senderProfileImg(상대방 사진), senderName(상대방 이름)과
   receivedBubble(버블:내용이 담기는 곳입니다), receivedBubbleTail(말풍선 모양을 만드는 꼬리)를 넣어주세요 */
/* receivedBubble에는 채팅의 내용이나 이미지를 넣어주세요! */
const makeReceivedChat = (chat, newChatTime) => {
    const receivedChat = document.createElement('div');
    const profileImg = document.createElement('div');
    const memberNickname = document.createElement('div');
    const receivedBubbleTail = document.createElement('div');
    const receivedBubble = document.createElement('div');
    const receivedBubbleTime = document.createElement('div');

    packUpElement(receivedChat, 'received-chat', null);

    if(chat.profileImg == undefined) {
        packUpElement(profileImg, 'sender-profile-img', "<img src='/resources/images/member/user.png'>");
    } else {
        packUpElement(profileImg, 'sender-profile-img', "<img src=" + chat.profileImg + ">");
    }

    packUpElement(memberNickname, 'sender-name', chat.memberNickname);
    packUpElement(receivedBubbleTail, 'received-bubble-tail', null);

    if(chat.chatType === 'T') { // 텍스트인 경우

        packUpElement(receivedBubble, 'received-bubble', chat.chatContent);

    } else if (chat.chatType === 'E') { // 이모티콘인 경우

        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chat.chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat2/default/no-pictures.png'");

        packUpElement(receivedBubble, 'received-bubble', null);
        receivedBubble.append(imgArea);

    } else {
        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chat.chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat2/default/no-pictures.png'");

        packUpElement(receivedBubble, 'received-bubble', null);
        receivedBubble.append(imgArea);
    }
    packUpElement(receivedBubbleTime, 'received-bubble-time', newChatTime);
    
    // read-count 출력하기!
    if (chat.readCount >= 0) { // readCount가 0보다 클 때만
        const receivedBubbleReadCount = document.createElement('div');
        packUpElement(receivedBubbleReadCount, 'received-bubble-read-count', chat.readCount + '명 읽음');
        receivedBubble.append(receivedBubbleReadCount);
    }

    receivedBubble.append(receivedBubbleTime);
    receivedBubble.id = chat.memberNo;

    // receivedChat.append(receivedBubbleTime, senderProfileImg, senderName, receivedBubbleTail, receivedBubble);
    receivedChat.append(profileImg, memberNickname, receivedBubbleTail, receivedBubble);
    return receivedChat;
}

/* 채팅을 보내는 함수 */
const sendChatToServer = () => {
    // 입력창에서 입력한 내용을 가져오고, 입력창을 비움
    const inputBox = document.getElementById('inputBox');
    const inputText = inputBox.value;

    // 정규표현식으로 모든 태그를 제거(텍스트일때만 해당함)
    // const cuttedText = inputText.replace(/(<([^>]+)>)/ig, "");
    const cuttedText= inputText;
    
    // 웹소켓을 이용해 채팅을 전송
    if (cuttedText.trim().length == 0) {
        alert("채팅을 입력해주세요!")
    } else {
        // json 객체 만들기
        let obj = {
            "roomNo" : selectedRoomNo,
            "memberNo" : myMemberNo,
            "memberNickname" : myMemberNickname,
            "profileImg" : myProfileImg,
            "chatContent": cuttedText,
            "chatType": 'T'
        };

        chattingSock.send(JSON.stringify(obj));

        // UnreadCount를 0으로 만듦
        updateReadCount();
        updateUnreadCount();
    }


    // 인풋 지우기
    inputBox.value = "";

    // 스크롤을 하단으로 내림
    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);

    // 포커스 제거
    document.getElementById('inputBox').blur();
}

/* 구매하기 페이지 이벤트 */
const goToPostDetail = (postNo) => {
    let url = "/post/" + postNo;
    location.href = url;
}

/* 채팅(이미지)를 보내는 함수 */
const sendImgToServer = () => {
    const imageInput = document.getElementById('imageInput');
    const imgData = imageInput.files[0];

    // 사진 비우기
    imageInput.value = "";

    if(imgData != null) {
        let formData = new FormData();
        
        formData.append("roomNo", selectedRoomNo);
        formData.append("memberNo", myMemberNo);
        formData.append("chatImg", imgData);

        axios.post('/chat/insert/img', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
            })
            .then(function (response) {

                const newChatImgPath = response.data;

                // json 객체 만들기
                let obj = {
                    "roomNo": selectedRoomNo,
                    "memberNo": myMemberNo,
                    "memberNickname":myMemberNickname,
                    "profileImg":myProfileImg,
                    "chatContent": newChatImgPath,
                    "chatType":'I'
                };

                chattingSock.send(JSON.stringify(obj));

                // UnreadCount를 0으로 만듦
                updateReadCount();
                updateUnreadCount();

            })
            .catch(function (error) {
                console.log('이미지 전송 실패...')
            })
    }

    // 사진을 가림
    document.getElementById('inputImgPreview').removeAttribute('src');
    document.getElementById('inputImgPreviewBox').style.height = 0;
    document.getElementById('inputImgPreviewBox').style.opacity = 0;

    // 스크롤을 하단으로 내림
    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);
 
}


/* 버튼, 엔터에 채팅 보내기 이벤트 */
document.getElementById('sendBtn').addEventListener('click', ()=>{
    if(selectedRoomNo != null) {
        sendChatToServer();
    }
})
document.getElementById('inputBox').addEventListener('keyup', (e)=>{
    if(e.key === 'Enter') {
        if (selectedRoomNo != null) {
            sendChatToServer();
        }
    }
    document.getElementById('inputBox').focus();
})

document.getElementById('inputBox').setAttribute("spellcheck", "false");

/* 사진 보내기 이벤트 */
document.getElementById('sendImgBtn').addEventListener('click', ()=>{
    sendImgToServer();
})

const onMessage = (chat) => {
    const readingArea = document.getElementById('readingArea');

    if(selectedRoomNo == chat.roomNo) { // 해당 채팅방을 보고 있는 경우..

        // 시간 데이터를 가공해서 연월일과 시분초로 분리
        const chatDate = chat.chatTime.substring(0, 10);
        
        // chatTime를 잘라서 원하는 시간으로 만듦
        const newChatTime = makeNewChatTime(chat.chatTime);

        // 날짜가 바뀌었는지 확인
        if (nowDate != chatDate) {
            nowDate = chatDate;

            const dateLabel = document.createElement('div');
            const dateLabelLine = document.createElement('div');

            packUpElement(dateLabel, 'date-label', nowDate);
            packUpElement(dateLabelLine, 'date-label-line');

            dateLabelLine.append(dateLabel);
            readingArea.append(dateLabelLine);
        }

        if(senderNo == chat.memberNo) { // 내가 보낸 채팅인 경우..
            const sentChat = makeSentChat(chat, newChatTime);

            readingArea.append(sentChat);

        } else { // 아닌 경우
            const receivedChat = makeReceivedChat(chat, newChatTime);
        
            // 현재 보이는 읽지 않음을 전부 읽음처리해야함;;(동기화작업)
            readMyChat();

            readingArea.append(receivedChat);
        }

        // 스크롤을 하단으로 내림
        const nowScrollHeight = readingArea.scrollHeight;
        readingArea.scrollTo(0,nowScrollHeight);


        // UnreadCount를 0으로 만듦
        updateReadCount();
        updateUnreadCount();
        
    } else { // 해당 채팅방을 보고 있지 않은 경우..
        console.log('새로운 채팅이 왔어요')
    }
    selectChatRoomList();
}

/* 사진 선택 버튼 */
document.getElementById('addImageBtn').addEventListener('click', ()=>{

    // 이모티콘 에리어 닫기
    document.querySelector('.emoticon-container').classList.add('emoticon-hide');

    if(selectedRoomNo != null) {
        document.getElementById('imageInput').click();
    }
})

/* 사진 삽입 시 미리보기 보여주기 */
document.getElementById('imageInput').addEventListener('change', (e)=>{
    let imageReader = new FileReader();
    imageReader.readAsDataURL(e.target.files[0]);

    imageReader.onload = e => {
        const inputImgPreview = document.getElementById('inputImgPreview')
        inputImgPreview.setAttribute('src', e.target.result)
        document.getElementById('inputImgPreviewBox').style.display = 'flex';
        document.getElementById('inputImgPreviewBox').style.height = '240px';
        document.getElementById('inputImgPreviewBox').style.opacity = 1;
    }

})

/* 사진 미리보기 취소 */
document.getElementById('inputImgPreviewDelBtn').addEventListener('click', (e) => {
    if(e.target) {
        document.getElementById('inputImgPreview').removeAttribute('src');
        document.getElementById('inputImgPreviewBox').style.height = 0;
        document.getElementById('inputImgPreviewBox').style.opacity = 0;
    }
})

/* 초기화 버튼 클릭 시 */
document.getElementById('resetRoomSearch').addEventListener('click', (e)=>{
    // e.target.parent.style.display='none'; // 버튼 숨김
    document.getElementById('resetRoomSearch').style.display = 'none';
    document.getElementById('searchBar').value=''; // 채팅방 검색창 초기화
    selectChatRoomList(); // 목록 가져옴
})

/* 현재 방에 있을 때, 메시지를 받았을 때, 내가 보낸 메시지를 전부 읽음처리로 수정 */
const readMyChat = () => {
    let sentBubbleReadFlList = document.getElementsByClassName('sent-bubble-read-fl');

    for(let one of sentBubbleReadFlList) {
        one.innerText = "";
    }
}

/* 하향 화살표 버튼을 눌렀을 때, 채팅방의 하단으로 이동하는 기능 구현하기 */

/* 

    * 고려할 상황
    - 1. 채팅방에 들어갈 때, 채팅방의 높이를 받아와야 함
    - 2. 메세지를 받았을 때 마다(onmessage), 채팅방의 높이를 다시 계산해야 함(초기화)

    * 사용할 함수 및 이벤트
    1. 채팅방의 높이를 계산하는 함수
    2. 현재 스크롤의 높이를 인식해서, 버튼의 display 속성을 바꾸는 이벤트
    3. 누르면 최하단으로 가지는 이벤트

    scrollHeight : 스크롤 전체 길이
    scrollTop : 현재 스크롤의 위치
    scrollTo(X,Y) : 이동

*/

/* 1. 채팅방의 높이를 계산하는 함수 */
const calculateRoomHeight = () => {
    let roomHeight = document.getElementById('readingArea').scrollHeight;
    return roomHeight;
}

/* 2. 현재 스크롤의 위치를 인식하는 함수 */
const calcuateNowHeight = () => {
    let nowHeight = document.getElementById('readingArea').scrollTop;
    return nowHeight;
}

/* 3. 현재 스크롤의 위치를 인식해서, 버튼의 속성을 바꾸자 */
document.getElementById('readingArea').addEventListener('scroll', () => {
    let roomHeight = calculateRoomHeight();
    let nowHeight = calcuateNowHeight();

    // console.log(roomHeight);
    // console.log(nowHeight);
    
    if(nowHeight < roomHeight - 1500) { // 스크롤 최하단보다 300만큼 높은 경우 버튼을 보임
        document.getElementById('bottomBtn').style.display='flex';
    } else { // 아니면 버튼을 가림
        document.getElementById('bottomBtn').style.display='none';
    }
})

/* 4. 전체 스크롤의 길이를 받아서, 최하단(=전체 스크롤의 길이)으로 보내자 */
document.getElementById('bottomBtn').addEventListener('click', ()=>{
    let roomHeight = calculateRoomHeight();
    document.getElementById('readingArea').scrollTo(0, roomHeight);
})


/* 채팅 초대 승인 거절 이벤트  */
/* 채팅방 초대 승인 or 거절 */
const updateChatEnterAgree = (inviteBtnArea) => {
    const enterNo = inviteBtnArea.id;

    let formData = new FormData();

    formData.append("enterNo", enterNo);
    formData.append("enterStatus", 'Y');

    axios.post("/chat/update/chatEnter/approve", formData
        ).then(function(response){ // 성공하면 목록을 다시 불러옴
            selectChatRoomList();
            console.log('초대를 승인했습니다.');

            // let formData2 = new FormData();

            // formData2.append("roomNo", response.data.roomNo);
            // formData2.append("chatContent", myMemberNickname + "님이 입장했어요!");

            // // 입장 메세지를 전달합니다.
            
            // axios.post("/chat/insert/system", formData2
            //     ).then(function(response){
            //         console.log('입장 메세지를 보냈어요');

            //     }).catch(function(error){
            //         console.log('error');
            //         console.log(error)
            //     })

        }).catch(function(error){
            console.log('error');
            console.log(error);
        })
}

const updateChatEnterReject = (inviteBtnArea) => {
    const enterNo = inviteBtnArea.id;

    let formData = new FormData();

    formData.append("enterNo", enterNo);
    formData.append("enterStatus", 'F');

    axios.post("/chat/update/chatEnter/approve", formData
    ).then(function (response) { // 성공하면 목록을 다시 불러옴
        selectChatRoomList();
        console.log('초대를 거절했습니다.');
    }).catch(function (error) {
        console.log('error');
        console.log(error);
    })
}


/* shortcut을 이용해서 접근한 경우 */
const shortcut = (shortcutNo) => {
    
    console.log('지름길로 왔어요~')

    const roomNo = shortcutNo;

    let formData = new FormData();
    formData.append("memberNo", myMemberNo);

    // 채팅 목록 가져오기
    axios.post('/chat/select/' + roomNo, formData)
        .then(function (response) {

            // 선택한 채팅방의 채팅 내역
            const chatRoom = response.data.chatRoom;
            const chatList = response.data.chatList;
            console.log(chatRoom)
            console.log(chatList)

            // 채팅 전송을 위해 전역 변수 세팅
            selectedRoomNo = roomNo;
            senderNo = myMemberNo;

            // 읽음 처리 해야함..
            selectChatRoomList();

            // 채팅방 만들기
            makeChatRoom(chatRoom, chatList);

            // 가림막 치우기
            document.getElementById('roomBodyBlinder').style.display = 'none';

        }).catch(function (error) {
            console.log(error);
            // location.href = '/error';
        });

}

/* 1. 입장 시 조회 처리 : UNREAD_CHAT_COUNT 0으로 만들기 */
const updateReadCount = () => {

    if (document.getElementById('readingArea').innerHTML != ""){

        let formData = new FormData();
    
        formData.append("memberNo", myMemberNo);
        formData.append("roomNo", selectedRoomNo);
    
        axios.post("/chat/update/readcount", formData
        ).then(function (response) {
            // console.log('결과 : ' + response.data)
        }).catch(function (error) {
            console.log(error)
        })
    }

}

/* 2. 입장 시 조회 처리 : UNREAD_CHAT_COUNT 0으로 만들기 */
const updateUnreadCount = () => {

    if (document.getElementById('readingArea').innerHTML != "") {
        let formData = new FormData();

        formData.append("memberNo", myMemberNo);
        formData.append("roomNo",selectedRoomNo);

        axios.post("/chat/update/unread", formData
            ).then(function(response){
                // console.log('결과 : ' + response.data)
            }).catch(function(error){
                console.log(error)
            })
    }
}

