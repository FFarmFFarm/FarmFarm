<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FarmFarm</title>
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
          <c:if test="${empty errorKind}">
            알 수 없는 오류가 발생했습니다
        </c:if>
          <c:if test="${! empty errorKind}">
            ${errorKind}
          </c:if>
        </div>

        <div class="error-title-area">
          <c:if test="${empty errorTitle}">
            잠시 후 다시 시도해주세요
          </c:if>
          <c:if test="${! empty errorTitle}">
            ${errorTitle}
          </c:if>
        </div>
        
        <div class="error-detail-area">
          <c:if test="${empty errorDetail}">
            문제가 지속될 경우 고객행복센터로 문의해 주세요
          </c:if>
          <c:if test="${! empty errorDetail}">
            ${errorDetail}
          </c:if>
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
          <a id="retry">
              <i class="fa-solid fa-rotate"></i>
              &nbsp;
              <span>새로고침</span>
          </a>
        </div>
        <!-- <div class="center-info-area">
            <strong>고객행복센터</strong>
            <div>
              <i class="fa-solid fa-phone"></i>1644-1234
            </div>
            <div>
              <i class="fa-solid fa-envelope"></i>help@farmfarm.com
            </div>
        </div> -->
      </div>

    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/> 
    
    <script src="/resources/js/common/error.js"></script>
  </body>
</html>
