<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 메뉴 모달창 -->
    <div class="chatRoom-menu-container hide" id="chatRoomMenuModal">
      <!-- 정보 -->
      <div class="info-menu hide">
        <button type="button" id="infoMenuHideBtn" class="hide-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="chatRoom-menu-title">
          채팅방 정보
        </div>
        <div id="infoBody" class="chatRoom-menu-body">
          <span>참가자</span>
          <div class="member-list">

          </div>
        </div>
        
      </div>

      <!-- 초대하기 -->
      <div class="invite-menu hide">
        <button type="button" id="inviteMenuHideBtn" class="hide-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="chatRoom-menu-title">
          초대하기
        </div>
        <div id="menuBody" class="chatRoom-menu-body">
          <span>회원 검색</span>
          <div class="search-nickname-box">
            <input id="searchNicknameInput" type="text" placeholder="닉네임 입력">
          </div>
          <span class="invite-menu-notice">회원에게 초대 메시지를 전송합니다.</span>
          <div class="menu-confirm-btn">
            <button type="button" id="newChatRoomCalcelBtn">취소</button>
            <button type="button" id="newChatRoomConfirmBtn">확인</button>
          </div>
        </div>
      </div>

      <!-- 나가기 -->
      <div class="exit-menu hide">
        <button type="button" id="exitMenuHideBtn" class="hide-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="chatRoom-menu-title">
          나가기
        </div>
        <div id="exitMenu" class="chatRoom-menu-body">
          <span>정말 채팅방에서 나가시겠습니까?</span>
          <span>채팅방이 목록에서 삭제됩니다.</span>
        </div>
        <div class="menu-confirm-btn">
          <button type="button" id="exitMenuCalcelBtn">취소</button>
          <button type="button" id="exitMenuConfirmBtn">확인</button>
        </div>
      </div>
    </div>