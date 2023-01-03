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


const fillInquireModal = (messageList) => { 
  if (messageList.length > 0) {
    const inquireContent = document.getElementById('inquireContent');

    inquireContent.innerHTML = '';

    for (let message of messageList) { 
      if (message.sendMemberNo == 0) {
        const receive = document.createElement('div');
        receive.classList.add('receive');

        const span = document.createElement('span');
        span.innerHTML = message.messageContent;

        receive.append(span);

        inquireContent.append(receive);


      } else {
        const send = document.createElement('div');
        receive.classList.add('send');

        const span = document.createElement('span');
        span.innerHTML = message.messageContent;

        send.append(span);

        inquireContent.append(send);
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