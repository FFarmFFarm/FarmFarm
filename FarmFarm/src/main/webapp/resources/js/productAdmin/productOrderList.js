var orgin

// -------------------------------------------------
// ---------------------기간조회----------------------
// -------------------------------------------------


// 기간 검색 조회
const searchPeriod = document.getElementById("searchPeriod");

searchPeriod.addEventListener("click", ()=>{
  
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  
  let cp = 1;

  selectSearchList(cp, startDate, endDate);
  
  console.log(startDate);
  console.log(endDate);
  
});


// 지난달 마지막 날짜 형식 지정('yyyy-mm-dd')
const lastMonth = ()=>{

  date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth()+1 ;

  // 1월일 경우 month == 1 / 작년으로 변경
  if(month==1){
    year --;
    month = 12;
  }

  day = new Date(year, month, 0).getDate();

  // 01월 01일 같은 경우 숫자 앞에 0 붙여주고 끝에서 두 숫자만 추출
  month = ("0"+month).slice(-2);

  return year + "-" + month + "-" + day;
};

// 이번달 오늘 형식 지정('yyyy-mm-dd')
const thisMonth = ()=>{

  date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 01월 01일 같은 경우 숫자 앞에 0 붙여주고 끝에서 두 숫자만 추출
  month = ("0"+month).slice(-2);
  day = ("0"+day).slice(-2);

  return year + "-" + month + "-" + day;
};


// 단위 기간 조회
const dateFilter = document.querySelectorAll("[name='dateFilter']");

for(let i of dateFilter){

  i.addEventListener("click", ()=>{

    let cp = 1;

    switch(i.value){
      case '0' : // 당월조회
        // 2023-01-01 ~ 2023-01-09

        let thisStartDate = thisMonth().slice(0,7);
        thisStartDate = thisStartDate + "-01";

        let thisEndDate = thisMonth();

        console.log(thisStartDate, thisEndDate);
        selectSearchList(cp, thisStartDate, thisEndDate);
        
        document.getElementById("startDate").value = thisStartDate;
        document.getElementById("endDate").value = thisEndDate;
        
        
        break;
        
      case '1' : // 전월조회
        // 2022-12-01 ~ 2022-12-31
        
        let lastStartDate = lastMonth().slice(0,7);
        lastStartDate = lastStartDate + "-01";
        
        let lastEndDate = lastMonth();
        
        selectSearchList(cp, lastStartDate,lastEndDate);
        
        document.getElementById("startDate").value = lastStartDate;
        document.getElementById("endDate").value = lastEndDate;

        break;

      case '2' : // 전체조회

        selectSearchList(cp);

        break;

    }

  })

};



// 검색버튼 event
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", ()=>{

  let cp = 1;

  let key = document.getElementById("searchKey").value;
  let query = document.getElementById("searchQuery").value;

  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if(query == ""){
    messageModalOpen("검색어를 입력해주세요");
  } else {

    // 검색어가 있는 경우
    selectSearchList(cp, startDate, endDate, key, query);
  }
  

});


// 기간에 따라서 목록 조회해오는 ajax + 검색 결과
const selectSearchList = (cp, startDate, endDate, key, query)=>{

  $.ajax({
    url: "/admin/orderList/period",
    dataType: "json",
    data: {
      "cp" : cp,
      "startDate": startDate,
      "endDate": endDate,
      "key": key,
      "query": query
    },
    success: (orderMap)=>{
      fillProductList(orderMap, startDate, endDate);

      if(query!=null){

        document.getElementById("searchQuery").value = query;
  
        const option = document.querySelectorAll("#searchKey>option");
        for(let op of option){
          if(op.value == key){
            op.selected = true;
          }
        }
      }
    },
    error: (orderMap)=>{
      console.log("기간 조회 실패");
    }

  });
}


