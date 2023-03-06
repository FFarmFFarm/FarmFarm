/* 상담방 목록 중 하나 클릭했을 때 */
const inquireRoomList = document.getElementsByClassName('message-preview-box');
if (inquireRoomList != undefined) {
  for (let i = 0; i < inquireRoomList.length; i++) {
    inquireRoomList[i].addEventListener('click', () => {

      const inputBox = document.getElementById('inputBox');
      if (inputBox != undefined) {
        inputBox.value = '';
      }

      /* 해당 상담방 메세지 목록 불러오기 */
      selectMessageList(inquireRoomList[i].id);
      memberInquireNo = inquireRoomList[i].id;

      /* unread count 아이콘 제거 */
      const unreadCount = document.getElementsByClassName('unread-message-count');


      if (unreadCount[i] != undefined) {
        if (!unreadCount[i].classList.contains('hide')) {
          unreadCount[i].classList.add('hide');
        }
      }


    })
  }
}

/* 상담방 메세지 목록 조회하는 함수 */
const selectMessageList = inquireNo => {


  axios.get("/admin/inquire/" + inquireNo)
  .then((response) => {
    const messageList = response.data;
    console.log(messageList);

    fillInquireRoom(messageList);

    /* 상담방 목록 재조회 */
    selectInquireList(inquireNo);

    const inputBox = document.getElementById('inputBox');
    if (inputBox != undefined) {
      inputBox.value = '';
      inputBox.focus();
    }
  }).catch((err) => {
    console.log(err);
  });

}


/* 상담방 메세지 목록 채우기 */
const fillInquireRoom = (messageList) => {


  const readingArea = document.getElementById('readingArea');
  readingArea.innerHTML = '';


  let temp = messageList[0].messageDate;

  const dateLabelLine = document.createElement('div');
  dateLabelLine.className = 'date-label-line';

  const dateLabel = document.createElement('div');
  dateLabel.classList.add('date-label');
  dateLabel.innerHTML = temp;

  dateLabelLine.append(dateLabel);
  readingArea.append(dateLabelLine);

  for (let item of messageList) {

    if (item.messageDate != temp) {

      const dateLabelLine = document.createElement('div');
      dateLabelLine.className = 'date-label-line';

      const dateLabel = document.createElement('div');
      dateLabel.classList.add('date-label');
      dateLabel.innerHTML = item.messageDate;

      dateLabelLine.append(dateLabel);
      readingArea.append(dateLabelLine);

      temp = item.messageDate;
    }

    const message = document.createElement('div');

    const messageBubble = document.createElement('div');
    messageBubble.innerHTML = item.messageContent;

    const messageTime = document.createElement('div');
    messageTime.innerHTML = item.messageTime;

    message.append(messageBubble);
    messageBubble.append(messageTime);

    /* 로그인한 회원 본인이 보낸 경우 */
    if (loginMemberNo == item.sendMemberNo) {
      message.classList.add('sent-message');
      messageBubble.classList.add('sent-bubble');
      messageTime.classList.add('sent-bubble-time');

      /* 로그인한 회원 본인이 받은 메세지인 경우 */
    } else {
      message.classList.add('received-message');
      messageBubble.classList.add('received-bubble');
      messageTime.classList.add('received-bubble-time');

    }

    readingArea.append(message);
  }


  setTimeout(() => {
    readingArea.scrollTo(0, readingArea.scrollHeight);
  }, "1000");



  // 상담방 가리개 제거
  const roomBodyBlinder = document.getElementById('roomBodyBlinder');
  roomBodyBlinder.classList.add('hide');




}


/* 상담방 목록 조회 */
const selectInquireList = (inquireNo) => {

  axios.get("/inquire/list")
  .then((response) => {
    console.log(response.data);
    fillInquireList(response.data, inquireNo);
  }).catch((err) => {
    console.log(err);
  });
}


