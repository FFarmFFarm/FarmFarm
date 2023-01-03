<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<div class="shipping-container hide" id='shippingContainer'>
  <div class="shipping-area" id="shippingArea" >
    <div class="shipping-head">
      <button type="button" class="back-btn" id="shippingBackBtn">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <span class="shipping-head-title">배송 조회</span>
      <span class="empty"></span>
    </div>
  
    <div class="container" id="container">
      <!--<span class="no-result">배송 정보가 없습니다.</span>-->
      <div class="shipping-content" id="shippingContent">
        <span class="shipping-state">배송 출발</span>
      
        <div class="date-shipping">
          <span class="progress-date">2023.01.03</span>
          <div class="progress">
            <div class="location-time">
              <span class="location-name">도봉</span>
              <span class="time">오전 7:43</span>
            </div>
            <div class="status-description">
              <span class="status">배송출발</span>
              <span class="description">발송점: 배송출고, 도착점: 고객님께 물품을 배달 준비 중입니다., 담당직원: 배송예정, 인수자: 14시~16시, 영업소: 오철민, 연락처: 010-4798-7237</span>
            </div>
          </div>
        </div>


      </div>

      <div class="shipping-info" id="shippingInfo">
        <span class="shipping-state">기본 정보</span>
        <div class="one-line first-line">
          <span class="subject">받는 사람</span>
          <span class="content">신**</span>
        </div>
        <div class="one-line">
          <span class="subject">택배사</span>
          <span class="content">로젠택배(+8215889988)</span>
        </div>
        <div class="one-line">
          <span class="subject">송장번호</span>
          <span class="content">34558174092</span>
        </div>
        <div class="one-line">
          <span class="subject">보낸사람</span>
          <span class="content">(*********</span>
        </div>
      </div>
  
    </div>
  </div>
</div>