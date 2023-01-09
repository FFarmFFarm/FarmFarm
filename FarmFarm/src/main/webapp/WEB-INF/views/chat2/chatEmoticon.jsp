<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link rel="stylesheet" href="/resources/css/chat2/emoticon-style.css">
<script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>

<div class="emoticon-container emoticon-hide">
    <div class="emoticon-container-header">
        이모티콘
        <div class="emoticon-close-btn">
            <i class="fa-solid fa-xmark"></i>
        </div>
    </div>

    <div class="emoticon-list">
        
        <div class="emoticon-empty">
            <span><i class="fa-regular fa-face-smile"></i></span>
            <span>목록에서 이모티콘을 선택해주세요!</span>
        </div>
        <!-- 카테고리 리스트 -->

    </div>
    
    <div class="emoticon-category-list">

        <!-- 메인 리스트 -->

    </div>
</div>

<!-- Axios -->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script src="/resources/js/chat2/emoticon.js"></script>