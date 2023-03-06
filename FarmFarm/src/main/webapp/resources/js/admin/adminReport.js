/*
미처리 신고 조회 (ajax) : selectNewReportList(cp)

미처리 신고 출력 함수: printNewReportList(newReportList, pagination)
페이지네이션 박스 생성 : printPagination(adminPagination, pagination)
페이지네이션 박스 클릭이벤트 추가 : selectNewReportListEvent(element, cp)
*/

var numCount = 0;
var hiddenReportNo = 0;  // reportNo
var hiddenMemberNo = 0; // memberNo / reportType = "M"일떄 reportTargetNo
var hiddenContentNo = 0;  // contentNo  / reportType = "B" boardNo / reportType = "P" postNo
var hiddenReportType;
var hiddenAuthority = 0; // authority
var allNew = 'new'; // 전체 신고 조회 누적 모달하고 구분하기 위해. reportPenalty = null


//optimize
/** 미처리 신고 조회 함수 ajax */
const selectNewReportList = (cp) => {

    $.ajax({
        url: "/admin/selectNewReportList",
        data: {"cp": cp, "sortFilter": sortFilter},
        dataType: "JSON",
        type: "GET",
        success: (map) => {
            printNewReportList(map.newReportList, map.pagination, map.reportListCount, map.reportAllListCount);
            console.log("미처리 신고 내역 조회 성공");
        },
        error: () => {
            console.log("미처리 신고 내역 조회 실패");
        }
    })
}



//optimize
/** 미처리 신고 상세 모달창 함수 ajax */
const selectNewReportDetail = (hiddenReportNo) => {
    $.ajax({
        url: "/admin/selectNewReportDetail",
        data: {"hiddenReportNo": hiddenReportNo},
        type: "POST",
        success: (newReportDetail) => {

            printNewReportDetail(newReportDetail);
            console.log("미처리 신고 상세 조회 성공");

        }, 
        error: () => {
            console.log("미처리 신고 상세 조회 실패");
        }
    })
}



//optimize
/**신고 누적 기록 모달창 함수 ajax */
const selectReportAccumulate = (hiddenReportType, hiddenMemberNo, hiddenContentNo) => {
    $.ajax({
        url: "/admin/selectReportAccumulate",
        data: {"reportType": hiddenReportType,
                "memberNo": hiddenMemberNo,
                "contentNo": hiddenContentNo,
                "allNew": allNew},
        dataType: "JSON",
        type: "POST",
        success: (map) => {

            printAccumulate(map.accumMemberList, map.accumContentList);
            // if(hiddenReportType == 'M'){
            //     printAccumMember(map.accumMemberList);
            // } else {
            //     printAccumContent(map.accumContentList);
            // }

            console.log("신고 누적 기록 조회 성공");
        }, 
        error: () => {
            console.log("신고 누적 기록 조회 실패");
        }
    })
}







