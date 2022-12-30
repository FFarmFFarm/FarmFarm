<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>반품 신청</title>
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/order/return-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>


  
      <section class="return-container">
       
        <span class="return-title">반품 신청</span>



          <form class="order" action="/return/${order.orderNo}" method="POST"  id="returnForm">
            <div class="order-info-container">
              <div class="order-info">
                <span class="order-no" id="${order.orderNo}">주문번호 <span>${order.orderNo}</span></span>
                <span class="order-reg-date">2022.12.15</span>
              </div>
            </div>
            
            <div class="return-product">
              <span class="sub-title">반품 상품 선택</span>
              <div class="select-all">
                <input type="checkbox" id="selectAll" name="selectAll" onclick='selectAllCheckbox(this)' >
                <label for="selectAll">전체 선택</label>
              </div>
              <c:forEach var="product" items="${order.productList}" varStatus="vs">
            <div class="order-one">
               
            <input type="checkbox" class="productNo" id="productNoInput" name="pList[${vs.index}].productNo" value="${product.productNo}">
            <a href="/product/${product.productNo}" class="order-thumbnail">
              <img
                src="${product.productImg}"
                alt=""
                class="order-thumbnail-img"
              />
            </a>

            <div class="order-total">
              <a href="/product/${product.productNo}" class="product-title">${product.productName}</a>
              <div class="order-detail">
                <div class="order-price"><span>${product.productPrice}</span>원</div>
                <span class="or">|</span>

                  <div class="order-amount">
                    <input type="number" name="pList[${vs.index}].productAmount" min="1" max="${product.productAmount}" value="${product.productAmount}" id="amount${vs.index}">
                    개
                  </div>
              </div>
              
            </div>
          </div>
          </c:forEach>
        </div>


        <div class="return-reason">
          <span class="sub-title">반품 사유 선택</span>
          <input type="radio" name="returnReason" id="simpleRemorse" value="0">
          <label for="simpleRemorse">단순 변심</label>
          <input type="radio" name="returnReason" id="productDefect" value="1">
          <label for="productDefect">상품 하자</label>
        </div>

        <div class="return-account">
          <span class="sub-title">환불 정보 입력</span>
          <span class="notice">계좌 정보가 불일치할 시 환불이 어려울 수 있습니다.</span>

          <div class="account-info">
            <div>
              <label for="accontName">예금주: </label>
              <input type="text" name="accountName" id="accontName" required>
            </div>
            <div>
              <label for="accountNo">계좌번호: </label>
              <input type="text" name="accountNo" id="accountNo" required>
            </div>
          </div>
        </div>

        <button class="return-btn" type="button" onclick="returnSubmit()">제출하기</button>

      </form>
 
    </section>

  </main>

   
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>


    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <jsp:include page="/WEB-INF/views/myPage/modal/orderConfirm.jsp"/>
    <jsp:include page="/WEB-INF/views/myPage/modal/reviewForm.jsp"/>

    <script>
      var cp = "${pagination.currentPage}";

      var confirmOrderNo;

      var imgOrder = 1;

    </script>



    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/order/return.js"></script>
  </body>

</html>
