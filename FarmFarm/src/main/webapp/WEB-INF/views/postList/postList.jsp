<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>사고팔고</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/postList/postList-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/listHeader.jsp' />

    <!-- 배너와 검색창이 들어갈 자리입니다 -->
    <section class="banner">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="/resources/images/postList/listbg1.png">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/postList/listbg2.png">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/postList/listbg3.png">
                </div>
                <!-- 필요 시 이미지 추가 -->
            </div>
            <div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        
        <div class="search-area">
            <span id="title">사고팔고</span>
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
                
                <input type="radio" name="types" id="all" value="0" checked>
                <label for="all" id="allCategory">전체</label>

                <div class="sur">${categoryList.tops[6].categoryName}</div>
                <div class="category-dropdown">
            
                    <c:forEach items="${categoryList.fruits}" var="fruit">
                        <input type="radio" name="types" id="fruit${fruit.categorySubNo}" value="${fruit.categorySubNo}">
                        <label for="fruit${fruit.categorySubNo}">${fruit.categorySubName}</label>
                    </c:forEach>
                </div>
                <div class="sur">${categoryList.tops[7].categoryName}</div>
                <div class="category-dropdown">
                    <c:forEach items="${categoryList.vegetables}" var="vegetable">
                        <input type="radio" name="types" id="vegetable${vegetable.categorySubNo}" value="${vegetable.categorySubNo}">
                        <label for="vegetable${vegetable.categorySubNo}">${vegetable.categorySubName}</label>
                    </c:forEach>
                </div>

                <div class="sur">${categoryList.tops[8].categoryName}</div>
                <div class="category-dropdown">
                    <c:forEach items="${categoryList.ects}" var="ect">
                        <input type="radio" name="types" id="ect${ect.categorySubNo}" value="${ect.categorySubNo}">
                        <label for="ect${ect.categorySubNo}">${ect.categorySubName}</label>
                    </c:forEach>
                </div>
            
            </div>
            <div class="reset-category">
                <span><i class="fa-solid fa-circle-xmark"></i>&nbsp;검색 초기화</span>
            </div>
            <c:if test="${loginMember.authority == 1}">
                <a href="/post/enroll" id="goPostEnrollBtn">
                    <div id="btn-icon">
                        <i class="fa-solid fa-square-pen"></i>
                    </div>
                    <div id="btn-name">
                        판매하기
                    </div> 
                </a>
            </c:if>
        </section>

        <!-- 우측 상품목록 영역 -->
        <section class="list-area">

            <!-- 상품 목록 정렬 옵션 -->
            <div class="list-area-header">
                <div class="list-count-area">
                    <span>검색결과&nbsp;</span>
                    <span id="listCount">${postMap.pagination.listCount}</span>
                    <span>개</span>
                </div>
                <div class="view-option">
                    <label for="except" class="except">
                        <input type="checkbox" id="except">
                        <p>품절상품 제외하기</p>
                    </label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='rates' value='views' checked>
                    <label for='rates' class="opt">조회순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='new' value='newest'>
                    <label for='new' class="opt">신상품순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='asc' value='priceLowToHigh'>
                    <label for='asc' class="opt">낮은가격순</label>
                    <span>|</span>
                    <input type='radio' name='sorting' id='desc' value='priceHighToLow'>
                    <label for='desc' class="opt">높은가격순</label>
                </div>
            </div>

            <article class="list-area-body">
                
                <!-- 최초 이동 시 결과가 없으면.. -->
                <c:if test="${empty postMap}">
                    <div id="resultIsEmpty">
                        <i class="fa-solid fa-basket-shopping"></i>
                        <span>검색 결과가 없습니다.</span>
                    </div>
                </c:if>
                
                <!-- 최초 이동 시 결과가 있으면 -->
                <c:if test="${! empty postMap}">
                
                    <c:forEach items="${postMap.postList}" var="map">
                        <a href="/post/${map.postNo}" class="post-box">
                            <c:if test="${map.postSoldoutFl==1}">
                                <div class="sold-out-blind">
                                    <img src="/resources/images/postList/out-of-stock.png">
                                </div>
                            </c:if>
                            <div class="post-thumbnail">
                                <c:if test="${! empty map.thumbnailImg}">
                                    <img src="${map.thumbnailImg}">
                                </c:if>
                                <c:if test="${empty map.thumbnailImg}">
                                    <img src="/resources/images/logo-square.png">
                                </c:if>
                            </div>
                            <div class="post-detail">
                                <div class="post-title">
                                    ${map.postTitle}
                                </div>
                                <div class="unit-price">
                                    ${map.unitPrice}원
                                </div>
                                <div class="post-content">
                                    ${map.postContent}
                                </div>
                            </div>
                        </a>
                
                    </c:forEach>
                
                </c:if>

                <!-- post-box 자리 -->



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
                <div id="${postMap.pagination.prevPage}" class="page-box">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <c:forEach var="i" begin="${postMap.pagination.startPage}" end="${postMap.pagination.endPage}" step="1">
                    <c:choose>
                        <c:when test="${i == postMap.pagination.currentPage}">
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
            
                <div id="${postMap.pagination.nextPage}" class="page-box">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div id="${postMap.pagination.endPage}" class="page-box">
                    <i class="fa-solid fa-angles-right"></i>
                </div>
            </div>

        </section>
    </div>
    
    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    
    <!-- swiper-js -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="/resources/js/productList/listSwiper.js"> </script>
    
    <script src="/resources/js/postList/postList.js"> </script>
    
</body>

</html>