<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 판매완료 모달창 -->
    <div class="login-confirm-container hide" id="soldoutConfirm">
      <div>
        <div class="login-confirm-message">
          <span>판매완료 처리하시겠습까?</span>
          <span>처리 후에는 되돌릴 수 없습니다.</span>
        </div>
        <div class="login-confirm-btn">
          <button type="button" id="soldoutCancelBtn">취소</button>
          <button type="button" id="soldoutConfirmBtn">확인</button>
        </div>
      </div>
    </div>

  <!-- 판매글 삭제 모달창 -->
    <div class="login-confirm-container hide" id="deletePostConfirm">
      <div>
        <div class="login-confirm-message">
          <span>판매글을 삭제하시겠습까?</span>
          <span>삭제된 후에는 되돌릴 수 없습니다.</span>
        </div>
        <div class="login-confirm-btn">
          <button type="button" id="deletePostCancelBtn">취소</button>
          <button type="button" id="deletePostConfirmBtn">확인</button>
        </div>
      </div>
    </div>
