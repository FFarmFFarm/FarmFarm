<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="newOrderStat" value="${statMap.newOrderStat}" />
<c:set var="askReportStat" value="${statMap.askReportStat}" />
<c:set var="authSellerStat" value="${statMap.authSellerStat}" />
<c:set var="returnStat" value="${statMap.returnStat}" />

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>관리자 대시보드</title>

        <link rel="stylesheet" href="/resources/css/common/header-style.css">
        <link rel="stylesheet" href="/resources/css/common/footer-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
        <link rel="stylesheet" href="/resources/css/admin/dashboard-style.css" />

        <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

    </head>
    <body>
        <jsp:include page="/WEB-INF/views/common/adminHeader.jsp"/> 

        <main>
        <!--nav-->
            <jsp:include page="/WEB-INF/views/admin/adminNav.jsp"/> 

            <!-- 오른쪽 -->
            <section class="admin-content-section">

                <span class="dashboard-title">
                    DASHBOARD
                </span>
                <div class="board-stat">
                    <span>
                        <a href="/admin/orderList" class="span-text">신규 주문</a>
                        <a href="/admin/orderList" class="span-number s-green">${newOrderStat}</a>
                    </span>
                    <span>
                        <a href="/admin/return" class="span-text">반품 요청</a>
                        <a href="/admin/return" class="span-number s-green">${returnStat}</a>
                    </span>
                    <span>
                        <a href="/admin/report" class="span-text">미처리 신고</a>
                        <a href="/admin/report" class="span-number s-red">${askReportStat}</a>
                    </span>
                    <span>
                        <a href="/admin/seller" class="span-text">판매자 인증 신청</a>
                        <a href="/admin/seller" class="span-number s-blue">${authSellerStat}</a>
                    </span>
                </div>

                <div class="graph-container">
                    <div class="board-graph" id="signUpGraph">
                        <span class="graph-title">팜팜 가입자 추이</span>
                        <canvas id="signUpChart" width="700px"></canvas>
                        <i class="fa-sharp fa-solid fa-angle-right" id="iconRight"></i>
                    </div>
                    <div class="board-graph" id="orderGraph">
                        <span class="graph-title">팜팜상품 주문 추이</span>
                        <canvas id="orderChart" width="700px"></canvas>
                        <i class="fa-sharp fa-solid fa-angle-left" id="iconLeft"></i>
                    </div>
                    </div>
                        <%-- <i class="fa-sharp fa-solid fa-angle-left" id="iconLeft"></i> --%>
                </div>
                <div class="graph-container2">
                    <div class="sales graph2">
                        <div class="board-graph" id="thisWeekSales">
                            <span class="graph-title">이번주 팜팜매출</span>
                            <canvas id="salesChart" width="450px"></canvas>
                            <%-- <i class="fa-sharp fa-solid fa-angle-left" id="iconLeft"></i> --%>
                        </div>
                    </div>
                    <div class="ranking graph2">
                        <div class="board-graph" id="productRanking">
                            <span class="graph-title">팜팜 TOP 5</span>
                            <canvas id="rankingChart" width="300px"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            
        </main>


        <%-- jquery --%>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
     
        <!-- chart.js -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
            
        <script src="/resources/js/admin/dashboard.js"></script>

    </body>

</html>