<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="commentList" value="${map.commentList}" />
<c:set var="pagination" value="${map.pagination}" />

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 작성 댓글</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageComment-style.css" />
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

        <div class="comment-list" >
          <span class="comment-list-title">작성 댓글</span>
          <div class="list-category">
            <span class="comment-category">댓글</span>
            <span class="comment-reg-date">작성일</span>
          </div>

          <div class="comment-list-container" id="commentListContainer">
            <c:if test="${empty commentList}">
            <div class="comment">
              <div class="comment-container">
                작성 댓글이 없습니다
              </div>
            </div>
            </c:if>
  
            <c:if test="${not empty commentList}">
            <c:forEach var="comment" items="${commentList}">
            <div class="comment">
              <div class="comment-container">
                <span class="comment-content">${comment.commentContent}</span>
                <a href="/board/${comment.boardTypeNo}/${comment.boardNo}" 
                  class="comment-title">
                  ${comment.boardTitle}[${comment.commentCount}]
                </a>
              </div>
              <span class="comment-reg-date">${comment.commentDate}</span>
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
    <script src="/resources/js/myPage/myPageComment.js"></script>

  </body>
</html>
