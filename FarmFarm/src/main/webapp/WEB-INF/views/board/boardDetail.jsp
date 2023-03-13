<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 와글와글</title>
    <link rel="stylesheet" href="/resources/css/board/boardDetail-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />

    <link rel="stylesheet" href="/resources/css/member/memberModal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

    <link rel="stylesheet" href="/resources/css/report/report-modal-style.css" />
    
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
                    <a href="/boards/${1}" id="type1">자유게시판</a>
                    <a href="/boards/${2}" id="type2">팁</a>
                    <a href="/boards/${3}" id="type3">질문</a>
                </div>
            </section>
            <section class="board-title-content">
                <div class="board-title-area">
                    <div class="board-title">
                        ${board.boardTitle}
                    </div>
                    <div class="temptemp">
                        <div class="writer-img">
                            <c:if test="${empty board.profileImg}">
                                <img src="/resources/images/default/profileImg.png" alt=""><%-- 기본 이미지 주소 넣기 --%>
                            </c:if>
                            <c:if test="${!empty board.profileImg}">
                                <img src="${board.profileImg}" alt="">
                            </c:if>
                        </div>
                        <div class="writer-ect">
                            <div class="writer-name">${board.memberNickname}</div>
                            <div class="writer-date-view">${board.boardDate}&nbsp; 조회&nbsp; ${board.boardView}</div>
                        </div>
                        <div class="goList">목록으로</div>
                    </div>
                </div>
                <div class="board-content-area">
                    <div class="board-content">
                        ${board.boardContent}
                    </div>

                    <div class="board-img-area">
                        <c:if test="${!empty board.imgList}">
                            <c:forEach var="i" begin="0" end="${fn:length(board.imgList)-1}">
                                <div class="board-img">
                                    <img src="${board.imgList[i].boardImgAddress}" class="board-preview">
                                </div>
                            </c:forEach>

                        </c:if>
                    </div>
                </div>
            </section>
            <section class="board-like-report">
            
                <c:if test="${loginMember.memberNo != board.memberNo && loginMember.authority != 2}">
                    <button class="board-like">
                        <c:if test="${empty likeCheck}"> 
                            <%-- 좋아요 안눌러진 경우 --%>
                            <i class="fa-regular fa-heart" id="boardLike"></i>
                        </c:if>
                        <c:if test="${!empty likeCheck}">
                            <%-- 좋아요 눌러진 경우 --%>
                            <i class="fa-solid fa-heart checkLike" id="boardLike"></i>
                        </c:if>
                        &nbsp; 좋아요&nbsp;<span id="likeCount">${board.likeCount}</span>
                    </button>
                    <!-- 여기 추가했습니다. -->
                    <c:if test="${board.memberNickname != '관리자'}"> 
                        <button class="board-report report-btn" id="reportBoardBtn">신고</button>
                    </c:if>
                </c:if>
                <c:if test="${loginMember.memberNo == board.memberNo && loginMember.authority == 2}">
                    <button type="button" id="boardUpdate">수정하기</button>
                    <button  type="button" id="boardDelete">삭제하기</button>
                </c:if>
                <c:if test="${loginMember.memberNo == board.memberNo && loginMember.authority != 2}">
                    <button type="button" id="boardUpdate">수정하기</button>
                    <button  type="button" id="boardDelete">삭제하기</button>
                </c:if>
                <c:if test="${loginMember.memberNo != board.memberNo && loginMember.authority == 2}">
                    <button  type="button" id="adminBoardDelete">삭제하기</button>
                </c:if>
            </section>

            <jsp:include page="/WEB-INF/views/board/comment.jsp"/>

    </main>
    <script>
        boardTypeNo = "${board.boardTypeNo}";
        boardNo = "${board.boardNo}";
        boardMemNo = "${board.memberNo}";
        memberNo = "${loginMember.memberNo}";
        loginAuth = "${loginMember.authority}";
        let query = "${param.query}";
        let key = "${param.key}";
        // let sort = "${param.sort}";
    </script>

    <%-- axios --%>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/> 

    <%-- 프로필 클릭시 모달창 --%>
    <jsp:include page="/WEB-INF/views/member/memberModal.jsp"/>

    <!-- 신고 모달창 -->
    <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/board/boardDetail.js"> </script>
    <script src="/resources/js/board/comment.js"> </script>

    <script src="/resources/js/board/boardList.js"> </script>

    <script src="/resources/js/member/memberModal.js"> </script>
    <script src="/resources/js/report/report-modal-bcm.js"></script>
    <script src="/resources/js/report/report-modal-common.js"></script>
</body>
</html>