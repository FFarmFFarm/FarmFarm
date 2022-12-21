<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 사고팔고</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/seller/sellerPage-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">


    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/header.jsp' />

    <main>
        <section class="profile-container">
            <div class="profile-background">
                <img
                src="/resources/images/myPage/background/bgImg2.jpg"
                alt=""
                class="member-bg-img"
                />
            </div>

            <!-- 판매자 정보 -->
            <div class="profile-info">
                <div class="profile-img-container">
                    <img
                    src="/resources/images/myPage/profile/profileImg.png"
                    alt=""
                    class="member-profile-img"
                    />
                </div>
                
                <button
                type="button"
                class="profile-setting-btn fa-solid fa-gear"
                ></button>
                
                <span class="member-nickname">현재네 농장</span>
                <div class="member-info-container">
                    <div class="member-info">
                        <span class="info-title member-name">판매자</span>
                        <span class="info-content">김길자</span>
                    </div>
                    
                    <div class="member-info">
                        <span class="info-title count-title">판매글 수</span>
                        <span class="info-content">12</span>
                    </div>

                    <div class="member-info">
                        <span class="info-title member-signup-date">가입일</span>
                        <span class="info-content">2022.10.13</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="mypage-nav">
            <a href="" class="board-wrote">
                <i class="fa-regular fa-clipboard"></i> 
                <span> 판매글</span>
            </a>
        </section>

        <section class="my-post-container">
            <div class="post-list-container">
                <div class="post-list">
                    <div class="post">
                        <div class="post-thumbnail">
                            <img
                            src="/resources/images/board/thumbnail.png"
                            alt=""
                            class="post-thumbnail-img"
                            />
                        </div>
                        <div class="post-total">
                            <div class="post-head">
                                <a href="" class="post-title">게시글 제목 샘플</a>
                                <span class="post-status">판매중</span>
                                <span class="post-status sold-out">판매완료</span>
                            </div>
                            <div class="post-price">
                                가격 <span>15,000</span>
                            </div>
                            <div class="post-detail">
                                <div class="post-reg-date">
                                    작성일<span>2022.12.15</span>
                                </div>
                                <div class="post-view-count">
                                    조회수<span>20</span>
                                </div>
                            </div>
                        </div>
                        <div class="button-area">
                            <button type="button">게시물 수정</button>
                        </div>
                    </div>
                </div>
                
            <div class="pagination-area">
                <!-- ajax로 만들어 보십시다 -->
                <div class="page-box">
                    <i class="fa-solid fa-angles-left"></i>
                </div>
                <div class="page-box">
                    <i class="fa-solid fa-angle-left"></i>
                </div>
                <div class="page-box">
                    1
                </div>
                <div class="page-box">
                    2
                </div>
                <div class="page-box">
                    3
                </div>
                <div class="page-box">
                    4
                </div>
                <div class="page-box">
                    5
                </div>
                <div class="page-box">
                    6
                </div>
                <div class="page-box">
                    7
                </div>
                <div class="page-box">
                    8
                </div>
                <div class="page-box">
                    9
                </div>
                <div class="page-box">
                    <i class="fa-solid fa-angle-right"></i>
                </div>
                <div class="page-box">
                    <i class="fa-solid fa-angles-right"></i>
                </div>
            </div>
            </div>
        </section>
    </main>
    
        </section>
    </div>
    
    <!-- <div id="topBtn" class="view-hidden">
        <i class="fa-sharp fa-solid fa-arrow-up"></i>
    </div> -->

    <!-- footer -->
    <jsp:include page='/WEB-INF/views/common/footer.jsp' />

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    
</body>

</html>