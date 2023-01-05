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
    <link rel="stylesheet" href="/resources/css/modal/reviewForm-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageReview-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
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

        <div class="review-list" >
          <span class="review-list-title">작성 후기</span>

          <c:if test="${empty reviewList}">
          <div class="no-review">작성한 후기가 없습니다.</div>
          </c:if>
          <c:if test="${! empty reviewList}">
          <c:forEach var="review" items="${reviewList}">
          <div class="review-list-area" id="reviewListContainer">

            <div class="review">
              <div>
              <div class="review-container">
                <a href="/product/${review.productNo}" class="review-title">
                  ${review.productName}
                </a>
                <div class="review-content show-btn">
                  <span > 내용 보기 </span>
                  <button type="button" class="fa-solid fa-angle-right"></button>
                </div>
              </div>
              <span class="review-reg-date">${review.createDate}</span>
            </div>
            <div class="review-detail hide">
              <div class="review-detail-content">
                <button type="button" class="review-update-btn" id="${review.reviewNo}">수정</button>
                <button type="button" class="review-delete-btn" id="${review.reviewNo}">삭제</button>
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

      <c:if test="${!empty reviewList}">

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
    </c:if>
      


      </div>
      </section>
    </main>

    <script>
      var memberNo = "${loginMember.memberNo}";
      var reviewNo;

    </script>

    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <!-- modal -->
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <jsp:include page="/WEB-INF/views/myPage/modal/reviewUpdateForm.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <jsp:include page="/WEB-INF/views/myPage/modal/reviewDeleteConfirm.jsp"/>

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageReview.js"></script>
    <script src="/resources/js/myPage/updateReview.js"></script>

  </body>
</html>
