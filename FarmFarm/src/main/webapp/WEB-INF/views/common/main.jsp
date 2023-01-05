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
        <div class="swiper-container">
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
        
      <h3 class="middle-product-title">딱! 오늘만 특가 상품</h3>
      <div class="middle-product">
        <div class="middle-wrap">
          <%-- <div class="middle-cover"><img src="resources/images/product/detail/20221230143348_60504.jpg"></div> --%>
          <div class="middle-cover"><img src="resources/images/product/detail/chipmunk.jpg"></div>
          <a href="#">
            <div class="middle-text-wrap">
              <div class="middle-text">
                <p>함께 하면 귀여운... </p>
                <p>12,000,000원</p>
              </div>
              <div class="middle-icon">
                <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>  
          </a>
        </div>

        <div class="middle-wrap">
          <%-- <div class="middle-cover"><img src="resources/images/product/detail/20221230142911_36173.jpeg"></div> --%>
          <div class="middle-cover"><img src="resources/images/product/detail/lion.jpg"></div>
          <a href="#">
            <div class="middle-text-wrap">
              <div class="middle-text">
                <p>사바나 일꾼 심...</p>
                <p>20,000원</p>
              </div>
              <div class="middle-icon">
                <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </a>
        </div>

        <div class="middle-wrap">
          <div class="middle-cover"><img src="resources/images/product/detail/alpaca.jpg"></div>
          <a href="#">
            <div class="middle-text-wrap">
              <div class="middle-text">
                <p>실한 일꾼 알파...</p>
                <p>1,000,000원</p>
              </div>
              <div class="middle-icon">
                <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
              </div>
            </div>
          </a>
        </div>

        <div class="middle-wrap">
          <div class="middle-cover"><img src="resources/images/product/detail/hedgehog.jpg"></div>
          <a href="#">
            <div class="middle-text-wrap">
                <div class="middle-text">
                  <p>일꾼 고씨</p>
                  <p>15,000원</p>
                </div>
                <div class="middle-icon">
                  <div class="arrow"><i class="fa-solid fa-arrow-right"></i></div>
                </div>
            </div>
          </a>
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


      <h3 class="product-title">BEST 상품</h3>
      <div class="product-wrap">
        <a href="/">
            <div class="product">
                <div class="product-img">
                    <img src="resources/images/product/detail/hedgehog.jpg">
                </div>
                <div class="product-text">
                    <p>[특가] 고소한 고슴도치 가시 50gX2봉</p>
                    <p>42,000원</p>
                </div>
            </div>
        </a>
        <a href="/">
            <div class="product">
                <div class="product-img">
                    <img src="resources/images/main/gireffe.jpg">
                </div>
                <div class="product-text">
                    <p>[할인] 기린이 먹다 뱉은 풀때기 1kg</p>
                    <p>16,000원</p>
                </div>
            </div>
        </a>
        <a href="/">
            <div class="product">
                <div class="product-img">
                    <img src="resources/images/main/squirrel.jpg">
                </div>
                <div class="product-text">
                    <p>[할인] 다람쥐가 까준 도토리 2kg</p>
                    <p>22,900원</p>
                </div>
            </div>
        </a>
        <a href="/">
            <div class="product">
                <div class="product-img">
                    <img src="resources/images/main/kang.jpg">
                </div>
                <div class="product-text">
                    <p>[특가] 캥거루가 다진 마늘 500g</p>
                    <p>9,900원</p>
                </div>
            </div>
        </a>
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
          <a href="/board/${1}">
            <div class="cooking">
              <p>와글와글로 이동 </p>
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
      var swiper = new Swiper('.swiper-container', {
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
  </body>
</html>
