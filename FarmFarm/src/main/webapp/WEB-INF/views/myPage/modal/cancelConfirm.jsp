<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 주문 취소 모달창 -->
    <div class="confirm-container hide" id="cancelConfirmModal">
      <div>
        <div class="confirm-message">
          <span>주문을 취소하시겠습니까?</span>
        </div>
        <div class="confirm-btn">
          <button type="button" id="cancelCancelBtn">취소</button>
          <button type="button" id="cancelConfirmBtn">확인</button>
        </div>
      </div>
    </div>