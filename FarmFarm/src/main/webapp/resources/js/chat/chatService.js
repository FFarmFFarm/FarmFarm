// 전역변수
let selectedRoomNo;
let senderNo;
let partnerNickname;
let partnerProfileImg;
let nowDate;

// 하단 변수
// let initialScrollHeight = document.getElementById("readingArea").scrollHeight;
// let bottomScrollHeight = 0;

// 소켓
let chattingSock;

// 채팅을 위한 소켓 생성
if(loginMemberNo = 1) {
    chattingSock = new SockJS('/echo/chat');
}

/* Axios, WebSocket */

// 요청 생성하기
// 요청 보내기
// axios.method('요청 주소', {보낼 data
//              })
//              .then(function (response) {

//              })
//              .catch(function (error) {

//              })

/* 내 채팅방 목록 가져오기 */
window.addEventListener("DOMContentLoaded", ()=>{
    requestMyChatRoomList();

    console.log("shortcutNo : " + shortcutNo);

    if(shortcutNo > 0) {
        shortcut(shortcutNo);
        // history.replaceState("", "", "/chat");
    }
})


/* 요소에 클래스, 텍스트를 넣는 함수 */
const packUpElement = (elementName, elementClass, elementContent) => {

    elementName.classList.add(elementClass);

    if (elementContent != null) { // -1을 넣으면 안넣음
        elementName.innerHTML = elementContent;
    }

    return elementName;
}

/*  */
const shortcut = (shortcutNo) => {

    const roomNo = shortcutNo;

    // 채팅 목록 가져오기
    axios.post('/chat/' + roomNo + '/shortcut')
        .then(function (response) {
            // console.log(response.data);
            // 내 번호
            let myMemberNo = response.data.myMemberNo;

            // 채팅 전송을 위해 전역 변수 세팅
            selectedRoomNo = roomNo;
            senderNo = myMemberNo;

            if(response.data.partnerInfo.profileImg == undefined) {
                partnerProfileImg = "<img src='/resources/images/member/user.png'>";
            } else {
                partnerProfileImg = response.data.partnerInfo.profileImg;
            }
            partnerNickname = response.data.partnerInfo.memberNickname;

            // 읽음 처리 해야함..
            requestMyChatRoomList();

            // 채팅 내역
            let chatHistory = response.data.chatHistory

            // 채팅방 만들기
            makeChatRoom(myMemberNo, chatHistory, partnerProfileImg, partnerNickname);

            // 블라인드 해제
            document.getElementById('roomBodyBlinder').style.display = 'none';

        }).catch(function (error) {
            console.log(error);
            // location.href = '/error';
        });

}

/* 내 채팅방 목록을 요청하는 함수(axios) */
const requestMyChatRoomList = () => {

    // 채팅방 리스트
    const chatPreviewArea = document.querySelector('.chat-preview-area');

    // 내 채팅방 목록 가져오기
    axios.post('/chat/chatRoomList')
        .then(function (response) {
            // 채팅 프리뷰 영역

            // 채팅방 목록
            let chatRoomList = response.data.chatRoomList;

            // 검색창에 입력한 값이 없을 때만 채팅방 목록을 가져옵니다.

            if(document.getElementById('searchBar').value.trim().length == 0) {
                // 기존 채팅방 목록 비우기
                chatPreviewArea.innerHTML = "";

                // 채팅 프리뷰 영역에 채팅방 목록 채워넣기
                for (let chatRoomInfo of chatRoomList) {
                    chatPreviewArea.append(makeChatPreviewBox(chatRoomInfo));
                }
            }


        }).catch(function (error) {
            console.log(error);
            // location.href = '/error';
        });
}

