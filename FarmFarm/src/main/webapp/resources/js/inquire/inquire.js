/* 문서 로딩 완료 후 수행 */
document.addEventListener('DOMContentLoaded', () => { 
  $.ajax({
    url: "/inquire/unreadCheck",
    dataType: 'json',
    success: (unreadCount) => {
      if (unreadCount > 0) {
        document.getElementById('inquireUnread').style.display = 'block';
      }

    },
    error: () => { }
  })
})

const inquireContainer = document.getElementById('inquireContainer');

const inquireBtn = document.getElementById('inquireBtn');
if (inquireBtn != undefined) {
  inquireBtn.addEventListener('click', function () {

    createInquire();

  });
  
}


/* 상담방이 없으면 만들고 있으면 해당 상담방 번호 반환 */
const createInquire = () => {

  $.ajax({
    url:"/inquire/enter",
    data: { 'memberNo': loginMemberNo, 'memberNo2': 0 },
    success: (inquireNo) => {
      console.log(inquireNo);
      memberInquireNo = inquireNo;
      openInquire(inquireContainer, inquireNo);
    },
    error: () => {
      console.log('error');
      
    }
  })

}

/* 상담방 열기 버튼 클릭 시 */
const inquireOpen = document.getElementById('inquireOpen');
if (inquireOpen != undefined) {
  inquireOpen.addEventListener('click', function () { 
    createInquire();
  })
}

/* 상담방 열기 */
const openInquire = (inquireContainer, inquireNo) => { 
  selectInquire(inquireNo);

  document.getElementById('inquireUnread').style.display = 'none';   
  inquireContainer.classList.remove('disappear-room');
  inquireContainer.classList.add('appear-room');
  inquireContainer.classList.remove('hide-room');
      
}

/* 상담방 닫기 버튼 누를 시 */
const inquireClose = document.getElementById('inquireClose');
if (inquireClose != undefined) {
  inquireClose.addEventListener('click', function () { 
    closeInquire(inquireContainer);
  })
}

/* 상담방 닫기 */
const closeInquire = (inquireContainer) => { 
  inquireContainer.classList.add('disappear-room');
  
  setTimeout(function () {
    inquireContainer.classList.add('hide-room');
    inquireContainer.classList.remove('appear-room');
  }
  , 500);
}

/* 상담방 메세지 목록 조회 */
const selectInquire = (inquireNo) => { 

  $.ajax({
    url: "/inquire/select",
    data: { 'inquireNo': inquireNo },
    dataType: 'json',
    success: (messageList) => { 
      console.log(messageList);
      fillInquireModal(messageList);
    },
    error: () => {
      console.log('error');
      
    }
  })

}

/* 상담 모달창 채우기 */
const fillInquireModal = (messageList) => { 
  if (messageList.length > 0) {
    const inquireContent = document.getElementById('inquireContent');

    inquireContent.innerHTML = '';

    let temp = messageList[0].messageDate;
    const messageDate = document.createElement('div');
    messageDate.classList.add('message-date');
    messageDate.innerHTML = temp;

    inquireContent.append(messageDate);

    for (let message of messageList) { 

      if(message.messageDate != temp) {
        temp = message.messageDate;
        const messageDate = document.createElement('div');
        messageDate.classList.add('message-date');
        messageDate.innerHTML = temp;

        inquireContent.append(messageDate);
      }

      if(message.imgFl == 'N') {

        if (message.sendMemberNo != loginMemberNo) {
          const receive = document.createElement('div');
          receive.classList.add('receive');
          
          const span = document.createElement('span');
          span.innerHTML = message.messageContent;

          const messageTime = document.createElement('div');
          messageTime.innerHTML = message.messageTime;
          messageTime.classList.add('message-time');

          receive.append(span,messageTime);
          
          inquireContent.append(receive);
          
          
        } else {
          const send = document.createElement('div');
          send.classList.add('send');

          const messageTime = document.createElement('div');
          messageTime.innerHTML = message.messageTime;
          messageTime.classList.add('message-time');

          const span = document.createElement('span');
          span.innerHTML = message.messageContent;
          
          send.append(messageTime, span);
          
          inquireContent.append(send);
        }
      } else if(message.imgFl == 'Y') {
        if(message.sendMemberNo == loginMemberNo) {
          const send = document.createElement('div');
          send.classList.add('send');

          const messageTime = document.createElement('div');
          messageTime.innerHTML = message.messageTime;
          messageTime.classList.add('message-time');

          const div = document.createElement('div');
          div.classList.add('img-container');
  
          div.innerHTML = message.messageContent;
  
          send.append(messageTime, div);
          inquireContent.append(send);
          
        } else {
          const receive = document.createElement('div');
          receive.classList.add('send');
  
          const div = document.createElement('div');
          div.classList.add('img-container');
  
          div.innerHTML =  message.messageContent;

          const messageTime = document.createElement('div');
          messageTime.classList.add('message-time');
          messageTime.innerHTML = message.messageTime;
          
  
          receive.append(div, messageTime);
          inquireContent.append(receive);
        }
      }
    }
  }
}




