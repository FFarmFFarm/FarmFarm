<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link rel="stylesheet" href="/resources/css/alarm/alarmReceiver.css">
<script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>

<div class="alarm-receiver-container">

    <div class="alarm-receiver-header">
    
        <div class="alarm-receiver-icon">
            <i class="fa-solid fa-bell"></i>
        </div> <!-- end alarm-icon -->

        <div class="alarm-receiver-title">
            새로운 댓글이 달렸어요 
        </div> <!-- end alarm-title -->
    
    </div> <!-- end alarm-receiver-header -->

        <div class="alarm-receiver-content">
            안녕하세요. 댓글입니다. <br>
            사실 댓글 아니지롱 ㅋㅋ 근데 줄 바꿈 없이 길게길게길게 적어볼게요. 나도 건물주 되고 싶다! 건물주 되면 일 안하고 띵가띵가 놀텐데... 평일 아침 10시에 소파에 누워서 느긋하게 노래들으면서 커피마시다가 낮잠 잘텐데....
            엄마손파이를 다 먹었어요... 너무 슬픕니다..<br>
            4번째 줄에는 무슨 내용을 넣어야 할까요..? 뭐 2줄까지 나오게 할 거지만 테스트를 위해서 추가할거에요. 
        </div> <!-- end alarm-receiver-content -->

</div> <!-- end alarm-reveiver-container -->

<!-- https://github.com/sockjs/sockjs-client -->
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

<!-- Axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- JS -->
<script src="/resources/js/alarm/alarmReceiver.js"></script>