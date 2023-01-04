/*
판매자 정보 조회 (ajax) : selectSellerList(cp)

판매자 정보 출력 함수: printSellerList(sellerList, pagination)
페이지네이션 박스 생성 : printPagination(adminPagination, pagination)
페이지네이션 박스 클릭이벤트 추가 : selectSellerListEvent(element, cp)
*/

var numCount = 0;
var hiddenNo = 0;  // 인증신청서, 승인, 거부에 사용
// var hiddenId = null;


// optimize: 판매자 정보 조회 함수 ajax
const selectSellerList = (cp) => {
    $.ajax({
        url: "/admin/selectSellerList",
        data: {"cp": cp, "sellerFilter": sellerFilter},
        dataType: "JSON",
        type: "GET",
        success: (map) => {
            printSellerList(map.sellerList, map.pagination);
            console.log("판매자 정보 조회 성공");
        },

        error: () => { console.log("판매자 정보 조회 실패"); }

    });
}



// optimize: 인증 신청서 조회 함수 ajax
const selectAuthPaper = (hiddenNo) => {
    $.ajax({
        url: "/admin/selectAuthPaper",
        data: {"hiddenNo": hiddenNo},
        type: "POST",
        success: (authPaper) => {
            printSellerAuthPaper(authPaper);
            console.log("인증신청서 조회 성공");
        },
        error: () => {
            console.log("인증 신청서 조회 실패");
        }
    })
}




// optimize : 판매자 정보 출력 함수

const printSellerList = (sellerList, pagination) => {

    // 스크롤
    window.scrollTo({top: 0, behavior: 'smooth'});

    // 출력 전 내용 지우기
    const tbody = document.getElementById("tbody");
    tbody.innerText = "";  // 목록
    const adminPaginationArea = document.getElementById("adminPaginationArea");
    adminPaginationArea.innerText = ""; // 페이지박스

    
    for(let seller of sellerList) {
        
        /*아이디 10자
        닉네임 10자
        주소 25자*/ 
        
        // todo: 판매자 전체 조회
        const tr = document.createElement('tr');
        tr.className = 'auth-list-row';

        // no
        const td1 = document.createElement("td");
        td1.classList.add('member-seq');
        
        numCount++;
        td1.innerText = numCount;

        // 회원번호        
        const td2 = document.createElement("td");
        td2.innerText = seller.memberNo;

        // 아이디
        const td3 = document.createElement("td");
        td3.className = 'sId';

        if(seller.memberId.length > 10) {
            td3.innerText = seller.memberId.substring(0, 9) + '...';
        } else {
            td3.innerText = seller.memberId;
        }

        // 닉네임
        const td4 = document.createElement("td");
        td4.className = 'sNickname';

        if(seller.memberNickname.length > 10) {
            td4.innerText = seller.memberNickname.substring(0, 9) + '...';
        } else {
            td4.innerText = seller.memberNickname;
        }


        // 성명
        const td5 = document.createElement("td");
        td5.innerText = seller.memberName;

        // 주소
        const td6 = document.createElement("td");
        if(seller.memberAddress.length > 25){
            // sql에서 ,, 제거해서 가져옴
            td6.innerText = seller.memberAddress.substring(0,24) + '...';
        } else {
            td6.innerText = seller.memberAddress;
        }

        // 신청일자 == 가입일
        const td7 = document.createElement("td");
        td7.innerText = seller.signUpDate;

        // 판매자 인증
        const td8 = document.createElement("td");
       
        if(seller.authority == 3){ td8.innerText = "접수"; }
        if(seller.authority == 4){ td8.innerText = "보류"; }
        if(seller.authority == 1){ td8.innerText = "인증 완료"; }
        
        
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
        tbody.append(tr);


        // 한 줄 클릭하면 인증신청서 출력
        tr.addEventListener("click", () => {
            // hiddenId = seller.memberId;
            // console.log(hiddenId);
            // selectAuthPaper(hiddenId);
            hiddenNo = seller.memberNo;
            selectAuthPaper(hiddenNo);
        })
    }

        
    // todo: 페이지네이션 박스
    printPagination(adminPaginationArea, pagination);
}






