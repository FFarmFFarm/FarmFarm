<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<body>
     <section class="comment-area">
            <div class="comment-count">댓글 ${board.commentCount}</div>

            <form action="/comment/write/${boardNo}" class="comment-write">
                <textarea class="write-comment" name="commentContent" id=""></textarea>
                <button type="button" class="comment-insert">
                    댓글<br>등록
                </button>
            </form>

            <ul class="comment-list">
                <c:if test="${!empty board.commentList}">
                    <c:forEach var="comment" items="${board.commentList}">
                        <li id="commentRow" class="comment-row  <c:if test="${comment.commentParent != 0 }"> comment-child </c:if>">
                            <div class="comment-writer">
                                <div class="writer-profile">
                                    <c:if test="${empty comment.profileImg}">
                                        <c:choose>
                                            <%-- 자식이라면~ --%>
                                            <c:when test="${comment.commentParent != 0}">
                                                <%-- <img src="/resources/images/myPage/profile/profileImg.png" alt="">기본 이미지 주소 넣기	 --%>
                                                <img class="proImg child-img" src="/resources/images/myPage/profile/profileImg.png" alt="">	
                                            </c:when>
                                            <c:otherwise>
                                                <img class="proImg parent-img" src="/resources/images/myPage/profile/profileImg.png" alt="">
                                            </c:otherwise>
                                        </c:choose>
                                    </c:if>	
                                    <c:if test="${!empty comment.profileImg}">	
                                        <c:choose>
                                            <c:when test="${comment.commentParent != 0}">
                                                <img class="proImg child-img" src="${comment.profileImg}" alt="">	
                                            </c:when>
                                            <c:otherwise>
                                                <img class="proImg parent-img" src="${comment.profileImg}" alt="">	
                                            </c:otherwise>
                                        </c:choose>
                                        <%-- <img src="${comment.profileImg}" alt="">	 --%>
                                    </c:if>	
                                </div>	
                            <c:choose>
                                <%-- 자식이라면~ --%>
                                <c:when test="${comment.commentParent != 0}">
                                    <div class="writer-name child-content">${comment.memberNickname}</div>	
                                </c:when>
                                <c:otherwise>
                                    <div class="writer-name">${comment.memberNickname}</div>	
                                </c:otherwise>
                            </c:choose>
                                <%-- <div class="comment-like">	<i class="fa-solid fa-heart"></i> &nbsp;좋아요 </div>	 --%>
                            </div>	
                            <%-- 자식이라면~ --%>
                            <c:choose>
                                <%-- 자식이라면~ --%>
                                <c:when test="${comment.commentParent != 0}">
                                    <div class="comment-content child-content">
                                        ${comment.commentContent}
                                    </div>	
                                </c:when>
                                <c:otherwise>
                                    <div class="comment-content">
                                        ${comment.commentContent}
                                    </div>	
                                </c:otherwise>
                            </c:choose>
                            <c:if test="${comment.commentParent != 0}">
                            </c:if>
                            <div class="writer-time-reply"> ${comment.commentDate} &nbsp; | 
                                <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply"> &nbsp;답글달기</button> 
                            </div>	
                            <%-- <div class="comment-co"> --%>
                                <%-- <textarea class="comment-co-content" name=""></textarea>
                                <div class="co-btn-area">
                                    <button onclick="sendCo(${comment.commentNo}, this)" class="send-co">답글 보내기</button>
                                    <button onclick="cancleCo(this)" class="cancle-co">취소</button>
                                </div> --%>
                            <%-- </div> --%>
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