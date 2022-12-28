<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


  <!-- 로그인 하시겠습니까? 모달창 -->
    <div class="confirm-container hide" id="deleteConfirmModal">
      <div>
        <div class="confirm-message">
          <span>리뷰를 삭제하면 되돌릴 수 없습니다.</span>
          <span>정말 삭제 하시겠습니까?</span>
        </div>
        <div class="confirm-btn">
          <button type="button" id="deleteCalcelBtn">취소</button>
          <button type="button" id="deleteConfirmBtn">확인</button>
        </div>
      </div>
    </div>