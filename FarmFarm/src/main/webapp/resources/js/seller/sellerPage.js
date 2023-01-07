const enrollPost = document.getElementById("enroll-post");

if(enrollPost!=undefined){
  enrollPost.addEventListener("click", ()=>{
    location.href="/post/enroll";
  });
}


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



// -------------------------------------------------------------
// ----------------------- 판매중인 글만 보기 -----------------------
// -------------------------------------------------------------


// 판매중인 물품만 보기 버튼
const onlySellList = document.getElementById("onlySellList");
const onlySellCheck = document.getElementById("onlySellCheck");
const memberNo = document.querySelector(".member-nickname").id;

// 버튼 클릭 시 페이지 생성 함수
onlySellCheck.addEventListener("change",()=>{

  // 페이지 초기화
  let cp = 1;

  if(onlySellCheck.checked){
    // 페이지 생성
    getSellList(cp, memberNo);

  } else {

    location.href="/seller/" + memberNo;

  }


});



// 판매중인 물품만 보는 함수
const getSellList = (cp, memberNo)=>{

  $.ajax({
    url: "/seller/" + memberNo + "/sell",
    data: {"cp" : cp,
          "memberNo" : memberNo},
    type: "GET",
    dataType: "json",
    success: (postMap)=>{

      // 판매글 리스트 생성
      createPostList(postMap);
      console.log(postMap);
      window.scrollTo(0,document.querySelector(".profile-container").scrollHeight)
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
      postTitle.href = "/post/" + post.postNo;
      postTitle.classList.add("post-title");
      postTitle.innerText = post.postTitle;

      const postStatus = document.createElement('span');
      postStatus.classList.add("post-status");
      postStatus.innerText = "판매중";

      postHead.append(postTitle, postStatus);

      const postPrice = document.createElement('div');
      postPrice.classList.add("post-price");
      postPrice.innerHTML = "가격 ";

      const unitPrice = document.createElement('span');
      unitPrice.innerText = Number(post.unitPrice).toLocaleString() + "원";

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
      buttonArea.classList.add("button-area");

      if(loginMemberNo == post.memberNo){
        // 판매완료 버튼
        const soldoutBtn = document.createElement('div');
        soldoutBtn.classList.add("soldout-btn");
        soldoutBtn.innerText = "판매완료";
        soldoutBtn.id = post.postNo;

        soldoutBtn.addEventListener('click', () => {
          soldoutConfirmOpen();

          document.getElementById('soldoutConfirmBtn').addEventListener('click', function () {
          
            soldout(soldoutBtn.id);
          })
        })

        // 판매글 수정 버튼
        const updateBtn = document.createElement('div');
        updateBtn.classList.add("update-btn");
        updateBtn.innerText = "판매글 수정";
        updateBtn.id = post.postNo;

        updateBtn.addEventListener('click', () => {

          url = "/post/" + updateBtn.id +"/update?cp=" + cp ;

          location.href= url;
        })


        // 판매글 삭제 버튼
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "판매글 삭제";
        deleteBtn.id = post.postNo;

        deleteBtn.addEventListener('click', () => {
          deletePostConfirmOpen();

          document.getElementById('deletePostConfirmBtn').addEventListener('click', function () {
          
            deletePost(deleteBtn.id);
          })
        })

        buttonArea.append(soldoutBtn, updateBtn, deleteBtn);
      } 

      postContent.append(postThumbnail, postTotal, buttonArea);

      postOne.append(postContent);

      postListContainer.append(postOne);
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

    postListContainer.append(paginationArea);

    // 페이지 이벤트 생성
    makePageBoxEvent();

  }

}


// 페이지 박스 만드는 함수
const makePageBox = (elementName, inputHtml, inputId, className) => {
  elementName.innerHTML = inputHtml;
  elementName.id = inputId;
  elementName.classList.add(className);
}


// 페이지 선택 이벤트
const makePageBoxEvent = () => {
  const pageBoxList = document.getElementsByClassName('page-box');

  for (let pageBox of pageBoxList) {
    pageBox.addEventListener('click', () => {
        
      // 페이지 선택
      let cp = pageBox.id;

      if(cp == ""){
        cp = 1;
      }

      // 선택한 정보로 페이지를 생성
      getSellList(cp, memberNo);

      // history에 저장
      makeHistory(cp, memberNo);
    })
  }
}


// 페이지 이동 없이 주소만 바꿔주기
const makeHistory = (cp, memberNo) => {
  const state = { 'memberNo': memberNo };
  const title = '';
  const url = '/seller/'+ memberNo +'/sell?&cp=' + cp;

  history.pushState(state, title, url)
}

