
const report = document.getElementById("reportContainer");
const reportBtn = document.getElementById("reportBtn");

report.style.display = 'none';

reportBtn.addEventListener('click', () => {
    report.style.display = 'flex';
})



// 모달창 바깥 클릭 시 모달창 꺼짐
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


//todo : 신고하기
/*
    1) 주소창 주소에 따라서 reportType을 다르게.  -> pathname

    회원 신고 : /member /chat /myPage /seller
    후기 신고 : /review  /post
    게시글 신고 : /board  /post
    댓글 신고 : /board


    2) 각 타입별로 reportType 정해주고, reportTargetNo 다르게 가져오기

    3) 후기, 댓글은 번호 앞에 r, c 붙이는 방향으로..

*/


const pathname = location.pathname.substring(1, location.pathname.lastIndexOf("/"));
const reportType = document.getElementById("reportType");
const reportTargetNo = document.getElementById("reportTargetNo");

const reportReasonList = document.getElementsByName("report");
const reportReason = document.getElementById("reportReason");
const reportContent = document.getElementById("reportContent");


// 신고하기 ajax
const reportSubmitBtn = document.getElementById("reportSubmitBtn");

reportSubmitBtn.addEventListener("click", () => {

    // 회원 신고
    if(pathname == "member" 
    || pathname == "myPage"
    || pathname == "seller") {

    reportType.value = "M";
    reportTargetNo.value = memberNo;
    }


    // 채팅방 회원 신고
    if(pathname == "chat") {
    reportType.value = "M";
    reportTargetNo.value = memberNo2;
    }


    // 후기 신고
    if((pathname == "review" || pathname == "post") && reviewNo.contains("r")){
    reportType.value = "R";
    reportTargetNo.value = reviewNo;
    }


    // 판매 게시글 신고
    if(pathname == "post" && !reviewNo.contains("r")){
        reportType.value = "B";
        reportTargetNo.value = postNo;
    }


    // 와글와글 게시글 신고
    if(pathname == "board" && !commentNo.contains("c")){
        reportType.value = "B";
        reportTargetNo.value = boardNo;
    }

    // 댓글 신고
    if(pathname == "board" && commentNo.contains("c")){
        reportType.value = "C";
        reportTargetNo.value = commentNo;
    }



    // 연습 product
    if(pathname == "product" && !reviewNo.contains("r")){
        reportType.value = "B";
        reportTargetNo.value = productNo;
    }



    // 선택한 신고 사유 가져오기
    reportReasonList.forEach((reason) => {

        if(reason.checked) {
            reportReason = reason.value;
        }
    })
    

    $.ajax({
        url: "/report",
        data: { "reportType" :reportType.value, 
                "reportTargetNo" : reportTargetNo.value,
                "reportReason" : reportReason,
                "reportContent": reportContent.innerHTML},
        type: "GET",
        dataType: "JSON",
        success: (result) => {
            if(result > 0){
                alert("신고가 접수되었습니다.");
            
            } else {
                console.log("신고 실패");
            }
        },
        error: () => {
            console.log("신고 오류");
        }
    });
})





