/*
전체 신고 조회 (ajax) : selectNewReportList(cp)

전체 신고 출력 함수: printReportList(reportList, pagination)
페이지네이션 박스 생성 : printPagination(adminPagination, pagination)
페이지네이션 박스 클릭이벤트 추가 : selectReportListEvent(element, cp)
*/

var numCount = 0;
var hiddenReportNo = 0;  // reportNo
var hiddenMemberNo = 0; // memberNo / reportType = "M"일떄 reportTargetNo
var hiddenContentNo = 0;  // contentNo  / reportType = "B" boardNo / reportType = "P" postNo
var hiddenReportType;
var hiddenAuthority = 0; // authority
var allNew = 'all'; // 미처리 신고 누적 모달과 구분하기 위해 reportPenalty 구분 안함.
var keyword;


//optimize: 전체 신고 조회 함수 ajax
const selectReportList = (cp) => {

    axios.get('/admin/report/list',{
        params: {"cp": cp, 
                "sortFilter": sortFilter, 
                "typeFilter": typeFilter,
                "processFilter": processFilter, 
                "keyword" : keyword},
    })
    .then((response) => { // 성공
        const map = response.data;
        printReportList(map.reportAllList, map.pagination);
        console.log("전체 신고 내역 조회 성공");

    }).catch(() => {
        console.log("전체 신고 내역 조회 실패");
    });

    // $.ajax({
    //     url: "/admin/selectReportList",
    //     data: {"cp": cp, 
    //             "sortFilter": sortFilter, 
    //             "typeFilter": typeFilter,
    //             "processFilter": processFilter, 
    //             "keyword" : keyword},
    //     dataType: "JSON",
    //     type: "GET",
    //     success: (map) => {
    //         printReportList(map.reportAllList, map.pagination);
    //         console.log("전체 신고 내역 조회 성공");
    //         // console.log(sortFilter);
    //     },
    //     error: () => {
    //         console.log("전체 신고 내역 조회 실패");
    //     }
    // })
}



//optimize: 전체 신고 상세 모달창 함수 ajax
const selectReportDetail = (hiddenReportNo) => {

    axios.get('/admin/report/list/' + hiddenReportNo)
    .then((response) => { 
        const reportDetail = response.data;
        printReportDetail(reportDetail);
        console.log("전체 신고 상세 조회 성공");

    }).catch(() => {
        console.log("전체 신고 내역 조회 실패");
    });


    // $.ajax({
    //     url: "/admin/selectReportDetail",
    //     data: {"hiddenReportNo": hiddenReportNo},
    //     type: "POST",
    //     success: (reportDetail) => {

    //         printReportDetail(reportDetail);
    //         console.log("전체 신고 상세 조회 성공");

    //     }, 
    //     error: () => {
    //         console.log("전체 신고 상세 조회 실패");
    //     }
    // })
}



//optimize: 신고 누적 기록 모달창 함수 ajax
const selectReportAccumulate = (hiddenReportType, hiddenMemberNo, hiddenContentNo, hiddenReportNo) => {

    axios.get('/admin/report/'+hiddenReportNo+'/accumulation',{
        params: {"reportType": hiddenReportType,
                 "memberNo": hiddenMemberNo,
                 "contentNo": hiddenContentNo,
                 "allNew": allNew,
                 "reportNo" : hiddenReportNo,},
    })
    .then((response) => { // 성공
        const map = response.data;
        printAccumulate(map.accumMemberList, map.accumContentList);
        console.log("신고 누적 기록 조회 성공");

    }).catch(() => {
        console.log("신고 누적 기록 조회 실패");
    });

    // $.ajax({
    //     url: "/admin/selectReportAccumulate",
    //     data: {"reportType": hiddenReportType,
    //             "memberNo": hiddenMemberNo,
    //             "contentNo": hiddenContentNo,
    //             "allNew": allNew},
    //     dataType: "JSON",
    //     type: "POST",
    //     success: (map) => {

    //         printAccumulate(map.accumMemberList, map.accumContentList);
    //         // if(hiddenReportType == 'M'){
    //         //     printAccumMember(map.accumMemberList);
    //         // } else {
    //         //     printAccumContent(map.accumContentList);
    //         // }

    //         console.log("신고 누적 기록 조회 성공");
    //     }, 
    //     error: () => {
    //         console.log("신고 누적 기록 조회 실패");
    //     }
    // })
}







