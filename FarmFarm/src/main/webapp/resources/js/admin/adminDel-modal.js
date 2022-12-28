
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



//todo : 강제 탈퇴 시키기 (by 관리자)
const targetNo = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

const reportType = document.getElementById("reportType");
const reportTargetNo = document.getElementById("reportTargetNo");
const reportReason = document.getElementById("reportReason");
const processContent = document.getElementById("adminDelContent");


processContent.addEventListener("focus", () => {
    processContent.value = "";
})



// 신고하기 ajax
const adminDelSubmitBtn = document.getElementById("adminDelSubmitBtn");

adminDelSubmitBtn.addEventListener("click", () => {



    $.ajax({
        url: "/adminDel",
        data: { "reportType" :reportType.value, 
                "reportTargetNo" : reportTargetNo.value,
                "reportReason" : reportReason.value,
                "processContent": processContent.value},
        type: "POST",
        success: (result) => {
            if(result > 0){
                console.log("관리자 처리");
                adminDel.style.display = 'none';
                alert("강제 탈퇴 완료")
            
            } else {
                console.log("처리 실패");
            }
        },
        error: () => {
            console.log("처리 오류");
        }
    });

})

