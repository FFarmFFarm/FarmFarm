<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
        <link rel="stylesheet" href="/resources/css/modal/report-style.css" />

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
                        <a class="span-text">신규 주문</a>
                        <a class="span-number s-green">36</a>
                    </span>
                    <span>
                        <a class="span-text">반품 요청</a>
                        <a class="span-number s-green">36</a>
                    </span>
                    <span>
                        <a class="span-text">미처리 신고</a>
                        <a class="span-number s-red">36</a>
                    </span>
                    <span>
                        <a class="span-text">판매자 인증 신청</a>
                        <a class="span-number s-blue">36</a>
                    </span>
                </div>

                <div class="board-graph">
                    그래프
                </div>

                <div class="board-graph">
                    그래프
                </div>
            </section>

            
        </main>

        <button id="reportBtn">님 신고</button>

    <!-- <jsp:include page="/WEB-INF/views/common/footer.jsp"/>  -->
        
        <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 
        <script src="/resources/js/report/report-modal.js"></script>
    </body>

</html>