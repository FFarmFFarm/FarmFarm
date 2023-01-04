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
            console.log('채팅 서버 연결중...')

            if (listenChatSocket != null) {

                console.log('채팅 서버와 연결되었습니다.')

                listenChatSocket.onmessage = function (e) {
                    console.log('새로운 메세지가 있습니다.');
                    document.getElementById('chatAlarmDot').style.display = 'block';
                }
            }

        }

    }).catch(function (error) {
        console.log(error);
    })
})

/* 로딩이 완료되면 소켓을 연결함 */
addEventListener("load", ()=>{
    requestAndFillMyChatWidget();


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
    axios.post('/chat/widget'
    ).then(function (response) {

        if(response.data.chatRoomList != undefined) {

            // 채팅방 목록을 받음..
            fillChatWidget(response.data.chatRoomList);
    
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
        // 재료 준비
        // 변수명이 많이 깁니다... 이게 모든 곳에 다 들어가야해서 이름이 중복되지 않게 하려고 그랬어요...
        const chatWidgetBox = document.createElement('button'); // 채팅방 하나
        // const chatWidgetProfileImg = document.createElement('div'); // 프로필 이미지
        const chatWidgetPostTitle = document.createElement('div'); // 프로필 이미지
        const chatWidgetThumbnailImg = document.createElement('div'); // 프로필 이미지
        const chatWidgetBoxLabel = document.createElement('div'); // 이름과 시간이 들어갈 라벨
        const chatWidgetMemberNickname = document.createElement('div'); // 상대방 이름
        const chatWidgetLastChatTime = document.createElement('div'); // 마지막 시간
        const chatWidgetLastChatContent = document.createElement('div'); // 마지막 내용

        // 재료 손질
        // 1. 사진
        // if(chatRoom.profileImg2 == undefined) {
        //     packUpElement(chatWidgetProfileImg, 'chatWidget-profile-img', 
        //     "<img src='/resources/images/member/user.png'>");
        // } else {
        //     packUpElement(chatWidgetProfileImg, 'chatWidget-profile-img', "<img src=" + chatRoom.profileImg2 + ">");
        // }

        // 상품 프로필 이미지
        if (chatRoom.thumbnailImg == undefined) { // 이미지가 없는 경우 기본 이미지
            packUpElement(chatWidgetThumbnailImg, 'chatWidget-post-img', "<img src='/resources/images/member/user.png'>");
        } else {
            packUpElement(chatWidgetThumbnailImg, 'chatWidget-post-img', "<img src=" + chatRoom.thumbnailImg + ">");
        }
        
        // 상품 한줄소개
        packUpElement(chatWidgetPostTitle, 'post-title', chatRoom.postTitle);

        // 2. 이름
        packUpElement(chatWidgetMemberNickname, 'chatWidget-member-nickname', chatRoom.memberNickname2);

        // 3. 마지막 날짜
        packUpElement(chatWidgetLastChatTime, 'chatWidget-last-chat-time', chatRoom.lastChatTime);
        
        // // 4. 마지막 내용
        // if (chatRoom.lastChatContent == undefined) { // 채팅 내용이 없는 경우 '대화 내용이 없습니다' 출력
        //     packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', '대화 내용이 없습니다.');
        // } else {
        //     if (chatRoom.lastChatImgFl === 'N') { // 사진이 아닌 경우
        //         packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', chatRoom.lastChatContent);
        //     } else { // 사진인 경우
        //         packUpElement(chatWidgetLastChatContent, 'chatWidget-last-chat-content', '사진을 보냈습니다.');
        //     }
        // }

        // 5. 라벨(이름, 시간)
        packUpElement(chatWidgetBoxLabel, 'chatWidget-box-label', null);
        
        // 6. 박스
        packUpElement(chatWidgetBox, 'chatWidget-box', null);

        // 7. input값 세팅
        const chatWidgetBoxInfo = document.createElement('input');
        chatWidgetBoxInfo.hidden=true;
        chatWidgetBoxInfo.setAttribute('name', "roomNo");
        chatWidgetBoxInfo.setAttribute('value', chatRoom.roomNo);

        // 재료 조리
        chatWidgetBoxLabel.append(chatWidgetMemberNickname, chatWidgetLastChatTime);
        chatWidgetBox.append(chatWidgetThumbnailImg, chatWidgetPostTitle, chatWidgetBoxLabel, chatWidgetBoxInfo);

        // 사이드 메뉴 : 읽지 않은 메세지 개수(있는 경우에만)
        if(chatRoom.unreadChatCount > 0) {
            const chatWidgetUnreadChatCount = document.createElement('div'); // 개별 채팅방의 읽지 않은 메세지 개수
            packUpElement(chatWidgetUnreadChatCount, 'chatWidget-unread-chat-count', chatRoom.unreadChatCount);
            chatWidgetBox.append(chatWidgetUnreadChatCount);
        }

  

        // 플레이팅
        chatWidgetBody.append(chatWidgetBox);

    }
    
}


