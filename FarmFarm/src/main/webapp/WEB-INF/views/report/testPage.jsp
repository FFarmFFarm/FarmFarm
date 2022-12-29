<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>테스트 페이지</title>

        <link rel="stylesheet" href="/resources/css/common/header-style.css">
        <link rel="stylesheet" href="/resources/css/common/footer-style.css">
        <link rel="stylesheet" href="/resources/css/admin/adminNav-style.css">
        <link rel="stylesheet" href="/resources/css/admin/dashboard-style.css" />
        <link rel="stylesheet" href="/resources/css/report/report-modal-style.css" />

        <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>

        <main>
            test 페이지입니다.
            <button id="reportBtn">님 신고</button>

        </main>


    <!-- <jsp:include page="/WEB-INF/views/common/footer.jsp"/>  -->
        
        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
        <jsp:include page="/WEB-INF/views/report/report-modal.jsp"/> 
        <script src="/resources/js/report/report-modal.js"></script>
        
        


    </body>

</html>