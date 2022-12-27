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
                <p>상품 수정</p>
            </div>

            <form action="/post/${post.postNo}/update" method="POST" enctype="multipart/form-data"
            class="enroll-post" id="enrollPostForm">
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
                            <li><input type="radio" name="categoryNo" value="701" id="701">
                            <label for="701">사과/배</label></li>
                            <li><input type="radio" name="categoryNo" value="702" id="702">
                            <label for="702">토마토/방울토마토</label></li>
                            <li><input type="radio" name="categoryNo" value="703" id='703'>
                            <label for="703">딸기/블루베리</label></li>
                            <li><input type="radio" name="categoryNo" value="704" id="704">
                            <label for="704">감/귤</label></li>
                            <li><input type="radio" name="categoryNo" value="705" id='705'>
                            <label for="705">포도/복숭아</label></li>
                            <li><input type="radio" name="categoryNo" value="706" id="706">
                            <label for="706">수박/참외</label></li>
                            <li><input type="radio" name="categoryNo" value="707" id="707">
                            <label for="707">키위/참다래</label></li>
                            <li><input type="radio" name="categoryNo" value="708" id="708">
                            <label for="708">매실</label></li>
                            <li><input type="radio" name="categoryNo" value="801" id="801">
                            <label for="801">상추/깻잎/양상추</label></li>
                            <li><input type="radio" name="categoryNo" value="802" id="802">
                            <label for="802">고추/피망</label></li>
                            <li><input type="radio" name="categoryNo" value="803" id="803">
                            <label for="803">배추/양배추/무</label></li>
                            <li><input type="radio" name="categoryNo" value="804" id="804">
                            <label for="804">갓/시금치/치커리</label></li>
                            <li><input type="radio" name="categoryNo" value="805" id="805">
                            <label for="805">오이/가지/옥수수</label></li>
                            <li><input type="radio" name="categoryNo" value="806" id="806">
                            <label for="806">감자/고구마/당근</label></li>
                            <li><input type="radio" name="categoryNo" value="807" id="807">
                            <label for="807">버섯류</label></li>
                            <li><input type="radio" name="categoryNo" value="808" id="808">
                            <label for="808">콩</label></li>
                            <li><input type="radio" name="categoryNo" value="809" id="809">
                            <label for="809">양파/마늘/생강/파</label></li>
                            <li><input type="radio" name="categoryNo" value="901" id="901">
                            <label for="901">기타</label></li>
                        </ul>
                    </div>
                </div>

                <c:forEach items="${post.imgList}" var="img">
                    <c:choose>
                        <c:when test="${img.postImgOrder==0}">
                            <c:set var="thumbnail" value="${img.postImgAddress}"/>
                        </c:when>
                        <c:when test="${img.postImgOrder==1}">
                            <c:set var="img1" value="${img.postImgAddress}"/>
                        </c:when>
                        <c:when test="${img.postImgOrder==2}">
                            <c:set var="img2" value="${img.postImgAddress}"/>
                        </c:when>
                        <c:when test="${img.postImgOrder==3}">
                            <c:set var="img3" value="${img.postImgAddress}"/>
                        </c:when>
                        <c:when test="${img.postImgOrder==4}">
                            <c:set var="img4" value="${img.postImgAddress}"/>
                        </c:when>
                    </c:choose>
                </c:forEach>
                
                <div class="product-items">
                    <p class="item-title">상품정보</p>
                    <ul class="post-info">
                        <li class="info-list">
                            <p>상품명</p>
                            <input type="text" name="postTitle" size="60" maxlength="20"
                            value="${post.postTitle}">
                        </li>
                        <li class="info-list">
                            <p>판매가격</p>
                            <input type="text" name="unitPrice" 
                            value="${post.unitPrice}"
                            placeholder=0
                            onfocus="this.placeholder = ''">
                            <p>원</p>
                        </li>
                        <li class="info-list">
                            <p>생산일</p>
                            <input type="date" name="openDate" value="${post.openDate}">
                        </li>
                        <li class="info-list">
                            <p>대표이미지</p>
                            <div class="post-img thumbnail">
                                <label for="img0">
                                    <img class="preview thumbnail-preview" src="${thumbnail}">
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
                                        <img class="preview" src="${img1}" >
                                        <c:if test="${img1 == null}">
                                            <p>사진추가</p>
                                        </c:if>
                                    </label>
                                    <input type="file" name="postImg" class="input-img"
                                    id="img1" accept="image/*">
                                    <span class="delete-img">&times;</span>
                                </div>
                                <div class="post-img">
                                    <label for="img2">
                                        <img class="preview" src="${img2}">
                                        <c:if test="${img2 == null}">
                                            <p>사진추가</p>
                                        </c:if>
                                    </label>
                                    <input type="file" name="postImg" class="input-img"
                                    id="img2" accept="image/*">
                                    <span class="delete-img">&times;</span>
                                </div>
                                <div class="post-img">
                                    <label for="img3">
                                        <img class="preview" src="${img3}">
                                        <c:if test="${img3 == null}">
                                            <p>사진추가</p>
                                        </c:if>
                                    </label>
                                    <input type="file" name="postImg" class="input-img"
                                    id="img3" accept="image/*">
                                    <span class="delete-img">&times;</span>
                                </div>
                                <div class="post-img">
                                    <label for="img4">
                                        <img class="preview" src="${img4}">
                                        <c:if test="${img4 == null}">
                                            <p>사진추가</p>
                                        </c:if>
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
                    <textarea rows="15" cols="111" class="post-content" name="postContent"
                        placeholder="상품에 대한 상세 정보를 작성해주세요."
                        style="resize: none"
                        >${post.postContent}</textarea>
                </div>

                <div class="button-area">
                    <button type="button" id="cancelBtn">등록취소</button>
                    <button type="submit" id="enrollBtn">상품수정</button>
                </div>

                <input type="hidden" name="deleteList" id="deleteList" value="">
                <input type="hidden" name="cp" value="${param.cp}">
                <input type="hidden" name="memberNo" value="${post.memberNo}">
            </form>
        </section>

    </main>

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />

    <script>
        const categoryNo="${post.categoryNo}";
    </script>
    <script src="/resources/js/seller/updatePost.js"></script>


    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

</body>

</html>