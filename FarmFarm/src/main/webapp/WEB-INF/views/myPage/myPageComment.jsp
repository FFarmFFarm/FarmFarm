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

        <div class="comment-list">
          <span class="comment-list-title">작성 댓글</span>
          <div class="list-category">
            <span class="comment-category">댓글</span>
            <span class="comment-reg-date">작성일</span>
          </div>


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
              <a href="" class="comment-title">${comment.boardTitle}(${comment.commentCount})</a>
            </div>
            <span class="comment-reg-date">${comment.commentDate}</span>
          </div>
          </c:forEach>
          </c:if> 


          <div class="pagination-area">
            <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="/myPage/comment">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li>
                <a href="/myPage/comment?cp=${pagination.prevPage}"
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
                    <li><a href="/myPage/comment?cp=${i}">${i}</a></li>
                  </c:otherwise>
                </c:choose>
              </c:forEach>

              <!-- 다음 목록 시작 번호로 이동 -->
              <li>
                <a href="/myPage/comment?cp=${pagination.nextPage}"
                  >&gt;</a
                >
              </li>

              <!-- 끝 페이지로 이동 -->
              <li>
                <a href="/myPage/comment?cp=${pagination.maxPage}"
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
