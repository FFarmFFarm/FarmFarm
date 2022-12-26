
// optimize: 전체 회원 정보 조회 함수
function selectMemberList(){

    const table = document.getElementById("memberSelectTable");

    var i = 0;

    // tr.innerHTML = "";
    
    $.ajax({
        url: "/admin/selectMemberList",
        dataType: "JSON",
        type: "GET",
        success: (map) => {
            
            for(let member of map.memberAllList){

                const tr = document.createElement("tr");
                tr.classList.add("member-select-row");
                tr.id = memberSelectRow;

                
                // no
                const td1 = document.createElement("td");
                td1.classList.add("report-member-seq");

                i++;
                td1.innerText = td1.innerText+i;


                // 회원번호
                const td2 = document.createElement("td");
                td2.innerText = member.memberNo;

                // 아이디
                const td3 = document.createElement("td");
                td3.innerText = member.memberId;

                const inputMemberId = document.createElement("input");
                inputMemberId.value = member.memberId;
                inputMemberId.type = "hidden";

                // 닉네임
                const td4 = document.createElement("td");
                td4.innerText = member.memberNickname;

                // 주소
                const td5 = document.createElement("td");

                const temp = member.memberAddress;
                const address = temp.substring(temp.indexOf(",,")+2, temp.lastIndexOf(",,"));
                td5.innerText = address;

                // 가입일
                const td6 = document.createElement("td");
                td6.innerText = member.signUpDate;

                // 판매자 등록
                const td7 = document.createElement("td");

                if(member.authority != null){

                    if(member.authority == 0){
                        td7.innerText = "미등록";
                    }

                    if(member.authority == 1){
                        td7.innerText = "판매자"
                    }

                    if(member.authority == 3){
                        td7.innerText = "인증 대기"
                    }
                }


                // 상태
                const td8 = document.createElement("td");

                // if(member.reportPenalty != null & member.memberDelFl != null){
                if(member.memberDelFl != null){

                    if(member.reportPenalty == 'N' || member.reportPenalty == null){
                        td8.innerText = "활동중";
                    }

                    if(member.reportPenalty == 'N' && member.reportType != null){
                        td8.innerText = "신고접수";
                    }

                    if(member.reportPenalty == 'Y'){
                        td8.innerText = "정지";
                    }

                    if(member.memberDelFl == 'Y'){
                        td8.innerText = "탈퇴"
                    }
                }


                // 조립
                tr.append(td1, td2, td3, inputMemberId, td4, td5, td6, td7, td8);

                table.append(tr);
            }
        }, 
        error: () => {
            console.log("전체 회원 정보 조회 실패");
        }
    });
}



// HTML 문서가 모두 읽어진 후에!!!
// 바로 selectMemberList() 호출
// 반대로하면 읽지 못함.
// todo: 전체 회원정보 조회
document.addEventListener("DOMContentLoaded", () => {
    selectMemberList();
});



// todo: 회원 상세 정보

const memberSelectRow = document.getElementById("memberSelectRow");

