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
                        <a href="">신팜팜님이 신고했습니다/resources</a>
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
                <i class="fa-solid fa-comment-dots"></i>
              </a>
              <!-- <div class="chat-count">21</div> -->
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
                                    <img src="/resources/images/member/farmer.png" class="login-profile-img">
                                </span> -->
                  <i
                    class="fa-solid fa-caret-down caret-icon"
                    id="triangleIcon"
                  ></i>
                </button>

                <div id="myDropdown" class="dropdown-content">
                  <a href="#">내프로필</a>
                  <a href="#">로그아웃</a>
                </div>
              </div>
            </li>
          </ul>

          <!-- 로그인X 상태 -->
          <!-- <ul class="login-list">
                    <li class="login-item"><a href="#">로그인</a></li>
                    <li class="login-item"><a href="#">회원가입</a></li>
                </ul> -->
        </div>
      </header>

      <nav>
        <div class="nav-head">
          <div class="nav-body">
            <div class="nav-list"><a href="#">팜팜마켓</a></div>
            <div class="nav-list"><a href="#">사고팔고</a></div>
            <div class="nav-list"><a href="#">커뮤니티</a></div>
            <div class="nav-list"><a href="#">문의게시판</a></div>
          </div>
        </div>
      </nav>
    </div>
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
      // const myDropdown1 = document.getElementById("myDropdown1");

      // function dropDown1(){
      //     myDropdown1.classList.toggle("show1");
      // };

      // window.onclick=function(e){
      //     if(!e.target.matches(".dropbtn, .dropbtn *")){

      //         if(myDropdown1.classList.contains("show1")){
      //             myDropdown1.classList.remove("show1");
      //         }
      //     }
      // };
    </script>

