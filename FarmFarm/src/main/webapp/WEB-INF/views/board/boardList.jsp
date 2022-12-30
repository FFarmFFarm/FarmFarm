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
    
    <link rel="stylesheet" href="/resources/css/member/memberModal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
</head>
<body>
    
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 물물교환 ${boardType.boardTypeNo}</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <a id="type1" href="/board/${1}">물물교환</a>
                <a id="type2" href="/board/${2}">팁</a>
                <a id="type3" href="/board/${3}">질문</a>
                
                <a id="type4" href="/board/${4}">시원이꺼</a>
            </div>
        </section>
        <form action="/board/${boardTypeNo}" class="board-search">
            <section class="board-search-area">
                <input type="text" name="query" id="inputQuery" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </section>
            <div class="board-select" name="boardSelectNVL" id="boardSelect">
                <sapn class="board-now-sort">
                    <span class="board-sort">최신순 &nbsp;</span>
                    <span><i class="fa-solid fa-angle-down"></i></span>
                </sapn>
                <div class="board-select-sort">
                    <ul class="board-select-area">
                        <li class="new" id="new">최신순</li>
                        <li class="view" id="view">조회수</li>
                        <li class="like" id="like">좋아요</li>
                    </ul>
                </div>
            </div>
            <%-- <select class="board-select" name="boardSelectNVL" id="boardSelect">
                <option value="new">최신순</option>
                <option value="view">조회수</option>
                <option value="like">좋아요</option>
            </select> --%>
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
                    <%-- <span class="board-img"></span> --%>
                    <span class="board-title">게시글 제목</span>
                    <span class="board-writer">작성자</span>
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
                                    <%-- <c:if test="${!empty board.thumbnail}">
                                        <span class="board-img"><img src="${board.thumbnail}" class="thumbImg"></span>
                                    </c:if>
                                    <c:if test="${empty board.thumbnail}">
                                        <span class="board-img"></span>
                                    </c:if> --%>
                                    <span class="board-title">
                                        <a href="/board/${boardTypeNo}/${board.boardNo}?cp=${pagination.currentPage}${sURL}" class="goBoard">
                                            ${board.boardTitle}&nbsp;(${board.commentCount})</a>
                                    </span>
                                    <span class="board-writer" id="${board.memberNo}">${board.memberNickname}</span>
                                    <span class="board-date">${board.boardDate}</span>
                                    <span class="board-view">${board.boardView}</span>
                                </li>

                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
                <div class="board-write-bottom">

                    <div class="pagination-area">
                        <!-- ajax로 만들어 보십시다 -->
                        <div id="1" class="page-box">
                            <i class="fa-solid fa-angles-left"></i>
                        </div>
                        <div id="${productMap.pagination.prevPage}" class="page-box">
                            <i class="fa-solid fa-angle-left"></i>
                        </div>
                        <c:forEach var="i" 
                                begin="${productMap.pagination.startPage}" 
                                end="${productMap.pagination.endPage}"
                                step="1">
                            <c:choose>
                                <c:when test="${i == productMap.pagination.currentPage}">
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

                        <div id="${productMap.pagination.nextPage}" class="page-box">
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                        <div id="${productMap.pagination.endPage}" class="page-box">
                            <i class="fa-solid fa-angles-right"></i>
                        </div>
                    </div>

                    <c:if test="${!empty loginMember}">
                        <a href="/board/write" class="board-write">글쓰기</a>
                    </c:if>
                </div>
            </div>
        </section>

    
    <%-- 프로필 클릭시 모달창 --%>
    <jsp:include page="/WEB-INF/views/member/memberModal.jsp"/>
    

    <%-- 로그인 모달창 --%>
    <jsp:include page="/WEB-INF/views/common/modal/loginConfirm.jsp"/>
    <%-- <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/> --%>

    </main>

    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script>
        let boardTypeNo = ${boardTypeNo};

        const boardSelectNVL = document.getElementById("boardSelect");
        let NVL = boardSelectNVL.value;

        const inputQuery = document.getElementById("inputQuery");
        let query = inputQuery.value;

        const loginYN = "${loginMember}";
    </script>
    <script src="/resources/js/board/boardList.js"> </script>
    <script src="/resources/js/common/common.js"> </script>
    <script src="/resources/js/member/memberModal.js"> </script>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
