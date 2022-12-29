
var adminDel = document.getElementById("adminDelContainer");
const adminDelBtn = document.getElementById("adminDelBtn");

adminDel.style.display = 'none';

// 회원 상세 정보에서 강제 탈퇴 버튼 누를 경우
adminDelBtn.addEventListener('click', () => {
    adminDel.style.display = 'flex';
})


// 모달창 바깥 클릭 시 모달창 꺼짐
window.addEventListener('click', (e) => {

    // 신고창 밖 클릭 시 닫힘
    e.target === adminDel ? adminDel.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});


// 강제 탈퇴 모달창에서 취소
document.getElementById("delCancelBtn").addEventListener('click', ()=>{
    adminDel.style.display = "none";
})


