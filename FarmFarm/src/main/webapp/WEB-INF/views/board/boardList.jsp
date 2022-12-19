<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>와글와글 커뮤니티</title>
    <script src="https://kit.fontawesome.com/345198b845.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/css/board/boardList-style.css">
    <link rel="stylesheet" href="/css/header.css">
</head>
<body>
    

    <div class="header-container">
        <header>
            <div class="home-logo">
                <a href="/">
                    <img src="/images/mainLogo.png">
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
                                            <a href="">신팜팜님이 신고했습니다..</a>
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
                                    <i class="fa-solid fa-user header-icon" id="profilePhoto"></i>
                                </span>
                                <!-- <span>
                                    <img src="../images/member/farmer.png" class="login-profile-img">
                                </span> -->
                                <i class="fa-solid fa-caret-down caret-icon" id="triangleIcon"></i>
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
                    <div class="nav-list"><a href="#">홈</a></div>
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
        const dropbtn = document.querySelector('.dropbtn')
        dropbtn.addEventListener('click', () => {
            
            const icon = document.querySelector('.caret-icon');
            const myDropdown = document.querySelector('.dropdown-content');
            
            if(myDropdown.style.display == 'none' || myDropdown.style.display == "") {
                icon.style.transform = 'perspective(500px) rotateX(180deg)';
                myDropdown.style.display = 'block';
            } else{
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
        const dropbtn1 = document.querySelector('.dropbtn1')
        dropbtn1.addEventListener('click', () => {
            
            const myDropdown1 = document.querySelector('.dropdown-message');
            
            if(myDropdown1.style.display == 'none' || myDropdown1.style.display == "") {
                myDropdown1.style.display = 'block';
            } else{
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


    <main>
        <section class="board-top">
            <div class="board-top-title">와글와글 ${board.boardName}</div>
        </section>
        <section class="board-nav">
            <div class="board-nav-area">
                <span>물물교환</span>
                <span>팁</span>
                <span>질문</span>
            </div>
        </section>
        <section class="board-search">
            <form action="" class="board-search-area">
                <input type="text" name="query" placeholder="검색어를 입력해주세요">
                <button class="board-search-btn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <select class="board-select" id="boardSelect">
                <option value="new">최신순</option>
                <option value="view">조회수</option>
                <option value="like">좋아요</option>
            </select>
        </section>
        <section class="board-list">
            <div class="board-list-top">
                <div class="board-List-title">
                    <span class="board-no">No.</span>
                    <span class="board-img"></span>
                    <span class="board-title">게시글 제목</span>
                    <span class="board-date">작성일</span>
                    <span class="board-view">조회수</span>
                </div>
                <ul class="board-list-area">
                    <c:choose>
                        <c:when test="${empty boardList}">
                            등록된 게시글이 없습니다.
                            첫 게시물의 주인공이 되어보세요!
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="board" items="$boardList}">
                                <li>
                                    <span class="board-no">${board.boardNo}</span>
                                    <span class="board-img">${board.boardImg}</span>
                                    <span class="board-title">${board.boardTitle}</span>
                                    <span class="board-date">5분전</span>
                                    <span class="board-view">${board.boardView}</span>
                                </li>

                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </ul>
                <div class="board-write-bottom">
                    <div class="board-pagination">
                        <ul class="pagination">

                            <%-- 첫 페이지 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=1${sURL}">&1t;&1t;</a> </li>

                            <%-- 이전 목록 마지막 번호로 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=${pagination.prevPage}${sURL}">&1t;</a> </li>

                            <%-- 페이지 번호 --%>
                            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                        <%-- 현재 페이지 --%>
                                        <li><a class="current">${i}</a></li>
                                    </c:when>

                                    <c:otherwise>
                                        <%-- 현재 페이지 제외 페이지 --%>
                                        <li><a href="/board/&{boardCode}?cp=${i}${sURL}">${i}</a></li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                            <%-- 다음 목록 시작 페이지 이동 --%>
                            <li> <a href="/board/${boardCode}?cp=${pagination.nextPage}${sURL}">&gt;</a> </li>

                            <%-- 끝 페이지로 이동 --%>
                            <li> <a href="/board/&{boardCode}?cp=${pagination.maxPage}${sURL}">&gt;&gt;</a></li>
                        </ul>
                    </div>
                    <button class="board-write">글쓰기</button>
                </div>
            </div>
        </section>
    </main>
    
</body>
</html>
