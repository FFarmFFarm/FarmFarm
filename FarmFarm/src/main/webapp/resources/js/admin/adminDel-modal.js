
const adminDel = document.getElementById("adminDelContainer");
const adminDelBtn = document.getElementById("adminDelBtn");

adminDel.style.display = 'none';

adminDelBtn.addEventListener('click', () => {
    adminDel.style.display = 'flex';
})


// 모달창 바깥 클릭 시 모달창 꺼짐
window.addEventListener('click', (e) => {

    // 신고창 밖 클릭 시 닫힘
    e.target === adminDel ? adminDel.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});
