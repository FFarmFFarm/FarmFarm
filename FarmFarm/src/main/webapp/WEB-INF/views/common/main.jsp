<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FarmFarm</title>

    <link rel="stylesheet" href="/resources/css/common/main-style.css" />
    
    <script
      src="https://kit.fontawesome.com/1ce4f19a7a.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="header-container">
      <header>
        <div class="home-logo">
          <a href="/">
            <img src="/resources/images/mainLogo.png" />
          </a>
        </div>

        <nav>
            <div class="nav-head">
              <div class="nav-body">
                <div class="nav-list"><a href="#">팜팜마켓</a></div>
                <div class="nav-list"><a href="#">사고팔고</a></div>
                <div class="nav-list"><a href="/board">커뮤니티</a></div>
                <div class="nav-list"><a href="#">문의게시판</a></div>
              </div>
            </div>
        </nav>

        <div class="header-widget-area">
          <!-- 로그인O 상태 -->
          <%-- <ul class="widget-list">
            <li class="widget-item">
              <div class="dropdown">
                <button type="button" class="dropbtn1">
                  <i class="fa-solid fa-bell header-icon"></i>
                </button>

                <div id="myDropdown1" class="dropdown-message">
                  <div class="notice"><p>알림</p></div>
                  <ul>
                    <li>
                      <div class="message-box">
                        <a href="">배송이 시작되었습니다.</a>
                      </div>
                    </li>
                    <li>
                      <div class="message-box">
                        <a href="">辛팜팜님이 신고했습니다..</a>
                      </div>
                    </li>
                    <li>
                      <div class="message-box">
                        <a href="">정팜팜님이 신고를 거부하셨습니다.</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="widget-item">
              <a href="#">
                <i class="fa-solid fa-cart-shopping"></i>
              </a>
            </li>
            <li class="widget-item">
              <div class="dropdown">
                <button type="button" class="dropbtn">
                  <span>
                    <i
                      class="fa-solid fa-user header-icon"
                      id="profilePhoto"
                    ></i>
                  </span>
                  <!-- <span>
                                    <img src="../images/member/farmer.png" class="login-profile-img">
                                </span> -->
                  <i
                    class="fa-solid fa-caret-down caret-icon"
                    id="triangleIcon"
                  ></i>
                </button>

                <div id="myDropdown" class="dropdown-content">
                  <a href="#">마이페이지</a>
                  <a href="#">로그아웃</a>
                </div>
              </div>
            </li>
          </ul> --%>

          <!-- 로그인X 상태 -->
          <div class="login-list">
            <div class="login-item"><a href="/login">로그인</a></div>
            <span>|</span>
            <div class="login-item"><a href="/signUpStart">회원가입</a></div>
          </div>

        </div>
      </header>

      <main>
        <div class="main-background">
          <img src="resources/images/main/bg2.jpg">
        </div>
        <div>
          <div class="middle-product">
            <img src="">
            <div>
              <p>아오리 사과 1kg</p>
              <p>5000원</p>
            </div>
            <div></div>
          </div>

        </div>
        <div class="mypage">
          <a href="/member/myPage">마이페이지</a>
          <a href="/product/1">상품상세조회</a>
          <a href="/post/detail">게시글상세조회</a>
          <button id="reportBtn">님신고</button>  <!-- 밑에 js도 있습니다.(report-modal) -->
        </div>
      </main>
    </div>

    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/> 
    
    <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 

    <script>
      // 프로필 드롭다운
      const dropbtn = document.querySelector('.dropbtn');
      dropbtn.addEventListener('click', () => {
        const icon = document.querySelector('.caret-icon');
        const myDropdown = document.querySelector('.dropdown-content');

        if (
          myDropdown.style.display == 'none' ||
          myDropdown.style.display == ''
        ) {
          icon.style.transform = 'perspective(500px) rotateX(180deg)';
          myDropdown.style.display = 'block';
        } else {
          icon.style.transform = 'perspective(500px) rotateX(360deg)';
          myDropdown.style.display = 'none';
        }
      });

      dropbtn.addEventListener('blur', () => {
        const icon = document.querySelector('.caret-icon');
        const myDropdown = document.querySelector('.dropdown-content');

        myDropdown.style.display = '';
        icon.style.transform = 'perspective(500px) rotateX(360deg)';
      });

      // 알림 드롭다운
      const dropbtn1 = document.querySelector('.dropbtn1');
      dropbtn1.addEventListener('click', () => {
        const myDropdown1 = document.querySelector('.dropdown-message');

        if (
          myDropdown1.style.display == 'none' ||
          myDropdown1.style.display == ''
        ) {
          myDropdown1.style.display = 'block';
        } else {
          myDropdown1.style.display = 'none';
        }
      });

      dropbtn1.addEventListener('blur', () => {
        const myDropdown1 = document.querySelector('.dropdown-message');

        myDropdown1.style.display = '';
      });

    </script>
  </body>
</html>
