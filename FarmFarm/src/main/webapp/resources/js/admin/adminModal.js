var adminModal = document.getElementById('adminModalContainer');

// 모달 열리기
const adminModalOpen = () => {
    adminModal.style.display = 'flex';
}


// 모달 닫히기
const adminModalClose = () => {
    adminModal.style.display = 'none';
}


// 모달창 바깥 클릭 시 모달창 닫기
window.addEventListener('click', (e) => {
    e.target === adminModal ? adminModal.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});


// 모달창에서 취소 버튼 클릭 시 모달창 닫기
const cancelBtn = document.getElementById('cancelBtn');

if(cancelBtn != null) {
    cancelBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    })
}