// optimize
/** 미처리 신고 내역 출력 함수  */
const printNewReportList = (newReportList, pagination, reportListCount, reportAllListCount) => {

    // 출력 전 내용 지우기
    const reportCount = document.getElementById("reportCount");
    reportCount.innerText = "";
    reportCount.innerText = "전체 "+ reportAllListCount + "건 / "+" 실처리 " + reportListCount + "건";


    const tbody = document.getElementById("tbody");
    tbody.innerText = "";

    const adminPaginationArea = document.getElementById("adminPaginationArea");
    adminPaginationArea.innerText = ""; // 페이지박스

    // var tbodyDetail = document.getElementById("tbodyDetail")
    // tbodyDetail.innerText = "";  // 상세 모달창


    for(let report of newReportList){

        //todo: 미처리 신고 내역 조회

        const tr = document.createElement("tr");
        tr.className = "report-list-row";

        // no
        const td0 = document.createElement("td");
        td0.classList.add('report-seq');

        numCount++;
        td0.innerText = numCount;


        // 신고번호
        const td1 = document.createElement('td');
        td1.innerText = report.reportNo;


        // 유형
        const td2 = document.createElement('td');
        
        if(report.reportType != null){
            if(report.reportType == 'M' && report.authority == 0){
                td2.innerText = "일반 회원";
            }
            if(report.reportType == 'M' && report.authority == 1){
                td2.innerText = "판매자";
            }
            if(report.reportType == 'P'){
                td2.innerText = "판매 게시글";
            }
            if(report.reportType == 'B'){
                td2.innerText = "커뮤니티 게시글";
            }
            if(report.reportType == 'C'){
                td2.innerText = "커뮤니티 댓글";
            }
        }

        // 신고 대상 (아이디/게시글)
        const td3 = document.createElement('td');

        if(report.title != null){
            if(report.reportType == 'B' || report.reportType == 'P'){
                if(report.title.length > 14){
                    td3.innerHTML = report.title.substring(0,14) + '...';
                } 
                
                if(report.title.length <= 14){
                    td3.innerHTML = report.title;
                }
            }
        } else {
            if(report.reportType == 'M'){
                if(report.memberId.length > 14){
                    td3.innerText = report.memberId.substring(0,14) + '...';
                } else{
                    td3.innerText = report.memberId;
                }
            }

            if(report.reportType == 'C'){
                td3.innerText = report.commentMemberId;
            }
        }

        // 신고 사유
        const td4 = document.createElement('td');
        if(report.reportReason == null) {
            td4.innerText = "-";
        } else {
            td4.innerText = report.reportReason;
        }

        // 신고 일자
        const td5 = document.createElement('td');
        td5.innerText = report.reportDate;

        // 누적 횟수
        const td6 = document.createElement('td');
        td6.innerText = report.reportVolume;

        // 처리 상태 
        const td7 = document.createElement('td');
        if(report.reportPenalty == null){
            td7.innerText = "접수";
        }

        tr.append(td0, td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);


        // 한 행 클릭하면상세 내용 모달 열리기
        tr.addEventListener('click', () => {
            hiddenReportNo = report.reportNo;  // 상세조회용
            
            // 상세 모달 
            selectNewReportDetail(hiddenReportNo);

            console.log("한 행 클릭할 때 모달 열리는 부분---------");
            console.log("hiddenReportNo: " + hiddenReportNo);
        })

    }

    //todo: 페이지네이션
    printPagination(adminPaginationArea, pagination);

}


// todo : jsp 첫페이지에서 모달 열기
const reportListRow = document.getElementsByClassName("report-list-row");
const tempReportNo = document.getElementsByClassName("hidden-reportNo");
const tempMemberNo = document.getElementsByClassName("hidden-memberNo");
const tempContentNo = document.getElementsByClassName("hidden-contentNo");
const tempReportType = document.getElementsByClassName("hidden-reportType");

for(let i=0; i<reportListRow.length; i++){
    reportListRow[i].addEventListener('click', () => {
        hiddenReportNo = tempReportNo[i].value;
        hiddenMemberNo = tempMemberNo[i].value;
        hiddenContentNo = tempContentNo[i].value;
        hiddenReportType = tempReportType[i].value;

        selectNewReportDetail(hiddenReportNo);

        console.log("jsp에서 한 행 클릭했을때=====");
        console.log("hiddenReportNo: " + hiddenReportNo);
        console.log("hiddenMemberNo : " + hiddenMemberNo);
        console.log("hiddenContentNo : " + hiddenContentNo);
        console.log("hiddenReportType : " + hiddenReportType);
    })
}



/* 버튼 */
const accountLeaveBtn = document.getElementById('accountLeaveBtn');
const accountBannedBtn = document.getElementById('accountBannedBtn');
const accountKickOutBtn = document.getElementById('accountKickOutBtn');

const contentLeaveBtn = document.getElementById('contentLeaveBtn');
const contentDeleteBtn = document.getElementById('contentDeleteBtn');


