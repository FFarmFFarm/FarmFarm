<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이페이지 - 주문 내역</title>
    <link rel="stylesheet" href="/resources/css/header.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPageOrder-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewForm-style.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>
      

  
    <section class="list-container">
       
    <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>


        <div class="order-list">
          <span class="order-list-title">주문 내역</span>
          <div class="order">
            <input type="hidden" value="order-no" />
            <div class="order-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="order-thumbnail-img"
              />
            </div>
            <div class="order-total">
              <a href="" class="order-title">게시글 제목 샘플</a>
              <div class="order-detail">
                <div class="order-price">결제 금액 <span>15,000</span></div>
                <span class="order-reg-date">2022.12.15</span>
              </div>
              <div class="order-status">
                <a class="order-shipping">배송중</a>
                <span>결제완료</span>
                <span>구매확정</span>
              </div>
              <span>주문하신 상품이 현재 배송중입니다</span>
            </div>
            <div class="button-area">
              <button type="button">주문취소</button>
              <button type="button">구매확정</button>
              <!--                 <button type="button">반품요청</button>
                <button type="button">리뷰작성</button> -->
            </div>
          </div>

          <div class="order">
            <input type="hidden" value="order-no" />
            <div class="order-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="order-thumbnail-img"
              />
            </div>
            <div class="order-total">
              <a href="" class="order-title">게시글 제목 샘플</a>
              <div class="order-detail">
                <div class="order-price">가격 <span>15,000</span></div>
                <span class="order-reg-date">2022.12.15</span>
              </div>
              <div class="order-status">
                <a class="order-shipping">배송중</a>
                <span>결제완료</span>
                <span>구매확정</span>
              </div>
              <span>주문하신 상품이 현재 배송중입니다</span>
            </div>
            <div class="button-area">
              <button type="button">주문취소</button>
              <button type="button">구매확정</button>
              <!--                 <button type="button">반품요청</button>
                <button type="button">리뷰작성</button> -->
            </div>
          </div>

          <div class="order">
            <input type="hidden" value="order-no" />
            <div class="order-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="order-thumbnail-img"
              />
            </div>
            <div class="order-total">
              <a href="" class="order-title">게시글 제목 샘플</a>
              <div class="order-detail">
                <div class="order-price">가격 <span>15,000</span></div>
                <span class="order-reg-date">2022.12.15</span>
              </div>
              <div class="order-status">
                <a class="order-shipping">배송중</a>
                <span>결제완료</span>
                <span>구매확정</span>
              </div>
              <span>주문하신 상품이 현재 배송중입니다</span>
            </div>
            <div class="button-area">
              <button type="button">주문취소</button>
              <button type="button">구매확정</button>
              <!--                 <button type="button">반품요청</button>
                <button type="button">리뷰작성</button> -->
            </div>
          </div>

          <div class="order">
            <input type="hidden" value="order-no" />
            <div class="order-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="order-thumbnail-img"
              />
            </div>
            <div class="order-total">
              <a href="" class="order-title">게시글 제목 샘플</a>
              <div class="order-detail">
                <div class="order-price">가격 <span>15,000</span></div>
                <span class="order-reg-date">2022.12.15</span>
              </div>
              <div class="order-status">
                <a class="order-shipping">배송중</a>
                <span>결제완료</span>
                <span>구매확정</span>
              </div>
              <span>주문하신 상품이 현재 배송중입니다</span>
            </div>
            <div class="button-area">
              <button type="button">주문취소</button>
              <button type="button">구매확정</button>
              <!--                 <button type="button">반품요청</button>
                <button type="button">리뷰작성</button> -->
            </div>
          </div>

          <div class="order">
            <input type="hidden" value="order-no" />
            <div class="order-thumbnail">
              <img
                src="/resources/images/board/thumbnail.png"
                alt=""
                class="order-thumbnail-img"
              />
            </div>
            <div class="order-total">
              <a href="" class="order-title">게시글 제목 샘플</a>
              <div class="order-detail">
                <div class="order-price">가격 <span>15,000</span></div>
                <span class="order-reg-date">2022.12.15</span>
              </div>
              <div class="order-status">
                <a class="order-shipping">배송중</a>
                <span>결제완료</span>
                <span>구매확정</span>
              </div>
              <span>주문하신 상품이 현재 배송중입니다</span>
            </div>
            <div class="button-area">
              <button type="button">주문취소</button>
              <button type="button">구매확정</button>
              <!--                 <button type="button">반품요청</button>
                <button type="button">리뷰작성</button> -->
            </div>
          </div>
          <div class="pagination-area">
            <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="/board/${boardCode}">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.prevPage}">&lt;</a>
              </li>

              <!-- <c:forEach
                  var="i"
                  begin="${pagination.startPage}"
                  end="${pagination.endPage}"
                  step="1"
                >
                  <c:choose>
                    <c:when test="${i == pagination.currentPage}">
                     현재 보고있는 페이지
                      <li><a class="current">${i}</a></li>
                    </c:when>
    
                    <c:otherwise>
                      <li><a href="/board/${boardCode}?cp=${i}">${i}</a></li>
                    </c:otherwise>
                  </c:choose>
                </c:forEach> -->

              <!-- 다음 목록 시작 번호로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.nextPage}">&gt;</a>
              </li>

              <!-- 끝 페이지로 이동 -->
              <li>
                <a href="/board/${boardCode}?cp=${pagination.maxPage}"
                  >&gt;&gt;</a
                >
              </li>
            </ul>
          </div>
        </div>
      </section>

  </main>

    <div class="review-form-container">
      <form action="" method="post" class="review-form">
        <div class="review-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-head-title">후기 작성</span>
          <span class="empty"></span>
        </div>
        <div class="review-product-preview">
          <div class="product-thumbnail">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="product-name">
            <span>[이연복의 목란] 짬뽕 2인분</span>
          </div>
        </div>
        <div class="review-write-area">
          <div class="review-write-head">
            <span>자세한 후기를 들려주세요</span>
            <span
              >작성 시 유의사항 <i class="fa-regular fa-circle-question"></i
            ></span>
          </div>
          <div class="review-write-content">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="review-img-upload">
            <div class="review-one-img">
              <label for="reviewImg"><i class="fa-solid fa-plus"></i></label>
              <input type="file" id="reviewImg" />
            </div>
          </div>
          <div class="review-notice">
            <p>
              사진은 최대 5장까지, 30MB 이하의 이미지만 업로드가 가능합니다.
            </p>
          </div>
          <div class="review-submit"><button>등록하기</button></div>
        </div>
      </form>
    </div>
  </body>
</html>
