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

            <div class="comment-write">
                <textarea class="write-comment" name="commentContent" id=""></textarea>
                <button class="commentInsert">
                    댓글<br>등록
                </button>
            </div>

            <ul class="comment-list">
                <c:if test="${!empty board.commentList}">
                    <c:forEach var="comment" items="${board.commentList}">
                        <li class="comment-row  <c:if test="${comment.commentParent != 0 }"> comment-child </c:if>">
                            <div class="comment-writer">
                                <div class="writer-profile">
                                    <%-- <c:if test="${empty comment.profileImg}"> --%>
                                        <img src="" alt=""><%-- 기본 이미지 주소 넣기 --%>	
                                    <%-- </c:if>	
                                    <c:if test="${!empty comment.profileImg}">	
                                        <img src="${comment.profileImg}" alt="">	
                                    </c:if> --%>	
                                </div>	
                                <div class="writer-name">${comment.memberNickname}</div>	
                                <%-- <div class="comment-like">	<i class="fa-solid fa-heart"></i> &nbsp;좋아요 </div>	 --%>
                            </div>	
                            <div class="comment-content">	
                                <div>${comment.commentContent}</div>	
                            </div>	
                            <div class="writer-time-reply">${comment.commentDate} &nbsp; | <span class="comment-reply"> &nbsp;답글달기</span>  </div>	
                        </li>	
                    </c:forEach>
                </c:if>
                <c:if test="${empty board.commentList}">
                    <li class="comment-row">
                        <div class="comment-writer emptyComment">첫 번째 댓글을 달아보세요</div>
                    </li>
                </c:if>
            </ul>

        </section>
</body>
</html>