// optimize: 상세모달 열기 함수
const printNewReportDetail = (newReportDetail) => {
    
    reportDetailModalOpen();

    // 내용지우기
    const tbodyDetail = document.getElementById("tbodyDetail")
    tbodyDetail.innerHTML = "";  // 상세 모달창


    // 1)
    const tr1Detail = document.createElement('tr');

    // 신고 번호
    const td1Detail = document.createElement('td');
    td1Detail.classList.add('detail-bold');
    td1Detail.classList.add('left');
    td1Detail.innerText = "신고 번호";

    const td2Detail = document.createElement('td');
    td2Detail.classList.add('left-content');
    td2Detail.innerText = newReportDetail.reportNo;


    // 처리 상태
    const td3Detail = document.createElement('td');
    td3Detail.classList.add('detail-bold');
    td3Detail.classList.add('right');
    td3Detail.innerText = "처리 상태";

    const td4Detail = document.createElement('td');
    
    if(newReportDetail.reportPenalty == null){
        td4Detail.innerText = "접수";
    }

    tr1Detail.append(td1Detail, td2Detail, td3Detail, td4Detail);


    // 2)
    const tr2Detail = document.createElement('tr');

    // 유형
    const td5Detail = document.createElement('td');
    td5Detail.classList.add('detail-bold');
    td5Detail.classList.add('left');
    td5Detail.innerText = "유형"

    const td6Detail = document.createElement('td');
    td6Detail.classList.add('left-content');

    if(newReportDetail.reportType != null){
        if(newReportDetail.reportType == 'M' && newReportDetail.authority == 0){
            td6Detail.innerText = "일반 회원";
        }
        if(newReportDetail.reportType == 'M' && newReportDetail.authority == 1){
            td6Detail.innerText = "판매자";
        }
        if(newReportDetail.reportType == 'P'){
            td6Detail.innerText = "판매 게시글";
        }
        if(newReportDetail.reportType == 'B'){
            td6Detail.innerText = "커뮤니티 게시글";
        }
        if(newReportDetail.reportType == 'C'){
            td6Detail.innerText = "커뮤니티 댓글";
        }
    }

    // 누적 신고 횟수
    
    const td7Detail = document.createElement('td');
    td7Detail.classList.add('detail-bold');
    td7Detail.classList.add('right');
    td7Detail.innerHTML = "누적 신고 횟수";
    
    const td8Detail = document.createElement('td');
    td8Detail.innerText = newReportDetail.reportVolume;
    
    const icon = document.createElement('i');
    // icon.innerHTML = '<i class="fa-solid fa-caret-down filter-icon"></i>';
    icon.innerHTML = '<i class="fa-sharp fa-solid fa-angle-right"></i>';
    icon.classList.add('filter-icon');

    // 옆페이지로 이동하는 아이콘
    const spanIcon = document.createElement('span');
    spanIcon.append(icon);
    spanIcon.classList.add('next-icon');

    tbodyDetail.append(spanIcon);

    tr2Detail.append(td5Detail, td6Detail, td7Detail, td8Detail);

    //fixme:
    // 아이콘 클릭했을 때
    spanIcon.addEventListener('click', () =>{
        hiddenMemberNo = newReportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
        hiddenContentNo = newReportDetail.contentNo; // 게시글 정지, 반려용
        hiddenReportType = newReportDetail.reportType; // 게시글 정지, 반려용

        console.log("신고 누적 용 값---------");
        console.log("hiddenMemberNo: " + hiddenMemberNo);
        console.log("hiddenContentNo: " + hiddenContentNo);
        console.log("hiddenReportType: " + hiddenReportType);

        reportDetailModalClose();
        accumModalOpen();
        selectReportAccumulate(hiddenReportType, hiddenMemberNo, hiddenContentNo);
    })

    // 3)
    const tr3Detail = document.createElement('tr');

    // 신고일자
    const td9Detail = document.createElement('td');
    td9Detail.classList.add('detail-bold');
    td9Detail.classList.add('left');
    td9Detail.innerText = "신고 일자";

    const td10Detail = document.createElement('td');
    td10Detail.classList.add('left-content');
    td10Detail.innerText = newReportDetail.reportDate;
    

    tr3Detail.append(td9Detail, td10Detail);


    // 4)
    const tr4Detail = document.createElement('tr');

    // 신고 대상(아이디/게시글)
    const td11Detail = document.createElement('td');
    td11Detail.classList.add('detail-bold');
    td11Detail.classList.add('left');

    if(newReportDetail.reportType != null){
        if(newReportDetail.reportType == 'M'){
            td11Detail.innerText = "신고 대상 아이디";
        }
        if(newReportDetail.reportType == 'B' || newReportDetail.reportType == 'P'){
            td11Detail.innerText = "신고 대상 게시글";
        }
        if(newReportDetail.reportType == 'C'){
            td11Detail.innerText = "댓글 작성자 ID";
        }
    }

    const td12Detail = document.createElement('td');
    td12Detail.colSpan = "3";
    td12Detail.style.fontWeight = "bold";


    

    if(newReportDetail.reportType != null){
        const move = document.createElement('a');
        move.target = "_blank";
        move.className = "move";
        td12Detail.style.cursor = "pointer";
        
        
        if(newReportDetail.reportType == 'M'){
            move.classList.add('move');
            
            if(newReportDetail.authority == 0){
                // 마이페이지는 자기자신만 들어감
                move.innerHTML = newReportDetail.memberId +" (" + newReportDetail.memberNickname + ")" ;
                td12Detail.style.cursor = "default";
                move.classList.remove('move');

            } else if(newReportDetail.authority == 1){
                move.href = "/seller/" + newReportDetail.reportTargetNo;
                move.innerHTML = newReportDetail.memberId +" (" + newReportDetail.memberNickname + ")";

            } else {
                move.innerHTML = newReportDetail.memberId +" (" + newReportDetail.memberNickname + ")";
            }
        }
        if(newReportDetail.reportType == 'B'){ // 커뮤니티 게시글
            move.classList.add('move');
            move.href = "/board/"+ newReportDetail.boardType + "/" + newReportDetail.reportTargetNo; 
            move.innerHTML = "[ " + newReportDetail.title + " ]";
        }

        if(newReportDetail.reportType == 'P'){ //판매글
            move.classList.add('move');
            move.href = "/post/" + newReportDetail.reportTargetNo;
            move.innerHTML = "[ " + newReportDetail.title + " ]";
        }

        if(newReportDetail.reportType == 'C'){ //커뮤니티 댓글
            move.classList.add('move');
            move.href = "/board/" + newReportDetail.boardType + "/" + newReportDetail.commentBoardNo + "?cp=" + cp + "#co" + newReportDetail.contentNo;
            move.innerHTML = "[ " + newReportDetail.commentMemberId + " ]";
        }

        td12Detail.append(move);
    }

    tr4Detail.append(td11Detail, td12Detail);


    // 5)
    const tr5Detail = document.createElement('tr');

    // 신고 사유
    const td13Detail = document.createElement('td');
    td13Detail.classList.add('detail-bold');
    td13Detail.classList.add('left');
    td13Detail.innerText = "신고 사유";

    const td14Detail = document.createElement('td');
    td14Detail.innerHTML = newReportDetail.reportReason;

    tr5Detail.append(td13Detail, td14Detail);


    // 6)
    const tr6Detail = document.createElement('tr');
    
    // 신고 사유 추가 입력
    const td15Detail = document.createElement('td');
    td15Detail.classList.add('detail-bold');
    td15Detail.classList.add('left');
    td15Detail.innerText = "추가 신고 사유";

    const td16Detail = document.createElement('td');
    td16Detail.colSpan = "3";
    td16Detail.innerHTML = newReportDetail.reportContent;


    tr6Detail.append(td15Detail, td16Detail);


    // 7)
    const tr7Detail = document.createElement('tr');
    const tr8Detail = document.createElement('tr');
    if(newReportDetail.reportType != 'M'){
    
        // 내용
        const td17Detail = document.createElement('td');
        td17Detail.classList.add('detail-bold');
        td17Detail.classList.add('left');
        td17Detail.innerText = "내용";
    
        tr7Detail.append(td17Detail);
    
    
        // 8)
        // const tr8Detail = document.createElement('tr');
    
        // 내용
        const td18Detail = document.createElement('td');
        td18Detail.colSpan = "4";
        td18Detail.rowSpan = "8";
        td18Detail.style.overflow = "auto";
        td18Detail.innerHTML = newReportDetail.content;
    
        tr8Detail.append(td18Detail);
    
    }

    // tr4 순서 바꿈
    tbodyDetail.append(tr1Detail, tr2Detail,  tr3Detail, tr5Detail, tr6Detail, tr4Detail, tr7Detail, tr8Detail);


    // 신고 처리용 값 가져오기  // 강제 탈퇴, 반려, 정지, 삭제 등등에 사용
    hiddenMemberNo = newReportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
    hiddenContentNo = newReportDetail.contentNo; // 게시글 삭제, 반려용
    hiddenReportType = newReportDetail.reportType;  // 게시글 삭제, 반려용
    hiddenAuthority = newReportDetail.authority; // 강제 탈퇴 시 글 삭제용 
    // hiddenReportNo = newReportDetail.reportNo;  

    
    console.log("상세 모달---------");
    console.log("hiddenReportNo: " + hiddenReportNo);
    console.log("hiddenMemberNo: " + hiddenMemberNo);
    console.log("hiddenContentNo: " + hiddenContentNo);
    console.log("hiddenReportType: " + hiddenReportType);
    console.log("authority: " + hiddenAuthority);

    // 버튼
    // 회원신고 -> 반려, 강제정지, 탈퇴
    if(newReportDetail.reportType == 'M'){
        accountLeaveBtn.classList.add('show');
        accountBannedBtn.classList.add('show');
        accountKickOutBtn.classList.add('show');
        accountLeaveBtn.classList.remove('hide');
        accountBannedBtn.classList.remove('hide');
        accountKickOutBtn.classList.remove('hide');

        contentLeaveBtn.classList.add('hide');
        contentDeleteBtn.classList.add('hide'); //
    }

    // 게시글/댓글 신고 -> 반려, 삭제
    if(newReportDetail.reportType == 'B' || newReportDetail.reportType == 'P' || newReportDetail.reportType == 'C'){
        contentLeaveBtn.classList.add('show');
        contentDeleteBtn.classList.add('show'); 
        contentLeaveBtn.classList.remove('hide');
        contentDeleteBtn.classList.remove('hide');

        accountLeaveBtn.classList.add('hide');
        accountBannedBtn.classList.add('hide');
        accountKickOutBtn.classList.add('hide');
    }

}





