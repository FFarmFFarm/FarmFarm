// 페이지 전환 후 선언할 전역변수 리스트
let notifySock;
let hidetimer;
let pushtimer;

/*  ============================ A. 소켓 관련 ============================ */

// HTML이 완성되면 소켓에 연결을 시도함
addEventListener("DOMContentLoaded", ()=>{
    
    console.log('로그인 여부 확인중...')
    
    // 로그인 여부 확인을 위해, axios 이용해서 회원 번호를 요청
    axios.post('/check/login'
    ).then(function (response){

        // 회원 정보가 있을 때에만 웹소켓에 연결
        if(response.data == 0) {
            
            console.log('로그인되었습니다.')

            // 새 SockJS 객체 notifySock 생성, 서버는 /echo/notify과 연결
            notifySock = new SockJS("/echo/notify");
    
            console.log('알림 서버에 연결을 시도합니다... ')
    
            // notifySock 객체가 null이 아닐 때에만, 웹소켓 서버로부터 알림을 수신
            if(notifySock != null) {
    
                console.log('알림 서버와 연결되었습니다.')
                
                notifySock.onmessage = function(e){
                
                    console.log('새로운 알림이 있습니다.')
                
                    // 받은 JSON 유형의 소켓 메시지를 역직렬화 한 후, 상수 notify을 선언해 대입
                    const notify = JSON.parse(e.data);
    
                    // 알림 내용이 있을 때에만, 수신 알림 처리 함수를 선언
                    if(notify != null) {
                        // 수신 알림 처리 함수인 fillNotifyContainer 실행해서 받은 데이터를 전송
                        fillNotifyReceiverContainer(notify);
                    }

                    // 알림 센터에서만 사용되는 조건문
                    if(document.querySelector('.notify-list-body')) {
                        selectNotifyList();
                    }
                }
            }
        }

    }). catch(function (error){
        console.log('로그인 여부 확인 중 오류 발생')
    })


})

/* 
    * 수신 알림 처리 함수!
    1) json 데이터를 받아 알림창인 notify-container를 채우고,
    2) notify-container를 화면에 노출시킨 뒤,
    3) x를 누르거나, 10초가 지나면 화면에서 다시 가린 후,
    4) notify-container를 비움

    * 예상되는 문제
    1) 알림이 여러 개 왔을 때, 어떻게 처리할 것인지
*/

/*   
    * 방식 : JSP에 미리 준비해둔 요소를 채우고 노출시키는 방식
    - 예상되는 장점 : 빠름
    - 예상되는 단점 : 알림이 여러 개 왔을 때, 노출되고 있던 알림 내용이 갑자기 바뀌는 등 깔끔하게 처리되지 않을 수 있음
*/
const fillNotifyReceiverContainer = (notify) => {
    // 알림을 받았을 때, notify-receiver-conatiner를 한 번 숨김
    clearTimeout(hidetimer); // hidetimer에 설정된 setTimeOut 이벤트 제거
    hideNotify(); // 즉시 숨김

    // notify-receiver-container의 요소 선택
    const notifyReceiverIcon = document.querySelector('.notify-receiver-icon'); // 알림 아이콘
    const notifyReceiverTitle = document.querySelector('.notify-receiver-title'); // 알림 제목(== 알림 유형)
    const notifyReceiverContent = document.querySelector('.notify-receiver-content'); // 알림 상세 내용

    // notify-receiver-container의 요소 비우기
    notifyReceiverIcon.innerHTML = "";
    notifyReceiverTitle.innerHTML = "";
    notifyReceiverContent.innerHTML = "";

    // 알림 아이콘 채우기
    switch(notify.notifyTypeNo){ // 필요 시 아이콘 추가
  
        case 201:  notifyReceiverIcon.innerHTML = "<i class='fa-regular fa-comment-dots'></i>"; break;
        case 202:  notifyReceiverIcon.innerHTML = "<i class='fa-regular fa-comment-dots'></i>"; break;
        // case (원하는 notifyTypeNo) : notifyReceiverIcon.innerHTML = (원하는 아이콘); break
    }

    // 알림 유형 제목(notifyTitle) 채우기
    notifyReceiverTitle.innerText = notify.notifyTitle;

    // 알림 내용(notifyContent) 채우기
    notifyReceiverContent.innerText = notify.notifyContent;

    // 알림 컨테이너에 링크(quickLink) 세팅하기
    document.querySelector('.notify-receiver-container').setAttribute('href', notify.quickLink);

    // 1000ms동안 딜레이 후, 숨어있던 notify-receiver-container를 노출
    pushtimer = setTimeout(pushNotify, 1000) // 1초 후 노출

    // 8000ms동안 노출 후, 노출된 notify-receiver-container를 다시 숨김
    hidetimer = setTimeout(hideNotify, 8000) // 8초 후 숨김
}

/* notify-receiver-container를 숨김 해제하는 함수 */
const pushNotify = () => {
    const notifyReceiverContainer = document.querySelector('.notify-receiver-container');
    if(notifyReceiverContainer != null) {  // 요소가 있으면
        notifyReceiverContainer.style.opacity='1'; // 투명도 1
        notifyReceiverContainer.style.height = '150px'; // 높이는 150으로 변경
    }
}

/* notify-receiver-container를 숨기는 함수 */
const hideNotify = () => {
    const notifyReceiverContainer = document.querySelector('.notify-receiver-container');
    if(notifyReceiverContainer != null) { // 요소가 있으면
        notifyReceiverContainer.style.opacity='0'; // 투명도 0
        notifyReceiverContainer.style.height = '0px'; // 높이도 0
    }
}
