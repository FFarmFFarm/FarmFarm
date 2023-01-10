<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="product" value="${map.product}" />
<c:set var="productImgList" value="${product.imgList}" />
<c:set var="reviewImgAll" value="${product.reviewImgAll}" />
<c:set var="pagination" value="${map.pagination}" />
<c:set var="reviewCount" value="${map.reviewCount}" />
<c:set var="reviewList" value="${map.reviewList}" />
<c:set var="reviewImgList" value="${review.imgList}" />


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>팜팜마켓 | ${product.productName}</title>


    <!-- Swiper JS css-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
    />

    <!-- 헤더/푸터 -->
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />


    <!-- 모달창 스타일 -->
    <link rel="stylesheet" href="/resources/css/modal/reviewImg-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewDetail-style.css" />
    <link rel="stylesheet" href="/resources/css/modal/reviewForm-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />


    <link
    rel="stylesheet"
    href="/resources/css/productDetail/productDetail-style.css"
    />


    <!-- fontawesome -->
    <script
      src="https://kit.fontawesome.com/591746f9e8.js"
      crossorigin="anonymous"
    ></script>


  </head>
  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      
      <section class="product-summary">
        <div class="thumbnail-area">
          <c:forEach var="productImg" items="${productImgList}">
            <c:if test="${productImg.productImgOrder == 0}">  
            <img
            src="${productImg.productImgAddress}"
            alt=""
            />
          </c:if>
          </c:forEach>
        </div>
        <form action="/orderPage" method="POST" class="summary-area" id="orderPage">
          <input type="hidden" name="pList[0].productNo" value="${product.productNo}">
          <input type="hidden" name="pList[0].productImg" value="${productImgList[0].productImgAddress}">
          <input type="hidden" name="pList[0].productPrice" value="${fn:replace(product.productPrice, ',', '')}">
          <span class="product-category" onclick="goToList('${product.categoryNo}')">${product.categoryName}</span>
          <span class="product-name" id="productName">${product.productName}</span>
          <span class="product-message">${product.productMessage}</span>
          <span class="product-price">${product.productPrice}<span>원</span></span>
          <!-- 로그인 x 일 때 -->
          <c:if test="${empty loginMember}">
            <span class="login-meassage">로그인 후 구매 가능합니다</span>
          </c:if>

          <div class="summary">
            <div class="summary-subject">
              <span class="shipping">배송</span>
              <span class="shipping">배송비</span>
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
              <span class="seller">3000원</span>
              <span class="seller">팜팜</span>
              <span class="origin">국산</span>
            </div>
          </div>
          <div class="product-option" id="productOption">
            <span>${product.productName}</span>
            <input type="hidden" name="pList[0].productName" value="${product.productName}">
            <div class="amount-area" >
              <c:if test="${product.soldoutFl eq 'Y'}">
                <button type="button" id="removeBtn" disabled>-</button>
                <span id="productAmount">1</span>
                <button type="button" id="addBtn" disabled>+</button>
              </c:if>
              <c:if test="${product.soldoutFl ne 'Y'}">
                <c:if test="${product.stock lt 1}">
                <button type="button" id="removeBtn" disabled>-</button>
                <span id="productAmount">1</span>
                <button type="button" id="addBtn" disabled>+</button>
                </c:if>
                <c:if test="${product.stock gt 0}">
                <button type="button" id="removeBtn">-</button>
                <span id="productAmount">1</span>
                <button type="button" id="addBtn">+</button>
                <input type="hidden" name="pList[0].productAmount" value="1" id="amountInput"/>
                </c:if>
              </c:if>
            </div>
            <div class="total-price">
              <span>총 금액:</span>
              <span ><span id="totalPrice">${product.productPrice}</span><span>원</span></span>
            </div>
            <c:if test="${product.soldoutFl eq 'Y'}">
              <span class="soldout">해당 상품은 현재 품절입니다. 구매하실 수 없습니다.</span>
            </c:if>
            <c:if test="${product.soldoutFl ne 'Y'}">
              <c:if test="${product.stock lt 1}">
              <span class="soldout">해당 상품은 현재 품절입니다. 구매하실 수 없습니다.</span>
              </c:if>
            </c:if>
            <span class="stock" id="stock"></span>
          </div>
          <div class="product-btn-area">
            <!-- 채팅방 입장 -->
            <c:if test="${! empty loginMember}">
              <button type="button" class="chatting-btn" id="inquireBtn">
                <i class="fa-regular fa-comment-dots"></i>
              </button>
            </c:if>



            <c:if test="${product.soldoutFl eq 'Y'}">
                <button type="button" class="cart-btn" disabled>장바구니 담기</button>
                <button type="button" class="order-btn" disabled >주문하기</button>
            </c:if>
            <c:if test="${product.soldoutFl ne 'Y'}">
              <c:if test="${product.stock lt 1}">
                <button type="button" class="cart-btn" disabled>장바구니 담기</button>
                <button type="button" class="order-btn" disabled>주문하기</button>
              </c:if>
              <c:if test="${product.stock gt 0}">
                <button type="button" class="cart-btn" id="cartBtn">장바구니 담기</button>
                <button type="button" class="order-btn" id="orderBtn">주문하기</button>
              </c:if>
            </c:if>

          </div>
        </form>
        <button type="button" class="share-btn" id="shareBtn">
          <i class="fa-solid fa-share"></i>
        </button>
        <c:if test="${! empty loginMember}">
          <c:if test="${product.wishCheck == 0}">
            <button class="wish-btn fa-brands fa-gratipay wish-unclicked" id="wishBtn"></button>
          </c:if>
          <c:if test="${product.wishCheck == 1}">
            <button class="wish-btn fa-brands fa-gratipay wish-clicked" id="wishBtn"></button>
          </c:if>
        </c:if>
      </section>
      <section class="product-menu">
        <a href="#productDetail">상세 설명</a>
        <a href="#productReview">후기(<span>${reviewCount}</span>)</a>
      </section>
      <section class="product-detail" id="productDetail">
        <c:forEach var="productImg" items="${productImgList}">
          <c:if test="${productImg.productImgOrder != 0}">  
            <img
            src="${productImg.productImgAddress}"
            alt=""
            class="product-img"
            />
          </c:if>
        </c:forEach>
      </section>
      <section class="product-review" id="productReview">
        <span>상품 후기</span>

        <!-- reviewImgAll이 비어있지 않을 때 -->
        <c:if test="${! empty reviewImgAll}">
          <ul class="review-img-list">

          <!-- reviewImgAll의 길이가 8보다 작을 때 -->
          <c:if test="${fn:length(reviewImgAll) lt 8}">
            <c:forEach var="reviewImg" items="${reviewImgAll}">
                  <li id="${reviewImg.reviewNo}" class="review-one-img">
                        <img src="${reviewImg.reviewImgPath}" alt="" />
                  </li>
            </c:forEach>
          </c:if>

          <!-- reviewImgAll의 길이가 7보다 클 때 -->
          <c:if test="${fn:length(reviewImgAll) gt 7}">
            <c:forEach var="reviewImg" items="${reviewImgAll}" begin="0" end="6">
              <li id="${reviewImg.reviewNo}" class="review-one-img">
                    <img src="${reviewImg.reviewImgPath}" alt="" />
              </li>
            </c:forEach>

            <c:forEach var="reviewImg" items="${reviewImgAll}" begin="7" end="7">
                <!-- 8개 이상일 때 -->
                <li class="last-review-img" id="${reviewImg.reviewNo}">
                        <img src="${reviewImg.reviewImgPath}" alt="" />
                  <div class="more-review-img-btn">+더보기</div>
                </li>
            </c:forEach>
          </c:if>
        </ul>
      </c:if>



        <div class="review-header" >
          <span>총 <span>${reviewCount}</span>개</span>
          <div class="sort-area">
            <button class="popular sort-clicked" id="sortRecommend">추천순</button>
            <span class="or-bar">|</span>
            <button class="latest" id="sortNewest">최근 등록순</button>
          </div>
        </div>
        <ul class="review-list" id="productReviewList">

          <c:if test="${reviewCount == 0}">
            <li class="no-review">
              리뷰가 없습니다. 상품을 구입하고 첫 후기를 남겨주세요.
            </li>
          </c:if>

          <c:if test="${reviewCount > 0}">
          <c:forEach var="review" items="${reviewList}">
            <li class="review" id="${review.reviewNo}">
              <div class="review-writer">
                <c:if test="${empty review.profileImg}">
                <img
                src="/resources/images/member/profile/profile.png"
                alt=""
                class="writer-profile-img"
                />
                </c:if>
                <c:if test="${! empty review.profileImg}">
                <img
                src="${review.profileImg}"
                alt=""
                class="writer-profile-img"
                />
                </c:if>
                <div class="nickname-area">
                  <span class="writer-nickname">${review.memberNickname}</span>
                  <c:if test="${review.likeCount gt 10}">
                  <span class="best-review">베스트</span>
                  </c:if>
                </div>
              </div>
              <div class="review-content">
                <c:if test="${review.memberNo == loginMember.memberNo}">
                  <button type="button" class="review-update-btn" id="${review.reviewNo}">수정하기</button>
                </c:if>
                <span>${product.productName}</span>
                <p>
                  ${review.reviewContent}
                </p>
                <div class="review-img">
                  <c:if test="${! empty review.imgList}">
                    <c:forEach var="img" items="${review.imgList}">
                      <img src="${img.reviewImgPath}" alt="" class="review-one-img" id="${review.reviewNo}"/>
                    </c:forEach>
                  </c:if>
                </div>
                <div class="review-create-date">
                  <span>${review.createDate}</span>

                <c:if test="${review.memberNo != loginMember.memberNo}">

                  <c:if test="${review.likeCheck > 0}">
                    <button class="clicked helped-btn" id="R${review.reviewNo}">
                      <i class="fa-regular fa-thumbs-up "></i>
                      <span>도움돼요<span>
                      </button>
                    </c:if>
                    <c:if test="${review.likeCheck == 0}">
                      <button class="unclicked helped-btn" id="R${review.reviewNo}">
                        <i class="fa-regular fa-thumbs-up "></i>
                        <span>도움돼요<span>
                      </button>
                    </c:if>
                  </c:if>
                  <c:if test="${review.memberNo == loginMember.memberNo}">
                    <span>도움 <span class="review-helped">${review.likeCount}</span> </span>
                  </c:if>
                </div>
              </div>
            </li>
          </c:forEach>
          </c:if> 
        </ul>

        <div class="pagination" id="pagination">
          <c:if test="${1 lt pagination.currentPage}">
            <button id="reviewPre"><i class="fa-solid fa-chevron-left"></i></button>
          </c:if>
          <c:if test="${pagination.maxPage > pagination.currentPage}">
            <button id="reviewNext"><i class="fa-solid fa-chevron-right"></i></button>
          </c:if>
          </div>
      </section>
    </main>

    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>


    <!-- modal -->
    <jsp:include page="/WEB-INF/views/productDetail/modal/reviewImgList.jsp"/>
    <jsp:include page="/WEB-INF/views/productDetail/modal/reviewDetail.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/loginConfirm.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    <jsp:include page="/WEB-INF/views/order/modal/cartConfirm.jsp"/>
    <jsp:include page="/WEB-INF/views/myPage/modal/reviewUpdateForm.jsp"/>





  </body>


  <script>

    var loginMemberNo = "${loginMember.memberNo}";
    var stock = "${product.stock}";
    var loginMember = "${loginMember}";
    var cp = "${pagination.currentPage}";
    var sortFl = 'R';
    var authority = "${loginMember.authority}";

  </script>


  <!-- jquery -->
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

  
  <!-- Swiper JS -->
  <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>


  <!-- script -->
  <script src="/resources/js/common/common.js"></script>
  <script src="/resources/js/productDetail/productDetail.js"></script>
</html>
