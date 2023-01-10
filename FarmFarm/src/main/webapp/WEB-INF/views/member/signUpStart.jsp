<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팜팜 | 회원가입</title>

    <link rel="stylesheet" href="/resources/css/member/signUpStart-style.css">
</head>
<body>
    <div class="main">
        <div class="main-logo">
            <a href="/">
                <img src="/resources/images/mainLogo.png" >
            </a>
        </div> 

        <main>
            <span>
                <h1>회원가입</h1>
                <p>팜팜에 오신 것을 환영합니다.</p>
            </span>
            
            <div class="select">
                <div class="select-user">
                    <button class="select-btn">
                        <a href="/signUp0">
                            <img src="/resources/images/member/user.png" class="select-img">
                            <div class="select-p">
                                <p>구매자</p>
                            </div>
                        </a>
                    </button>
                </div>
                <div class="select-farmer">
                    <button class="select-btn">
                        <a href="/signUp1">
                            <img src="/resources/images/member/farmer.png" class="select-img">
                            <div class="select-p">
                                <p>판매자</p>
                            </div>
                        </a>
                    </button>
                </div>
            </div>

        </main>
    </div>
</body>
</html>