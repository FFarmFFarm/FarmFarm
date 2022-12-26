<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
     <section class="comment-area">
            <ul class="comment-list">
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
                        <span class="comment-report">신고</span>
                    </div>
                </div>
                <div class="comment-content">
                    <pre>${comment.commentContent}</pre>
                </div>
            </div> --%>
        </section>
</body>
</html>