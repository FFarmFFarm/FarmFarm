<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<section class="delivery-detail-section hide" id="deliveryDetail">
  <div class="delivery-modal">
    <div class="detail-top">
      <button type="button" class="back-btn" id="deliveryBackBtn">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      배송 상세 조회
    </div>

    <div id="deliveryContent">
    
      <div class="delivery-status">
        <h3>배송완료</h3>
      </div>

      <ul class="tracking">
        <li class="one-row">
          <div class="location">
            <p>상계장한</p>
            <p class="l-small">오후 3:11</p>
          </div>
          <div class="description">
            <p>상계장한</p>
            <p class="l-small">오후 3:11</p>
          </div>
        </li>
      </ul>

      <div class="tracking-info">
        <p class="info-top">기본정보</p>

        <ul class="info-detail">
          <li class="one-info">
            <span class="info-title">받는사람</span>
            <p>정*</p>
          </li>
          <li class="one-info">
            <span class="info-title">택배사</span>
            <p>대한통운</p>
          </li>
          <li class="one-info">
            <span class="info-title">송장번호</span>
            <p>123123123</p>
          </li>
          <li class="one-info">
            <span class="info-title">보내는사람</span>
            <p>0*</p>
          </li>
        </ul>
      </div>
    
    </div>

  </div>

</section>