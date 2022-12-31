<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

      <link rel="stylesheet" href="/resources/css/alarm/alarmWidget-style.css">
      <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>

    <ul id="alarmDropdown">

      <div class="alarm-widget-box">
        <div class="alarm-widget-header">
          <div class="alarm-widget-icon">
            <i class="fa-solid fa-box"></i>
          </div>
          <div class="alarm-widget-title">
            커뮤니티
          </div>
          <div class="alarm-widget-date">
            2022-12-30
          </div>
          <div class="alarm-widget-delBtn">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div class="alarm-widget-content">
          새로운 댓글이 달렸어요 "안녕안녕.."
        </div>
      </div>

    </ul>
<!-- 
    * 아이콘
    상품 수령 : <i class="fa-solid fa-box"></i>
    주문 완료 : <i class="fa-solid fa-envelope-open-text"></i>
    후기 요청 : <i class="fa-solid fa-pen"></i>
    관리자 문의 : <i class="fa-solid fa-circle-exclamation"></i>
    댓글/대댓글 : <i class='fa-regular fa-comment-dots'></i>
    채팅 리마인더 : <i class="fa-solid fa-message"></i>
-->

<!-- 
    * 형식 예시 
    header.jsp의 <div class='myDropdown1'>의 자손 요소 <ul id='alarmDropdown'></ul>에 추가
    
    * 추가 방법

      <li>
        <div class="alarm-widget-box">
          <div class="alarm-widget-header">
            <div class="alarm-widget-icon">
              <i class="..."></i> 원하는 아이콘 추가
            </div>
            <div class="alarm-widget-title">
              새로운 댓글이 달렸어요
            </div>
            <div class="alarm-widget-date">
              오후 12:30
            </div>
            <div class="alarm-widget-delBtn">
              x
            </div>
          <div class="alarm-widget-content">
            "안녕안녕.."
          </div>
        </div>
      </li>
-->


<script src="/resources/js/alarm/alarmWidget.js"> </script>