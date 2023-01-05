/*

전체 회원 정보 조회 (ajax) : selectMemberList(cp)
상세 정보 조회 함수(ajax) : printMemberDetail(memberList, pagination)
전체 회원 정보 조회 함수: printMemberList(adminPagination, pagination)  -- ajax에 사용
페이지네이션 박스 생성 : printPagination(element,cp)

*/


var numCount = 0;     // numCount : 게시판 번호 no
var hiddenNo = 0;     // 상세 조회, 강제탈퇴 ajax에 사용
var keyword;
var memberSelectTable = document.getElementById("memberSelectTable");


// optimize : 전체 회원 정보 조회 함수
// cp를 받아 게시글 목록 조회
const selectMemberList = (cp) => {
    $.ajax({
        url: "/admin/selectMemberList",
        data: {"cp":cp, "authFilter": authFilter, "statFilter":statFilter, "keyword": keyword},
        dataType: "JSON",
        type: "GET",
        success: (map) => {

            //fixme: 검색 결과가 없습니다.
            // if(map.memberListCount == 0){
            //     searchNoResult();
            // } else {
            // }
            
            printMemberList(map.memberList, map.pagination);
            

        }, 
            error: () => {
            console.log("cp 받아 회원 정보 조회 실패");
        }
    });
}


//optimize: 상세 회원 정보 조회 함수
const selectMemberDetail = (hiddenNo) => {
    $.ajax({
        url: "/admin/selectMemberDetail",
        data: {"hiddenNo" : hiddenNo},
        dataType: "JSON",
        type: "GET",
        success: (map) => { 
            printMemberDetail(map.memberDetailInfo, map.memberHistoryList);
        },
        error: () => {
            console.log("회원 상세 정보 조회 실패");
        }
    })
}






// // cp를 받아 게시글 목록 조회
// const selectMemberListFiltering = () => {
//     $.ajax({
//         url: "/admin/selectMemberList",
//         data: {"cp":cp, "authFilter": authFilter, "statFilter":statFilter},
//         dataType: "JSON",
//         type: "GET",
//         success: (map) => {
//             printMemberList(map.memberList, map.pagination);
//         }, 
//             error: () => {
//             console.log("필터링하여 회원 정보 조회 실패");
//         }
//     });
// }
                



// optimize 조회해온 회원 목록을 화면에 출력하는 함수
const printMemberList = (memberList, pagination) => {

    console.log("회원 전체 조회");

    window.scrollTo({top: 0, behavior: 'smooth'});

    // 이 위치 사수하기
    const tbody = document.getElementById('tbody');
    tbody.innerText = "";   
    document.getElementById("adminPaginationArea").innerText = "";

    const adminPaginationArea = document.getElementById("adminPaginationArea");


    // 페이지네이션 박스
    const adminPagination = document.createElement('ul');
    adminPagination.classList.add('admin-pagination');

    adminPaginationArea.append(adminPagination);

    printPagination(adminPagination, pagination);

    
    // todo: 전체 조회 
    for(let member of memberList){

        /*아이디 10자
        닉네임 10자
        주소 25자*/ 

                
        const tr = document.createElement("tr");
        tr.classList.add("member-select-row");
        tr.id = "memberSelectRow";

        
        // no
        const td1 = document.createElement("td");
        td1.classList.add("member-seq");

        numCount++;
        td1.innerText = numCount;


        // 회원번호
        const td2 = document.createElement("td");
        td2.innerText = member.memberNo;

        // 아이디
        const td3 = document.createElement("td");
        
        if(member.memberId.length > 9){
            td3.innerText = member.memberId.substring(0, 9) + '...'; 
        } else {
            td3.innerText = member.memberId;
        }


        // 닉네임
        const td4 = document.createElement("td");

        if(member.memberNickname.length > 9){
            td4.innerText = member.memberNickname.substring(0, 9) + '...';
        } else {
            td4.innerText = member.memberNickname;
        }




        // 주소
        const td5 = document.createElement("td");

        if(member.memberAddress != null){
            if(member.memberAddress.length > 24){
                td5.innerText = member.memberAddress.substring(0, 24) + '...';
            } else {
                td5.innerText = member.memberAddress;
            }
        } else {
            td5.innerText = "-";
        }



        // const temp = member.memberAddress;
        
        // if(temp != null){
        //     const address = temp.substring(temp.indexOf(",,")+2, temp.lastIndexOf(",,"));
        //     td5.innerText = address;
        // } else {
        //     td5.innerText = "-";
        // }

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
                td7.innerText = "판매자";
            }

            if(member.authority == 3){
                td7.innerText = "인증 대기";
            }

            if(member.authority == 4){
                td7.innerText = "인증 보류";
            }
        }


        // 상태
        const td8 = document.createElement("td");

        if(member.memberDelFl == 'N'){  //report테이블에 들어간 순간부터 신고가 접수된 것.
            
            if(member.reportType == null){
                td8.innerText = "활동중";
            }
            
            if(member.reportType != null){
                if(member.reportPenalty == null){
                    td8.innerText = "신고접수";
                }
    
                if(member.reportPenalty == 'N' || member.reportPenalty == 'A'){
                    td8.innerText = "활동중";
                }
    
                if(member.reportPenalty == 'Y'){
                    td8.innerText = "정지";
                }
    
                if(member.memberDelFl == 'Y'){
                    td8.innerText = "탈퇴"
                }
            }
        }


        if(member.memberDelFl == 'Y'){
            td8.innerText = "탈퇴";
        }


        // 조립
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
        tbody.append(tr);


        
        //todo : 회원 상세 조회
        // 한 줄 클릭하면 상세창 뜨면서 정보 조회.
        tr.addEventListener("click", () => {
        
            // fix: ? ajax 쓸때는 이렇게
            hiddenNo = member.memberNo;
            console.log(hiddenNo);
            selectMemberDetail(hiddenNo);
        })
    }
}


