// 페이지 전환 후 선언할 전역변수 리스트
let alarmSock;
let hidetimer;
let pushtimer;

/*  ============================ A. 소켓 관련 ============================ */

// HTML이 완성되면 소켓에 연결을 시도함
addEventListener("DOMContentLoaded", ()=>{
    
    // 임시 회원 정보, 나중에 수정하기
    let memberNo =  1

    // 회원 정보가 있을 때에만 소켓 연결
    if(memberNo != null) {
        // 새 SockJS 객체 alarmSock 생성, 서버는 /echo/alarm과 연결
        alarmSock = new SockJS("/echo/alarm");

        console.log('알림 서버에 연결을 시도합니다... ')

        // alarmSock 객체가 생성되었을 때에만, 웹소켓 서버로부터 알림을 수신
        if(alarmSock != null) {

            console.log('알림 서버와 연결되었습니다.')
            
            alarmSock.onmessage = function(e){
            
                console.log('새로운 알림이 있습니다.')
            
                // 받은 소켓 메시지를 역직렬화 한 후, 상수 alarm에 저장
                const alarm = JSON.parse(e.data);

                // 알림 내용이 있을 때에만, 수신 알림 처리 함수를 선언
                if(alarm != null) {
                    // 수신 알림 처리 함수인 fillAlarmContainer 실행해서 받은 데이터를 전송
                    fillAlarmReceiverContainer(alarm);
                }
            }
        }
    }

})

/* 
    * 수신 알림 처리 함수!
    1) json 데이터를 받아 알림창인 alarm-container를 채우고,
    2) alarm-container를 화면에 노출시킨 뒤,
    3) x를 누르거나, 10초가 지나면 화면에서 다시 가린 후,
    4) alarm-container를 비움

    * 예상되는 문제
    1) 알림이 여러 개 왔을 때, 어떻게 처리할 것인지
*/

const fillAlarmReceiverContainer = (alarm) => {

    // 알림 전, 만약 노출된 alarm-conatiner가 있는 경우 노출된 alarm-container를 다시 숨김
    clearTimeout(hidetimer);

    hideAlarm(); // 즉시 숨김

    // alarm-receiver-container의 요소
    const alarmReceiverIcon = document.querySelector('.alarm-receiver-icon'); // 알림 아이콘
    const alarmReceiverTitle = document.querySelector('.alarm-receiver-title'); // 알림 제목(== 알림 유형)
    const alarmReceiverContent = document.querySelector('.alarm-receiver-content'); // 알림 상세 내용

    // 모든 요소 비우기
    alarmReceiverIcon.innerHTML = "";
    alarmReceiverTitle.innerHTML = "";
    alarmReceiverContent.innerHTML = "";

    console.log(alarm.alarmTypeNo);

    // 알림 아이콘 채우기
    switch(alarm.alarmTypeNo){
        case 201:  alarmReceiverIcon.innerHTML = "<i class='fa-regular fa-comment-dots'></i>"; break;
        case 202:  alarmReceiverIcon.innerHTML = "<i class='fa-regular fa-comment-dots'></i>"; break;
    }

    // 알림 제목 채우기
    alarmReceiverTitle.innerText = alarm.alarmTitle;

    // 알림 내용 채우기
    alarmReceiverContent.innerText = alarm.alarmContent;

    // 알림 컨테이너에 링크(quickLink) 세팅하기
    document.querySelector('.alarm-receiver-container').setAttribute('href', alarm.quickLink);

    // 내용을 채운 후, 잠시 딜레이 후, 숨어있던 alarm-container를 노출
    pushtimer = setTimeout(pushAlarm, 1000) // 1초 후 노출
    
    // 노출 후, 잠시 딜레이 후, 노출된 alarm-container를 다시 숨김
    hidetimer = setTimeout(hideAlarm, 5000) // 5초 후 숨김

}

/* alarm-container를 숨김 해제하는 함수 */
const pushAlarm = () => {
    const alarmReceiverContainer = document.querySelector('.alarm-receiver-container');
    alarmReceiverContainer.style.opacity='1';
    alarmReceiverContainer.style.height = '150px';
}

/* alarm-container를 숨기는 함수 */
const hideAlarm = () => {
    const alarmReceiverContainer = document.querySelector('.alarm-receiver-container');
    alarmReceiverContainer.style.opacity='0';
    alarmReceiverContainer.style.height = '0px';
}