<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>판매자 인증 관리</title>

    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/common/footer-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminSellerAuth-style.css" />

    <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>
</head>
    
<body>
    <jsp:include page="/WEB-INF/views/common/adminHeader.jsp"/>    

    <main>

        <!--nav-->
        <jsp:include page="/WEB-INF/views/admin/adminNav.jsp"/> 
   

        <!-- 오른쪽 -->
        <section class="admin-content-section">
            <div class="page-title" id="pageTitle">
                <p>판매자 인증 관리</p>
            </div>
            <div class="board-content">
                <span class="board-title">인증 신청 목록</span>

                <div class="seller-auth">
                    <table class="auth-list-table">
                        <tr>
                            <th>NO</th>
                            <th>회원번호</th>
                            <th>아이디</th>
                            <th>사용자 이름</th>
                            <th>성명</th>
                            <th>신청일자</th>
                            <th>판매자 인증</th>
                        </tr>

                        <!-- todo: ajax로 해서 신청 완료 되면 바로바로 목록에서 없어지도록! -->
                        <!-- 한 행 반복 -->
                        <tr class="auth-list-row">
                            <td>1</td>
                            <td>12345</td>
                            <td width="170px">longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>

                        <tr class="auth-list-row">
                            <td>2</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>3</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>4</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>5</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>6</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>7</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <!-- <tr class="auth-list-row">
                            <td>8</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>9</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr>
                        <tr class="auth-list-row">
                            <td>10</td>
                            <td>12345</td>
                            <td>longideneti12</td>
                            <td>유저일</td>
                            <td>이은지</td>
                            <td>2022-12-14</td>
                            <td>접수</td>
                        </tr> -->
                    </table>
                </div>

                <!-- todo: 페이지네이션 반복문 -->
                <div class="admin-pagination-area">
                    <ul class="admin-pagination">
                        <!-- <li><a href="">&lt;&lt;</a></li>
                        <li><a href="">&lt;</a></li> -->
                        <li><a href="">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href="">4</a></li>
                        <li><a href="">5</a></li>
                        <li><a href="">6</a></li>
                        <li><a href="">7</a></li>
                        <li><a href="">8</a></li>
                        <li><a href="">9</a></li>
                        <li><a href="">10</a></li>
                        <!-- <li><a href="">&gt;</a></li>
                        <li><a href="">&gt;&gt;</a></li> -->
                    </ul>
                </div>
            </div>

            <div class="board-content">
                <span class="board-title">인증 신청서 조회</span>

                <div class="select-auth-paper">
                    <!-- todo: el쓰는부분 ajax로 -->

                    <div class="seller-auth-image">
                        <span class="auth-image-title">증빙 자료 (인증 사진_확대 가능하게)</span>
                            <img src="/resources/images/myPage/background/bgImg2.jpg" class="auth-image">
                    </div>

                    <div class="seller-auth-div">
                        <table class="seller-auth-table">
                            <tr>
                                <td class="detail-bold" width="150px">회원번호</td>
                                <td width="300px">12345</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">아이디</td>
                                <td width="175px">USER01</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">닉네임</td>
                                <td>유저일</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">성명</td>
                                <td>홍길동</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">생년월일</td>
                                <td>1980년 1월 1일</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">연락처</td>
                                <td>010-1234-5678</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">주소</td>
                                <td colspan="3">서울 중구 남대문로 120 무슨빌딩 2층 2000호 kh정보교육원 어쩌구저쩌구 주소 길게</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">가입일</td>
                                <td>2022-12-10 14:27:20</td>
                            </tr>
                            <tr>
                                <td class="detail-bold">판매자 인증 신청일자</td>
                                <td>2022-12-10 18:27:20</td>
                            </tr>

                        </table>
                    
                        <div class="auth-button-div">
                            <button id="authApproveBtn">승인</button>
                            <button id="authDenyBtn">거부</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- <jsp:include page="/WEB-INF/views/common/footer.jsp"/>  -->

</body>
</html>