// todo: 상세 조회
const printMemberDetail = (memberDetailInfo, memberHistoryList) => { 

    console.log("상세조회 만드는 함수..");
    
    const middleBoard = document.getElementById("middleBoard");
    const detailTable = document.getElementById("detailTable");
    const historyTable = document.getElementById("historyTable");


    // 화면 보이게
    middleBoard.style.display = "block";

    // 스크롤
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

    // 다시 클릭할 때 텍스트 비우기
    detailTable.innerText = "";
    historyTable.innerText = "";

    
    // * 회원 상세 정보
        
    // 1)
    const detailTr1 = document.createElement("tr");
    
    // 프로필 이미지
    const memberImg = document.createElement("td");
    memberImg.classList.add("detail-profileImg");
    memberImg.id = "detailMemberImg";
    memberImg.rowSpan = "6";

    const tdImg = document.createElement("img");

    if(memberDetailInfo.profileImg != null) {
        tdImg.setAttribute("src", memberDetailInfo.profileImg);
    } else {
        tdImg.setAttribute("src", "/resources/images/default/profileImg.png");
    }

    //회원번호
    const memberNo = document.createElement("td");
    memberNo.style.width = "90px";
    memberNo.classList.add("detail-bold");
    memberNo.innerText = "회원번호";

    const tdNo = document.createElement("td");
    tdNo.style.width = "120px";
    tdNo.innerText = memberDetailInfo.memberNo;

    // 연락처
    const memberTel = document.createElement("td");
    memberTel.style.width = "90px";
    memberTel.classList.add("detail-bold");
    memberTel.innerText = "연락처";
    
    const tdTel = document.createElement("td");
    tdTel.style.width = "175px";
    tdTel.innerText = memberDetailInfo.to;


    // 2)
    const detailTr2 = document.createElement("tr");

    // 아이디
    const memberId = document.createElement("td");
    memberId.classList.add("detail-bold");
    memberId.innerText = "아이디";

    const tdId = document.createElement("td");
    tdId.innerText = memberDetailInfo.memberId;


    // *아이디 가져오기
    //hiddenNo 강제 탈퇴할 때 사용함.
    // 상세 조회 시 값 전달할 때 필요 
    // fix ? ajax 쓸때는 이렇게?
    hiddenNo = memberDetailInfo.memberNo;

    // 생년월일
    const memberBirth = document.createElement("td");
    memberBirth.classList.add("detail-bold");
    memberBirth.innerText = "생년월일";

    const tdBirth = document.createElement("td");
    tdBirth.innerText = memberDetailInfo.memberBirth;


    // 3)
    const detailTr3 = document.createElement("tr");
    // 성명
    const memberName = document.createElement("td");
    memberName.classList.add("detail-bold");
    memberName.innerText = "성명";

    const tdName = document.createElement("td");
    tdName.innerText = memberDetailInfo.memberName;

    // 판매자 인증
    const sellerAuth = document.createElement("td");
    sellerAuth.classList.add("detail-bold");
    sellerAuth.innerText = "판매자 인증";

    const tdAuth = document.createElement("td");

    if(memberDetailInfo.authority != null){

        if(memberDetailInfo.authority == 0){
            tdAuth.innerText = "미등록";
        }

        if(memberDetailInfo.authority == 1){
            tdAuth.innerText = "판매자";
        }

        if(memberDetailInfo.authority == 3){
            tdAuth.innerText = "인증 대기";
        }

        if(memberDetailInfo.authority == 4){
            tdAuth.innerText = "인증 보류";
        }
    }


    // 4)
    const detailTr4 = document.createElement("tr");
    
    // 닉네임
    const memberNickname = document.createElement("td");
    memberNickname.classList.add("detail-bold");
    memberNickname.innerText = "닉네임";

    const tdNickname = document.createElement("td");
    tdNickname.innerText = memberDetailInfo.memberNickname;


    // 상태
    const memberStatus = document.createElement("td");
    memberStatus.classList.add("detail-bold");
    memberStatus.innerText = "상태";

    const tdStatus = document.createElement("td");

    if(memberDetailInfo.memberDelFl == 'N'){
        if(memberDetailInfo.reportType == null){
            tdStatus.innerText = "활동중";
        }

        if(memberDetailInfo.reportType != null){
            if(memberDetailInfo.reportPenalty == null){
                tdStatus.innerText = "신고접수";
            }

            if(memberDetailInfo.reportPenalty == 'N' && memberDetailInfo.reportPenalty == 'A'){
                tdStatus.innerText = "활동중";
            }

            if(memberDetailInfo.reportPenalty == 'Y'){
                tdStatus.innerText = "정지";
            }
        }
    } 

    if(memberDetailInfo.memberDelFl == 'Y'){
        tdStatus.innerText = "탈퇴";
    }
    



    // 5)
    const detailTr5 = document.createElement("tr");

    // 가입일
    const signUpDate = document.createElement("td");
    signUpDate.classList.add("detail-bold");
    signUpDate.innerText = "가입일";

    const tdDate = document.createElement("td");
    tdDate.innerText = memberDetailInfo.signUpDate;


    //6)
    const detailTr6 = document.createElement("tr");

    // 주소
    const address = document.createElement("td");
    address.classList.add("detail-bold");
    address.innerText = "주소";

    const tdAddress = document.createElement("td");
    tdAddress.colSpan = "2";

    const add = memberDetailInfo.memberAddress;
    tdAddress.innerText = add;


    // 조립
    memberImg.append(tdImg);
    detailTr1.append(memberImg, memberNo, tdNo, memberTel, tdTel);
    detailTr2.append(memberId, tdId, memberBirth, tdBirth);
    detailTr3.append(memberName, tdName, sellerAuth, tdAuth);
    detailTr4.append(memberNickname, tdNickname, memberStatus, tdStatus);
    detailTr5.append(signUpDate, tdDate);
    detailTr6.append(address, tdAddress);
    detailTable.append(detailTr1, detailTr2, detailTr3, detailTr4, detailTr5, detailTr6);

    

    // todo: 계정 상태
    // 1) 타이틀
    const theadHistory = document.createElement("thead");
    
    const tr1 = document.createElement("tr");
    tr1.classList.add("member-history-row");

    const th1 = document.createElement("th");
    th1.style.width = "160px";
    th1.innerText = "일자";

    const th2 = document.createElement("th");
    th2.style.width = "130px";
    th2.innerText = "상태";

    const th3 = document.createElement("th");
    th3.style.width = "150px";
    th3.innerText = "비고";

    
    // 2) 가입
    var td4;

    const tr2 = document.createElement("tr");
    tr2.classList.add("row2");

    for(let history of memberHistoryList){
        td4 = document.createElement("td");
        td4.innerText = history.signUpDate;
    }

    const td5 = document.createElement("td");
    td5.innerText = "가입";

    const td6 = document.createElement("td");
    // td6.innerText = "";
    

    // * 반복문 시작
    const tbodyHistory = document.createElement("tbody");
    
    for(let history of memberHistoryList){
        // 3) 신고 처리 내역

        // 강제 탈퇴 버튼
        const adminDelBtn = document.getElementById('adminDelBtn');

        const trReport = document.createElement("tr");
        const tdReportDate = document.createElement("td");
        const tdReport = document.createElement("td");
        const tdReportReason = document.createElement("td");

        if(history.memberDelFl == 'N'){
            if(history.reportPenalty == 'Y'){
                tdReportDate.innerText = history.processDate;
                tdReport.innerText = "정지";
                tdReportReason.innerText = history.reportReason;
            }

            // 강제 탈퇴 버튼 활성화
            adminDelBtn.style.backgroundColor = '#C43819';
            adminDelBtn.style.cursor = 'pointer';
            adminDelBtn.disabled = false; 
        }

        if(history.memberDelFl == 'Y'){
            td6.innerText = "회원 탈퇴";
     
            if(history.reportPenalty == 'Y'){
                tdReportDate.innerText = history.processDate;
                tdReport.innerText = "강제 탈퇴";
                tdReportReason.innerText = history.reportReason;
            }

            // 가입일자, 가입 상태에 취소선 긋기
            td4.style.textDecoration = 'line-through';
            td5.style.textDecoration = 'line-through';

            // 강제 탈퇴 버튼 비활성화
            adminDelBtn.style.backgroundColor = 'lightgray';
            adminDelBtn.style.cursor = 'default';
            adminDelBtn.disabled = true;
        }

        if(history.processDate != null){
            tdReportReason.innerText = history.reportReason;
        } else {
            tdReportReason.innerText = "";
        }
            
        
        //조립
        
        tr1.append(th1, th2, th3);
        tr2.append(td4, td5, td6);
        trReport.append(tdReportDate, tdReport, tdReportReason);
        tbodyHistory.append(trReport);
        
    }   
    theadHistory.append(tr1);
    historyTable.append(theadHistory, tr2, tbodyHistory);
}







