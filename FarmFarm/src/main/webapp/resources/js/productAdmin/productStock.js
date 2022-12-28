
// 재고 변경
const changeBtn = document.getElementsByClassName("change-btn");

changeBtn[0].addEventListener("click", () => {

  const stockUp = document.getElementById("stockUp").value;
  let productNo = changeBtn[0].getAttribute("id");

  $.ajax({
    url: "/admin/stockUp",
    data: {"stockUp": stockUp,
      "productNo": productNo},
    type: "GET",
    success: ()=>{
      alert("입고되었습니다.");
      window.location.reload();
    },
    error:()=>{
      console.log("재고 입고 실패");
    }
  })

});

changeBtn[1].addEventListener("click", () => {

  const stockDown = document.getElementById("stockDown").value;
  let productNo = changeBtn[1].getAttribute("id");

  $.ajax({
    url: "/admin/stockDown",
    data: {"stockDown": stockDown,
          "productNo": productNo},
    type: "GET",
    success: ()=>{
      alert("출고되었습니다.");
      window.location.reload();
    },
    error:()=>{
      console.log("재고 출고 실패");
    }
  })

});

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

// 상품 삭제 버튼
const deleteBtn = document.querySelectorAll(".delete-btn");

for(let i=0; i<deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click",()=>{
    const check =confirm("정말 삭제하시겠습니까?");
    if(check){
      // console.log(deleteBtn[i].getAttribute("id"));
      deletePost(deleteBtn[i].getAttribute("id"));
    } else {
      alert("취소되었습니다.");
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
        alert("상품이 삭제되었습니다.");
        window.location.reload();
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

    url = "/admin/update/"+ updateBtn[i].getAttribute("id")+"?cp=" + location.search;

    location.href= url;
  })
};