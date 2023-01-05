
var reportContainer = document.getElementById("reportContainer");
var reportBtn = document.getElementById("reportBtn");
const reportBtn2 = document.getElementById("reportBtn2");

// 직접 작성한 신고 사유 내용 == reportContent  // 전역변수로 바꾸면서 혹시나 다른데랑 충돌날까봐 이름 변경
var modalReportContent = document.getElementById("reportContent");
var radioButton = document.getElementsByName('reportRadio');

reportBtn.addEventListener('click', () => {
    console.log("신고 모달");
    reportContainer.style.display = 'flex';

    // 내용지우기
    modalReportContent.value = "";

    // 체크해제
    for(let i=0; i<radioButton.length; i++) {
        if(radioButton[i].checked){
            radioButton[i].checked = false;
        }
    }
})


// 댓글에서 프로필 신고
reportBtn2.addEventListener('click', () => {
    reportContainer.style.display = 'flex';

    // 내용지우기
    modalReportContent.value = "";

    // 체크해제
    for(let i=0; i<radioButton.length; i++) {
        if(radioButton[i].checked){
            radioButton[i].checked = false;
        }
    }
});


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




// 검색창 주소
// location : 주소, 주소창과 관련된 내장 객체
// location.href : 현재 주소(전체)  
// location.href = "주소" : 작성된 주소 요청  _주소로 이동함
// location.pathname = 현재 요청 주소만을 반환(프로토콜, ip, 포트 제외)  ex)/board/1
// location.search : 쿼리스트링만 반환  ex) ?cp=2


//todo : 신고하기
/*
    1) 주소창 주소에 따라서 reportType을 다르게.  -> pathname

    회원 신고 : /member /chat (/myPage) /seller
    게시글 신고 : /board/{boardCode}/{boardNo}  /post/{postNo}
    댓글 신고 : /board/{boardCode}/{boardNo}


    2) 각 타입별로 reportType 정해주고, reportTargetNo 다르게 가져오기

    3) 댓글은 번호 앞에 c 붙이는 방향으로..

*/

// * pathname: 각 기능 메인 주소
var pathname = location.pathname.substring(1, location.pathname.lastIndexOf("/"));

//boardNo(와글와글), postNo(판매글), reviewNo의 번호  -> lastIndexOf("/")로 자름
// seller에서 memberNo(판매자)
//location.pathname.substring(location.pathname.lastIndexOf("/")+1)
var targetNo = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

var reportType = document.getElementById("reportType");
var reportTargetNo = document.getElementById("reportTargetNo");



// 신고하기 ajax
var reportSubmitBtn = document.getElementById("reportSubmitBtn");

reportSubmitBtn.addEventListener("click", () => {

    // 선택한 신고 사유 가져오기
    var reportReasonList = document.getElementsByName('reportRadio');
    var radioText = document.getElementsByClassName('radio-text');
    
    for(var i=0; i<reportReasonList.length; i++){
        
        if(reportReasonList[i].checked){
            //fixme: 왜,, 하나씩 밀리는 거지. 일단 임시방편으로 +1함.
            radioResult = radioText[i].innerText;
            console.log(radioResult);
        }
    }


        
    // 판매자 신고
    if(pathname == "seller") {
        reportType.value = "M";
        reportTargetNo.value = targetNo;
        report();
    }


    // 채팅방 회원 신고
    if(pathname == "chat") {
        reportType.value = "M";
        reportTargetNo.value = memberNo2;
        report();
    }


    // 판매 게시글 신고 (사고팔고)
    if(pathname == "post"){
        reportType.value = "P";
        reportTargetNo.value = targetNo;  //postNo
        report();
    }


    // 와글와글 게시글 신고 (카테고리 분류X)
    // if(pathname.contains('board') && !commentNo.contains("c")){
    if(pathname.includes('board')){
        reportType.value = "B";
        reportTargetNo.value = targetNo;  //boardNo
        report();
    }


    // 와글와글 게시글 - 회원 신고
    if(targetMemberNo != null){
        reportType.value = "M";
        reportTargetNo.value = targetMemberNo;
        report();
    } 





    // 댓글 신고 - 
    // if(pathname.includes("board") && commentNo.contains("c")){
    //     reportType.value = "C";
    //     reportTargetNo.value = commentNo;
    // }



    // 연습 test
    // if(pathname == 'testPage'){
    //     reportType.value = 'T';
    //     reportTargetNo.value = targetNo; //4
    // }
   

})


// optimize: 신고하기
var report = () => {
    $.ajax({
        url: "/report",
        data: { "reportType" :reportType.value, 
                "reportTargetNo" : reportTargetNo.value,
                "reportReason" : radioResult,
                "reportContent": modalReportContent.value},
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