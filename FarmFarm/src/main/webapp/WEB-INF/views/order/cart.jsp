<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="totalPrice" value="0"/>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 장바구니</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/order/cart-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">
    
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/header.jsp' />

    <main>
        <div class="cart-title">장바구니</div>

        <section class="cart-container">
            <form action="/orderPage" method="POST">
            
            
            </form>
            <!-- 상품 목록 -->
            <div class="product-container">
                <div class="cart-headline">
                    <label class="check-label">
                        <i class="fa-solid fa-circle-check" name="checkAll"></i>
                        <input type="checkbox" class="select-all" name="selectAll" checked="checked">
                        <span class="check-title">전체선택(<span class="count-check">${fn:length(cartList)}</span>/${fn:length(cartList)})
                        </span>
                    </label>
                    <span class="bar">|</span>
                    <button class="check-title delete-check">선택삭제</button>
                </div>

                <ul class="product-list">

                    <c:choose>
                        <c:when test="${empty cartList}">
                            <div class="no-item">추가된 상품이 없습니다.</div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="cart" items="${cartList}">
                                <li class="product-item" id="${cart.productNo}">
                                    <label class="check-label">
                                        <i class="fa-solid fa-circle-check" name="checkIcon"></i>
                                        <input type="checkbox" class="select-one" name="selectOne"
                                        checked="checked">
                                    </label>
                                    <a href="/product/${cart.productNo}" class="cart-thumbnail">
                                        <img
                                        src="${cart.productImg}"
                                        alt=""
                                        class="cart-thumbnail-img"
                                        />
                                    </a>
                                    <div class="cart-product-name">
                                        <a href="/product/${cart.productNo}">
                                            <p>${cart.productName}</p>
                                        </a>
                                    </div>
                                    <div class="product-amount-btn">
                                        <button class="minus-btn"><i class="fa-solid fa-minus"></i></button>
                                        <input type="number" min="1" class="product-amount"
                                        value="${cart.productAmount}">
                                        <button class="plus-btn"><i class="fa-solid fa-plus"></i></button>
                                        <span id="${cart.stock}" name="stock"></span>
                                    </div>
                                    <div class="price-box">
                                        <span class="product-total-price"
                                        id="${cart.productPrice}">${cart.productTotalPrice}</span>
                                        <span>원</span>
                                    </div>
                                    <button class="cancel-item"><i class="fa-solid fa-xmark"></i></button>
                                </li>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
            </div>
            
            <!-- 배송지, 결제 정보 -->
            <div class="info-container">
                <div>
                    <div class="address-info">
                        <div class="address-title">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>배송지</span>
                        </div>
                        <span class="address-detail">서울 노원구 한글비석로 46가길 16 2동 101호</span>
                        <button class="change-address">배송지 변경</button>
                    </div>
                    <div class="price-container">
                        <div class="price-one-line">
                            <span>상품금액</span>
                            <div>
                                <span id="totalPrice"></span>
                                <span>원</span>
                            </div>
                        </div>
                        <div class="price-one-line">
                            <span>배송비</span>
                            <div>
                                <span id="postPrice">3,000</span>
                                <span>원</span>
                            </div>
                        </div>
                        <div class="price-one-line">
                            <span>결제예정금액</span>
                            <div>
                                <span id="orderPrice"></span>
                                <span>원</span>
                            </div>
                        </div>
                    </div>
                    <div class="submit-container">
                        <button type="button">주문하기</button>
                        <ul class="notice-container">
                            <li>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</li>
                            <li>[마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </section>

    </main>

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />
    <jsp:include page="/WEB-INF/views/order/modal/cartConfirm.jsp"/>

    <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>
        <c:remove var="message"/>
    </c:if>

    <script>
        memberNo = "${loginMember.memberNo}";
    </script>

    <script src="/resources/js/common/common.js"></script>
    <script src="/resources/js/order/cart.js"></script>

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>


</body>
</html>