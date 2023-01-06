<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
        <div class="profile-img-container">
            <c:choose>
                <c:when test="${! empty memberInfo.profileImg}">
                    <img
                    src="${memberInfo.profileImg}"
                    class="member-profile-img"
                    />
                </c:when>
                <c:otherwise>
                    <img
                    src="/resources/images/default/profileImg.png"
                    class="member-profile-img"
                    />
                </c:otherwise>
            </c:choose>
        </div>
        
        <c:choose>
            <c:when test="${loginMember.memberNo == memberInfo.memberNo}">
                <a href="/myPage/profile" class="profile-setting-btn fa-solid fa-gear" ></a>
            </c:when>
            <c:otherwise>
                <button 
                type="button"
                class="seller-report-btn"
                id="reportBtn">
                    <p>신고하기</p>
                </button>
            </c:otherwise>
        </c:choose>
        
        <span class="member-nickname">
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

     