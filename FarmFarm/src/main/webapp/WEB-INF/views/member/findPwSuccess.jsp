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
    <title>FarmFarm | 비밀번호 찾기 성공 </title>

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
                    <div class="form-wrap">
                        <div class="title-1">비밀번호 재설정</div>
                    </div>
                    <form action="/findPwSuccess" method="post" id="changePwFrm">
                        <section class="success">
                            <div class="title">새 비밀번호</div>
                            <input type="password" name="memberPw" id="memberPw" placeholder="비밀번호"
                                maxlegnth="20">
                            <div class="title">새 비밀번호 확인</div>
                            <input type="password" name="memberPwConfirm" id="memberPwConfirm"
                                placeholder="비밀번호 확인" maxlegnth="20">
                            <div id="pwConfirm" class="coner">영어, 숫자, 특수문자(!,@,#,-,_) 최소 6자 이상 입력해주세요.</div>
                        </section>
            
                        <div class="success-wrap">
                            <button class="update-btn">
                                비밀번호 변경
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    <script src="/resources/js/member/find.js"></script>
</body>
</html>