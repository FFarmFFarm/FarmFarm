
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

*/



// todo: 댓글 신고 - 신고유형, 신고번호 매칭
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



//todo: memberModal로 댓글 회원 신고  - 신고유형, 신고번호 매칭
document.getElementById('reportMemberBtn').addEventListener('click', () =>{

    // 신고 모달 열리기
    openReportModal();

    if(targetMemberNo != null){
        reportType = 'M';
        reportTargetNo = targetMemberNo;
    }
})



// todo: 와글와글 게시글 신고  - 신고유형, 신고번호 매칭
document.getElementById('reportBoardBtn').addEventListener('click', () => {

    // 신고 모달 열리기
    openReportModal();

    if(boardNo != null){
        reportType = 'B';
        reportTargetNo = boardNo;;
    }
})















