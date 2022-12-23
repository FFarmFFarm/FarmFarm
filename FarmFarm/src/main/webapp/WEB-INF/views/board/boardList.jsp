<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="boardList" value="${boardMap.boardList}"/>
<c:set var="pagination" value="${boardMap.pagination}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>와글와글 커뮤니티</title>
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/resources/css/board/boardList-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
</head>
<body>
    
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 물물교환</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <a id="type1" href="/board/${1}">물물교환</a>
                <a id="type2" href="/board/${2}">팁</a>
                <a id="type3" href="/board/${3}">질문</a>
            </div>
        </section>
        <form action="/board/${boardTypeNo}" class="board-search">
            <section class="board-search-area">
                <input type="text" name="query" id="inputQuery" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </section>
            <select class="board-select" name="boardSelectNVL" id="boardSelect">
                <option value="new">최신순</option>
                <option value="view">조회수</option>
                <option value="like">좋아요</option>
            </select>
            <%-- <div class="board-select" name="boardSelectNVL" id="boardSelect">
                <button value="new">최신순 <i class="fa-solid fa-angle-down"></i></button>
                <button value="view">조회수 <i class="fa-solid fa-angle-down"></i></button>
                <button value="like">좋아요 <i class="fa-solid fa-angle-down"></i></button>
            </div> --%>
        </form>
        <%-- <section class="board-search">
            <form action="/board/${boardTypeNo}" class="board-search-area">
                <input type="text" id="query" name="query" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <select class="board-select" name="boardSelectNVL" id="boardSelect">
                <option value="new">최신순</option>
                <option value="view">조회수</option>
                <option value="like">좋아요</option>
            </select>
        </section> --%>
        <section class="board-list">
            <div class="board-list-top">
                <div class="board-List-title">
                    <span class="board-no">No.</span>
                    <span class="board-img"></span>
                    <span class="board-title">게시글 제목</span>
                    <span class="board-date">작성일</span>
                    <span class="board-view">조회수</span>
                </div>
                <ul class="board-list-area">
                    <c:choose>
                        <c:when test="${empty boardList}">
                            <div class="empty-list">
                                등록된 게시글이 없습니다.
                                첫 게시물의 주인공이 되어보세요!
                            </div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="board" items="${boardList}">
                                <li>
                                    <span class="board-no">${board.boardNo}</span>
                                    <c:if test="${!empty board.thumbnail}">
                                        <span class="board-img"><img src="${board.thumbnail}" class="thumbImg"></span>
                                    </c:if>
                                    <c:if test="${empty board.thumbnail}">
                                        <span class="board-img"></span>
                                    </c:if>
                                    <span class="board-title"><a href="">${board.boardTitle}</a></span>
                                    <span class="board-date">${board.boardDate}</span>
                                    <span class="board-view">${board.boardView}</span>
                                </li>

                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
                <div class="board-write-bottom">
                    <div class="board-pagination">
                                <div class="pagination-area">
                        <ul class="pagination">

                            <%-- 첫 페이지 이동 --%>
                            <li> <a href="/board/${boardTypeNo}?cp=1${sURL}">&1t;&1t;</a> </li>

                            <%-- 이전 목록 마지막 번호로 이동 --%>
                            <li> <a href="/board/${boardTypeNo}?cp=${pagination.prevPage}${sURL}">&1t;</a> </li>

                            <%-- 페이지 번호 --%>
                            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                        <%-- 현재 페이지 --%>
                                        <li><a class="current">${i}</a></li>
                                    </c:when>

                                    <c:otherwise>
                                        <%-- 현재 페이지 제외 페이지 --%>
                                        <li><a href="/board/${boardTypeNo}?cp=${i}${sURL}">${i}</a></li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                            <%-- 다음 목록 시작 페이지 이동 --%>
                            <li> <a href="/board/${boardTypeNo}?cp=${pagination.nextPage}${sURL}">&gt;</a> </li>

                            <%-- 끝 페이지로 이동 --%>
                            <li> <a href="/board/&{boardTypeNo}?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>
                        </ul>
                    </div>
                    <c:if test="${!empty loginMember}">
                        <a href="/board/write" class="board-write">글쓰기</a>
                    </c:if>
                </div>
            </div>
        </section>
    </main>
    <script>
        let boardTypeNo = ${boardTypeNo};
    </script>
    <script src="/resources/js/board/boardList.js"> </script>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
