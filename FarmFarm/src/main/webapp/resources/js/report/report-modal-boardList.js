


//todo: memberModal로 게시글 목록 프로필 신고 - 신고유형, 신고번호 매칭
// 관리자 프로필 안 뜨게 함
// 본인 프로필 -> 알림, 신고x
document.getElementById('reportMemberBtn').addEventListener('click', () =>{
    console.log("회원 신고 버튼 클릭");

    // memberNo = "${loginMember.memberNo}"

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




