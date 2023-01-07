const enrollPost = document.getElementById("enroll-post");

enrollPost.addEventListener("click", ()=>{
  location.href="/post/enroll";
});

// 상품 판매완료confirm
const soldoutConfirmOpen = () => {
  const soldoutConfirm = document.getElementById('soldoutConfirm');
  displayFlex(soldoutConfirm);
};

// 상품 판매완료confirm 닫기
if (document.getElementById('soldoutCancelBtn') != undefined) {

  document.getElementById('soldoutCancelBtn').addEventListener('click', function () {
    const soldoutConfirm = document.getElementById('soldoutConfirm');
    displayNone(soldoutConfirm);
  })

};

// 상품 판매완료 버튼
const soldoutBtn = document.querySelectorAll(".soldout-btn");

for(let i=0; i<soldoutBtn.length; i++){
  soldoutBtn[i].addEventListener("click",()=>{
    soldoutConfirmOpen();

    document.getElementById('soldoutConfirmBtn').addEventListener('click', function () {
    
      console.log(soldoutBtn[i].getAttribute("id"));
      soldout(soldoutBtn[i].getAttribute("id"));
    })
    
  });
}

const soldout = (postNo)=>{
  $.ajax({
    url: "/post/soldout",
    data: {"postNo" : postNo},
    type: "GET",
    success: (result)=>{
      if(result>0){
        messageModalOpen("판매완료 처리되었습니다");
        setTimeout(() => {
          window.location.reload();
        }, "1000");
      }
    },
    error: ()=>{
      console.log("완료처리 실패");
    }
  })
};

// 상품 삭제 confirm
const deletePostConfirmOpen = () => {
  const deletePostConfirm = document.getElementById('deletePostConfirm');
  displayFlex(deletePostConfirm);
};

// 상품 삭제 confirm 닫기
if (document.getElementById('deletePostCancelBtn') != undefined) {

  document.getElementById('deletePostCancelBtn').addEventListener('click', function () {
    const deletePostConfirm = document.getElementById('deletePostConfirm');
    displayNone(deletePostConfirm);
  })

};

// 상품 삭제 버튼
const deleteBtn = document.querySelectorAll(".delete-btn");

for(let i=0; i<deleteBtn.length; i++){
  deleteBtn[i].addEventListener("click",()=>{
    deletePostConfirmOpen();

    document.getElementById('deletePostConfirmBtn').addEventListener('click', function () {
    
      console.log(deleteBtn[i].getAttribute("id"));
      deletePost(deleteBtn[i].getAttribute("id"));
    })
  
  });
}

const deletePost = (postNo)=>{
  $.ajax({
    url: "/post/delete",
    data: {"postNo" : postNo},
    type: "GET",
    success: (result)=>{
      if(result>0){
        messageModalOpen("상품이 삭제되었습니다.");
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

    url = "/post/" + updateBtn[i].getAttribute("id") +"/update?cp=" + cp ;

    location.href= url;
  })
};


// 판매중인 물품만 보기 버튼

// 버튼 클릭 시 페이지 생성 함수

// 판매중인 물품만 보는 함수
const getSellList = (cp)=>{

  $.ajax({
    url: "/seller/sell",
    data: {"cp" : cp,
          "postSoldOutFl": 0},
    type: "GET",
    dataType: "json",
    success: (postMap)=>{

      // 판매글 리스트 생성
      createPostList(postMap);
      window.scrollTo(0,document.querySelector(".mypage-nav").scrollHeight)
    },
    error: ()=>{
      console.log("판매중인 글 조회 실패");
    }
  })
}


// 판매글 리스트 생성
const createPostList = (postMap)=>{

  // map에서 postList와 pagination 꺼내서 변수에 담기
  const postList = postMap.postList;
  const pagination = postMap.pagination;

  // 리스트가 들어갈 영역
  const postListContainer= document.querySelector(".post-list-container");

  // 페이지네이션 영역
  const paginationArea = document.querySelector('.pagination-area');
 
  // 영역 비우기
  postListContainer.innerHTML ="";
  paginationArea.innerHTML ="";

  if(postList.length==0){
    // 결과가 없으면
    const resultEmpty = document.createElement('div');
    resultEmpty.classList.add("no-list");

    const resultEmptyComment = document.createElement('span');
    resultEmptyComment.innerText = "판매 중인 글이 없습니다.";

    resultEmpty.appendChild(resultEmptyComment);
    postListContainer.append(resultEmpty);

  } else{
    // 결과 있으면

    for(post of postList){
      // 리스트 1개
      const postOne = document.createElement('div');
      postOne.classList.add("post-one");
  
      const postContent = document.createElement('div');
      postContent.classList.add("post-content");
  

      // 1) 섬네일
      const postThumbnail = document.createElement('div');
      postThumbnail.classList.add("post-thumbnail");
  
      const postThumbnailImg = document.createElement('img');
      postThumbnailImg.classList.add("post-thumbnail-img");
      postThumbnailImg.src = post.postImgAddress;

      postThumbnail.append(postThumbnailImg);


      // 2) 내용
      const postTotal = document.createElement('div');
      postTotal.classList.add("post-total");

      const postHead = document.createElement('div');
      postHead.classList.add("post-head");

      const postTitle = document.createElement('a');
      postTitle.classList.add("post-title");

      const postStatus = document.createElement('span');
      postStatus.classList.add("post-status");
      postStatus.innerText = "판매중";

      postHead.append(postTitle, postStatus);

      const postPrice = document.createElement('div');
      postPrice.classList.add("post-price");
      postPrice.innerText = "가격";

      const unitPrice = document.createElement('span');
      unitPrice.innerText = Number(post.unitPrice).toLocaleString + "원";

      postPrice.append(unitPrice);

      const postDetail = document.createElement('div');
      postDetail.classList.add("post-detail");

      const postRegDate = document.createElement('div');
      postRegDate.classList.add("post-reg-date");
      postRegDate.innerText = "작성일";
      
      const postDate = document.createElement('span');
      postDate.innerText = post.postDate;

      postRegDate.append(postDate);

      const postViewCount = document.createElement('div');
      postViewCount.classList.add("post-view-count");
      postViewCount.innerText = "조회수";

      const postView = document.createElement('span');
      postView.innerText = post.postView;

      postViewCount.append(postView);

      postDetail.append(postRegDate, postViewCount);

      postTotal.append(postHead, postPrice, postDetail);


      // 3) 버튼 부분

      const buttonArea = document.createElement('div');

      if(loginMemberNo == post.memberNo){
        // 판매완료 버튼
        const soldoutBtn = document.createElement('div');
        soldoutBtn.classList.add("soldout-btn");
        soldoutBtn.innerText = "판매완료";
        soldoutBtn.id = post.postNo;

        // 판매글 수정 버튼
        const updateBtn = document.createElement('div');
        updateBtn.classList.add("update-btn");
        updateBtn.innerText = "판매글 수정";
        updateBtn.id = post.postNo;

        // 판매글 삭제 버튼
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "판매글 삭제";
        deleteBtn.id = post.postNo;

        buttonArea.append(soldoutBtn, updateBtn, deleteBtn);
      }

      postContent.append(postThumbnail, postTotal, buttonArea);

      postOne.append(postContent);
    }

  }

}

