<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<link rel="stylesheet" href="/resources/css/chat/chatWidget-style.css">

<script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>


 

<!-- 채팅 위잿 영역 -->
<div class="chatWidget-container">
  
  <div class="chatWidget-header">
    <div class="chatWidget-title">
      채팅
    </div>
    <!-- 채팅방 전체화면으로 이동하기 -->
    <a href='#' id="goChatRoom" >
      더보기&nbsp;<i class="fa-solid fa-chevron-right"></i>
    </a>
  </div>

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자1
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer2.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자2
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer3.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자3
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자4
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer2.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자5
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->

  <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  <div class="chatWidget-box">

    <div class="chatWidget-profile-img">
      <img src="/resources/images/chat/farmer3.png">
    </div>
    
    <div class="chatWidget-enter-icon">
      <i class="fa-solid fa-right-to-bracket"></i>
    </div>

    <div class="chatWidget-box-label">
      <div class="chatWidget-member-nickname">
        착한 판매자6
      </div>
    
      <div class="chatWidget-last-message-time">
        2022-12-18
      </div>
    
    </div>
    
    <div class="chatWidget-last-message-content">
      메세지가 아무리 길어도 1줄 이상은 출력되지 않게 만들려고 합니다. 메세지가 긴 경우는 이렇게 됩니다.
    </div>

  </div> <!-- end box -->  

</div>  

<script src="/resources/js/chat/chatWidget.js"></script>