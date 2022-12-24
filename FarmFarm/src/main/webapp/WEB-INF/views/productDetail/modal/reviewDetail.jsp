<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<!-- 리뷰 상세조회 모달창 -->
    <div class="review-detail-container hide " id="reviewDetail">
      <div class="review-detail-modal">
        
        
        <div class="review-head">
          <button type="button" class="back-btn" id="backBtn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-head-title">사진 후기</span>
          <span class="empty"></span>
        </div>

        <div class="review-content-container">
          <div class="review-img-list-container">
            <div class="review-swiper-area swiper mySwiper">
              <div class="swiper-wrapper" id="imgContainer">
              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
            </div>
          </div>


          <div class="review-product-content">
            <div class="review-product-preview ">
              <div class="product-thumbnail">
                <img
                src=""
                  id="productThumbnail"
                  />
              </div>

              <div class="review-product-name">
                <span id="productName"></span>
              </div>
            </div>
            <div class="review-content-area">
              <div class="review-detail-content" id="reviewContent">

              </div>
              <div class="review-notice">
                <p>개인의 경험일 뿐 사실과 다를 수 있습니다.</p>
              </div>
              <div class="review-create-date">
                <span id="createDate">2022.12.16</span>
                  <button id="helpBtn"><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>