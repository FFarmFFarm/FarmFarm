<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고</title>

    <link rel="stylesheet" href="/resources/css/modal/report-style.css" />

    <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

</head>
<body>
    <div class="report-container" id="reportContainer">
        <div class="report-modal">

            <span class="report-title"> 
                <i class="fa-solid fa-triangle-exclamation"></i>
                신고
            </span>
            
            <div class="report-form-div">
                <input type="hidden" name="reportType" id="reportType">
                <input type="hidden" name="reportTargetNo" id="reportTargetNo">
                <form action="/report" method="GET" class="report-form">
                    <input type="radio" name="report" id="1"> <label for="1">광고 또는 스팸</label> <br>
                    <input type="radio" name="report" id="2"> <label for="2">음란물 및 선정성 정보</label> <br>
                    <input type="radio" name="report" id="3"> <label for="3">사기 또는 거짓 정보</label> <br>
                    <input type="radio" name="report" id="4"> <label for="4">불법 또는 규제 상품 판매</label> <br>
                    <input type="radio" name="report" id="5"> <label for="5">혐오 발언 또는 상징</label> <br>
                    <input type="radio" name="report" id="6"> <label for="6">따돌림 도는 괴롭힘</label> <br>
                    <input type="radio" name="report" id="7"> <label for="7">폭력 또는 위험한 단체</label> <br>
                    <input type="radio" name="report" id="8"> <label for="8">지식재산권 침해</label> <br>
                    <input type="radio" name="report" id="reportEtc"> <label for="reportEtc">기타</label> <br>
                    <textarea name="reportContent" id="reportContent" cols="50" rows="3"></textarea><br>
                    <input type="hidden" id="reportReason">
                    <button id="reportSubmitBtn">신고하기</button>
                </form>
            </div>
        </div>
    </div>
    
    <%-- <script src="/resources/js/report/report-modal.js"></script> --%>
    <%-- <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script> --%>

</body>

</html>