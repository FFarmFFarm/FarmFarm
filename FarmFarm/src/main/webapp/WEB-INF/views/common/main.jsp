<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FarmFarm</title>
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/main-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <script src="https://kit.fontawesome.com/1ce4f19a7a.js" crossorigin="anonymous"></script>
    
    <!-- swiper -->
    <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>

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
                <div class="nav-list"><a href="/product/list">팜팜마켓</a></div>
                <div class="nav-list"><a href="/post/list">사고팔고</a></div>
                <div class="nav-list"><a href="/board/${1}">커뮤니티</a></div>
                <div class="nav-list"><a href="/recipe">레시피</a></div>
              </div>
            </div>
        </nav>

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

    </div>
    <main>
        <div class="swiper-container first">
            <div class="main-wrap swiper-wrapper">
                <div class="main-background swiper-slide">
                    <img src="resources/images/main/bg2.png">
                </div>
                <div class="main-background swiper-slide">
                    <img src="resources/images/main/farm.png">
                </div>
                <div class="main-background swiper-slide">
                    <img src="resources/images/main/ss.png">
                </div>
            </div>
            <div class="swiper-pagination"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        
      <h3 class="middle-product-title">딱! 오늘만 팜팜마켓 특가 상품</h3>
            <div class="middle-product">
              <div class="middle-wrap ">
                <c:forEach items="${productMap}" var="map" begin="0" end="3" step="1" >
                    <c:if test="${map.soldoutFl.equals('N')}">
                        <a href="/product/${map.productNo}" class="middle-a">
                            <div class="middle-cover"><img src="${map.thumbnailImg}"></div>
                            <div class="middle-text-wrap">
                                <div class="middle-text">
                                    <p>${map.productName}</p>
                                    <p> ${map.productPrice}원</p>
                                </div>
                                <div class="middle-icon">
                                <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
                                </div>
                            </div>  
                        </a>
                    </c:if>
                </c:forEach>
             </div>
            </div>
      <!-- <div class="mypage">
        <a href="/member/myPage">마이페이지</a>
        <a href="/product/1">상품상세조회</a>
        <a href="/post/detail">게시글상세조회</a>
      </div> -->

      <div class="ad-wrap">
        <div class="ad-img">
            <img src="resources/images/main/duck.png">
        </div>
      </div>


      <h3 class="product-title">우리 농장에서는 이런 물건을 팔아요</h3>
      <div class="product-wrap">
            <c:forEach items="${postMap}" var="post" begin="0" end="3" step="1" >
            <a href="/post/${post.postNo}">
                <c:if test="${post.postSoldoutFl==0}">
                    <div class="product">
                        <div class="product-img">
                            <c:if test="${!empty post.thumbnailImg}">
                                <img src="${post.thumbnailImg}">
                            </c:if>
                            <c:if test="${empty post.thumbnailImg}">
                                <img src="/resources/images/logo-square.png">
                            </c:if>
                        </div>
                        <div class="product-text">
                            <p>${post.postTitle}</p>
                            <p>${post.unitPrice}원</p>
                        </div>
                    </div>
                </c:if>
            </a>
        </c:forEach>
        </div>


      <div class="cooking-part">
        <div class="cooking-text">
          <p>와글와글에서 더 건강하게 즐겨요!</p>
          <p>팜팜에서 구매한 상품들을 자기만의 레시피로 요리하고 회원들과 공유해보세요.</p>
        </div>
        <div class="cooking-img">
          <img src="resources/images/main/re.jpg">
        </div>
        <div class="cooking-a">
          <a href="/recipe">
            <div class="cooking">
              <p>레시피 보러가기 </p>
              <i class="fa-solid fa-arrow-right cooking-arrow"></i>
            </div>
          </a>
        </div>
      </div>

      <div class="ad-wrap">
        <div class="ad-img">
            <img src="resources/images/main/animal.png">
        </div>
      </div>

    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/> 
    
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>
    
    <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ="
    crossorigin="anonymous"></script>
    <script>
      var swiper = new Swiper('.first', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation : { // 네비게이션 설정
            nextEl : '.swiper-button-next', // 다음 버튼 클래스명
            prevEl : '.swiper-button-prev', // 이번 버튼 클래스명
	    }
      })

      var swiper = new Swiper('.second', {
        loop: true,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation : { // 네비게이션 설정
            nextEl : '.swiper-button-next', // 다음 버튼 클래스명
            prevEl : '.swiper-button-prev', // 이번 버튼 클래스명
	    }
      })

      const loginMember = "${loginMember}"

      if(loginMember){
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
  
        //const dd = document.querySelectorAll(".dropdown, #myDropdown, #myDropdown *");
  
        window.addEventListener('click', e => {
          console.log(e.target);
          const myDropdown = document.querySelector('.dropdown-content');
  
          if(myDropdown.style.display == 'block' &&
            !e.target.matches(".dropdown, .dropdown *, #myDropdown, #myDropdown *")){
            
            const icon = document.querySelector('.caret-icon');
            const myDropdown = document.querySelector('.dropdown-content');
            
            myDropdown.style.display = '';
            icon.style.transform = 'perspective(500px) rotateX(360deg)';
          }
        });
  
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
                      case 101: icon = '<i class="fa-solid fa-message"></i>'; break;
                      case 201: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
                      case 202: icon = '<i class="fa-solid fa-comment-dots"></i>'; break;
                      case 301: icon = '<i class="fa-solid fa-envelope-open-text"></i>'; break;
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

                    // packUpElement(notifyWidgetTitle, 'notify-widget-title', title);
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

        };
        
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

      }

    </script>
  </body>
</html>
