<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="productList" value="${map.productList}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 사고팔고</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/productAdmin/productStock-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/adminHeader.jsp' />

    <main>
        <jsp:include page='/WEB-INF/views/admin/adminNav.jsp' />
        <section class="order-list-section">
            <div class="page-title">
                <p>상품관리</p>
            </div>

            <div class="order-list">
                <div class="part-title list-search">
                    <p>전체상품</p>
                    <div class="count-list">총
                        <span>${map.listCount}</span>개
                    </div>
                    <form action="" method="get" id="productSearch" onsubmit="return true">

                        <select name="key" id="searchKey">
                            <option value="pName">상품명</option>
                            <option value="pCode">상품코드</option>
                        </select>
        
                        <input type="text" name="query"  id="searchQuery" placeholder="검색어 입력">
        
                        <button>검색</button>
                    </form>
                </div>

                <table class="order-list-table">
                    <tr class="table-row table-head">
                        <th>제품코드</th>
                        <th>제품명</th>
                        <th>재고량</th>
                        <th>출고예정</th>
                        <th>가재고</th>
                        <th>입고</th>
                        <th>출고</th>
                        <th>판매상태</th>
                    </tr>
                    <c:forEach items="${productList}" var="product">
                        <tr class="table-row">
                            <td class="product-code">
                                <span>${product.productNo}</span>
                                <span>(${product.regDate})</span>
                            </td>
                            <td class="product-title">
                                <div class="product-img">
                                <img src="${product.productImgAddress}">
                                </div>
                                <span class="product-name">${product.productName}</span>
                                <div class="product-btn">
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </td>
                            <td>${product.stock}</td>
                            <td>7</td>
                            <td>93</td>
                            <td>
                                <input type="number" max="999"  class="stock-input income" placeholder="0">
                                <button class="change-btn">수정</button>
                            </td>
                            <td>
                                <input type="number" max="999" class="stock-input release" placeholder="0">
                                <button class="change-btn">수정</button>
                            </td>
                            <c:if test="${product.soldoutFl=='N'}">
                                <td>판매중</td>
                            </c:if>
                            <c:if test="${product.soldoutFl=='Y'}">
                                <td>판매완료</td>
                            </c:if>
                        </tr>
                    </c:forEach>
                </table>
            </div>
            
            <div class="pagination-area">
                <div class="page-box">
                    <a href="/admin/stock">
                        <i class="fa-solid fa-angles-left"></i>
                    </a>
                </div>
                <div class="page-box">
                    <a href="/admin/stock?cp=${pagination.prevPage}">
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
                                <a href="/admin/stock?cp=${i}">${i}</a>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
                <div class="page-box">
                    <a href="/admin/stock?cp=${pagination.nextPage}">
                        <i class="fa-solid fa-angle-right"></i>
                    </a>
                </div>
                <div class="page-box">
                    <a href="/admin/stock?cp=${pagination.maxPage}">
                        <i class="fa-solid fa-angles-right"></i>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <%-- <script src="/resources/js/productAdmin/enrollProduct.js"></script> --%>

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