<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <section class="comment-area">

        <div class="commentCount">댓글 2개</div>

        <%-- 댓글 쓰기 부분 --%>
        <div class="comment-write">
            <textarea class="comment-content" name="commentContent" placeholder="댓글을 작성해보세요"></textarea>
            <button class="commentInsert">댓글<br>남기기</button>
        </div>

        <%-- 작성된 댓글 나오는 부분~ --%>
            <ul class="comment-list">
                <%-- ${board.commentList} --%>
                <c:forEach var="comment" items="${board.commentList}">
                    ${comment.commentContent};
                    <li class="comment-all-list">
                        <div class="comment-writer">
                            <div class="writer-profile">
                                <%-- <c:if test="${empty comment.profileImg}"> --%>
                                    <img src="" alt=""><%-- 기본 이미지 주소 넣기 --%>
                                <%-- </c:if>
                                <c:if test="${!empty comment.profileImg}">
                                    <img src="${comment.profileImg}" alt="">
                                </c:if> --%>
                            </div>
                            <div class="writer-name-time">
                                <div class="writer-name">${comment.memberNickname}</div>
                                <div class="writer-time">${comment.commentDate}</div>
                            </div>
                            <div class="comment-like-report">
                                <span class="comment-like"><i class="fa-solid fa-heart"></i> &nbsp;좋아요</span>
                            </div>
                        </div>
                        <div class="comment-content">
                            <pre>${comment.commentContent}</pre>
                        </div>
                    </li>
                </c:forEach>
            </ul>
        <%-- <div class="comment-all">
            <div class="comment-writer">
                <div class="writer-profile">
                    <c:if test="${empty comment.profileImg}">
                        <img src="" alt="">
                    </c:if>
                    <c:if test="${!empty comment.profileImg}">
                        <img src="${comment.profileImg}" alt="">
                    </c:if>
                </div>
                <div class="writer-name-time">
                    <div class="writer-name">${comment.memberName}</div>
                    <div class="writer-time">5분전</div>
                </div>
                <div class="comment-like-report">
                    <span class="comment-like"><i class="fa-solid fa-heart"></i> &nbsp;좋아요</span>
                </div>
            </div>
            <div class="comment-content">
                <pre>${comment.commentContent}</pre>
            </div>
        </div>   --%>
        </section>

        <script src="/resources/js/board/comment.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
</body>
</html>