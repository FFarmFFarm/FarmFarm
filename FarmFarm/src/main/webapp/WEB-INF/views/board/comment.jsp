<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<body>
     <section class="comment-area">
            <div class="comment-count">댓글 ${board.commentCount}</div>

            <%-- <form action="/comment/write/${boardNo}" class="comment-write"> --%>
            <div class="comment-write">
                <div class="comment-form">
                    <textarea class="write-comment" name="commentContent" id=""></textarea>
                    <div class="comment-side">
                        <div class="comment-caution">※댓글 작성시 상대방에 대한 배려와 책임을 담아 깨끗한 댓글 환경에 동참에 주세요.</div>
                        <span class="secrete-co">
                            <input type="checkbox" class="lockCheck" id="lockCheck"></input> 
                            <label for="lockCheck">&nbsp;비밀댓글</label>
                        </span>
                        <button onclick="commentFunction()" class="comment-insert">등록</button>
                    </div>
                </div>
            </div>
            <%-- </form> --%>

            <ul class="comment-list">
                <c:if test="${!empty board.commentList}">
                    <c:forEach var="comment" items="${board.commentList}">
                        <%-- <li id="commentRow" class="comment-row  <c:if test="${comment.commentParent != 0 }"> comment-child </c:if>"> --%>
                        <li id="co${comment.commentNo}" class="comment-row  <c:if test="${comment.commentParent != 0 }"> comment-child </c:if>">

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
                                <div class="writer-time-reply"> ${comment.commentDate} &nbsp; 

                                    <c:choose>
                                        <%-- 관리자라면 --%>
                                        <c:when test="${loginMember.authority == 2}">
                                            <%-- 게시글 작성 O --%>
                                            <c:if test="${loginMember.memberNo == comment.memberNo && comment.commentDelFl == 'N'}">
                                                <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply">| &nbsp;&nbsp;답글달기&nbsp;&nbsp;</button> 
                                                <button onclick="showUpdateComment(${comment.commentNo}, this)" class="comment-reply"> |&nbsp;&nbsp;수정&nbsp;&nbsp;</button>
                                                <button onclick="deleteComment(${comment.commentNo})" class="comment-reply"> |&nbsp;&nbsp;삭제</button>
                                            </c:if>
                                            <%-- 게시글 작성 X --%>
                                            <c:if test="${loginMember.memberNo != comment.memberNo && comment.commentDelFl == 'N'}">
                                                <%-- 삭제 시  --%>
                                                <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply">| &nbsp;&nbsp;답글달기&nbsp;&nbsp;</button> 
                                                <button onclick="adDeleteComment(${comment.commentNo})" class="comment-reply"> |&nbsp;&nbsp;삭제</button>
                                            </c:if>
                                        </c:when>

                                        <%-- 일반 회원이라면 --%>
                                        <c:otherwise>
                                            <%-- 게시글 작성 O --%>
                                            <c:if test="${loginMember.memberNo == comment.memberNo && comment.commentDelFl == 'N'}">
                                                <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply">| &nbsp;&nbsp;답글달기&nbsp;&nbsp;</button> 
                                                <button onclick="showUpdateComment(${comment.commentNo}, this)" class="comment-reply"> |&nbsp;&nbsp;수정&nbsp;&nbsp;</button>
                                                <button onclick="deleteComment(${comment.commentNo})" class="comment-reply"> |&nbsp;&nbsp;삭제</button>
                                            </c:if>
                                            <%-- 게시글 작성 X --%>
                                            <c:if test="${loginMember.memberNo != comment.memberNo && comment.commentDelFl == 'N'}">
                                                <button onclick="showReply(${comment.commentNo}, this)" class="comment-reply">| &nbsp;&nbsp;답글달기&nbsp;&nbsp;</button> 
                                            </c:if>
                                        </c:otherwise>
                                    </c:choose>

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