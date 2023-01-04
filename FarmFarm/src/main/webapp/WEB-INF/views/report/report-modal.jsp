<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고</title>

    <link rel="stylesheet" href="/resources/css/report/report-modal-style.css" />
    <link rel="stylesheet" href="/resources/css/common/modal/commonModal-style.css" />

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
                <div class="report-form">
                    <input type="hidden" id="reportType">
                    <input type="hidden" id="reportTargetNo">

                    <label for="0"><input type="radio" name="reportRadio" id="0">광고 또는 스팸 </label>
                    <label for="1"><input type="radio" name="reportRadio" id="1">음란물 및 선정성 정보</label>
                    <label for="2"><input type="radio" name="reportRadio" id="2">사기 또는 거짓 정보</label>
                    <label for="3"><input type="radio" name="reportRadio" id="3">불법 또는 규제 상품 판매</label>
                    <label for="4"><input type="radio" name="reportRadio" id="4">혐오 발언 또는 상징 </label>
                    <label for="5"><input type="radio" name="reportRadio" id="5">따돌림 또는 괴롭힘</label>
                    <label for="6"><input type="radio" name="reportRadio" id="6">폭력 또는 위험한 단체</label> 
                    <label for="7"><input type="radio" name="reportRadio" id="7">지식재산권 침해 </label>
                    <label for="8"><input type="radio" name="reportRadio" id="8">기타</label>

                    <textarea id="reportContent" cols="50" rows="3" spellcheck="false"></textarea><br>
                    <button id="reportSubmitBtn">신고하기</button>
                </div>
            </div>
        </div>
    </div>
    <script>
        var radioResult;
    </script>
    
    <script src="/resources/js/report/report-modal.js"></script>
    <script src="/resources/js/common/common.js"></script> 
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>

</body>

</html>