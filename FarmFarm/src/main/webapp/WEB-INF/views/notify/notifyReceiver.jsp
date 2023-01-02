<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link rel="stylesheet" href="/resources/css/notify/notifyReceiver-style.css">
<!-- <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script> -->


<!-- <a id="notifyReceiverArea"> -->

<a class="notify-receiver-container">

    <div class="notify-receiver-header">
    
        <div class="notify-receiver-icon">
            <!-- <i class="fa-solid fa-bell"></i> -->
        </div> <!-- end notify-icon -->

        <div class="notify-receiver-title">
            <!-- 알림 유형 제목 영역 -->
            <!-- 예 : 새로운 댓글이 달렸어요 --> 
        </div> <!-- end notify-title -->
    
    </div> <!-- end notify-receiver-header -->

        <div class="notify-receiver-content">
            <!-- 알림 유형 상세내용 영역 -->
            <!-- 예 : 댓글 내용 -->
        </div> <!-- end notify-receiver-content -->

</a> <!-- end notify-reveiver-container -->

<!-- </a> -->
<!-- https://github.com/sockjs/sockjs-client -->
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

<!-- Axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<!-- JS -->
<script src="/resources/js/notify/notifyReceiver.js"></script>