/* 채팅방 목록을 불러오는 함수 */
const makeChatPreviewBox = (chatRoomInfo) => {
    // 재료 준비
    const chatPreviewBox = document.createElement('div'); // 박스
    const profileImg = document.createElement('div'); // 상대 이미지
    const boxLabel = document.createElement('div'); // 이름, 시간이 들어감
    const memberNickname = document.createElement('div'); // 상대 이름
    const lastChatTime = document.createElement('div'); // 마지막 대화 시간
    const lastChatContent = document.createElement('div'); // 마지막 대화

    // 방번호 넣기
    chatPreviewBox.id = chatRoomInfo.roomNo;

    // 데이터 넣기
    packUpElement(chatPreviewBox, 'chat-preview-box', null);
    
    if(chatRoomInfo.profileImg == undefined ) { // 이미지가 없는 경우 기본 이미지
        packUpElement(profileImg, 'profile-img', "<img src='/resources/images/member/user.png'>");
    } else {
        packUpElement(profileImg, 'profile-img', chatRoomInfo.profileImg2);
    }
    
    packUpElement(boxLabel, 'box-label', null);
    
    packUpElement(memberNickname, 'member-nickname', chatRoomInfo.memberNickname2);
    
    if(chatRoomInfo.lastChatTime == undefined) { // 채팅 시간이 없는 경우 공백
        packUpElement(lastChatTime, 'last-chat-time', '');
    } else {
        packUpElement(lastChatTime, 'last-chat-time', chatRoomInfo.lastChatTime);
    }

    if(chatRoomInfo.lastChatContent == undefined) { // 채팅 내용이 없는 경우 '대화 내용이 없습니다' 출력
        packUpElement(lastChatContent, 'last-chat-content', '대화 내용이 없습니다.');
    } else {
        if(chatRoomInfo.lastChatImgFl === 'N') { // 사진이 아닌 경우
            packUpElement(lastChatContent, 'last-chat-content', chatRoomInfo.lastChatContent);
        } else { // 사진인 경우
            packUpElement(lastChatContent, 'last-chat-content', '사진을 보냈습니다.');
        }
    }
    
    // 포장하기
    boxLabel.append(memberNickname, lastChatTime);
    chatPreviewBox.append(profileImg, boxLabel, lastChatContent);

    if (chatRoomInfo.unreadChatCount > 0) { // 읽지 않은 채팅이 있는 경우
        const unreadChatCount = document.createElement('div'); // 읽지 않은 채팅 개수
        packUpElement(unreadChatCount, 'unread-chat-count', chatRoomInfo.unreadChatCount);
        chatPreviewBox.append(unreadChatCount);
    }

    chatPreviewBox.addEventListener('click', ()=>{
        chatPreviewBoxEvent(chatPreviewBox);
    })

    return chatPreviewBox;
}

/* 채팅방 목록에 이벤트 부여 */
const chatPreviewBoxEvent = (chatPreviewBox) => {
    console.log('가져올게 잠깐만 ~ ')
    document.getElementById('roomBodyBlinder').style.display='none';

    const roomNo = chatPreviewBox.id;

    const profileImg2 = chatPreviewBox.children[0].innerHTML;

    const memberNickname2 = chatPreviewBox.children[1].children[0].innerText;

    // 채팅 목록 가져오기
    axios.post('/chat/' + roomNo)
        .then(function (response) {
            // 내 번호
            let myMemberNo = response.data.myMemberNo;
            
            // 채팅 전송을 위해 전역 변수 세팅
            selectedRoomNo = roomNo;
            senderNo = myMemberNo;
            partnerProfileImg = profileImg2;
            partnerNickname = memberNickname2;

            // 읽음 처리 해야함..
            requestMyChatRoomList();

            // 채팅 내역
            let chatHistory = response.data.chatHistory

            // 채팅방 만들기
            makeChatRoom(myMemberNo, chatHistory, profileImg2, memberNickname2);

        }).catch(function (error) {
            console.log(error);
            // location.href = '/error';
        });
}

/* 채팅방을 만드는 함수 */
const makeChatRoom = (myMemberNo, chatHistory, profileImg2, memberNickname2) => {

    // 라벨 영역
    const postImg = document.getElementById('postImg');
    const postTitle = document.getElementById('postTitle');
    
    // 읽기 영역
    const readingArea = document.getElementById('readingArea');

    // 읽기 영역 비우기
    readingArea.innerHTML = '';

    // 날짜 라벨 초기화
    nowDate = '';
    
    // 채팅 메세지 넣기
    for(let chat of chatHistory) {
        
        // 날짜 라벨 업데이트
        if(nowDate != chat.chatDate) {
            nowDate = chat.chatDate;
            
            const dateLabel = document.createElement('div');
            const dateLabelLine = document.createElement('div');

            packUpElement(dateLabel, 'date-label', nowDate);
            packUpElement(dateLabelLine, 'date-label-line');

            dateLabelLine.append(dateLabel);
            readingArea.append(dateLabelLine);

        }

        if(chat.sendMemberNo == myMemberNo) { // 보낸 메세지인 경우
            const sentChat = makeSentChat(chat.chatContent, chat.chatTime, chat.imgFl, '');

            readingArea.append(sentChat)

        } else { // 수신 메세지인 경우
            const receivedChat = makeReceivedChat(profileImg2, memberNickname2, chat.chatContent, chat.chatTime, chat.imgFl);

            readingArea.append(receivedChat);
        }
    }

    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);
}

