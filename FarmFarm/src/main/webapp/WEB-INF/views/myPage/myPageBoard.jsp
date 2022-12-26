<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="boardList" value="${map.boardList}" />
<c:set var="boardCount" value="${map.boardCount}" />


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 작성 게시글</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageBoard-style.css" />
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
        <div class="board-list">
          <span class="board-list-title">작성 게시글</span>
          <div class="board-list-header">
            <div class="sort-area">
              <button class="latest sort-clicked" id="sortNewest">최신순</button>
              <span class="or-bar">|</span>
              <button class="view" id="sortView">조회수순</button>
            </div>
          </div>
          <div class="list-category">
            <span class="board-no">번호</span>
            <div class="board-thumbnail"></div>
            <span class="board-title">제목</span>
            <span class="board-reg-date">작성일</span>
            <span class="board-read-count">조회수</span>
          </div>

          <div class = "board-list-container" id = "boardListContainer">

          
            <c:if test="${empty boardList}">
            <div>작성 게시글이 없습니다.</div>
            </c:if>

            <c:if test="${! empty boardList}">
            <c:forEach var="board" items="${boardList}">
              

            <div class="board">
              <span class="board-no">${board.boardNo}</span>
              <div class="board-thumbnail">
              <c:if test="${! empty board.thumbnail}"> 
                <img
                  src="${board.thumbnail}"
                  alt=""
                  class="board-thumbnail-img"
                />
              </c:if>
              </div>
              <a href="/board/${board.boardTypeNo}/${board.boardNo}" class="board-title title-line">
                <c:if test="${fn:length(board.boardTitle) >= 27}">
                <div>${board.boardTitle}...</div>
                </c:if>
                <c:if test="${fn:length(board.boardTitle) lt 27}">
                <div>${board.boardTitle}</div>
              </c:if>
                <span>[${board.commentCount}]</span>
              </a>

              <span class="board-reg-date">${board.boardDate}</span>
              <span class="board-read-count">${board.boardView}</span>
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

    <script>
      var sortFl = 'N';
    </script>

    <!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/common/common.js"></script>

    <script src="/resources/js/myPage/myPage.js"></script>
    <script src="/resources/js/myPage/myPageBoard.js"></script>

  </body>
</html>
