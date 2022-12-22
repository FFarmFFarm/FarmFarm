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

    <link rel="stylesheet" href="/resources/css/seller/enrollPost-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/header.jsp' />

    <main>
        <section class="enroll-section">
            <div class="page-title">
                <p>상품 등록</p>
            </div>

            <div class="product-items">
                <p class="item-title">카테고리 설정</p>
                <div class="category-list">
                    <div class="category">
                        <div class="category-title">
                            <p>대분류</p>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <div class="category-selected">
                            <p>채소</p>
                            <p>&times</p>
                        </div>
                    </div>
                    <div class="category">
                        <div class="category-title">
                            <p>소분류</p>
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                        <div class="category-selected">
                            <p>감자 • 고구마</p>
                            <p>&times</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="product-items">
                <p class="item-title">상품정보</p>
                <ul class="post-info">
                    <li class="info-list">
                        <p>상품명</p>
                        <input type="text" name="postTitle" size="60" maxlength="20">
                    </li>
                    <li class="info-list">
                        <p>판매가격</p>
                        <input type="text" name="unitPrice">
                        <p>원</p>
                    </li>
                    <li class="info-list">
                        <p>생산일</p>
                        <input type="date" name="openDate">
                    </li>
                    <li class="info-list">
                        <p>대표이미지</p>
                        <div class="post-img thumbnail">
                            <label for="img0">
                                <img class="preview" src="">
                                <i class="fa-solid fa-plus"></i>
                            </label>
                            <input type="file" name="postImg" class="input-img"
                            id="img0" accept="image/*">
                            <span class="delete-img">&times;</span>
                        </div>
                    </li>
                    <li class="info-list">
                        <p>추가이미지</p>
                        <div class="img-box">
                            <div class="post-img">
                                <label for="img1">
                                    <img class="preview" src="">
                                    <p>사진추가</p>
                                </label>
                                <input type="file" name="postImg" class="input-img"
                                id="img1" accept="image/*">
                                <span class="delete-img">&times;</span>
                            </div>
                            <div class="post-img">
                                <label for="img2">
                                    <img class="preview" src="">
                                    <p>사진추가</p>
                                </label>
                                <input type="file" name="postImg" class="input-img"
                                id="img2" accept="image/*">
                                <span class="delete-img">&times;</span>
                            </div>
                            <div class="post-img">
                                <label for="img3">
                                    <img class="preview" src="">
                                    <p>사진추가</p>
                                </label>
                                <input type="file" name="postImg" class="input-img"
                                id="img3" accept="image/*">
                                <span class="delete-img">&times;</span>
                            </div>
                            <div class="post-img">
                                <label for="img4">
                                    <img class="preview" src="">
                                    <p>사진추가</p>
                                </label>
                                <input type="file" name="postImg" class="input-img"
                                id="img4" accept="image/*">
                                <span class="delete-img">&times;</span>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
            <div class="product-items">
                <p class="item-title">상품 상세 설명</p>
                <textarea rows="15" cols="106" class="post-content" name="postContent"
                    placeholder="상품에 대한 상세 정보를 작성해주세요."
                    style="resize: none"></textarea>
            </div>

            <div class="button-area">
                <button type="" id="cancelBtn">등록취소</button>
                <button id="enrollBtn">상품등록</button>
            </div>
        </section>

    </main>
    
    <!-- <div id="topBtn" class="view-hidden">
        <i class="fa-sharp fa-solid fa-arrow-up"></i>
    </div> -->

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    
</body>

</html>