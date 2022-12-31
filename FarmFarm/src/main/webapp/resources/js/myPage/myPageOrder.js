// 후기 작성 버튼 클릭 시 후기 작성 form 모달창 출력
const writeReviewBtn = document.getElementsByClassName('write-review');
if (writeReviewBtn != undefined) {
  for (let btn of writeReviewBtn) {
    btn.addEventListener('click', () => {
      const reviewFormContainer = document.getElementById('reviewFormContainer');

      const productName = btn.parentElement.previousElementSibling.firstElementChild.innerText;
      const productThumbnail = btn.parentElement.previousElementSibling.
        previousElementSibling.firstElementChild.getAttribute('src');
      const orderNo = btn.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.id;
      /* 상품 링크 경로 */
      const href = btn.parentElement.previousElementSibling.firstElementChild.href;


      document.getElementById('productNoInput').value = btn.id;
      document.getElementById('orderNoInput').value = orderNo;

      document.getElementById('modalProductThumbnail').setAttribute('src', productThumbnail);
      document.getElementById('modalProductName').innerHTML = productName;
      document.getElementById('modalProductName').href = href;

      displayFlex(reviewFormContainer);
    })
  }
}

/* 리뷰 작성 form 모달창 사진 첨부 시 미리보기 생성*/
const inputFile = document.getElementsByClassName('input-file');
const reviewImg = document.getElementsByClassName('review-img-thumbnail');
const inputLabel = document.getElementsByClassName('input-label');
const xBtn = document.getElementsByClassName('x-btn');

for (let i = 0; i < inputFile.length; i++) {
  inputFile[i].addEventListener('change', (e) => {

    if (e.target.files[0] != undefined) {
      console.log('파일 있음');

      const fileReader = new FileReader();

      fileReader.readAsDataURL(e.target.files[0]);

      fileReader.onload = (event) => {

        reviewImg[i].setAttribute('src', event.target.result);
        displayFlexNoLock(reviewImg[i]);
        inputLabel[i].style.display = 'none';
        displayFlexNoLock(xBtn[i]);

      }
    } else {
      console.log('파일 없음');
      reviewImg[i].classList.add('hide');
      reviewImg[i].classList.remove('appear');
      inputFile[i].value = '';
      inputLabel[i].style.display = 'flex';
      xBtn[i].classList.add('hide');
      xBtn[i].classList.remove('appear');
    }
  })


  xBtn[i].addEventListener('click', (e) => {
    console.log('x버튼 클릭');
    reviewImg[i].classList.add('hide');
    reviewImg[i].classList.remove('appear');
    inputLabel[i].style.display = 'flex';
    xBtn[i].classList.add('hide');
    xBtn[i].classList.remove('appear');

    inputFile[i].value = '';
  })
}


/* 리뷰 등록하기 버튼 클릭 */
document.getElementById('submitBtn').addEventListener('click', () => {

  const reviewTextArea = document.getElementById('reviewTextArea');


  if (reviewTextArea.value.trim().length == 0) {
    messageModalOpen("후기 내용을 입력해주세요.")
    reviewTextArea.value = "";
    reviewTextArea.focus();

  } else {
    console.log('등록 하기');
    const form = document.getElementById('reviewFrom');
    const formData = new FormData(form);

    $.ajax({
      url: "/review/write",
      data: formData,
      type: "POST",
      contentType: false,
      processData: false,
      success: (result) => {

        if (result > 0) {

          document.getElementById('reviewFrom').reset();
          displayNone(document.getElementById('reviewFormContainer'));

          let cp = selectCp();

          selectOrderList(cp);
        }
      },
      error: () => {
        console.log('error');

      }
    })
  }

})

/* 리뷰 작성 창 뒤로가기 클릭 시 */
const reviewBackBtn = document.getElementById('reviewBackBtn');
reviewBackBtn.addEventListener('click', () => {
  document.getElementById('reviewFrom').reset();
  displayNone(document.getElementById('reviewFormContainer'));

  const reviewImg = document.getElementsByClassName('review-img-thumbnail');
  const inputLabel = document.getElementsByClassName('input-label');
  const xBtn = document.getElementsByClassName('x-btn');

  for (let i = 0; i < xBtn.length; i++) {
    reviewImg[i].classList.add('hide');
    reviewImg[i].classList.remove('appear');
    inputLabel[i].style.display = 'flex';

    xBtn[i].classList.add('hide');
    xBtn[i].classList.remove('appear');
  }

})



