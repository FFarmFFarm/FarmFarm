
/* -------------------------------------------------------------------------------------------------- */
/* 상품 관련 */
/* -------------------------------------------------------------------------------------------------- */


/* 링크 복사 */
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', () => {
  const text = window.location.href;

  copy(text);

  messageModalOpen("클립보드에 복사되었습니다.");
});

if (document.getElementById('wishBtn') != null) {
  /* 찜 버튼 클릭 이벤트*/
  const wishBtn = document.getElementById('wishBtn');
  wishBtn.addEventListener('click', (e) => {
    const pathname = location.pathname;

    const productNo = pathname.slice(-1);

    if (wishBtn.classList.contains('wish-clicked')) {
      removeWish(productNo, wishBtn);
    } else {
      addWish(productNo, wishBtn);
    }
  });
}

/* 찜하기 Function*/
const addWish = (productNo, wishBtn) => {
  $.ajax({
    url: '/wish/add',
    data: { productNo: productNo, memberNo: memberNo },
    success: (result) => {
      wishBtn.classList.remove('wish-unclicked');
      wishBtn.classList.add('wish-clicked');
    },
    error: () => {
      console.log('찜 추가 중 오류 발생');
    },
  });
};

/* 찜취소  Function*/
const removeWish = (productNo, wishBtn) => {
  $.ajax({
    url: '/wish/remove',
    data: { productNo: productNo, memberNo: memberNo },
    success: (result) => {
      wishBtn.classList.remove('wish-clicked');
      wishBtn.classList.add('wish-unclicked');
    },
    error: () => {
      console.log('찜 취소 중 오류 발생');
    },
  });
};

/* 상품 옵션 */
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const productAmount = document.getElementById('productAmount');
const totalPrice = document.getElementById('totalPrice');
const temp = totalPrice.innerText;

/* 상품 수량 + 버튼 */
addBtn.addEventListener('click', () => {
  if (Number(productAmount.innerText) < Number(stock)) {
    productAmount.innerText = Number(productAmount.innerText) + 1;
    totalPrice.innerText =
      temp.replace(',', '') * Number(productAmount.innerText);
    totalPrice.innerText = Number(totalPrice.innerText).toLocaleString();
  } else {
    const span = document.getElementById('stock');
    span.innerText = '해당 상품의 재고량을 초과할 수 없습니다.';
  }
});

/* 상품 수량 - 버튼  */
removeBtn.addEventListener('click', () => {
  if (Number(productAmount.innerText) > 1) {
    productAmount.innerText = Number(productAmount.innerText) - 1;
    totalPrice.innerText =
      temp.replace(',', '') * Number(productAmount.innerText);
    totalPrice.innerText = Number(totalPrice.innerText).toLocaleString();

    const span = document.getElementById('stock');
    span.innerText = '';
  }
});

// TODO
/* 주문하기 버튼 클릭하면 주문서 창으로 */
document.getElementById('orderBtn').addEventListener('click', () => { 
  if (loginMember == '') {
    loginConfirmOpen();
  }
})

// TODO
/* 장바구니 담기 클릭하면 장바구니로 */
document.getElementById('cartBtn').addEventListener('click', () => { 
  if (loginMember == '') {
    loginConfirmOpen();
  }
})


/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */













/* -------------------------------------------------------------------------------------------------- */
/* 리뷰 관련 */
/* -------------------------------------------------------------------------------------------------- */


/* 리뷰 더보기 이미지 클릭 시 이미지 리스트 창 출력 */
const lastReviewImg = document.querySelector('.last-review-img');
lastReviewImg.addEventListener('click', () => { 
  const reviewImgList = document.getElementById('reviewImgList');
  
  /* 사진 리뷰 목록 조회 */
  selectImgReview();
  
  displayflex(reviewImgList);
});

/* 리뷰 이미지 리스트 창 뒤로가기 버튼 클릭 시 닫힘 */
document.getElementById('imgListClose').addEventListener('click', () => {
  const reviewImgList = document.getElementById('reviewImgList');
  displayNone(reviewImgList);
})



/* 사진 리뷰 목록 조회  Function*/
const selectImgReview = () => { 
  const pathname = location.pathname;
  const productNo = pathname.slice(-1);

  $.ajax({
    url: "/review/imgList",
    data: { "productNo": productNo },
    dataType: "json",
    success: (reviewList) => {
      reviewImgList(reviewList);
    },
    error: () => { 
      console.log("사진 리뷰 목록 조회 중 에러 발생");
    }
  })
}


/* 사진 리뷰 목록 출력 Function */
const reviewImgList = (reviewList) => {
  const imgReviewList = document.getElementById('imgReviewList');
  imgReviewList.innerHTML = "";

  for (review of reviewList) {
    const div = document.createElement('div');
    div.classList.add("review-list-img");

    const img = document.createElement('img');
    img.id = review.reviewNo;
    img.src = review.imgList[0].reviewImgPath;
    div.append(img);

    imgReviewList.append(div);

    /* 이미지 하나 클릭 시 상세조회 창 출력 */
    div.addEventListener('click', function () { 

      const reviewDetail = document.getElementById('reviewDetail');

      const reviewNo = img.id;

      selectReview(reviewNo, memberNo);

      setTimeout(() => {
        displayflex(reviewDetail);
      }, '200');

    })
  }

  if (reviewList.length > 20) {
    const div = document.createElement('div');
    div.classList.add("pagination-area");

    const leftBtn = document.createElement('button');
    leftBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    const rightBtn = document.createElement('button');
    rightBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    div.append(leftBtn, rightBtn);
    imgReviewList.after(div);
  }
}




