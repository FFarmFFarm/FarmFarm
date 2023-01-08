<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="boardList" value="${boardMap.boardList}"/>
<c:set var="pagination" value="${boardMap.pagination}"/>
<%-- <c:set var="pagination" value="${boardMap.pagination}"/> --%>

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

    <link rel="stylesheet" href="/resources/css/report/report-modal-style.css" />
</head>
<body>
    
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

        <c:if test="${not empty param.key}">
            <c:set var="sURL" value="&key=${param.key}&query=${param.query}"/>
        </c:if>
        <%-- <c:if test="${not empty param.query}">
            <c:set var="sURL" value="&query=${param.query}"/>
        </c:if> --%>
        <c:if test="${not empty param.sort}">
            <c:set var="soURL" value="&sort=${param.sort}"/>
        </c:if>

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
                <select name="key" id="search-key">
                    <option value="t">제목</option>
                    <option value="c">내용</option>
                    <option value="tc">제목+내용</tion>
                    <option value="w">작성자</option>
                </select>
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
        </form>
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

                    <ul class="board-pagination">
                    
                        <!-- 첫 페이지로 이동 -->    <!-- 검색 안하면 그냥 빈칸으로 나옴 -->
                        <li id="1" class="pageLi"><a>&lt;&lt;</a></li>

                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li id="${pagination.prevPage}" class="pageLi"><a>&lt;</a></li>
                                                    <!-- qusert string 형식으로 적어야된데 -->

                        <c:forEach var="i" begin="${pagination.startPage}" 
                            end="${pagination.endPage}" step="1">

                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <%-- 현재 페이지인 경우 --%>
                                    <li id="${i}" class="pageLi"><a class="current">${i}</a></li>
                                </c:when>

                                <c:otherwise>
                                    <!-- 현재 페이지를 제외한 나머지 -->
                                    <li id="${i}" class="pageLi"><a>${i}</a></li>
                                </c:otherwise>
                            </c:choose>

                        </c:forEach>
                        
                        <!-- 특정 페이지로 이동 -->
                        
                        <!-- 다음 목록 시작 번호로 이동 -->
                        <li id="${pagination.nextPage}" class="pageLi"><a>&gt;</a></li>

                        <!-- 끝 페이지로 이동 -->
                        <li id="${pagination.maxPage}" class="pageLi"><a>&gt;&gt;</a></li>

                    </ul>

                    <c:if test="${!empty loginMember}">
                        <a href="/board/write/${boardTypeNo}" class="board-write">글쓰기</a>
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

    <!-- 신고 모달창 -->
    <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 
    <script src="/resources/js/report/report-modal-common.js"></script>
    <script src="/resources/js/report/report-modal-boardList.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script>
        let boardTypeNo = ${boardTypeNo};

        let sort = "new";

        const inputQuery = document.getElementById("inputQuery");
        // let query = inputQuery.value;
        let query = "${param.query}";
        let key = "${param.key}";

        let cp = 1;

        const loginYN = "${loginMember}";

    </script>
    <script src="/resources/js/board/boardList.js"> </script>
    <script src="/resources/js/member/memberModal.js"> </script>
    <script src="/resources/js/common/common.js"> </script>

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
