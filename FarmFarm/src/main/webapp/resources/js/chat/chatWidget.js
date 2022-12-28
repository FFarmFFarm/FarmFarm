/* 채팅 위젯 표시 */
// const btnChat = document.querySelector('.btn-chat');

// btnChat.addEventListener('click', ()=>{
//     let showChatWidget = document.getElementById('showChatWidget');
//     console.log(showChatWidget.checked);
// })

let myMemberNo;
let listenChatSocket;



/* 요소에 클래스, 텍스트를 넣는 함수 */
const packUpElement = (elementName, elementClass, elementContent) => {

    elementName.classList.add(elementClass);

    if (elementContent != null) { // -1을 넣으면 안넣음
        elementName.innerHTML = elementContent;
    }

    return elementName;
}


/* 채팅 내역 받아오기 */
addEventListener("DOMContentLoaded", () => {
    axios.post('/get/myNo'
    ).then(function (response) {

        myMemberNo = response.data;

        if (myMemberNo != -1) {
            listenChatSocket = new SockJS('/echo/chat');
            console.log('야호~')
            console.log(myMemberNo);
        }

    }).catch(function (error) {
        console.log(error);
    })
})

/* 로딩이 완료되면 소켓을 연결함 */
addEventListener("load", ()=>{
    requestAndFillMyChatWidget();

    if (listenChatSocket != null) {
        console.log('듣고 있어요')
        listenChatSocket.onmessage = function(e) {
            document.getElementById('chatAlarmDot').style.display = 'block';
        }
    }
})

// ---------------------------- 비동기 요청 ---------------------------------- //

/* 채팅 위젯 열기 이벤트 */
document.getElementById('showChatWidget').addEventListener('change', (e)=>{
    if(e.target.checked) {
        // chatWidget-footer를 보이게 합니다.`
        document.getElementById('chatWidgetFooter').style.display='block';

        // 먼저 채팅 위젯에 내용을 채워 넣습니다.
        requestAndFillMyChatWidget();

        // chatWidget-footer를 보이게 합니다.`
        document.getElementById('chatWidgetFooter').style.display = 'none';

        // 버튼이 체크되어있으면, style을 block으로 만들어 보이게 합니다.
        document.querySelector('.chatWidget-container').style.display='block';

    } else {
        document.querySelector('.chatWidget-container').style.display='none';
    }
})

/* 채팅 위젯에 채워넣을 값을 요청하고, 값을 채워넣는 함수 'fillChatWidget()'을 호출하는 함수 */
const requestAndFillMyChatWidget = () => {
    axios.post('/chat/widget'
    ).then(function (response) {

        if(response.data.chatRoomList != undefined) {

            // 채팅방 목록을 받음..
            fillChatWidget(response.data.chatRoomList);
    
            // 읽지 않은게 있으면...
            let unReadCountAll = response.data.unReadCountAll;
    
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
        // 재료 준비
        // 변수명이 많이 깁니다... 이게 모든 곳에 다 들어가야해서 이름이 중복되지 않게 하려고 그랬어요...
        const chatWidgetBox = document.createElement('button'); // 채팅방 하나
        const chatWidgetProfileImg = document.createElement('div'); // 프로필 이미지
        const chatWidgetBoxLabel = document.createElement('div'); // 이름과 시간이 들어갈 라벨
        const chatWidgetMemberNickname = document.createElement('div'); // 상대방 이름
        const chatWidgetLastChatTime = document.createElement('div'); // 마지막 시간
        const chatWidgetLastChatContent = document.createElement('div'); // 마지막 내용

        // 재료 손질
        // 1. 사진
        if(chatRoom.profileImg == undefined) {
            packUpElement(chatWidgetProfileImg, 'chatWidget-profile-img', 
            "<img src='/resources/images/member/user.png'>");
        } else {
            packUpElement(chatWidgetProfileImg, 'chatWidget-profile-img', chatRoom.profileImg);

        }
        // 2. 이름
        packUpElement(chatWidgetMemberNickname, 'chatWidget-member-nickname', chatRoom.memberNickname2);

        // 3. 마지막 날짜
        packUpElement(chatWidgetLastChatTime, 'chatWidget-last-chat-time', chatRoom.lastChatTime);
        
        // 4. 마지막 내용
        packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', chatRoom.lastChatContent);

        // 5. 라벨(이름, 시간)
        packUpElement(chatWidgetBoxLabel, 'chatWidget-box-label', null);
        
        // 6. 박스
        packUpElement(chatWidgetBox, 'chatWidget-box', null);

        // 재료 조리
        chatWidgetBoxLabel.append(chatWidgetMemberNickname, chatWidgetLastChatTime);
        chatWidgetBox.append(chatWidgetProfileImg, chatWidgetBoxLabel, chatWidgetLastChatContent);

        // 사이드 메뉴 : 읽지 않은 메세지 개수(있는 경우에만)
        if(chatRoom.unreadChatCount > 0) {
            const chatWidgetUnreadChatCount = document.createElement('div'); // 개별 채팅방의 읽지 않은 메세지 개수
            packUpElement(chatWidgetUnreadChatCount, 'chatWidget-unread-chat-count', chatRoom.unreadChatCount);
            chatWidgetBox.append(chatWidgetUnreadChatCount);
        }

        chatWidgetBox.setAttribute('name', "roomNo");
        chatWidgetBox.setAttribute('value', chatRoom.roomNo);

        // 플레이팅
        chatWidgetBody.append(chatWidgetBox);

    }
    
}




