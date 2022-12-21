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

    <link rel="stylesheet" href="/resources/css/productList/productList-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/header.jsp' />

    <!-- 배너와 검색창이 들어갈 자리입니다 -->
    <section class="banner">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample.jpg">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample2.jpg">
                </div>
                <div class="swiper-slide">
                    <img src="/resources/images/productList/banner-sample3.jpg">
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
            <span id="title">팜팜마켓</span>
            <div id="searchBar">
                <input id="keyword" placeholder="검색어를 입력하세요">
                <button id="searchBtn">
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

                <div class="sur">${category.tops[6].categoryName}</div>

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
                    <span class="opt">판매량순</span>
                    <span>|</span>
                    <span class="opt">신상품순</span>
                    <span>|</span>
                    <span class="opt">낮은가격순</span>
                    <span>|</span>
                    <span class="opt">높은가격순</span>
                </div>
            </div>

            <!-- 상품 하나하나가 들어갈 영역(DOM 이용) -->
            <article class="list-area-body">

                <!-- product-box 자리 -->
                
            </article>


            <div class="pagination-area">
                <!-- ajax로 만들어 보십시다 -->
                <div class="page-box">
                    <<
                </div>
                <div class="page-box">
                    <
                </div>
                <div class="page-box">
                    1
                </div>
                <div class="page-box">
                    2
                </div>
                <div class="page-box">
                    3
                </div>
                <div class="page-box">
                    4
                </div>
                <div class="page-box">
                    5
                </div>
                <div class="page-box">
                    6
                </div>
                <div class="page-box">
                    7
                </div>
                <div class="page-box">
                    8
                </div>
                <div class="page-box">
                    9
                </div>
                <div class="page-box">
                    >
                </div>
                <div class="page-box">
                    >>
                </div>
            </div>
        </section>
    </div>
<!-- 
    <div id="topBtn" class="opacity-zero">
        <i class="fa-sharp fa-solid fa-arrow-up"></i>
    </div> -->


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