//optimize: 누적 신고 기록
const printAccumulate = (accumMemberList, accumContentList) => {
    console.log("누적신고 기록 함수");

    accumModalOpen();

    const tbodyAccum = document.getElementById("tbodyAccum");
    tbodyAccum.innerText = "";


    // thead
    const trA = document.createElement('tr');
    trA.className = "accum-row";

    const tda1 = document.createElement("td");
    tda1.classList.add("accum-bold");
    tda1.innerText = "NO";

    const tda2 = document.createElement("td");
    tda2.classList.add("accum-bold");
    tda2.innerText = "신고번호"
    
    const tda3 = document.createElement("td");
    tda3.classList.add("accum-bold");
    tda3.innerText = "신고 일자";

    const tda4 = document.createElement("td");
    tda4.classList.add("accum-bold");
    tda4.innerText = "신고자";

    const tda5 = document.createElement("td");
    tda5.classList.add("accum-bold");
    tda5.innerText = "신고 사유";

    const tda6 = document.createElement("td");
    tda6.classList.add("accum-bold");
    tda6.innerText = "추가 사유";

    trA.append(tda1, tda2, tda3, tda4, tda5, tda6);


    // tbody
    // 신고유형 : 계정
    if(hiddenReportType == 'M'){
        numCount = 0;
        
        for(let member of accumMemberList){

            const trM = document.createElement("tr");
            trM.classList.add("tr-row");

            const tdm1 = document.createElement("td");
            numCount++;
            tdm1.innerText = numCount;

            const tdm2 = document.createElement("td");
            tdm2.innerText = member.reportNo;

            const tdm3 = document.createElement("td");
            tdm3.innerText = member.reportDate;

            const tdm4 = document.createElement("td");
            tdm4.innerText = member.reportMemberNo;

            const tdm5 = document.createElement("td");
            if(member.reportReason == null){
                tdm5.innerText = "-";
            } else {
                tdm5.innerText = member.reportReason;
            }

            const tdm6 = document.createElement("td");
            tdm6.style.textAlign = "left";
            if(member.reportContent == null){
                tdm6.innerText = "";
            } else {
                tdm6.innerHTML = member.reportContent;
            }

            trM.append(tdm1, tdm2, tdm3, tdm4, tdm5, tdm6);
            trA.append(trM);
            tbodyAccum.append(trA);
        }
    }


    if(hiddenReportType == 'B' || hiddenReportType == 'P' || hiddenReportType == 'C'){
        numCount = 0;

        for(let content of accumContentList){

            const trC = document.createElement("tr");
            trC.classList.add("tr-row");

            const tdc1 = document.createElement("td");
            numCount++;
            tdc1.innerText = numCount;

            const tdc2 = document.createElement("td");
            tdc2.innerText = content.reportNo;

            const tdc3 = document.createElement("td");
            tdc3.innerHTML = content.reportDate;

            const tdc4 = document.createElement("td");
            tdc4.innerText = content.contentNo;

            const tdc5 = document.createElement("td");
            if(content.reportReason == null) {
                tdc5.innerText = "-";
            } else {
                tdc5.innerText = content.reportReason;
            }

            const tdc6 = document.createElement("td");
            if(content.reportContent == null){
                tdc6.innerText = "";
            } else {
                tdc6.innerHTML = content.reportContent;
            }

            trC.append(tdc1, tdc2, tdc3, tdc4, tdc5, tdc6);
            trA.append(trC);
            tbodyAccum.append(trA);
        }
    }


    // 신고 내역으로 돌아가는 아이콘
    const preIcon = document.createElement('i');
    preIcon.innerHTML = '<i class="fa-sharp fa-solid fa-angle-left"></i>';
    preIcon.classList.add('filter-icon');

    // 옆페이지로 이동하는 아이콘
    const spanIcon = document.createElement('span');
    spanIcon.append(preIcon);
    spanIcon.classList.add('pre-icon');

    tbodyAccum.append(spanIcon);

    // 아이콘 클릭했을 때
    spanIcon.addEventListener('click', () =>{
        // hiddenMemberNo = newReportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
        // hiddenContentNo = newReportDetail.contentNo; // 게시글 정지, 반려용
        // hiddenReportType = newReportDetail.reportType; // 게시글 정지, 반려용

        // console.log("신고 누적 용 값---------");
        // console.log("hiddenMemberNo: " + hiddenMemberNo);
        // console.log("hiddenContentNo: " + hiddenContentNo);
        // console.log("hiddenReportType: " + hiddenReportType);

        accumModalClose();
        reportDetailModalOpen();
        // 상세 모달 
        selectNewReportDetail(hiddenReportNo);
    })

    //fixme 수정하기
    // 짝수번째 줄 색칠
    const trRow = document.querySelectorAll(".tr-row");

    for(let i=0; i<trRow.length; i++){
        trRow[2*i].style.backgroundColor = "#eef4edcc";
    }


}





