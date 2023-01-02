
const reportContainer = document.getElementById("reportContainer");
const reportBtn = document.getElementById("reportBtn");

reportContainer.style.display = 'none';

reportBtn.addEventListener('click', () => {
    reportContainer.style.display = 'flex';
    // console.log(targetNo);
    // console.log(pathname);
})



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
const pathname = location.pathname.substring(1, location.pathname.lastIndexOf("/"));

//boardNo(와글와글), postNo(판매글), reviewNo의 번호  -> lastIndexOf("/")로 자름
// seller에서 memberNo(판매자)
//location.pathname.substring(location.pathname.lastIndexOf("/")+1)
const targetNo = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

const reportType = document.getElementById("reportType");
const reportTargetNo = document.getElementById("reportTargetNo");



// 신고하기 ajax
const reportSubmitBtn = document.getElementById("reportSubmitBtn");

reportSubmitBtn.addEventListener("click", () => {

    // 회원 신고
    if(pathname == "seller") {
        reportType.value = "S";
        reportTargetNo.value = targetNo;
    }


    // 채팅방 회원 신고
    if(pathname == "chat") {
        reportType.value = "M";
        reportTargetNo.value = memberNo2;
    }


    // 판매 게시글 신고 (사고팔고)
    if(pathname == "post"){
        reportType.value = "P";
        reportTargetNo.value = targetNo;  //postNo
    }


    // 와글와글 게시글 신고 (카테고리 분류X)
    if(pathname.contains("board") && !commentNo.contains("c")){
        reportType.value = "B";
        reportTargetNo.value = targetNo;  //boardNo
    }


    // // 와글와글 게시글 신고 - 물물교환
    // if(pathname.contains("board/1") && !commentNo.contains("c")){
    //     reportType.value = "B1";
    //     reportTargetNo.value = targetNo;  //boardNo
    // }

    // // 와글와글 게시글 신고 - 팁
    // if(pathname.contains("board/2") && !commentNo.contains("c")){
    //     reportType.value = "B2";
    //     reportTargetNo.value = targetNo;  //boardNo
    // }

    // // 와글와글 게시글 신고 - 질문
    // if(pathname.contains("board/3") && !commentNo.contains("c")){
    //     reportType.value = "B3";
    //     reportTargetNo.value = targetNo;  //boardNo
    // }


    // 댓글 신고 - 
    if(pathname.contains("board") && commentNo.contains("c")){
        reportType.value = "C";
        reportTargetNo.value = commentNo;
    }



    // 연습 test
    if(pathname == 'testPage'){
        reportType.value = 'T';
        reportTargetNo.value = targetNo; //4
    }


    // 선택한 신고 사유 가져오기
    const reportReasonList = document.getElementsByName('reportRadio');
    var radioResult;
    
    const reportLabel = document.getElementsByTagName("label");
    const reportContent = document.getElementById("reportContent").value;
    
    for(var i=0; i<reportReasonList.length; i++){
        
        if(reportReasonList[i].checked){
            radioResult = reportLabel[i].innerText;
            console.log(radioResult);
        }
    }


    $.ajax({
        url: "/report",
        data: { "reportType" :reportType.value, 
                "reportTargetNo" : reportTargetNo.value,
                "reportReason" : radioResult,
                "reportContent": reportContent},
        type: "POST",
        success: (result) => {
            if(result > 0){
                console.log("신고 접수");
                report.style.display = 'none';
                alert("신고가 접수되었습니다.")
            
            } else {
                console.log("신고 실패");
            }
        },
        error: () => {
            console.log("신고 오류");
        }
    });

})