// optimize: 인증신청서 조회
const printSellerAuthPaper = (authPaper) => {

    
    // 인증신청서 보이기
    document.getElementById("selectAuthPaperDiv").style.display = "block";
    
    // 스크롤 위치
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});

    const authImage = document.getElementById("authImage");
    const sellerAuthTable = document.getElementById("sellerAuthTable");

    // 내용 지우기
    // 증빙사진
    authImage.innerHTML = "";
    // 내용 
    sellerAuthTable.innerText = "";
    

    // * 인증신청서  --------------------
    // 증빙사진
    const img = document.createElement("img");

    // fixme: 인증 사진 저장 경로 확인하기!
    if(authPaper.farmImg != null) {
        img.src = '/resources/images/seller/' + authPaper.farmImg;
    } else {
        img.src = "/resources/images/logo-square.png";
    }

    //조립
    authImage.append(img);    



    //인증사진 클릭하면 원본 사진 보이기
    img.addEventListener("click", (e) => {
        window.open(e.target.src);
    })


    
    // -- 신청서 내용 
    // ? 앞에 회원 전체 조회 할때는 통째로 다시 만듦/
    // ? 이번에는 내용만 다시 만들어서 붙여보기!
    // 바로바로 조립
    // 회원번호
    const authTr1 = document.createElement("tr");
    const tdNo1 = document.createElement("td");
    tdNo1.classList.add("detail-bold");
    tdNo1.innerText = "회원번호";

    const tdNo2 = document.createElement("td");
    tdNo2.classList.add('detail-content');
    tdNo2.innerText = authPaper.memberNo;

    authTr1.append(tdNo1, tdNo2)


    // 아이디
    const authTr2 = document.createElement("tr");
    const tdId1 = document.createElement("td");
    tdId1.classList.add("detail-bold");
    tdId1.innerText = "아이디";

    const tdId2 = document.createElement("td");
    tdId2.classList.add('detail-content');
    tdId2.innerText = authPaper.memberId;

    authTr2.append(tdId1, tdId2);


    // 닉네임
    const authTr3 = document.createElement("tr");
    const tdNickname1 = document.createElement("td");
    tdNickname1.classList.add("detail-bold");
    tdNickname1.innerText = "닉네임";

    const tdNickname2 = document.createElement("td");
    tdNickname2.classList.add('detail-content');
    tdNickname2.innerText = authPaper.memberNickname;

    authTr3.append(tdNickname1, tdNickname2);


    // 성명
    const authTr4 = document.createElement("tr");
    const tdName1 = document.createElement("td");
    tdName1.classList.add("detail-bold");
    tdName1.innerText = "성명";

    const tdName2 = document.createElement("td");
    tdName2.classList.add('detail-content');
    tdName2.innerText = authPaper.memberName;

    authTr4.append(tdName1, tdName2);


    // 생년월일
    const authTr5 = document.createElement("tr");
    const tdBirth1 = document.createElement("td");
    tdBirth1.classList.add("detail-bold");
    tdBirth1.innerText = "생년월일";

    const tdBirth2 = document.createElement("td");
    tdBirth2.classList.add('detail-content');
    tdBirth2.innerText = authPaper.memberBirth;

    authTr5.append(tdBirth1, tdBirth2);


    // 연락처
    const authTr6 = document.createElement("tr");
    const tdTel1 = document.createElement("td");
    tdTel1.classList.add("detail-bold");
    tdTel1.innerText = "연락처";

    const tdTel2 = document.createElement("td");
    tdTel2.classList.add('detail-content');
    tdTel2.innerText = authPaper.to;

    authTr6.append(tdTel1, tdTel2);


    // 주소
    const authTr7 = document.createElement("tr");
    const tdAddress1 = document.createElement("td");
    tdAddress1.classList.add("detail-bold");
    tdAddress1.innerText = "주소";
    
    const tdAddress2 = document.createElement("td");
    tdAddress2.classList.add('detail-content');
    tdAddress2.innerText = authPaper.memberAddress;  // sql에서 ,, 제거해서 가져옴

    authTr7.append(tdAddress1, tdAddress2);


    // 가입일
    const authTr8 = document.createElement("tr");
    const tdSignUpDate1 = document.createElement("td");
    tdSignUpDate1.classList.add("detail-bold");
    tdSignUpDate1.innerText = "가입일";


    const tdSignUpDate2 = document.createElement("td");
    tdSignUpDate2.classList.add('detail-content');
    tdSignUpDate2.innerText = authPaper.signUpDate;

    authTr8.append(tdSignUpDate1, tdSignUpDate2);


    // 판매자 승인 일자
    const authTr9 = document.createElement("tr");
    const tdAuthDate1 = document.createElement("td");
    tdAuthDate1.classList.add("detail-bold");
    tdAuthDate1.innerText = "판매자 승인 일자";



    const tdAuthDate2 = document.createElement("td");
    tdAuthDate2.classList.add('detail-content');

    if(authPaper.authDate != null) {

        if(authPaper.authority == 1){ //판매자
            tdAuthDate2.innerText = authPaper.authDate;
        }

        if(authPaper.authority == 4){ // 인증 보류
            tdAuthDate2.innerText = "보류 (" + authPaper.authDate + ")";
        } //

    } else {
        tdAuthDate2.innerText = "승인 대기중";
    }
    
    // 승인 버튼
    const authApproveBtn = document.getElementById("authApproveBtn");

    // 이미 승인되어 판매자인 회원은, 승인버튼 비활성화
    if(authPaper.authDate != null && authPaper.authority == 1){
        authApproveBtn.style.backgroundColor = 'lightgray';
        authApproveBtn.style.cursor = 'default';
        authApproveBtn.disabled = true;
    }


    authTr9.append(tdAuthDate1, tdAuthDate2);

    // 전체 조립
    sellerAuthTable.append(authTr1, authTr2, authTr3, authTr4, authTr5, authTr6, authTr7, authTr8, authTr9)
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

        selectSellerListEvent(numPage, i);
    }


    // 다음 페이지
    const nextPage = document.createElement('li');
    const maxPage = document.createElement('li');
    makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
    makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

    adminPagination.append(nextPage, maxPage);
    adminPaginationArea.append(adminPagination);

    selectSellerListEvent(firstPage, 1);
    selectSellerListEvent(prevPage, pagination.prevPage);
    selectSellerListEvent(nextPage, pagination.nextPage);
    selectSellerListEvent(maxPage, pagination.maxPage);


}


