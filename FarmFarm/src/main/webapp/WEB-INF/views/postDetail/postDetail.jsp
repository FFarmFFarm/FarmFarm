<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product Detail</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/postDetail/postDetail-style.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
    />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>
  </head>
  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <section class="product-summary">
        <div class="thumbnail-area swiper mySwiper">
          <div class="swiper-wrapper">
            <c:if test="${! empty post.imgList}">
              <c:forEach var="img" items="${post.imgList}">
                <img
                class="swiper-slide"
                src="${img.postImgAddress}"
                alt=""
                />
              </c:forEach>
            </c:if>

          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="summary-area">
          <span class="product-category">${post.categoryName}</span>
          <span class="product-name"
            >${post.postTitle}</span
          >
          <span class="product-price">${post.unitPrice}원</span>

          <div class="summary">
            <div class="summary-subject">
              <span class="open-date">생산일</span>
              <span class="seller">판매자</span>
              <span class="origin">원산지</span>
            </div>
            <div class="summary-content">
              <span class="open-date">${post.openDate}</span>
              <span class="seller">${post.memberNickname}</span>
              <span class="origin">국산</span>
            </div>
          </div>
          <div class="product-btn-area">
            <button type="button" class="chatting-btn">문의하기</button>
          </div>
        </div>
        <button type="button" class="share-btn">
          <i class="fa-solid fa-share"></i>
        </button>
      </section>
      <section class="product-menu">
        <a href="#productDetail">상세 설명</a>
      </section>
      <section class="product-detail" id="productDetail">
        ${post.postContent}
      </section>
      <section class="product-notice">
        <div class="notice-title">
          <span>주의사항</span>
        </div>
        <span
          >팜팜은 개인간 농산물 거래 중개 플랫폼일 뿐 거래상에서 발생하는 모든
          일에 책임을 지지 않습니다</span
        >
        <span>깨끗하고 공정한 거래이용 부탁드립니다.</span>
      </section>
    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script>
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    </script>
  </body>
</html>