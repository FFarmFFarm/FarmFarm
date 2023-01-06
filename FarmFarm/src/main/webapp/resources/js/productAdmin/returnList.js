var orgin

const tableRow = document.getElementsByClassName("table-info");
const returnDetail = document.getElementById("returnDetail");
for(let i=0; i<tableRow.length; i++){
  tableRow[i].addEventListener("click",()=>{

    let returnNo = document.getElementsByClassName("return-no")[i].id;

    $.ajax({
      url: "/admin/returnDetail",
      data: {"returnNo": returnNo},
      dataType: "json",
      success: (returnDetail)=>{

        const returnDetailBody = document.getElementById("returnDetailBody");
        returnDetailBody.innerHTML = "";

        for(let i=0; i<returnDetail.length; i++){
          // 기본정보 출력
          document.getElementById("returnDetailNo").innerText = returnDetail[0].returnNo;
          document.getElementById("orderNo").innerText = returnDetail[0].orderNo;
  
          document.getElementById("returnStatus").value = returnDetail[0].returnStatus;
          orgin = returnDetail.returnStatus;
  
          document.getElementById("accountName").innerText = returnDetail[0].accountName;
          document.getElementById("accountNo").innerText = returnDetail[0].accountNo;

          const returnTableRow = document.createElement("tr");
          returnTableRow.classList.add("return-table-row");

          const productNo = document.createElement("td");
          productNo.innerText = returnDetail[i].productNo;

          const productName = document.createElement("td");
          productName.classList.add("product-name");
          productName.innerText = returnDetail[i].productName;
          
          const productPrice = document.createElement("td");
          productPrice.innerText = Number(returnDetail[i].productPrice).toLocaleString();

          const productAmount = document.createElement("td");
          productAmount.innerText = returnDetail[i].productAmount;

          const productSum = document.createElement("td");
          productSum.innerText = (returnDetail[i].productPrice * returnDetail[i].productAmount).toLocaleString();

          const won = document.createElement("span");
          won.innerText = "원";

          productSum.append(won);

          // 반품상태 조회
          const reason = returnDetail[0].returnReason;
          console.log(reason);
          let str;
          switch(reason){
            case "0" : str= "단순변심"; break;
            case "1" : str= "상품하자"; break;
          }
          document.getElementById("returnReason").innerText = str;

          returnTableRow.append(productNo, productName, productPrice, productAmount, productSum);
          returnDetailBody.append(returnTableRow);
        }
      }

    })
    displayFlex(returnDetail);
  })
};

// 모달 뒤로가기 버튼
const detailBackBtn = document.getElementById('detailBackBtn');
if(detailBackBtn!=undefined){
  
  detailBackBtn.addEventListener('click', () => {
    displayNone(returnDetail);

  })
};



const returnStatus = document.getElementById("returnStatus");

returnStatus.addEventListener("change",(e)=>{
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
