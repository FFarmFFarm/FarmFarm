<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>와글와글 글쓰기</title>
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/resources/css/board/boardWrite-style.css">
    <link rel="stylesheet" href="/resources/css/board/boardUpdate-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 수정하기</div>
        </section>

        <form action="/board/${boardTypeNo}/${board.boardNo}/update" method="post" encType="multipart/form-data">
            <section class="board-nav">
                <div class="board-nav-area">
                    <span id="type1">물물교환</span>
                    <span id="type2">팁</span>
                    <span id="type3">질문</span>
                <button class="board-update">수정하기</button>
                </div>
            </section>

            <section class="board-write">

                <%-- 제목 --%>
                <div class="write-title">
                    <span>제목 &nbsp; : </span>
                    <input type="text" class="input-write-title" name="boardTitle" value="${board.boardTitle}">
                </div>

                <%-- 내용 --%>
                <textarea class="write-content" name="boardContent">${board.boardContent}</textarea>
                
                <div class="board-img-ex">이미지 첨부하기</div>
                <div class="board-img-area">

                    <c:forEach var="img" items="${board.imgList}">
                        <c:choose>
                            <c:when test="${img.boardImgOrder == 0}">
                                <c:set var="img1" value="${img.boardImgAddress}"/>
                            </c:when>
                            <c:when test="${img.boardImgOrder == 1}">
                                <c:set var="img2" value="${img.boardImgAddress}"/>
                            </c:when>
                            <c:when test="${img.boardImgOrder == 2}">
                                <c:set var="img3" value="${img.boardImgAddress}"/>
                            </c:when>
                            <c:when test="${img.boardImgOrder == 3}">
                                <c:set var="img4" value="${img.boardImgAddress}"/>
                            </c:when>
                        </c:choose>
                    </c:forEach>

                    <div class="board-img">
                        <label for="img1">
                            <img src="${img1}" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img1" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img2">
                            <img src="${img2}" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img2" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img3">
                            <img src="${img3}" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img3" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img4">
                            <img src="${img4}" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img4" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                </div>
            </section>
            
            <%-- 삭제 될 이미지를 저장해봅시다~ --%>
            <input type="hidden" name="deleteImgList" id="deleteImgList" value="">
                    
            <%-- 수정 후 리다이렉트를 위해 cp를 저장해볼까요? --%>
            <input type="hidden" name="cp" value="${param.cp}">
        </form>
    </main>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <c:if test="${!empty message}">
        <script>
            alert("${message}")
        </script>

        <%-- message 1회 출력 후 모든 scope에서 삭제 --%>
        <c:remove var="message"/>
    </c:if>

    <script>
        const boardTypeNo  = ${boardTypeNo};
    </script>
    
    <script src="/resources/js/board/boardUpdate.js"> </script>
</body>
</html>