// 주문목록 채우기
const fillProductList = (orderMap, startDate, endDate)=>{

  // map에서 꺼내기
  const orderList = orderMap.orderList;
  const pagination = orderMap.pagination;

  // 기간 조회 리스트 수
  const countListNo = document.querySelector(".count-list-no");
  countListNo.innerText = orderMap.orderListCount;

  const orderListResult = document.getElementById("orderListResult");
  
  // 페이지네이션 영역
  const paginationArea = document.querySelector('.pagination-area');
  
  // 영역 비우기
  orderListResult.innerHTML = "";
  paginationArea.innerHTML = "";

  // 조회결과 없을 경우
  if(orderList.length == 0){

    const noResultTr = document.createElement("tr");

    const noResult = document.createElement("th");
    noResult.classList.add("no-result");

    noResult.innerText = "조회 결과가 없습니다";

    noResultTr.appendChild(noResult);

    orderListResult.append(noResultTr);

  } else {

    // 조회결과 리스트 출력
    for(o of orderList){

      // 테이블 생성
      const tableInfo = document.createElement("tr");
      tableInfo.classList.add("table-row", "table-info");

      const orderNo = document.createElement("td");
      orderNo.classList.add("order-no");
      orderNo.id = o.orderNo;
      orderNo.innerText = o.orderNo;


      const orderDate = document.createElement("td");
      orderDate.innerText = o.orderDate;

      const memberId = document.createElement("td");
      memberId.innerText = o.memberId;

      const productCount = document.createElement("td");
      productCount.innerText = o.productCount;

      const productSum = document.createElement("td");
      productSum.innerText = o.productSum;

      const orderPrice = document.createElement("td");
      orderPrice.innerText = o.orderPrice;
      
      const orderStatus = document.createElement("td");

      // 주문 상태 선택
      switch (o.orderStatus) {
        case 0 :
          orderStatus.innerText = "결제완료";
          break;

        case 1 :
          orderStatus.innerText = "배송중";
          break;

        case 2 :
          orderStatus.innerText = "취소완료";
          break;

        case 3 :
          orderStatus.innerText = "구매확정";
          break;
      }

      tableInfo.append(orderNo, orderDate, memberId, productCount, productSum, orderPrice,orderStatus);
      
      orderListResult.append(tableInfo);
      
      tableInfo.addEventListener("click",()=>{

        showOrderDetail(orderNo.id);

      });
    }


    // 페이지네이션 

    // 이전 페이지
    const firstPage = document.createElement('div');
    const prevPage = document.createElement('div');
    makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
    makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');
    
    paginationArea.append(firstPage, prevPage);

    // 번호 페이지 제작
    for(let i=pagination.startPage; i<=pagination.endPage; i++) {

        const numPage = document.createElement('div');

        if(i == pagination.currentPage) {
            makePageBox(numPage, i, i, 'current-page-box');
        } else {
            makePageBox(numPage, i, i, 'page-box');
        }

        paginationArea.append(numPage);
    }
    
    // 이후 페이지 제작
    const nextPage = document.createElement('div');
    const maxPage = document.createElement('div');

    makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
    makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

    paginationArea.append(nextPage, maxPage);

    const orderListSection = document.querySelector(".order-list-section");

    orderListSection.append(paginationArea);

    // 페이지 이벤트 생성
    makePageBoxEvent(startDate, endDate);


  }

};


// 페이지 박스 만드는 함수
const makePageBox = (elementName, inputHtml, inputId, className) => {
  elementName.innerHTML = inputHtml;
  elementName.id = inputId;
  elementName.classList.add(className);
}


// 페이지 선택 이벤트
const makePageBoxEvent = (startDate, endDate) => {
  const pageBoxList = document.getElementsByClassName('page-box');

  for (let pageBox of pageBoxList) {
    pageBox.addEventListener('click', () => {
        
      // 페이지 선택
      let cp = pageBox.id;

      if(cp == ""){
        cp = 1;
      }

      let key = document.getElementById("searchKey").value;
      let query = document.getElementById("searchQuery").value;

      // 선택한 정보로 페이지를 생성
      selectSearchList(cp, startDate, endDate, key, query);

    })
  }
}




// -------------------------------------------------
// -------------------주문상세조회---------------------
// -------------------------------------------------


const tableRow = document.getElementsByClassName("table-info");

// 주문 상세조회 모달창
const orderDetail = document.getElementById("orderDetail");

// 배송 상세조회 모달창
const deliveryDetail = document.getElementById("deliveryDetail");

// 상세조회 모달창 띄우기 이벤트
for(let i=0; i<tableRow.length; i++){
  tableRow[i].addEventListener("click",()=>{

    let orderNo = document.getElementsByClassName("order-no")[i].id;

    showOrderDetail(orderNo);


  })
};



