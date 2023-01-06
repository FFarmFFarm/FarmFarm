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
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />

    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
</head>
<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 글쓰기</div>
        </section>
        <form action="/board/write" method="post" encType="multipart/form-data">
            <section class="board-category">
                <div class="board-category-area">
                    <span class="category">카테고리 선택</span>

                    <input type="radio" name="boardTypeNo" class="boardTypeNo" id="share" value="1">
                    <label class="categoryLabel" for="share">물물교환</label>

                    <input type="radio" name="boardTypeNo"  class="boardTypeNo" id="tip" value="2">
                    <label class="categoryLabel" for="tip">팁</label>

                    <input type="radio" name="boardTypeNo"  class="boardTypeNo" id="question" value="3">
                    <label class="categoryLabel" for="question">질문</label>

                    <input type="radio" name="boardTypeNo"  class="boardTypeNo" id="Cool" value="4">
                    <label class="categoryLabel" for="Cool">시원이꼬</label>

                </div>
                <button class="board-submit">게시하기</button>
            </section>

            <section class="board-write">

                <div class="write-title">
                    <span>제목 &nbsp; : </span>
                    <input type="text" class="input-write-title" name="boardTitle">
                </div>

                <textarea class="write-content" name="boardContent" spellcheck="false"></textarea>
                
                <div class="board-img-ex">이미지 첨부하기</div>
                <div class="board-img-area">

                    <div class="board-img">
                        <label for="img1">
                            <img class="board-preview" src="">
                            <p>사진추가</p>
                        </label>
                        <input type="file" class="board-input-img" id="img1" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img2">
                            <p>사진추가</p>
                            <img src="" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img2" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img3">
                            <img src="" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img3" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    <div class="board-img">
                        <label for="img4">
                            <img src="" class="board-preview">
                        </label>
                        <input type="file" class="board-input-img" id="img4" name="imgs" accept="img/*">
                        <span class="board-img-delete"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    
                    
                </div>
            </section>
        </form>
        <jsp:include page="/WEB-INF/views/common/modal/loginConfirm.jsp"/>
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
        loginMember = "${loginMember}"
        typeNo = ${boardTypeNo}
    </script>
    
    <script src="/resources/js/board/boardWrite.js"> </script>
</body>
</html>