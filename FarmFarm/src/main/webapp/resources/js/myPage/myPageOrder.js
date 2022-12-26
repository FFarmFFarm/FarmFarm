// TODO 리뷰 작성 버튼 클릭 시 리뷰 작성 form 모달창 출력

// TODO 주문 취소 버튼 클릭 시 주문 취소

// TODO 반품 신청 버튼 클릭 시 반품 신청 form 모달 출력

// TODO 구매확정 버튼 클릭 시 구매 확정



// TODO 주문 목록 AJAX 페이지네이션
const pageBox = document.getElementsByClassName('page-box');
for(let page of pageBox) {
  page.addEventListener('click', ()=>{

      let cp = page.id;
  
      selectOrderList(cp);



  });
}

const selectOrderList = (cp) => {
  
  $.ajax({
    url: "/order/list",
    data: {"cp":cp},
    dataType: "json",
    success: (map)=>{

      console.log(map.orderList);

      printOrderList(map.orderList, map.pagination);


    },
    error: ()=>{
      console.log("주문 목록 불러오기 중 에러 발생")
    }
  })
}



const printOrderList = (orderList, pagination) => {

  const orderListContainer = document.getElementById('orderListContainer');
  orderListContainer.innerHTML = "";

  const orderContainer = document.createElement('div');
  
  for(let order of orderList) {

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
    for(let product of order.productList) {

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
      span.innerText = product.productPrice;

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
      const a = document.createElement('a');

      if(order.orderStatus == 0 ) {
        span4.innerText = '결제완료';
        orderStatus.append(span4);   
      }
      if(order.orderStatus == 1 ) {
        a.innerText = '배송중';
        a.classList.add('order-shipping');
        orderStatus.append(a);   
      }
      if(order.orderStatus == 2 ) {
        span4.innerText = '취소완료';
        orderStatus.append(span4);   
      }
      if(order.orderStatus == 3 ) {
        span4.innerText = '구매확정';
        orderStatus.append(span4);   
      }

      orderTotal.append(orderStatus);

      const buttonArea = document.createElement('div');
      buttonArea.classList.add('button-area');
      
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      if(order.orderStatus == 0 ) {
        button1.setAttribute('type', 'button');
        button1.innerText = '구매확정';
        button1.id = 'confirmation';

        button2.setAttribute('type', 'button');
        button2.innerText = '주문취소';
        button2.id = 'cancelOrder';

        buttonArea.append(button1, button2);
      }

      if(order.orderStatus == 1 ) {
        button1.setAttribute('type', 'button');
        button1.innerText = '구매확정';
        button1.id = 'confirmation';

        button2.setAttribute('type', 'button');
        button2.innerText = '반품요청';
        button2.id = 'return';

        buttonArea.append(button1, button2);
      }

      if(order.orderStatus == 2 ) {
      }

      if(order.orderStatus == 3 ) {
        button1.setAttribute('type', 'button');
        button1.innerText = '리뷰작성';
        button1.id = 'writeReview';

        buttonArea.append(button1);
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

const printPagination = (paginationArea, pagination) => {

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
  });

}



// TODO 주문 번호 클릭 시 주문 상세 페이지로 (보류)