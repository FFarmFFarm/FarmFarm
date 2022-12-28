<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="memberList" value="${map.memberList}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고</title>

    <link rel="stylesheet" href="/resources/css/admin/adminDel-modal-style.css" />

    <script src="https://kit.fontawesome.com/d4fbceca97.js" crossorigin="anonymous"></script>

</head>
<body>
    <div class="adminDel-container" id="adminDelContainer">
        <div class="adminDel-modal">

            <span class="adminDel-title"> 
                정말로 탈퇴시키겠습니까?
            </span>
            
            <div class="adminDel-form-div">
                <div class="adminDel-form">
                    <input type="hidden" id="reportType" value="M">
                    <input type="hidden" id="reportTargetNo" value="${memberList.memberId}">
                    <input type="hidden" id="reportReason" value="관리자 처리">
<%-- 
                    <label for="0"><input type="radio" name="adminDelRadio" id="0">광고 또는 스팸 </label>
                    <label for="1"><input type="radio" name="adminDelRadio" id="1">음란물 및 선정성 정보</label>
                    <label for="2"><input type="radio" name="adminDelRadio" id="2">사기 또는 거짓 정보</label>
                    <label for="3"><input type="radio" name="adminDelRadio" id="3">불법 또는 규제 상품 판매</label>
                    <label for="4"><input type="radio" name="adminDelRadio" id="4">혐오 발언 또는 상징 </label>
                    <label for="5"><input type="radio" name="adminDelRadio" id="5">따돌림 또는 괴롭힘</label>
                    <label for="6"><input type="radio" name="adminDelRadio" id="6">폭력 또는 위험한 단체</label> 
                    <label for="7"><input type="radio" name="adminDelRadio" id="7">지식재산권 침해 </label> --%>

                    <c:if test="${not empty memberList.reportReason}">
                        <textarea id="adminDelContent" cols="70" rows="15" placeholder="관리자 작성란">${memberList.reportReason}</textarea><br>
                    </c:if>
                    <c:if test="${empty memberList.reportReason}">
                        <textarea id="adminDelContent" cols="70" rows="15" placeholder="관리자 작성란">관리자에 의한 강제 탈퇴</textarea><br>
                    </c:if>

                    <button id="adminDelSubmitBtn">강제 탈퇴</button>
                </div>
            </div>
        </div>
    </div>

    <script src="/resources/js/adminDel/adminDel-modal.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>


</body>

</html>