// ----------------------------------------------



/* 페이지 박스 만드는 함수 */
const makePageBox = (elementName, inputHtml, inputId, className) => {
    elementName.innerHTML = inputHtml;
    elementName.id = inputId;
    elementName.classList.add(className);
}


// optimize : 페이지네이션 박스 생성  // 전체조회 페이지네이션 함수랑 조금 다름
const printPagination = (adminPaginationArea, pagination) => {

    cp = pagination.currentPage;
    
    const adminPagination = document.createElement('ul');
    adminPagination.className = 'admin-pagination';

    // 이전 페이지
    const firstPage = document.createElement('li');
    const prevPage = document.createElement('li');
    makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
    makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');

    adminPagination.append(firstPage, prevPage);
    
    // 번호 페이지
    for(let i=pagination.startPage; i <= pagination.endPage; i++){

        const numPage = document.createElement('li');

        if(i == pagination.currentPage){
            makePageBox(numPage, i, i, 'current-page-box');
        } else {
            makePageBox(numPage, i, i, 'page-box');
        }

        adminPagination.append(numPage);

        selectNewReportListEvent(numPage, i);
    }


    // 다음 페이지
    const nextPage = document.createElement('li');
    const maxPage = document.createElement('li');
    makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
    makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

    adminPagination.append(nextPage, maxPage);
    adminPaginationArea.append(adminPagination);

    selectNewReportListEvent(firstPage, 1);
    selectNewReportListEvent(prevPage, pagination.prevPage);
    selectNewReportListEvent(nextPage, pagination.nextPage);
    selectNewReportListEvent(maxPage, pagination.maxPage);


}