// optimize: 전체 신고 내역 출력 함수 
const printReportList = (reportAllList, pagination) => {

    const tbody = document.getElementById("tbody");
    tbody.innerText = "";

    const adminPaginationArea = document.getElementById("adminPaginationArea");
    adminPaginationArea.innerText = ""; // 페이지박스

    // var tbodyDetail = document.getElementById("tbodyDetail")
    // tbodyDetail.innerText = "";  // 상세 모달창


    for(let report of reportAllList){

        //todo: 전체 신고 내역 조회

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

        if(report.reportType != null) {
            if(report.reportPenalty == null){
                td7.innerText = "접수";
            }
            if(report.reportPenalty == 'N'){
                td7.innerText = "반려";
            }

         
            if(report.reportType == 'M'){
                if(report.memberDelFl == 'N' && (report.reportPenalty == 'Y' || report.reportPenalty == 'A')){
                    td7.innerText = "정지";
                }

                if(report.memberDelFl == 'Y'){
                    td7.innerText = "탈퇴";
                }
            }

            if(report.reportType == 'B' || report.reportType == 'P' || report.reportType == 'C'){
                if(report.reportPenalty == 'Y'){
                    td7.innerText = "삭제";
                }
            }
        }


        tr.append(td0, td1, td2, td3, td4, td5, td6, td7);
        tbody.append(tr);


        // 한 행 클릭하면상세 내용 모달 열리기
        tr.addEventListener('click', () => {
            hiddenReportNo = report.reportNo;  // 상세조회용
            
            // 상세 모달 
            selectReportDetail(hiddenReportNo);

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

        selectReportDetail(hiddenReportNo);

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
const printReportDetail = (reportDetail) => {
    
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
    td2Detail.innerText = reportDetail.reportNo;


    // 처리 상태
    const td3Detail = document.createElement('td');
    td3Detail.classList.add('detail-bold');
    td3Detail.classList.add('right');
    td3Detail.innerText = "처리 상태";

    const td4Detail = document.createElement('td');
    
    if(reportDetail.reportType != null){
        
        if(reportDetail.reportPenalty == null){
            td4Detail.innerText = "접수";

            if(reportDetail.reportType == 'M'){
                accountLeaveBtn.style.display = 'block';
                accountBannedBtn.style.display = 'block';
                accountKickOutBtn.style.display = 'block';

                contentLeaveBtn.style.display = 'none';
                contentDeleteBtn.style.display = 'none';
            }

            if(reportDetail.reportType == 'B' || reportDetail.reportType == 'P' || reportDetail.reportType == 'C'){
                contentLeaveBtn.style.display = 'block';
                contentDeleteBtn.style.display = 'block';

                accountLeaveBtn.style.display = 'none';
                accountBannedBtn.style.display = 'none';
                accountKickOutBtn.style.display = 'none';
            }
        }

        if(reportDetail.reportPenalty == 'N'){
            td4Detail.innerText = "반려";

            if(reportDetail.reportType == 'M'){
                accountLeaveBtn.style.display = 'none';
                accountBannedBtn.style.display = 'block';
                accountKickOutBtn.style.display = 'block';

                contentLeaveBtn.style.display = 'none';
                contentDeleteBtn.style.display = 'none';
            }

            if(reportDetail.reportType == 'B' || reportDetail.reportType == 'P' || reportDetail.reportType == 'C'){
                contentLeaveBtn.style.display = 'none';
                contentDeleteBtn.style.display = 'block';
                
                accountLeaveBtn.style.display = 'none';
                accountBannedBtn.style.display = 'none';
                accountKickOutBtn.style.display = 'none';
            }
        }
    
     
        if(reportDetail.reportType == 'M'){
            if(reportDetail.memberDelFl == 'N' && (reportDetail.reportPenalty == 'Y' || reportDetail.reportPenalty == 'A')){
                td4Detail.innerText = "정지";

                accountLeaveBtn.style.display = 'block';
                accountBannedBtn.style.display = 'none';
                accountKickOutBtn.style.display = 'block';

                contentLeaveBtn.style.display = 'none';
                contentDeleteBtn.style.display = 'none';
            }
    
            if(reportDetail.memberDelFl == 'Y'){
                td4Detail.innerText = "탈퇴";

                accountLeaveBtn.style.display = 'block';
                accountBannedBtn.style.display = 'block';
                accountKickOutBtn.style.display = 'none';

                contentLeaveBtn.style.display = 'none';
                contentDeleteBtn.style.display = 'none';
            }
        }
    
        if(reportDetail.reportType == 'B' || reportDetail.reportType == 'P' || reportDetail.reportType == 'C'){
            if(reportDetail.reportPenalty == 'Y'){
                td4Detail.innerText = "삭제";

                contentLeaveBtn.style.display = 'block';
                contentDeleteBtn.style.display = 'none';

                accountLeaveBtn.style.display = 'none';
                accountBannedBtn.style.display = 'none';
                accountKickOutBtn.style.display = 'none';
            }
        } 
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

    if(reportDetail.reportType != null){
        if(reportDetail.reportType == 'M' && reportDetail.authority == 0){
            td6Detail.innerText = "일반 회원";
        }
        if(reportDetail.reportType == 'M' && reportDetail.authority == 1){
            td6Detail.innerText = "판매자";
        }
        if(reportDetail.reportType == 'P'){
            td6Detail.innerText = "판매 게시글";
        }
        if(reportDetail.reportType == 'B'){
            td6Detail.innerText = "커뮤니티 게시글";
        }
        if(reportDetail.reportType == 'C'){
            td6Detail.innerText = "커뮤니티 댓글";
        }
    }

    // 누적 신고 횟수
    
    const td7Detail = document.createElement('td');
    td7Detail.classList.add('detail-bold');
    td7Detail.classList.add('right');
    td7Detail.innerHTML = "누적 신고 횟수";
    
    const td8Detail = document.createElement('td');
    td8Detail.innerText = reportDetail.reportVolume;
    
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
        hiddenMemberNo = reportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
        hiddenContentNo = reportDetail.contentNo; // 게시글 정지, 반려용
        hiddenReportType = reportDetail.reportType; // 게시글 정지, 반려용

        console.log("신고 누적 용 값---------");
        console.log("hiddenMemberNo: " + hiddenMemberNo);
        console.log("hiddenContentNo: " + hiddenContentNo);
        console.log("hiddenReportType: " + hiddenReportType);

        reportDetailModalClose();
        accumModalOpen();
        selectReportAccumulate(hiddenReportType, hiddenMemberNo, hiddenContentNo, hiddenReportNo);
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
    td10Detail.innerText = reportDetail.reportDate;
    

    tr3Detail.append(td9Detail, td10Detail);


    // 4)
    const tr4Detail = document.createElement('tr');

    // 신고 대상(아이디/게시글)
    const td11Detail = document.createElement('td');
    td11Detail.classList.add('detail-bold');
    td11Detail.classList.add('left');

    if(reportDetail.reportType != null){
        if(reportDetail.reportType == 'M'){
            td11Detail.innerText = "신고 대상 아이디";
        }
        if(reportDetail.reportType == 'B' || reportDetail.reportType == 'P'){
            td11Detail.innerText = "신고 대상 게시글";
        }
        if(reportDetail.reportType == 'C'){
            td11Detail.innerText = "댓글 작성자 ID";
        }
    }

    const td12Detail = document.createElement('td');
    td12Detail.colSpan = "3";
    td12Detail.style.fontWeight = "bold";


    

    if(reportDetail.reportType != null){
        const move = document.createElement('a');
        move.className = "move";
        move.target = "_blank";
        td12Detail.style.cursor = "pointer";
        
        
        if(reportDetail.reportType == 'M'){
        
            move.classList.add('move');

            if(reportDetail.authority == 0){  // 일반 회원
                // 마이페이지는 자기자신만 들어감
                td12Detail.innerHTML = reportDetail.memberId +" (" + reportDetail.memberNickname + ")";
                td12Detail.style.cursor = "default";
                move.classList.remove('move');

            } else if(reportDetail.authority == 1){  // 판매자
                move.href = "/seller/" + reportDetail.reportTargetNo;
                move.innerHTML = reportDetail.memberId +" (" + reportDetail.memberNickname + ")";

            } else {
                move.innerHTML = reportDetail.memberId +" (" + reportDetail.memberNickname + ")";
            }
        }

        if(reportDetail.reportType == 'B'){
            move.classList.add('move');
            move.href = "/boards/" + reportDetail.boardType + "/" + reportDetail.reportTargetNo;
            move.innerHTML = "[ " + reportDetail.title + " ]";
        }

        if(reportDetail.reportType == 'P'){
            move.classList.add('move');
            move.href = "/posts/" + reportDetail.reportTargetNo;
            move.innerHTML = "[ " + reportDetail.title + " ]";
        }

        if(reportDetail.reportType == 'C'){ //커뮤니티 댓글
            move.classList.add('move');
            move.href = "/boards/" + reportDetail.boardType + "/" + reportDetail.commentBoardNo + "?cp=" + cp + "#co" + reportDetail.commentNo;
            move.innerHTML = "[ " + reportDetail.commentMemberId + " ]";
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
    td14Detail.innerHTML = reportDetail.reportReason;

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
    td16Detail.innerHTML = reportDetail.reportContent;


    tr6Detail.append(td15Detail, td16Detail);


    // 7)
    const tr7Detail = document.createElement('tr');
    const tr8Detail = document.createElement('tr');
    if(reportDetail.reportType != 'M'){
    
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
        td18Detail.innerHTML = reportDetail.content;
    
        tr8Detail.append(td18Detail);
    
    }

    // tr4 순서 바꿈
    tbodyDetail.append(tr1Detail, tr2Detail,  tr3Detail, tr5Detail, tr6Detail, tr4Detail, tr7Detail, tr8Detail);


    // 신고 처리용 값 가져오기  // 강제 탈퇴, 반려, 정지, 삭제 등등에 사용
    hiddenMemberNo = reportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
    hiddenContentNo = reportDetail.contentNo; // 게시글 정지, 반려용
    hiddenReportType = reportDetail.reportType;  // 게시글 정지, 반려용
    hiddenAuthority = reportDetail.authority; // 강제 탈퇴 시 글 삭제용 
    // hiddenReportNo = reportDetail.reportNo;  

    
    console.log("상세 모달---------");
    console.log("hiddenReportNo: " + hiddenReportNo);
    console.log("hiddenMemberNo: " + hiddenMemberNo);
    console.log("hiddenContentNo: " + hiddenContentNo);
    console.log("hiddenReportType: " + hiddenReportType);
    console.log("authority: " + hiddenAuthority);
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

    // 신고유형 : 게시글, 판매글, 댓글
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
            tdc6.style.textAlign = "left";
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
        // hiddenMemberNo = reportDetail.memberNo;  // 계정 강제탈퇴, 정지, 반려용
        // hiddenContentNo = reportDetail.contentNo; // 게시글 정지, 반려용
        // hiddenReportType = reportDetail.reportType; // 게시글 정지, 반려용

        // console.log("신고 누적 용 값---------");
        // console.log("hiddenMemberNo: " + hiddenMemberNo);
        // console.log("hiddenContentNo: " + hiddenContentNo);
        // console.log("hiddenReportType: " + hiddenReportType);

        accumModalClose();
        reportDetailModalOpen();
        // 상세 모달 
        selectReportDetail(hiddenReportNo);
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

        selectReportListEvent(numPage, i);
    }


    // 다음 페이지
    const nextPage = document.createElement('li');
    const maxPage = document.createElement('li');
    makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
    makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

    adminPagination.append(nextPage, maxPage);
    adminPaginationArea.append(adminPagination);

    selectReportListEvent(firstPage, 1);
    selectReportListEvent(prevPage, pagination.prevPage);
    selectReportListEvent(nextPage, pagination.nextPage);
    selectReportListEvent(maxPage, pagination.maxPage);


}


//todo: 필터 드롭다운 메뉴
//fix: 페이지네이션 이후에 수정하기! 드롭다운 메뉴 동시에 열림..
const dropBtn = document.getElementById("dropBtn");
const dropBtn2 = document.getElementById("dropBtn2");
const dropMenu = document.getElementById("dropMenu");
const dropMenu2 = document.getElementById("dropMenu2");

dropBtn.addEventListener("click", () => {
    dropMenu.classList.toggle("toggle");
    dropMenu2.classList.remove("toggle");
})

dropBtn2.addEventListener("click", () => {
    dropMenu2.classList.toggle("toggle");
    dropMenu.classList.remove("toggle");
})


const dropUl = document.getElementById("dropUl");
const dropUl2 = document.getElementById("dropUl2");

dropUl.addEventListener("click", () => {
    dropMenu.classList.toggle("toggle");
})

dropUl2.addEventListener("click", () => {
    dropMenu2.classList.toggle("toggle");
})





// HTML 문서가 모두 읽어진 후에 selectReportList() 호출!

// --jsp
// optimize : 페이지박스 각각에 cp 값 추가 + 전체 회원 조회
const pageBox = document.getElementsByClassName("page-box");
for(let page of pageBox){
    page.addEventListener('click', () => {
        let cp = page.id;
        selectReportList(cp);
    })
}


// -- ajax
// 2페이지 이후, ajax로 조회할 때 다른 페이지로 이동하기 위해! -> printPagination() 에서 사용
//optimize: 페이지네이션 박스 클릭하면, 전체 회원 조회 
const selectReportListEvent = (element, cp) => {
    element.addEventListener('click', () => {
        numCount = (cp-1)*15;
        selectReportList(cp);
    })
}



// todo: 필터링 옵션 별로 조회  - sortFilter
const up = document.getElementById('up');
const down = document.getElementById('down');

up.addEventListener('click', () => {
    numCount = (cp-1)*15;
    sortFilter = 'down';
    selectReportList(cp);

    up.style.display = 'none';
    down.style.display = 'inline-block';

    // 누적 횟수 필터 누르면 필터창 꺼짐
    dropMenu.classList.remove("toggle");
    dropMenu2.classList.remove("toggle");
})


down.addEventListener('click', () => {
    numCount = (cp-1)*15;
    sortFilter = 'up';
    selectReportList(cp);

    down.style.display = 'none';
    up.style.display = 'inline-block';

    // 누적 횟수 필터 누르면 필터창 꺼짐
    dropMenu.classList.remove("toggle");
    dropMenu2.classList.remove("toggle");
})


// todo: 필터링 옵션 별로 조회  - typeFilter
const dropBtnText = document.getElementById("dropBtnText");
const dropBtn2Text = document.getElementById("dropBtn2Text")

document.getElementById("t0").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 0;  
    selectReportList();
    dropBtnText.innerText = "유형";
})

document.getElementById("t1").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 1;  
    selectReportList();
    dropBtnText.innerText = "일반회원";
})

document.getElementById("t2").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 2;  
    selectReportList();
    dropBtnText.innerText = "판매자";
})