//-----------------------------------------------

/* 페이지 박스를 만드는 함수 */
const makePageBox = (elementName, inputHtml, inputId, className) => {
    elementName.innerHTML = inputHtml;
    elementName.id = inputId;
    elementName.classList.add(className);
}


// optimize: 페이지네이션 박스 화면에 출력
const printPagination = (adminPagination, pagination) => {

    // 이전 페이지
    const firstPage = document.createElement('li');
    const prevPage = document.createElement('li');

    makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
    makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');

    adminPagination.append(firstPage, prevPage);

    // 번호 페이지 제작
    for(let i=pagination.startPage; i <= pagination.endPage; i++){

        const numPage = document.createElement('li');

        if(i == pagination.currentPage){
            makePageBox(numPage, i, i, 'current-page-box');
        } else {
            makePageBox(numPage, i, i, 'page-box');
        }

        adminPagination.append(numPage);

        selectMemberListEvent(numPage, i);
    }


    // 이후 페이지 제작
    const nextPage = document.createElement('li');
    const maxPage = document.createElement('li');
    makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
    makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

    adminPagination.append(nextPage, maxPage);

    selectMemberListEvent(firstPage, 1);
    selectMemberListEvent(prevPage, pagination.prevPage);
    selectMemberListEvent(nextPage, pagination.nextPage);
    selectMemberListEvent(maxPage, pagination.maxPage);
}



