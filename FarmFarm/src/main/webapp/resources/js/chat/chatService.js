// 전역변수
let selectedRoomNo;
let senderNo;
let partnerNickname;
let partnerProfileImg;
let nowDate;

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

    // 내 채팅방 목록 가져오기
    axios.post('/chat/chatRoomList')
        .then(function (response) {
            // 채팅 프리뷰 영역
            const chatPreviewArea = document.querySelector('.chat-preview-area');

            // 채팅방 목록
            let chatRoomList = response.data.chatRoomList;

            // 채팅 프리뷰 영역에 채팅방 목록 채워넣기
            for(let chatRoomInfo of chatRoomList) {
                chatPreviewArea.append(makeChatPreviewBox(chatRoomInfo));
            }

        }).catch(function (error) { 
            console.log(error);
            // location.href = '/error';
        });
})

/* 요소에 클래스, 텍스트를 넣는 함수 */
const packUpElement = (elementName, elementClass, elementContent) => {

    elementName.classList.add(elementClass);

    if (elementContent != null) { // -1을 넣으면 안넣음
        elementName.innerHTML = elementContent;
    }

    return elementName;
}

/* 채팅방 목록을 불러오는 함수 */
const makeChatPreviewBox = (chatRoomInfo) => {
    // 재료 준비
    const chatPreviewBox = document.createElement('div');
    const profileImg = document.createElement('div');
    const boxLabel = document.createElement('div');
    const memberNickname = document.createElement('div');
    const lastChatTime = document.createElement('div');
    const lastChatContent = document.createElement('div');

    // 방번호 넣기
    chatPreviewBox.id = chatRoomInfo.roomNo;

    // 데이터 넣기
    packUpElement(chatPreviewBox, 'chat-preview-box', null);
    
    if(chatRoomInfo.profileImg == undefined ) {
        packUpElement(profileImg, 'profile-img', "<img src='/resources/images/member/user.png'>");
    } else {
        packUpElement(profileImg, 'profile-img', chatRoomInfo.profileImg2);
    }
    
    packUpElement(boxLabel, 'box-label', null);
    
    packUpElement(memberNickname, 'member-nickname', chatRoomInfo.memberNickname2);
    
    if(chatRoomInfo.lastChatTime == undefined) {
        packUpElement(lastChatTime, 'last-chat-time', '');
    } else {
        packUpElement(lastChatTime, 'last-chat-time', chatRoomInfo.lastChatTime);
    }

    if(chatRoomInfo.lastChatContent == undefined) {
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
    console.log('profileImg2 : ' + profileImg2);

    const memberNickname2 = chatPreviewBox.children[1].children[0].innerText;
    console.log('memberNickname2' + memberNickname2);

    // 채팅 목록 가져오기
    axios.post('/chat/' + roomNo)
        .then(function (response) {
            // 내 번호
            console.log("채팅 목록 가져오기?")
            let myMemberNo = response.data.myMemberNo;
            
            // 채팅 전송을 위해 전역 변수 세팅
            selectedRoomNo = roomNo;
            senderNo = myMemberNo;
            partnerProfileImg = profileImg2;
            partnerNickname = memberNickname2;

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

            console.log('label 생성했음!')
        }

        if(chat.sendMemberNo == myMemberNo) { // 보낸 메세지인 경우
            console.log('발신메세지 생성했음!')
            const sentChat = makeSentChat(chat.chatContent, chat.chatTime, chat.imgFl);

            readingArea.append(sentChat)

        } else { // 수신 메세지인 경우
            console.log('수신메세지 생성했음!')
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
const makeSentChat = (chatContent, chatTime, imgFl) => {
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
        
        packUpElement(sentBubble, 'sent-bubble', null);
        sentBubble.append(imgArea);
    }

    packUpElement(sentBubbleTail, 'sent-bubble-tail', null);
    packUpElement(sentBubbleTime, 'sent-bubble-time', chatTime);

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

    const text = inputBox.value;
    inputBox.value = "";
    
    // 웹소켓을 이용해 채팅을 전송
    if(text.trim().length == 0) {
        alert("채팅을 입력해주세요!")
    } else {
        // json 객체 만들기
        let obj = {
            "roomNo" : selectedRoomNo,
            "sendMemberNo" : senderNo,
            "chatContent" : text,
            "imgFl": 'N'
        };

        chattingSock.send(JSON.stringify(obj));
    }

    // 스크롤을 하단으로 내림
    const nowScrollHeight = readingArea.scrollHeight;
    readingArea.scrollTo(0, nowScrollHeight);
}

/* 채팅을 보내는 함수 */
const sendImgToServer = () => {
    const imageInput = document.getElementById('imageInput');
    const imgData = imageInput.files[0];

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
                console.log(response.data)

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
                console.log('이미지 전송 실패1...')
            })
    }

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

document.getElementById('inputBox').addEventListener('focus', ()=>{
    addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            if (selectedRoomNo != null) {
                sendChatToServer();
            }
        }
    })
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
            const sentChat = makeSentChat(chat.chatContent, chat.chatTime, chat.imgFl);

            readingArea.append(sentChat);

        } else { // 아닌 경우
            const receivedChat = makeReceivedChat(partnerProfileImg, partnerNickname, chat.chatContent, chat.chatTime, chat.imgFl);

            readingArea.append(receivedChat);
        }

        // 스크롤을 하단으로 내림
        const nowScrollHeight = readingArea.scrollHeight;
        readingArea.scrollTo(0,nowScrollHeight);

    } else { // 해당 채팅방을 보고 있지 않은 경우..

    }
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
    console.log(e.target.files[0]);

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