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
                    <label for="selectAll" class="check-label">
                        <input type="checkbox" class="select-all" id="selectAll" checked="checked">
                        <div class="check-all">
                            <%-- <i class="fa-regular fa-circle-check"></i> --%>
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <span class="check-title">전체선택(5/5)</span>
                    </label>
                    <span class="bar">|</span>
                    <button class="check-title delete-check">선택삭제</button>
                </div>

                <ul class="product-list">
                    <li class="product-item">
                        <label for="selectOne" class="check-label">
                            <input type="checkbox" class="select-one" id="selectOne" checked="checked">
                            <div class="check-icon">
                                <%-- <i class="fa-regular fa-circle-check"></i> --%>
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                        </label>
                        <a href="#" class="cart-thumbnail">
                            <img
                            src="../../images/product/thumbnail/productThumbnail.png"
                            alt=""
                            class="cart-thumbnail-img"
                            />
                        </a>
                        <div class="cart-product-name">
                            <a href="#">
                            <p>모종모종 모종삽</p>
                            </a>
                        </div>
                        <div class="product-amount-btn">
                            <button><i class="fa-solid fa-minus"></i></button>
                            <input type="number" min="1" class="product-amount"
                            value=2>
                            <button><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="price-box">
                            <span class="product-price">9,900</span>
                            <span>원</span>
                        </div>
                        <button class="cancel-item"><i class="fa-solid fa-xmark"></i></button>
                    </li>
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
                                <span id="totalPrice">30,000</span>
                                <span>원</span>
                            </div>
                        </div>
                        <div class="price-one-line">
                            <span>배송비</span>
                            <span>3,000 원</span>
                        </div>
                        <div class="price-one-line">
                            <span>결제예정금액</span>
                            <div>
                                <span id="orderPrice">33,000</span>
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

    <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>
        <c:remove var="message"/>
    </c:if>

    <script src="/resources/js/order/cart.js"></script>ß

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>


</body>
</html>