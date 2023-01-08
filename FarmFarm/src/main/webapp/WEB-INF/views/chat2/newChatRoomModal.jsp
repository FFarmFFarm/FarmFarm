<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 새 채팅방 만들기 모달창 -->
    <div class="new-chatRoom-container hide" id="newChatRoomModal">
      <div>
        <button type="button" id="newChatRoomConatainerHideBtn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="new-chatRoom-title">
          새 채팅 시작하기
        </div>
        <div class="new-chatRoom-img-preview">
          <img src="/resources/images/chat2/default/talking.png">
        </div>
        <div class="new-chatRoom-name">
          <span>새 채팅방 이름</span>
          <div class="new-chatRoom-name-input-area">
            <input id="inputNewChatRoomName" type="text" placeholder="팜팜 채팅방" spellcheck="false">
          </div>
          <span id="inputNewChatRoomNameNotice">
            한글, 숫자, 띄어쓰기를 포함해 3자 이상 10자 이내로 작성해주세요
          </span>
        </div>
        <!-- <div class="new-chatRoom-img">
          <button id="newChatRoomImgBtn">
            <span>사진 선택</span>
            &nbsp;
            <i class="fa-regular fa-image"></i>
          </button>
          <input type="file" accept="image/*" hidden>
        </div> -->
        <div class="new-chatRoom-notice">
          <span>- 자유 채팅방이 개설됩니다.</span>
          <span>- 상품 문의 채팅방은 상품 문의 시 자동으로 개설됩니다.</span>
          <span>- 방을 개설한 후 회원을 초대할 수 있습니다.</span>
        </div>
        <div class="new-chatRoom-confirm-btn">
          <button type="button" id="newChatRoomCalcelBtn">취소</button>
          <button type="button" id="newChatRoomConfirmBtn">확인</button>
        </div>
      </div>
    </div>