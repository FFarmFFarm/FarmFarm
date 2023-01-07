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

    <link rel="stylesheet" href="/resources/css/productAdmin/enrollProduct-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <%-- <link rel="stylesheet" href="/resources/css/common/footer-style.css"> --%>
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/adminHeader.jsp' />

    <main>
        <jsp:include page='/WEB-INF/views/admin/adminNav.jsp' />
        <section class="enroll-section">
            <div class="page-title">
                <p>팜팜상품 등록</p>
            </div>

            <form action="/admin/enroll" method="POST" enctype="multipart/form-data"
            class="enroll-product" id="enrollproductForm">
                <div class="product-items category-item">
                    <p class="item-title">카테고리 설정</p> 
                    <div class="select-category">
                        <div class="category-headline">
                            <button type="button" id="category-btn">
                                <p>카테고리 선택</p>
                                <i class="fa-solid fa-caret-down select-icon"></i>
                            </button>
                            <div class="category-selected">
                                <p id="categoryName"></p>
                            </div>
                        </div>
                        <ul id="category-list">
                            <li><input type="radio" name="categoryNo" value="1" id="1">
                            <label for="1">모종</label></li>
                            <li><input type="radio" name="categoryNo" value="2" id="2">
                            <label for="2">흙</label></li>
                            <li><input type="radio" name="categoryNo" value="3" id='3'>
                            <label for="3">씨앗</label></li>
                            <li><input type="radio" name="categoryNo" value="4" id="4">
                            <label for="4">영양제</label></li>
                            <li><input type="radio" name="categoryNo" value="5" id='5'>
                            <label for="5">화분</label></li>
                            <li><input type="radio" name="categoryNo" value="6" id="6">
                            <label for="6">원예용품</label></li>
                            <li><input type="radio" name="categoryNo" value="7" id="7">
                            <label for="7">과일</label></li>
                            <li><input type="radio" name="categoryNo" value="8" id="8">
                            <label for="8">채소</label></li>
                            <li><input type="radio" name="categoryNo" value="9" id="9">
                            <label for="9">기타</label></li>
                        </ul>
                    </div>
                </div>

                <div class="product-items">
                    <p class="item-title">상품정보</p>
                    <ul class="product-info">
                        <li class="info-list">
                            <p>상품명</p>
                            <input type="text" name="productName" size="60" maxlength="30">
                        </li>
                        <li class="info-list">
                            <p>판매가격</p>
                            <input type="text" name="productPrice" placeholder=0>
                            <p>원</p>
                        </li>
                        <li class="info-list">
                            <p>최초 입고량</p>
                            <input type="number" name="productAmount" placeholder=0
                            onfocus="this.placeholder = ''">
                            <p>개</p>
                        </li>
                        <li class="info-list">
                            <p>대표이미지</p>
                            <div class="thumbnail">
                                <label for="img0">
                                    <img class="preview" src="">
                                    <i class="fa-solid fa-plus"></i>
                                </label>
                                <input type="file" name="productImage" class="thumbnail-img"
                                id="img0" accept="image/*">
                                <span class="delete-thumbnail">&times;</span>
                            </div>
                        </li>
                        <li class="info-list">
                            <p>상품이미지 1</p>
                            <input type="file" name="productImage" class="input-img"
                            id="img1" accept="image/*">
                            <span class="delete-img">&times;</span>
                        </li>
                        <li class="info-list">
                            <p>상품이미지 2</p>
                            <input type="file" name="productImage" class="input-img"
                            id="img2" accept="image/*">
                            <span class="delete-img">&times;</span>
                        </li>
                        <li class="info-list">
                            <p>상품이미지 3</p>
                            <input type="file" name="productImage" class="input-img"
                            id="img3" accept="image/*">
                            <span class="delete-img">&times;</span>
                        </li>
                        <li class="info-list">
                            <p>상품이미지 4</p>
                            <input type="file" name="productImage" class="input-img"
                            id="img4" accept="image/*">
                            <span class="delete-img">&times;</span>
                        </li>
                    </ul>
                </div>
                <div class="product-items">
                    <p class="item-title">상품 설명</p>
                    <textarea rows="5" cols="111" class="product-message" name="productMessage"
                        placeholder="상품에 대한 정보를 간략히 작성해주세요."
                        style="resize: none"></textarea>
                </div>

                <div class="button-area">
                    <button type="reset" id="cancelBtn">등록취소</button>
                    <button type="submit" id="enrollBtn">상품등록</button>
                </div>
            </form>
        </section>

    </main>

    <!-- footer -->
    <%-- <jsp:include page='/WEB-INF/views/common/footer.jsp' /> --%>

    <script src="/resources/js/productAdmin/enrollProduct.js"></script>

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