<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="totalPrice" value="0"/>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>팜팜 | 주문하기</title>

    <!-- 헤더/푸터 -->
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
   
    <link rel="stylesheet" href="/resources/css/root-style.css" />
    <link rel="stylesheet" href="/resources/css/order/order-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

    <script
      src="https://kit.fontawesome.com/1ce4f19a7a.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <form action="/orders" method="POST" id="orderForm">
      <div class="order-title">주문서</div>
      <section class="product-container">
        <ul>
          <div class="order-headline order-product-list">
            <span> 주문 상품 </span>
          </div>
          <div class="order-content">
            <c:if test="${fn:length(productList) > 1}">
              <span> "${productList[0].productName}" 외 </span>
              <span class="order-count"> ${fn:length(productList) -1} 개 </span>
              <span> 상품을 주문합니다 </span>
            </c:if>
            <c:if test="${fn:length(productList) == 1}">
              <span> "${productList[0].productName}"</span>
              <span> 을/를 주문합니다 </span>
            </c:if>
          </div>
          <c:forEach items="${productList}" var="product" varStatus="vs">
            <c:set var="productPrice" value="${product.productPrice * product.productAmount}"/>
            <input type="hidden" value="${product.productNo}" name="pList[${vs.index}].productNo">
            <input type="hidden" value="${product.productAmount}" name="pList[${vs.index}].productAmount">
            <li>
              <div class="order-thumbnail">
                <img
                src="${product.productImg}"
                alt=""
                class="order-thumbnail-img"
                />
              </div>
              <span class="order-product-name">${product.productName}</span>
              <span class="order-amount">${product.productAmount}</span>
              <span class="order-price-info"><fmt:formatNumber value="${productPrice}" pattern="#,###" /></span>
              <c:set var="totalPrice" value="${totalPrice + product.productPrice * product.productAmount}"/>
              
            </li>
          </c:forEach>
        </ul>
      </section>
      <section class="member-info-container">
        <div class="order-headline">주문자 정보</div>
        <div>
          <div class="info-subject">
            <div class="member-name">보내는 분</div>
            <div class="member-tel">휴대폰</div>
          </div>
          <div class="info-content">
            <div class="member-name">${loginMember.memberName}</div>
            <div class="member-tel">${loginMember.to}</div>
            
          </div>
        </div>
      </section>
      <section class="shipping-info-container">
        <div class="order-headline">배송 정보</div>
        <div class="info-container">
          <div class="info-subject">
            <div class="member-address">배송지</div>
          </div>
          <div class="info-content">
            <div class="member-address">
              <span></span>
              <span>${loginMember.memberAddress2}</span>
              <input type="hidden" name="orderAddress" value="${loginMember.memberAddress2}" id="orderAddress"/>
            </div>

          </div>
        </div>
      </section>
      <section class="order-container">
        <div class="payment-container">
          <div class="order-headline">결제 수단</div>
          <div>
            <span class="select-payment">결제수단 선택</span>
            <div class="payment-list">
              <label for="payment">
                <div type="button" class="kakaopay-btn" id="kakaoBtn">
                  <i class="fa-solid fa-comment"></i>
                  Pay
                </div>
                <input type="checkbox" id="payment" name="payment"/>
              </label>
            </div>
          </div>
          <span class="notice"
            >카카오페이 결제 시 결제하신 수단으로만 환불되는 점
            양해부탁드립니다.</span
          >
        </div>
        <div class="price-container">
          <span class="order-headline total-price">결제 금액</span>
          <div>
            <div class="price-one-line">
              <span>주문 금액</span>

              <span>
                <fmt:formatNumber value="${totalPrice}" pattern="#,###" />원
              </span>
            </div>
            <div class="price-one-line">
              <span>배송비</span>
              <span>3,000원</span>
            </div>
            <div class="price-one-line">
              <span>최종결제금액</span>
              <c:set var="resultPrice" value="${totalPrice + 3000}"/>
              <span class="result-price"><fmt:formatNumber value="${resultPrice}" pattern="#,###" />원</span>
              <input type="hidden" name="orderPrice" value="${resultPrice}" id="resultPrice">
            </div>
          </div>
        </div>
      </section>
      <section class="agreement-container">
        <div class="order-headline">개인정보 수집/제공</div>
        <div>
          <div class="agree-all">
            <input type="checkbox" id="selectAll" onclick="selectAllCheckbox(this)" />
            <label for="selectAll">
              <span>결제 진행 필수 전체 동의</span>
            </label>
          </div>
          <div>
            <input type="checkbox" name="agreement"/>
            <span>(필수) 개인정보 수집/이용 및 처리 동의</span>
          </div>
          <div>
            <input type="checkbox"  name="agreement"/>
            <span>(필수) 개인정보 제3자 제공 동의</span>
          </div>
          <div>
            <input type="checkbox"  name="agreement"/>
            <span>(필수) 전자지급 결제대행 서비스 이용약관 동의</span>
          </div>
        </div>
      </section>
      <section class="submit-container">
        <button type="button" id="btn"><fmt:formatNumber value="${resultPrice}" pattern="#,###" />원 결제하기</button>
        <div class="notice-container">
          <p class="notice notice-p">
            [주문완료] 상태일 경우에만 주문 취소 가능합니다. <br />
            미성년자가 결제 시 법정대리인이 그 거래를 취소할 수 있습니다. <br />
            배송 불가 시, 결제수단으로 환불됩니다. 일부 또는 전체 상품이 품절
            등의 사유로 배송 되지 못할 경우, 신속하게 환불해 드리겠습니다.
          </p>
        </div>
      </section>
      <input type="hidden" id="impUid" name="impUid" />
    </form>

    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>

    <script>
      var memberName = '${loginMember.memberName}';
      var memberNo = '${loginMember.memberNo}';
      var memberTel = '${loginMember.to}';
      var memberAddress = '${loginMember.memberAddress2}';
      var orderAmount = '${fn:length(productList)}';
      var orderPrice = '${resultPrice}';

      var itemName;

      if(orderAmount > 1) {

      itemName = '${productList[0].productName} 외 ${fn:length(productList) - 1}개'
      }

      if(orderAmount == 1) {
      itemName = '${productList[0].productName}'
      }

      console.log(itemName);




    </script>

    
    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <!-- iamport.payment.js -->
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"></script>
    

    <!-- script -->
  <script src="/resources/js/common/common.js"></script>
    <script src="resources/js/order/order.js"></script>

    <script>
    
      
    </script>

  </body>
</html>
