const selectCp = () => {
  let cp = location.search.replace('?cp=', '');
  return cp;
}


/* -------------------------------------------------------------------------------------------------- */
/* 상품 관련 */
/* -------------------------------------------------------------------------------------------------- */

/* 상품번호 알아내기 */
const getProductNo = () => {
  const pathname = location.pathname;

  const lastIndex = pathname.lastIndexOf('/');

  return pathname.substring(lastIndex + 1, pathname.length);
}


// 카테고리 누르면 리스트로 이동하는 함수
const goToList = (categoryNo) => {

  let listPath = window.location.href;
  console.log(listPath);
  listPath = listPath.substring(0, listPath.lastIndexOf('/')+1);

  listPath = listPath + "list?category=" + categoryNo + '&cp=1&sort=views';

  location.href = listPath;
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
    if(authority == 0) {
      // 구매자
      const productNo = getProductNo();
      
      if (wishBtn.classList.contains('wish-clicked')) {
        removeWish(productNo, wishBtn);
      } else {
        addWish(productNo, wishBtn);
      }
    } else if (authority == 1) {
      // 판매자
      alert("일반 회원 계정으로 로그인해주세요.");
    } else if(authority == 2) {
      // 관리자
      alert("관리자 계정입니다.");
    }
  });
}

/* 찜하기 Function*/
const addWish = (productNo, wishBtn) => {
  axios.post('/wishes/' + loginMemberNo + "/" + productNo)
  .then((result) => {
    wishBtn.classList.remove('wish-unclicked');
    wishBtn.classList.add('wish-clicked');

    messageModalOpen("찜 목록에 추가되었습니다.");
  }).catch((err) => {
    console.log('찜 추가 중 오류 발생');
  });
};

/* 찜취소  Function*/
const removeWish = (productNo, wishBtn) => {
  axios.delete('/wishes/' + loginMemberNo + "/" + productNo)
  .then((result) => {
    wishBtn.classList.remove('wish-clicked');
    wishBtn.classList.add('wish-unclicked');

    messageModalOpen("찜 목록에서 제거되었습니다.");
  }).catch((err) => {
    console.log('찜 취소 중 오류 발생');
  });
};

/* 상품 옵션 */
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const productAmount = document.getElementById('productAmount');
const totalPrice = document.getElementById('totalPrice');
const temp = totalPrice.innerText;
const amountInput = document.getElementById('amountInput');


/* 상품 수량 + 버튼 */
addBtn.addEventListener('click', () => {
  if (Number(productAmount.innerText) < Number(stock)) {

    productAmount.innerText = Number(productAmount.innerText) + 1;
    amountInput.value = Number(productAmount.innerText);

    totalPrice.innerText =
      Number(temp.replaceAll(',', '')) * Number(productAmount.innerText);
    totalPrice.innerText = Number(totalPrice.innerText).toLocaleString();
    console.log(amountInput.value);

  } else {
    const span = document.getElementById('stock');
    span.innerText = '해당 상품의 재고량을 초과할 수 없습니다.';
  }
});

/* 상품 수량 - 버튼  */
removeBtn.addEventListener('click', () => {
  if (Number(productAmount.innerText) > 1) {

    productAmount.innerText = Number(productAmount.innerText) - 1;
    amountInput.value = Number(productAmount.innerText);

    console.log(amountInput.value);

    totalPrice.innerText =
      Number(temp.replaceAll(',', '')) * Number(productAmount.innerText);
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
    } else {
      if (authority == 0) {

        const amount = document.getElementById('productAmount').innerText;
        
        // 상품 실 재고 확인 후 주문 수량 이상일 때만 주문 가능하게
        axios.get('/products/' + getProductNo() + '/stock' )
        .then((result) => {
          console.log("현재 상품 재고 수량: " + stock);
            // !실재고 수량이 0보다 크고 선택된 수량보다 같거나 클때만 주문서로 이동
            if (stock >= amount && stock != 0) {
              const form = document.getElementById('orderPage');
              form.submit();
            } else if (stock <= 0) {
              messageModalOpen("해당 상품은 현재 품절입니다. 다음에 다시 구매해주세요.");
            } else {
              messageModalOpen("선택된 수량이 상품의 재고 수량보다 많습니다.");
            }
        }).catch((err) => {
          console.log(err);
        });


      } else if(authority ==1) {
        alert('일반 회원 계정으로 로그인해주세요');
      } else if (authority == 2) {
        alert('관리자 계정입니다.');
      }
    }
  })
};

