<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="product" value="${map.product}" />
<c:set var="productImgList" value="${product.imgList}" />
<c:set var="reviewImgAll" value="${product.reviewImgAll}" />
<c:set var="pagination" value="${map.pagination}" />
<c:set var="reviewCount" value="${map.reviewCount}" />
<c:set var="reviewList" value="${map.reviewList}" />
<c:set var="reviewImgList" value="${review.imgList}" />


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product Detail</title>

    <link
      rel="stylesheet"
      href="/resources/css/productDetail/productDetail-style.css"
    />
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewImg-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewDetail-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      
      <section class="product-summary">
        <div class="thumbnail-area">
          <c:forEach var="productImg" items="${productImgList}">
            <c:if test="${productImg.productImgOrder == 0}">  
            <img
            src="${productImg.productImgAddress}"
            alt=""
            />
          </c:if>
          </c:forEach>
        </div>
        <div class="summary-area">
          <span class="product-category">${product.categoryName}</span>
          <span class="product-name">${product.productName}</span>
          <span class="product-message">${product.productMessage}</span>

          <span class="product-price">${product.productPrice}<span>원</span></span>
          <!-- 로그인 x 일 때 -->
          <c:if test="${empty loginMember}">
            <span class="login-meassage">로그인 후 구매 가능합니다</span>
          </c:if>

          <div class="summary">
            <div class="summary-subject">
              <span class="shipping">배송</span>
              <span class="seller">판매자</span>
              <span class="origin">원산지</span>
            </div>
            <div class="summary-content">
              <div class="shipping">
                <span class="shipping">택배</span>
                <span class="shipping shipping-message"
                  >주문 후 2~5일 배송</span
                >
              </div>
              <span class="seller">팜팜</span>
              <span class="origin">국산</span>
            </div>
          </div>
          <div class="product-option">
            <span>${product.productName}</span>
            <div class="amount-area">
              <button type="button">-</button>
              <span>1</span>
              <button type="button">+</button>
            </div>
            <div class="total-price">
              <span>총 금액:</span>
              <span> ${product.productPrice}<span>원</span></span>
            </div>
          </div>
          <div class="product-btn-area">
            <c:if test="${! empty loginMember}">
              <button type="button" class="chatting-btn">
                <i class="fa-regular fa-comment-dots"></i>
              </button>
            </c:if>
            <button type="button" class="cart-btn">장바구니 담기</button>
            <button type="button" class="order-btn">주문하기</button>
          </div>
        </div>
        <button type="button" class="share-btn">
          <i class="fa-solid fa-share"></i>
        </button>
        <c:if test="${! empty loginMember}">
          <c:if test="${product.wishCheck == 0}">
            <button class="wish-btn fa-brands fa-gratipay wish-unclicked"></button>
          </c:if>
          <c:if test="${product.wishCheck == 1}">
            <button class="wish-btn fa-brands fa-gratipay wish-clicked"></button>
          </c:if>
        </c:if>
      </section>
      <section class="product-menu">
        <a href="#productDetail">상세 설명</a>
        <a href="#productReview">후기(<span>${reviewCount}</span>)</a>
      </section>
      <section class="product-detail" id="productDetail">
        <c:forEach var="productImg" items="${productImgList}">
          <c:if test="${productImg.productImgOrder != 0}">  
            <img
            src="${productImg.productImgAddress}"
            alt=""
            />
          </c:if>
        </c:forEach>
      </section>
      <section class="product-review" id="productReview">
        <span>상품 후기</span>

        <!-- reviewImgAll이 비어있지 않을 때 -->
        <c:if test="${! empty reviewImgAll}">
          <ul class="review-img-list">

          <!-- reviewImgAll의 길이가 8보다 작을 때 -->
          <c:if test="${fn:length(reviewImgAll) lt 8}">
            <c:forEach var="reviewImg" items="${reviewImgAll}">
                  <li id="${reviewImg.reviewNo}">
                    <img src="${reviewImg.reviewImgPath}" alt="" />
                  </li>
            </c:forEach>
          </c:if>

          <!-- reviewImgAll의 길이가 7보다 클 때 -->
          <c:if test="${fn:length(reviewImgAll) gt 7}">
            <c:forEach var="reviewImg" items="${reviewImgAll}" begin="0" end="6">
              <li id="${reviewImg.reviewNo}">
                <img src="${reviewImg.reviewImgPath}" alt="" />
              </li>
            </c:forEach>

            <c:forEach var="reviewImg" items="${reviewImgAll}" begin="7" end="7">
                <!-- 8개 이상일 때 -->
                <li class="last-review-img" id="${reviewImg.reviewNo}">
                  <img src="${reviewImg.reviewImgPath}" alt="" />
                  <div class="more-review-img-btn">+더보기</div>
                </li>
            </c:forEach>
          </c:if>
        </ul>
      </c:if>



        <div class="review-header">
          <span>총 <span>${reviewCount}</span>개</span>
          <div>
            <button class="popular">추천순</button>
            <span>|</span>
            <button class="latest">최근 등록순</button>
          </div>
        </div>
        <ul class="review-list">

          <c:if test="${reviewCount == 0}">
            <li class="no-review">
              리뷰가 없습니다. 상품을 구입하고 첫 후기를 남겨주세요.
            </li>
          </c:if>

          <c:if test="${reviewCount > 0}">
          <c:forEach var="review" items="${reviewList}">
            <li class="review">
                <div class="review-writer">
                 <c:if test="${empty review.profileImg}">
                    <img
                    src="/resources/images/member/profile/profile.png"
                    alt=""
                    class="writer-profile-img"
                    />
                  </c:if>
                  <c:if test="${! empty review.profileImg}">
                    <img
                    src="${review.profileImg}"
                    alt=""
                    class="writer-profile-img"
                    />
                  </c:if>
              <div class="nickname-area">
                <span class="writer-nickname">${review.memberNickname}</span>
                <c:if test="${review.likeCount > 10}">
                  <span class="best-review">베스트</span>
                </c:if>
              </div>
              </div>
              <div class="review-content">
                <span>${product.productName}</span>
                <p>
                  ${review.reviewContent}
                </p>
                <div class="review-img">
                  <c:if test="${! empty review.imgList}">
                    <c:forEach var="img" items="${review.imgList}">
                      <img src="${img.reviewImgPath}" alt="" />
                    </c:forEach>
                  </c:if>
                </div>
                <div class="review-create-date">
                  <span>${review.createDate}</span>
                  <c:if test="${! empty loginMember}">
                  <c:if test="${review.likeCheck > 0}">
                    <button class="clicked"><i class="fa-regular fa-thumbs-up "></i>도움돼요</button>
                  </c:if>
                  <c:if test="${review.likeCheck == 0}">
                    <button class="unclicked"><i class="fa-regular fa-thumbs-up "></i>도움돼요</button>
                  </c:if>
                  </c:if>
                </div>
              </div>
            </li>
          </c:forEach>
          </c:if> 
        </ul>

        <div class="pagination">
          <c:if test="${1 lt pagination.currentPage}">
            <button><i class="fa-solid fa-chevron-left"></i></button>
          </c:if>
          <c:if test="${pagination.maxPage > pagination.currentPage}">
            <button><i class="fa-solid fa-chevron-right"></i></button>
          </c:if>
          </div>
      </section>
    </main>


    <!-- 리뷰 이미지 목록 모달창 -->
    <div class="review-img-container">
      <div class="review-img-list-modal">
        <div class="review-img-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-img-head-title">후기 목록</span>
          <span class="empty"></span>
        </div>
        <div class="review-img-area">
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
        </div>
        <div class="pagenation-area">
          <button><i class="fa-solid fa-chevron-left"></i></button>
          <button><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>


    <!-- 리뷰 상세조회 모달창 -->
    <div class="review-detail-container">
      <div class="review-detail-modal">
        <div class="review-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-head-title">후기 상세</span>
          <span class="empty"></span>
        </div>
        <div class="review-product-preview">
          <div class="product-thumbnail">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-product-name">
            <span>[이연복의 목란] 짬뽕 2인분</span>
          </div>
        </div>
        <div class="review-content-area">
          <div class="review-detail-content">
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
          </div>
          <div class="review-notice">
            <p>개인의 경험일 뿐 사실과 다를 수 있습니다.</p>
          </div>
          <div class="review-uploaded-img">
            <div class="uploaded-img">
              <img
                src="/resources/images/post/postDetail/detail/20180802_1_15415.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="review-create-date">
            <span>2022.12.16</span>
            <c:if test="${! empty loginMember}">
              <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
            </c:if>
          </div>
        </div>
      </div>
    </div>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
  </body>
</html>
