<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!-- 리뷰 이미지 목록 모달창 -->
    <div class="review-img-container hide" id="reviewImgList">
      <div class="review-img-list-modal">
        <div class="review-img-head">
          <button type="button" class="back-btn" id="imgListClose">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-img-head-title">후기 목록</span>
          <span class="empty"></span>
        </div>
        <div class="review-img-area" id="imgReviewList">
        </div>

      </div>
    </div>
