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



          <div class="order">
            <div class="order-info-container">
            <div class="order-info">
              <span class="order-no" id="${order.orderNo}">주문번호 <span>${order.orderNo}</span></span>
              <span class="order-reg-date">2022.12.15</span>
            </div>
          </div>

          <c:forEach var="product" items="${order.productList}">
          <div class="order-one">
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
                <div class="order-amount"><span> ${product.productAmount}</span>개</div>
              </div>
              <div class="order-status">
                <c:if test="${order.orderStatus == 0}">
                <span>결제완료</span>
                </c:if>
                <c:if test="${order.orderStatus == 1}">
                  <c:if test="${product.productStatus == 0}">
                    <span class="order-shipping">배송중</span>
                  </c:if>
                  <c:if test="${product.productStatus == 1}">
                    <span class="order-shipping">반품 진행중</span>
                  </c:if>
                  <c:if test="${product.productStatus == 2}">
                    <span>반품 완료</span>
                  </c:if>
                </c:if>
                <c:if test="${order.orderStatus == 2}">
                  <span>취소완료</span>
                </c:if>
                <c:if test="${order.orderStatus == 3}">
                  <c:if test="${product.productStatus == 0}">
                    <span>구매확정</span>
                  </c:if>
                  <c:if test="${product.productStatus == 1}">
                    <span class="order-shipping">반품 진행중</span>
                  </c:if>
                  <c:if test="${product.productStatus == 2}">
                    <span>반품 완료</span>
                  </c:if>
                </c:if>
              </div>
            </div>
          </div>
          </c:forEach>
          <div class="total-price">총 <span>${order.orderPrice}</span>원</div>
        </div>
 
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
    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageOrder.js"></script>
  </body>

</html>