// TODO
/* 장바구니 담기 클릭하면 장바구니로 */
if (document.getElementById('cartBtn') != undefined) {
  document.getElementById('cartBtn').addEventListener('click', () => {
    if (loginMember == '') {
      loginConfirmOpen();
    } else {
      if(authority == 0) {

        const productNo = getProductNo();
        const productAmount = document.getElementById("amountInput").value; 
        
        $.ajax({
          url: '/addCart',
          data: { productNo: productNo,
                productAmount: productAmount,
                "memberNo": loginMemberNo },
          type: "GET",
          success: (result) => {
            if(result == 0){
              messageModalOpen("장바구니 추가 실패");

            } else if(result == 1){ // 장바구니 추가 성공
              goCartConfirmOpen();
              
            } else if(result == 2){ // 기존에 장바구니에 있는 경우
              // 장바구니 추가? confirm
              addCartConfirmOpen();
            }
          },
          error: () => {
            console.log("장바구니 이동 실패");
          }
        })
      } else if (authority == 1) {
        alert('일반 회원 계정으로 로그인해주세요');
      } else if (authority == 2) {
        alert('관리자 계정입니다.');
      }
    }
  })
};

// 장바구니 이동하시겠습니까? confirm
const goCartConfirmOpen = () => {
  const goCartConfirm = document.getElementById('goCartConfirm');
  displayFlex(goCartConfirm);
};

// 장바구니 이동하시겠습니까? confirm 닫기
if (document.getElementById('goCartCalcelBtn') != undefined) {

  document.getElementById('goCartCalcelBtn').addEventListener('click', function () {
    const goCartConfirm = document.getElementById('goCartConfirm');
    displayNone(goCartConfirm);
  })

  document.getElementById('goCartConfirmBtn').addEventListener('click', function () {
    location.href = "/cart";
  })
};


// 기존에 장바구니에 있을 때 confirm
const addCartConfirmOpen = () => {
  const addCartConfirm = document.getElementById('addCartConfirm');
  displayFlex(addCartConfirm);
};

if (document.getElementById('addCartCalcelBtn') != undefined) {
  const addCartConfirm = document.getElementById('addCartConfirm');
  // 추가 취소
  document.getElementById('addCartCalcelBtn').addEventListener('click', function () {
    displayNone(addCartConfirm);
  })

  // 추가 하겠다
  document.getElementById('addCartConfirmBtn').addEventListener('click', function () {
    
    displayNone(addCartConfirm);

    const productNo = getProductNo();
    const productAmount = document.getElementById("amountInput").value; 

    // 추가하는 ajax
    $.ajax({
      url: '/addCart',
      data: {productNo: productNo,
          productAmount: productAmount,
          "memberNo": loginMemberNo },
      type: "POST",
      success: (result) => {
        if(result > 0){
          goCartConfirmOpen();

        }
      },
      error: () => {
        console.log("장바구니 이동 실패");
      }
    })
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

    displayFlex(reviewImgList);
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
    url: "/reviews/images",
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

      selectReview(reviewNo, loginMemberNo);

      setTimeout(() => {
        displayFlex(reviewDetail);
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
      displayFlex(reviewDetail);
    }, '200');

    selectReview(reviewNo, loginMemberNo);

  });
}




/* 리뷰 상세 조회창 뒤로가기 클릭 시 꺼짐 */
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', () => {
  displayNone(reviewDetail);
});




