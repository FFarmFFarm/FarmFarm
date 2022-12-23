
/* 링크 복사 */
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener('click', () => {
  const text = window.location.href;

  copy(text);

})



if(document.getElementById('wishBtn') != null) {

  /* 찜 버튼 클릭 이벤트*/
  const wishBtn = document.getElementById("wishBtn");
  wishBtn.addEventListener('click', (e)=>{

    const pathname = location.pathname;
    
    const productNo = pathname.slice(-1);
    
    if(wishBtn.classList.contains("wish-clicked")) {
      removeWish(productNo, wishBtn);
      
    } else {
      addWish(productNo, wishBtn);
    }
  })
}



/* 찜하기 */
const addWish = (productNo, wishBtn)=>{

  $.ajax({
    url: "/wish/add",
    data: {"productNo":productNo, "memberNo":memberNo},
    success: (result)=>{
      wishBtn.classList.remove("wish-unclicked");
      wishBtn.classList.add("wish-clicked");      
    },
    error: ()=>{
      console.log("찜 추가 중 오류 발생");
    }
  })
}; 

/* 찜취소 */
const removeWish = (productNo, wishBtn)=>{
  
  $.ajax({
    url: "/wish/remove",
    data: {"productNo":productNo, "memberNo":memberNo},
    success: (result)=>{
      wishBtn.classList.remove("wish-clicked");
      wishBtn.classList.add("wish-unclicked");      
    },
    error: ()=>{
      console.log("찜 취소 중 오류 발생");
    }
  })
}; 




/* 상품 옵션 */
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const productAmount = document.getElementById("productAmount");
const totalPrice = document.getElementById("totalPrice");
const temp = totalPrice.innerText;


/* 상품 수량 + 버튼 */
addBtn.addEventListener('click', () => {
  if(Number(productAmount.innerText) < Number(stock)){
    productAmount.innerText = Number(productAmount.innerText) + 1;
    totalPrice.innerText = temp.replace(",", "") * Number(productAmount.innerText)
    totalPrice.innerText= Number(totalPrice.innerText).toLocaleString();
  } else {
    const span = document.getElementById('stock');
    span.innerText = '해당 상품의 재고량을 초과할 수 없습니다.';
  }
  
})


/* 상품 수량 - 버튼  */
removeBtn.addEventListener('click', () => {
  if(Number(productAmount.innerText) > 1) {
    productAmount.innerText = Number(productAmount.innerText) - 1;
    totalPrice.innerText = temp.replace(",", "") * Number(productAmount.innerText);
    totalPrice.innerText= Number(totalPrice.innerText).toLocaleString();
    
    const span = document.getElementById('stock');
    span.innerText = '';
  }
})



/* 리뷰 이미지 클릭 시 리뷰 상세 조회 창 출력 */
const reviewImg = document.getElementsByClassName("review-one-img");
const reviewDetail = document.getElementById('reviewDetail');

for(let img of reviewImg) {
  img.addEventListener('click', () => {

    const reviewNo = img.id;

    selectReview(reviewNo, memberNo);

    setTimeout(()=>{
      displayflex(reviewDetail);
    }, "200")
  })
}

/* 리뷰 상세 조회창 뒤로가기 클릭 시 꺼짐 */
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', ()=>{
  displayNone(reviewDetail);
})


/* 리뷰 상세 조회 */
const selectReview = (reviewNo, memberNo)=> {

  if(memberNo == '') {
    memberNo = 0;
  }

  $.ajax({
    url: "/review/" + reviewNo,
    data: {"memberNo": memberNo},
    dataType: "json",
    success: (review)=>{
      console.log("리뷰 상세 조회 성공")

      /* 리뷰 모달창 내용 넣기 */
      newReview(review);
    },
    error: ()=>{
      console.log("리뷰 상세 조회 중 에러")
    }
  })

}

const newReview = (review)=>{
  const imgContainer = document.getElementById("imgContainer");
  const productThumbnail = document.getElementById("productThumbnail");
  const productName = document.getElementById("productName");
  const reviewContent = document.getElementById("reviewContent");
  const createDate = document.getElementById("createDate");
  const helpBtn = document.getElementById("helpBtn");

  imgContainer.innerHTML = '';

  console.log(review.imgList);

  /* 리뷰 이미지 슬라이드 만들기 */
  for(let image of review.imgList) {
    const div = document.createElement("div");
    div.classList.add('swiper-slide');

    const img = document.createElement("img");
    img.src = image.reviewImgPath;

    div.append(img);

    imgContainer.append(div);
  }

  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  /* 리뷰 상품 미리보기 */
  productThumbnail.src = review.productThumbnail;
  productName.innerText = review.productName;

  reviewContent.innerHTML = review.reviewContent;

  createDate.innerText = review.createDate;

  if(review.likeCheck == 1) {
    helpBtn.classList.add('clicked');
    helpBtn.classList.remove('unclicked');
  } else {
    helpBtn.classList.remove('clicked');
    helpBtn.classList.add('unclicked');
  }

};
