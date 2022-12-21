

const report = document.getElementById("reportContainer");
const reportBtn = document.getElementById("reportBtn");

report.style.display = 'none';

reportBtn.addEventListener('click', () => {
    report.style.display = 'flex';
})



// 모달창 바깥 클릭 시 모달창 꺼짐--------------------------------------------
window.addEventListener('click', (e) => {

    // 신고창 밖 클릭 시 닫힘
    e.target === report ? report.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});




// 검색창 주소
// location : 주소, 주소창과 관련된 내장 객체
// location.href : 현재 주소(전체)  
// location.href = "주소" : 작성된 주소 요청  _주소로 이동함
// location.pathname = 현재 요청 주소만을 반환(프로토콜, ip, 포트 제외)  ex)/board/1
// location.search : 쿼리스트링만 반환  ex) ?cp=2