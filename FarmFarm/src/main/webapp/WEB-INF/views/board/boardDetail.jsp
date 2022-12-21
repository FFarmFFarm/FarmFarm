<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>와글와글 게시글 보기</title>
    <link rel="stylesheet" href="/resources/css/board/boardDetail-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
</head>
<body>
    <%-- 헤더 jsp 만들어지면 include하기 --%>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 ${boardType.boardName}</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <span>물물교환</span>
                <span>팁</span>
                <span>질문</span>
            </div>
        </section>
        <section class="board-title-content">
            <div class="board-title-area">
                <div class="writer-img">
                    <c:if test="${empty board.profileImg}">
                        <img src="" alt=""><%-- 기본 이미지 주소 넣기 --%>
                    </c:if>
                    <c:if test="${!empty board.profileImg}">
                        <img src="${board.profileImg}" alt="">
                    </c:if>
                </div>
                <div class="writer-ect">
                    <div class="writer-name">${board.memberName}</div>
                    <div class="writer-date-view">${board.date}  5분전  조회 ${board.view}</div>
                </div>
                <div class="board-title">
                    ${board.barodTitle}
                </div>
            </div>
            <div class="board-content-area">
                <div class="board-content">
                    <pre> 
${board.boardContent}
채소교환 하고 싶어요
저희 집 못난이 호박이랑 예쁜 자색 옷을 입고 있는 자색고구마랑 바꿔요
너무 못생겨서 먹기 싫어요
                    </pre>
                </div>

                <div class="board-img-area">

                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                    
                    <div class="board-img">
                        <img src="" class="board-preview">
                    </div>
                </div>
            </div>
        </section>
        <section class="board-like-report">
            <c:if test="${loginMember.memberNo == board.memberNo}">
                <button class="board-like"><i class="fa-solid fa-heart"></i>좋아요<span id="likeCount">2</span></button>
                <button class="board-report">신고</button>
            </c:if>
            <c:if test="${loginMember.memberNo != board.memberNo}">
                <button>수정하기</button>
                <button>삭제하기</button>
            </c:if>
        </section>

    <%-- 댓글 --%>
    <jsp:include page="/WEB-INF/views/board/comment.jsp"/>


    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>