document.getElementById("t3").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 3;  
    selectReportList();
    dropBtnText.innerText = "판매글";
})

document.getElementById("t4").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 4;  
    selectReportList();
    dropBtnText.innerText = "게시글";
})

document.getElementById("t5").addEventListener("click", ()=>{
    numCount = (cp-1)*15;
    typeFilter = 5;  
    selectReportList();
    dropBtnText.innerText = "댓글";
})



// todo: 필터링 옵션 별로 조회  - processFilter
document.getElementById("p0").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 0;  
    selectReportList();
    dropBtn2Text.innerText = "처리 상태";
});
document.getElementById("p1").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 1;  
    selectReportList();
    dropBtn2Text.innerText = "접수";
});
document.getElementById("p2").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 2;  
    selectReportList();
    dropBtn2Text.innerText = "반려";
});
document.getElementById("p3").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 3;  
    selectReportList();
    dropBtn2Text.innerText = "정지";
});
document.getElementById("p4").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 4;  
    selectReportList();
    dropBtn2Text.innerText = "탈퇴";
});
document.getElementById("p5").addEventListener('click', ()=>{
    numCount = (cp-1)*15;
    processFilter = 5;  
    selectReportList();
    dropBtn2Text.innerText = "삭제";
});









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

    axios.patch('/report/M/'+hiddenMemberNo+'/kickout',{
        params: {"authority":hiddenAuthority},
    })
    .then((response) => { // 성공
        const result = response.data;
        if(result > 0){
            reportDetailModalClose();
            selectReportList(cp);
            
            console.log("강제 탈퇴 완료");
            messageModalOpen("해당 계정이 강제 탈퇴되었습니다.");

        } else {
            console.log("강퇴 처리 실패");
        }

    }).catch(() => {
        console.log("강퇴 처리 오류");
        messageModalOpen("오류 발생");
    });


    // $.ajax({
    //     url: "/report/kickout",
    //     data: { "hiddenNo": hiddenMemberNo, "authority":hiddenAuthority},
    //     type: "POST",
    //     success: (result) => {
    //         if(result > 0){
    //             reportDetailModalClose();

    //             selectReportList(cp);
                
    //             console.log("강제 탈퇴 완료");
    //             messageModalOpen("해당 계정이 강제 탈퇴되었습니다.");

    //             //fixme: 시간 남을 때 모달이랑, 스크롤 위치 수정

            
    //         } else {
    //             console.log("강퇴 처리 실패");
    //         }
    //     },
    //     error: () => {
    //         console.log("강퇴 처리 오류");
    //         messageModalOpen("오류 발생");
    //     }
    // });
})


