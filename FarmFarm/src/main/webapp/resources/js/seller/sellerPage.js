const enrollPost = document.getElementById("enroll-post");

enrollPost.addEventListener("click", ()=>{
  location.href="/post/enroll";
});


// 상품 판매완료 버튼
const soldoutBtn = document.querySelectorAll(".soldout-btn");

for(let i=0; i<soldoutBtn.length; i++){
  soldoutBtn[i].addEventListener("click",()=>{
    const check =confirm("판매 완료 처리하시겠습니까?");
    if(check){
      console.log(soldoutBtn[i].getAttribute("id"));
      soldout(soldoutBtn[i].getAttribute("id"));
    } else {
      alert("취소되었습니다.");
    }
  });
}

const soldout = (postNo)=>{
  $.ajax({
    url: "/post/soldout",
    data: {"postNo" : postNo},
    type: "GET",
    success: (result)=>{
      if(result>0){
        alert("판매 완료 되었습니다.");
        window.location.reload();
      }
    },
    error: ()=>{
      console.log("완료처리 실패");
    }
  })
};