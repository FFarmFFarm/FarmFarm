
// 재고 변경
// const changeBtn = document.getElementsByClassName("change-btn");
const inputBtn = document.getElementsByClassName("input-btn");
const outputBtn = document.getElementsByClassName("output-btn");
const stock = document.getElementsByClassName("stock");

for(let i=0; i<inputBtn.length; i++) {
  inputBtn[i].addEventListener("click", () => {

    const stockUp = document.getElementsByClassName("stock-input")[i].value;
    let productNo = inputBtn[i].getAttribute("id");

    if(stockUp == 0) {
      alert("수량을 입력해주세요.");
    } else {
      $.ajax({
        url: "/admin/stockUp",
        data: {"stockUp": stockUp,
          "productNo": productNo},
        type: "GET",
        success: ()=>{
          messageModalOpen("입고되었습니다");
          setTimeout(() => {
            window.location.reload();
          }, "1000");
        },
        error:()=>{
          console.log("재고 입고 실패");
        }
      })
    }

  });
}

for(let i=0; i<outputBtn.length; i++){
  outputBtn[i].addEventListener("click", () => {
  
    const stockDown = document.getElementsByClassName("stock-output")[i].value;
    let productNo = outputBtn[i].getAttribute("id");
  
    if(stockDown == 0) {
      messageModalOpen("수량을 입력해주세요");
      
    } else {
      $.ajax({
        url: "/admin/stockDown",
        data: {"stockDown": stockDown,
              "productNo": productNo},
        type: "GET",
        success: ()=>{
          messageModalOpen("출고되었습니다");
          setTimeout(() => {
            window.location.reload();
          }, "1000");
        },
        error:()=>{
          console.log("재고 출고 실패");
        }
      })
      
    }

  });
}

// input placeholder에 0 세팅
const stockInput = document.getElementsByClassName("stock-input");
for(let item of stockInput){
  item.addEventListener("focus",()=>{
    item.setAttribute("placeholder", "");
  })
  item.addEventListener("focusout",()=>{
    item.setAttribute("placeholder", "0");
  })
}

const stockOutput = document.getElementsByClassName("stock-output");
for(let item of stockOutput){
  item.addEventListener("focus",()=>{
    item.setAttribute("placeholder", "");
  })
  item.addEventListener("focusout",()=>{
    item.setAttribute("placeholder", "0");
  })
}

// 상품 삭제 버튼
const deleteBtn = document.querySelectorAll(".delete-btn");

for(let i=0; i<deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click",()=>{
    const check =confirm("정말 삭제하시겠습니까?");
    if(check){
      // console.log(deleteBtn[i].getAttribute("id"));
      deletePost(deleteBtn[i].getAttribute("id"));
    } else {
      messageModalOpen("취소되었습니다");
    }
  });
}

const deletePost = (productNo)=>{
  $.ajax({
    url: "/admin/delete",
    data: {"productNo" : productNo},
    type: "GET",
    success: (result)=>{
      if(result>0){
        messageModalOpen("상품이 삭제되었습니다");
          setTimeout(() => {
            window.location.reload();
          }, "1000");
      }
    },
    error: ()=>{
      console.log("삭제처리 실패");
    }
  })
};

// 상품 수정 버튼
const updateBtn = document.querySelectorAll(".update-btn");

for(let i=0; i<updateBtn.length; i++){
  updateBtn[i].addEventListener("click",()=>{

    url = "/admin/update/"+ updateBtn[i].getAttribute("id")+ location.search;

    location.href= url;
  })
};


// 품절여부 결정 버튼
const soldOutBtn = document.getElementsByName("soldoutFl");

for(let i=0; i<soldOutBtn.length; i++){

  // 원래 체크된 옵션
  let origin = soldOutBtn[i].value;
  console.log(origin);
  
  const productNo = soldOutBtn[i].getAttribute("id");

  soldOutBtn[i].addEventListener("change",(e)=>{

    if(e.target.value != origin){
      console.log(e.target.value);
      
      $.ajax({
        url: "/admin/soldout",
        data: {"pStatus" : e.target.value,
              "productNo" : productNo},
        type: "GET",
        success: (result)=>{
          if(result>0){
          messageModalOpen("상품 상태가 변경되었습니다");
          setTimeout(() => {
            window.location.reload();
          }, "1000");
          }
        },
        error: ()=>{
          console.log("상태변경 실패");
        }
      })
    }
  });
}

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