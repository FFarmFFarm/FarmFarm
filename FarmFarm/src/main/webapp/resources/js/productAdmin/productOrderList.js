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

const tableRow = document.getElementsByClassName("table-info");
const orderDetail = document.getElementById("orderDetail");
for(let i=0; i<tableRow.length; i++){
  tableRow[i].addEventListener("click",()=>{

    let orderNo = document.getElementsByClassName("order-no")[i].id;

    $.ajax({
      url: "/admin/orderDetail",
      data: {"orderNo": orderNo},
      dataType: "json",
      success: (order)=>{

        const orderDetailBody = document.getElementById("orderDetailBody");
        orderDetailBody.innerHTML = "";

        // 기본정보 출력
        document.getElementById("orderDetailNo").innerText = order.orderNo;
        document.getElementById("orderDetailDate").innerText = order.orderDate;

        document.getElementById("orderStatus").value = order.orderStatus;
        orgin = order.orderStatus;

        if(order.invoiceNo!=null){
          document.getElementById("invoiceNo").value =order.invoiceNo;
        }

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

const enrollInvoice = document.getElementById("enrollInvoice");

enrollInvoice.addEventListener("click",()=>{

  let orderNo = document.getElementById("orderDetailNo").innerText;
  const invoiceNo = document.getElementById("invoiceNo").value;

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
})