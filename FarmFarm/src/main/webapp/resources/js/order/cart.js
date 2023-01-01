const selectOne = document.getElementsByClassName("select-one");
const checkIcon = document.querySelectorAll("[name='checkIcon']");

const selectAll = document.querySelector("[name='selectAll']");
const checkAll = document.querySelector("[name='checkAll']");
let countCheck = selectOne.length;

// 체크박스 하나 체크할 때
for(let i=0; i<selectOne.length; i++){
  
  selectOne[i].addEventListener("change", (e) => {

    if(!e.target.checked){
      checkIcon[i].classList.remove("fa-solid");
      checkIcon[i].classList.add("fa-regular");
      e.target.checked = false;
      countCheck = countCheck-1;
      
      // 전체선택 해제
      selectAll.checked=false;
      checkAll.classList.remove("fa-solid");
      checkAll.classList.add("fa-regular");
    } else {
      checkIcon[i].classList.remove("fa-regular"); 
      checkIcon[i].classList.add("fa-solid");
      e.target.checked = true;
      countCheck = countCheck+1;

      // 선택된 체크와 전체 항목 수가 일치할 경우
      const selectChecked = document.querySelectorAll("[name='selectOne']:checked");
      
      if(selectOne.length==selectChecked.length){
        selectAll.checked=true;
        checkAll.classList.remove("fa-regular"); 
        checkAll.classList.add("fa-solid");
        
      }else{
          selectAll.checked=false;
          checkAll.classList.remove("fa-solid");
          checkAll.classList.add("fa-regular");
      }
    }
    document.querySelector(".count-check").innerText = countCheck;
  })

}

// 전체선택 체크박스
selectAll.addEventListener("change", (e) => {

  if(!e.target.checked){
    checkAll.classList.remove("fa-solid");
    checkAll.classList.add("fa-regular");
    countCheck = 0;
    for(let select of selectOne) {
      select.checked=false;
    }
    for(let checkbox of checkIcon){
      checkbox.classList.remove("fa-solid");
      checkbox.classList.add("fa-regular");
    }
  } else {
    countCheck = selectOne.length;
    checkAll.classList.remove("fa-regular"); 
    checkAll.classList.add("fa-solid");

    for(let select of selectOne) {
      select.checked=true;
    }
    for(let checkbox of checkIcon){
      checkbox.classList.remove("fa-regular"); 
      checkbox.classList.add("fa-solid");
    }
  }
  document.querySelector(".count-check").innerText = countCheck;
})


// 수량 변경
const minusBtn = document.getElementsByClassName("minus-btn");
const plusBtn = document.getElementsByClassName("plus-btn");
const stock = document.getElementsByName("stock");
const productAmount = document.getElementsByClassName("product-amount");
const productTotalPrice = document.getElementsByClassName("product-total-price");

// 수량 감소
for(let i=0; i<minusBtn.length; i++){
  minusBtn[i].addEventListener("click", (e) => {
    
    let productNo = document.getElementsByClassName("product-item")[i].id;
    stock[i].innerText="";

    if(Number(productAmount[i].value)>1){

      $.ajax({
        url: "/minusCart",
        data: {"productNo" : productNo,
              "memberNo" : memberNo},
        type: "GET",
        success: (result)=>{
          if(result>0){
            productAmount[i].value = Number(productAmount[i].value) - 1;
            productTotalPrice[i].innerText 
            = Number(productTotalPrice[i].innerText.replaceAll(',', ''))
            - Number(productTotalPrice[i].id.replaceAll(',', ''));

            productTotalPrice[i].innerText 
            = Number(productTotalPrice[i].innerText ).toLocaleString();
          }
        },
        error: ()=>{
          console.log("장바구니 수량 감소 실패");
        }
      })
    }
  })
}

// 수량 증가
for(let i=0; i<plusBtn.length; i++){
  plusBtn[i].addEventListener("click", (e) => {
    
    let productNo = document.getElementsByClassName("product-item")[i].id;
    
    if(Number(productAmount[i].value)<Number(stock[i].id)){
      $.ajax({
        url: "/plusCart",
        data: {"productNo" : productNo,
              "memberNo" : memberNo},
        type: "GET",
        success: (result)=>{
          if(result>0){
            productAmount[i].value = Number(productAmount[i].value) + 1;
            productTotalPrice[i].innerText 
            = Number(productTotalPrice[i].innerText.replaceAll(',', ''))
            + Number(productTotalPrice[i].id.replaceAll(',', ''));

            productTotalPrice[i].innerText 
            = Number(productTotalPrice[i].innerText ).toLocaleString();
          }
        },
        error: ()=>{
          console.log("장바구니 수량 증가 실패");
        }
      })
    }else{
      stock[i].innerText="* 해당 상품의 재고량을 초과할 수 없습니다.";
    }
  })
}


const totalPrice = document.getElementById("totalPrice");
const orderPrice = document.getElementById("orderPrice");

