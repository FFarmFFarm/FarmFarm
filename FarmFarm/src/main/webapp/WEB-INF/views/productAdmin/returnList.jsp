<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:set var="returnList" value="${map.returnList}"/>
<c:set var="pagination" value="${map.pagination}"/>

<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 주문내역</title>

    <!-- swiper-style -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/resources/css/productAdmin/returnList-style.css">
    <link rel="stylesheet" href="/resources/css/productAdmin/modal/returnDetail-style.css">
    <link rel="stylesheet" href="/resources/css/common/header-style.css">
    <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">


    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

    <script src="https://kit.fontawesome.com/d449774bd8.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header --> 
    <jsp:include page='/WEB-INF/views/common/adminHeader.jsp' />

    <main>
        <jsp:include page='/WEB-INF/views/admin/adminNav.jsp' />

        <section class="return-list-section">
            <div class="page-title">
                <p>반품내역관리</p>
            </div>
            
            <div class="return-list">
                <div class="part-title">
                    <p>반품목록</p>
                    <div class="count-list">총
                        <span>${map.returnListCount}</span>건
                    </div>
                </div>

                <table class="return-list-table">
                    <tr class="table-row table-head">
                        <th>반품번호</th>
                        <th>주문번호</th>
                        <th>주문회원</th>
                        <th>반품수량</th>
                        <th>반환총액</th>
                        <th>반품상태</th>
                        <th>반품사유</th>
                    </tr>

                    <c:forEach items="${returnList}" var="r">

                        <tr class="table-row table-info">
                            <td class="return-no" id="${r.returnNo}">${r.returnNo}</td>
                            <td>${r.orderNo}</td>
                            <td>${r.memberId}</td>
                            <td>${r.returnAmount}</td>
                            <td><fmt:formatNumber value="${r.returnSum}" pattern="#,###" /></td>
                            <td>
                                <c:if test="${r.returnStatus == 0}">반품진행중</c:if>
                                <c:if test="${r.returnStatus == 1}">반품완료</c:if>
                                <c:if test="${r.returnStatus == 2}">반려</c:if>
                            </td>
                            <td>
                                <c:if test="${r.returnReason == 0}">단순변심</c:if>
                                <c:if test="${r.returnReason == 1}">상품하자</c:if>
                            </td>
                        </tr>
                    
                    </c:forEach>
                </table>
            </div>
            
            <c:if test="${!empty returnList}">
                <div class="pagination-area">
                    <div class="page-box">
                        <a href="/admin/return?cp=1${sURL}">
                            <i class="fa-solid fa-angles-left"></i>
                        </a>
                    </div>
                    <div class="page-box">
                        <a href="/admin/return?cp=${pagination.prevPage}${sURL}">
                            <i class="fa-solid fa-angle-left"></i>
                        </a>
                    </div>
                    <c:forEach var="i"
                        begin="${pagination.startPage}"
                        end="${pagination.endPage}"
                        step="1">
                        <c:choose>
                            <c:when test="${i==pagination.currentPage}">
                                <div class="page-box">
                                    <a class="current">${i}</a>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <div class="page-box">
                                    <a href="/admin/return?cp=${i}${sURL}">${i}</a>
                                </div>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <div class="page-box">
                        <a href="/admin/return?cp=${pagination.nextPage}${sURL}">
                            <i class="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                    <div class="page-box">
                        <a href="/admin/return?cp=${pagination.maxPage}${sURL}">
                            <i class="fa-solid fa-angles-right"></i>
                        </a>
                    </div>
                </div>
            
            </c:if>

        </section>
    </main>

    <jsp:include page="/WEB-INF/views/productAdmin/modal/returnDetail.jsp"/>
    <jsp:include page="/WEB-INF/views/common/modal/message.jsp"/>

    <script src="/resources/js/productAdmin/returnList.js"></script>
    <script src="/resources/js/common/common.js"></script>
    

    <!-- ajax -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <c:if test="${! empty message}">
        <script>
            alert("${message}");
        </script>
        <c:remove var="message"/>
    </c:if>

</body>

</html>