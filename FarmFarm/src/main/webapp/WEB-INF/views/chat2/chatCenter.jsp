<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 팜팜 채팅 2.0</title>

    <link rel="stylesheet" href="/resources/css/chat2/chatCenter-style.css">
    <link rel="stylesheet" href="/resources/css/chat2/newChatRoomModal-style.css">
    <link rel="stylesheet" href="/resources/css/chat2/chatRoomMenuModal-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">

    
    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    
    <!-- 헤더 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <!-- 본문 영역 -->
    <div class="container" role="main">

        <!-- 좌측 사이드바 채팅방 목록 -->
        <section class="chat-sidebar">
            <div class="chat-sidebar-header">
              <a class="title" href="/notify/center">
                <i class="fa-solid fa-bell"></i>&nbsp;&nbsp;알림 센터
              </a>
              <div class="search-area">
                  <input id="searchBar" placeholder="채팅방 검색">
                  <button id="resetRoomSearch">
                    <i class="fa-solid fa-circle-xmark"></i>
                  </button>
                  <button id="searchBtn">
                      검색
                  </button>
              </div>
              <div class="roomTypeFilter">
                <input type="radio" name="roomType" id="all" checked>
                <label for="all"> 전체 </label>
                
                <input type="radio" name="roomType" id="post">
                <label for="post"> 상품 </label>
                
                <input type="radio" name="roomType" id="free">
                <label for="free"> 자유 </label>
              </div>
            </div>
            <div class="chat-preview-area">
              <!-- 채팅방 미리보기 영역 -->
            </div>
            <div class="chat-sidebar-footer">
              <i class="fa-solid fa-plus"></i>&nbsp;새 채팅 시작하기
            </div>
        </section>

        <!-- 우측 채팅 내역 -->
        <section class="chat-room">
          <div id="roomBodyBlinder">
            <div id="emptyChat">
              <div id="emptyChatIcon">
                <i class="fa-solid fa-message"></i>
                <!-- <i class="fa-solid fa-cart-shopping"></i> -->
              </div>
              <div id="emptyDetail">
                팜팜 채팅을 시작해보세요!
              </div>
            </div>
          </div>
          <div id="roomLabel">
            <div id="roomThumbnailImg">
              <!-- <img src="/resources/images/chat/potato.jpg"> -->
            </div>
            <div id="roomTitle">
              <!-- 아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
              아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
              아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 제목...
              아주 긴 채팅방 제목... 아주 긴 채팅방 제목... 아주 긴 채팅방 -->
            </div>
            <button id="purchaseBtn">
              구매하기
            </button>

            <button id="roomEditBtn">
              <i class="fa-sharp fa-solid fa-gear"></i>
            </button>

            <div id="roomEditDropdown">
              <ul>
                <li id="infoBtn" class="roomEditDropdownMenu">정보보기</li>
                <li id="inviteBtn" class="roomEditDropdownMenu">초대하기</li>
                <li id="exitBtn" class="roomEditDropdownMenu">나가기</li>
              </ul>
            </div>

            <button id="spreadBtn">
              <i class="fa-solid fa-caret-down"></i>
            </button>
          </div>

          <!-- end roomLabel -->

          <!-- 채팅창 메인 -->
          <div id="roomBody">

            <!-- 채팅방 메세지 예시 -->
            <div id="readingArea">

              <!-- 송신/수신한 메세지가 들어갈 영역입니다 -->
              <!-- 받은 메세지 received-chat -->
              <!-- chat-profile-img2, received-bubble. received-bubble-tail -->

              <!-- 보낸 메세지 sent-chat -->
              <!-- sent-bubble, sent-bubble-tail -->
              
              <!-- 메세지가 없는 경우 -->
 
            </div>

            
            
            
            <!-- 메세지 입력 영역 -->
            <div id="writingArea">
              
              <input id="imageInput" type="file" accept="image/*" hidden>
              <button id="addImageBtn">
                <i class="fa-solid fa-image"></i>
              </button>
              <input id="inputBox" type="text" placeholder="메세지를 입력하세요">
              <div id="inputImgPreviewBox">
                <div id="inputImgPreviewBoxHeader">
                  <span>사진 보내기</span>
                  <i id="inputImgPreviewDelBtn" class="fa-solid fa-xmark"></i>
                </div>
                <img id="inputImgPreview"> <!-- 사진 미리보기 들어갑니다! -->
                <div id="sendImgBtn">사진 전송</div>
              </div>
            <button id="sendBtn">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          
        </div>
        <!-- 하단 이동 -->
        <div id="bottomBtn">
          <i class="fa-solid fa-caret-down"></i>
        </div>


        </section>
    </div>

    <!-- 새 채팅방 만들기 이벤트 -->
    <jsp:include page="/WEB-INF/views/chat2/newChatRoomModal.jsp" />

    <!-- 채팅방 내부 드롭다운 메뉴 -->
    <jsp:include page="/WEB-INF/views/chat2/chatRoomMenuModal.jsp" />

    <!-- https://github.com/sockjs/sockjs-client -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const shortcutNo = "${shortcutNo}"
    </script>
    
    <c:remove var="shortcutNo" />
    
    <script src="/resources/js/chat2/chatService.js"></script>
    <script src="/resources/js/chat2/chatCenter.js"></script>

</body>
</html>