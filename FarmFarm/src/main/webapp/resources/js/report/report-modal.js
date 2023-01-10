
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
    판매글 신고 :  /post/{postNo}
    와글와글 게시글 목록 프로필 신고 : targetMemberNo 사용 - 주소 사용x
    와글와글 게시글, 댓글, 게시글 내 프로필 신고 : boardDetail.jsp는 report-modal-bcm.js 사용

    2) 각 타입별로 reportType 정해주고, reportTargetNo 다르게 가져오기
*/

// * pathname: 각 기능 메인 주소
var pathname = location.pathname.substring(1, location.pathname.lastIndexOf("/"));

//boardNo(와글와글), postNo(판매글), reviewNo의 번호  -> lastIndexOf("/")로 자름
// seller에서 memberNo(판매자)
//location.pathname.substring(location.pathname.lastIndexOf("/")+1)
var targetNo = location.pathname.substring(location.pathname.lastIndexOf("/")+1);

var reportType;
var reportTargetNo;



// todo: 판매글, 판매자 신고
reportBtn.addEventListener("click", () => {

    // 판매자 신고
    // 본인 계정 : 신고버튼 없음.
    if(pathname == "seller") {
        if(reportTargetNo == 0){
            messageModalOpen("관리자는 신고 대상이 아닙니다.");
        } else {
            // 신고 모달 열리기
            openReportModal();
            reportType = "M";
            reportTargetNo = targetNo;
        }
    }


    // 채팅방 회원 신고
    // 상담사 신고기능 없음
    // 일반 채팅: 상대방 신고기능만 있음.
    if(pathname == "chat") {

        if(reportTargetNo == 0){
            messageModalOpen("관리자는 신고 대상이 아닙니다.");
        } else {
            // 신고 모달 열리기
            openReportModal();
            reportType = "M";
            reportTargetNo = selectedChatNo;
        }
    }


    // 판매 게시글 신고 (사고팔고)
    if(pathname == "post"){
        if(reportTargetNo == 0){
            messageModalOpen("관리자는 신고 대상이 아닙니다.");
        } else {
            // 신고 모달 열리기
            openReportModal();
            reportType = "P";
            reportTargetNo = targetNo;  //postNo
        }
    }
});


