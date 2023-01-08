// 전역변수
let myMemberNo;         // 내 회원 번호
let myMemberNickname;   // 내 닉네임
let myProfileImg;       // 내 사진
let selectedRoomNo;     // 현재 보고 있는 방의 번호
let senderNo;           // 보낸 사람
let partnerNickname;    // 상대방의 닉네임
let partnerProfileImg;  // 상대방의 프로필 이미지
let nowDate;            // 현재 날짜
let chattingSock;   // 소켓?

/* 요소에 클래스, 텍스트를 넣는 함수 */

/* 소켓과 연결하는 함수 */
const connectToChattingSockForWidget = () => {
    axios.post('/check/myInfo'
    ).then(function (response) {

        myMemberNo = response.data.memberNo;
        myMemberNickname = response.data.memberNickname;
        myProfileImg = response.data.profileImg;

        if (myMemberNo != 0) {
            chattingSock = new SockJS('/echo/chat2');

            if (chattingSock != null) {

                console.log('채팅2 서버와 연결되었습니다.')

                chattingSock.onmessage = function (e) {
                    console.log('새로운 메세지가 있습니다.');
                    // document.getElementById('chatAlarmDot').style.display = 'block';
                    startChatIconFlash();
                }

                chattingSock.onclose = function (e) {
                    console.log('채팅2 서버와 재연결을 시도합니다...');
                    console.log(e);

                    setTimeout(function () {
                        connectToChattingSock();
                    }, 1000);
                }
            }

            requestAndFillMyChatWidget();

        }

    }).catch(function (error) {
        console.log(error);
    })
}



/* 소켓과 연결하고, 채팅 내역 받아오기 */
addEventListener("DOMContentLoaded", () => {
    connectToChattingSockForWidget();
})

// ---------------------------- 비동기 요청 ---------------------------------- //


/* 채팅 위젯 이외의 영역 클릭 시, 채팅 위젯이 닫히게 함 */
/* 원리 : 내가 선택한 영역(=이벤트가 발생한 영역)의 최상위 요소가
내가 선택한 요소를 포함하고 있는지를 확인해서, 포함하지 않고 있으면 가림 */



/* 채팅 위젯 열기 이벤트 */

// 버튼 이벤트
document.querySelector('.btn-chat').addEventListener('click', ()=>{
    const chatWidgetContainer = document.querySelector('.chatWidget-container');
    document.querySelector('.chatWidget-container').classList.toggle('chatWidget-hide');
    if(chatWidgetContainer.classList.contains('chatWidget-hide')){
        requestAndFillMyChatWidget();
    }
})

/* 외부 영역을 클릭했을 때 */
addEventListener('click', (e)=>{
    const chatWidgetContainer = document.querySelector('.chatWidget-container');

    if(!chatWidgetContainer.contains(e.target) && !document.querySelector('.btn-chat').contains(e.target)) {
        if(!chatWidgetContainer.classList.contains('chatWidget-hide')){
            chatWidgetContainer.classList.toggle('chatWidget-hide');
        }
    }
})


/* 채팅 위젯에 채워넣을 값을 요청하고, 값을 채워넣는 함수 'fillChatWidget()'을 호출하는 함수 */
const requestAndFillMyChatWidget = () => {

    // 보낼 값을 저장할 객체 formData
    let formData = new FormData();

    // formData에 check/login을 이용해 받아온 정보 세팅
    formData.append("memberNo", myMemberNo);

    axios.post('/chat/select/widget', formData
    ).then(function (response) {

        let chatRoomList = response.data.chatRoomList;

        if (chatRoomList != undefined) {

            // 채팅방 목록을 받음..
            fillChatWidget(chatRoomList);
    
            // 읽지 않은게 있으면...
            let unReadCountAll = response.data.unReadCountAll;
            
            // 
            if (unReadCountAll > 0) {
                document.getElementById('chatAlarmDot').style.display='block';
            }
        
        }

    }).catch(function (error) {
        console.log(error);
    });
}

