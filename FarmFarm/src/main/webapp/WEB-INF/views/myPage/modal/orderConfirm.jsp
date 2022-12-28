<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 로그인 하시겠습니까? 모달창 -->
    <div class="confirm-container hide" id="orderConfirmModal">
      <div>
        <div class="confirm-message">
          <span>구매가 확정되면 환불/반품이 불가합니다</span>
          <span>구매를 확정 하시겠습니까?</span>
        </div>
        <div class="confirm-btn">
          <button type="button" id="orderCalcelBtn">취소</button>
          <button type="button" id="orderConfirmBtn">확인</button>
        </div>
      </div>
    </div>