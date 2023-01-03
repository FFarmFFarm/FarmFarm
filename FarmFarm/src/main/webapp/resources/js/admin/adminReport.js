/*
미처리 신고 조회 (ajax) : selectNewReportList(cp)

미처리 신고 출력 함수: printNewReportList(newReportList, pagination)
페이지네이션 박스 생성 : printPagination(adminPagination, pagination)
페이지네이션 박스 클릭이벤트 추가 : selectNewReportListEvent(element, cp)
*/


var numCount = 0;
var hiddenNo = 0;  // reportNo


//optimize: 미처리 신고 조회 함수 ajax
const selectNewReportList = (cp) => {
    $.ajax({
        url: "/admin/selectNewReportList",
        data: {"cp": cp, "sortFilter": sortFilter},
        dataType: "JSON",
        type: "GET",
        success: (map) => {
            printNewReportList(map.newReportList, map.pagination);
            console.log("미처리 신고 내역 조회 성공");
        },
        error: () => {
            console.log("미처리 신고 내역 조회 실패");
        }
    })
}



//optimize: 미처리 신고 상세 모달창 함수 ajax
const selectNewReportDetail = (hiddenNo) => {
    $.ajax({
        url: "/admin/selectNewReportDetail",
        data: {"hiddenNo": hiddenNo},
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











// optimize: 미처리 신고 내역 출력 함수 
const printNewReportList = (newReportList, pagination) => {

    // 출력 전 내용 지우기
    //fixme: 확인해보고 내용 지우기!
    const reportCount = document.getElementById("reportCount").innerText;

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

        if(report.reportType != null){
            if(report.reportType == 'M'){
                if(report.memberId.length > 15){
                    td3.innerText = report.memberId.substring(0,14) + '...';
                } else{
                    td3.innerText = report.memberId;
                }
            }
            if(report.reportType == 'B' || report.reportType == 'P'){
                if(report.title.length > 15){
                    td3.innerHTML = report.title.substring(0,14) + '...';

                } else{
                    td3.innerHTML = report.title;
                }
            }
        }

        // 신고 사유
        const td4 = document.createElement('td');
        td4.innerText = report.reportReason;

        // 신고 일자
        const td5 = document.createElement('td');
        td5.innerText = report.reportDate;

        // 누적 횟수
        const td6 = document.createElement('td');
        td6.innerText = report.reportVolume;

        // 처리 상태 
        const td7 = document.createElement('td');
        if(report.reportPenalty == 'N'){
            td7.innerText = "접수";
        }

        tr.append(td0, td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);


        // 한 행 클릭하면상세 내용 모달 열리기
        tr.addEventListener('click', () => {
            hiddenNo = report.reportNo;
            selectNewReportDetail(hiddenNo);
        })

    }

    //todo: 페이지네이션
    printPagination(adminPaginationArea, pagination);

}


// todo : jsp 첫페이지에서 모달 열기
const reportListRow = document.getElementsByClassName("report-list-row");
const hiddenReportNo = document.getElementsByClassName("hidden-reportNo");

for(let i=0; i<reportListRow.length; i++){
    reportListRow[i].addEventListener('click', () => {
        console.log("jsp 클릭된다");
        hiddenNo = hiddenReportNo[i].value;
        selectNewReportDetail(hiddenNo);

        console.log(hiddenNo);
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

    console.log("모달");
    
    var reportDetailContainer = document.getElementsByClassName("report-detail-container");

    // 모달 열리기
    for(let i=0; i<reportDetailContainer.length; i++){
        reportDetailContainer[i].style.display = 'flex';
    }


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
    
    if(newReportDetail.reportPenalty == 'N'){
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
    td7Detail.innerText = "누적 신고 횟수";

    const td8Detail = document.createElement('td');
    td8Detail.innerText = newReportDetail.reportVolume;

    tr2Detail.append(td5Detail, td6Detail, td7Detail, td8Detail);


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
    }

    const td12Detail = document.createElement('td');
    td12Detail.colSpan = "3";

    if(newReportDetail.reportType != null){
        if(newReportDetail.reportType == 'M'){
            td12Detail.innerHTML = newReportDetail.memberId;
        }
        if(newReportDetail.reportType == 'B' || newReportDetail.reportType == 'P'){
            td12Detail.innerHTML = newReportDetail.title;
        }
    }

    tr4Detail.append(td11Detail, td12Detail);


    // 여기 사이에 한 줄 더?
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

    // 내용
    const td15Detail = document.createElement('td');
    td15Detail.classList.add('detail-bold');
    td15Detail.classList.add('left');
    td15Detail.innerText = "내용";

    tr6Detail.append(td15Detail);


    // 7)
    const tr7Detail = document.createElement('tr');

    // 상세 내용
    const td16Detail = document.createElement('td');
    td16Detail.colSpan = "4";
    td16Detail.rowSpan = "8";
    td16Detail.style.overflow = "auto";
    td16Detail.innerHTML = newReportDetail.content;

    tr7Detail.append(td16Detail);

    tbodyDetail.append(tr1Detail, tr2Detail,  tr3Detail,tr4Detail, tr5Detail, tr6Detail, tr7Detail);




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

    // 게시글 신고 -> 반려, 삭제
    if(newReportDetail.reportType == 'B' || newReportDetail.reportType == 'P'){
        contentLeaveBtn.classList.add('show');
        contentDeleteBtn.classList.add('show'); 
        contentLeaveBtn.classList.remove('hide');
        contentDeleteBtn.classList.remove('hide');

        accountLeaveBtn.classList.add('hide');
        accountBannedBtn.classList.add('hide');
        accountKickOutBtn.classList.add('hide');

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
        numCount = (cp-1)*10;
        selectNewReportList(cp);
    })
}



// todo: 필터링 옵션 별로 조회 + pagination






// todo: 신고 처리 (반려,계정정지, 탈퇴, 삭제, 블라인드 등등)






// todo: 전체 조회 글자 자르기(jsp 첫페이지)
// 신고대상 아이디/게시글 자르기 (15자)
const rTitle = document.getElementsByClassName("rTitle");
for(let i=0; i<rTitle.length; i++){
    if(rTitle[i].innerText.length > 15){
        rTitle[i].innerText = rTitle[i].innerText.substring(0, 14) + '...';
    } else {
        rTitle[i].innerText;
    }
}


//todo: 모달창 바깥 클릭 시 모달창 꺼짐
window.addEventListener('click', (e) => {
    e.target === reportDetailContainer ? reportDetailContainer.style.display = 'none' : false
    document.querySelector('body').classList.remove("scrollLock");
});