memberSelectRow.addEventListener("click", () => {

    //fix: controlloer에서 int null값 처리 어떻게?
    const memberNo = document.getElementById("detailMemberNo");

    const inputMemberId = document.getElementById("inputMemberId")

    $.ajax({
        url: "/selectMemberList",
        dataType: "JSON",
        date: {memberId : inputMemberId.value},
        type: "GET",
        success: (map) => {

            const member = map.memberDetail;

            // optimize: 회원 상세 조회
            // 프로필 이미지
            const memberImg = document.getElementById("detailMemberImg");
            const tdImg = document.createElement("img");

            if(member.profileImg != null) {
                tdImg.setAttribute("src", map.memberDetail.profileImg);
            } else {
                tdImg.setAttribute("src", "/resources/images/member/profile/profile.png");
            }


            //회원번호
            const memberNo = document.getElementById("detailMemberNo");
            const tdNo = document.createElement("td");
            tdNo.style.width = "120px";
            tdNo.innerText = member.memberNo;

            // 연락처
            const memberTel = document.getElementById("detailMemberTel");
            const tdTel = document.createElement("td");
            tdTel.style.width = "175px";
            tdTel.innerText = member.memberTel;

            // 아이디
            const memberId = document.getElementById("detailMemberId");
            const tdId = document.createElement("td");
            tdId.innerText = member.memberId;

            // 생년월일
            const memberBirth = document.getElementById("detailMemberBirth");
            const tdBirth = document.createElement("td");
            tdBirth.innerText = member.memberBirth;

            // 성명
            const memberName = document.getElementById("detailMemberName");
            const tdName = document.createElement("td");
            tdName.innerText = member.memberName;

            // 판매자 인증
            const sellerAuth = document.getElementById("detailSellerAuth");
            const tdAuth = document.createElement("td");

            if(member.authority != null){

                if(member.authority == 0){
                    tdAuth.innerText = "미등록";
                }

                if(member.authority == 1){
                    tdAuth.innerText = "판매자";
                }

                if(member.authority == 3){
                    tdAuth.innerText = "인증 대기";
                }
            }


            // 닉네임
            const memberNickname = document.getElementById("detailMemberNickname");
            const tdNickname = document.createElement("td");
            tdNickname.innerText = member.memberNickname;


            // 상태
            const memberStatus = document.getElementById("detailMemberStatus");
            const tdStatus = document.createElement("td");

            // if(member.reportPenalty != null & member.memberDelFl != null){
            if(member.memberDelFl != null){

                if(member.reportPenalty == 'N' || member.reportPenalty == null){
                    tdStatus.innerText = "활동중";
                }

                if(member.reportPenalty == 'N' && member.reportType != null){
                    tdStatus.innerText = "신고접수";
                }

                if(member.reportPenalty == 'Y'){
                    tdStatus.innerText = "정지";
                }

                if(member.memberDelFl == 'Y'){
                    tdStatus.innerText = "탈퇴"
                }
            }


            // 가입일
            const signUpDate = document.getElementById("detailSignUpDate");
            const tdDate = document.createElement("td");
            tdDate.innerText = member.signUpDate;

            // 신고 사유
            const reason = document.getElementById("detailReportReason");
            const tdReason = document.createElement("td");

            if(member.reportReason != null){
                tdReason.innerText = member.reportReason;
            } else {
                tdReason.innerText = "";
            }


            // 주소
            const address = document.getElementById("detailMemberAddress");
            const tdAddress = document.createElement("td");

            const temp = member.memberAddress;
            const add = temp.substring(temp.indexOf(",,")+2, temp.lastIndexOf(",,"));
            tdAddress.innerText = add;

            // 조립
            memberImg.nextSibling(tdImg);
            memberNo.nextSibling(tdNo);
            memberTel.nextSibling(tdTel);
            memberId.nextSibling(tdId);
            memberBirth.nextSibling(tdBirth);
            memberName.nextSibling(tdName);
            sellerAuth.nextSibling(tdAuth);
            memberNickname.nextSibling("tdNickname");
            memberStatus.nextSibling("tdStatus");
            signUpDate.nextSibling("tdDate");
            reason.nextSibling("tdReason");
            address.nextSibling("tdAddress");


            // optimize: 계정 상태
            const tr1 = document.getElementById("row1");

            const td1 = document.createElement("td");
            td1.innerText = member.signUpDate;

            const td2 = document.createElement("td");
            td2.innerText = "가입";

            const td3 = document.createElement("td");
            td3.innerText = "";
            
            
            const tr2 = document.getElementById("row2");

            // 신고 처리 일자
            const td4 = document.createElement("td");
            if(member.processDate != null){
                td4.innerText = member.processDate;
            } else {
                td4.innerText = "";
            }

            // 정지 여부
            const td5 = document.createElement("td");
            if(member.memberDelFl == 'N'){
                if(member.reportPenalty == 'Y'){
                    td5.innerText = "정지";
                } else {
                    td5.innerText = "";
                }
            }

            // 정지 사유
            const td6 = document.createElement("td");
            if(member.memberDelFl == 'N'){
                if(member.reportPenalty == 'Y'){
                    td6.innerText = member.reportReason;
                } else {
                    td6.innerText = "";
                }
            }



            const tr3 = document.getElementById("row3");    

            const td7 = document.createElement("td");
            if(member.memberDelFl == 'Y'){
                if(member.reportPenalty == 'Y'){
                    td7.innerText = member.processDate;
                }
            }

            const td8 = document.createElement("td");
            if(member.memberDelFl == 'Y'){
                if(member.reportPenalty == 'Y'){
                    td8.innerText = "강제 탈퇴 처리";
                }
            }


            const td9 = document.createElement("td");
            if(member.memberDelFl == 'Y'){
                if(member.reportPenalty == 'Y'){
                    td9.innerText = member.reportReason;
                }
            } 


            // 조립
            tr1.append(td1, td2, td3);
            tr2.append(td4, td5, td6);
            tr3.append(td7, td8, td9);

        },

        error: () => {
            console.log("회원상세정보 조회 오류");
        }
    });





})

