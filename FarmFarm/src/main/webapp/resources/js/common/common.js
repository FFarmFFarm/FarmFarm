/* 모달창 끄기 */
const displayNone = (element) => {

  document.getElementsByTagName('body')[0].classList.remove('scroll-lock');
  element.classList.add('disappear');

  setTimeout(function () {
    element.classList.remove('appear');
    element.classList.add('hide');
  }
    , 300);
}

/* 모달창 켜기 */
const displayFlex = (element) => {
  element.classList.remove('disappear');
  element.classList.add('appear');
  element.classList.remove('hide');

  document.getElementsByTagName('body')[0].classList.add('scroll-lock');
}



/* 모달창 끄기(스크롤 O) */
const displayNoneNoLock = (element) => {

  element.classList.add('disappear');

  setTimeout(function () {
    element.classList.remove('appear');
    element.classList.add('hide');
  }
    , 300);
}

/* 모달창 켜기(스크롤O) */
const displayFlexNoLock = (element) => {
  element.classList.remove('disappear');
  element.classList.add('appear');
  element.classList.remove('hide');

}


/* 클립보드에 복사하기 */
const copy = (text) => {
  // 임시의 textarea 생성
  const $textarea = document.createElement("textarea");

  // body 요소에 존재해야 복사가 진행됨
  document.body.appendChild($textarea);

  // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
  $textarea.value = text;
  $textarea.select();

  // 복사 후 textarea 지우기
  document.execCommand('copy');
  document.body.removeChild($textarea);
};

/* 로그인이 필요한 서비스 실행 시 로그인 컨펌창 열기 */
const loginConfirmOpen = () => {
  const loginConfirm = document.getElementById('loginConfirm');
  displayflex(loginConfirm);

}


/* 로그인 컨펌창 취소 클릭 시 닫힘 */
if (document.getElementById('loginCalcelBtn') != undefined) {

  document.getElementById('loginCalcelBtn').addEventListener('click', function () {
    const loginConfirm = document.getElementById('loginConfirm');
    displayNone(loginConfirm);
  })


  /* 로그인 컨펌창 확인 클릭 시 로그인 페이지로 이동 */
  document.getElementById('loginConfirmBtn').addEventListener('click', function () {
    location.href = "/login";
  })

}

/* R1, C1 처럼 앞에 fl 붙은 번호 잘라내기 */
const cutNumber = (number) => {
  return number.substr(0);
}

/* message 모달창에 메세지 넣어서 출력하기 */
const messageModalOpen = (message) => {
  const messageModal = document.getElementById('messageModal');
  const messageContent = document.getElementById('messageContent');
  messageContent.innerText = "";
  messageContent.innerText = message;

  displayFlexNoLock(messageModal);

  setTimeout(() => { displayNoneNoLock(messageModal) }, 2000);

}


/* 문자열에서 일부 특수문자 제거 */
const replaceSpecialSymbols = (text) => {
  // 문자열을 파라미터로 받아서
  // 웹해킹에 사용될 가능성이 있는 특수문자를 전부 제거하고 
  // 결과를 반환

  text = text.replace(/\=/gi, '');
  text = text.replace(/\&/gi, '');
  text = text.replace(/\?/gi, '');
  text = text.replace(/\@/gi, '');
  text = text.replace(/\#/gi, '');
  text = text.replace(/\$/gi, '');
  text = text.replace(/\%/gi, '');
  text = text.replace(/\;/gi, '');
  text = text.replace(/\|/gi, '');
  text = text.replace(/\\/gi, '');

  return text;
}



const scrollToTag = (tagName) => {
  tagName.scrollIntoView({ behavior: 'smooth' });
};