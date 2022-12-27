<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<link rel="stylesheet" href="/resources/css/chat/chatWidget-style.css">

<script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>

<!-- 채팅 위잿 영역 -->
<!-- 채팅 위젯은 최대 6개입니다. -->

<form action="/chat/shortcut" method="POST"class="chatWidget-container" >
  
  <div class="chatWidget-header">
    <div class="chatWidget-title">
      채팅
    </div>
    <!-- 채팅방 전체화면으로 이동하기 -->
    <a href='/chat' id="goChatRoom" >
      더보기&nbsp;<i class="fa-solid fa-chevron-right"></i>
    </a>
  </div>

  <div id="chatWidgetBody">
    <!-- 채팅 위젯에 표시될 메뉴(최대 6개) -->
  </div> <!-- end body -->

  <div id="chatWidgetFooter">
    채팅 목록을 불러오고 있습니다...
    <div id="refreshChatWidget">
      <i id="widgetRotater" class="fa-solid fa-rotate"></i>
    </div>
  </div>

</div>  

    <!-- https://github.com/sockjs/sockjs-client -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    
    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    
    <script src="/resources/js/chat/chatWidget.js"></script>
    
    <script>
      const loginMemberNo = "${loginMember.memberNo}";
    </script>