/* 내가 보낸 메세지를 만드는 함수 */
/* sentchat 안에 sentBubbleTime(보낸 시간),  sentBubble(버블:내용이 담기는 곳입니다), sentBubbleTail(말풍선 모양을 만드는 꼬리)를 넣어주세요 */
/* sentBubble에는 채팅의 내용이나 이미지를 넣어주세요! */
const makeSentChat = (chatContent, chatTime, imgFl, readFl) => {
    const sentChat = document.createElement('div');
    const sentBubble = document.createElement('div');
    const sentBubbleTail = document.createElement('div');
    const sentBubbleTime = document.createElement('div');


    packUpElement(sentChat, 'sent-chat', null);

    if(imgFl === 'N') { // 사진이 아닌 경우!
        packUpElement(sentBubble, 'sent-bubble', chatContent);
    } else { // 사진인 경우...
        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat/no-pictures.png'");
        
        packUpElement(sentBubble, 'sent-bubble', null);
        sentBubble.append(imgArea);
    }

    packUpElement(sentBubbleTail, 'sent-bubble-tail', null);
    packUpElement(sentBubbleTime, 'sent-bubble-time', chatTime);
    
    if(readFl === 'N') { // 안읽었을 때만 만듦
        const sentBubbleReadFl = document.createElement('div');
        packUpElement(sentBubbleReadFl, 'sent-bubble-read-fl', '읽지 않음');
        sentBubble.append(sentBubbleReadFl);
    }
    sentBubble.append(sentBubbleTime);
    sentChat.append(sentBubble, sentBubbleTail);
    
    return sentChat;
}

/* 받은 메세지를 만드는 함수 */
/* receivedchat 안에 receivedBubbleTime(받은 시간), senderProfileImg(상대방 사진), senderName(상대방 이름)과
   receivedBubble(버블:내용이 담기는 곳입니다), receivedBubbleTail(말풍선 모양을 만드는 꼬리)를 넣어주세요 */
/* receivedBubble에는 채팅의 내용이나 이미지를 넣어주세요! */
const makeReceivedChat = (profileImg2, memberNickname2, chatContent, chatTime, imgFl) => {
    const receivedChat = document.createElement('div');
    const senderProfileImg = document.createElement('div');
    const senderName = document.createElement('div');
    const receivedBubbleTail = document.createElement('div');
    const receivedBubble = document.createElement('div');
    const receivedBubbleTime = document.createElement('div');

    packUpElement(receivedChat, 'received-chat', null);
    packUpElement(senderProfileImg, 'sender-profile-img', profileImg2);
    packUpElement(senderName, 'sender-name', memberNickname2);
    packUpElement(receivedBubbleTail, 'received-bubble-tail', null);
    if(imgFl === 'N') {
        packUpElement(receivedBubble, 'received-bubble', chatContent);
    } else {
        const imgArea = document.createElement('img');
        imgArea.setAttribute('src', chatContent);
        imgArea.setAttribute('onerror', "this.src='/resources/images/chat/no-pictures.png'");

        packUpElement(receivedBubble, 'sent-bubble', null);
        receivedBubble.append(imgArea);
    }
    packUpElement(receivedBubbleTime, 'received-bubble-time', chatTime);
    
    receivedBubble.append(receivedBubbleTime);
    // receivedChat.append(receivedBubbleTime, senderProfileImg, senderName, receivedBubbleTail, receivedBubble);
    receivedChat.append(senderProfileImg, senderName, receivedBubbleTail, receivedBubble);

    return receivedChat;
}

