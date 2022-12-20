<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product Detail</title>

    <link
      rel="stylesheet"
      href="/resources/css/productDetail/productDetail-style.css"
    />
    <link rel="stylesheet" href="/resources/css/header.css" />
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="/resources/css/modal/reviewImg-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewDetail-style.css" />
  </head>
  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      
      <section class="product-summary">
        <div class="thumbnail-area">
          <img
            src="/resources/images/product/thumbnail/productThumbnail.png"
            alt=""
          />
        </div>
        <div class="summary-area">
          <span class="product-category">채소</span>
          <span class="product-name">토마토는 거꾸로해도 토마토</span>
          <span class="product-message">토마토는 맛있어요</span>

          <span class="product-price">1,500원</span>
          <!-- 로그인 x 일 때 -->
          <span class="login-meassage">로그인 후 구매 가능합니다</span>

          <div class="summary">
            <div class="summary-subject">
              <span class="shipping">배송</span>
              <span class="seller">판매자</span>
              <span class="origin">원산지</span>
            </div>
            <div class="summary-content">
              <div class="shipping">
                <span class="shipping">택배</span>
                <span class="shipping shipping-message"
                  >주문 후 2~5일 배송</span
                >
              </div>
              <span class="seller">팜팜</span>
              <span class="origin">국산</span>
            </div>
          </div>
          <div class="product-option">
            <span>토마토는 거꾸로 해도 토마토</span>
            <div class="amount-area">
              <button type="button">-</button>
              <span>1</span>
              <button type="button">+</button>
            </div>
            <div class="total-price">
              <span>총 금액:</span>
              <span> 1,500원 </span>
            </div>
          </div>
          <div class="product-btn-area">
            <button type="button" class="chatting-btn">
              <i class="fa-regular fa-comment-dots"></i>
            </button>
            <button type="button" class="cart-btn">장바구니 담기</button>
            <button type="button" class="order-btn">주문하기</button>
          </div>
        </div>
        <button type="button" class="share-btn">
          <i class="fa-solid fa-share"></i>
        </button>
        <button class="wish-btn fa-brands fa-gratipay"></button>
      </section>
      <section class="product-menu">
        <a href="#productDetail">상세 설명</a>
        <a href="#productReview">후기(<span>120</span>)</a>
      </section>
      <section class="product-detail" id="productDetail">
        <img src="/resources/images/product/detail/1.jpg" alt="" />
        <img src="/resources/images/product/detail/2.jpg" alt="" />
        <img src="/resources/images/product/detail/3.jpg" alt="" />
        <img src="/resources/images/product/detail/4.jpg" alt="" />
      </section>
      <section class="product-review" id="productReview">
        <span>상품 후기</span>
        <ul class="review-img-list">
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>
          <li>
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
          </li>

          <!-- 8개 이상일 때 -->
          <li class="last-review-img">
            <img src="/resources/images/product/review/reviewImg.png" alt="" />
            <div class="more-review-img-btn">+더보기</div>
          </li>
        </ul>
        <div class="review-header">
          <span>총 <span>33</span>개</span>
          <div>
            <button class="popular">추천순</button>
            <span>|</span>
            <button class="latest">최근 등록순</button>
          </div>
        </div>
        <ul class="review-list">
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
          <li class="review">
            <div class="review-writer">
              <img
                src="/resources/images/member/farmer.png"
                alt=""
                class="writer-profile-img"
              />
              <div class="nickname-area">
                <span class="writer-nickname">최소채소마니아</span>
                <span class="best-review">베스트</span>
              </div>
            </div>
            <div class="review-content">
              <span>상품명</span>
              <p>
                너무 맛있어요 <br />
                토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요<br />
              </p>
              <div class="review-img">
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
                <img src="/resources/images/product/review/reviewImg.png" alt="" />
              </div>
              <div class="review-create-date">
                <span>2022.12.16</span>
                <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="pagenation">
          <button><i class="fa-solid fa-chevron-left"></i></button>
          <button><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </section>
    </main>
    <div class="review-img-container">
      <div class="review-img-list-modal">
        <div class="review-img-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-img-head-title">후기 목록</span>
          <span class="empty"></span>
        </div>
        <div class="review-img-area">
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <!-- <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div> -->
          <!-- <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div>
          <div class="review-list-img">
            <img
              src="/resources/images/product/thumbnail/productThumbnail.png"
              alt=""
            />
          </div> -->
        </div>
        <div class="pagenation-area">
          <button><i class="fa-solid fa-chevron-left"></i></button>
          <button><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>

    <div class="review-detail-container">
      <div class="review-detail-modal">
        <div class="review-head">
          <button type="button" class="back-btn">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="review-head-title">후기 상세</span>
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
        <div class="review-content-area">
          <div class="review-content">
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
            너무 맛있어요 <br />
            토마토 주스 만들어 먹었는데 설탕 안넣어도 달아요 <br />
          </div>
          <div class="review-notice">
            <p>개인의 경험일 뿐 사실과 다를 수 있습니다.</p>
          </div>
          <div class="review-uploaded-img">
            <div class="uploaded-img">
              <img
                src="/resources/images/post/postDetail/detail/20180802_1_15415.jpg"
                alt=""
              />
            </div>
            <div class="uploaded-img">
              <img
                src="/resources/images/post/postDetail/detail/20220825000809_0.jpg"
                alt=""
              />
            </div>
            <div class="uploaded-img">
              <img
                src="/resources/images/post/postDetail/detail/img_products_detail_01.jpg"
                alt=""
              />
            </div>
            <div class="uploaded-img">
              <img
                src="/resources/images/post/postDetail/detail/20180802_1_15415.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="review-create-date">
            <span>2022.12.16</span>
            <button><i class="fa-regular fa-thumbs-up"></i>도움돼요</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