/* 조회해온 상담방 목록 출력 */
const fillInquireList = (inquireList, inquireNo) => {

  const roomList = document.getElementById('roomList');
  roomList.innerHTML = '';


  for (let inquire of inquireList) {
    if (inquire.messageCount > 1) {

      const messagePreviewBox = document.createElement('div');
      if (inquireNo == inquire.inquireNo) {
        messagePreviewBox.classList.add('message-preview-box', 'message-box-clicked');
      } else {
        messagePreviewBox.classList.add('message-preview-box');
      }


      const profileImg = document.createElement('div');
      profileImg.classList.add('profile-img');

      const img = document.createElement('img');

      profileImg.append(img);

      if (inquire.profileImg != undefined) {
        img.src = inquire.profileImg;
      } else {
        img.src = '/resources/images/chatting/farmer.png';
      }

      messagePreviewBox.append(profileImg);

      const messageBoxLabel = document.createElement('div');
      messageBoxLabel.classList.add('message-box-label');

      const messageInfo = document.createElement('div');
      messageInfo.classList.add('message-info');

      const memberNickname = document.createElement('div');
      memberNickname.classList.add('member-nickname');
      memberNickname.innerHTML = inquire.memberNickname;

      const lastMessageTime = document.createElement('div');
      lastMessageTime.classList.add('last-message-time');
      lastMessageTime.innerHTML = inquire.lastSendTime;

      const unreadMessage = document.createElement('div');
      unreadMessage.innerHTML = inquire.unreadCount;

      if (inquire.unreadCount == 0) {
        unreadMessage.classList.add('unread-message-count', 'hide');

      } else if (inquire.unreadCount > 0) {
        unreadMessage.classList.add('unread-message-count');
        unreadMessage.innerHTML = inquire.unreadCount;
      }

      messageInfo.append(memberNickname, lastMessageTime, unreadMessage);

      messageBoxLabel.append(messageInfo);

      messagePreviewBox.append(messageBoxLabel);

      const lastMessage = document.createElement('div');
      lastMessage.classList.add('last-message-content');

      if (inquire.lastSendImgFl == 'N') {
        lastMessage.innerHTML = inquire.lastMessage;

      } else {

        lastMessage.innerHTML = '사진';
      }

      messageBoxLabel.append(lastMessage);

      roomList.append(messagePreviewBox);


      messagePreviewBox.addEventListener('click', () => {
        /* 해당 상담방 메세지 목록 불러오기 */
        selectMessageList(inquire.inquireNo);
        memberInquireNo = inquire.inquireNo;

        /* unread count 아이콘 제거 */
        if (!unreadMessage.classList.contains('hide')) {
          unreadMessage.classList.add('hide');
        }

      })

    }
  }
}




/* ------------------------------------------------------------------------------ */
/* 웹소켓 선언 */
let inquireSock;

if (loginMemberNo != "") {
  inquireSock = new SockJS('/inquireSock');
}

const sendBtn = document.getElementById('sendBtn');
const inputMessage = document.getElementById('inputBox');

sendBtn.addEventListener('click', () => {
  if (inputMessage.value.trim().length > 0) {
    sendInquire();

  } else {
    messageModalOpen("메세지를 입력해주세요")
  }
})

inputMessage.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    if (inputMessage.value.trim().length > 0) {
      sendInquire();

    } else {
      messageModalOpen("메세지를 입력해주세요")
    }
  }
})


/* 상담 메세지 전송 */
const sendInquire = () => {
  if (inputMessage.value.trim().length == 0) {
    messageModalOpen("메세지를 입력해주세요");
  } else {
    var obj = {
      "sendMemberNo": loginMemberNo,
      "inquireNo": memberInquireNo,
      "messageContent": inputMessage.value,
      "imgFl": 'N'
    };
    console.log(obj);
    inquireSock.send(JSON.stringify(obj));
    inputMessage.value = '';
  }
}


