<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%-- 문자열 관련 메서드를 제공하는 JSTL (EL형식) --%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 아이디 찾기 성공 </title>

    <link rel="stylesheet" href="/resources/css/member/findSuccess-style.css">

</head>
<body>
    <div class="success-page">
        <main>
            <div class="success-img">
                <img src="/resources/images/mainLogo.png">
            </div>
            <div class="container">
                <div class="container-sub">
                    <div class="form-wrap-id">
                        <div class="title-1">고객님의 팜팜 계정을 찾았습니다.</div>
                        <div class="subtitle">아이디 확인 후 로그인해주세요.</div>
                        <div class="find-success">
                            <div class="success-id">아이디 : "${memberId}"</div>
                            <div class="signup-date">가입일 : ${signUpDate}</div>
                        </div>
                    </div>
        
                    <div class="success-wrap">
                        <div class="success-btn">
                            <a href="/findPw">비밀번호 찾기</a>
                        </div>
            
                        <div class="success-btn">
                            <a href="/login">로그인</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script src="/resources/js/member/find.js"></script>
</body>
</html>