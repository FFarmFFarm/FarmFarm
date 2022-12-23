<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 팜팜마켓</title>
    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">
    <link rel="stylesheet" href="/resources/css/productList/productList-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/listHeader.jsp' />

    <!-- 배너와 검색창이 들어갈 자리입니다 -->
    <section class="banner">
        <div class="swiper">
            <div class="swiper-wrapper">
                <!-- 필요 시 이미지 추가 -->
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample.jpg">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample2.jpg">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample3.jpg">
                </div>
            </div>
            <div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        
        <div class="search-area">
            <span id="title">팜팜마켓</span>
            <div id="searchBar">
                <input id="searchInput" class="keyword" placeholder="검색어를 입력하세요">
                <div id='cleanBtn' class='reset-search'>
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <button class="search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    </section>

    <!-- 본문이 들어갈 자리입니다. -->
    <div class="container" role="main">

        <!-- 좌측 카테고리 영역 -->
        <section class="category-area">

            <div class="area-title">카테고리</div>
            <div class="types-area">

                <div class="category-dropdown">
                    <input type="radio" name="types" id="all" value="0" checked>
                    <label for="all">전체</label>

                    <c:forEach items="${categoryList.tops}" var="tops" end="5">
                        <input type="radio" name="types" id="top${tops.categoryNo}" value="${tops.categoryNo}">
                        <label for="top${tops.categoryNo}">${tops.categoryName}</label>
                    </c:forEach>
                </div>

            </div>
            <div class="reset-category">
                <span><i class="fa-solid fa-circle-xmark"></i>&nbsp;검색 초기화</span>
            </div>

        </section>

        <!-- 우측 상품목록 영역 -->
        <section class="list-area">

            <!-- 상품 목록 정렬 옵션 -->
            <div class="list-area-header">
                <div id="listCount">
                    총 123개
                </div>
                <div class="view-option">
                    <input type='radio' name='sorting' id='rates' value='rates' checked>
                    <label for='rates' class="opt" >판매량순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='new' value='newest'>
                    <label for='new' class="opt" >신상품순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='asc' value='priceLowToHigh'>
                    <label for='asc' class="opt" >낮은가격순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='desc' value='priceHighToLow'>
                    <label for='desc' class="opt" >높은가격순</label>
                </div>
            </div>

            <!-- 상품 하나하나가 들어갈 영역(DOM 이용) -->
            <article class="list-area-body">
                <!-- product-box 자리 -->
                <!-- ajax를 사용하지 않으면? -->

                <!-- 최초 이동 시 결과가 없으면.. -->
                <c:if test="${empty productMap}">
                    <div id="resultIsEmpty">
                        <i class="fa-solid fa-basket-shopping"></i>
                        <span>검색 결과가 없습니다.</span>
                    </div>
                </c:if>

                <!-- 최초 이동 시 결과가 있으면 -->
                <c:if test="${! empty productMap}">

                    <c:forEach items="${productMap.productList}" var="map" >
    
                        <a href="/product/${map.productNo}" class="product-box">
                            <div class="product-content">
                                <img src="${map.thumbnailImg}">
                            </div>
                            <div class="product-detail">
                                <div class="product-name">
                                    ${map.productName}
                                </div>
                                <div class="product-price">
                                    ${map.productPrice}원
                                </div>
                                <div class="product-message">
                                    ${map.productMessage}
                                </div>
                            </div>
                        </a>
                        
                    </c:forEach>

                </c:if>

                <div id="spinnerBackground">
                    <div id="spinner" class="spinning">
                        <i class="fa-solid fa-spinner"></i>
                    </div>
                </div>
                
            </article>
            
            <div class="pagination-area">
                <!-- ajax로 만들어 보십시다 -->
                <div id="1" class="page-box">
                    <i class="fa-solid fa-angles-left"></i>
                </div>
                <div id="${productMap.pagination.prevPage}" class="page-box">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <c:forEach var="i" 
                           begin="${productMap.pagination.startPage}" 
                           end="${productMap.pagination.endPage}"
                           step="1">
                    <c:choose>
                        <c:when test="${i == productMap.pagination.currentPage}">
                            <div class="current-page-box">
                                ${i}
                            </div>
                        </c:when>
                    
                        <c:otherwise>
                            <div id="${i}" class="page-box">
                                ${i}
                            </div>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>

                <div id="${productMap.pagination.nextPage}" class="page-box">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div id="${productMap.pagination.endPage}" class="page-box">
                    <i class="fa-solid fa-angles-right"></i>
                </div>
            </div>

        </section>
    </div>

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp'/>

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <!-- swiper-js -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="/resources/js/productList/listSwiper.js"> </script>

    <script src="/resources/js/productList/productList.js"> </script>

</body>
</html>