// HTML 문서가 모두 읽어진 후에 selectNewReportList() 호출!


// --jsp
// optimize : 페이지박스 각각에 cp 값 추가 + 전체 회원 조회
const pageBox = document.getElementsByClassName("page-box");
for(let page of pageBox){
    page.addEventListener('click', () => {
        let cp = page.id;
        selectNewReportList(cp);
    })
}


// -- ajax
// 2페이지 이후, ajax로 조회할 때 다른 페이지로 이동하기 위해! -> printPagination() 에서 사용
//optimize: 페이지네이션 박스 클릭하면, 전체 회원 조회 
const selectNewReportListEvent = (element, cp) => {
    element.addEventListener('click', () => {
        numCount = (cp-1)*15;
        selectNewReportList(cp);
    })
}



// todo: 필터링 옵션 별로 조회  - sortFilter
const up = document.getElementById('up');
const down = document.getElementById('down');

up.addEventListener('click', () => {
    numCount = (cp-1)*15;
    sortFilter = 'down';
    selectNewReportList(cp);

    up.style.display = 'none';
    down.style.display = 'inline-block';
})


down.addEventListener('click', () => {
    numCount = (cp-1)*15;
    sortFilter = 'up';
    selectNewReportList(cp);

    down.style.display = 'none';
    up.style.display = 'inline-block';
})






