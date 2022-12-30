<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 장바구니 이동 모달창 -->
    <div class="login-confirm-container hide" id="goCartConfirm">
      <div>
        <div class="login-confirm-message">
          <span>장바구니에 추가되었습니다.</span>
          <span>장바구니로 이동하시겠습니까?</span>
        </div>
        <div class="login-confirm-btn">
          <button type="button" id="goCartCalcelBtn">취소</button>
          <button type="button" id="goCartConfirmBtn">확인</button>
        </div>
      </div>
    </div>

  <!-- 장바구니 이동 모달창 -->
    <div class="login-confirm-container hide" id="addCartConfirm">
      <div>
        <div class="login-confirm-message">
          <span>이미 추가된 상품입니다.</span>
          <span>새로 추가하시겠습니까?</span>
        </div>
        <div class="login-confirm-btn">
          <button type="button" id="addCartCalcelBtn">취소</button>
          <button type="button" id="addCartConfirmBtn">추가</button>
        </div>
      </div>
    </div>