const orderCancelBtn = document.getElementsByClassName('cancel-order');

for (let btn of orderCancelBtn) {
  
  btn.addEventListener('click', () => {
    
    const orderNo = btn.id;
    
    const cancelAmount = btn.parentElement.previousElementSibling.firstElementChild.nextElementSibling.
    firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerText;
    
    const cancelPrice = document.getElementById('productPrice').value;
    
    console.log(orderNo, cancelAmount, cancelPrice);
    
    // $.ajax({
    //   url: "/order/cancel",
    //   data: {"cancelAmount": cancelAmount, "orderNo": orderNo, 'cancelPrice': cancelPrice},
    //   success: (data) => {
    //     alert(data);
    
        
    //   }
    // });
      
    
  });
}





// TODO 반품 신청 버튼 클릭 시 반품 신청 form 모달 출력

// 구매확정 버튼 클릭 시 구매 확정
const confirmation = document.getElementsByClassName('confirmation');
if (confirmation.length != 0) {
  for (let btn of confirmation) {
    btn.addEventListener('click', () => {

      displayFlex(document.getElementById('orderConfirmModal'));

      confirmOrderNo = btn.id;
    })
  }

}

/* 구매확정 취소 버튼 */
document.getElementById('orderCalcelBtn').addEventListener('click', () => {
  displayNone(document.getElementById('orderConfirmModal'));
});

/* 구매확정 확인 버튼 */
document.getElementById('orderConfirmBtn').addEventListener('click', () => {

  orderConfirmation(confirmOrderNo);

  displayNone(document.getElementById('orderConfirmModal'));

  let cp = selectCp();
  if (cp == "") {
    cp = 1
  }

  selectOrderList(cp);
});




/* 주문 구매 확정하는 Function */
const orderConfirmation = (orderNo) => {

  $.ajax({
    url: "/order/confirm",
    data: { "orderNo": orderNo },
    success: (result) => {
      if (result > 0) {
        const message = '주문번호 ' + orderNo + '번 구매가 확정되었습니다.'

        messageModalOpen(message);
      }
    },
    error: () => {
      console.log('구매 확정 중 에러 발생');
    }
  })

}


//  주문 목록 AJAX 페이지네이션
const pageBox = document.getElementsByClassName('page-box');
for (let page of pageBox) {
  page.addEventListener('click', () => {

    let cp = page.id;

    selectOrderList(cp);

    changeURL(cp);

  });
}



/* 주문 목록 조회 */
const selectOrderList = (cp) => {

  $.ajax({
    url: "/order/list",
    data: { "cp": cp },
    dataType: "json",
    success: (map) => {
      printOrderList(map.orderList, map.pagination);

    },
    error: () => {
      console.log("주문 목록 불러오기 중 에러 발생")
    }
  })
}