// todo: 전체 조회 글자 자르기(jsp 첫페이지)
// 신고대상 아이디/게시글 자르기 (15자)
const rTitle = document.getElementsByClassName("rTitle");
for(let i=0; i<rTitle.length; i++){
    if(rTitle[i].innerText.length > 14){
        rTitle[i].innerText = rTitle[i].innerText.substring(0, 14) + '...';
    } else {
        rTitle[i].innerText;
    }
}




// 모달 ---------------------------------------
var reportDetailContainer = document.getElementsByClassName("report-detail-container");
var accumContainer = document.getElementsByClassName("accumulate-container");

// 모달 열기
const reportDetailModalOpen = () =>{
    for(let i=0; i<reportDetailContainer.length; i++){
        reportDetailContainer[i].style.display = "flex";
    }
}

// 모달 닫기
const reportDetailModalClose = () => {
    for(let i=0; i<reportDetailContainer.length; i++){
        reportDetailContainer[i].style.display = "none";
    }
}


// 누적기록 모달 열기
const accumModalOpen = () =>{
    for(let i=0; i<accumContainer.length; i++){
        accumContainer[i].style.display = "flex";
    }
}

// 누적기록 모달 닫기
const accumModalClose = () =>{
    for(let i=0; i<accumContainer.length; i++){
        accumContainer[i].style.display = "none";
    }
}


