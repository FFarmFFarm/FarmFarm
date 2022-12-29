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

                                <c:if test="${empty comment.profileImg}">
                                    <c:choose>
                                        <%-- 자식이라면~ --%>
                                        <c:when test="${comment.commentParent != 0}">
                                            <div class="writer-profile  child-img">
                                                <img class="proImg" src="/resources/images/myPage/profile/profileImg.png" alt="">	
                                            </div>
                                        </c:when>
                                        <c:otherwise>
                                            <div class="writer-profile  parent-img">
                                                <img class="proImg" src="/resources/images/myPage/profile/profileImg.png" alt="">	
                                            </div>
                                        </c:otherwise>
                                    </c:choose>
                                </c:if>	
                                <c:if test="${!empty comment.profileImg}">	
                                    <c:choose>
                                        <%-- 자식이라면~ --%>
                                        <c:when test="${comment.commentParent != 0}">
                                            <div class="writer-profile  child-img">
                                                <img class="proImg" src="${comment.profileImg}" alt="">	
                                            </div>
                                        </c:when>
                                        <c:otherwise>
                                            <div class="writer-profile  parent-img">
                                                <img class="proImg" src="${comment.profileImg}" alt="">	
                                            </div>
                                        </c:otherwise>
                                    </c:choose>
                                </c:if>	
                                <c:choose>
                                    <%-- 자식이라면~ --%>
                                    <c:when test="${comment.commentParent != 0}">
                                        <div class="writer-name child-content">${comment.memberNickname}</div>	
                                    </c:when>
                                    <c:otherwise>
                                        <div class="writer-name">${comment.memberNickname}</div>	
                                    </c:otherwise>
                                </c:choose>
                            </div>	

                            <div class="content-area"> <%-- 댓글 나오는 부분들 등등 입니다~ --%>
                                <%-- 자식이라면~ --%>
                                <c:choose>
                                    <%-- 자식이라면~ --%>
                                    <c:when test="${comment.commentParent != 0}">
                                        <div class="comment-content child-content">${comment.commentContent}</div>
                                        <%-- <div class="comment-content child-content">
                                            <div class="update-parent-btn ">
                                                <button class="pa-update">수정하기</button>
                                                <button class="pa-cancle">취소</button>
                                            </div>	
                                        </div> --%>
                                    </c:when>
                                    <c:otherwise>
                                        <div class="comment-content">${comment.commentContent}</div>
                                        <%-- <div class="comment-content">
                                            <textarea name="boardContent" class="update-parent"></textarea>
                                            <div class="update-parent-btn">
                                                <button class="pa-update">수정하기</button>
                                                <button class="pa-cancle">취소</button>
                                            </div>
                                        </div> --%>
                                    </c:otherwise>
                                </c:choose>
                                <%-- <c:if test="${comment.commentParent != 0}">
                                </c:if> --%>
                                <div class="writer-time-reply"> ${comment.commentDate} &nbsp; | 
                                    <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply"> &nbsp;&nbsp;답글달기&nbsp;&nbsp;</button> 
                                    <c:if test="${loginMember.memberNo == comment.memberNo && comment.commentDelFl == 'N'}">
                                        <button onclick="showUpdateComment(${comment.commentNo}, this)" class="comment-reply"> |&nbsp;&nbsp;수정&nbsp;&nbsp;</button>
                                        <button onclick="deleteComment(${comment.commentNo})" class="comment-reply"> |&nbsp;&nbsp;삭제</button>

                                    </c:if>
                                </div>	
                            </div>
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