// 상세조회 함수
const showOrderDetail = (orderNo) => {

  const orderDetailBody = document.getElementById("orderDetailBody");
  orderDetailBody.innerHTML = "";
  
  let invoiceNo = document.getElementById("invoiceNo");
  invoiceNo.value = "";
  invoiceNo.disabled=false;
  
  let orderStatus = document.getElementById("orderStatus");
  orderStatus.value = "";
  
  // 송장번호 관련 버튼
  const invoiceBtn= document.querySelector(".invoice-btn");
  invoiceBtn.innerHTML = "";
  
  
  $.ajax({
    url: "/admin/orderDetail",
    data: {"orderNo": orderNo},
    dataType: "json",
    success: (order)=>{
  
      // 기본정보 출력
      document.getElementById("orderDetailNo").innerText = order.orderNo;
      document.getElementById("orderDetailDate").innerText = order.orderDate;
      orderStatus.value = order.orderStatus;
  
      orgin = order.orderStatus;
  
      
      
      // 결제완료일 경우 등록 버튼
      if(order.orderStatus == 0){
        
        const enrollBtn = document.createElement("button");
        enrollBtn.id = "enrollBtn";
  
        enrollBtn.innerText = "입력";
        invoiceBtn.append(enrollBtn);
  
        // 클릭하면 송장 등록
        enrollBtn.addEventListener("click", ()=>{
          
          enrollInvoice(order.orderNo, invoiceNo.value);
        })
      };
  
      // 배송중, 구매확정일 경우 배송조회 버튼
      if(order.orderStatus == 1 || order.orderStatus == 3){
  
        invoiceNo.value =order.invoiceNo;
  
        const viewDelivery = document.createElement("button");
        viewDelivery.id = "viewDelivery";
        viewDelivery.innerText= "배송조회";
  
        invoiceNo.disabled=true;
  
        invoiceBtn.append(viewDelivery);
  
        // 클릭하면 배송조회
        viewDelivery.addEventListener("click", ()=>{
          
          selectDeliveryDetail(order.invoiceNo);
        })
  
      };
  
      // 주문 취소일 경우 버튼 x
      if(order.orderStatus == 2){
  
        invoiceNo.disabled=true;
        invoiceNo.value = "-";
      };
  
      document.getElementById("memberName").innerText = order.memberName;
      document.getElementById("memberTel").innerText 
      = order.memberTel.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/\-{1,2}$/g, "");
      document.getElementById("orderAddress").innerText = order.orderAddress;
      
      const productList = order.productList;
      
      
      for(let product of productList){
        const orderTableRow = document.createElement("tr");
        orderTableRow.classList.add("order-table-row");
  
        const orderProduct = document.createElement("td");
        orderProduct.classList.add("order-product");
  
        const productImg = document.createElement("div");
        productImg.classList.add("product-img");
  
        const img = document.createElement("img");
        img.src = product.productImgAddress;
  
        productImg.append(img);
  
        const productName = document.createElement("span");
        productName.classList.add("product-name");
        productName.innerText = product.productName;
  
        orderProduct.append(productImg, productName);
  
        const productPrice = document.createElement("td");
        productPrice.innerText = Number(product.productPrice).toLocaleString();
  
        const productAmount = document.createElement("td");
        productAmount.innerText = product.productAmount;
  
        const productSum = document.createElement("td");
        productSum.innerText = (product.productPrice * product.productAmount).toLocaleString();
  
        const deliveryCost = document.createElement("td");
        deliveryCost.innerText = "3,000";
  
        const totalSum = document.createElement("td");
        totalSum.innerText = (product.productPrice * product.productAmount + 3000).toLocaleString();
  
        const won = document.createElement("span");
        won.innerText = "원";
  
        totalSum.append(won);
  
  
        // 반품상태 조회
        const status = product.productStatus;
        let str;
        switch(status){
          case 0 : str= "-"; break;
          case 1 : str= "반품진행중"; break;
          case 2 : str= "반품완료"; break;
          case 3 : str= "반려"; break;
        }
        const cancelStatus = document.createElement("td");
        cancelStatus.innerText = str;
  
        orderTableRow.append(cancelStatus);
  
        orderTableRow.append(orderProduct, productPrice, productAmount, 
                            productSum, deliveryCost, totalSum, cancelStatus);
  
        orderDetailBody.append(orderTableRow);
  
      }
    }
  
  })
  displayFlex(orderDetail);

};

  



// 모달 뒤로가기 버튼
const detailBackBtn = document.getElementById('detailBackBtn');
if(detailBackBtn!=undefined){
  
  detailBackBtn.addEventListener('click', () => {
    displayNone(orderDetail);

  })
};


const deliveryBackBtn = document.getElementById('deliveryBackBtn');
if(deliveryBackBtn!=undefined){
  
  deliveryBackBtn.addEventListener('click', () => {
    displayNone(deliveryDetail);

  })
};



const orderStatus = document.getElementById("orderStatus");

orderStatus.addEventListener("change",(e)=>{
  // 원래 체크된 옵션
  
  let orderNo = document.getElementById("orderDetailNo").innerText;

  if(e.target.value != origin){
    console.log(e.target.value);
    
    $.ajax({
      url: "/admin/orderStatus",
      data: {"oStatus" : e.target.value,
            "orderNo" : orderNo},
      type: "GET",
      success: (result)=>{
        if(result>0){
          messageModalOpen("주문 상태가 변경되었습니다.");
          setTimeout(() => {
            window.location.reload();
          }, "1000");
        }
      },
      error: ()=>{
        console.log("주문상태변경 실패");
      }
    })
  }
})


