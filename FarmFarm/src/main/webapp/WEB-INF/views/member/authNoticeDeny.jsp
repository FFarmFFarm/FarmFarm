<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>판매자 인증</title>

    <script
        src="https://kit.fontawesome.com/591746f9e8.js"
        crossorigin="anonymous"
    ></script>
    <script>
        var loginMemberNo = "${loginMember.memberNo}";
    </script>

    <link rel="stylesheet" href="/resources/css/member/authNotice-style.css" />

</head>
<body>
    <div class="home-logo">
        <a href="/">
        <img src="/resources/images/mainLogo.png" />
        </a>
    </div>

    <div class="notice-text">
        판매자 인증 보류
    </div>
    <div class="notice-text2">
        <span class="notice-span"> [보류 사유] ${denyReason} </span>
        <span>1:1 상담을 이용하여 추가 인증을 진행하시기 바랍니다.</span>
    </div>

    <div id="buttonArea">
        <div class="button to-main">
            <a href="/logout">메인페이지</a>
        </div>
        <div class="button to-happy-center">
            <c:if test="${! empty loginMember}">
            <c:if test="${loginMember.authority == 4}">
            <button type="button" class="btn-inquire" id="inquireOpen">
                1:1 상담
            <div id="inquireUnread">
                <i class="fa-solid fa-circle"></i>
            </div>
            </button>
            <jsp:include page="/WEB-INF/views/inquire/inquire.jsp"/>
            </c:if>
            </c:if>
        </div>
    </div>


</body>
</html>
