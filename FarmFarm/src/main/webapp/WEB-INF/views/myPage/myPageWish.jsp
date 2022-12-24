<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="wishList" value="${map.wishList}"/>
<c:set var="wishCount" value="${map.wishCount}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 찜 목록</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageWish-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>


      <!-- <div class="order-list-header"></div> -->
      <section class="list-container">
        <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>

        <form action="" method="post" class="wish-list">
          <span class="wish-list-title">찜 목록</span>

          <c:if test="${empty wishList}">
          <div>찜 목록이 비었습니다</div>
          </c:if>
          <c:if test="${!empty wishList}">
          <c:forEach var="wish" items="${wishList}">
          
          <div class="wish">
            <div class="wish-thumbnail">
            <c:if test="${! empty wish.productImg}">
              <img
                src="${wish.productImg}"
                alt=""
                class="wish-thumbnail-img"
              />
            </c:if>
            </div>
            <div class="wish-info">
              <span class="wish-reg-date">${wish.wishDate}</span>
              <a href="/product/${productNo}" class="wish-title">${wish.productName}</a>
              <span class="wish-price"><span> ${wish.productPrice}</span>원</span>
            </div>
            <button type="button" class="delete-wish-btn">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          </c:forEach>
          </c:if>


          <div class="pagination-area">
            <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="/board/${boardCode}">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.prevPage}">&lt;</a>
              </li>

              <!-- <c:forEach
                var="i"
                begin="${pagination.startPage}"
                end="${pagination.endPage}"
                step="1"
              >
                <c:choose>
                  <c:when test="${i == pagination.currentPage}">
                   현재 보고있는 페이지
                    <li><a class="current">${i}</a></li>
                  </c:when>
  
                  <c:otherwise>
                    <li><a href="/board/${boardCode}?cp=${i}">${i}</a></li>
                  </c:otherwise>
                </c:choose>
              </c:forEach> -->

              <!-- 다음 목록 시작 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.nextPage}">&gt;</a>
              </li>

              <!-- 끝 페이지로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.maxPage}"
                  >&gt;&gt;</a
                >
              </li>
            </ul>
          </div>
        </form>
      </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
  </body>
</html>