//todo: 필터 드롭다운 메뉴
//fix: 페이지네이션 이후에 수정하기! 드롭다운 메뉴 동시에 열림..
const dropBtn1 = document.getElementById("dropBtn1");
const dropBtn2 = document.getElementById("dropBtn2");
const dropMenu1 = document.getElementById("dropMenu1");
const dropMenu2 = document.getElementById("dropMenu2");

dropBtn1.addEventListener("click", () => {
    dropMenu1.classList.toggle("toggle");
})

dropBtn2.addEventListener("click", () => {
    dropMenu2.classList.toggle("toggle");
})

const dropUl1 = document.getElementById("dropUl1");
const dropUl2 = document.getElementById("dropUl2");

dropUl1.addEventListener("click", () => {
    dropMenu1.classList.toggle("toggle");
})

dropUl2.addEventListener("click", () => {
    dropMenu2.classList.toggle("toggle");
})







// HTML 문서가 모두 읽어진 후에!!!
// 바로 selectMemberList() 호출
// 반대로하면 읽지 못함.

// 첫 페이지 불러오기  (전체회원정보)
// document.addEventListener("DOMContentLoaded", () => {
//     selectMemberList();
// });


// -- jsp
// 첫 페이지에서 다른 페이지로 이동하기 위해, cp값 부여!
// optimize: 페이지박스 각각에 cp 값 추가 + 전체 회원 조회
// 없으면 cp 값이 적용이 안 되어서 이동이 안됨. 
const pageBox = document.getElementsByClassName('page-box');
for(let page of pageBox){
    page.addEventListener('click', () => { 
        let cp = page.id;
        selectMemberList(cp);
    })
}


