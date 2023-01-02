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
    <link rel="stylesheet" href="/resources/css/header.css" />
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

                <input type="radio" id="categoryAll" name="notifyCategory"> 
                <label for="categoryAll" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-rectangle-list"></i>
                  </div>
                  <div class=category-name>
                    전체
                  </div>
                </label>

                <input type="radio" id="categoryProduct" name="notifyCategory"> 
                <label for="categoryProduct" class="category-item">
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

                <input type="radio" id="categoryAsk" name="notifyCategory"> 
                <label for="categoryAsk" class="category-item">
                  <div class="category-img">
                    <i class="fa-solid fa-circle-question"></i>
                  </div>
                  <div class=category-name>
                    문의
                  </div>
                </label>

            </div>

            <div class="notify-view-area">
              
              <!-- <div class="notify-box">
                <i class="fa-solid fa-message"></i>
                <i class="fa-solid fa-box"></i>
                <i class="fa-solid fa-comment"></i>
                <i class="fa-solid fa-comments"></i>
                <i class="fa-solid fa-envelope-open-text"></i>
                <i class="fa-solid fa-pen"></i>
                <i class="fa-solid fa-circle-exclamation"></i>
              </div> -->

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-box"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    고구마맛 감자채볶음
                  </div>
                  <div class="notify-detail-mention">
                    상품을 받으셨나요?<br>구매 확정 버튼을 눌러주시면 판매자에게 도움이 됩니다!
                  </div>
                </div>
                <div class="notify-date">
                  2022-11-11
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-envelope-open-text"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    당도가 높고 신선하며 효능이 많고 집에서 직접 키워 믿을 수 있고
                    달고 맛있고 달고 맛있고 달고 맛있고 정말정말 맛이 좋아서 아무나 못 사먹는 
                    귀하디 귀한 사과
                  </div>
                  <div class="notify-detail-mention">
                    주문이 완료되었습니다.
                  </div>
                </div>
                <div class="notify-date">
                  1시간 전
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-pen"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    팀장 몰래 먹는 블루베리
                  </div>
                  <div class="notify-detail-mention">
                    후기를 작성해주시면 다른 이용자에게 도움이 됩니다!
                  </div>
                </div>
                <div class="notify-date">
                  오전 01:32
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-comment"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    아침 메뉴로 밥 vs 빵
                  </div>
                  <div class="notify-detail-mention">
                    내가 작성한 게시글에 댓글이 달렸습니다.
                  </div>
                </div>
                <div class="notify-date">
                  오전 05:32
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-comments"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    아침 메뉴로 밥 vs 빵
                  </div>
                  <div class="notify-detail-mention">
                    내가 작성한 댓글에 대댓글이 달렸습니다.
                  </div>
                </div>
                <div class="notify-date">
                  오전 05:32
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-circle-exclamation"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    신고를 남발하는 유저 조치 문의
                  </div>
                  <div class="notify-detail-mention">
                    문의에 답변이 등록되었습니다.
                  </div>
                </div>
                <div class="notify-date">
                  오전 05:32
                </div>
              </div>

              <div class="notify-box">
                <div class="notify-type-icon">
                  <i class="fa-solid fa-message"></i>
                </div>
                <div class="notify-label">
                  <div class="notify-content">
                    확인하지 않은 채팅이 32건 있습니다.
                  </div>
                  <div class="notify-detail-mention">
                    지금 바로 확인해보세요.
                  </div>
                </div>
                <div class="notify-date">
                  오전 05:32
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>


    <!-- https://github.com/sockjs/sockjs-client -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <script src="/resources/js/notify/notifyCenter.js"> </script>


  </body>

</html>