/* 리뷰 이미지 클릭 시 리뷰 상세 조회 창 출력 */
const reviewDetail = document.getElementById('reviewDetail');


// 리뷰 리스트 이미지
const reviewImg = document.getElementsByClassName('review-one-img');
for (let img of reviewImg) {
  img.addEventListener('click', () => {
    const reviewNo = img.id;

    selectReview(reviewNo, memberNo);

    setTimeout(() => {
      displayflex(reviewDetail);
    }, '200');
  });
}




/* 리뷰 상세 조회창 뒤로가기 클릭 시 꺼짐 */
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', () => {
  displayNone(reviewDetail);
});




/* 리뷰 상세 조회  Function*/
const selectReview = (reviewNo, memberNo) => {
  if (memberNo == '') {
    memberNo = 0;
  }

  $.ajax({
    url: '/review/select/' + reviewNo,
    data: { memberNo: memberNo },
    dataType: 'json',
    success: (review) => {
      console.log('리뷰 상세 조회 성공');

      /* 리뷰 모달창 내용 넣기 */
      newReview(review);
    },
    error: () => {
      console.log('리뷰 상세 조회 중 에러');
    },
  });
};


/* 리뷰 상세보기 Function*/
const newReview = (review) => {
  const imgContainer = document.getElementById('imgContainer');
  const productThumbnail = document.getElementById('productThumbnail');
  const productName = document.getElementById('productName');
  const reviewContent = document.getElementById('reviewContent');
  const createDate = document.getElementById('createDate');
  const helpBtn = document.getElementById('helpBtn');

  imgContainer.innerHTML = '';

  console.log(review.imgList);

  /* 리뷰 이미지 슬라이드 만들기 */
  for (let image of review.imgList) {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    const img = document.createElement('img');
    img.src = image.reviewImgPath;

    div.append(img);

    imgContainer.append(div);
  }

  var swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });



  /* 리뷰 상품 미리보기 */
  productThumbnail.src = review.productThumbnail;
  productName.innerText = review.productName;

  reviewContent.innerHTML = review.reviewContent;

  createDate.innerText = review.createDate;

  if (review.likeCheck == 1) {
    helpBtn.classList.add('clicked');
    helpBtn.classList.remove('unclicked');

  } else {
    helpBtn.classList.remove('clicked');
    helpBtn.classList.add('unclicked');

  }



  // 리뷰 상세보기 도움돼요 클릭 이벤트 추가
  helpBtn.addEventListener('click', (e) => { 
    const id = "R" + review.reviewNo
    const helpedBtn = document.getElementById(id);
    
    helpedClick(helpBtn, review.reviewNo);

    if (helpedBtn != undefined) { 
      helpedBtn.classList.toggle("unclicked");
      helpedBtn.classList.toggle("clicked");
    }
      
  })
};



/* 리뷰 도움돼요 버튼 클릭 시 도움돼요 1++ */

// 상세페이지 리뷰 목록 도움돼요 버튼 클릭 이벤트 추가
const helpedBtn = document.getElementsByClassName('helped-btn');
for (let btn of helpedBtn) {
  btn.addEventListener('click', () => { 
    
    const reviewNo = btn.parentElement.parentElement.parentElement.id; 
    helpedClick(btn, reviewNo);
  })
}



/* 도움돼요 버튼 클릭 시 도움돼요 추가 혹은 취소 Function */
const helpedClick = (helpedBtn, reviewNo) => { 
  
  if(loginMember == '') {

    loginConfirmOpen();
  } else {

    if (helpedBtn.classList.contains('clicked')) {
      /* 이미 도움돼요 버튼을 누른 경우 */
      removeHelp(reviewNo, helpedBtn);

    }
    
    if (helpedBtn.classList.contains('unclicked')){
      /* 도움돼요 버튼을 누르지 않은 경우 */
      addHelp(reviewNo, helpedBtn);
    }

  }
}


// 도움돼요 추가 Function
const addHelp = (reviewNo, helpedBtn) => { 

  $.ajax({
    url: '/help/add',
    data: { "reviewNo": reviewNo },
    success: (result) => {
      if (result > 0) {
        helpedBtn.classList.add("clicked");
        helpedBtn.classList.remove("unclicked");
      }
    },
    error: () => {
      console.log("도움돼요 추가 중 에러 발생");
    }
  })

}


// 도움돼요 취소 Function
const removeHelp = (reviewNo, helpedBtn) => {

  $.ajax({
    url: '/help/remove',
    data: { "reviewNo": reviewNo },
    success: (result) => {
      if (result > 0) {
        helpedBtn.classList.add("unclicked");
        helpedBtn.classList.remove("clicked");
      }
    },
    error: () => {
      console.log("도움돼요 취소 중 에러 발생");
    }
  })

}



/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
