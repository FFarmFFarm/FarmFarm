<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="orderList" value="${map.orderList}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 주문내역</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/productAdmin/productOrderList-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/adminHeader.jsp' />

    <main>
        <jsp:include page='/WEB-INF/views/admin/adminNav.jsp' />
        
        <c:if test="${not empty param.key}">
            <c:set var="sURL" value="$key=${param.key}&query=${param.query}"/>
        </c:if>

        <section class="order-list-section">
            <div class="page-title">
                <p>주문내역관리</p>
            </div>
            
            <div class="set-period">
                <div class="part-title">
                    <p>기간설정</p>
                </div>
                <div class="input-period">
                    <input type="date" name="orderDate" id="startDate"
                    placeholder="시작일">
                    ~
                    <input type="date" name="orderDate" id="endDate"
                    placeholder="종료일">
                    <button id="search-period">기간검색</button>
                    <div class="button-area">
                        <button id="this-month">당월조회</button>
                        <button id="last-month">전월조회</button>
                        <button id="period-all">전체조회</button>
                    </div>
                </div>
            </div>

            <div class="order-list">
                <div class="part-title list-search">
                    <p>주문목록</p>
                    <div class="count-list">총
                        <span>${map.orderListCount}</span>건
                    </div>
                    <form action="" method="get" id="productSearch" onsubmit="return true">

                        <select name="key" id="searchKey">
                            <option value="m">회원ID</option>
                            <option value="o">주문번호</option>
                        </select>
        
                        <input type="text" name="query"  id="searchQuery" placeholder="검색어 입력">
        
                        <button>검색</button>
                    </form>
                </div>

                <table class="order-list-table">
                    <tr class="table-row table-head">
                        <th>주문번호</th>
                        <th>주문일</th>
                        <th>주문회원</th>
                        <th>품목수</th>
                        <th>상품금액</th>
                        <th>결제금액</th>
                        <th>주문상태</th>
                    </tr>
                    <c:choose>
                        <c:when test="${empty orderList}">
                            <tr>
                                <th colspan="7" class="no-result">주문내역이 존재하지 않습니다.</th>
                            </tr>
                        </c:when>
                        <c:otherwise>
                            <c:forEach items="${orderList}" var="order">

                                <tr class="table-row">
                                    <td>${order.orderNo}</td>
                                    <td>${order.orderDate}</td>
                                    <td>${order.memberId}</td>
                                    <td>${order.productCount}</td>
                                    <td>${order.productSum}</td>
                                    <td>${order.orderPrice}</td>
                                    <td>
                                        <c:if test="${order.orderStatus == 0}">결제완료</c:if>
                                        <c:if test="${order.orderStatus == 1}">배송중</c:if>
                                        <c:if test="${order.orderStatus == 2}">취소완료</c:if>
                                        <c:if test="${order.orderStatus == 3}">구매확정</c:if>
                                    </td>
                                </tr>
                            
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </table>
            </div>
            
            <c:if test="${!empty orderList}">
                <div class="pagination-area">
                    <div class="page-box">
                        <a href="/admin/orderList?cp=1${sURL}">
                            <i class="fa-solid fa-angles-left"></i>
                        </a>
                    </div>
                    <div class="page-box">
                        <a href="/admin/orderList?cp=${pagination.prevPage}${sURL}">
                            <i class="fa-solid fa-angle-left"></i>
                        </a>
                    </div>
                    <c:forEach var="i"
                        begin="${pagination.startPage}"
                        end="${pagination.endPage}"
                        step="1">
                        <c:choose>
                            <c:when test="${i==pagination.currentPage}">
                                <div class="page-box">
                                    <a class="current">${i}</a>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <div class="page-box">
                                    <a href="/admin/orderList?cp=${i}${sURL}">${i}</a>
                                </div>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <div class="page-box">
                        <a href="/admin/orderList?cp=${pagination.nextPage}${sURL}">
                            <i class="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                    <div class="page-box">
                        <a href="/admin/orderList?cp=${pagination.maxPage}${sURL}">
                            <i class="fa-solid fa-angles-right"></i>
                        </a>
                    </div>
                </div>
            
            </c:if>

        </section>
    </main>

    <script src="/resources/js/productAdmin/productOrderList.js"></script>

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <c:if test="${! empty message}">
        <script>
            alert("${message}");
        </script>
        <c:remove var="message"/>
    </c:if>

</body>

</html>