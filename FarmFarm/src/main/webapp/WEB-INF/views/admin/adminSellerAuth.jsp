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
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminSellerAuth-style.css" />
    <link rel="stylesheet" href="/resources/css/admin/adminModal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

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
                    <span class="board-title">인증 신청 목록</span>
                    <span class="member-search"> 
                        <input type="text" name="adminMemberkeyword" id="adminMemberkeyword" placeholder="회원번호, 아이디, 닉네임" 
                                                            spellcheck="false" autocomplete="off">
                        <button type="button" id="memberSearchBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </span>
                </div>
                
                <button type="button" id="watingSellerBtn"><span class="sellerFilter" id="p0">인증 대기 회원 보기</span></button>
                <button type="button" id="allSellerBtn"><span class="sellerFilter" id="p1">전체 판매자 보기</span></button>

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
                        <tbody id="tbody">
                            <c:forEach var="seller" items="${sellerList}">
                                <c:set var="i" value="${i+1}" />
                                <tr class="auth-list-row">
                                    <td class="member-seq">${i}</td>
                                    <td>${seller.memberNo}</td>
                                    <td class="sId">${seller.memberId}</td>
                                    <td class="sNickname">${seller.memberNickname}</td>
                                    <td>${seller.memberName}</td>
                                    <td class="sAddress">${seller.memberAddress}</td>
                                    <td>${seller.signUpDate}</td>
                                    
                                    <c:if test="${not empty seller.authority}">
                                        <c:if test="${seller.authority == 3}">
                                            <td>접수</td>
                                        </c:if>
                                        <c:if test="${seller.authority == 4}">
                                            <td>보류</td>
                                        </c:if>
                                        <c:if test="${seller.authority == 1}">
                                            <td>인증 완료</td>
                                        </c:if>
                                    </c:if>
                                    <!-- <input type="hidden" class="hidden-memberId" name="hiddenId" value="${seller.memberId}"> -->
                                    <input type="hidden" class="hidden-memberNo" name="hiddenNo" value="${seller.memberNo}">
                                </tr>
                            </c:forEach>

                        </tbody>
                    </table>
                </div>

                <!-- todo: 페이지네이션 반복문 -->
                <div class="admin-pagination-area" id="adminPaginationArea">
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

            <div class="board-content" id="selectAuthPaperDiv">
                <span class="board-title">인증 신청서 조회</span>

                <div class="select-auth-paper" id="authPaper">
                    <!-- todo: el쓰는부분 ajax로 -->

                    <div class="seller-auth-image">
                        <span class="auth-image-title" id="authImageTitle">증빙 자료(인증사진)</span>
                        <span class="auth-image" id="authImage">
                            <!-- <img src="/resources/images/myPage/background/bgImg2.jpg" class="aImg"> -->
                        </span>
                    </div>

                    <div class="seller-auth-div">
                        <table class="seller-auth-table" id="sellerAuthTable">
                            <!-- sellerMemberNo가 맞지만 길어서 member생략함. 따로 sellerNo가 있는건 아님! -->
                            <!-- <tr>
                                <td class="detail-bold" id="sellerNo">회원번호</td>
                                <td class="detail-content">12345</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerId">아이디</td>
                                <td class="detail-content">USER01</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerNickname">닉네임</td>
                                <td class="detail-content">유저일</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerName">성명</td>
                                <td class="detail-content">홍길동</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerBirth">생년월일</td>
                                <td class="detail-content">1980년 1월 1일</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerTel">연락처</td>
                                <td class="detail-content">010-1234-5678</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerAddress">주소</td>
                                <td colspan="3" class="detail-content">서울 중구 남대문로 120 무슨빌딩 2층 2000호 kh정보교육원 어쩌구저쩌구 주소 길게</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerSignUpDate">가입일</td>
                                <td class="detail-content">2022-12-10 14:27:20</td>
                            </tr>
                            <tr>
                                <td class="detail-bold" id="sellerAuthDate">판매자 승인 일자</td>
                                <td class="detail-content">2022-12-10 18:27:20</td>
                            </tr> -->
                        </table>
                    
                        <div class="auth-button-div">
                            <button id="authApproveBtn">승인</button>
                            <button id="authDenyBtn">보류</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>


    <!-- 거부 모달 -->
    <div class="adminModal-container" id="adminModalContainer">
        <div class="admin-modal-deny">

            <span class="adminModal-title"> 
                판매자 인증을 보류하시겠습니까?
            </span>

            <textarea name="denyReason" id="denyReason" cols="30" rows="10" 
            placeholder="보류 사유 입력" spellcheck="false"></textarea>
            
            <div class="adminModal-form-div">
                <div class="adminModal-form">
                    <button id="cancelBtn">취소</button>
                    <button id="denyBtn">보류</button>
                </div>
            </div>
        </div>
    </div>



    <!-- 증빙사진 모달 //  팝업창 열리는 것으로 대체-->
    <!-- <div class="authImg-modal" id="authImgModal">
        <span class="authImg-span">
                <img class="authImg">
        </span>
    </div> -->

    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/> 

    <script>
        var sellerFilter = 0;
        var cp = 1;
    </script>

    <%-- jquery --%>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <script src="/resources/js/admin/adminSellerAuth.js"></script> 
    <script src="/resources/js/admin/adminModal.js"></script> 
    <script src="/resources/js/common/common.js"></script> 
</body>
</html>