// * (계정) 반려 
accountLeaveBtn.addEventListener('click', () => {
    console.log("계정 반려 클릭");

    axios.patch('/report/M/'+hiddenMemberNo+'/hold')
    .then((response) => { // 성공
        const result = response.data;
        if(result > 0){
            reportDetailModalClose();
            selectReportList(cp);

            console.log("계정 반려");
            messageModalOpen("해당 계정이 활성화 상태를 유지합니다.");

        } else {
            console.log("계정 반려 실패");
        }

    }).catch(() => {
        console.log("계정 반려 오류");
        messageModalOpen("오류 발생");
    });
    

    // $.ajax({
    //     url: "/report/leaveAccount",
    //     data: {"hiddenNo":hiddenMemberNo},
    //     type: "POST",
    //     success: (result) => {
    //         if(result > 0){
    //             reportDetailModalClose();
    //             selectReportList(cp);

    //             console.log("계정 반려");
    //             messageModalOpen("해당 계정이 활성화 상태를 유지합니다.");
    //         }
    //     },
    //     error: () => {
    //         console.log("계정 반려 오류");
    //         messageModalOpen("오류 발생");
    //     }
    // })
})


// * (계정) 정지
accountBannedBtn.addEventListener('click', () => {
    console.log("계정 정지 클릭");

    axios.patch('/report/M/'+hiddenMemberNo+'/suspension')
    .then((response) => { // 성공
        const result = response.data;
        if(result > 0){
            reportDetailModalClose();
            selectReportList(cp);

            console.log("계정 정지");
            messageModalOpen("해당 계정이 7일간 정지됩니다.")

        } else {
            console.log("계정 정지 실패");
        }

    }).catch(() => {
        console.log("계정 정지 오류");
        messageModalOpen("오류 발생");
    });


    // $.ajax({
    //     url: "/report/bannedAccount",
    //     data: {"hiddenNo":hiddenMemberNo},
    //     type: "POST",
    //     success: (result) => {
    //         if(result > 0){
    //             reportDetailModalClose();
    //             selectReportList(cp);

    //             console.log("계정 정지");
    //             messageModalOpen("해당 계정이 7일간 정지됩니다.")
    //         }
    //     },
    //     error: () => {
    //         console.log("계정 정지 오류");
    //         messageModalOpen("오류 발생");
    //     }
    // })
})



