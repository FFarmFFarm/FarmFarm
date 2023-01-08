var orgin

(()=>{
  const select = document.getElementById("searchKey");
  const input = document.getElementById("searchQuery");
  const option = document.querySelectorAll("#searchKey>option");

  if(select!=null){
    const params = new URL(location.href).searchParams;

    const key = params.get("key");
    const query = params.get("query");

    input.value = query;

    for(let op of option){
      if(op.value == key){
        op.selected = true;
      }
    }
  }

})();


// -------------------------------------------------
// ---------------------기간조회----------------------
// -------------------------------------------------

// 날짜 형식 지정('yyyy-mm-dd')
const dateFormatter = (date)=>{

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // 01월 01일 같은 경우 숫자 앞에 0 붙여주고 끝에서 두 숫자만 추출
  month = ("0"+month).slice(-2);
  day = ("0"+day).slice(-2);

  return year + "-" + month + "-" + day;
};








// -------------------------------------------------
// -------------------주문상세조회---------------------
// -------------------------------------------------


const tableRow = document.getElementsByClassName("table-info");

// 주문 상세조회 모달창
const orderDetail = document.getElementById("orderDetail");

// 배송 상세조회 모달창
const deliveryDetail = document.getElementById("deliveryDetail");

for(let i=0; i<tableRow.length; i++){
  tableRow[i].addEventListener("click",()=>{

    let orderNo = document.getElementsByClassName("order-no")[i].id;

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
  })
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

