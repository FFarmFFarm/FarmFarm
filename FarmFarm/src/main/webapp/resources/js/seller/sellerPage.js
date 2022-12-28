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

// 상품 삭제 버튼
const deleteBtn = document.querySelectorAll(".delete-btn");

for(let i=0; i<deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click",()=>{
    const check =confirm("정말 삭제하시겠습니까?");
    if(check){
      console.log(deleteBtn[i].getAttribute("id"));
      deletePost(deleteBtn[i].getAttribute("id"));
    } else {
      alert("취소되었습니다.");
    }
  });
}

const deletePost = (postNo)=>{
  $.ajax({
    url: "/post/delete",
    data: {"postNo" : postNo},
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

    url = "/post/" + updateBtn[i].getAttribute("id") +"/update?cp=" + cp ;

    location.href= url;
  })
};
