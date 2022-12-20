<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
            <div class="board-top-title">와글와글 ${board.boardName}</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <span>물물교환</span>
                <span>팁</span>
                <span>질문</span>
            </div>
        </section>
        <section class="board-search">
            <form action="" class="board-search-area">
                <input type="text" name="query" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <select class="board-select" id="boardSelect">
                <option value="new">최신순</option>
                <option value="view">조회수</option>
                <option value="like">좋아요</option>
            </select>
        </section>
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
                            <c:forEach var="board" items="$boardList}">
                                <li>
                                    <span class="board-no">${board.boardNo}</span>
                                    <span class="board-img">${board.boardImg}</span>
                                    <span class="board-title">${board.boardTitle}</span>
                                    <span class="board-date">5분전</span>
                                    <span class="board-view">${board.boardView}</span>
                                </li>

                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
                <div class="board-write-bottom">
                    <div class="board-pagination">
                        <ul class="pagination">

                            <%-- 첫 페이지 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=1${sURL}">&1t;&1t;</a> </li>

                            <%-- 이전 목록 마지막 번호로 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=${pagination.prevPage}${sURL}">&1t;</a> </li>

                            <%-- 페이지 번호 --%>
                            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                        <%-- 현재 페이지 --%>
                                        <li><a class="current">${i}</a></li>
                                    </c:when>

                                    <c:otherwise>
                                        <%-- 현재 페이지 제외 페이지 --%>
                                        <li><a href="/board/&{boardCode}?cp=${i}${sURL}">${i}</a></li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                            <%-- 다음 목록 시작 페이지 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=${pagination.nextPage}${sURL}">&gt;</a> </li>

                            <%-- 끝 페이지로 이동 --%>
                            <li> <a href="/board/&{boardCode}?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>
                        </ul>
                    </div>
                    <button class="board-write">글쓰기</button>
                </div>
            </div>
        </section>
    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
