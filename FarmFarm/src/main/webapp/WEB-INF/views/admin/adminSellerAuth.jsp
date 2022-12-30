<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="sellerList" value="${map.sellerList}" />
<c:set var="sellerListCount" value="${map.sellerListCount}" />
<c:set var="pagination" value="${map.pagination}" />


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
                <div class="board-div">
                    <span class="board-title">
                        인증 신청 목록 
                        <button type="button" id="allSellerBtn"><span class="preSellerFitler" id="p1">전체 판매자 보기</span></button>
                        <button type="button" id="watingSellerBtn"><span class="preSellerFitler" id="p0">인증 대기 중인 회원 보기</span></button>
                    </span>
                </div>

                <div class="seller-auth">
                    <table class="auth-list-table">
                        <thead>
                            <tr class="auth-list-header">
                                <th>NO</th>
                                <th>회원번호</th>
                                <th>아이디</th>
                                <th>닉네임</th>
                                <th>성명</th>
                                <th>주소</th>
                                <th>신청일자</th>
                                <th>판매자 인증</th>
                            </tr>
                        </thead>

                        <!-- todo: ajax로 해서 신청 완료 되면 바로바로 목록에서 없어지도록! -->
                        <!-- 한 행 반복 -->
                        <tbody>
                            <c:forEach var="seller" items="${sellerList}">
                                <c:set var="i" value="${i+1}" />
                                <tr class="auth-list-row">
                                    <td>${i}</td>
                                    <td>${seller.memberNo}</td>
                                    <td id="sId">${seller.memberId}</td>
                                    <td id="sNickname">${seller.memberNickname}</td>
                                    <td>${seller.memberName}</td>
                                    <td id="sAddress">${seller.memberAddress}</td>
                                    <td>${seller.signUpDate}</td>
                                    
                                    <c:if test="${not empty seller.authority}">
                                        <c:if test="${seller.authority == 3}">
                                            <td>접수</td>
                                        </c:if>
                                        <c:if test="${seller.authority == 1}">
                                            <td>인증 완료</td>
                                        </c:if>
                                    </c:if>
                                </tr>
                            </c:forEach>

                        </tbody>
                    </table>
                </div>

                <!-- todo: 페이지네이션 반복문 -->
                <div class="admin-pagination-area">
                    <ul class="admin-pagination">
                        <li id="1" class="page-box">
                            <i class="fa-solid fa-angles-left"></i>
                        </li>
                        <li id="${pagination.prevPage}" class="page-box">
                            <i class="fa-solid fa-angle-left"></i>
                        </li>

                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                        <li class="current-page-box">
                                            ${i}
                                        </li>
                                    </c:when>
                                    <c:otherwise>
                                        <li id="${i}" class="page-box">
                                            ${i}
                                        </li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                            
                            <li id="${pagination.nextPage}" class="page-box">
                                <i class="fa-solid fa-angle-right"></i>
                            </li>
                            <li id="${pagination.endPage}" class="page-box">
                                <i class="fa-solid fa-angles-right"></i>
                            </li> 
                    </ul>
                </div>
            </div>

            <div class="board-content">
                <span class="board-title">인증 신청서 조회</span>

                <div class="select-auth-paper">
                    <!-- todo: el쓰는부분 ajax로 -->

                    <div class="seller-auth-image">
                        <span class="auth-image-title">증빙 자료 (인증 사진_확대 가능하게)</span>
                        <span class="auth-image">
                            <img src="/resources/images/myPage/background/bgImg2.jpg">
                        </span>
                    </div>

                    <div class="seller-auth-div">
                        <table class="seller-auth-table">
                            <tbody>
                                <tr>
                                    <td class="detail-bold">회원번호</td>
                                    <td class="detail-content">12345</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">아이디</td>
                                    <td class="detail-content">USER01</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">닉네임</td>
                                    <td class="detail-content">유저일</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">성명</td>
                                    <td class="detail-content">홍길동</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">생년월일</td>
                                    <td class="detail-content">1980년 1월 1일</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">연락처</td>
                                    <td class="detail-content">010-1234-5678</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">주소</td>
                                    <td colspan="3" class="detail-content">서울 중구 남대문로 120 무슨빌딩 2층 2000호 kh정보교육원 어쩌구저쩌구 주소 길게</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">가입일</td>
                                    <td class="detail-content">2022-12-10 14:27:20</td>
                                </tr>
                                <tr>
                                    <td class="detail-bold">판매자 승인 일자</td>
                                    <td class="detail-content">2022-12-10 18:27:20</td>
                                </tr>
                            </tbody>
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

    <script>
        var preSellerFitler = 0;
        var cp = 1;
    </script>

    <%-- jquery --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/admin/adminSellerAuth.js"></script> 
</body>
</html>