/* 리뷰 상세 조회  Function*/
const selectReview = (reviewNo, loginMemberNo) => {
  if (loginMemberNo == '') {
    loginMemberNo = 0;
  }

  $.ajax({
    url: '/reviews/' + reviewNo,
    data: { "memberNo": loginMemberNo },
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
  console.log(review.imgList);
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

  reviewNotice.append(p);


  const createDate = document.createElement('div');
  createDate.classList.add('review-create-date');

  const dateSpan = document.createElement('span');
  dateSpan.innerText = review.createDate;


  if (Number(loginMemberNo) != review.memberNo) {
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

    btn.addEventListener('click', (e) => {
      if(authority == 0) {
        const helpedBtn = document.getElementById("R" + review.reviewNo);
  
        helpedClick(btn, review.reviewNo);
  
        if (helpedBtn != undefined) {
          helpedBtn.classList.toggle("unclicked");
          helpedBtn.classList.toggle("clicked");
        }

      } else if(authority == 1) {
        alert('일반 회원으로 로그인해주세요.');
      } else if (authority == 2) {
        alert('관리자 계정입니다.');
      }

    })
  } else {
    const span1 = document.createElement("span");
    span1.innerText = "도움";

    const span2 = document.createElement("span");
    span2.classList.add('review-helped');
    span2.innerText = review.likeCount;

    span1.append(span2);



    const input = document.createElement("input");
    input.setAttribute('type', 'hidden');
    input.value = review.reviewNo;
    
    createDate.append(dateSpan, span1);
    reviewNotice.append( input);
 


  }

  reviewContentArea.append(reviewDetailContent, reviewNotice, createDate);
  reviewProductContent.append(reviewProductPreview, reviewContentArea);
  reviewContent.append(reviewProductContent);



  backBtn.addEventListener("click", function () {
    displayNone(document.getElementById("reviewDetail"));
  });



};




/* 리뷰 도움돼요 버튼 클릭 시 도움돼요 1++ */

// 상세페이지 리뷰 목록 도움돼요 버튼 클릭 이벤트 추가
const helpedBtn = document.getElementsByClassName('helped-btn');
for (let btn of helpedBtn) {
  btn.addEventListener('click', () => {

    if(authority == 0) {
      const reviewNo = btn.parentElement.parentElement.parentElement.id;
      helpedClick(btn, reviewNo);

    } else if(authority == 1) {
      alert('일반 회원으로 로그인해주세요.');
    } else if (authority == 2) {
      alert('관리자 계정입니다.');
    }

  })
}



/* 도움돼요 버튼 클릭 시 도움돼요 추가 혹은 취소 Function */
const helpedClick = (helpedBtn, reviewNo) => {

  if (loginMember == '') {

    loginConfirmOpen();

  } else {

    if(authority == 0) {

      if (helpedBtn.classList.contains('clicked')) {
        /* 이미 도움돼요 버튼을 누른 경우 */
        removeHelp(reviewNo, helpedBtn);
  
      } else if (helpedBtn.classList.contains('unclicked')) {
        /* 도움돼요 버튼을 누르지 않은 경우 */
        addHelp(reviewNo, helpedBtn);
      }
    } else if(authority == 1) {
      alert('일반 회원으로 로그인해주세요.');
    } else if (authority == 2) {
      alert('관리자 계정입니다.');
    }


  }
}


// 도움돼요 추가 Function
const addHelp = (reviewNo, helpedBtn) => {

  $.ajax({
    url: '/helps',
    type: 'post',
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
    url: '/helps',
    type: 'delete',
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
    url: '/reviews',
    data: { "productNo": productNo, "cp": cp, "sortFl": sortFl },
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
  if (reviewList.length == 0) {
    const li = document.createElement('li');
    li.classList.add('no-review');
    li.innerText = "리뷰가 없습니다. 상품을 구입하고 첫 후기를 남겨주세요.";

    productReviewList.append(li);
  }
  
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

    if (Number(loginMemberNo) == review.memberNo) {
      const button = document.createElement("button");
      button.classList.add('review-update-btn');
      button.id = review.reviewNo;
      button.setAttribute('type', 'button');
      button.innerText = '수정하기';

      reviewContent.append(button);

      button.addEventListener('click', ()=>{
        displayFlex(document.getElementById('reviewFormContainer'));
        selectReviewUpdate(review.reviewNo);
      })

    }

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

          selectReview(review.reviewNo, loginMemberNo);

          setTimeout(() => {
            displayFlex(document.getElementById('reviewDetail'));
          }, '200');
        })
      }
    }

    const createDate = document.createElement("div");
    createDate.classList.add("review-create-date");

    const dateSpan = document.createElement("span");
    dateSpan.innerText = review.createDate;

    if (Number(loginMemberNo) != review.memberNo) {
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

      /* 이벤트 추가 */

      /* 도움돼요 버튼 */
      btn.addEventListener('click', () => {
        if(authority == 0) {

          helpedClick(btn, review.reviewNo);
        } else if(authority == 1) {
          alert('일반 회원으로 로그인해주세요.');
        } else if (authority == 2) {
          alert('관리자 계정입니다.');
        }

      })
    } else {
      const span1 = document.createElement("span");
      span1.innerText = "도움";

      const span2 = document.createElement("span");
      span2.classList.add('review-helped');
      span2.innerText = review.likeCount;

      span1.append(span2);

      createDate.append(dateSpan, span1);
    }


    reviewContent.append(productName, p, reviewImg, createDate);
    li.append(reviewWriter, reviewContent);
    productReviewList.append(li);

    if(document.getElementById('productReview') != undefined) {

      scrollToTag(document.getElementById('productReview'));
    }



  }

  const paginationArea = document.getElementById('pagination');

  paginationArea.innerHTML = "";

  const preBtn = document.createElement('button');
  preBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  preBtn.id = 'reviewPre';

  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn, id = 'reviewNext';

  if (pagination.currentPage == 1 && pagination.maxPage > 1) {
    paginationArea.innerHTML = "";
    paginationArea.appendChild(nextBtn);
  } else if (pagination.maxPage > pagination.currentPage && pagination.prevPage < pagination.currentPage && pagination.currentPage > 1) {
    paginationArea.innerHTML = "";
    paginationArea.append(preBtn, nextBtn);
  } else if (pagination.currentPage > pagination.prevPage && pagination.currentPage > 1) {
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
    selectReviewList(productNo, cp, sortFL);


  });

}