// -- ajax
// 2페이지 이후, ajax로 조회할 때 다른 페이지로 이동하기 위해! -> printPagination() 에서 사용
//optimize: 페이지네이션 박스 클릭하면, 전체 회원 조회  
// 없으면 다음 페이지로 이동은 가능하나, 목록 조회가 되지 않음.
const selectMemberListEvent = (element, cp) => {
    element.addEventListener('click', () => {
        numCount = (cp-1)*15;  // 전체조회화면 no 변경
        selectMemberList(cp);
    });
}





//todo: 한 줄 클릭할 때, 회원 상세 정보 불러오는 함수 호출
const memberSelectRow = document.getElementsByClassName("member-select-row");
// var hiddenMemberId = document.getElementsByClassName('hidden-memberId');
var hiddenMemberNo = document.getElementsByClassName('hidden-memberNo');

for(let i=0; i<memberSelectRow.length; i++){
    memberSelectRow[i].addEventListener('click', () => {
        hiddenNo = hiddenMemberNo[i].value;
        selectMemberDetail(hiddenNo);
    })
}




//todo: 필터 옵션 별로 조회 + pagination
//todo: 필터링하여 조회 (판매자인증 authFilter / 상태 statFilter)
const authFiltering = document.getElementsByClassName("authFilter");
const statFiltering = document.getElementsByClassName("statFilter");


// id에서 앞자리 잘라주기 a1 -> 1
// authFilter, statFilter에 넣어서 controller에 보내주기 위해.
const getFilterNum = (string) => {
    return string.substring(1);
}


// 판매자인증 필터 authFilter  ..  반복문 실패...
// 0 전체, 1 미등록, 2 판매자, 3 인증대기
// for(auth of authFiltering){
//     auth.addEventListener("click", ()=>{
//         console.log(auth);
//         let authFl = getFilterNum(auth.id);
//         authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
//         selectMemberList();
//         console.log(authFilter);
//     })
// }
const dropBtn1Text = document.getElementById("dropBtn1Text");
const dropBtn2Text = document.getElementById("dropBtn2Text")

document.getElementById("a0").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let authFl = getFilterNum("a0");
    authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn1Text.innerText = "판매자 등록";
})

document.getElementById("a1").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let authFl = getFilterNum("a1");
    authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn1Text.innerText = "미등록";
})

document.getElementById("a2").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let authFl = getFilterNum("a2");
    authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn1Text.innerText = "판매자";
})

document.getElementById("a3").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let authFl = getFilterNum("a3");
    authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn1Text.innerText = "인증 대기";
})
document.getElementById("a4").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let authFl = getFilterNum("a4");
    authFilter = authFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn1Text.innerText = "인증 보류";
})





// 상태 필터 ststFilter
// 0 전체, 1 활동중, 2 신고 접수, 3 정지, 4 탈퇴
// for(stat of statFiltering){
//     stat.addEventListener("click", () => {
//         let statFl = getFilterNum(stat.id);
//         statFilter = statFl;
//         selectMemberList();
//     })
// }


