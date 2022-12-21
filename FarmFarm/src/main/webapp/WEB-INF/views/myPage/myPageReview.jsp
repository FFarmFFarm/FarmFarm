<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


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
          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 내용 보기 </span>
                <i class="fa-solid fa-angle-right"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>
          <div class="review-detail">
            <div class="review-detail-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <span>도움 <span class="review-helped">12</span> </span>
              </div>
            </div>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>

          <div class="review">
            <div class="review-container">
              <a href="" class="review-title">게시글 제목 샘플</a>
              <div class="review-content">
                <span> 후기 내용 </span>
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <span class="review-reg-date">2022.12.15</span>
          </div>
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
