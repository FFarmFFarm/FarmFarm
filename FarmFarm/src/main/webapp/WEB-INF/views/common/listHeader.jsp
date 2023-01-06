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
                      <div class="notice">
                        <p>알림</p><a id="notifyListBtn" href="/notify/center">더보기</a>
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

      // // 알림 드롭다운
      // const dropbtn1 = document.querySelector('.dropbtn1');
      // if(dropbtn1 != null) {

      //   dropbtn1.addEventListener('click', () => {
      //     const myDropdown1 = document.querySelector('.dropdown-message');
  
      //     if (
      //       myDropdown1.style.display == 'none' ||
      //       myDropdown1.style.display == ''
      //     ) {
      //       myDropdown1.style.display = 'block';
      //     } else {
      //       myDropdown1.style.display = 'none';
      //     }
      //   });
  
      //   dropbtn1.addEventListener('blur', () => {
      //     const myDropdown1 = document.querySelector('.dropdown-message');
  
      //     myDropdown1.style.display = '';
      //   });
      // }

      // 알림 드롭다운
      const dropbtn1 = document.querySelector('.dropbtn1');
      if (dropbtn1 != null) {

        dropbtn1.addEventListener('click', () => {
          const myDropdown1 = document.querySelector('.dropdown-message');

          if (
            myDropdown1.style.display == 'none' ||
            myDropdown1.style.display == ''
          ) {

            axios.post('/notify/widget/list' // 연결
            ).then(function (response) {

              if (response.data != undefined) { // 받아온 데이터가 있을 때에만 실행

                const notifyDropdown = document.getElementById('notifyDropdown');

                notifyDropdown.innerHTML = '';

                const notifyList = response.data.notifyList;

                // 반복문 숫자
                let iteratorFl = 0;

                for (let notify of notifyList) {

                  // 반복 횟수 제한 : 6회
                  if (iteratorFl == 6) break;
                  else iteratorFl += 1;

                  // 1. 재료 준비
                  const notifyWidgetBox = document.createElement('div');

                  const notifyWidgetIcon = document.createElement('div');

                  const notifyWidgetMain = document.createElement('div');

                  const notifyWidgetHeader = document.createElement('div');
                  const notifyWidgetTitle = document.createElement('div');
                  const notifyWidgetDate = document.createElement('div');
                  const notifyWidgetDelBtn = document.createElement('div');

                  const notifyWidgetContent = document.createElement('div');

                  // 2. 재료 손질
                  packUpElement(notifyWidgetBox, 'notify-widget-box', null);

                  // 알림 유형 아이콘
                  let icon;
                  switch (notify.notifyTypeNo) {
                    case 201: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
                    case 202: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
                  }

                  packUpElement(notifyWidgetIcon, 'notify-widget-icon', icon);

                  packUpElement(notifyWidgetMain, 'notify-widget-main', null);
                  packUpElement(notifyWidgetHeader, 'notify-widget-header', null);


                  // 알림 유형 제목(단축버전)
                  let title;

                  // switch (notify.notifyTypeNo) {
                  //   case 201: title = '댓글 알림'; break;
                  //   case 202: title = '댓글 알림'; break;
                  // }

                  // packupElement(notifyWidgetTitle, 'notify-widget-title', title);
                  packUpElement(notifyWidgetTitle, 'notify-widget-title', notify.notifyTitle);

                  // 알림 시간
                  packUpElement(notifyWidgetDate, 'notify-widget-date', notify.notifyDate);

                  // 알림 삭제 버튼
                  packUpElement(notifyWidgetDelBtn, 'notify-widget-delBtn', '<i class="fa-solid fa-xmark"></i>');

                  // 알림 내용
                  packUpElement(notifyWidgetContent, 'notify-widget-content', notify.notifyContent);

                  // 3. 조리
                  notifyWidgetHeader.append(notifyWidgetTitle, notifyWidgetDate, notifyWidgetDelBtn);
                  notifyWidgetMain.append(notifyWidgetHeader, notifyWidgetContent);
                  notifyWidgetBox.append(notifyWidgetIcon, notifyWidgetMain);

                  // 4. 플레이팅
                  notifyDropdown.append(notifyWidgetBox);
                }

              }

              myDropdown1.style.display = 'block';

            }).catch(function (error) {
              console.log(error)
            })

          } else {
            myDropdown1.style.display = 'none';
          }

        });

      }

      /* 외부 영역 클릭 시 클릭 해제 */
        const myDropdown11 = document.querySelector(".dropdown-message");
        if (myDropdown11 != null) {
          addEventListener('click', (e) => {
            const target = e.target;
            if (!document.getElementById('myDropdown1').contains(e.target)) {
              document.getElementById('myDropdown1').style.display = '';
            }
          })
        }

    </script>