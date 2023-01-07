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
            
            <!-- 상품 목록 -->
            <c:choose>
                <c:when test="${empty cartList}">
                    <div class="no-item">
                        <span>추가된 상품이 없습니다</span>
                        <a href="/product/list" class='go-shopping'>쇼핑하러 가기</a>
                    </div>
                </c:when>
                <c:otherwise>
                    <form action="/orderPage" method="POST" id="orderPage">
                        <div class="product-container">
                            <div class="cart-headline" id="cartHeadline">
                                <label class="check-label">
                                    <i class="fa-solid fa-circle-check" name="checkAll"></i>
                                    <input type="checkbox" class="select-all" name="selectAll" checked="checked">
                                    <span class="check-title">전체선택(<span class="count-check"></span>/${fn:length(cartList)})
                                    </span>
                                </label>
                                <span class="bar">|</span>
                                <button type="button" class="check-title delete-check" id="deleteBtn">선택삭제</button>
                            </div>

                            <ul class="product-list">
                                <c:forEach var="cart" items="${cartList}" varStatus="vs">
                                    <input type="hidden" name="pList[${vs.index}].productName" value="${cart.productName}" />
                                    <input type="hidden" name="pList[${vs.index}].productImg" value="${cart.productImg}" />
                                    <input type="hidden" name="pList[${vs.index}].productPrice" value="${fn:replace(cart.productPrice, ',', '')}" />

                                    <li class="product-item" id="${cart.productNo}">
                                    <c:choose>
                                        <c:when test="${cart.stock eq 0 || cart.soldoutFl eq 'Y'}">
                                            <label class="uncheck-label">
                                                <i class="fa-regular fa-circle-check" name="unCheckIcon"></i>
                                                <input type="checkbox" class="select-one" 
                                                name="pList[${vs.index}].productNo" value="${cart.productNo}"
                                                disabled>
                                            </label>
                                        </c:when>
                                        <c:otherwise>
                                            <label class="check-label">
                                                <i class="fa-solid fa-circle-check" name="checkIcon"></i>
                                                <input type="checkbox" class="select-one" 
                                                name="pList[${vs.index}].productNo" value="${cart.productNo}"
                                                checked="checked">
                                            </label>
                                        </c:otherwise>
                                    </c:choose>
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
                                            <c:if test="${cart.stock eq 0 || cart.soldoutFl eq 'Y'}">
                                                <button type="button" class="minus-btn" disabled><i class="fa-solid fa-minus"></i></button>
                                                <input type="number" min="1" class="product-amount"
                                                value="${cart.productAmount}" name="pList[${vs.index}].productAmount">
                                                <button type="button" class="plus-btn" disabled><i class="fa-solid fa-plus"></i></button>
                                                <span id="${cart.stock}" name="stock">품절된 상품입니다</span>
                                            </c:if>
                                            <c:if test="${cart.stock ne 0 && cart.soldoutFl eq 'N' && cart.stock ge cart.productAmount}">
                                                <button type="button" class="minus-btn"><i class="fa-solid fa-minus"></i></button>
                                                <input type="number" min="1" class="product-amount"
                                                value="${cart.productAmount}" name="pList[${vs.index}].productAmount">
                                                <button type="button" class="plus-btn"><i class="fa-solid fa-plus"></i></button>
                                                <span id="${cart.stock}" name="stock"></span>
                                            </c:if>
                                        </div>
                                        <div class="price-box">
                                            <span class="product-total-price"
                                            id="${cart.productPrice}">${cart.productTotalPrice}</span>
                                            <span>원</span>
                                        </div>
                                        <button type="button" class="cancel-item"><i class="fa-solid fa-xmark"></i></button>
                                    </li>
                                </c:forEach>
                            </ul>
                        </div>
                    </form>
                    
                    <!-- 배송지, 결제 정보 -->
                    <div class="info-container">
                        <div class="info-top" id="deliveryInfo">
                            <div class="address-info">
                                <div class="address-title">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <span>배송지</span>
                                </div>
                                <span class="address-detail">${loginMember.memberAddress2}</span>
                                <button type="button" id="changeAddress">배송지 변경</button>
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
                                <button type="button" id="orderBtn">주문하기</button>
                                <ul class="notice-container">
                                    <li>[주문완료] 상태일 경우에만 주문 취소 가능합니다.</li>
                                    <li>[마이컬리 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </c:otherwise>
            </c:choose>
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
    <%-- <script src="/resources/js/member/signUp.js"></script> --%>

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>


</body>
</html>