/* 주문 목록 출력 */
const printOrderList = (orderList, pagination) => {

  const orderListContainer = document.getElementById('orderListContainer');
  orderListContainer.innerHTML = "";

  const orderContainer = document.createElement('div');

  for (let order of orderList) {

    orderContainer.classList.add('order');

    const orderInfoContainer = document.createElement('div');
    orderInfoContainer.classList.add('order-info-container');

    orderContainer.append(orderInfoContainer);

    const orderInfo = document.createElement('div');
    orderInfo.classList.add('order-info');

    orderInfoContainer.append(orderInfo);

    const orderNo = document.createElement('div');
    orderNo.classList.add('order-no');
    orderNo.id = order.orderNo;
    orderNo.innerText = "주문번호";

    const orderNoSpan = document.createElement('span');
    orderNoSpan.innerHTML = order.orderNo;

    orderNo.append(orderNoSpan);

    const regDate = document.createElement('span');
    regDate.classList.add('order-reg-date');
    regDate.innerText = order.orderDate;

    orderInfo.append(orderNo, regDate);



    /* 주문 상품 목록 */
    for (let product of order.productList) {

      const orderOne = document.createElement('div');
      orderOne.classList.add('order-one');

      orderContainer.append(orderOne);


      const orderThumbnail = document.createElement('a');
      orderThumbnail.href = '/product/' + product.productNo;
      orderThumbnail.classList.add('order-thumbnail');

      orderOne.append(orderThumbnail);

      const orderThumbnailImg = document.createElement('img');
      orderThumbnailImg.src = product.productImg;
      orderThumbnailImg.classList.add('order-thumbnail-img');

      orderThumbnail.append(orderThumbnailImg);

      const orderTotal = document.createElement('div');
      orderTotal.classList.add('order-total');

      orderOne.append(orderTotal);

      const productTitle = document.createElement('a');
      productTitle.href = '/product/' + product.productNo;
      productTitle.classList.add('product-title');
      productTitle.innerText = product.productName;

      const orderDetail = document.createElement('div');
      orderDetail.classList.add('order-detail');

      orderTotal.append(productTitle, orderDetail);

      const orderPrice = document.createElement('div');
      orderPrice.classList.add('order-price');

      const span = document.createElement('span');
      span.innerHTML = Number(product.productPrice).toLocaleString('ko-KR');

      const span1 = document.createElement('span');
      span1.innerText = '원';

      orderPrice.append(span, span1);

      const orSpan = document.createElement('span');
      orSpan.innerText = "|"
      orSpan.classList.add("or");

      const orderAmount = document.createElement('div');
      orderAmount.classList.add('order-amount');

      const span2 = document.createElement('span');
      span2.innerHTML = product.productAmount;

      const span3 = document.createElement('span');
      span3.innerText = '개';

      orderAmount.append(span2, span3);

      orderDetail.append(orderPrice, orSpan, orderAmount);

      const orderStatus = document.createElement('div');
      orderStatus.classList.add('order-status');

      const span4 = document.createElement('span');
      const span5 = document.createElement('span');

      if (order.orderStatus == 0) {
        span4.innerText = '결제완료';
        orderStatus.append(span4);
      }

      if (order.orderStatus == 1) {
        if (product.productStatus == 0) {
          span5.innerText = '배송중';
          span5.classList.add('order-shipping');
        }

        if (product.productStatus == 1) {
          span5.innerText = '반품 진행중';
          span5.classList.add('order-shipping');
        }

        if (product.productStatus == 2) {
          span5.innerText = '반품완료';
          span5.classList.add('order-shipping');
        }
        orderStatus.append(span5);
      }

      if (order.orderStatus == 2) {
        span4.innerText = '취소완료';
        orderStatus.append(span4);
      }

      if (order.orderStatus == 3) {

        if (product.productStatus == 0) {
          span4.innerText = '구매확정';
        }

        if (product.productStatus == 1) {
          span4.innerText = '반품 진행중';
        }

        if (product.productStatus == 2) {
          span4.innerText = '반품 완료';
        }

        orderStatus.append(span4);
      }

      orderTotal.append(orderStatus);

      const buttonArea = document.createElement('div');
      buttonArea.classList.add('button-area');

      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      if (order.orderStatus == 0) {
        button1.setAttribute('type', 'button');
        button1.innerText = '구매확정';
        button1.classList.add('confirmation');
        button1.id = order.orderNo;

        button2.setAttribute('type', 'button');
        button2.innerText = '주문취소';
        button2.classList.add('cancel-order');
        button2.id = order.orderNo;

        buttonArea.append(button1, button2);

        /* 구매확정 버튼 클릭 시 주문 구매 확정 */
        button1.addEventListener('click', () => {

          displayFlex(document.getElementById('orderConfirmModal'));

          confirmOrderNo = order.orderNo;

        })


      }

      if (order.orderStatus == 1) {

        if (product.productStatus == 0) {
          button1.setAttribute('type', 'button');
          button1.innerText = '구매확정';
          button1.classList.add('confirmation');
          button1.id = order.orderNo;

          const a = document.createElement('a');

          a.innerText = '반품요청';
          a.classList.add('return');
          a.href = '/return/' + order.orderNo;
          buttonArea.append(button1, a);

          /* 구매확정 버튼 클릭 시 주문 구매 확정 */
          button1.addEventListener('click', () => {
            displayFlex(document.getElementById('orderConfirmModal'));
            confirmOrderNo = order.orderNo;
          })

        }

        if (product.productStatus == 1) {
          button2.setAttribute('type', 'button');
          button2.innerText = '반품 진행중';
          button2.classList.add('return');
          button2.setAttribute('disabled', true);

          buttonArea.append(button2);
        }
        if (product.productStatus == 2) {
          button2.setAttribute('type', 'button');
          button2.innerText = '반품 완료';
          button2.classList.add('return');
          button2.setAttribute('disabled', true);

          buttonArea.append(button2);
        }
      }

      if (order.orderStatus == 2) {
      }

      if (order.orderStatus == 3) {
        if (product.reviewCheck == 0) {
          if (product.productStatus == 0) {

            button1.setAttribute('type', 'button');
            button1.innerText = '후기작성';
            button1.classList.add('write-review');
            button1.id = order.orderNo;
            buttonArea.append(button1);
          }
        }

        if (product.reviewCheck > 0) {
          if (product.productStatus == 0) {
            button1.setAttribute('type', 'button');
            button1.innerText = '후기완료';
            button1.classList.add('write-review');
            button1.setAttribute('disabled', true);
            buttonArea.append(button1);
          }

          if (product.productStatus == 1) {
            button1.setAttribute('type', 'button');
            button1.innerText = '반품 진행중';
            button1.classList.add('return');
            button1.setAttribute('disabled', true);
            buttonArea.append(button1);
          }

          if (product.productStatus == 2) {
            button1.setAttribute('type', 'button');
            button1.innerText = '반품 완료';
            button1.classList.add('return');
            button1.setAttribute('disabled', true);
            buttonArea.append(button1);
          }
        }


        button1.addEventListener('click', () => {
          const reviewFormContainer = document.getElementById('reviewFormContainer');

          document.getElementById('modalProductThumbnail').setAttribute('src', product.productImg);
          document.getElementById('modalProductName').innerHTML = product.productName;
          document.getElementById('modalProductName').href = '/product/' + product.productNo;
          document.getElementById('productNoInput').value = product.productNo;

          displayFlex(reviewFormContainer);
        })
      }

      orderOne.append(buttonArea);

    }

    const totalPrice = document.createElement('div');
    totalPrice.classList.add('total-price');
    totalPrice.innerText = '총'

    const span = document.createElement('span');
    span.innerText = order.orderPrice;

    totalPrice.append(span);
    totalPrice.innerHTML += '원'

    orderContainer.append(totalPrice);


  }

  const paginationArea = document.createElement('div');
  paginationArea.classList.add('pagination-area');

  orderListContainer.append(orderContainer, paginationArea);

  printPagination(paginationArea, pagination);

}


