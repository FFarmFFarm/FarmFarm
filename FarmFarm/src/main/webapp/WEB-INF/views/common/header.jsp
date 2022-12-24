<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


    <div class="header-container">
      <header>
        <div class="home-logo">
          <a href="/">
            <img src="/resources/images/mainLogo.png" />
          </a>
        </div>

        <div class="header-widget-area">
          <!-- 로그인O 상태 -->
          <c:choose>
            <c:when test="${not empty sessionScope.loginMember}">
              <ul class="widget-list">
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
                        <i class="fa-solid fa-user header-icon" id="profilePhoto"></i>
                      </span>
                      <!-- <span>
                        <img src="/resources/images/member/farmer.png" class="login-profile-img">
                      </span> -->
                      <i class="fa-solid fa-caret-down caret-icon" id="triangleIcon"></i>
                    </button>
                    <div id="myDropdown" class="dropdown-content">
                      <c:choose>
                        <c:when test="${loginMember.authority == 1}">
                          <a href="/seller">판매자페이지</a>
                        </c:when>
                        <c:when test="${loginMember.authority == 2}">
                          <a href="/admin">관리자</a>
                        </c:when>
                        <c:otherwise>
                          <a href="/myPage">마이페이지</a>
                        </c:otherwise>
                      </c:choose>
                      <a href="/logout">로그아웃</a>
                    </div>
                  </div>
                </li>
              </ul>
            </c:when>
          
            <%-- 로그인X 상태 --%>
            <c:otherwise>
              <div class="login-list">
                <div class="login-item"><a href="/login">로그인</a></div>
                <span>|</span>
                <div class="login-item"><a href="/signUpStart">회원가입</a></div>
              </div>
            </c:otherwise>
        </c:choose>
        </div>
      </header>

      <nav>
        <div class="nav-head">
          <div class="nav-body">
            <div class="nav-list"><a href="/product/list">팜팜마켓</a></div>
            <div class="nav-list"><a href="/post/list">사고팔고</a></div>
            <div class="nav-list"><a href="/board/${1}">커뮤니티</a></div>
            <div class="nav-list"><a href="/testPage/4">문의게시판</a></div>

          </div>
        </div>
      </nav>
    </div>
    
    <script>
      // 프로필 드롭다운
      const dropbtn = document.querySelector('.dropbtn');
      if(dropbtn != null) {

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

      }


      //const dd = document.querySelectorAll(".dropdown, #myDropdown, #myDropdown *");

      window.addEventListener('click', e => {
        // console.log(e.target);
        const myDropdown = document.querySelector('.dropdown-content');
        if(myDropdown != null) {

          if(myDropdown.style.display == 'block' &&
            !e.target.matches(".dropdown, .dropdown *, #myDropdown, #myDropdown *")){
            
            const icon = document.querySelector('.caret-icon');
            const myDropdown = document.querySelector('.dropdown-content');
            
            myDropdown.style.display = '';
            icon.style.transform = 'perspective(500px) rotateX(360deg)';
          }

        }
      });

      // 알림 드롭다운
      const dropbtn1 = document.querySelector('.dropbtn1');
      if(dropbtn1 != null) {

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
      }

    </script>