// B, P 나눠야 함.
// * (게시글) 삭제 : 판매글, 커뮤니티 게시글, 커뮤니티 댓글
contentDeleteBtn.addEventListener('click', () => {
    console.log("게시글 삭제 클릭");

    axios.patch('/report/'+hiddenReportType+'/'+hiddenContentNo+'/delete')
    .then((response) => { // 성공
        const result = response.data;
        if(result > 0){
            reportDetailModalClose();
            selectReportList(cp);

            console.log("게시글/댓글 삭제");
            messageModalOpen("해당 게시글/댓글이 삭제되었습니다.")

        } else {
            console.log("게시글/댓글 삭제 실패");
        }

    }).catch(() => {
        console.log("게시글/댓글 삭제 오류");
        messageModalOpen("오류 발생");
    });

    // $.ajax({
    //     url: "/report/deleteContent",
    //     data: {"hiddenContentNo":hiddenContentNo, "reportType":hiddenReportType},
    //     type: "GET",
    //     success: (result) => {
    //         if(result > 0){
    //             reportDetailModalClose();
    //             selectReportList(cp);

    //             console.log("게시글 삭제");
    //             messageModalOpen("해당 게시글이 삭제되었습니다.")
    //         }
    //     },
    //     error: () => {
    //         console.log("게시글 삭제 오류");
    //         messageModalOpen("오류 발생");
    //     }
    // })
})