/* 페이지내이션 출력 */
const printPagination = (paginationArea, pagination) => {

  // 이전 페이지
  const firstPage = document.createElement('div');
  const prevPage = document.createElement('div');
  makePageBox(firstPage, '<i class="fa-solid fa-angles-left"></i>', 1, 'page-box');
  makePageBox(prevPage, '<i class="fa-solid fa-angle-left"></i>', pagination.prevPage, 'page-box');

  paginationArea.append(firstPage, prevPage);

  // 번호 페이지 제작
  for (let i = pagination.startPage; i <= pagination.endPage; i++) {
    const numPage = document.createElement('div');
    if (i == pagination.currentPage) {
      makePageBox(numPage, i, i, 'current-page-box');
    } else {
      makePageBox(numPage, i, i, 'page-box');

    }

    paginationArea.append(numPage);

    selectOrderListEvent(numPage, i);
  }

  // 이후 페이지 제작
  const nextPage = document.createElement('div');
  const maxPage = document.createElement('div');
  makePageBox(nextPage, '<i class="fa-solid fa-angle-right"></i>', pagination.nextPage, 'page-box');
  makePageBox(maxPage, '<i class="fa-solid fa-angles-right"></i>', pagination.maxPage, 'page-box');

  paginationArea.append(nextPage, maxPage);

  selectOrderListEvent(firstPage, 1);
  selectOrderListEvent(prevPage, pagination.prevPage);
  selectOrderListEvent(nextPage, pagination.nextPage);
  selectOrderListEvent(maxPage, pagination.maxPage);

}


const selectOrderListEvent = (element, cp) => {

  element.addEventListener('click', () => {
    selectOrderList(cp);
    changeURL(cp);
  });

}



// TODO 주문 번호 클릭 시 주문 상세 페이지로 (보류)