document.getElementById("s0").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let statFl = getFilterNum("s0");
    statFilter = statFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn2Text.innerText = "상태";
})
document.getElementById("s1").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let statFl = getFilterNum("s1");
    statFilter = statFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn2Text.innerText = "활동중";
})
document.getElementById("s2").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let statFl = getFilterNum("s2");
    statFilter = statFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn2Text.innerText = "신고접수";
})
document.getElementById("s3").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let statFl = getFilterNum("s3");
    statFilter = statFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn2Text.innerText = "정지";
})
document.getElementById("s4").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    let statFl = getFilterNum("s4");
    statFilter = statFl;  // authFilter : jsp에서 전역변수로 선언함.
    selectMemberList();
    dropBtn2Text.innerText = "탈퇴";
})






// todo: 강제 탈퇴 시키기 (by 관리자)
//fixme: 안 비워줘서 바로바로 적용이 안되는 것 같다..
// 강제 탈퇴 버튼 클릭 시 모달 열리기
const adminDelBtn = document.getElementById("adminDelBtn");

// 회원 상세 정보에서 강제 탈퇴 버튼 누를 경우
adminDelBtn.addEventListener('click', () => {
    adminModalOpen();  //adminModal.js에 공통적인 부분 만들어놓음!
})


// 모달에서 강제 탈퇴 제출 버튼 클릭 시
document.getElementById("adminDelSubmitBtn").addEventListener('click', ()=>{

    $.ajax({
        url: "/admin/kickout",
        data: { "hiddenNo": hiddenNo},
        type: "POST",
        success: (result) => {
            if(result > 0){
                adminModalClose();

                selectMemberList(cp);
                selectMemberDetail(hiddenNo);
                
                console.log("강제 탈퇴 완료");
                messageModalOpen("강제 탈퇴 되었습니다.");

                //fixme: 시간 남을 때 모달이랑, 스크롤 위치 수정

            
            } else {
                console.log("강퇴 처리 실패");
            }
        },
        error: () => {
            console.log("강퇴 처리 오류");
        }
    });
});




// TODO: 검색하기
// 1) 버튼 눌러서검색
document.getElementById("memberSearchBtn").addEventListener('click', () => {
    doSearch();
})

// 2) 엔터키로 검색
document.getElementById("adminMemberkeyword").addEventListener('keydown', (e) => {

    const keyCode = e.keyCode;

    if(keyCode == 13){  // 엔터키
        doSearch();
    } 
})

// 검색하는 함수
const doSearch = () => {
    numCount = (cp-1)*15;  //순번 정렬
    keyword = document.getElementById("adminMemberkeyword").value; // 입력한 검색어 
    selectMemberList(cp);
}

const searchNoResult = () => {
    memberSelectTable.innerText = "검색 결과가 없습니다.";
    memberSelectTable.style.marginTop = "230px";
    memberSelectTable.style.color = "#2b8c44";
}


// todo: 전체 조회 글자 자르기
/*
유효성
아이디 6~20자
이름 2~10자
닉네임 2~10자


아이디 10자
주소 25자
닉네임 10자 
*/

// jsp 첫 페이지 글자 자르기
const mId = document.getElementsByClassName("mId");
for(let i=0; i<mId.length; i++){
    if(mId[i].innerText.length > 9){
        mId[i].innerText = mId[i].innerText.substring(0, 9) + '...';
    } else {
        mId[i].innerText;
    }
}

const mNickname = document.getElementsByClassName("mNickname");
for(let i=0; i<mId.length; i++){
    if(mNickname[i].innerText.length > 9){
        mNickname[i].innerText = mNickname[i].innerText.substring(0, 9) + '...';
    } else {
        mNickname[i].innerText;
    }
}

const mAddress = document.getElementsByClassName("mAddress");
for(let i=0; i<mAddress.length; i++){
    if(mAddress[i].innerText.length > 24){
        mAddress[i].innerText = mAddress[i].innerText.substring(0, 24) + '...';
    } else {
        mAddress[i].innerText;
    }
}