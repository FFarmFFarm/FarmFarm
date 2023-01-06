
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>팜팜 | 알림센터</title>
    <link rel="stylesheet" href="/resources/css/common/header-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css" />
    <link rel="stylesheet" href="/resources/css/notify/notifyCenter-style.css" />
    <script src="https://kit.fontawesome.com/591746f9e8.js" crossorigin="anonymous"></script>
  </head>

  <body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main>
      <jsp:include page="/WEB-INF/views/myPage/myPage.jsp"/>

      <section class="list-container">
        <jsp:include page="/WEB-INF/views/myPage/myPageNav.jsp"/>

        <div class="notify-list">
          <span class="notify-list-title">
            <i class="fa-solid fa-bell"></i>
            &nbsp;
            알림 센터
          </span>

          <div class="notify-list-body">

            <div class="notify-category">

                <input type="radio" id="categoryAll" name="notifyCategory" checked> 
                <label for="categoryAll" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-rectangle-list"></i>
                  </div>
                  <div class=category-name>
                    전체
                  </div>
                </label>

                <input type="radio" id="categoryShop" name="notifyCategory"> 
                <label for="categoryShop" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div class=category-name>
                    상품
                  </div>
                </label>

                <input type="radio" id="categoryBoard" name="notifyCategory"> 
                <label for="categoryBoard" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-note-sticky"></i>
                  </div>
                  <div class=category-name>
                    게시판
                  </div>
                </label>

                <input type="radio" id="categoryChat" name="notifyCategory"> 
                <label for="categoryChat" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-message"></i>
                  </div>
                  <div class=category-name>
                    채팅
                  </div>
                </label>

                <input type="radio" id="categoryInquiry" name="notifyCategory"> 
                <label for="categoryInquiry" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-circle-question"></i>
                  </div>
                  <div class=category-name>
                    문의
                  </div>
                </label>

            </div>

            <div class="notify-view-area">

              <!-- 알림 하나 notify-box가 들어가는 영역입니다. -->
   
            </div> <!-- end notify-view-area -->

          </div> <!-- end notify-list-body -->
        </div> <!-- end notify-list -->
      </section> <!-- end list-container -->

    </main>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <!-- https://github.com/sockjs/sockjs-client -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="/resources/js/notify/notifyCenter.js"> </script>


  </body>

</html>
