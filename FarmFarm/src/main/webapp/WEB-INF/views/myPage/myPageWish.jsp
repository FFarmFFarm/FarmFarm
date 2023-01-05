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

        <div class="wish-list" >
          <span class="wish-list-title">찜 목록</span>

          <c:if test="${empty wishList}">
          <div>찜 목록이 비었습니다</div>
          </c:if>


          <div class="wish-list-container" id="wishListContainer">
          <c:if test="${!empty wishList}">
          <c:forEach var="wish" items="${wishList}">
            <div class="wish">
              <a href="/product/${wish.productNo}" class="wish-thumbnail">
              <c:if test="${! empty wish.productImg}">
                <img
                  src="${wish.productImg}"
                  alt=""
                  class="wish-thumbnail-img"
                />
              </c:if>
              </a>
              <div class="wish-info">
                <span class="wish-reg-date">${wish.wishDate}</span>
                <a href="/product/${wish.productNo}" class="wish-title">${wish.productName}</a>
                <span class="wish-price"><span> ${wish.productPrice}</span>원</span>
              </div>
              <button type="button" class="delete-wish-btn" id="${wish.productNo}">
                <i class="fa-solid fa-xmark"></i>
              </button>
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



        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>


    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageWish.js"></script>

  </body>
</html>
