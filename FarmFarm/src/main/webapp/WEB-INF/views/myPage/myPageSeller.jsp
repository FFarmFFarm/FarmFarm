<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<section class="profile-container">
        <div class="profile-background">
        <c:if test="${empty loginMember.mypageImg}">
          <img
          src="/resources/images/myPage/background/bgImg2.jpg"
          alt=""
          class="member-bg-img"
          id="memberBgImg"
          />
        </c:if>
        <c:if test="${! empty loginMember.mypageImg}">
          <img
          src="${loginMember.mypageImg}"
          alt=""
          class="member-bg-img"
          id="memberBgImg"
          />
        </c:if>
          <form id="mypageImgForm">   
            <label for="mypageImgInput" class="bg-change-btn fa-solid fa-image"></label>
            <input type="file" name="mypageImg" id="mypageImgInput" accept="image/*" style="display:none;"></input>
          </form>
        </div>

        <div class="profile-info">
          <div class="profile-img-container">
            <div class="member-profile">
              <c:if test="${empty loginMember.profileImg}">
                <img
                src="/resources/images/myPage/profile/profileImg.png"
                class="member-profile-img"
                id="ProfileImg"/>
              </c:if>
              <c:if test="${!empty loginMember.profileImg}">
                <img
                src="${loginMember.profileImg}"
                class="member-profile-img"
                id="ProfileImg"/>
              </c:if>
            </div>
          </div>
          <!-- 
          <button
            type="button"
            class="profile-setting-btn fa-solid fa-gear"
          ></button> -->

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
        </div>
      </section>

     