// HTML 문서가 모두 읽어진 후에 selectSellerList() 호출!

// -- jsp
// optimize : 페이지박스 각각에 cp 값 추가 + 전체 회원 조회
const pageBox = document.getElementsByClassName("page-box");
for(let page of pageBox){
    page.addEventListener('click', () => {
        let cp = page.id;
        selectSellerList(cp);
    })
}

// -- ajax
// 2페이지 이후, ajax로 조회할 때 다른 페이지로 이동하기 위해! -> printPagination() 에서 사용
//optimize: 페이지네이션 박스 클릭하면, 전체 회원 조회 
const selectSellerListEvent = (element, cp) => {
    element.addEventListener('click', () => {
        numCount = (cp-1)*10;
        selectSellerList(cp);
    })
}



// todo: jsp 첫 페이지에서 한 줄 클릭시 인증신청서 조회
const authListRow = document.getElementsByClassName('auth-list-row');
// const hiddenMemberId = document.getElementsByClassName('hidden-memberId');
const hiddenMemberNo = document.getElementsByClassName('hidden-memberNo');

for(let i=0; i<authListRow.length; i++){
    authListRow[i].addEventListener('click', () => {
        // hiddenId = hiddenMemberId[i].value;
        // selectAuthPaper(hiddenId);
        hiddenNo = hiddenMemberNo[i].value;
        selectAuthPaper(hiddenNo);
    })
}




// todo: 필터링 옵션 별로 조회
const watingSellerBtn = document.getElementById('watingSellerBtn'); // 인증 대기중인 회원
const allSellerBtn = document.getElementById('allSellerBtn'); // 전체 판매자 보기

watingSellerBtn.addEventListener('click', () => {
    numCount = (cp-1)*15;
    sellerFilter = '0';
    selectSellerList();

    watingSellerBtn.style.display = 'none';
    allSellerBtn.style.display = 'block'; 
})


allSellerBtn.addEventListener('click', () => { 
    numCount = (cp-1)*15;
    sellerFilter = '1';
    selectSellerList();

    allSellerBtn.style.display = 'none';
    watingSellerBtn.style.display ='flex';
})




// todo: 판매자 승인 / 거부
// 승인 
document.getElementById('authApproveBtn').addEventListener('click', () => {
    
    $.ajax({
        url: '/admin/sellerApprove',
        data: {"hiddenNo": hiddenNo},
        type: 'POST',
        success: (result) => {

            if(result > 0){
                adminModalClose();

                selectSellerList(cp);
                selectAuthPaper(hiddenNo);

                console.log("승인 완료");
                messageModalOpen("승인 처리되었습니다.");
            }
        },
        error: () => {
            console.log("승인 처리 실패");
        }
    })
});



// fixme: 거부
document.getElementById('authDenyBtn').addEventListener('click', () => {

    $.ajax({
        url: '/admin/sellerDeny',
        data: {"hiddenNo": hiddenNo},
        type: 'POST',
        success: (result) => {

            if(result > 0){
                adminModalClose();

                selectSellerList(cp);
                selectAuthPaper(hiddenNo);

                console.log("거절 완료");
                messageModalOpen("판매자 인증이 보류되었습니다.");
            }
        },
        error: () => {
            console.log("보류 처리 실패");
        }
    })
})







// todo: 검색하기?






// todo: 전체 조회 글자 자르기 (jsp)
/*
유효성
아이디 6~20자
이름 2~10자
닉네임 2~10자


아이디 10자
주소 25자
닉네임 10자 
*/

// jsp 첫 페이지  글자 자르기
const sId = document.getElementsByClassName("sId");
for(let i=0; i<sId.length; i++){
    if(sId[i].innerText.length > 10){
        sId[i].innerText = sId[i].innerText.substring(0, 9) + '...';
    } else {
        sId[i].innerText;
    }
}

const sNickname = document.getElementsByClassName("sNickname");
for(let i=0; i<sNickname.length; i++){
    if(sNickname[i].innerText.length > 10){
        sNickname[i].innerText = sNickname[i].innerText.substring(0, 9) + '...';
    } else {
        sNickname[i].innerText;
    }
}

const sAddress = document.getElementsByClassName("sAddress");
for(let i=0; i<sAddress.length; i++){
    if(sAddress[i].innerText.length > 25){
        sAddress[i].innerText = sAddress[i].innerText.substring(0, 24) + '...';
    } else {
        sAddress[i].innerText;
    }
}
