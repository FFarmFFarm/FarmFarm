


//todo: memberModal로 게시글 목록 프로필 신고 - 신고유형, 신고번호 매칭
document.getElementById('reportMemberBtn').addEventListener('click', () =>{
    console.log("회원 신고 버튼 클릭");

    // 신고 모달 열리기
    openReportModal();

    if(targetMemberNo != null){
        reportType = 'M';
        reportTargetNo = targetMemberNo;
    }
})