/* 채팅방 목록을 받아서, 채팅 위젯을 채워넣는 함수 */
const fillChatWidget = (chatRoomList) => {

    // 위젯 비우기
    const chatWidgetBody = document.getElementById('chatWidgetBody');
    chatWidgetBody.innerHTML = "";

    // 채워넣기
    for(let chatRoom of chatRoomList) {

        if(chatRoom.enterStatus==="Y") {
            // 재료 준비
            // 변수명이 많이 깁니다... 이게 모든 곳에 다 들어가야해서 이름이 중복되지 않게 하려고 그랬어요...
            const chatWidgetBox = document.createElement('button'); // 채팅방 하나
            const chatWidgetThumbnailImg = document.createElement('div'); // 프로필 이미지
            const chatWidgetRoomTitle = document.createElement('div'); // 채팅방 이름
            const chatWidgetBoxLabel = document.createElement('div'); // 내용과 시간이 들어갈 라벨
            const chatWidgetLastChatContent = document.createElement('div'); // 마지막 내용
            const chatWidgetLastChatTime = document.createElement('div'); // 마지막 시간
    
            // 재료 손질
            // chatWidgetBox 세팅
            chatWidgetBox.id = chatRoom.roomNo;
            packUpElement(chatWidgetBox, 'chatWidget-box', null);
    
            // thumbnailImg 세팅 : 채팅방 유형이 상품이 아닌 경우 기본 이미지를 채워넣음
            if (chatRoom.roomType == 0) {
                packUpElement(chatWidgetBox, 'free', null);
                packUpElement(chatWidgetThumbnailImg, 'chatWidget-thumbnail-img', "<img src='/resources/images/chat2/default/talking.png'>");
                packUpElement(chatWidgetRoomTitle, 'chatWidget-room-title', chatRoom.roomName);
    
                // thumbnailImg 세팅 : 채팅방 유형이 상품인 경우 상품 이미지를 채워넣음
            } else {
                packUpElement(chatWidgetBox, 'post', null);
                if (chatRoom.thumbnailImg == undefined) { // 이미지가 없는 경우 기본 이미지
                    packUpElement(chatWidgetThumbnailImg, 'chatWidget-thumbnail-img', "<img src='/resources/images/member/user.png'>");
                } else {
                    packUpElement(chatWidgetThumbnailImg, 'chatWidget-thumbnail-img', "<img src=" + chatRoom.thumbnailImg + ">");
                }
                packUpElement(chatWidgetRoomTitle, 'chatWidget-room-title', chatRoom.postTitle);
            }
    
            // 내용 세팅
            if (chatRoom.enterStatus === 'Y') {
                // box-label, lastChatContent, lastChatTime 세팅
                packUpElement(chatWidgetBoxLabel, 'chatWidget-box-label', null);
    
                if (chatRoom.lastChatType == 'I') { // 사진인 경우
                    packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', "사진을 보냈습니다.");
                } else { // 사진이 아닌 경우
                    if (chatRoom.lastChatContent != null) { // 텍스트이고, 내용이 있는 경우
                        packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', chatRoom.lastChatContent);
                    } else { // 텍스트이고, 내용이 없는 경우
                        packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', "-");
                    }
                }
    
                packUpElement(chatWidgetLastChatTime, 'chatWidget-last-chat-time', chatRoom.lastChatTime);
    
    
                // input값 세팅
                // const chatWidgetBoxInfo = document.createElement('input');
                // chatWidgetBoxInfo.hidden = true;
                chatWidgetBox.setAttribute('name', "roomNo");
                chatWidgetBox.setAttribute('value', chatRoom.roomNo);
    
    
                // 포장하기
                chatWidgetBoxLabel.append(chatWidgetLastChatContent, chatWidgetLastChatTime);
                chatWidgetBox.append(chatWidgetThumbnailImg, chatWidgetRoomTitle, chatWidgetBoxLabel);
    
                // unreadChatCount 세팅
                if (chatRoom.unreadChatCount > 0) { // 읽지 않은 채팅이 있는 경우
                    const chatWidgetUnreadChatCount = document.createElement('div'); // 개별 채팅방의 읽지 않은 메세지 개수
                    packUpElement(chatWidgetUnreadChatCount, 'chatWidget-unread-chat-count', chatRoom.unreadChatCount);
                    chatWidgetBox.append(chatWidgetUnreadChatCount);
                    chatRedDotOnly();
                }
    
            } 
    
            chatWidgetBody.append(chatWidgetBox);
    
        }

        }
    
}


/* 채팅 수신 알림 */

/* 알림 점멸 관련 구문 */

/* 불 들어오는 함수 */
const chatIconLightOn = () => {
    document.querySelector('#chatAlarmDot').style.display = "block";
    document.querySelector('.btn-chat').style.backgroundColor = "var(--point-color)";
    document.querySelector('.btn-chat > i').style.color = "white";
}

/* 불 끄는 함수 */
const chatIconLightOff = () => {
    document.querySelector('#chatAlarmDot').style.display = "none";
    document.querySelector('.btn-chat').style.backgroundColor = "white";
    document.querySelector('.btn-chat > i').style.color = "var(--sub-font-color)";
}

/* 빨간점만 불들어오게 */
const chatRedDotOnly = () => {
    document.querySelector('#chatAlarmDot').style.display = "block";
    document.querySelector('.btn-chat').style.backgroundColor = "white";
    document.querySelector('.btn-chat > i').style.color = "var(--sub-font-color)";
}


/* 깜박이는 함수 */
const startChatIconFlash = () => {
    let i = 0;
    const chatIconFlash = setInterval(() => {

        chatIconLightOn();                 // 빨간점 생성
        setTimeout(chatIconLightOff, 1000) // 1초 후에 빨간점 지움
        i += 1;

        if (i == 3) { // i가 3이 되면 그만 깜박임
            clearInterval(chatIconFlash);
            console.log('그만 깜박이삼')
            setTimeout(chatRedDotOnly, 2000);
        }

    }, 2000); // 2초마다 반복함

}

/* 알림 점멸 end */