
// todo: 모달창 바깥 클릭 시 모달창 꺼짐--------------------------------------------
window.addEventListener('click', (e) => {
    const report = document.getElementById("report");

    // 신고창 밖 클릭 시 닫힘
    e.target === report ? report.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});