/* 상담방에 이미지가 전송됐을 때 */
const inquireImage = document.getElementById('imageInput');
if (inquireImage != undefined) {
  inquireImage.addEventListener('change', e => {

    if (e.target.files[0] != undefined) {

      const form = document.getElementById('inquireImgForm');
      const formData = new FormData(form);


      axios.post("/inquire/imgUpload", formData, {
        processData: false,
        contentType: false
      }).then((response) => {
        let obj = {
          "sendMemberNo": loginMemberNo,
          "inquireNo": memberInquireNo,
          "messageContent": response.data,
          "imgFl": 'Y'
        };

        inquireSock.send(JSON.stringify(obj));
        form.reset();
      }).catch((err) => {
        console.log(err);
      });

    }

  })
}


/* WebSocket 객체가 서버로부터 메세지를 통지받으면 자동으로 실행되는 콜백함수 */
inquireSock.onmessage = function (e) {

  const msg = JSON.parse(e.data);
  console.log(msg);




  if (memberInquireNo == msg.inquireNo) {
    /* 방금온 메세지 읽음처리 */
    updateMessageRead(msg.inquireNo);

    const readingArea = document.getElementById('readingArea');


    if (msg.messageDate != msg.lastMessageDate) {
      const dateLabelLine = document.createElement('div');
      dateLabelLine.className = 'date-label-line';

      const dateLabel = document.createElement('div');
      dateLabel.classList.add('date-label');
      dateLabel.innerHTML = msg.messageDate;

      dateLabelLine.append(dateLabel);
      readingArea.append(dateLabelLine);
    }

    const message = document.createElement('div');

    const messageBubble = document.createElement('div');
    messageBubble.innerHTML = msg.messageContent;

    const messageTime = document.createElement('div');
    messageTime.innerHTML = msg.messageTime;

    message.append(messageBubble);
    messageBubble.append(messageTime);

    /* 로그인한 회원 본인이 보낸 경우 */
    if (loginMemberNo == msg.sendMemberNo) {
      message.classList.add('sent-message');
      messageBubble.classList.add('sent-bubble');
      messageTime.classList.add('sent-bubble-time');

      /* 로그인한 회원 본인이 받은 메세지인 경우 */
    } else {
      message.classList.add('received-message');
      messageBubble.classList.add('received-bubble');
      messageTime.classList.add('received-bubble-time');

    }

    readingArea.append(message);



    readingArea.scrollTo(0, readingArea.scrollHeight);


  } else {

  }

  console.log('메세지 왔어요');
  setTimeout(() => {
    selectInquireList();
  }, "1000")
}

/**
 * 메세지 읽음처리
 * @param {} inquireNo 
 */
const updateMessageRead = (inquireNo) => {
  axios.put("/inquire/" +inquireNo+ "/read")
  .then((response) => {
    console.log('메세지 읽음처리');
  }).catch((err) => {
    console.log(err);
  });

}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    chatSearch();
  }
})

/* 검색창 만들기 이벤트 */
document.getElementById('searchBtn').addEventListener('click', () => {

  chatSearch();
})

const chatSearch = () => {
  let input = document.getElementById('searchBar');

  if (input.value.trim().length == 0) {
    input.focus();
  } else {

    console.log('검색중이에요.........')

    // 버튼 보여주세요
    document.getElementById('resetRoomSearch').style.display = 'block';

    let roomList = document.getElementsByClassName('message-preview-box');

    for (room of roomList) {
      room.style.display = 'flex';
      let roomName = room.children[1].children[0].innerText;
      console.log('방제 : ' + roomName);

      if (!roomName.includes(input.value)) {
        room.style.display = 'none';
      }
    }

  }
}


/* 초기화 버튼 클릭 시 */
document.getElementById('resetRoomSearch').addEventListener('click', (e) => {
  // e.target.parent.style.display='none'; // 버튼 숨김
  document.getElementById('resetRoomSearch').style.display = 'none';
  document.getElementById('searchBar').value = ''; // 채팅방 검색창 초기화
  selectInquireList(); // 목록 가져옴
})