/* 채팅을 보내는 함수 */
const sendChatToServer = () => {
    // 입력창에서 입력한 내용을 가져오고, 입력창을 비움
    const inputBox = document.getElementById('inputBox');
    const inputText = inputBox.value;
    
    // 웹소켓을 이용해 채팅을 전송
    if (inputText.trim().length == 0) {
        alert("채팅을 입력해주세요!")
    } else {
        // json 객체 만들기
        let obj = {
            "roomNo" : selectedRoomNo,
            "sendMemberNo" : senderNo,
            "chatContent": inputText,
            "imgFl": 'N'
        };

        chattingSock.send(JSON.stringify(obj));
    }

    // 인풋 지우기
    inputBox.value = "";

    // 스크롤을 하단으로 내림
    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);

    // 포커스 제거
    document.getElementById('inputBox').blur();
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
        formData.append("sendMemberNo", senderNo);
        formData.append("chatImg", imgData);

        axios.post('/chat/insert/img', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
            })
            .then(function (response) {
                // json 객체 만들기
                let obj = {
                    "roomNo": selectedRoomNo,
                    "sendMemberNo": senderNo,
                    "chatContent": response.data,
                    "imgFl":'Y'
                };

                chattingSock.send(JSON.stringify(obj));

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

    // 채팅 읽음처리 없데이트
    
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
})

/* 사진 보내기 이벤트 */
document.getElementById('sendImgBtn').addEventListener('click', ()=>{
    sendImgToServer();
})

/* 채팅을 받는 함수 */
chattingSock.onmessage = function(e) {
    const chat = JSON.parse(e.data);

    const readingArea = document.getElementById('readingArea');

    if(selectedRoomNo == chat.roomNo) { // 해당 채팅방을 보고 있는 경우..

        // 날짜가 바뀌었는지 확인
        if (nowDate != chat.chatDate) {
            nowDate = chat.chatDate;

            const dateLabel = document.createElement('div');
            const dateLabelLine = document.createElement('div');

            packUpElement(dateLabel, 'date-label', nowDate);
            packUpElement(dateLabelLine, 'date-label-line');

            dateLabelLine.append(dateLabel);
            readingArea.append(dateLabelLine);
        }

        if(senderNo == chat.sendMemberNo) { // 내가 보낸 채팅인 경우..
            const sentChat = makeSentChat(chat.chatContent, chat.chatTime, chat.imgFl, 'N');

            readingArea.append(sentChat);

        } else { // 아닌 경우
            const receivedChat = makeReceivedChat(partnerProfileImg, partnerNickname, chat.chatContent, chat.chatTime, chat.imgFl);
            
            // 현재 보이는 읽지 않음을 전부 읽음처리해야함;;(동기화작업)
            readMyChat();

            readingArea.append(receivedChat);
        }

        // 스크롤을 하단으로 내림
        const nowScrollHeight = readingArea.scrollHeight;
        readingArea.scrollTo(0,nowScrollHeight);

    } else { // 해당 채팅방을 보고 있지 않은 경우..
        console.log('새로운 채팅이 왔어요')
    }
    requestMyChatRoomList();
}

/* 사진 선택 버튼 */
document.getElementById('addImageBtn').addEventListener('click', ()=>{
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

/* 검색창 만들기 이벤트 */
document.getElementById('searchBtn').addEventListener('click', ()=>{
    let input = document.getElementById('searchBar');

    if(input.value.trim().length == 0) {
        input.focus();
    } else {

        console.log('검색중이에요.........')

        // 버튼 보여주세요
        document.getElementById('resetRoomSearch').style.display='block';

        let roomList = document.getElementsByClassName('chat-preview-box');
        
        for(room of roomList) {
            room.style.display = 'flex';
            let roomName = room.children[1].children[0].innerText;
            console.log('방제 : ' + roomName);
    
            if(!roomName.includes(input.value)) {
                room.style.display='none';
            } 
        }

    }

})

/* 초기화 버튼 클릭 시 */
document.getElementById('resetRoomSearch').addEventListener('click', (e)=>{
    // e.target.parent.style.display='none'; // 버튼 숨김
    document.getElementById('resetRoomSearch').style.display = 'none';
    document.getElementById('searchBar').value=''; // 채팅방 검색창 초기화
    requestMyChatRoomList(); // 목록 가져옴
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