// * (게시글) 반려
contentLeaveBtn.addEventListener('click', () => {
    console.log("게시글 반려 클릭");
    // console.log(hiddenContentNo);

    axios.patch('/report/'+hiddenReportType+'/'+hiddenContentNo+'/hold')
    .then((response) => { // 성공
        const result = response.data;
        if(result > 0){
            reportDetailModalClose();
            selectReportList(cp);

            console.log("게시글/댓글 반려");
            messageModalOpen("해당 게시글/댓글이 활성화 상태를 유지합니다.")

        } else {
            console.log("게시글/댓글 반려 실패");
        }

    }).catch(() => {
        console.log("게시글/댓글 반려 오류");
        messageModalOpen("오류 발생");
    });




    // $.ajax({
    //     url: "/report/LeaveContent",
    //     data: {"hiddenContentNo":hiddenContentNo, "reportType":hiddenReportType},
    //     type: "GET",
    //     success: (result) => {
    //         if(result > 0){
    //             reportDetailModalClose();
    //             selectReportList(cp);

    //             console.log("게시글 반려");
    //             messageModalOpen("해당 게시글이 활성화 상태를 유지합니다.")
    //         }
    //     }, 
    //     error: () => {
    //         console.log("게시글 반려 오류");
    //         messageModalOpen("오류 발생");
    //     } 
    // })
})



// todo: 검색하기
// 1) 아이콘 눌러서검색
document.getElementById("reportSearchBtn").addEventListener('click', () => {
    doSearch();
})

// 2) 엔터키로 검색
document.getElementById("reportSearchKeyword").addEventListener('keydown', (e) => {

    const keyCode = e.keyCode;

    if(keyCode == 13){  // 엔터키
        doSearch();
    } 
})

// 검색하는 함수
const doSearch = () => {
    numCount = (cp-1)*15;  //순번 정렬
    keyword = document.getElementById("reportSearchKeyword").value; // 입력한 검색어 

    
    // 재검색 시, 초기화
    if((typeFilter > 0 || processFilter > 0) && keyword !=null){
        typeFilter = 0;
        processFilter = 0;
        document.getElementById("dropBtnText").innerText = "유형";
        document.getElementById("dropBtn2Text").innerText = "처리 상태";
    }
    
    selectReportList(cp);
}
