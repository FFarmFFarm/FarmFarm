
// optimize: 전체 회원 정보 조회 함수
function selectMemberList(){

    const middleBoard = document.getElementById("middleBoard");
    const table = document.getElementById("memberSelectTable");
    const detailTable = document.getElementsByClassName("member-detail-table")[0];
    const historyTable = document.getElementsByClassName("member-history-table")[0];


    var i = 0;

    // tr.innerHTML = "";
    
    $.ajax({
        url: "/admin/selectMemberList",
        dataType: "JSON",
        type: "GET",
        success: (memberAllList) => {

            for(let member of memberAllList){
                
                const tr = document.createElement("tr");
                tr.classList.add("member-select-row");
                tr.id = "memberSelectRow";

                const inputMemberId = document.createElement("input");
                inputMemberId.value = member.memberId;
                inputMemberId.className = "input-member-id";
                inputMemberId.type = "hidden";
                inputMemberId.name = "memberId";

                
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
                tr.append(td1, td2, td3, td4, td5, td6, td7, td8, inputMemberId);
                table.append(tr);

            // }


            //todo : 회원 상세 조회
            // 한 줄 클릭하면 상세창 뜨면서 정보 조회.
            tr.addEventListener("click", () => {

                middleBoard.style.display = "block";

                // 다시 클릭할 때 텍스트 비우기
                detailTable.innerText = "";
                historyTable.innerText = "";

                console.log("성공!");

                // const member = map.memberDetail;


                // optimize: 회원 상세 조회
                
                // 1)
                const detailTr1 = document.createElement("tr");
                
                // 프로필 이미지
                const memberImg = document.createElement("td");
                memberImg.classList.add("detail-profileImg");
                memberImg.id = "detailMemberImg";
                memberImg.rowSpan = "6";

                const tdImg = document.createElement("img");

                if(member.profileImg != null) {
                    tdImg.setAttribute("src", member.profileImg);
                } else {
                    tdImg.setAttribute("src", "/resources/images/myPage/profile/profileImg.png");
                }

                //회원번호
                const memberNo = document.createElement("td");
                memberNo.style.width = "90px";
                memberNo.classList.add("detail-bold");
                memberNo.innerText = "회원번호";

                const tdNo = document.createElement("td");
                tdNo.style.width = "120px";
                tdNo.innerText = member.memberNo;

                // 연락처
                const memberTel = document.createElement("td");
                memberTel.style.width = "90px";
                memberTel.classList.add("detail-bold");
                memberTel.innerText = "연락처";
                
                const tdTel = document.createElement("td");
                tdTel.style.width = "175px";
                tdTel.innerText = member.to;


                // 2)
                const detailTr2 = document.createElement("tr");

                // 아이디
                const memberId = document.createElement("td");
                memberId.classList.add("detail-bold");
                memberId.innerText = "아이디";

                const tdId = document.createElement("td");
                tdId.innerText = member.memberId;


                // 생년월일
                const memberBirth = document.createElement("td");
                memberBirth.classList.add("detail-bold");
                memberBirth.innerText = "생년월일";

                const tdBirth = document.createElement("td");
                tdBirth.innerText = member.memberBirth;


                // 3)
                const detailTr3 = document.createElement("tr");
                // 성명
                const memberName = document.createElement("td");
                memberName.classList.add("detail-bold");
                memberName.innerText = "성명";

                const tdName = document.createElement("td");
                tdName.innerText = member.memberName;

                // 판매자 인증
                const sellerAuth = document.createElement("td");
                sellerAuth.classList.add("detail-bold");
                sellerAuth.innerText = "판매자 인증";

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


                // 4)
                const detailTr4 = document.createElement("tr");
                
                // 닉네임
                const memberNickname = document.createElement("td");
                memberNickname.classList.add("detail-bold");
                memberNickname.innerText = "닉네임";

                const tdNickname = document.createElement("td");
                tdNickname.innerText = member.memberNickname;


                // 상태
                const memberStatus = document.createElement("td");
                memberStatus.classList.add("detail-bold");
                memberStatus.innerText = "상태";

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


                // 5)
                const detailTr5 = document.createElement("tr");

                // 가입일
                const signUpDate = document.createElement("td");
                signUpDate.classList.add("detail-bold");
                signUpDate.innerText = "가입일";

                const tdDate = document.createElement("td");
                tdDate.innerText = member.signUpDate;

                // 신고 사유
                const reason = document.createElement("td");
                reason.classList.add("detail-bold");

                if(tdStatus.innerText =="신고접수" || tdStatus.innerText == "정지" || tdStatus.innerText == "탈퇴"){
                    reason.innerText = "신고 사유";
                } else {
                    reason.innerText = "";
                }


                const tdReason = document.createElement("td");

                if(member.reportReason != null){
                    tdReason.innerText = member.reportReason;
                } else {
                    tdReason.innerText = "";
                }

                //6)
                const detailTr6 = document.createElement("tr");

                // 주소
                const address = document.createElement("td");
                address.classList.add("detail-bold");
                address.innerText = "주소";

                const tdAddress = document.createElement("td");
                tdAddress.colSpan = "3";

                const add = member.memberAddress.replaceAll(',,', ' ');
                tdAddress.innerText = add;


                // 조립
                memberImg.append(tdImg);
                detailTr1.append(memberImg, memberNo, tdNo, memberTel, tdTel);
                detailTr2.append(memberId, tdId, memberBirth, tdBirth);
                detailTr3.append(memberName, tdName, sellerAuth, tdAuth);
                detailTr4.append(memberNickname, tdNickname, memberStatus, tdStatus);
                detailTr5.append(signUpDate, tdDate, reason, tdReason);
                detailTr6.append(address, tdAddress);
                detailTable.append(detailTr1, detailTr2, detailTr3, detailTr4, detailTr5, detailTr6);




                // todo: 계정 상태
                // 1)
                const tr1 = document.createElement("tr");
                tr1.classList.add("member-history-row");

                const th1 = document.createElement("th");
                th1.style.width = "100px";
                th1.innerText = "일자";

                const th2 = document.createElement("th");
                th2.style.width = "130px";
                th2.innerText = "상태";

                const th3 = document.createElement("th");
                th3.style.width = "150px";
                th3.innerText = "사유";


                // 2) 가입
                const tr2 = document.createElement("tr");
                const td4 = document.createElement("td");
                td4.innerText = member.signUpDate;

                const td5 = document.createElement("td");
                td5.innerText = "가입";

                const td6 = document.createElement("td");
                td6.innerText = "";


                // 3) 신고 처리 내역
                // const trLoop = document.createElement("tr");
                // trLoop.className = 'trLoop';

                // const tdLoop1 = document.createElement("td");
                // tdLoop1.className = "tdLoop";

                // const tdLoop2 = document.createElement("td");
                // tdLoop2.className = "tdLoop";

                // const tdLoop3 = document.createElement("td");
                // tdLoop3.className = "tdLoop";
                

                // for(let i=0; i<10; i++){

                //     let tr = document.getElementsByClassName("trLoop")[i];
                //     let td1 = document.getElementsByClassName("tdLoop1")[i];
                //     let td2 = document.getElementsByClassName("tdLoop2")[i];
                //     let td3 = document.getElementsByClassName("tdLoop3")[i];

                //     console.log("반복");
                //     console.log(tr[0]);

                //     if(member.processDate != null){
                //         td1[i].innerText = member.processDate;
                //     } else {
                //         td1[i].innerText = "";
                //     }
    
                //     // 정지 여부
                //     if(member.memberDelFl == 'N'){
                //         if(member.reportPenalty == 'Y'){
                //             td2[i].innerText = "정지";
                //         } else {
                //             td2[i].innerText = "";
                //         }
                //     } 
    
                //     // 정지 사유
                //     if(member.memberDelFl == 'N'){
                //         if(member.reportPenalty == 'Y'){
                //             td3[i].innerText = member.reportReason;
                //         } else {
                //             td3[i].innerText = "";
                //         }
                //     }
                    
                //     tr[i].append(td1[i], td2[i], td3[i]);
                    
                //     tr1.after(tr[0]);
                //     tr[i].after(tr[i+1]);
                    
                    
                // }


                // 조립
                tr1.append(th1, th2, th3);
                tr2.append(td4, td5, td6);
                // tr3.append(td7, td8, td9);

                historyTable.append(tr1, tr2)

            })
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




//review: pagination---------------------