/* ------------------------------------------------------------------------------ */
/* 웹소켓 선언 */
let inquireSock;

if (loginMemberNo != "") {
  inquireSock = new SockJS('/inquireSock');
}

const inputMessage = document.getElementById('inquireInput');
const send = document.getElementById('send');
send.addEventListener('click', () => {
  sendInquire();
})

inputMessage.addEventListener('keypress', (e) => {
  if(e.key == 'Enter') {
    sendInquire();
  }
})

/* 상담 메세지 전송 */
const sendInquire = () => {
  if(inputMessage.value.trim().length == 0) {
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

/* WebSocket 객체가 서버로부터 메세지를 통지받으면 자동으로 실행되는 콜백함수 */
inquireSock.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  console.log(msg);

  if(memberInquireNo == msg.inquireNo) {
    const inquireContent = document.getElementById('inquireContent');

    if(msg.messageDate != msg.lastMessageDate) {
      const messageDate = document.createElement('div');
      messageDate.classList.add('message-date');
      messageDate.innerHTML = msg.messageDate;
  
      inquireContent.append(messageDate);
    }

    if(msg.imgFl == 'N') {

      if(msg.sendMemberNo == loginMemberNo) {
        const send = document.createElement('div');
        send.classList.add('send');
        const messageTime = document.createElement('div');
        messageTime.innerHTML = msg.messageTime;
        messageTime.classList.add('message-time');
        const span = document.createElement('span');
        span.innerHTML = msg.messageContent;
        send.append(messageTime, span);
        inquireContent.append(send);
        
      } else {
        const receive = document.createElement('div');
        receive.classList.add('receive');
        const span = document.createElement('span');
        span.innerHTML = msg.messageContent;
        const messageTime = document.createElement('div');
        messageTime.innerHTML = msg.messageTime;
        messageTime.classList.add('message-time');
        receive.append(span, messageTime);
        inquireContent.append(receive);
      }

    } else if(msg.imgFl == 'Y') {
      
      if(msg.sendMemberNo == loginMemberNo) {
        const send = document.createElement('div');
        send.classList.add('send');

        const messageTime = document.createElement('div');
        messageTime.innerHTML = msg.messageTime;
        messageTime.classList.add('message-time');

        const div = document.createElement('div');
        div.classList.add('img-container');

        div.innerHTML = msg.messageContent;

        send.append(messageTime, div);
        inquireContent.append(send);
        
      } else {
        const receive = document.createElement('div');
        receive.classList.add('send');

        const div = document.createElement('div');
        div.classList.add('img-container');

        div.innerHTML =  msg.messageContent;

        const messageTime = document.createElement('div');
        messageTime.innerHTML = msg.messageTime;
        messageTime.classList.add('message-time');

        receive.append(div, messageTime);
        inquireContent.append(receive);
      }
    }
      inquireContent.scrollTop = inquireContent.scrollHeight;
  }
}


/* 상담방에 이미지가 전송됐을 때 */
const inquireImage = document.getElementById('inquireImage');
if(inquireImage!=undefined) {
  inquireImage.addEventListener('change', e => {

    if(e.target.files[0] != undefined) {

      const form = document.getElementById('inquireImgForm');
      const formData = new FormData(form);


      $.ajax({
        url: "/inquire/imgUpload",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
          let obj = {
            "sendMemberNo": loginMemberNo,
            "inquireNo": memberInquireNo,
            "messageContent": data,
            "imgFl":'Y'
          };

        inquireSock.send(JSON.stringify(obj));
        form.reset();
        },
        error: () => {
          console.log('error');
        }
      })

    }

  })
}