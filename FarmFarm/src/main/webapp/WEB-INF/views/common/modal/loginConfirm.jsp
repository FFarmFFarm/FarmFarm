<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 로그인 하시겠습니까? 모달창 -->
    <div class="login-confirm-container hide" id="loginConfirm">
      <div>
        <div class="login-confirm-message">
          <span>로그인이 필요한 서비스입니다</span>
          <span>로그인 하시겠습니까?</span>
        </div>
        <div class="login-confirm-btn">
          <button type="button" id="loginCalcelBtn">취소</button>
          <button type="button" id="loginConfirmBtn">확인</button>
        </div>
      </div>
    </div>