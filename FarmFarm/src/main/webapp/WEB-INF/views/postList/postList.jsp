<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 사고팔고</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/postList/postList-style.css">
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
            <span id="title">사고팔고</span>
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
                
                <div class="sur">과일</div>
                <div class="category-dropdown">

                    <input type="checkbox" name="types" id="fruit1" value="apple,pear">
                    <label for="fruit1">사과/배</label>

                    <input type="checkbox" name="types" id="fruit2" value="tomato">
                    <label for="fruit2">토마토/방울토마토</label>

                    <input type="checkbox" name="types" id="fruit3" value="strawberry,blueberry">
                    <label for="fruit3">딸기/블루베리</label>

                    <input type="checkbox" name="types" id="fruit4" value="persimmon,mandarin">
                    <label for="fruit4">감/귤</label>

                    <input type="checkbox" name="types" id="fruit5" value="grape,peach">
                    <label for="fruit5">포도/복숭아</label>

                    <input type="checkbox" name="types" id="fruit6" value="watermelon,melon">
                    <label for="fruit6">수박/참외</label>



                </div>

                <div class="sur">채소</div>
                
                <div class="category-dropdown">
                    <input type="checkbox" name="types" id="vegetable1" value="lettuce">
                    <label for="vegetable1">상추/깻잎/양상추</label>

                    <input type="checkbox" name="types" id="vegetable2" value="pepper,pimento">
                    <label for="vegetable2">고추/피망</label>

                    <input type="checkbox" name="types" id="vegetable3" value="cabbage">
                    <label for="vegetable3">배추/양배추/무</label>

                    <input type="checkbox" name="types" id="vegetable4" value="spinach">
                    <label for="vegetable4">갓/시금치/치커리</label>

                    <input type="checkbox" name="types" id="vegetable5" value="cucumber">
                    <label for="vegetable5">오이/가지/옥수수</label>

                    <input type="checkbox" name="types" id="vegetable6" value="potato">
                    <label for="vegetable6">감자/고구마/당근</label>
                    
                    <input type="checkbox" name="types" id="vegetable7" value="mushroom">
                    <label for="vegetable7">버섯류</label>

                    <input type="checkbox" name="types" id="vegetable8" value="bean">
                    <label for="vegetable8">콩</label>

                </div>

                <div class="sur">기타</div>
                <div class="category-dropdown">
                  <input type="checkbox" name="types" id="ect1" value="ect">
                  <label for="vegetable8">기타</label>
                </div>
            </div>

            <a href="/post/enroll" id="goPostEnrollBtn">
              <div id="btn-icon">
                <i class="fa-solid fa-square-pen"></i>
              </div>
              <div id="btn-name">
                판매하기
              </div> 
            </a>
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

                <!-- post-box 자리 -->
                
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
    
    <!-- <div id="topBtn" class="view-hidden">
        <i class="fa-sharp fa-solid fa-arrow-up"></i>
    </div> -->


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