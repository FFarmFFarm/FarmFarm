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
    <div class="report-container" id="report">
        <div class="report-modal">

            <span class="report-title"> 
                <i class="fa-solid fa-triangle-exclamation"></i>
                신고
            </span>
            
            <div class="report-form-div">
                <form action="" class="report-form">
                    <input type="radio" name="report"> 광고 또는 스팸 <br>
                    <input type="radio" name="report"> 음란물 및 선정성 정보 <br>
                    <input type="radio" name="report"> 사기 또는 거짓 정보 <br>
                    <input type="radio" name="report"> 불법 또는 규제 상품 판매 <br>
                    <input type="radio" name="report"> 혐오 발언 또는 상징 <br>
                    <input type="radio" name="report"> 따돌림 도는 괴롭힘 <br>
                    <input type="radio" name="report"> 폭력 또는 위험한 단체 <br>
                    <input type="radio" name="report"> 지식재산권 침해 <br>
                    <input type="radio" name="report"> 기타 <br>
                    <textarea name="reportOpinion" id="" cols="50" rows="3"></textarea><br>
                </form>
                <button id="reportBtn">신고하기</button>
            </div>
        </div>
    </div>
</body>

<script src="/resources/js/report-modal.js"></script>
</html>