//todo: 모달창 바깥 클릭 시 모달창 꺼짐
const detailModal = document.getElementById('reportDetailContainer');
window.addEventListener('click', (e) => {
    e.target === detailModal ? detailModal.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});


const accumModal = document.getElementById('accumContainer');
window.addEventListener('click', (e) => {
    e.target === accumModal ? accumModal.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});
//-------------------------------------------




// todo: 신고 처리 (반려,계정정지, 탈퇴, 삭제, 블라인드 등등)

// * (계정) 강제 탈퇴
accountKickOutBtn.addEventListener('click', () => {
    console.log("계정 탈퇴 클릭");

    $.ajax({
        url: "/report/kickout",
        data: { "hiddenNo": hiddenMemberNo, "authority":hiddenAuthority},
        type: "POST",
        success: (result) => {
            if(result > 0){
                reportDetailModalClose();
                selectNewReportList(cp);
                console.log("강제 탈퇴 완료");
                messageModalOpen("해당 계정이 강제 탈퇴되었습니다.");

                //fixme: 시간 남을 때 모달이랑, 스크롤 위치 수정

            
            } else {
                console.log("강퇴 처리 실패");
            }
        },
        error: () => {
            console.log("강퇴 처리 오류");
            messageModalOpen("오류 발생");
        }
    });
})


// * (계정) 반려 
accountLeaveBtn.addEventListener('click', () => {
    console.log("계정 반려 클릭");

    $.ajax({
        url: "/report/leaveAccount",
        data: {"hiddenNo":hiddenMemberNo},
        type: "POST",
        success: (result) => {
            if(result > 0){
                reportDetailModalClose();
                selectNewReportList(cp);

                console.log("계정 반려");
                messageModalOpen("해당 계정이 활성화 상태를 유지합니다.");
            }
        },
        error: () => {
            console.log("계정 반려 오류");
            messageModalOpen("오류 발생");
        }
    })
})


// * (계정) 정지
accountBannedBtn.addEventListener('click', () => {
    console.log("계정 정지 클릭");

    $.ajax({
        url: "/report/bannedAccount",
        data: {"hiddenNo":hiddenMemberNo},
        type: "POST",
        success: (result) => {
            if(result > 0){
                reportDetailModalClose();
                selectNewReportList(cp);

                console.log("계정 정지");
                messageModalOpen("해당 계정이 7일간 정지됩니다.")
            }
        },
        error: () => {
            console.log("계정 정지 오류");
            messageModalOpen("오류 발생");
        }
    })
})



// B, P 나눠야 함.
// * (게시글) 삭제 : 판매글, 커뮤니티 게시글, 커뮤니티 댓글
contentDeleteBtn.addEventListener('click', () => {
    console.log("게시글 삭제 클릭");

    $.ajax({
        url: "/report/deleteContent",
        data: {"hiddenContentNo":hiddenContentNo, "reportType":hiddenReportType},
        type: "GET",
        success: (result) => {
            if(result > 0){
                reportDetailModalClose();
                selectNewReportList(cp);

                console.log("게시글 삭제");
                messageModalOpen("해당 게시글/댓글이 삭제되었습니다.")
            }
        },
        error: () => {
            console.log("게시글/댓글 삭제 오류");
            messageModalOpen("오류 발생");
        }
    })
})



// * (게시글) 반려
contentLeaveBtn.addEventListener('click', () => {
    console.log("게시글 반려 클릭");
    // console.log(hiddenContentNo);

    $.ajax({
        url: "/report/LeaveContent",
        data: {"hiddenContentNo":hiddenContentNo, "reportType":hiddenReportType},
        type: "GET",
        success: (result) => {
            if(result > 0){
                reportDetailModalClose();
                selectNewReportList(cp);

                console.log("게시글 반려");
                messageModalOpen("해당 게시글/댓글이 활성화 상태를 유지합니다.")
            }
        }, 
        error: () => {
            console.log("게시글/댓글 반려 오류");
            messageModalOpen("오류 발생");
        } 
    })
})



