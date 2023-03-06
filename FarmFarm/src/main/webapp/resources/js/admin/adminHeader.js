// 오늘 날짜 표시하기
const todayDate = document.getElementById("todayDate");

todayDate.style.margin = 0;
todayDate.style.marginTop = "10px";





const  setClock = () => {
    var today = new Date();
    var hour = modifyNumber(today.getHours());
    var minute = modifyNumber(today.getMinutes());
    var second = modifyNumber(today.getSeconds());
    var year = today.getFullYear();
    var month = today.getMonth() +1;  //monthIndex를 반환하기 때문에 0이 1월
    var date = today.getDate();

    var weekday = new Array(7);
    weekday[0] = "일";
    weekday[1] = "월";
    weekday[2] = "화";
    weekday[3] = "수";
    weekday[4] = "목";
    weekday[5] = "금";
    weekday[6] = "토";

    var day = weekday[today.getDay()];
    
    todayDate.innerHTML = year + "년 " + month + "월 " + date + "일"+ " (" + day + ")"
                                                    +"   " + hour + ":" + minute + ":" + second;
}



// 1~9시를 01~09시로 표현하는 함수
const modifyNumber = (time) => {
    if(parseInt(time) < 10){
        return "0" + time;
    } else {
        return time;
    }
}



window.onload = () =>{
    setClock();
    setInterval(setClock, 1000);  // 1초마다 실행
}



/* 문서 로딩 완료 후 읽지 않은 메세지가 있는 경우
nav 상담 관리 버튼 옆에 빨간 아이콘 표시*/
document.addEventListener('DOMContentLoaded', () => { 

    axios.get("/inquire/read")
    .then((response) => {
      if (response.data > 0) {
        document.getElementById('newMessage').classList.remove('hide');
      } else {
        document.getElementById('newMessage').classList.add('hide');
      }
    }).catch((err) => {
      console.log(err);
    });
})


