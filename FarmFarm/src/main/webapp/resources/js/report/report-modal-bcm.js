
/*
- boardDetail, boardList, comment.jsp 

- 와글와글에서 

memberMoal.jsp
> 게시글 목록 - 회원신고 (boardList.jsp)
> 게시글 내부 - 회원신고
> targetMemberNo

boardDetail.jsp
> 게시글 신고

comment.jsp
> 댓글 신고
> targetCommentNo

'M' : reportTargetNo == 0   -> 관리자

*/



// todo: 댓글 신고 - 신고유형, 신고번호 매칭
// 관리자 댓글은 신고하기 버튼을 지움
// 본인 댓글 : 신고 버튼없음
const reportCommentBtn = document.getElementsByClassName('report-comment-btn');

// 댓글 신고하기 유형 3개
for(let i=0; i<reportCommentBtn.length; i++){

    // 댓글의 신고하기 버튼 누르면
    reportCommentBtn[i]. addEventListener("click", () => {

        // 신고 모달 열리기
        openReportModal();
        
        // 각 댓글의 댓글 번호
        const targetCommentNo = document.getElementsByClassName('targetCommentNo');
    
        // 신고유형, 신고번호 매칭
        if(targetCommentNo[i] != null){
            reportType = 'C';
            reportTargetNo = targetCommentNo[i].value;

        }
    })
}



//todo: memberModal로 댓글의 회원 신고  - 신고유형, 신고번호 매칭
// 관리자 댓글은 프로필 창이 안 열리게 함.
// 본인 프로필 신고 -> 알림, 신고x
document.getElementById('reportMemberBtn').addEventListener('click', () =>{

                                    // memberNo = "${loginMember.memberNo}";
                                    // 본인 계정 신고x
    if(targetMemberNo != null && targetMemberNo != memberNo){
        // 신고 모달 열리기
        openReportModal();
        reportType = 'M';
        reportTargetNo = targetMemberNo;
    }

    if(targetMemberNo == memberNo){
        messageModalOpen("본인의 계정은 신고할 수 없습니다.");
    }
})



// todo: 와글와글 게시글 신고  - 신고유형, 신고번호 매칭
// 관리자 게시글은 신고하기 버튼을 지움
// 본인 게시글 : 신고 버튼 없음
document.getElementById('reportBoardBtn').addEventListener('click', () => {

    if(boardNo != null){
        // 신고 모달 열리기
        openReportModal();
        reportType = 'B';
        reportTargetNo = boardNo;
    }
})















