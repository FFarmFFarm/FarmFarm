<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="orderList" value="${map.orderList}"/>
<c:set var="orderCount" value="${map.orderCount}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 주문 내역</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageOrder-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewForm-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>
      

  
    <section class="list-container">
       
    <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>


      <div class="order-list">
        <span class="order-list-title">주문 내역</span>
        <c:if test="${empty orderList}">
          <div>주문 내역이 없습니다.</div>
        </c:if>


        <c:if test="${! empty orderList}">
        <c:forEach var="order" items="${orderList}">

        <div class="order">
          <div class="order-info-container">
            <div class="order-info">
              <input type="hidden" value="${order.orderNo}" />
              <a href="" class="order-no">주문번호 <span>${order.orderNo}</span></a>
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
                <a href="/product/${product.productNo}" class="product-title">${product.productName}</span></a>
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
                <a class="order-shipping">배송중</a>
                </c:if>
                <c:if test="${order.orderStatus == 2}">
                <span>취소완료</span>
                </c:if>
                <c:if test="${order.orderStatus == 3}">
                <span>구매확정</span>
                </c:if>
              </div>
            </div>
            <div class="button-area">
              <c:if test="${order.orderStatus == 0}">
              <button type="button">구매확정</button>
              <button type="button">주문취소</button>
              </c:if>
              <c:if test="${order.orderStatus == 1}">
              <button type="button">구매확정</button>
              <button type="button">반품요청</button>
              </c:if>
              <c:if test="${order.orderStatus == 2}">
              </c:if>
              <c:if test="${order.orderStatus == 3}">
              <button type="button">리뷰작성</button>
              </c:if>
            </div>
          </div>
          </c:forEach>
          <div class="total-price">총 <span>${order.orderPrice}</span>원</div>
        </div>

        </c:forEach>
        </c:if>

      
        <div class="pagination-area">
          <!-- ajax로 만들어 보십시다 -->
          <div id="1" class="page-box">
              <i class="fa-solid fa-angles-left"></i>
          </div>
          <div id="${pagination.prevPage}" class="page-box">
              <i class="fa-solid fa-angle-left"></i>
          </div>
          <c:forEach var="i" 
                      begin="${pagination.startPage}" 
                      end="${pagination.endPage}"
                      step="1">
              <c:choose>
                  <c:when test="${i == pagination.currentPage}">
                      <div class="current-page-box">
                          ${i}
                      </div>
                  </c:when>
              
                  <c:otherwise>
                      <div id="${i}" class="page-box">
                          ${i}
                      </div>
                  </c:otherwise>
              </c:choose>
          </c:forEach>

          <div id="${pagination.nextPage}" class="page-box">
              <i class="fa-solid fa-angle-right"></i>
          </div>
          <div id="${pagination.endPage}" class="page-box">
              <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>



        
      </div>
    </section>

  </main>

    <div class="review-form-container">
      <form action="" method="post" class="review-form">
        <div class="review-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-head-title">후기 작성</span>
          <span class="empty"></span>
        </div>
        <div class="review-product-preview">
          <div class="product-thumbnail">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="product-name">
            <span>[이연복의 목란] 짬뽕 2인분</span>
          </div>
        </div>
        <div class="review-write-area">
          <div class="review-write-head">
            <span>자세한 후기를 들려주세요</span>
            <span
              >작성 시 유의사항 <i class="fa-regular fa-circle-question"></i
            ></span>
          </div>
          <div class="review-write-content">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="review-img-upload">
            <div class="review-one-img">
              <label for="reviewImg"><i class="fa-solid fa-plus"></i></label>
              <input type="file" id="reviewImg" />
            </div>
          </div>
          <div class="review-notice">
            <p>
              사진은 최대 5장까지, 30MB 이하의 이미지만 업로드가 가능합니다.
            </p>
          </div>
          <div class="review-submit"><button>등록하기</button></div>
        </div>
      </form>
    </div>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
  </body>
</html>