/* 리뷰 추천순, 최근 등록순 정렬하기 */
document.getElementById('sortRecommend').addEventListener('click', (e) => {

  if (!e.target.classList.contains('sort-clicked')) {
    cp=1;
    sortFl = 'R';
    const productNo = getProductNo();
    selectReviewList(productNo);

    e.target.classList.add('sort-clicked');
    document.getElementById('sortNewest').classList.remove('sort-clicked');
  }
})

document.getElementById('sortNewest').addEventListener('click', (e) => {

  if (!e.target.classList.contains('sort-clicked')) {
    cp=1;
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
    url: '/reviews',
    data: { "productNo": productNo, "sortFl": sortFL },
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






/* 리뷰 수정하기 */
/* 리뷰 수정하기 버튼 클릭 시 수정하기 form 출력 */
const reviewUpdateBtn = document.getElementsByClassName('review-update-btn');
if (reviewUpdateBtn != undefined) {

  for (let btn of reviewUpdateBtn) {
    btn.addEventListener('click', () => {
      displayFlex(document.getElementById('reviewFormContainer'));
      selectReviewUpdate(btn.id);
    })
  }
}

/* 리뷰 작성 창 뒤로가기 클릭 시 */
const reviewBackBtn = document.getElementById('reviewBackBtn');

reviewBackBtn.addEventListener('click', () => {
  document.getElementById('reviewFrom').reset();
  displayNone(document.getElementById('reviewFormContainer'));

  const reviewImage = document.getElementsByClassName('review-img-thumbnail');
  const inputLabel = document.getElementsByClassName('input-label');
  const xBtn = document.getElementsByClassName('x-btn');

  for (let i = 0; i < xBtn.length; i++) {
    reviewImage[i].classList.add('hide');
    reviewImage[i].classList.remove('appear');
    inputLabel[i].style.display = 'flex';

    xBtn[i].classList.add('hide');
    xBtn[i].classList.remove('appear');
  }

})


/* 리뷰 삭제 버튼 클릭시 삭제 */
const reviewDeleteBtn = document.getElementsByClassName('review-delete-btn');
if (reviewDeleteBtn != undefined) {

  for (let btn of reviewDeleteBtn) {
    btn.addEventListener('click', () => {
      displayFlex(document.getElementById('deleteConfirmModal'));
      reviewNo = btn.id;
    })
  }
}



/* 수정할 리뷰상세 조회  Function*/
const selectReviewUpdate = (reviewNo) => {

  console.log(loginMemberNo);
  console.log(reviewNo);

  $.ajax({
    url: '/reviews/' + reviewNo,
    data: { "memberNo": loginMemberNo },
    dataType: 'json',
    success: (review) => {
      console.log(review);

      /* 리뷰 모달창 내용 넣기 */
      fillReviewForm(review);
    },
    error: () => {
      console.log('리뷰 상세 조회 중 에러');
    },
  });
};



/* 리뷰 수정 폼 채우기 */
const fillReviewForm = (review) => {
  console.log(review);
  const reviewForm = document.getElementById('reviewForm');
  
  if (reviewForm != undefined) {
    reviewForm.reset();
    
  }
  
  /* 리뷰 모달창 내용 넣기 */
  const modalProductThumbnail = document.getElementById('modalProductThumbnail');
  const modalProductName = document.getElementById('modalProductName');
  const reviewTextArea = document.getElementById('reviewTextArea');
  const reviewNoInput = document.getElementById('reviewNoInput');
  
  
  modalProductThumbnail.removeAttribute('src');
  modalProductThumbnail.src = review.productThumbnail;
  
  modalProductName.removeAttribute('href');
  modalProductName.href = '/products/' + review.productNo;
  modalProductName.innerHTML = review.productName;
  
  
  reviewNoInput.value = review.reviewNo;
  console.log(review.reviewNo);
  
  reviewTextArea.value = '';
  review.reviewContent = review.reviewContent.replaceAll('<br>', '\n');
  review.reviewContent = review.reviewContent.replaceAll('<br/>', '\n');
  review.reviewContent = review.reviewContent.replaceAll('<br />', '\n');
  reviewTextArea.value = review.reviewContent;

  reviewTextArea.focus();

  if (review.imgList.length > 0) {
    for (let img of review.imgList) {

      const reviewImg = document.getElementById('reviewImg' + img.reviewImgOrder);
      const xBtn = document.getElementsByClassName('x-btn')[img.reviewImgOrder];
      const inputLabel = document.getElementsByClassName('input-label')[img.reviewImgOrder];

      reviewImg.src = img.reviewImgPath;
      reviewImg.classList.remove('hide');
      xBtn.classList.remove('hide');
      inputLabel.style.display = 'none';


    }
  }


}




/* 리뷰 수정 중 이미지 추가 시 */
const inputFile = document.getElementsByClassName('input-file');
const reviewImage = document.getElementsByClassName('review-img-thumbnail');
const xBtn = document.getElementsByClassName('x-btn');
const inputLabel = document.getElementsByClassName('input-label');

const deleteSet = new Set();

for (let i = 0; i < inputFile.length; i++) {
  inputFile[i].addEventListener('change', (e) => {
    console.log("파일 변경 감지");

    const file = inputFile[i].files[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {

        reviewImage[i].setAttribute('src', e.target.result);
        displayFlexNoLock(reviewImage[i]);
        inputLabel[i].style.display = 'none';
        displayFlexNoLock(xBtn[i]);


      };
    } else {
      reviewImage[i].src = '';
      reviewImage[i].classList.add('hide');
      reviewImage[i].classList.remove('appear');
      inputFile[i].value = '';
      inputLabel[i].style.display = 'flex';
      xBtn[i].classList.add('hide');
      xBtn[i].classList.remove('appear');

      deleteSet.add(i);
      console.log(i + "번 이미지 delete set 추가!");
    }
  });

  xBtn[i].addEventListener('click', (e) => {

    if (reviewImage[i].getAttribute('src') != "") {

      reviewImage[i].removeAttribute('src');
      reviewImage[i].classList.add('hide');
      reviewImage[i].classList.remove('appear');
      inputLabel[i].style.display = 'flex';
      xBtn[i].classList.add('hide');
      xBtn[i].classList.remove('appear');

      inputFile[i].value = '';

      deleteSet.add(i);
      console.log(i + "번 이미지 delete set 추가!");
    }

  })
}



/* 리뷰 등록하기 버튼 클릭 */
document.getElementById('submitBtn').addEventListener('click', () => {

  const reviewTextArea = document.getElementById('reviewTextArea');

  if (reviewTextArea.value.trim().length == 0) {
    messageModalOpen("후기 내용을 입력해주세요.");
    reviewTextArea.value = "";
    reviewTextArea.focus();

  } else {
    console.log('등록 하기');

    document.getElementById('deleteSetInput').value = Array.from(deleteSet);
    const form = document.getElementById('reviewFrom');
    const formData = new FormData(form);

    $.ajax({
      url: "/reviews/" + formData.reviewNo,
      data: formData,
      type: "POST",
      contentType: false,
      processData: false,
      success: (result) => {
        console.log(result);

        if (result > 0) {

          location.reload();
        }
      },
      error: () => {
        console.log('error');

      }
    })
  }

})
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