// 송장 등록 함수
const enrollInvoice = (orderNo, invoiceNo)=>{

  $.ajax({
    url: "/admin/enrollInvoice",
    data: {"orderNo" : orderNo,
            "invoiceNo" : invoiceNo},
    type: "GET",
    success: (result)=>{
      if(result>0){
        messageModalOpen("송장번호가 입력되었습니다.");
        setTimeout(() => {
          window.location.reload();
        }, "1000");
      }
    },
    error: ()=>{
      console.log("송장번호 입력 실패");
    }
  })
  
}


// 배송조회 결과
const selectDeliveryDetail = (invoiceNo)=>{

  $.ajax({

    url: "https://apis.tracker.delivery/carriers/kr.cjlogistics/tracks/" + invoiceNo,
    dataType: "json",
    success: (result)=>{
      console.log(result);
      makeTracking(result);
      displayFlex(deliveryDetail); 
    },

    error:(result)=>{
      console.log(result.responseJSON.message);
    }

  })
}

// 배송 조회 함수
const makeTracking = (r)=>{

  const deliveryContent = document.getElementById("deliveryContent");
  deliveryContent.innerHTML = "";

  // 배송상태
  const deliveryStatus = document.createElement("div");
  deliveryStatus.classList.add("delivery-status");
  
  const state = document.createElement("h3");
  state.innerText = r.state.text;

  deliveryStatus.append(state);


  // 배송조회

  const tracking = document.createElement("ul");
  tracking.classList.add("tracking");

  const progress = r.progresses.reverse();

  for(let p of progress){

    const oneRow = document.createElement("li");
    oneRow.classList.add("one-row");

    const location = document.createElement("div");
    location.classList.add("location");

    const locationName = document.createElement("p");
    locationName.innerText = p.location.name;

    const locationTime = document.createElement("p");
    locationTime.classList.add("l-small");
    locationTime.innerText = p.time;

    location.append(locationName, locationTime);

    const description = document.createElement("div");
    description.classList.add("description");

    const statusText = document.createElement("p");
    statusText.innerText = p.status.text;

    const descriptionDetail = document.createElement("p");
    descriptionDetail.classList.add("l-small");
    descriptionDetail.innerText = p.description;

    description.append(statusText, descriptionDetail);

    oneRow.append(location, description);

    tracking.append(oneRow);
  
  }

  // 기본정보
  const trackingInfo = document.createElement("div");
  trackingInfo.classList.add("tracking-info");

  const infoTop = document.createElement("p");
  infoTop.classList.add("info-top");
  infoTop.innerText = "기본정보";

  const infoDetail = document.createElement("ul");
  infoDetail.classList.add("info-detail");


  // 받는사람
  const infoTo = document.createElement("li");
  infoTo.classList.add("one-info");

  const infoToSpan = document.createElement("span");
  infoToSpan.classList.add("info-title");
  infoToSpan.innerText = "받는사람";

  const infoToName = document.createElement("p");
  infoToName.innerText = r.to.name;

  infoTo.append(infoToSpan, infoToName);
  

  // 택배사
  const infoCompany = document.createElement("li");
  infoCompany.classList.add("one-info");

  const infoCompanySpan = document.createElement("span");
  infoCompanySpan.classList.add("info-title");
  infoCompanySpan.innerText = "택배사";

  const infoCompanyName = document.createElement("p");
  infoCompanyName.innerText = r.carrier.name;

  infoCompany.append(infoCompanySpan, infoCompanyName);


  // 송장번호
  const infoInvoice = document.createElement("li");
  infoInvoice.classList.add("one-info");

  const infoInvoiceSpan = document.createElement("span");
  infoInvoiceSpan.classList.add("info-title");
  infoInvoiceSpan.innerText = "송장번호";

  const infoInvoiceName = document.createElement("p");
  infoInvoiceName.innerText = r.carrier.id;

  infoInvoice.append(infoInvoiceSpan, infoInvoiceName);

  
  // 보내는 사람
  const infoFrom = document.createElement("li");
  infoFrom.classList.add("one-info");

  const infoFromSpan = document.createElement("span");
  infoFromSpan.classList.add("info-title");
  infoFromSpan.innerText = "보내는 사람";

  const infoFromName = document.createElement("p");
  infoFromName.innerText = r.from.name;

  infoFrom.append(infoFromSpan, infoFromName);

  infoDetail.append(infoTo, infoCompany, infoInvoice, infoFrom);

  trackingInfo.append(infoTop, infoDetail);


  deliveryContent.append(deliveryStatus, tracking, trackingInfo);
  

}

