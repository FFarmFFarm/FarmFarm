
/* -------------------------------------------------------------------------------------------------- */
/* 상품 관련 */
/* -------------------------------------------------------------------------------------------------- */

/* 상품번호 알아내기 */
const getProductNo = () => {
  const pathname = location.pathname;

  const lastIndex = pathname.lastIndexOf('/');

  return pathname.substring(lastIndex+1, pathname.length);
}


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

    const productNo = getProductNo();

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
if (document.getElementById('orderBtn') != undefined) { 
  document.getElementById('orderBtn').addEventListener('click', () => { 
    if (loginMember == '') {
      loginConfirmOpen();
    }
  })
};

// TODO
/* 장바구니 담기 클릭하면 장바구니로 */
if (document.getElementById('cartBtn') != undefined) { 
  document.getElementById('cartBtn').addEventListener('click', () => { 
    if (loginMember == '') {
      loginConfirmOpen();
    }
  })
};


/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */













/* -------------------------------------------------------------------------------------------------- */
/* 리뷰 관련 */
/* -------------------------------------------------------------------------------------------------- */


/* 리뷰 더보기 이미지 클릭 시 이미지 리스트 창 출력 */
const lastReviewImg = document.querySelector('.last-review-img');

if (lastReviewImg != undefined) {
  lastReviewImg.addEventListener('click', () => { 
    const reviewImgList = document.getElementById('reviewImgList');
    
    /* 사진 리뷰 목록 조회 */
    selectImgReview();
    
    displayflex(reviewImgList);
  });
}

/* 리뷰 이미지 리스트 창 뒤로가기 버튼 클릭 시 닫힘 */
document.getElementById('imgListClose').addEventListener('click', () => {
  const reviewImgList = document.getElementById('reviewImgList');
  displayNone(reviewImgList);
})



