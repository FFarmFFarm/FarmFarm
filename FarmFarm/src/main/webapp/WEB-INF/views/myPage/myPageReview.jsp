<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="reviewList" value="${map.reviewList}"/>
<c:set var="reviewCount" value="${map.reviewCount}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 작성 후기</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageReview-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>

      <!-- <div class="order-list-header"></div> -->
      <section class="list-container">
       <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>

        <div class="review-list">
          <span class="review-list-title">작성 후기</span>

          <c:if test="${empty reviewList}">
          <div>작성한 후기가 없습니다.</div>
          </c:if>
          <c:if test="${! empty reviewList}">
          <c:forEach var="review" items="${reviewList}">
          <div class="review">
            <div>
              <div class="review-container">
                <a href="/product/${review.productNo}" class="review-title">
                ${review.productName}
                </a>
                <div class="review-content">
                  <span> 내용 보기 </span>
                  <button type="button" class="fa-solid fa-angle-right"></button>
                </div>
              </div>
              <span class="review-reg-date">${review.createDate}</span>
            </div>
            <div class="review-detail">
              <div class="review-detail-content">
                <span>${review.productName}</span>
                <p>
                ${review.reviewContent}
                </p>

                <c:if test="${! empty review.imgList}">
                <div class="review-img">
                  <c:forEach var="img" items="${review.imgList}">
                  <img src="${img.reviewImgPath}" alt="" />
                  </c:forEach>
                </div>
                </c:if>
                <div class="review-create-date">
                  <span>${review.createDate}</span>
                  <span>도움 <span class="review-helped">${review.likeCount}</span> </span>
                </div>
              </div>
            </div>
          </div>
          </c:forEach>
          </c:if>

          <div class="pagination-area">
            <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="/review/${reviewCode}">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li>
                <a href="/review/${reviewCode}?cp=${pagination.prevPage}"
                  >&lt;</a
                >
              </li>

              <c:forEach
                var="i"
                begin="${pagination.startPage}"
                end="${pagination.endPage}"
                step="1"
              >
                <c:choose>
                  <c:when test="${i == pagination.currentPage}">
                    <!-- 현재 보고있는 페이지 -->
                    <li><a class="current">${i}</a></li>
                  </c:when>

                  <c:otherwise>
                    <li><a href="/review/${reviewCode}?cp=${i}">${i}</a></li>
                  </c:otherwise>
                </c:choose>
              </c:forEach>

              <!-- 다음 목록 시작 번호로 이동 -->
              <li>
                <a href="/review/${reviewCode}?cp=${pagination.nextPage}"
                  >&gt;</a
                >
              </li>

              <!-- 끝 페이지로 이동 -->
              <li>
                <a href="/review/${reviewCode}?cp=${pagination.maxPage}"
                  >&gt;&gt;</a
                >
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
  </body>
</html>
