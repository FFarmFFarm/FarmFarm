
var reportContainer = document.getElementById("reportContainer");
var reportBtn = document.getElementById("reportBtn");

var reportContent = document.getElementById("reportContent");
var radioButton = document.getElementsByName('reportRadio');


var reportType;
var reportTargetNo;

// 메서드 -----------------------------------------------


// 신고 모달 열리는 함수 (기본 세팅)
var openReportModal = () => {

    // 신고 모달 열리기
    console.log("신고 모달");
    reportContainer.style.display = 'flex';

    // 내용지우기
    reportContent.value = "";

    // textarea 리사이즈한 후에 돌아왔을 때 원래 크기로.
    reportContent.style.width = "200px";
    reportContent.style.height = "60px";

    // 체크해제
    for(let j=0; j<radioButton.length; j++) {
        if(radioButton[j].checked){
            radioButton[j].checked = false;
        }
    }
}


// -----------------------------------------------------


// x 클릭 시 모달창 꺼짐
document.getElementById("xIcon").addEventListener('click', () => {
    reportContainer.style.display = 'none';
});


// 모달창 바깥 클릭 시 모달창 꺼짐
window.addEventListener('click', (e) => {

    // 신고창 밖 클릭 시 닫힘
    e.target === reportContainer ? reportContainer.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});



//--------------------------------------------------



// 신고하기 ajax
var reportSubmitBtn = document.getElementById("reportSubmitBtn");

reportSubmitBtn.addEventListener("click", () => {
    console.log("신고하기 버튼 클릭");

    // 선택한 신고 사유 가져오기
    const reportReasonList = document.getElementsByName('reportRadio');
    const radioText = document.getElementsByClassName('radio-text');
    
    for(var i=0; i<reportReasonList.length; i++){
        if(reportReasonList[i].checked){
            //fixme: 왜,, 하나씩 밀리는 거지. 일단 임시방편으로 +1함.
            radioResult = radioText[i].innerText;
            console.log(radioResult);
        }
    }

    
    console.log("reportType: " + reportType);
    console.log("reportTargetNo : " + reportTargetNo);
    console.log("reportReason : " + radioResult);
    console.log("reportContent : " + reportContent.value);

    report();
})



// ----------------------------------------------


// optimize: 신고하기 ajax
var report = () => {
    $.ajax({
        url: "/report",
        data: { "reportType" :reportType, 
                "reportTargetNo" : reportTargetNo,
                "reportReason" : radioResult,
                "reportContent": reportContent.value},
        type: "POST",
        success: (result) => {
            if(result > 0){
                console.log("신고 접수");
                reportContainer.style.display = 'none';
                messageModalOpen('신고가 접수되었습니다.');
            
            } else {
                console.log("신고 실패");
            }
        },
        error: () => {
            console.log("신고 오류");
        }
    });

}