/* 사진 리뷰 목록 조회  Function*/
const selectImgReview = () => { 
  const productNo = getProductNo();

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

    setTimeout(() => {
      displayflex(reviewDetail);
    }, '200');

    selectReview(reviewNo, memberNo);

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
      console.log(review);

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
  const reviewDetailModal = document.getElementById('reviewDetailModal');

  reviewDetailModal.innerHTML = '';

  const reviewHead = document.createElement('div');
  reviewHead.classList.add('review-head');

  const backBtn = document.createElement('button');
  backBtn.classList.add('back-btn');
  backBtn.id = 'backBtn';
  backBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

  const reviewHeadTitle = document.createElement('span');
  reviewHeadTitle.classList.add('review-head-title');
  reviewHeadTitle.innerHTML = '사진 후기';

  const span = document.createElement('span');
  span.classList.add('empty');

  reviewHead.append(backBtn, reviewHeadTitle, span);

  const reviewContent = document.createElement('div');
  reviewContent.classList.add('review-content-container');

  reviewDetailModal.append(reviewHead, reviewContent);
  
  const reviewImgList = document.createElement('div');
  reviewImgList.classList.add('review-img-list-container');

  const reviewSwiperArea = document.createElement('div');
  reviewSwiperArea.classList.add("review-swiper-area", "swiper", "mySwiper");

  const imgContainer = document.createElement('div');
  imgContainer.classList.add("swiper-wrapper");
  imgContainer.id = "imgContainer";
  
  reviewContent.append(reviewImgList);
  reviewImgList.append(reviewSwiperArea);
  reviewSwiperArea.append(imgContainer);
  
  /* 리뷰 이미지 슬라이드 만들기 */
  for (let image of review.imgList) {
    console.log(image);
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    
    const img = document.createElement('img');
    img.src = image.reviewImgPath;

    div.append(img);
    
    imgContainer.append(div);
    
  }
  



  if (review.imgList.length > 1) {
    
    const nextBtn = document.createElement('div');
    nextBtn.classList.add("swiper-button-next");
    
    const prevBtn = document.createElement('div');
    prevBtn.classList.add("swiper-button-prev");
    
    const pagination = document.createElement('div');
    pagination.classList.add("swiper-pagination");
    
    reviewSwiperArea.append(pagination, prevBtn, nextBtn);
    
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
      observer: true,
      observeParents: true,
    });
    
  }
  


  
  

  const reviewProductContent = document.createElement('div');
  reviewProductContent.classList.add('review-product-content');

  const reviewProductPreview = document.createElement('div');
  reviewProductPreview.classList.add('review-product-preview');

  const productThumbnail = document.createElement('div');
  productThumbnail.classList.add('product-thumbnail');

  const thumbnailImg = document.createElement('img');
  thumbnailImg.src = review.productThumbnail;

  productThumbnail.append(thumbnailImg);
  
  const reviewProductName = document.createElement('div');
  reviewProductName.classList.add('review-product-name');
  
  const productName = document.createElement('span');
  productName.innerText = document.getElementById('productName').innerText;
  
  reviewProductName.append(productName);
  reviewProductPreview.append(productThumbnail, reviewProductName);

  const reviewContentArea = document.createElement('div');
  reviewContentArea.classList.add('review-content-area');

  const reviewDetailContent = document.createElement('div');
  reviewDetailContent.classList.add('review-detail-content');
  reviewDetailContent.innerHTML = review.reviewContent;
  
  const reviewNotice = document.createElement('div');
  reviewNotice.classList.add('review-notice');

  const p = document.createElement('p');
  p.innerHTML = '개인의 경험일 뿐 사실과 다를 수 있습니다';

  const createDate = document.createElement('div');
  createDate.classList.add('review-create-date');

  const dateSpan = document.createElement('span');
  dateSpan.innerText = review.createDate;

  const btn = document.createElement("button");
  btn.id = review.reviewNo;

  const icon = document.createElement("i");
  icon.classList.add('fa-regular', 'fa-thumbs-up');

  const helpSpan = document.createElement("span");
  helpSpan.innerText = "도움돼요";

  
  if (review.likeCheck > 0) {
    btn.classList.add("clicked", "helped-btn");
  } else {
    btn.classList.add("unclicked", "helped-btn");
  }
  
  btn.append(icon, helpSpan);
  createDate.append(dateSpan, btn);

  reviewContentArea.append(reviewDetailContent, reviewNotice, createDate);
  reviewProductContent.append(reviewProductPreview, reviewContentArea);
  reviewContent.append(reviewProductContent);



  backBtn.addEventListener("click", function() {
    displayNone(document.getElementById("reviewDetail"));
  });


  btn.addEventListener('click', (e) => { 

    const helpedBtn = document.getElementById("R" + review.reviewNo);
    
    helpedClick(btn, review.reviewNo);
  
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

    } else if (helpedBtn.classList.contains('unclicked')){
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



/* 리뷰 페이지네이션 */
const reviewPre = document.getElementById('reviewPre');
const reviewNext = document.getElementById('reviewNext');

// TODO 이전 페이지로
if (reviewPre != undefined) {
  reviewPre.addEventListener('click', () => { 
    cp--;
        
    const productNo = getProductNo();

    selectReviewList(productNo, cp);
  })
}

// 다음 페이지로
if (reviewNext != undefined) { 
  reviewNext.addEventListener('click', () => { 

    cp++;
        
    const productNo = getProductNo();

    selectReviewList(productNo, cp);
    
  })
}

/* cp를 전달받아 리뷰를 조회하는 Function */
const selectReviewList = (productNo, cp) => {
  $.ajax({
    url: '/review/select',
    data: { "productNo": productNo, "cp": cp, "sortFl": sortFl},
    dataType: 'json',
    success: (map) => { 
      printReviewList(map.reviewList, map.pagination);

      cp = map.pagination.currentPage;
    },
    error: () => { 
      console.log("리뷰 불러오기 중 에러 발생");
    }
  });
}





/* 조회해온 리뷰 출력하는 Function*/
const printReviewList = (reviewList, pagination, sortFL) => { 

  /* 리뷰 목록 비우기 */
  const productReviewList = document.getElementById('productReviewList');
  productReviewList.innerHTML = "";

  /* 리뷰 목록에 리뷰 추가하기 */
  for (let review of reviewList) {
    const li = document.createElement('li');
    li.classList.add('review');
    li.id = review.reviewNo;

    // li의 자식 요소 review-writer, review-content
    const reviewWriter = document.createElement('div');
    reviewWriter.classList.add('review-writer');

    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');

    // reviewWriter의 자식 요소 profileImg, nicknameArea
    const profileImg = document.createElement('img');

    if (review.profileImg != undefined) {
      profileImg.src = review.profileImg;
    } else {
      profileImg.src = "/resources/images/member/profile/profile.png";
    }

    profileImg.classList.add("writer-profile-img");

    
    const nicknameArea = document.createElement("div");
    nicknameArea.classList.add("nickname-area");

    
    const writerNickname = document.createElement("span");
    writerNickname.classList.add("writer-nickname");
    writerNickname.innerText = review.memberNickname;

    nicknameArea.append(writerNickname);
    
    if (review.likeCount > 10) {
      const bestReview = document.createElement("span");
      bestReview.classList.add("best-review");
      bestReview.innerText = "베스트";
      
      nicknameArea.append(bestReview);
    }
    
    reviewWriter.append(profileImg, nicknameArea);

    const productName = document.createElement("span");
    productName.innerText = document.getElementById('productName').innerText;

    const p = document.createElement("p");
    p.innerHTML = review.reviewContent;

    
    const reviewImg = document.createElement("div");
    reviewImg.classList.add("review-img");

    if (review.imgList.length > 0) {
      for (let image of review.imgList) { 
        const img = document.createElement("img");
        img.classList.add("review-one-img");
        img.id = review.reviewNo;
        img.src = image.reviewImgPath;

        reviewImg.append(img);

        img.addEventListener('click', () => {

          selectReview(review.reviewNo, memberNo);

          setTimeout(() => {
            displayflex(document.getElementById('reviewDetail'));
          }, '200');
        })
      }
    }
    
    const createDate = document.createElement("div");
    createDate.classList.add("review-create-date");

    const dateSpan = document.createElement("span");
    dateSpan.innerText = review.createDate;

    const btn = document.createElement("button");
    btn.id = "R" + review.reviewNo;

    const icon = document.createElement("i");
    icon.classList.add('fa-regular', 'fa-thumbs-up');

    const helpSpan = document.createElement("span");
    helpSpan.innerText = "도움돼요";



    btn.append(icon, helpSpan);

    if (review.likeCheck > 0) {
      btn.classList.add("clicked", "helped-btn");
    } else {
      btn.classList.add("unclicked", "helped-btn");
    }

    createDate.append(dateSpan, btn);
    reviewContent.append(productName, p, reviewImg, createDate);
    li.append(reviewWriter, reviewContent);
    productReviewList.append(li);

    scrollToTag(document.getElementById('productReview'));

    /* 이벤트 추가 */

    /* 도움돼요 버튼 */
    btn.addEventListener('click', () => { 
      helpedClick(btn, review.reviewNo);

    })


  }

  const paginationArea = document.getElementById('pagination');

  paginationArea.innerHTML = "";

  const preBtn = document.createElement('button');
  preBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  preBtn.id = 'reviewPre';
  
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn, id = 'reviewNext';

  if (pagination.currentPage == 1) {
    paginationArea.innerHTML = "";
    paginationArea.appendChild(nextBtn);
  } else if (pagination.maxPage > pagination.currentPage) {
    paginationArea.innerHTML = "";
    paginationArea.append(preBtn, nextBtn);
  } else if (pagination.currentPage == pagination.maxPage) {
    paginationArea.innerHTML = "";
    paginationArea.appendChild(preBtn);
  }
  


  /* 이벤트 추가 */

  /* 다음 페이지 버튼  */
  nextBtn.addEventListener('click', () => {
    cp++;
    const productNo = getProductNo();
    selectReviewList(productNo, cp, sortFL);


  });
  

  /* 이전 페이지 버튼 */
  preBtn.addEventListener('click', () => {
    cp--;
    const productNo = getProductNo();
    selectReviewList(productNo, cp , sortFL);
    

  });

}




/* 리뷰 추천순, 최근 등록순 정렬하기 */
document.getElementById('sortRecommend').addEventListener('click', (e) => { 

  if (! e.target.classList.contains('sort-clicked')) {
    sortFl = 'R'; 
    const productNo = getProductNo();
    selectReviewList(productNo); 

    e.target.classList.add('sort-clicked');
    document.getElementById('sortNewest').classList.remove('sort-clicked');
  }
})

document.getElementById('sortNewest').addEventListener('click', (e) => { 
  
  if (!e.target.classList.contains('sort-clicked')) { 
    
    sortFl = 'N'; 
    const productNo = getProductNo();
    selectReviewList(productNo);
    e.target.classList.add('sort-clicked');
    document.getElementById('sortRecommend').classList.remove('sort-clicked');
  }

})


/* sortFl을 전달받아 리뷰를 조회하는 Function */
const selectReviewListBySort = (productNo, sortFL) => {
  $.ajax({
    url: '/review/select',
    data: { "productNo": productNo, "sortFl": sortFL},
    dataType: 'json',
    success: (map) => { 
      printReviewList(map.reviewList, map.pagination, sortFL);

      cp = map.pagination.currentPage;
    },
    error: () => { 
      console.log("리뷰 불러오기 중 에러 발생");
    }
  });
}



/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
