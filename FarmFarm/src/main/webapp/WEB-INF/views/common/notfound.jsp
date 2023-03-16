<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>팜팜</title>
    <link rel="stylesheet" href="/resources/css/common/error-style.css" />
    <link rel="stylesheet" href="/resources/css/common/footer-style.css" />
    <script src="https://kit.fontawesome.com/1ce4f19a7a.js" crossorigin="anonymous"></script>
  </head>
<body>
    <div class="header-container">
      <header>
        <div class="home-logo">
          <a href="/">
            <img src="/resources/images/mainLogo.png" />
          </a>
      </header>
    </div>

    <main>
      <div class="error-container">
        <div class="error-image-area">
          <img src="/resources/images/main/no-connection.png">
        </div>
        <div class="error-kind-area">
          삭제되었거나 존재하지 않는 페이지입니다.
        </div>

        <div class="btn-area">
          <a href="/" id="moveHome">
              <i class="fa-solid fa-house"></i>
              &nbsp;
              <span>홈으로</span>
          </a>
          <a id="goBack">
            <i class="fa-solid fa-rotate-left"></i>
            &nbsp;
            <span>뒤로가기</span>
          </a>
        </div>
      </div>

    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/> 
    
    <script src="/resources/js/common/error.js"></script>
  </body>
</html>
