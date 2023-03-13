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
                    
                    <div class="notifyWidget-red-dot red-dot"></div> <!-- notify-widget에 있음 -->
                    <div id="myDropdown1" class="dropdown-message">
                      <div class="notice">
                        <p>알림</p><a id="notifyListBtn" href="/myPage/notify">더보기</a>
                      </div>

                      <!-- 알림 위젯 -->
                      <jsp:include page="/WEB-INF/views/notify/notifyWidget.jsp" />

                    </div>
                  </div>
                </li>
                <li class="widget-item">
                  <a href="/cart">
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
                          <a href="/seller/${loginMember.memberNo}">판매자페이지</a>
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
            <div class="nav-list"><a href="/boards/${1}">커뮤니티</a></div>
            <div class="nav-list"><a href="/recipe">레시피</a></div>

            <!-- nav custom -->
            <div class="nav-list view-hidden" id="navSearchBar">

              <input id="navSearchInput" class="keyword" placeholder="검색어 입력">
              <div id='navCleanBtn' class='reset-search'>
                  <i class="fa-solid fa-circle-xmark"></i>
              </div>
              <button class="search-btn">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>

            </div>

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



    </script>