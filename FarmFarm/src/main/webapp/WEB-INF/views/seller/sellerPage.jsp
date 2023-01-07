<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="postList" value="${map.postList}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 판매자 관리</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/seller/sellerPage-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">
    <link rel="stylesheet" href="/resources/css/report/report-modal-style.css" />


    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/header.jsp' />

    <main>
        <section class="profile-container">
            <div class="profile-background">
                <img
                src="/resources/images/default/bgImg.png"
                alt=""
                class="member-bg-img"
                />
            </div>

            <!-- 판매자 정보 -->
            <div class="profile-info">
                <c:choose>
                    <c:when test="${! empty memberInfo.profileImg}">
                        <div class="profile-img-container">
                            <img
                            src="${memberInfo.profileImg}"
                            class="member-profile-img"/>
                        </div>
                    </c:when>
                    <c:otherwise>
                        <div class="profile-img-container">
                            <img
                            src="/resources/images/default/profileImg.png"
                            class="member-profile-img"/>
                        </div>
                    </c:otherwise>
                </c:choose>
                
                <c:choose>
                    <c:when test="${loginMember.memberNo == memberInfo.memberNo}">
                        <a href="/myPage/profile" class="profile-setting-btn fa-solid fa-gear" ></a>
                    </c:when>
                    <c:otherwise>
                        <button 
                        type="button"
                        class="seller-report-btn report-btn">
                            <p>신고하기</p>
                        </button>
                    </c:otherwise>
                </c:choose>
                
                <span class="member-nickname" id="${memberInfo.memberNo}">
                    <i class="fa-solid fa-carrot"></i>
                    ${memberInfo.memberNickname}
                </span>
                    
                <div class="member-info-container">
                    <div class="member-info">
                        <span class="info-title member-name">판매자</span>
                        <span class="info-content">${memberInfo.memberName}</span>
                    </div>
                    
                    <div class="member-info">
                        <span class="info-title count-title">판매글 수</span>
                        <span class="info-content">${memberInfo.postCount}</span>
                    </div>

                    <div class="member-info">
                        <span class="info-title member-signup-date">가입일</span>
                        <span class="info-content">${memberInfo.signUpDate}</span>
                    </div>
                </div>
                <c:if test="${loginMember.memberNo == memberInfo.memberNo}">
                    <button id="enroll-post">판매상품등록</button>
                </c:if>
            </div>
        </section>
        <section class="mypage-nav">
            <div class="nav-title">
                <i class="fa-regular fa-clipboard"></i> 
                <span>판매글</span>
            </div>
            <label id="onlySellList">
                <input type="checkbox" id="onlySellCheck">
                <span>판매중인 글만보기</span>
            </label>
        </section>

        <section class="my-post-container">
            <div class="post-list-container">
                <c:forEach var="post" items="${postList}">
                    <div class="post-one">
                        <div class="post-content">
                            <div class="post-thumbnail">
                                <c:choose>
                                    <c:when test="${! empty post.postImgAddress}">
                                        <img
                                        src="${post.postImgAddress}"
                                        alt=""
                                        class="post-thumbnail-img"
                                        />
                                    </c:when>
                                    <c:otherwise>
                                        <img
                                        src="/resources/images/board/thumbnail.png"
                                        alt=""
                                        class="post-thumbnail-img"
                                        />
                                    </c:otherwise>
                                </c:choose>
                            </div>
                            <div class="post-total">
                                <div class="post-head">
                                    <a href="/post/${post.postNo}" class="post-title">${post.postTitle}</a>
                                    <c:if test="${post.postSoldoutFl == 0}">
                                        <span class="post-status">판매중</span>
                                    </c:if>
                                    <c:if test="${post.postSoldoutFl == 1}">
                                        <span class="post-status sold-out">판매완료</span>
                                    </c:if>
                                </div>
                                <div class="post-price">
                                    가격 <span><fmt:formatNumber value="${post.unitPrice}" pattern="#,###" />원</span>
                                </div>
                                <div class="post-detail">
                                    <div class="post-reg-date">
                                        작성일<span>${post.postDate}</span>
                                    </div>
                                    <%-- <div class="post-view-count">
                                        조회수<span>${post.postView}</span>
                                    </div> --%>
                                </div>
                            </div>
                            <div class="button-area">
                                <c:if test="${loginMember.memberNo == memberInfo.memberNo}">
                                    <c:if test="${post.postSoldoutFl == 0}">
                                        <button type="button" class="soldout-btn" id="${post.postNo}">판매완료</button>
                                        <button type="button" class="update-btn" id="${post.postNo}">판매글 수정</button>
                                    </c:if>
                                    <button type="button" class="delete-btn" id="${post.postNo}">판매글 삭제</button>
                                </c:if>
                            </div>
                        </div>
                    </div>
                </c:forEach>
                
            <div class="pagination-area">
                <div class="page-box">
                    <a href="/seller/${memberInfo.memberNo}">
                        <i class="fa-solid fa-angles-left"></i>
                    </a>
                </div>
                <div class="page-box">
                    <a href="/seller/${memberInfo.memberNo}?cp=${pagination.prevPage}">
                        <i class="fa-solid fa-angle-left"></i>
                    </a>
                </div>
                <c:forEach var="i"
                    begin="${pagination.startPage}"
                    end="${pagination.endPage}"
                    step="1">
                    <c:choose>
                        <c:when test="${i==pagination.currentPage}">
                            <div class="current-page-box">
                                <a class="current">${i}</a>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <div class="page-box">
                                <a href="/seller/${memberInfo.memberNo}?cp=${i}">${i}</a>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
                <div class="page-box">
                    <a href="/seller/${memberInfo.memberNo}?cp=${pagination.nextPage}">
                        <i class="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div class="page-box">
                    <a href="/seller/${memberInfo.memberNo}?cp=${pagination.maxPage}">
                        <i class="fa-solid fa-angles-right"></i>
                    </a>
                </div>
            </div>
            </div>
        </section>
    </main>

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <jsp:include page="/WEB-INF/views/seller/modal/sellerConfirm.jsp"/>

    <script>
        let selectPostNo;
        var cp="${param.cp}";
        var loginMemberNo = ${loginMember.memberNo};
    </script>

    <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>
        <c:remove var="message"/>
    </c:if>

    <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 
    
    <script src="/resources/js/seller/sellerPage.js"></script>
    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/report/report-modal.js"></script>

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    
</body>

</html>